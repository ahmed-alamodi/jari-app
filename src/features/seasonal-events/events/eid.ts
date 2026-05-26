import { SeasonalEvent } from '../types';

export const eidEvents: SeasonalEvent[] = [
  {
    id: 'eid-fitr',
    title: 'عيد الفطر السعيد 🎉',
    description: 'تقبل الله منا ومنكم صالح الأعمال وغفر لنا ولكم. عيدكم مبارك وكل عام وأنتم بخير!',
    ctaText: 'سنن وتكبيرات العيد 🕌',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 10, // Shawwal
    hijriDayStart: 1,
    hijriDayEnd: 3,
    priority: 98,
    icon: '🎉',
    theme: {
      bg: 'linear-gradient(135deg, #0d9488, #0891b2, #0284c7)',
      text: '#ffffff',
      accent: '#f59e0b',
      border: 'rgba(8, 145, 178, 0.3)',
    },
    rotatingMessages: [
      'تقبل الله طاعاتكم وصيامكم وعيدكم مبارك سعيد 🤍',
      'من السنن: التكبير، الاغتسال، وأكل تمرات وتراً قبل الخروج للمصلى 🍬',
      'أدخل السرور والبهجة على قلوب عائلتك وأطفالك وجيرانك 🤝',
      'الحمد لله الذي أتم علينا صيام الشهر الفضيل وبلغنا العيد 🌟'
    ]
  },
  {
    id: 'eid-adha',
    title: 'عيد الأضحى المبارك 🕋',
    description: 'أيام مباركة وهي أيام أكل وشرب وذكر لله عز وجل. تقبل الله طاعاتكم وضاحيكم.',
    ctaText: 'سنن وتكبيرات العيد 🐑',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 12, // Dhul-Hijjah
    hijriDayStart: 10,
    hijriDayEnd: 13, // Days 10 to 13 (Day of Sacrifice + 3 days of Tashreeq)
    priority: 99,
    icon: '🕋',
    theme: {
      bg: 'linear-gradient(135deg, #854d0e, #a16207, #ca8a04)',
      text: '#ffffff',
      accent: '#10b981',
      border: 'rgba(202, 138, 4, 0.4)',
    },
    rotatingMessages: [
      'تقبل الله ضحاياكم وطاعاتكم وعساكم من عواده 🤍',
      'أيام التشريق هي أيام أكل وشرب وذكر لله عز وجل 📿',
      'أكثر من التكبير المطلق والمقيد دبر الصلوات المكتوبة 🤲',
      'العيد فرصة لصلة الأرحام وتجاوز الخلافات ونشر المحبة 🤝'
    ]
  }
];
