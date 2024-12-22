import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const client = await clientPromise; // Use clientPromise to get the client
      const db = client.db(); // Get the default database (you can specify the db name if needed)
      const collection = db.collection("responses");
      await collection.deleteMany({}); // Deletes all responses
      res.status(200).json({ message: "Responses reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error resetting responses", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
