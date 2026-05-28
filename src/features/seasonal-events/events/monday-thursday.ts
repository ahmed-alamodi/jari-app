import { SeasonalEvent } from '../types';

export const mondayThursdayEvents: SeasonalEvent[] = [
  {
    id: 'monday-fasting-reminder',
    title: 'تذكير بصيام الاثنين 🗓️',
    description: 'غداً الاثنين.. صيام يوم الاثنين سنة مؤكدة تُعرض فيها الأعمال على الله.',
    ctaText: 'فضائل الصيام والأذكار 🤲',
    route: '/sunnah',
    scheduleType: 'weekly',
    daysOfWeek: [0], // Sunday (to remind for Monday)
    priority: 65,
    icon: '🗓️',
    theme: {
      bg: 'linear-gradient(135deg, #1e293b, #334155, #475569)',
      text: '#f8fafc',
      accent: '#34d399',
      border: 'rgba(71, 85, 105, 0.3)',
    },
    rotatingMessages: [
      '«تُعرض الأعمال يوم الاثنين والخميس، فأحب أن يُعرض عملي وأنا صائم» - النبي ﷺ 🤍',
      'صيام التطوع يزيد في الحسنات ويرفع الدرجات ويباعد بين العبد والنار 📿',
      'تبييت النية بالليل لصيام التطوع مستحب، فاجعل نيتك صالحة ومقربة إلى الله 🤲'
    ]
  },
  {
    id: 'thursday-fasting-reminder',
    title: 'تذكير بصيام الخميس 🗓️',
    description: 'غداً الخميس.. صيام يوم الخميس سنة مؤكدة تُعرض فيها الأعمال على الله.',
    ctaText: 'فضائل الصيام والأذكار 🤲',
    route: '/sunnah',
    scheduleType: 'weekly',
    daysOfWeek: [3], // Wednesday (to remind for Thursday)
    priority: 65,
    icon: '🗓️',
    theme: {
      bg: 'linear-gradient(135deg, #1e293b, #334155, #475569)',
      text: '#f8fafc',
      accent: '#34d399',
      border: 'rgba(71, 85, 105, 0.3)',
    },
    rotatingMessages: [
      '«تُعرض الأعمال يوم الاثنين والخميس، فأحب أن يُعرض عملي وأنا صائم» - النبي ﷺ 🤍',
      'صيام التطوع يزيد في الحسنات ويرفع الدرجات ويباعد بين العبد والنار 📿',
      'تبييت النية بالليل لصيام التطوع مستحب، فاجعل نيتك صالحة ومقربة إلى الله 🤲'
    ]
  }
];
