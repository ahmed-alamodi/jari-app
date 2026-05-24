import type { Metadata } from 'next';
import { SEO_CONFIG } from './config';

interface PageMetadataOptions {
  /** Page title (will be formatted with template, e.g. "أذكار الصباح | جاري") */
  title: string;
  /** Page description (150-160 chars for Google, 200 chars for social) */
  description: string;
  /** Canonical path, e.g. '/morning' */
  path: string;
  /** Additional Arabic/Islamic keywords for this specific page */
  keywords?: string[];
  /** Open Graph type (default: 'website') */
  ogType?: 'website' | 'article' | 'profile';
  /** Article section for OG (e.g. 'أذكار الصباح') */
  articleSection?: string;
  /** Override the OG image (default: page-level opengraph-image or root fallback) */
  ogImageAlt?: string;
  /** Set to true to prevent indexing (e.g. /settings) */
  noIndex?: boolean;
  /** Locale override (default: 'ar_SA') */
  locale?: string;
}

/**
 * Generates a fully-typed Next.js Metadata object for any page.
 *
 * Usage in a Server Component page:
 * ```ts
 * export const metadata = generatePageMetadata({
 *   title: 'أذكار الصباح',
 *   description: '...',
 *   path: '/morning',
 *   keywords: ['أذكار الصباح', ...],
 *   ogType: 'article',
 *   articleSection: 'أذكار الصباح',
 * });
 * ```
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords = [],
    ogType = 'website',
    articleSection,
    ogImageAlt,
    noIndex = false,
    locale = SEO_CONFIG.locale,
  } = options;

  const canonicalUrl = `${SEO_CONFIG.siteUrl}${path}`;
  const mergedKeywords = [
    ...new Set([...SEO_CONFIG.defaultKeywords, ...keywords]),
  ];
  const imageAlt = ogImageAlt ?? `${title} - تطبيق جاري`;

  return {
    title,
    description,
    keywords: mergedKeywords,

    // ─── Canonical URL ────────────────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },

    // ─── Robots ───────────────────────────────────────────────────────────────
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // ─── Open Graph ───────────────────────────────────────────────────────────
    openGraph: {
      type: ogType,
      locale,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      title,
      description,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
          width: SEO_CONFIG.ogImage.width,
          height: SEO_CONFIG.ogImage.height,
          alt: imageAlt,
          type: SEO_CONFIG.ogImage.type,
        },
      ],
      ...(ogType === 'article' && articleSection
        ? {
            section: articleSection,
            tags: mergedKeywords.slice(0, 6),
          }
        : {}),
    },

    // ─── Twitter / X Card ────────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      ...(SEO_CONFIG.twitterHandle
        ? { creator: SEO_CONFIG.twitterHandle, site: SEO_CONFIG.twitterHandle }
        : {}),
    },
  };
}

/**
 * Generates metadata for dynamic adhkar category pages.
 * Used in generateMetadata() of [slug]/page.tsx.
 */
export function generateAdhkarMetadata(category: {
  title: string;
  slug: string;
}): Metadata {
  const description = `أذكار وأدعية ${category.title} كاملة من كتاب حصن المسلم مع العداد التفاعلي والتقدم اليومي — اقرأ وتابع وردك من الأذكار بيسر وسهولة.`;
  const path = `/adhkar/${category.slug}`;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}${path}`;
  const imageAlt = `أذكار وأدعية ${category.title} - تطبيق جاري`;

  return {
    title: `${category.title} - حصن المسلم`,
    description,
    keywords: [
      ...SEO_CONFIG.defaultKeywords,
      category.title,
      `أذكار ${category.title}`,
      `أدعية ${category.title}`,
      `حصن المسلم ${category.title}`,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: SEO_CONFIG.locale,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      title: `${category.title} - حصن المسلم | جاري`,
      description,
      section: 'حصن المسلم',
      tags: ['أذكار', 'حصن المسلم', 'إسلام', category.title],
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} - حصن المسلم | جاري`,
      description,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
          alt: imageAlt,
        },
      ],
    },
  };
}
