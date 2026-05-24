/**
 * Jari App — JSON-LD Schema Builder Functions
 *
 * All functions return plain objects (no serialization).
 * Use the <JsonLd> Server Component to inject these into <head>.
 *
 * Schemas implemented:
 *  - Organization
 *  - WebSite + SearchAction
 *  - MobileApplication / SoftwareApplication
 *  - WebPage
 *  - Article
 *  - BreadcrumbList
 *  - FAQPage
 *  - ItemList (for category index)
 *  - Speakable (future-ready)
 */

import { SEO_CONFIG } from './config';

const BASE = SEO_CONFIG.siteUrl;

// ─── Organization Schema ────────────────────────────────────────────────────────
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: SEO_CONFIG.organization.name,
    legalName: SEO_CONFIG.organization.legalName,
    url: BASE,
    logo: {
      '@type': 'ImageObject',
      url: SEO_CONFIG.organization.logo,
      width: 512,
      height: 512,
    },
    description: SEO_CONFIG.organization.description,
    foundingDate: SEO_CONFIG.organization.foundingDate,
    inLanguage: 'ar',
    knowsLanguage: 'ar',
    sameAs: SEO_CONFIG.organization.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: SEO_CONFIG.organization.contactPoint.contactType,
      availableLanguage: SEO_CONFIG.organization.contactPoint.availableLanguage,
    },
    about: {
      '@type': 'Thing',
      name: 'الأذكار والأدعية الإسلامية',
      description: 'أذكار وأدعية مأثورة من القرآن الكريم والسنة النبوية',
    },
  };
}

// ─── WebSite Schema + SearchAction ─────────────────────────────────────────────
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: SEO_CONFIG.siteName,
    url: BASE,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: 'ar',
    publisher: {
      '@id': `${BASE}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE}/adhkar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── Mobile Application Schema ─────────────────────────────────────────────────
export function buildMobileApplicationSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      '@id': `${BASE}/#mobileapp`,
      name: SEO_CONFIG.pwa.name,
      url: BASE,
      description: SEO_CONFIG.pwa.description,
      applicationCategory: 'ReligiousApplication',
      applicationSubCategory: 'IslamicApplication',
      inLanguage: 'ar',
      operatingSystem: 'Android, iOS, Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SAR',
      },
      screenshot: `${BASE}/og-image.png`,
      featureList: [
        'أذكار الصباح',
        'أذكار المساء',
        'أذكار النوم',
        'مسبحة إلكترونية',
        'فهرس حصن المسلم',
        'تتبع التقدم اليومي',
        'يعمل بدون إنترنت',
        'واجهة عربية RTL',
      ].join(', '),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1',
        bestRating: '5',
        worstRating: '1',
      },
      publisher: {
        '@id': `${BASE}/#organization`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${BASE}/#softwareapp`,
      name: SEO_CONFIG.pwa.name,
      url: BASE,
      applicationCategory: 'ReligiousApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SAR',
      },
    },
  ];
}

// ─── WebPage Schema ─────────────────────────────────────────────────────────────
export function buildWebPageSchema({
  title,
  description,
  path,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const url = `${BASE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'ar',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    datePublished: SEO_CONFIG.organization.foundingDate,
    dateModified: dateModified ?? new Date().toISOString().split('T')[0],
    breadcrumb: { '@id': `${url}#breadcrumb` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.page-title', '.arabic-text'],
    },
  };
}

// ─── Article Schema ────────────────────────────────────────────────────────────
export function buildArticleSchema({
  title,
  description,
  path,
  section,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  section: string;
  keywords?: string[];
}) {
  const url = `${BASE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    inLanguage: 'ar',
    articleSection: section,
    keywords: (keywords ?? SEO_CONFIG.defaultKeywords).join(', '),
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.author.name,
      url: SEO_CONFIG.author.url,
    },
    image: {
      '@type': 'ImageObject',
      url: `${BASE}/og-image.png`,
      width: 1200,
      height: 630,
    },
    about: {
      '@type': 'Thing',
      name: section,
      description: `${section} من الأذكار والأدعية الإسلامية المأثورة`,
    },
    datePublished: `${SEO_CONFIG.organization.foundingDate}-01-01`,
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
}

// ─── BreadcrumbList Schema ─────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], pageUrl?: string) {
  const url = pageUrl ?? `${BASE}${items[items.length - 1]?.path ?? '/'}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

// ─── FAQPage Schema ────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── ItemList Schema (for category indexes) ────────────────────────────────────
export function buildItemListSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string; position: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE}${path}#itemlist`,
    name,
    description,
    url: `${BASE}${path}`,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: `${BASE}${item.path}`,
    })),
  };
}

// ─── Speakable Schema (AI & Voice Search Ready) ─────────────────────────────
export function buildSpeakableSchema(cssSelectors: string[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    url: `${BASE}${path}`,
  };
}

// ─── Composite: Global Schemas (injected once in root layout) ─────────────────
export function buildGlobalSchemas() {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    ...buildMobileApplicationSchema(),
  ];
}

// ─── Composite: Adhkar Page Schemas ──────────────────────────────────────────
export function buildAdhkarPageSchemas({
  title,
  description,
  path,
  section,
  breadcrumbs,
  keywords,
  faqs,
}: {
  title: string;
  description: string;
  path: string;
  section: string;
  breadcrumbs: BreadcrumbItem[];
  keywords?: string[];
  faqs?: FAQItem[];
}) {
  const schemas: object[] = [
    buildWebPageSchema({ title, description, path }),
    buildArticleSchema({ title, description, path, section, keywords }),
    buildBreadcrumbSchema(breadcrumbs, `${BASE}${path}`),
  ];
  if (faqs && faqs.length > 0) {
    schemas.push(buildFAQSchema(faqs));
  }
  return schemas;
}
