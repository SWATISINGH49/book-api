import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ignore eslint during build process
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;

