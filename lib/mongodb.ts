import { MongoClient } from "mongodb";

// Extend the global namespace to include _mongoClientPromise
declare global {
  // Ensures TypeScript knows about the global variable
  // Prevents errors during hot module replacement (HMR) in development
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
const options = {};

// Validate that the MongoDB URI is provided
if (!uri) {
  throw new Error("Please add your MongoDB URI to your .env.local file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, always create a new MongoClient instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
