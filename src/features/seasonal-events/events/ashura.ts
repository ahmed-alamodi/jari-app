import { SeasonalEvent } from '../types';

export const ashuraEvents: SeasonalEvent[] = [
  {
    id: 'ashura',
    title: 'يوم عاشوراء (10 محرم)',
    description: 'يوم مبارك نجى الله فيه موسى وقومه من فرعون. صيام هذا اليوم يكفر ذنوب سنة كاملة مضت.',
    ctaText: 'أدعية وفضائل عاشوراء 🤲',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 1, // Muharram
    hijriDayStart: 10,
    priority: 80,
    icon: '✨',
    theme: {
      bg: 'linear-gradient(135deg, #1e3a8a, #0369a1, #0891b2)',
      text: '#ffffff',
      accent: '#34d399',
      border: 'rgba(52, 211, 153, 0.3)',
    },
    rotatingMessages: [
      'صيام يوم عاشوراء يحتسب عند الله أن يكفر السنة التي قبله 🤍',
      'يستحب صيام التاسع من محرم (تاسوعاء) مخالفة لأهل الكتاب 🕌',
      'يوم نصر وحق وشكر لله تعالى على نجاته لعباده المؤمنين 🤲',
      'أكثر من الذكر والاستغفار في هذا اليوم التاريخي العظيم 📿'
    ]
  },
  {
    id: 'tasua',
    title: 'يوم تاسوعاء (9 محرم)',
    description: 'اليوم التاسع من شهر محرم الحرام. صومه مستحب ومكمل لصيام يوم عاشوراء.',
    ctaText: 'فضائل الصيام والذكر 📖',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 1, // Muharram
    hijriDayStart: 9,
    priority: 75,
    icon: '✨',
    theme: {
      bg: 'linear-gradient(135deg, #111827, #1e293b, #0f766e)',
      text: '#f8fafc',
      accent: '#2dd4bf',
      border: 'rgba(45, 212, 191, 0.3)',
    },
    rotatingMessages: [
      'قال رسول الله ﷺ: «لئن بقيتُ إلى قابل لأصومَنَّ التاسعَ» 🤍',
      'صيام تاسوعاء مع عاشوراء يحقق مخالفة أهل الكتاب وإكمال السنة 🕌',
      'احرص على نية الصيام وتجديد التوبة والعهد مع الله عز وجل 🤲'
    ]
  }
];
