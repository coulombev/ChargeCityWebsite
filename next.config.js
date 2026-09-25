/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // Serve modern formats: AVIF first (smallest), then WebP fallback
    formats: ["image/avif", "image/webp"],
    // Aggressive browser-side caching (1 year)
    minimumCacheTTL: 31536000,
    // Only generate these widths (avoids unnecessary variants)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow optimizing images from the public folder
    remotePatterns: [],
  },
  allowedDevOrigins: ['192.168.15.238', 'localhost'],
  async rewrites() {
    return [
      { source: '/ev-chargers', destination: '/products/ev-chargers' },
      { source: '/mobile-app', destination: '/products/mobile-app' },
      { source: '/charging-management-software', destination: '/products/charging-management-software' },
      { source: '/roi-calculator', destination: '/products/roi-calculator' },
      { source: '/charging-as-a-service', destination: '/solutions/charging-as-a-service' },
      { source: '/privacypolicy', destination: '/privacy-policy' },
      { source: '/refundpolicy', destination: '/refund-policy' },
      { source: '/termsofservice', destination: '/terms-of-service' },
    ];
  },
};

module.exports = nextConfig;
