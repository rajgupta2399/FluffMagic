import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
