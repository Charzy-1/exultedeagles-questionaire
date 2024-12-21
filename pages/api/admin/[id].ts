import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next"; // Import types for req and res

const client = new MongoClient(process.env.MONGODB_URI!); // Type assertion for MONGODB_URI

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Specify types for req and res
  if (req.method === "DELETE") {
    const { id } = req.query; // The response ID passed from the frontend

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      console.log("Mongo URI: ", process.env.MONGODB_URI); // Log MongoDB URI to check if it's loaded correctly
      console.log("Deleting ID: ", id); // Log the ID being passed for deletion

      // Validate ObjectId format
      let objectId;
      try {
        objectId = new ObjectId(id as string);
        console.log("Valid ObjectId: ", objectId);
      } catch (error) {
        console.log("Invalid ObjectId format");
        return res.status(400).json({ message: "Invalid ID format" });
      }

      await client.connect();
      const db = client.db("ExultedEaglesSurvery"); // Replace with your actual database name
      const collection = db.collection("responses"); // Replace with your actual collection name

      // Log the number of documents in the collection
      const count = await collection.countDocuments();
      console.log("Total documents in collection: ", count);

      // Check if the document exists before attempting deletion
      const existingDocument = await collection.findOne({ _id: objectId });
      console.log("Document to delete: ", existingDocument);

      if (!existingDocument) {
        return res
          .status(404)
          .json({ message: "Response not found in database" });
      }

      // Delete the response with the matching ID
      const result = await collection.deleteOne({ _id: objectId });

      console.log("Delete Result: ", result); // Log the result of the delete operation

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Response not found" });
      }

      return res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
      console.error("Error during deletion:", error); // Log any error that occurs
      return res
        .status(500)
        .json({ message: "Failed to delete response", error });
    } finally {
      await client.close();
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
