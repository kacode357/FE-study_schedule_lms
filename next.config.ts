import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone', // Build nhỏ gọn cho Docker
};

export default nextConfig;
