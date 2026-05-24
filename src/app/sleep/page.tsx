import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sleepAdhkar } from '../../data/adhkar';
import DhikrCard from '../../components/DhikrCard';
import SessionComplete from '../../components/SessionComplete';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildAdhkarPageSchemas } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.sleep;

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
  { name: 'أذكار النوم', path: '/sleep' },
];

const faqs = [
  {
    question: 'ما هي أذكار النوم؟',
    answer:
      'أذكار النوم هي الأدعية والأذكار المسنونة التي يقرأها المسلم قبل النوم، ومنها: قراءة آية الكرسي، والمعوذتين، وسورة الإخلاص، والأذكار الواردة عن النبي ﷺ.',
  },
  {
    question: 'ما فضل أذكار النوم؟',
    answer:
      'قال النبي ﷺ لمن يقرأ آية الكرسي قبل النوم: "لم يزل عليك من الله حافظ ولا يقربك شيطان حتى تصبح". والمداومة عليها سنة مؤكدة وحرز وحفظ.',
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

export default function SleepPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">أذكار النوم</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area">
        {sleepAdhkar.map((dhikr) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
        <SessionComplete type="sleep" />
      </div>

      <RelatedAdhkar currentPath="/sleep" />
    </div>
  );
}
