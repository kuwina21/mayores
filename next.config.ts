import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // IMPORTANT: Only set basePath for GitHub Pages subdirectory deployments, not Vercel
  basePath: (process.env.NODE_ENV === "production" && !process.env.VERCEL) ? "/mayores" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;