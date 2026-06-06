import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray C:\Users\daniel\package-lock.json otherwise
  // makes Turbopack infer the home dir as root, which breaks CSS hot-reload.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bungie.net",
      },
    ],
  },
};

export default nextConfig;
