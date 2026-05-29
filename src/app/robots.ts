import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jari-app.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers on public content
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/settings',     // User preferences — no SEO value
          '/api/',         // API routes — not for indexing
          '/_next/',       // Next.js internal routes
          '/files/',       // PDF downloads — let Google discover via page links
        ],
      },
      // Specific Googlebot rules (allow everything public + images)
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/morning',
          '/evening',
          '/sleep',
          '/adhkar',
          '/tasbeeh',
          '/arafah',
          '/last-ten',
          '/comprehensive',
          '/sunnah',
          '/sitemap.xml',
          '/manifest.webmanifest',
        ],
        disallow: ['/settings', '/api/', '/_next/'],
      },
      // Prevent AI training scrapers (optional — remove if you want AI indexing)
      // Uncomment below to opt out of AI training:
      // {
      //   userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
      //   disallow: '/',
      // },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
