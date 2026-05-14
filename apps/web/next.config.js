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
  productionBrowserSourceMaps: false,
  transpilePackages: ['lucide-react', '@react-three/fiber', '@react-three/drei', 'three'],
}

module.exports = nextConfig
