"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db, Streak } from '../lib/db';
import { Flame, Trophy, Calendar, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

const MILESTONES = [
  { days: 3, label: 'بداية مباركة', icon: '🌱' },
  { days: 7, label: 'أسبوع كامل', icon: '⭐' },
  { days: 14, label: 'أسبوعان من الثبات', icon: '🌟' },
  { days: 30, label: 'شهر من الإخلاص', icon: '🏅' },
  { days: 60, label: 'ستون يوماً', icon: '🎖️' },
  { days: 90, label: 'ثلاثة أشهر', icon: '👑' },
  { days: 180, label: 'نصف عام', icon: '💎' },
  { days: 365, label: 'عام كامل', icon: '🏆' },
];

function getDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

function getDaysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

export default function StreakDashboard() {
  const streaks = useLiveQuery(() => db.streaks.toArray());

  const stats = useMemo(() => {
    if (!streaks || streaks.length === 0) {
      return { currentStreak: 0, longestStreak: 0, weeklyDays: 0, monthlyDays: 0, heatmap: new Map<string, 'partial' | 'full'>(), nextMilestone: MILESTONES[0] };
    }

    const completedDates = streaks
      .filter(s => s.completedMorning || s.completedEvening)
      .sort((a, b) => a.date.localeCompare(b.date));

    // Build heatmap data (last 12 weeks = 84 days)
    const heatmap = new Map<string, 'partial' | 'full'>();
    for (const s of streaks) {
      if (s.completedMorning && s.completedEvening) {
        heatmap.set(s.date, 'full');
      } else if (s.completedMorning || s.completedEvening) {
        heatmap.set(s.date, 'partial');
      }
    }

    // Current streak
    let currentStreak = 0;
    const today = getDateStr(new Date());
    let checkDate = new Date();

    for (let i = 0; i < 1000; i++) {
      const dateStr = getDateStr(checkDate);
      const entry = streaks.find(s => s.date === dateStr);
      if (entry && (entry.completedMorning || entry.completedEvening)) {
        currentStreak++;
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else if (dateStr === today) {
        // Today hasn't been completed yet; still count past streak
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else {
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    const sortedDates = completedDates.map(s => s.date);
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const diff = getDaysBetween(sortedDates[i - 1], sortedDates[i]);
        if (diff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Weekly (last 7 days)
    let weeklyDays = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = getDateStr(d);
      if (heatmap.has(dateStr)) weeklyDays++;
    }

    // Monthly (last 30 days)
    let monthlyDays = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = getDateStr(d);
      if (heatmap.has(dateStr)) monthlyDays++;
    }

    // Next milestone
    const nextMilestone = MILESTONES.find(m => m.days > currentStreak) || MILESTONES[MILESTONES.length - 1];
    const reachedMilestones = MILESTONES.filter(m => m.days <= currentStreak);

    return { currentStreak, longestStreak, weeklyDays, monthlyDays, heatmap, nextMilestone, reachedMilestones };
  }, [streaks]);

  // Build 12-week heatmap grid (84 days)
  const heatmapCells = useMemo(() => {
    const cells: { date: string; level: 'none' | 'partial' | 'full' }[] = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = getDateStr(d);
      const level = stats.heatmap.get(dateStr) || 'none';
      cells.push({ date: dateStr, level });
    }
    return cells;
  }, [stats.heatmap]);

  const dayLabels = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  if (!streaks) return null;

  return (
    <div className="streak-dashboard animate-fade-in">
      {/* Stats Row */}
      <div className="streak-stats-row">
        <div className="streak-stat-card glass">
          <Flame className="streak-stat-icon" size={22} />
          <span className="streak-stat-value">{stats.currentStreak}</span>
          <span className="streak-stat-label">الحالي</span>
        </div>
        <div className="streak-stat-card glass">
          <Trophy className="streak-stat-icon" size={22} />
          <span className="streak-stat-value">{stats.longestStreak}</span>
          <span className="streak-stat-label">الأطول</span>
        </div>
        <div className="streak-stat-card glass">
          <Calendar className="streak-stat-icon" size={22} />
          <span className="streak-stat-value">{stats.weeklyDays}/7</span>
          <span className="streak-stat-label">هذا الأسبوع</span>
        </div>
        <div className="streak-stat-card glass">
          <TrendingUp className="streak-stat-icon" size={22} />
          <span className="streak-stat-value">{stats.monthlyDays}/30</span>
          <span className="streak-stat-label">هذا الشهر</span>
        </div>
      </div>

      {/* Soft Motivational Message */}
      {stats.currentStreak > 0 && stats.nextMilestone && (
        <div className="streak-motivation glass">
          <span>{stats.nextMilestone.icon}</span>
          <span>
            باقي <strong>{stats.nextMilestone.days - stats.currentStreak}</strong> {stats.nextMilestone.days - stats.currentStreak === 1 ? 'يوم' : 'أيام'} لإنجاز &quot;{stats.nextMilestone.label}&quot;
          </span>
        </div>
      )}

      {/* Reached Milestones */}
      {stats.reachedMilestones && stats.reachedMilestones.length > 0 && (
        <div className="streak-milestones">
          {stats.reachedMilestones.map(m => (
            <span key={m.days} className="milestone-badge glass" title={m.label}>
              {m.icon}
            </span>
          ))}
        </div>
      )}

      {/* Heatmap */}
      <div className="heatmap-container glass">
        <h3 className="heatmap-title">نشاطك في آخر 12 أسبوع</h3>
        <div className="heatmap-grid">
          {heatmapCells.map((cell) => (
            <div
              key={cell.date}
              className={`heatmap-cell heatmap-${cell.level}`}
              title={cell.date}
            />
          ))}
        </div>
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">أقل</span>
          <div className="heatmap-cell heatmap-none" />
          <div className="heatmap-cell heatmap-partial" />
          <div className="heatmap-cell heatmap-full" />
          <span className="heatmap-legend-label">أكثر</span>
        </div>
      </div>
    </div>
  );
}
