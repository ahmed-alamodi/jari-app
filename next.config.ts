import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ─── Turbopack (dev) ───────────────────────────────────────────────────────
  turbopack: {
    root: __dirname,
  },

  // ─── Image Optimization ───────────────────────────────────────────────────
  images: {
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

  // ─── HTTP Headers ─────────────────────────────────────────────────────────
  async headers() {
    return [
      // Cache-Control for static assets (immutable = 1 year)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache PWA icons for 1 year
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache favicon
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      // Cache manifest
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // Service worker must not be cached (always fresh)
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      // CORS for PDF files (for sharing)
      {
        source: '/files/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Common alternate spellings / old paths
      {
        source: '/azkar',
        destination: '/adhkar',
        permanent: true,
      },
      {
        source: '/azkar/:slug',
        destination: '/adhkar/:slug',
        permanent: true,
      },
      {
        source: '/tasbih',
        destination: '/tasbeeh',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
