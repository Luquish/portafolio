import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config) => {
    config.optimization.moduleIds = 'named';
    return config;
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
