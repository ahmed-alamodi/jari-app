"use client";

import Link from 'next/link';
import { useTimeContext } from '../hooks/useTimeContext';
import StreakDashboard from '../components/StreakDashboard';

export default function Home() {
  const timeContext = useTimeContext();

  const sections = [
    { id: 'morning', title: 'أذكار الصباح', path: '/morning', icon: '🌅' },
    { id: 'evening', title: 'أذكار المساء', path: '/evening', icon: '🌇' },
    { id: 'tasbeeh', title: 'المسبحة', path: '/tasbeeh', icon: '📿' },
    { id: 'arafah', title: 'أدعية يوم عرفة', path: '/arafah', icon: '🤲' },
    { id: 'last-ten', title: 'أدعية ليالي العشر', path: '/last-ten', icon: '🌙' },
    { id: 'comprehensive', title: 'جوامع الدعاء', path: '/comprehensive', icon: '📖' },
    { id: 'sunnah', title: 'سنة نبوية', path: '/sunnah', icon: '🕌' },
    { id: 'settings', title: 'الإعدادات', path: '/settings', icon: '⚙️' },
  ];

  let recommendation = null;
  if (timeContext === 'morning') {
    recommendation = { title: 'وقت أذكار الصباح', path: '/morning', icon: '🌅' };
  } else if (timeContext === 'evening') {
    recommendation = { title: 'وقت أذكار المساء', path: '/evening', icon: '🌇' };
  } else if (timeContext === 'night') {
    recommendation = { title: 'خلوة الليل - المسبحة', path: '/tasbeeh', icon: '📿' };
  }

  const sortedSections = [...sections].sort((a, b) => {
    if (a.id === 'settings') return 1;
    if (b.id === 'settings') return -1;
    if (recommendation && a.path === recommendation.path) return -1;
    if (recommendation && b.path === recommendation.path) return 1;
    return 0;
  });

  return (
    <div className="animate-fade-in">
      {/* Context Banner */}
      {recommendation && (
        <Link href={recommendation.path} style={{ textDecoration: 'none' }}>
          <div className="context-banner glass" style={{
            marginBottom: '20px',
            padding: '14px 20px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--primary)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{recommendation.icon}</span>
            <span>{recommendation.title}</span>
            <span style={{ marginRight: 'auto', fontSize: '0.8rem', opacity: 0.7 }}>ابدأ ←</span>
          </div>
        </Link>
      )}

      {/* Streak Dashboard */}
      <StreakDashboard />

      {/* Navigation Grid */}
      <div className="nav-grid">
        {sortedSections.map((section) => (
          <Link
            key={section.id}
            href={section.path}
            className={`nav-card glass ${recommendation && section.path === recommendation.path ? 'recommended-card' : ''}`}
          >
            <span className="nav-icon">{section.icon}</span>
            <h2 className="nav-title">{section.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
