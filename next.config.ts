import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ─── Static Export Config ──────────────────────────────────────────────────
  output: 'export',

  // ─── Turbopack (dev) ───────────────────────────────────────────────────────
  turbopack: {
    root: __dirname,
  },

  // ─── Image Optimization ───────────────────────────────────────────────────
  images: {
    // Enable unoptimized images which is required for static export
    unoptimized: true,
    // Serve AVIF (smallest) first, then WebP, then original
    formats: ['image/avif', 'image/webp'],
    // Device breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image size steps for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long-lived cache for optimized images (1 year)
    minimumCacheTTL: 31536000,
    // Allow remote images from islambook.com (for future use)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.islambook.com',
        pathname: '/**',
      },
    ],
  },

  // ─── Compression ─────────────────────────────────────────────────────────
  compress: true,

  // ─── Powered By Header (remove for security) ──────────────────────────────
  poweredByHeader: false,

  // ─── Trailing Slash (false = canonical without slash, enforced by middleware) ─
  trailingSlash: false,
};

export default nextConfig;
