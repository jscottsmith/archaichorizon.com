import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://archive.org/serve/**"),
      new URL("https://archive.org/services/img/**"),
    ],
    minimumCacheTTL: 31536000, // 1 year
  },
  async headers() {
    return [
      {
        // Browsers must revalidate the SW script so deploys activate promptly.
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
