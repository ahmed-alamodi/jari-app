export interface HijriDate {
  day: number;
  month: number; // 1-indexed (1 = Muharram, 12 = Dhul-Hijjah)
  year: number;
}

/**
 * Calculates the current Hijri date based on the Gregorian date using the
 * native Intl.DateTimeFormat with the islamic-umalqura calendar.
 */
export function getHijriDate(date: Date = new Date()): HijriDate {
  try {
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Riyadh', // Centralized time zone for Islamic scheduling
    });
    
    const parts = formatter.formatToParts(date);
    
    let day = 1;
    let month = 1;
    let year = 1447;
    
    for (const part of parts) {
      if (part.type === 'day') {
        day = parseInt(part.value, 10);
      } else if (part.type === 'month') {
        month = parseInt(part.value, 10);
      } else if (part.type === 'year') {
        year = parseInt(part.value, 10);
      }
    }
    
    return { day, month, year };
  } catch (error) {
    console.error('Failed to calculate Hijri date via Intl API, using approximate fallback:', error);
    // Rough fallback if Intl is unsupported (which is rare on modern browsers)
    return { day: 9, month: 12, year: 1447 }; 
  }
}

export const HIJRI_MONTH_NAMES_AR = [
  'المحرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة'
];

/**
 * Returns the Arabic name for a Hijri month.
 * @param month 1-12
 */
export function getHijriMonthNameAr(month: number): string {
  return HIJRI_MONTH_NAMES_AR[month - 1] || '';
}
