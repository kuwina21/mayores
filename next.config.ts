import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mayores', // Tells Next.js your site is at /mayores/
  images: {
    unoptimized: true,
  },
};

export default nextConfig;