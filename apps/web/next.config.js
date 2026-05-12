/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Optimized for Render Free Tier Static Hosting
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
    ],
    unoptimized: true, // Required for static export
  },
  // Note: i18n is not supported with output: 'export'
  // If you need i18n, you might need to use a client-side library or middleware with 'standalone'
}

module.exports = nextConfig
