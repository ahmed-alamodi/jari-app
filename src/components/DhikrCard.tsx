"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { Dhikr } from '../data/adhkar';
import { db } from '../lib/db';

interface DhikrCardProps {
  dhikr: Dhikr;
}

export default function DhikrCard({ dhikr }: DhikrCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const progressId = `${dhikr.id}-${today}`;

  const progress = useLiveQuery(
    () => db.progress.get(progressId),
    [progressId]
  );

  const count = progress?.countCompleted || 0;

  const handleClick = async () => {
    if (count < dhikr.count) {
      const newCount = count + 1;
      await db.progress.put({
        id: progressId,
        dhikrId: dhikr.id,
        date: today,
        countCompleted: newCount
      });
    }
  };

  const progressPercentage = (count / dhikr.count) * 100;
  const isCompleted = count >= dhikr.count;

  return (
    <div 
      className={`card glass dhikr-card animate-fade-in ${isCompleted ? 'completed' : ''}`}
      onClick={handleClick}
      style={{ cursor: isCompleted ? 'default' : 'pointer', opacity: isCompleted ? 0.7 : 1 }}
    >
      <div className="dhikr-text arabic-text">{dhikr.text}</div>
      {dhikr.info && <div className="dhikr-info">{dhikr.info}</div>}
      
      <div className="dhikr-actions">
        <div className="count-badge">
          {count} / {dhikr.count}
        </div>
      </div>

      <div className="dhikr-progress">
        <div 
          className="dhikr-progress-bar" 
          style={{ width: `${progressPercentage}%`, background: isCompleted ? '#34d399' : 'var(--primary)' }}
        />
      </div>
    </div>
  );
}
