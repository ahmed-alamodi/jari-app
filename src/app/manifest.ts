import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '../lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.pwa.name,
    short_name: SEO_CONFIG.pwa.shortName,
    description: SEO_CONFIG.pwa.description,
    start_url: SEO_CONFIG.pwa.startUrl,
    scope: SEO_CONFIG.pwa.scope,
    display: SEO_CONFIG.pwa.display,
    orientation: SEO_CONFIG.pwa.orientation,
    background_color: SEO_CONFIG.backgroundColor,
    theme_color: SEO_CONFIG.themeColor,
    lang: 'ar',
    dir: 'rtl',
    categories: [...SEO_CONFIG.pwa.categories],

    // ─── Icons ──────────────────────────────────────────────────────────────
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],

    // ─── App Shortcuts ──────────────────────────────────────────────────────
    // Shown in Android long-press menu and Windows taskbar
    shortcuts: [
      {
        name: 'أذكار الصباح',
        short_name: 'الصباح',
        description: 'أذكار ما بعد الفجر',
        url: '/morning?source=shortcut',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'أذكار المساء',
        short_name: 'المساء',
        description: 'أذكار ما بعد العصر',
        url: '/evening?source=shortcut',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'المسبحة',
        short_name: 'المسبحة',
        description: 'عداد التسبيح الإلكتروني',
        url: '/tasbeeh?source=shortcut',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'فهرس حصن المسلم',
        short_name: 'الفهرس',
        description: 'أكثر من 133 قسماً من الأذكار',
        url: '/adhkar?source=shortcut',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],

    // ─── Screenshots (for app store listing) ────────────────────────────────
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'تطبيق جاري - الصفحة الرئيسية',
      },
    ],

    // ─── Related Applications ───────────────────────────────────────────────
    prefer_related_applications: false,
  };
}
