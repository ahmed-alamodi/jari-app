import { SeasonalEvent } from '../types';
import { getHijriDate } from './hijri';

/**
 * Checks if a specific event is active at the given date and time.
 */
export function isEventActive(event: SeasonalEvent, date: Date = new Date()): boolean {
  const gregorianMonth = date.getMonth() + 1; // 1-12
  const gregorianDay = date.getDate();
  const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)
  const hour = date.getHours();

  // 1. Evaluate Daily Hour constraint if present
  if (event.hourStart !== undefined && event.hourEnd !== undefined) {
    // If range wraps around midnight (e.g. 22:00 to 04:00)
    if (event.hourStart > event.hourEnd) {
      if (hour < event.hourStart && hour > event.hourEnd) return false;
    } else {
      if (hour < event.hourStart || hour > event.hourEnd) return false;
    }
  }

  // 2. Evaluate Scheduling Match based on Schedule Type
  switch (event.scheduleType) {
    case 'hijri': {
      const hijri = getHijriDate(date);
      if (event.hijriMonth !== undefined && event.hijriMonth !== hijri.month) {
        return false;
      }
      
      if (event.hijriDays !== undefined) {
        return event.hijriDays.includes(hijri.day);
      }

      if (event.hijriDayStart !== undefined && event.hijriDayEnd !== undefined) {
        return hijri.day >= event.hijriDayStart && hijri.day <= event.hijriDayEnd;
      }

      if (event.hijriDayStart !== undefined) {
        return hijri.day === event.hijriDayStart;
      }

      return true;
    }

    case 'gregorian': {
      if (event.gregorianMonth !== undefined && event.gregorianMonth !== gregorianMonth) {
        return false;
      }

      if (event.gregorianDayStart !== undefined && event.gregorianDayEnd !== undefined) {
        return gregorianDay >= event.gregorianDayStart && gregorianDay <= event.gregorianDayEnd;
      }

      if (event.gregorianDayStart !== undefined) {
        return gregorianDay === event.gregorianDayStart;
      }

      return true;
    }

    case 'weekly': {
      if (event.daysOfWeek !== undefined) {
        return event.daysOfWeek.includes(dayOfWeek);
      }
      return false;
    }

    case 'daily':
    default:
      return true;
  }
}

/**
 * Gets the correct dismissal key for an event based on its schedule type and current year.
 * - Hijri events use the current Hijri year (e.g., arafah_dismissed_1447)
 * - Other events use the current Gregorian year (e.g., friday_dismissed_2026)
 */
export function getDismissalKey(event: SeasonalEvent, date: Date = new Date()): string {
  if (event.scheduleType === 'hijri') {
    const hijri = getHijriDate(date);
    return `${event.id}_dismissed_${hijri.year}`;
  } else {
    const gregorianYear = date.getFullYear();
    return `${event.id}_dismissed_${gregorianYear}`;
  }
}

/**
 * Filters the list of events to return those currently active,
 * excluding dismissed ones, sorted by priority (highest first).
 */
export function getActiveEvents(
  allEvents: SeasonalEvent[],
  date: Date = new Date(),
  bypassDismissCheck: boolean = false
): SeasonalEvent[] {
  return allEvents
    .filter((event) => {
      // Check if the date rules match
      if (!isEventActive(event, date)) return false;

      // Check if dismissed in localStorage (unless bypassed during manual testing)
      if (!bypassDismissCheck && typeof window !== 'undefined') {
        const dismissKey = getDismissalKey(event, date);
        if (localStorage.getItem(dismissKey) === 'true') {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => b.priority - a.priority); // High priority first
}
