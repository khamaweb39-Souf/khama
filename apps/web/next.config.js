/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // تقليل استهلاك الذاكرة أثناء البناء لتجنب انهيار الـ Context
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    serverComponentsExternalPackages: ['lucide-react'],
  },
}

module.exports = nextConfig
