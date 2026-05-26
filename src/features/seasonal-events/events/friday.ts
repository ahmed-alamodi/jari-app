import { SeasonalEvent } from '../types';

export const fridayEvents: SeasonalEvent[] = [
  {
    id: 'friday',
    title: 'يوم الجمعة المبارك 🕌',
    description: 'سيد الأيام وخير يوم طلعت عليه الشمس. اغتنمه بالصلاة على النبي وقراءة الكهف.',
    ctaText: 'سنن الجمعة وأذكارها 📖',
    route: '/sunnah',
    scheduleType: 'weekly',
    daysOfWeek: [5], // Friday
    priority: 60,
    icon: '🕌',
    theme: {
      bg: 'linear-gradient(135deg, #0f766e, #0d9488, #14b8a6)',
      text: '#ffffff',
      accent: '#f59e0b',
      border: 'rgba(20, 184, 166, 0.3)',
    },
    rotatingMessages: [
      '«من قرأ سورة الكهف يوم الجمعة أضاء له من النور ما بين الجمعتين» 📖',
      'أكثروا من الصلاة على النبي ﷺ فإن صلاتكم معروضة عليه 📿',
      'في الجمعة ساعة إجابة.. لا تحرم نفسك وأحبابك من صادق الدعاء 🤲',
      'اغتسل، وتطيب، والبس أحسن ثيابك وبكّر إلى الصلاة 🚶‍♂️'
    ]
  },
  {
    id: 'tahajjud-reminder',
    title: 'قيام الليل والوتر 🌙',
    description: 'ينزل ربنا تبارك وتعالى كل ليلة إلى السماء الدنيا في الثلث الأخير، هل من داعٍ فيستجيب له؟',
    ctaText: 'أدعية قيام الليل 🤲',
    route: '/comprehensive',
    scheduleType: 'daily',
    hourStart: 22, // 10 PM
    hourEnd: 3,    // 3 AM
    priority: 30,  // Lower priority so seasonal events take precedence
    icon: '✨',
    theme: {
      bg: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
      text: '#e2e8f0',
      accent: '#38bdf8',
      border: 'rgba(56, 189, 248, 0.2)',
    },
    rotatingMessages: [
      'ركعة واحدة في جوف الليل تضيء عتمة القلب وتفتح أبواب السماء 🤍',
      '«شرف المؤمن قيامه بالليل».. خلوة مع الله ترتاح فيها الروح 🌟',
      'اجعل آخر صلاتك بالليل وتراً 📿',
      'ادعُ الله بما في قلبك، فإن الله قريب مجيب للداعين 🤲'
    ]
  }
];
