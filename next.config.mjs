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
  // Output standalone for better Docker performance
  output: 'standalone',
  // Minimal configuration to avoid Jest worker issues
  experimental: {
    cpus: 1,
  },
}

export default nextConfig