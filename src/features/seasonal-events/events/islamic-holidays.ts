import { SeasonalEvent } from '../types';

export const islamicHolidaysEvents: SeasonalEvent[] = [
  {
    id: 'hijri-new-year',
    title: 'رأس السنة الهجرية (1 محرم) 🗓️',
    description: 'بداية عام هجري جديد. نسأل الله أن يجعله عام خير وبركة ونصر للأمة الإسلامية.',
    ctaText: 'أدعية العام الجديد 🤲',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 1, // Muharram
    hijriDayStart: 1,
    priority: 75,
    icon: '🗓️',
    theme: {
      bg: 'linear-gradient(135deg, #065f46, #047857, #0f766e)',
      text: '#ffffff',
      accent: '#f59e0b',
      border: 'rgba(4, 120, 87, 0.3)',
    },
    rotatingMessages: [
      'اللهم اجعله عاماً مباركاً، مباركاً فيه، وزدنا فيه من فضلك وكرمك 🤍',
      'عام جديد يفتح لنا صفحات جديدة، فلنملأها بالاستغفار، الصلاة، وتلاوة القرآن 📿',
      'نستذكر في هذا اليوم الهجرة النبوية الشريفة وعبر الدروس والتضحية لبناء الأمة 🕌'
    ]
  },
  // {
  //   id: 'mawlid-al-nabawi',
  //   title: 'المولد النبوي الشريف (12 ربيع الأول) 🕌',
  //   description: 'ذكرى مولد خير الأنام سيدنا محمد ﷺ. فرصة متجددة للصلاة والسلام عليه والاقتداء بسيرته الشريفة.',
  //   ctaText: 'سيرة النبي الكريم ﷺ 📖',
  //   route: '/sunnah',
  //   scheduleType: 'hijri',
  //   hijriMonth: 3, // Rabi' al-Awwal
  //   hijriDayStart: 12,
  //   priority: 75,
  //   icon: '🕌',
  //   theme: {
  //     bg: 'linear-gradient(135deg, #1e1b4b, #311042, #4338ca)',
  //     text: '#ffffff',
  //     accent: '#10b981',
  //     border: 'rgba(67, 56, 202, 0.3)',
  //   },
  //   rotatingMessages: [
  //     '«إنَّ اللَّهَ وَمَلائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا» 🤲',
  //     'أكثروا من الصلاة والسلام على النبي المختار في ذكرى مولده ﷺ 📿',
  //     'الاقتداء بسنة النبي ﷺ والتحلي بأخلاقه الفاضلة هو خير تعبير عن محبته 🤍'
  //   ]
  // },
  {
    id: 'isra-miraj',
    title: 'ذكرى الإسراء والمعراج (27 رجب) ✨',
    description: 'معجزة الإسراء والمعراج لرسول الله ﷺ. ذكرى الصبر والعبر والدروس وفرض الصلوات الخمس.',
    ctaText: 'قصة ومعجزات الإسراء 📖',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 7, // Rajab
    hijriDayStart: 27,
    priority: 75,
    icon: '✨',
    theme: {
      bg: 'linear-gradient(135deg, #090514, #120b29, #311042)',
      text: '#ffffff',
      accent: '#38bdf8',
      border: 'rgba(56, 189, 248, 0.2)',
    },
    rotatingMessages: [
      'سبحان الذي أسرى بعبده ليلاً من المسجد الحرام إلى المسجد الأقصى 🤍',
      'فرضت الصلوات الخمس في هذه الليلة العظيمة، فحافظ على صلاتك وسجودك 🤲',
      'ليلة إكرام ونصر وتثبيت لقلب النبي ﷺ بعد عام الحزن والصبر 🌟'
    ]
  },
  {
    id: 'nisf-shaban',
    title: 'ليلة النصف من شعبان (15 شعبان) 🌙',
    description: 'ليلة مباركة تحولت فيها القبلة إلى الكعبة المشرفة. يغفر الله فيها لخلقه إلا لمشرك أو مشاحن.',
    ctaText: 'أدعية وفضائل ليلة النصف 🤲',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriMonth: 8, // Sha'ban
    hijriDayStart: 15,
    priority: 75,
    icon: '🌙',
    theme: {
      bg: 'linear-gradient(135deg, #0f172a, #1e293b, #1d4ed8)',
      text: '#ffffff',
      accent: '#fbbf24',
      border: 'rgba(29, 78, 216, 0.3)',
    },
    rotatingMessages: [
      'يطلع الله إلى جميع خلقه ليلة النصف من شعبان فيغفر لجميع خلقه إلا لمشرك أو مشاحن 🤍',
      'احرص على سلامة صدرك وتسامح مع من بينك وبينهم شقاق وخصومة 🤝',
      'ليلة تحويل القبلة للمسلمين، ذكرى تاريخية عظيمة تربط قلوبنا بمكة المكرمة 🕋'
    ]
  }
];
