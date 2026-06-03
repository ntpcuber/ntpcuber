import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'thailandcube.vercel.app' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },  // Google OAuth avatars
    ],
  },
};

export default nextConfig;
