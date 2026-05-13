/** @type {import('next').NextConfig} */
const path = require('path');

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
  transpilePackages: ['lucide-react', 'styled-jsx'],
  webpack: (config) => {
    // إجبار Webpack على استخدام نسخة واحدة من React لمنع تعارض الـ Context في الـ Monorepo
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    };
    return config;
  },
}

module.exports = nextConfig
