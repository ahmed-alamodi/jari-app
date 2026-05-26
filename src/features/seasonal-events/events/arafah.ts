import { SeasonalEvent } from '../types';

export const arafahEvents: SeasonalEvent[] = [
  {
    id: 'arafah',
    title: 'يوم عرفة المبارك',
    description: 'يوم مغفرة الذنوب وإجابة الدعاء وعتق الرقاب من النار.',
    ctaText: 'تصفح أدعية يوم عرفة 🤲',
    route: '/arafah',
    scheduleType: 'hijri',
    hijriMonth: 12, // Dhul-Hijjah
    hijriDayStart: 9,
    priority: 100, // Highest priority
    icon: '🕋',
    theme: {
      bg: 'linear-gradient(135deg, #064e3b, #047857, #10b981)',
      text: '#ffffff',
      accent: '#f59e0b', // Gold button
      border: 'rgba(245, 158, 11, 0.4)',
    },
    rotatingMessages: [
      '«خيرُ الدُّعاءِ دُعاءُ يَومِ عَرَفَةَ...» 🤍',
      'صيام هذا اليوم يكفّر السنة الماضية والمقبلة ✨',
      'أكثر من: لا إله إلا الله وحده لا شريك له 🤲',
      'يوم يباهي الله فيه بأهل الأرض ملائكة السماء 🌟'
    ]
  },
  {
    id: 'dhul-hijjah-10',
    title: 'عشر ذي الحجة المباركة',
    description: 'أفضل أيام الدنيا! ضاعف فيها الأجر بالذكر، الصيام، والصدقة.',
    ctaText: 'سنن وأعمال عشر ذي الحجة 🕌',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 12, // Dhul-Hijjah
    hijriDayStart: 1,
    hijriDayEnd: 8, // Days 1 to 8 (9 is Arafah, 10 is Eid)
    priority: 85,
    icon: '✨',
    theme: {
      bg: 'linear-gradient(135deg, #1e293b, #0d9488)',
      text: '#f8fafc',
      accent: '#34d399',
      border: 'rgba(52, 211, 153, 0.3)',
    },
    rotatingMessages: [
      'ما من أيام العمل الصالح فيها أحب إلى الله من هذه الأيام 🤍',
      'أكثروا فيهن من التسبيح والتحميد والتهليل والتكبير 📿',
      'فرصة عظيمة لتجديد التوبة وكثرة الاستغفار 🤲'
    ]
  }
];
