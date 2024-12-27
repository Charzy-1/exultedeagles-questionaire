import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

let cachedClient: MongoClient | null = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  cachedClient = client;
  return client;
}

function getIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  return typeof forwarded === "string"
    ? forwarded.split(",")[0].trim()
    : req.socket.remoteAddress || "unknown";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const ipAddress = getIp(req);

    try {
      const client = await getClient();
      const db = client.db("test");
      const collection = db.collection("responses");

      const existingFeedback = await collection.findOne({ ip: ipAddress });

      if (existingFeedback) {
        return res.status(200).json({ hasSubmitted: true });
      } else {
        return res.status(200).json({ hasSubmitted: false });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error checking submission", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
