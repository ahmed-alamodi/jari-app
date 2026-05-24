"use client";

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Dhikr } from '../data/adhkar';
import { db } from '../lib/db';
import { Play, Pause } from 'lucide-react';

interface DhikrCardProps {
  dhikr: Dhikr & { audioUrl?: string };
}

export default function DhikrCard({ dhikr }: DhikrCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const progressId = `${dhikr.id}-${today}`;

  const progress = useLiveQuery(
    () => db.progress.get(progressId),
    [progressId]
  );

  const count = progress?.countCompleted || 0;
  
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dhikr.audioUrl) return;

    if (playing && audio) {
      audio.pause();
      setPlaying(false);
    } else {
      if (audio) {
        audio.play().catch(err => console.error("Audio play failed:", err));
        setPlaying(true);
      } else {
        const newAudio = new Audio(dhikr.audioUrl);
        newAudio.play().catch(err => console.error("Audio play failed:", err));
        setPlaying(true);
        newAudio.onended = () => setPlaying(false);
        newAudio.onerror = () => setPlaying(false);
        setAudio(newAudio);
      }
    }
  };

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
      
      <div className="dhikr-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
        {dhikr.audioUrl ? (
          <button 
            onClick={togglePlay}
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title={playing ? "إيقاف مؤقت" : "تشغيل الصوت"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        ) : <div />}
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
