"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { CheckCircle } from 'lucide-react';

interface Props {
  type: 'morning' | 'evening';
}

export default function SessionComplete({ type }: Props) {
  const today = new Date().toISOString().split('T')[0];

  const streak = useLiveQuery(() => db.streaks.get(today), [today]);

  const isCompleted = type === 'morning' ? streak?.completedMorning : streak?.completedEvening;

  const handleComplete = async () => {
    const currentStreak = await db.streaks.get(today) || {
      date: today,
      completedMorning: false,
      completedEvening: false,
      tasbeehCount: 0
    };

    if (type === 'morning') {
      currentStreak.completedMorning = true;
    } else {
      currentStreak.completedEvening = true;
    }

    await db.streaks.put(currentStreak);
  };

  if (isCompleted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <CheckCircle size={24} />
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>تم إنجاز أذكار {type === 'morning' ? 'الصباح' : 'المساء'} بنجاح</span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button className="btn-primary" onClick={handleComplete}>
        <CheckCircle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
        أتممت الأذكار
      </button>
    </div>
  );
}
