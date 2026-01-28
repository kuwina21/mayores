import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // IMPORTANT: This must match your GitHub Repository Name EXACTLY
  basePath: "/mayores",
  assetPrefix: "/mayores/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;