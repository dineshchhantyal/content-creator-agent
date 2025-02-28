import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
      },
      {
        hostname: "yt3.ggpht.com",
      },
    ],
  },
};

export default nextConfig;
