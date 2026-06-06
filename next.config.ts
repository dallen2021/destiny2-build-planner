import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray C:\Users\daniel\package-lock.json otherwise
  // makes Turbopack infer the home dir as root, which breaks CSS hot-reload.
  turbopack: {
    root: process.cwd(),
  },
  // Bundle the sql.js wasm into the gear route's serverless function so the
  // gear-asset DB (dye colors) works on Vercel.
  outputFileTracingIncludes: {
    "/api/render/gear/[itemHash]": ["./node_modules/sql.js/dist/sql-wasm.wasm"],
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
