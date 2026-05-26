import { SeasonalEvent } from '../types';

export const ramadanEvents: SeasonalEvent[] = [
  {
    id: 'ramadan',
    title: 'شهر رمضان المبارك',
    description: 'شهر الصيام والقيام وتلاوة القرآن. تقبل الله طاعاتكم وضاعف أجوركم.',
    ctaText: 'أدعية وأذكار رمضان',
    route: '/comprehensive',
    scheduleType: 'hijri',
    hijriMonth: 9, // Ramadan
    hijriDayStart: 1,
    hijriDayEnd: 19, // Days 1 to 19 (then last ten nights takes over with higher priority)
    priority: 90,
    icon: '🌙',
    theme: {
      bg: 'linear-gradient(135deg, #1e1b4b, #311042, #10b981)',
      text: '#f8fafc',
      accent: '#a78bfa',
      border: 'rgba(167, 139, 250, 0.3)',
    },
    rotatingMessages: [
      'للصائم عند فطره دعوة لا ترد.. لا تنسَ الدعاء عند الإفطار 🤲',
      '«عمرة في رمضان تعدل حجة».. فرصة مضاعفة الأجر 🕌',
      'اجعل لسانك رطباً بذكر الله خلال ساعات الصيام 📿',
      'الصيام جنة، فاحفظ صيامك بالذكر والقول الحسن 🤍'
    ]
  },
  {
    id: 'ramadan-last-ten',
    title: 'العشر الأواخر من رمضان',
    description: 'ليالي العتق من النيران والتقرب للرحمن. فيها ليلة القدر خير من ألف شهر.',
    ctaText: 'أدعية ليالي العشر الأواخر',
    route: '/last-ten',
    scheduleType: 'hijri',
    hijriMonth: 9, // Ramadan
    hijriDayStart: 20,
    hijriDayEnd: 30,
    priority: 95, // Higher than general Ramadan
    icon: '🌙',
    theme: {
      bg: 'linear-gradient(135deg, #090514, #120b29, #4c1d95)',
      text: '#f8fafc',
      accent: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.4)',
    },
    rotatingMessages: [
      'أكثر من دعاء: «اللهم إنك عفو تحب العفو فاعف عني» 🤲',
      'تَحرّوا ليلة القدر في الوتر من العشر الأواخر ✨',
      'ليالٍ معدودة قد تغير مجرى حياتك بالأمل والقبول والرضوان 🤍',
      'اجتهادك في هذه الليالي هو استثمار لآخرتك وصلاح لدنياك 🌟'
    ]
  }
];
