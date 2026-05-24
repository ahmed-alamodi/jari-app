import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { morningAdhkar } from '../../data/adhkar';
import DhikrCard from '../../components/DhikrCard';
import SessionComplete from '../../components/SessionComplete';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildAdhkarPageSchemas } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.morning;

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
  { name: 'أذكار الصباح', path: '/morning' },
];

const faqs = [
  {
    question: 'ما هي أذكار الصباح؟',
    answer:
      'أذكار الصباح هي الأدعية والأذكار المسنونة التي يقرأها المسلم بعد صلاة الفجر وحتى وقت الضحى، وقد ثبتت بالقرآن الكريم والسنة النبوية المطهرة. وتشمل: آية الكرسي، والمعوذات، وسبحان الله وبحمده، وغيرها.',
  },
  {
    question: 'كم مرة تُقرأ أذكار الصباح؟',
    answer:
      'تُقرأ أذكار الصباح مرة واحدة في الغالب، وبعضها ثلاث مرات أو سبع مرات أو عشر مرات حسب ما ثبت في السنة النبوية لكل ذكر بحسبه.',
  },
  {
    question: 'ما فضل أذكار الصباح؟',
    answer:
      'لأذكار الصباح فضائل عظيمة منها: حفظ العبد طول يومه، ودفع الأذى والشر، والحصول على الأجر والثواب، والاقتداء بسنة النبي ﷺ.',
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

export default function MorningPage() {
  return (
    <div className="animate-fade-in">
      {/* JSON-LD Structured Data */}
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">أذكار الصباح</h1>
      </div>

      {/* Breadcrumb navigation */}
      <Breadcrumb items={breadcrumbs} />

      <div className="content-area">
        {morningAdhkar.map((dhikr) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} />
        ))}
        <SessionComplete type="morning" />
      </div>

      {/* Internal linking for SEO */}
      <RelatedAdhkar currentPath="/morning" />
    </div>
  );
}
