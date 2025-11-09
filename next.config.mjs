/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simple configuration for Vercel deployment
  experimental: {
    // Disable Turbopack for now to avoid build issues
  },
  // Docker configuration (for professor demo only)
  ...(process.env.DOCKER === 'true' ? {
    output: 'standalone',
    experimental: {
      outputFileTracingRoot: process.cwd(),
    },
  } : {}),
};

export default nextConfig;
