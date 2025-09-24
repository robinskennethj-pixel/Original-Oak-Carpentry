import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Comprehensive Jest worker fixes
  experimental: {
    // Disable worker threads completely to prevent Jest worker crashes
    workerThreads: false,
    // Limit CPU usage to prevent worker overload
    cpus: 1,
    // Disable features that may cause Jest worker issues
    isrMemoryCacheSize: 0,
  },
  // Webpack configuration to prevent Jest worker module loading issues
  webpack: (config, { isServer, dev }) => {
    // Single-threaded compilation to avoid Jest worker conflicts
    config.parallelism = 1;

    // Disable caching to prevent corrupted cache causing module loading errors
    config.cache = false;

    // Development-specific fixes for Jest worker issues
    if (dev) {
      config.optimization = {
        ...config.optimization,
        // Reduce memory pressure during development
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    // Fix module resolution issues that may cause Jest worker errors
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
    };

    // Add error handling for webpack compilation
    if (dev && isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }

    return config;
  },
}

export default withNextIntl(nextConfig)