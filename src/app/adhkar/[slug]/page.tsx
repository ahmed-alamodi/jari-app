import { Metadata } from 'next';
import DynamicDhikrSection from '../../../components/DynamicDhikrSection';
import categories from '../../../data/categories.json';

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

// Generate dynamic SEO metadata (Title & Description) for search engine indexing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = categories.find((cat) => cat.slug === decodedSlug);

  if (!category) {
    return {
      title: 'القسم غير موجود - حصن المسلم',
    };
  }

  return {
    title: `${category.title} - حصن المسلم`,
    description: `قراءة أذكار وأدعية ${category.title} كاملة من كتاب حصن المسلم مع العداد الصوتي والتقدم اليومي.`,
    alternates: {
      canonical: `/adhkar/${category.slug}`,
    },
  };
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
  let adhkarList: { id: string; text: string; count: number; info: string; audioUrl?: string }[] = [];
  try {
    const res = await fetch(category.original_url, { next: { revalidate: 86400 } }); // cache for 24h
    if (res.ok) {
      const html = await res.text();
      let match;
      let idx = 0;
      
      // Reset regex index just in case
      thikrRegex.lastIndex = 0;
      
      while ((match = thikrRegex.exec(html)) !== null) {
        const content = match[1];
        const audioMatch = content.match(audioRegex);
        const audioUrl = audioMatch ? audioMatch[1] : undefined;
        
        // Clean text tags, spaces, and entities
        let cleanedText = content
          .replace(/<span class="player">[\s\S]*?<\/span>/g, '') // remove player span
          .replace(/<[^>]*>/g, '') // remove HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\s+/g, ' ')
          .trim();
          
        // Heuristic count parsing
        let count = 1;
        let info = '';
        
        // Look for count inside parentheses, like (ثلاثَ مرَّاتٍ) or (أربعَ مَرَّاتٍ) or (مائة مرَّةٍ)
        // Usually, Hisn al-Muslim marks them at the end.
        const countMatch = cleanedText.match(/\(([^)]+)\)$/);
        if (countMatch) {
          const countText = countMatch[1];
          info = countText;
          if (countText.includes('ثلاث') || countText.includes('3')) {
            count = 3;
          } else if (countText.includes('أربع') || countText.includes('4')) {
            count = 4;
          } else if (countText.includes('سبع') || countText.includes('7')) {
            count = 7;
          } else if (countText.includes('مائة') || countText.includes('100')) {
            count = 100;
          } else if (countText.includes('عشر') || countText.includes('10')) {
            count = 10;
          }
        }
        
        adhkarList.push({
          id: `dyn-${category.id}-${idx}`,
          text: cleanedText,
          count: count,
          info: info,
          audioUrl
        });
        idx++;
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic adhkar:', error);
  }

  return (
    <DynamicDhikrSection 
      title={category.title}
      categoryId={category.id}
      adhkar={adhkarList}
    />
  );
}
