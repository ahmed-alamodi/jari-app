export type EventScheduleType = 'hijri' | 'gregorian' | 'weekly' | 'daily';

export interface SeasonalEventTheme {
  bg: string;     // Gradient background style (e.g. 'linear-gradient(135deg, #10b981, #059669)')
  text: string;   // Text color style or class
  accent: string; // Button background color style (e.g. '#ffffff')
  border: string; // Border border-color (e.g. 'rgba(16, 185, 129, 0.3)')
}

export interface SeasonalEvent {
  id: string;
  title: string;
  description: string;
  ctaText?: string;
  route: string;
  scheduleType: EventScheduleType;
  
  // Hijri scheduling
  hijriMonth?: number;       // 1 = Muharram, ..., 9 = Ramadan, 12 = Dhul-Hijjah
  hijriDayStart?: number;    // Start day of the event
  hijriDayEnd?: number;      // End day of the event (inclusive, for multi-day events)
  hijriDays?: number[];      // Specific Hijri days (e.g. [13, 14, 15] for White Days)

  // Gregorian scheduling
  gregorianMonth?: number;   // 1 = Jan, ..., 12 = Dec
  gregorianDayStart?: number;
  gregorianDayEnd?: number;

  // Weekly scheduling
  daysOfWeek?: number[];     // 0 = Sunday, 1 = Monday, 4 = Thursday, 5 = Friday, etc.

  // Daily time scheduling (optional filter)
  hourStart?: number;        // 0-23
  hourEnd?: number;          // 0-23

  priority: number;          // Prioritization order (higher = more important)
  theme: SeasonalEventTheme;
  icon: string;              // Emoji icon (e.g. 🕋, 🤲, 🌙)
  rotatingMessages?: string[]; // Rotating spiritual reminders/tips
}
