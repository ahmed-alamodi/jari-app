/**
 * Jari App — Centralized SEO Configuration
 *
 * This is the single source of truth for all SEO-related constants.
 * Update this file to change site-wide SEO properties without touching individual pages.
 */

export const SEO_CONFIG = {
  // ─── Site Identity ───────────────────────────────────────────────────────────
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jari-app.vercel.app',
  siteName: 'جاري',
  siteNameEn: 'Jari',
  applicationName: 'جاري - أذكار ومسبحة',
  locale: 'ar_SA',
  lang: 'ar',
  direction: 'rtl' as const,

  // ─── Default Metadata ────────────────────────────────────────────────────────
  defaultTitle: 'جاري | صدقة جارية وأذكار',
  titleTemplate: '%s | جاري',
  defaultDescription:
    'تطبيق جاري للأذكار والمسبحة الإلكترونية — صدقة جارية تحتوي على أذكار الصباح والمساء وأذكار النوم وفهرس حصن المسلم الكامل وأكثر من 133 قسماً من الأذكار والأدعية.',
  defaultKeywords: [
    'أذكار',
    'صدقة جارية',
    'أذكار الصباح',
    'أذكار المساء',
    'أذكار النوم',
    'مسبحة إلكترونية',
    'تسبيح',
    'إسلام',
    'دعاء',
    'حصن المسلم',
    'أذكار اليوم',
    'ذكر الله',
    'أدعية مستجابة',
    'تطبيق إسلامي',
    'أذكار مكتوبة',
  ],

  // ─── Author / Organization ───────────────────────────────────────────────────
  author: {
    name: 'فاعل خير',
    url: 'https://jari-app.vercel.app',
  },
  organization: {
    name: 'جاري',
    legalName: 'جاري - تطبيق الأذكار',
    url: 'https://jari-app.vercel.app',
    logo: 'https://jari-app.vercel.app/logo.png',
    sameAs: [] as string[], // Add social profile URLs if available
    foundingDate: '2024',
    description:
      'تطبيق إسلامي للأذكار والمسبحة الإلكترونية، صدقة جارية تسهّل حفظ وقراءة الأذكار والأدعية اليومية.',
    contactPoint: {
      contactType: 'customer service',
      availableLanguage: 'Arabic',
    },
  },

  // ─── Social Media ─────────────────────────────────────────────────────────────
  twitterHandle: undefined as string | undefined, // e.g. '@jari_app'

  // ─── OG Image Defaults ───────────────────────────────────────────────────────
  ogImage: {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'تطبيق جاري - صدقة جارية وأذكار ومسبحة إلكترونية',
    type: 'image/png',
  },

  // ─── Analytics & Verification ─────────────────────────────────────────────
  // Add your IDs via environment variables (.env.local)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID as string | undefined,
    googleSearchConsole: (process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? process.env.NEXT_PUBLIC_GSC_VERIFICATION.includes(',')
        ? process.env.NEXT_PUBLIC_GSC_VERIFICATION.split(',').map(s => s.trim()).filter(Boolean)
        : process.env.NEXT_PUBLIC_GSC_VERIFICATION
      : undefined) as string | string[] | undefined,
    bingWebmaster: process.env.NEXT_PUBLIC_BING_VERIFICATION as string | undefined,
  },

  // ─── Theme ───────────────────────────────────────────────────────────────────
  themeColor: '#10b981',
  backgroundColor: '#0f172a',

  // ─── PWA ─────────────────────────────────────────────────────────────────────
  pwa: {
    name: 'جاري - أذكار ومسبحة',
    shortName: 'جاري',
    description:
      'أذكار الصباح والمساء والنوم وفهرس حصن المسلم والمسبحة الإلكترونية — صدقة جارية.',
    startUrl: '/?source=pwa',
    scope: '/',
    display: 'standalone' as const,
    orientation: 'portrait' as const,
    categories: ['lifestyle', 'religion', 'utilities'],
  },
} as const;

