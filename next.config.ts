import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // IMPORTANT: This handles all links/images for Main, 001, and 002
  basePath: "/mayores",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;