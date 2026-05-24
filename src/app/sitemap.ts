import { MetadataRoute } from 'next';
import categories from '../data/categories.json';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jari-app.vercel.app';

// Build timestamp for lastModified (use build time for consistency)
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── Static High-Priority Pages ────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/morning`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/evening`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/sleep`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/adhkar`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tasbeeh`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/arafah`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/last-ten`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/comprehensive`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sunnah`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Note: /settings is excluded — noIndex page
  ];

  // ─── Dynamic Category Pages (133 Hisn al-Muslim categories) ───────────────
  const dynamicPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/adhkar/${cat.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }));

  return [...staticPages, ...dynamicPages];
}
