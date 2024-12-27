import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enforce React best practices
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // Expose your MongoDB URI as an environment variable
  },
  experimental: {
    // Configure experimental options if needed
    turbo: {
      loaders: {}, // You can configure TurboPack loaders here if applicable
    },
  },
  webpack: (config) => {
    // Custom Webpack configuration
    return config;
  },
  images: {
    domains: ["fonts.gstatic.com"], // Allow loading fonts or images from specific domains
  },
};

export default nextConfig;
