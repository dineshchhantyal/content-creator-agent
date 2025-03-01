import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com", "i.ytimg.com", "your-other-image-domains.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run type checking during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
