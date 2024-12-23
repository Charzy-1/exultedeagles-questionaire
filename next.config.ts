import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enforce React best practices
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // Expose your MongoDB URI as an environment variable
  },
};

export default nextConfig;
