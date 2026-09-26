import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "b129bd2a-9147-4f39-87c8-a986d844ce59-00-1my5364cyca12.janeway.replit.dev",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
