/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports - pre-render all pages at build time
  // Note: Only use 'export' for production builds (via npm run build:static)
  // For development (npm run dev), leave undefined to use studio and api routes
  // The build:static script temporarily removes /studio and /api before building

  // Image optimization - Advanced Next.js 16 settings
  images: {
    unoptimized: false,
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Skip TypeScript and ESLint errors during build (optional - remove if you want strict checks)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Exclude patterns from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // ========== Next.js 16 with Turbopack ==========

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['gsap', '@sanity/image-url', 'next-sanity'],

    // Enable partial prerendering for faster initial loads
    ppr: false, // Set to true when ready for production
  },


  // Custom HTTP headers for caching strategy
  headers: async () => {
    return [
      {
        // Cache static assets for 1 year
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images for 1 year
        source: '/:path*.png|jpg|jpeg|gif|webp|ico|svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache HTML pages based on revalidation time
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Redirects for better navigation
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
