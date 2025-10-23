/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports - pre-render all pages at build time
  // Note: Only use 'export' for production builds (via npm run build:static)
  // For development (npm run dev), leave undefined to use studio and api routes
  // The build:static script temporarily removes /studio and /api before building

  // Image optimization
  images: {
    unoptimized: false,
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

  // Trailing slash for consistent routing
  trailingSlash: true,

  // Skip TypeScript and ESLint errors during build (optional - remove if you want strict checks)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Exclude patterns from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // ========== Next.js 15 Performance Optimizations ==========

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['gsap', '@sanity/image-url', 'next-sanity'],

    // Enable partial prerendering for faster initial loads
    ppr: false, // Set to true when ready for production

    // Optimize font loading
    optimizeFonts: true,
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize GSAP tree-shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      'gsap/all': 'gsap/index.js',
    };

    // Split chunks for better caching
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor code
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
            },
            // Separate GSAP into its own chunk
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'gsap',
              priority: 20,
            },
            // Separate Sanity into its own chunk
            sanity: {
              test: /[\\/]node_modules[\\/](@sanity|next-sanity)[\\/]/,
              name: 'sanity',
              priority: 15,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
