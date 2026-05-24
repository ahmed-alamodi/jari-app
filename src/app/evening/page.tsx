import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { eveningAdhkar } from '../../data/adhkar';
import DhikrCard from '../../components/DhikrCard';
import SessionComplete from '../../components/SessionComplete';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildAdhkarPageSchemas } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.evening;

export const metadata = generatePageMetadata({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  keywords: [...pageMeta.keywords],
  ogType: 'article',
  articleSection: pageMeta.section,
});

const breadcrumbs = [
  { name: 'الرئيسية', path: '/' },
  { name: 'أذكار المساء', path: '/evening' },
];

const faqs = [
  {
    question: 'ما هي أذكار المساء؟',
    answer:
      'أذكار المساء هي الأدعية والأذكار المسنونة التي يقرأها المسلم بعد صلاة العصر وحتى غروب الشمس. وقد وردت بالسنة النبوية المطهرة وتشمل آيات وأذكاراً خاصة بوقت المساء.',
  },
  {
    question: 'متى يُقرأ أذكار المساء؟',
    answer:
      'يُقرأ أذكار المساء من بعد صلاة العصر وحتى غروب الشمس تقريباً، وقال بعض العلماء أنها تمتد إلى ما بعد المغرب.',
  },
  {
    question: 'ما فضل المداومة على أذكار المساء؟',
    answer:
      'المداومة على أذكار المساء تحفظ العبد وتحصنه في ليلته، وتجلب البركة، وهي سنة مؤكدة عن النبي ﷺ.',
  },
];

const schemas = buildAdhkarPageSchemas({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  section: pageMeta.section,
  breadcrumbs,
  keywords: [...pageMeta.keywords],
  faqs,
});

export default function EveningPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">أذكار المساء</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area">
        {eveningAdhkar.map((dhikr) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
        <SessionComplete type="evening" />
      </div>

      <RelatedAdhkar currentPath="/evening" />
    </div>
  );
}
