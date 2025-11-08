/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Enable standalone output for Docker
    outputFileTracingRoot: process.cwd(),
  },
};

export default nextConfig;
