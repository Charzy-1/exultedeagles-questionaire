import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("responses");

      // Insert the responses into the database
      const response = await collection.insertOne(req.body);

      res
        .status(200)
        .json({ message: "Response submitted successfully", data: response });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving response", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
