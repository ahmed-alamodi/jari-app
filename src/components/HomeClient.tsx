"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StreakDashboard from './StreakDashboard';
import JsonLd from './seo/JsonLd';

interface Section {
  id: string;
  title: string;
  path: string;
  icon: string;
}

const SECTIONS: Section[] = [
  { id: 'morning', title: 'أذكار الصباح', path: '/morning', icon: '🌅' },
  { id: 'evening', title: 'أذكار المساء', path: '/evening', icon: '🌇' },
  { id: 'arafah', title: 'أدعية يوم عرفة', path: '/arafah', icon: '🤲' },
  { id: 'sleep', title: 'أذكار النوم', path: '/sleep', icon: '🛌' },
  { id: 'index', title: 'فهرس حصن المسلم', path: '/adhkar', icon: '📚' },
  { id: 'tasbeeh', title: 'المسبحة', path: '/tasbeeh', icon: '📿' },
  { id: 'last-ten', title: 'أدعية ليالي العشر', path: '/last-ten', icon: '🌙' },
  { id: 'comprehensive', title: 'جوامع الدعاء', path: '/comprehensive', icon: '📖' },
  { id: 'sunnah', title: 'سنة نبوية', path: '/sunnah', icon: '🕌' },
  { id: 'settings', title: 'الإعدادات', path: '/settings', icon: '⚙️' },
];

export default function HomeClient({ webPageSchema }: { webPageSchema: any }) {
  const [mounted, setMounted] = useState(false);
  const [timeContext, setTimeContext] = useState<'morning' | 'evening' | 'night' | 'general'>('general');

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      setTimeContext('morning');
    } else if (hour >= 15 && hour < 20) {
      setTimeContext('evening');
    } else if (hour >= 20 || hour < 4) {
      setTimeContext('night');
    }
  }, []);

  let recommendation: { title: string; path: string; icon: string } | null = null;
  if (timeContext === 'morning') {
    recommendation = { title: 'وقت أذكار الصباح', path: '/morning', icon: '🌅' };
  } else if (timeContext === 'evening') {
    recommendation = { title: 'وقت أذكار المساء', path: '/evening', icon: '🌇' };
  } else if (timeContext === 'night') {
    recommendation = { title: 'وقت أذكار النوم', path: '/sleep', icon: '🛌' };
  }

  const sortedSections = [...SECTIONS].sort((a, b) => {
    if (a.id === 'settings') return 1;
    if (b.id === 'settings') return -1;
    if (recommendation && a.path === recommendation.path) return -1;
    if (recommendation && b.path === recommendation.path) return 1;
    return 0;
  });

  return (
    <div className="animate-fade-in">
      {/* JSON-LD Structured Data */}
      <JsonLd schema={webPageSchema} />

      {/* SEO h1 — visually integrated as a subtitle */}
      <h1
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '16px',
          opacity: 0.8,
        }}
      >
        أذكار الصباح والمساء والنوم · مسبحة إلكترونية · حصن المسلم · صدقة جارية
      </h1>

      {/* Context Banner */}
      {mounted && recommendation && (
        <Link href={recommendation.path} style={{ textDecoration: 'none' }}>
          <div
            className="context-banner glass"
            style={{
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
            }}
          >
            <span style={{ fontSize: '1.4rem' }} aria-hidden="true">
              {recommendation.icon}
            </span>
            <span>{recommendation.title}</span>
            <span style={{ marginRight: 'auto', fontSize: '0.8rem', opacity: 0.7 }}>
              ابدأ ←
            </span>
          </div>
        </Link>
      )}

      {/* Streak Dashboard */}
      <StreakDashboard />

      {/* Navigation Grid — landmark for screen readers */}
      <nav aria-label="أقسام التطبيق">
        <div className="nav-grid">
          {(mounted ? sortedSections : SECTIONS).map((section) => (
            <Link
              key={section.id}
              href={section.path}
              className={`nav-card glass ${mounted && recommendation && section.path === recommendation.path ? 'recommended-card' : ''}`}
              aria-label={section.title}
            >
              <span className="nav-icon" aria-hidden="true">
                {section.icon}
              </span>
              <h2 className="nav-title">{section.title}</h2>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
