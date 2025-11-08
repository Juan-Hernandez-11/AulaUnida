/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel optimized configuration
  experimental: {
    // Enable Turbopack for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Docker configuration (for professor demo)
  ...(process.env.NODE_ENV === 'production' && process.env.DOCKER === 'true' ? {
    output: 'standalone',
    experimental: {
      outputFileTracingRoot: process.cwd(),
    },
  } : {}),
};

export default nextConfig;
