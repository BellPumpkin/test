import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/list",
      permanent: true,
    },
  ],
};

export default nextConfig;
