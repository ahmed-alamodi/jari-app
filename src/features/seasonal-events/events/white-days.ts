import { SeasonalEvent } from '../types';

export const whiteDaysEvents: SeasonalEvent[] = [
  {
    id: 'white-days',
    title: 'الأيام البيض (13، 14، 15) 🌕',
    description: 'تبدأ الأيام البيض لشهرنا الحالي. صيامها يعادل صيام الدهر وسنة مؤكدة عن النبي ﷺ.',
    ctaText: 'أذكار وفضائل الصيام 🤲',
    route: '/sunnah',
    scheduleType: 'hijri',
    hijriDays: [13, 14, 15],
    excludeHijriMonths: [9], // Ramadan (fasting is already obligatory)
    excludeHijriDays: {
      12: [13] // 13 Dhul-Hijjah is Tashreeq, fasting is forbidden
    },
    priority: 70,
    icon: '🌕',
    theme: {
      bg: 'linear-gradient(135deg, #0369a1, #0284c7, #075985)',
      text: '#ffffff',
      accent: '#f59e0b',
      border: 'rgba(3, 105, 161, 0.3)',
    },
    rotatingMessages: [
      '«صيام ثلاثة أيام من كل شهر صيام الدهر، وهي أيام البيض: ثلاث عشرة وأربع عشرة وخمس عشرة» 🌕',
      'صيام الأيام البيض يطهر البدن ويقرب العبد من ربه ويجدد الروح 📿',
      'احرص على تبييت النية وتجديد العهد مع الله تعالى بالعمل الصالح 🤲'
    ]
  }
];
