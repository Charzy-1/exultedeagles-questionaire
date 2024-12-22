import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const client = new MongoClient(process.env.MONGODB_URI!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    let objectId;
    try {
      objectId = new ObjectId(id as string);
    } catch (error) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      await client.connect();
      const db = client.db("test");
      const collection = db.collection("responses");

      const existingDocument = await collection.findOne({ _id: objectId });

      if (!existingDocument) {
        return res
          .status(404)
          .json({ message: "Response not found in database" });
      }

      const result = await collection.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Response not found" });
      }

      return res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
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