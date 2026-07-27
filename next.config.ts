import type { NextConfig } from "next";

const isGitHubPages = process.env.NODE_ENV === "production" && !process.env.VERCEL;
const basePath = isGitHubPages ? "/mayores" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;