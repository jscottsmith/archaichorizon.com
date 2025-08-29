import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://archive.org/serve/**")],
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default nextConfig;
