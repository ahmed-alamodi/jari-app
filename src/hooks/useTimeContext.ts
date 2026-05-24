import { useState, useEffect } from 'react';

export type TimeContext = 'morning' | 'evening' | 'night' | 'general';

export function useTimeContext(): TimeContext {
  const [context, setContext] = useState<TimeContext>('general');

  useEffect(() => {
    const determineContext = () => {
      const hour = new Date().getHours();
      
      // Heuristic for time context (can be replaced with actual prayer times API later)
      if (hour >= 4 && hour < 11) {
        setContext('morning'); // Post-Fajr to Dhuhr
      } else if (hour >= 15 && hour < 20) {
        setContext('evening'); // Asr to Maghrib/Isha
      } else if (hour >= 20 || hour < 4) {
        setContext('night'); // Isha to Fajr
      } else {
        setContext('general');
      }
    };

    determineContext();
    // Re-check every minute
    const interval = setInterval(determineContext, 60000);
    return () => clearInterval(interval);
  }, []);

  return context;
}
