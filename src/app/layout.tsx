import type { Metadata, Viewport } from 'next';
import { Tajawal, Amiri } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { SEO_CONFIG } from '../lib/seo/config';
import { buildGlobalSchemas } from '../lib/seo/schema';
import JsonLd from '../components/seo/JsonLd';
import ResourceHints from '../components/seo/ResourceHints';
import ThemeHeader from '../components/ThemeHeader';
import ClientProvider from '../components/ClientProvider';
import WebVitals from '../components/analytics/WebVitals';
import SeasonalBanner from '../features/seasonal-events/components/SeasonalBanner';

// ─── Font Optimization ────────────────────────────────────────────────────────
// Using next/font/google instead of CSS @import eliminates render-blocking
// font requests and improves LCP by ~200-400ms. Fonts are self-hosted.
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
  preload: false, // Loaded only when .arabic-text class is used
});

// ─── Viewport (separate export from metadata per Next.js 14+) ────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SEO_CONFIG.themeColor },
    { media: '(prefers-color-scheme: dark)', color: '#059669' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ─── Root Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),

  // ─── Title ────────────────────────────────────────────────────────────────
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },

  // ─── Core Meta ────────────────────────────────────────────────────────────
  description: SEO_CONFIG.defaultDescription,
  keywords: [...SEO_CONFIG.defaultKeywords],
  applicationName: SEO_CONFIG.applicationName,
  category: 'religion',
  classification: 'Islamic Application',
  referrer: 'origin-when-cross-origin',

  // ─── Author / Creator ─────────────────────────────────────────────────────
  authors: [{ name: SEO_CONFIG.author.name, url: SEO_CONFIG.author.url }],
  creator: SEO_CONFIG.author.name,
  publisher: SEO_CONFIG.siteName,

  // ─── Robots ───────────────────────────────────────────────────────────────
  robots: {
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

  // ─── Canonical / hreflang ─────────────────────────────────────────────────
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
    languages: {
      ar: SEO_CONFIG.siteUrl,
      'x-default': SEO_CONFIG.siteUrl,
    },
  },

  // ─── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
        width: SEO_CONFIG.ogImage.width,
        height: SEO_CONFIG.ogImage.height,
        alt: SEO_CONFIG.ogImage.alt,
        type: SEO_CONFIG.ogImage.type,
      },
    ],
  },

  // ─── Twitter / X Cards ────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage.url}`,
        alt: SEO_CONFIG.ogImage.alt,
        width: 1200,
        height: 630,
      },
    ],
  },

  // ─── PWA & App Meta ───────────────────────────────────────────────────────
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: SEO_CONFIG.pwa.shortName,
    statusBarStyle: 'default',
  },

  // ─── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
  },

  // ─── Verification ─────────────────────────────────────────────────────────
  // Add your GSC and Bing codes via .env.local
  verification: {
    google: SEO_CONFIG.analytics.googleSearchConsole,
    other: SEO_CONFIG.analytics.bingWebmaster
      ? { 'msvalidate.01': SEO_CONFIG.analytics.bingWebmaster }
      : undefined,
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html
        lang="ar"
        dir="rtl"
        suppressHydrationWarning
        className={`${tajawal.variable} ${amiri.variable}`}
      >
        <head>
          {/* Resource performance hints */}
          <ResourceHints />
        </head>
        <body>
          {/* Theme detection script — must run before first paint to prevent FOUC */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
            }}
          />

          {/* Global JSON-LD Schemas: Organization + WebSite + MobileApp */}
          <JsonLd schema={buildGlobalSchemas()} />

          <ClientProvider>
            <div className="container">
              <ThemeHeader />
              <SeasonalBanner />
              <main className="main-content" id="main-content">
                {children}
              </main>
            </div>
          </ClientProvider>

          {/* Web Vitals reporter — sends LCP/CLS/INP to GA4 */}
          <WebVitals />
        </body>
      </html>

      {/* Vercel Analytics — must be outside <html> per Vercel docs */}
      <Analytics />

      {/* Google Analytics 4 — conditionally rendered */}
      {SEO_CONFIG.analytics.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${SEO_CONFIG.analytics.googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SEO_CONFIG.analytics.googleAnalyticsId}',{page_path:window.location.pathname});`,
            }}
          />
        </>
      )}
    </>
  );
}
