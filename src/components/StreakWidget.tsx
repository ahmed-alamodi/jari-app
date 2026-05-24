"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StreakWidget() {
  const [streakCount, setStreakCount] = useState(0);

  const streaks = useLiveQuery(() => db.streaks.toArray());

  useEffect(() => {
    if (!streaks) return;

    // Calculate current streak based on consecutive days of completing either morning or evening adhkar
    let currentStreak = 0;
    const sortedStreaks = [...streaks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let checkDate = new Date();
    
    for (const streak of sortedStreaks) {
      const streakDate = new Date(streak.date);
      const isToday = streakDate.toDateString() === new Date().toDateString();
      const isYesterday = new Date(checkDate.getTime() - 86400000).toDateString() === streakDate.toDateString();

      if ((isToday || isYesterday) && (streak.completedMorning || streak.completedEvening)) {
        currentStreak++;
        checkDate = streakDate;
      } else if (!isToday) {
        // Break the streak if we missed a day
        break;
      }
    }

    setStreakCount(currentStreak);
  }, [streaks]);

  if (streakCount === 0) return null;

  return (
    <div className="streak-widget glass" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 15px',
      borderRadius: '20px',
      marginBottom: '20px',
      color: 'var(--primary)',
      fontWeight: 'bold',
      width: 'fit-content'
    }}>
      <Flame fill="currentColor" size={20} />
      <span>{streakCount} أيام متتالية</span>
    </div>
  );
}
