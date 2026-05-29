import DynamicDhikrSection from '../../../components/DynamicDhikrSection';
import JsonLd from '../../../components/seo/JsonLd';
import Breadcrumb from '../../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../../components/seo/RelatedAdhkar';
import { generateAdhkarMetadata } from '../../../lib/seo/metadata';
import { buildAdhkarPageSchemas, buildFAQSchema } from '../../../lib/seo/schema';
import categories from '../../../data/categories.json';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const thikrRegex = /<div class="thikr">([\s\S]*?)<\/div>/g;
const audioRegex = /data-audio="([^"]+)"/;

// Generate static parameters for all 133 categories at build time for instant loading and SEO
export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

// Generate dynamic SEO metadata using the centralized utility
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = categories.find((cat) => cat.slug === decodedSlug);

  if (!category) {
    return {
      title: 'القسم غير موجود - حصن المسلم',
      robots: { index: false, follow: false },
    };
  }

  return generateAdhkarMetadata(category);
}

export default async function AdhkarDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = categories.find((cat) => cat.slug === decodedSlug);

  if (!category) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>القسم غير موجود</h1>
        <p>عذراً، هذا القسم غير متوفر في الفهرس.</p>
      </div>
    );
  }

  // Fetch and parse the adhkar on the server side (CORS-free!)
  let adhkarList: {
    id: string;
    text: string;
    count: number;
    info: string;
    audioUrl?: string;
  }[] = [];

  try {
    const res = await fetch(category.original_url, { next: { revalidate: 86400 } });
    if (res.ok) {
      const html = await res.text();
      let match;
      let idx = 0;

      thikrRegex.lastIndex = 0;

      while ((match = thikrRegex.exec(html)) !== null) {
        const content = match[1];
        const audioMatch = content.match(audioRegex);
        const audioUrl = audioMatch ? audioMatch[1] : undefined;

        let cleanedText = content
          .replace(/<span class="player">[\s\S]*?<\/span>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\s+/g, ' ')
          .trim();

        let count = 1;
        let info = '';

        const countMatch = cleanedText.match(/\(([^)]+)\)$/);
        if (countMatch) {
          const countText = countMatch[1];
          info = countText;
          if (countText.includes('ثلاث') || countText.includes('3')) count = 3;
          else if (countText.includes('أربع') || countText.includes('4')) count = 4;
          else if (countText.includes('سبع') || countText.includes('7')) count = 7;
          else if (countText.includes('مائة') || countText.includes('100')) count = 100;
          else if (countText.includes('عشر') || countText.includes('10')) count = 10;
        }

        adhkarList.push({
          id: `dyn-${category.id}-${idx}`,
          text: cleanedText,
          count,
          info,
          audioUrl,
        });
        idx++;
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic adhkar:', error);
  }

  // ─── Structured Data ───────────────────────────────────────────────────────
  const path = `/adhkar/${category.slug}`;
  const description = `أذكار وأدعية ${category.title} كاملة من كتاب حصن المسلم مع العداد التفاعلي والتقدم اليومي.`;

  const breadcrumbs = [
    { name: 'الرئيسية', path: '/' },
    { name: 'فهرس حصن المسلم', path: '/adhkar' },
    { name: category.title, path },
  ];

  // Generate contextual FAQ from adhkar content
  const faqs = [
    {
      question: `ما هي أذكار ${category.title}؟`,
      answer:
        adhkarList.length > 0
          ? `أذكار ${category.title} هي مجموعة من الأدعية والأذكار الواردة في كتاب حصن المسلم، وتشمل ${adhkarList.length} ذكراً ودعاء مأثوراً.`
          : `أذكار ${category.title} واردة في كتاب حصن المسلم للشيخ سعيد بن وهف القحطاني.`,
    },
    ...(adhkarList.length > 0
      ? [
          {
            question: `كم عدد أذكار ${category.title}؟`,
            answer: `يحتوي قسم ${category.title} على ${adhkarList.length} ذكراً ودعاء مكتوباً مع العداد التفاعلي لمتابعة التقدم.`,
          },
        ]
      : []),
  ];

  const schemas = buildAdhkarPageSchemas({
    title: `${category.title} - حصن المسلم`,
    description,
    path,
    section: 'حصن المسلم',
    breadcrumbs,
    keywords: [category.title, `أذكار ${category.title}`, 'حصن المسلم'],
    faqs,
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd schema={schemas} />

      {/* Breadcrumb navigation */}
      <Breadcrumb items={breadcrumbs} />

      {/* Main adhkar content */}
      <DynamicDhikrSection
        title={category.title}
        categoryId={category.id}
        adhkar={adhkarList}
      />

      {/* Internal linking */}
      <RelatedAdhkar currentPath={path} />
    </>
  );
}
