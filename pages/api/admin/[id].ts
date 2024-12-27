import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// Cache the MongoDB client to reuse across requests and optimize performance
let cachedClient: MongoClient | null = null;

// Function to initialize or retrieve the cached MongoDB client
async function getClient() {
  if (cachedClient) {
    return cachedClient; // Return cached client if it already exists
  }

  // Create a new MongoDB client and connect
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  cachedClient = client; // Cache the connected client for reuse
  return client;
}

// Helper function to extract the client's IP address from the request
function getIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"]; // Retrieve the forwarded IP address
  return typeof forwarded === "string"
    ? forwarded.split(",")[0].trim() // Return the first IP in the forwarded list
    : req.socket.remoteAddress || "unknown"; // Fallback to the remote socket address or 'unknown'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle POST request for submitting feedback
  if (req.method === "POST") {
    const ipAddress = getIp(req); // Get the client's IP address
    const feedback = req.body; // Extract feedback data from the request body

    // Ensure feedback data is provided
    if (!feedback) {
      return res.status(400).json({ message: "Feedback is required" });
    }

    try {
      // Connect to the database
      const client = await getClient();
      const db = client.db("test");
      const collection = db.collection("responses");

      // Check if feedback from the same IP address already exists
      const existingFeedback = await collection.findOne({ ip: ipAddress });

      if (existingFeedback) {
        // If feedback from this IP exists, block the submission
        return res
          .status(403)
          .json({ message: "Feedback already submitted from this device" });
      }

      // Insert the feedback with the IP address and timestamp
      await collection.insertOne({
        ...feedback, // Include all feedback data from the request body
        ip: ipAddress, // Add the client's IP address
        submittedAt: new Date(), // Add a timestamp for when the feedback was submitted
      });

      // Respond with success if feedback is saved
      return res
        .status(201)
        .json({ message: "Feedback submitted successfully" });
    } catch (error) {
      // Handle errors during database operations
      return res
        .status(500)
        .json({ message: "Failed to submit feedback", error });
    }
  }

  // Handle DELETE request for deleting feedback by ID
  else if (req.method === "DELETE") {
    const { id } = req.query; // Extract the feedback ID from query parameters

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    let objectId;
    try {
      // Convert the ID to a MongoDB ObjectId
      objectId = new ObjectId(id as string);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Respond with an error if the ID format is invalid
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      // Connect to the database
      const client = await getClient();
      const db = client.db("test");
      const collection = db.collection("responses");

      // Check if the feedback with the given ID exists
      const existingDocument = await collection.findOne({ _id: objectId });

      if (!existingDocument) {
        // Respond with an error if no feedback is found
        return res.status(404).json({ message: "Response not found" });
      }

      // Delete the feedback with the given ID
      const result = await collection.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        // Respond with an error if the deletion was unsuccessful
        return res.status(404).json({ message: "Response not found" });
      }

      // Respond with success if the feedback was deleted
      return res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
      // Handle errors during database operations
      return res
        .status(500)
        .json({ message: "Failed to delete response", error });
    }
  }

  // Respond with "Method Not Allowed" for unsupported HTTP methods
  else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
