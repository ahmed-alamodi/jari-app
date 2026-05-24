/**
 * RelatedAdhkar — Internal linking component for SEO topical authority.
 *
 * Shows 3 related Adhkar sections at the bottom of content pages.
 * Increases topical authority, improves crawlability, reduces bounce rate.
 *
 * This is a Server Component — no client JS needed.
 */

import Link from 'next/link';

interface RelatedSection {
  title: string;
  path: string;
  icon: string;
  description: string;
}

interface RelatedAdhkarProps {
  currentPath: string;
}

const ALL_SECTIONS: RelatedSection[] = [
  {
    title: 'أذكار الصباح',
    path: '/morning',
    icon: '🌅',
    description: 'أذكار ما بعد الفجر',
  },
  {
    title: 'أذكار المساء',
    path: '/evening',
    icon: '🌇',
    description: 'أذكار ما بعد العصر',
  },
  {
    title: 'أذكار النوم',
    path: '/sleep',
    icon: '🛌',
    description: 'أذكار قبل النوم',
  },
  {
    title: 'فهرس حصن المسلم',
    path: '/adhkar',
    icon: '📚',
    description: 'أكثر من 133 قسماً',
  },
  {
    title: 'المسبحة',
    path: '/tasbeeh',
    icon: '📿',
    description: 'عداد التسبيح الذكي',
  },
  {
    title: 'أدعية يوم عرفة',
    path: '/arafah',
    icon: '🤲',
    description: 'أفضل أدعية عرفة',
  },
  {
    title: 'جوامع الدعاء',
    path: '/comprehensive',
    icon: '📖',
    description: 'الأدعية الجامعة',
  },
  {
    title: 'سنة نبوية',
    path: '/sunnah',
    icon: '🕌',
    description: 'سنن مأثورة',
  },
];

export default function RelatedAdhkar({ currentPath }: RelatedAdhkarProps) {
  // Show 3 sections that are NOT the current page
  const related = ALL_SECTIONS.filter((s) => s.path !== currentPath).slice(0, 3);

  return (
    <section
      aria-label="أقسام ذات صلة"
      style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}
    >
      <h2
        style={{
          fontSize: '1.1rem',
          fontWeight: 800,
          color: 'var(--text-muted)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span aria-hidden="true">🔗</span>
        اكتشف المزيد من الأذكار
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
        }}
      >
        {related.map((section) => (
          <Link
            key={section.path}
            href={section.path}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="glass"
              style={{
                padding: '16px',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                color: 'var(--text-main)',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>
                {section.icon}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {section.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {section.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
