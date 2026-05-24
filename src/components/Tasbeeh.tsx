"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { RotateCcw } from 'lucide-react';
import { db } from '../lib/db';

export default function Tasbeeh() {
  const today = new Date().toISOString().split('T')[0];

  const streak = useLiveQuery(
    () => db.streaks.get(today),
    [today]
  );

  const count = streak?.tasbeehCount || 0;

  const handleIncrement = async () => {
    const newCount = count + 1;
    await db.streaks.put({
      date: today,
      tasbeehCount: newCount,
      completedMorning: streak?.completedMorning || false,
      completedEvening: streak?.completedEvening || false,
    });
  };

  const handleReset = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await db.streaks.put({
      date: today,
      tasbeehCount: 0,
      completedMorning: streak?.completedMorning || false,
      completedEvening: streak?.completedEvening || false,
    });
  };

  return (
    <div className="tasbeeh-container animate-fade-in">
      <div className="tasbeeh-circle" onClick={handleIncrement}>
        <span className="tasbeeh-count">{count}</span>
      </div>
      
      <button className="tasbeeh-reset" onClick={handleReset}>
        <RotateCcw size={20} />
        تصفير العداد
      </button>
    </div>
  );
}