// ─── Page-Specific SEO Metadata ────────────────────────────────────────────────
export const PAGE_META = {
  home: {
    title: 'جاري | صدقة جارية وأذكار',
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    path: '/',
  },
  morning: {
    title: 'أذكار الصباح',
    description:
      'أذكار الصباح كاملة من حصن المسلم مكتوبة بخط واضح مع عداد تفاعلي لمتابعة الأذكار اليومية وتسهيل حفظها والمداومة عليها.',
    keywords: [
      'أذكار الصباح',
      'أذكار الصباح كاملة',
      'أذكار بعد الفجر',
      'أذكار الصباح مكتوبة',
      'دعاء الصباح',
      'حصن المسلم الصباح',
      'أذكار الصباح والمساء',
    ],
    path: '/morning',
    section: 'أذكار الصباح',
  },
  evening: {
    title: 'أذكار المساء',
    description:
      'أذكار المساء كاملة من حصن المسلم مكتوبة بخط واضح مع عداد تفاعلي لمتابعة التقدم اليومي وتيسير المواظبة على الذكر.',
    keywords: [
      'أذكار المساء',
      'أذكار المساء كاملة',
      'أذكار بعد العصر',
      'أذكار المساء مكتوبة',
      'دعاء المساء',
      'حصن المسلم المساء',
      'أذكار الصباح والمساء',
    ],
    path: '/evening',
    section: 'أذكار المساء',
  },
  sleep: {
    title: 'أذكار النوم',
    description:
      'أذكار النوم كاملة مكتوبة من حصن المسلم للمواظبة على ذكر الله والتحصين قبل النوم مع عداد تفاعلي.',
    keywords: [
      'أذكار النوم',
      'دعاء قبل النوم',
      'أذكار النوم كاملة',
      'أذكار المنام',
      'دعاء النوم مكتوب',
      'حصن المسلم النوم',
    ],
    path: '/sleep',
    section: 'أذكار النوم',
  },
  adhkar: {
    title: 'فهرس حصن المسلم',
    description:
      'فهرس شامل لأكثر من 133 قسماً من أذكار وأدعية كتاب حصن المسلم مع البحث السريع والتصفح الميسّر والعداد التفاعلي.',
    keywords: [
      'حصن المسلم',
      'فهرس حصن المسلم',
      'أذكار حصن المسلم',
      'أدعية حصن المسلم',
      'أقسام حصن المسلم',
      'تحميل حصن المسلم',
      'كتاب الأذكار',
    ],
    path: '/adhkar',
    section: 'حصن المسلم',
  },
  tasbeeh: {
    title: 'المسبحة الإلكترونية',
    description:
      'مسبحة إلكترونية ذكية وسهلة الاستخدام ومريحة للعين لمساعدتك على الذكر اليومي والتسبيح والاستغفار — صدقة جارية.',
    keywords: [
      'مسبحة إلكترونية',
      'عداد تسبيح',
      'مسبحة رقمية',
      'تسبيح إلكتروني',
      'عداد الذكر',
      'سبحة إلكترونية',
      'تطبيق مسبحة',
    ],
    path: '/tasbeeh',
    section: 'المسبحة',
  },
  arafah: {
    title: 'أدعية يوم عرفة',
    description:
      'أفضل أدعية يوم عرفة المستجابة من القرآن الكريم والسنة النبوية مكتوبة مع إمكانية تحميل كتاب الأدعية بصيغة PDF.',
    keywords: [
      'أدعية يوم عرفة',
      'دعاء يوم عرفة',
      'أفضل دعاء عرفة',
      'أدعية الحج',
      'يوم عرفة',
      'دعاء عرفة مكتوب',
    ],
    path: '/arafah',
    section: 'أدعية عرفة',
  },
  lastTen: {
    title: 'أدعية ليالي العشر الأواخر',
    description:
      'أدعية ليالي العشر الأواخر من رمضان وليلة القدر مكتوبة ومستجابة للتقرب إلى الله في أفضل ليالي العام.',
    keywords: [
      'أدعية ليالي العشر',
      'دعاء العشر الأواخر',
      'ليلة القدر دعاء',
      'أدعية رمضان',
      'دعاء ليلة القدر',
      'العشر الأواخر من رمضان',
    ],
    path: '/last-ten',
    section: 'ليالي العشر',
  },
  comprehensive: {
    title: 'جوامع الدعاء',
    description:
      'أدعية جوامع الكلم القرآنية والنبوية الشاملة لكل خير في الدنيا والآخرة مكتوبة للحفظ والقراءة والتأمل.',
    keywords: [
      'جوامع الدعاء',
      'دعاء جامع',
      'أدعية قرآنية',
      'أدعية نبوية',
      'جوامع الكلم',
      'دعاء شامل',
    ],
    path: '/comprehensive',
    section: 'جوامع الدعاء',
  },
  sunnah: {
    title: 'سنن يوم الجمعة وأذكارها',
    description:
      'سنن وآداب يوم الجمعة المبارك وأذكاره المستحبة مع الأدلة والأحاديث النبوية الصحيحة - تطبيق جاري.',
    keywords: [
      'سنن الجمعة',
      'سنن يوم الجمعة',
      'أذكار يوم الجمعة',
      'سورة الكهف يوم الجمعة',
      'الصلاة على النبي يوم الجمعة',
      'يوم الجمعة',
      'آداب يوم الجمعة',
      'ساعة الاستجابة يوم الجمعة',
      'سنة نبوية',
    ],
    path: '/sunnah',
    section: 'سنن الجمعة',
  },
  settings: {
    title: 'الإعدادات',
    description: 'إعدادات تطبيق جاري — تخصيص المظهر والإشعارات والتفضيلات الشخصية.',
    keywords: ['إعدادات', 'تخصيص', 'تطبيق جاري'],
    path: '/settings',
  },
} as const;
