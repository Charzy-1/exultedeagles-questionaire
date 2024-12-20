import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Replace with your database name if needed
    const collection = db.collection("responses");

    if (req.method === "GET") {
      const responses = await collection.find({}).toArray();
      res.status(200).json(responses);
    } else if (req.method === "POST") {
      await collection.deleteMany({});
      res.status(200).json({ message: "Responses reset successfully" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default handler;
