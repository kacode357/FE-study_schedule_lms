import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt StrictMode để tránh gọi API 2 lần trong dev
};

export default nextConfig;
