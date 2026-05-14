/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'khama.dz' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  transpilePackages: ['lucide-react', '@react-three/fiber', '@react-three/drei', 'three'],
}

module.exports = nextConfig
