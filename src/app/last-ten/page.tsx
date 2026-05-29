import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

export const dynamic = 'force-static';

const pageMeta = PAGE_META.lastTen;

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
  { name: 'أدعية ليالي العشر', path: '/last-ten' },
];

const faqs = [
  {
    question: 'ما أفضل دعاء في ليالي العشر الأواخر؟',
    answer:
      'أفضل دعاء في ليالي العشر ما علّمه النبي ﷺ لعائشة رضي الله عنها: "اللهم إنك عفوٌّ تحب العفو فاعف عني".',
  },
  {
    question: 'ما فضل ليالي العشر الأواخر من رمضان؟',
    answer:
      'ليالي العشر الأواخر من رمضان هي أفضل ليالي العام، وفيها ليلة القدر التي هي خير من ألف شهر. وكان النبي ﷺ يحيي فيها الليل ويعتكف ويجتهد في العبادة.',
  },
];

const schemas = [
  buildWebPageSchema({ title: pageMeta.title, description: pageMeta.description, path: pageMeta.path }),
  buildBreadcrumbSchema(breadcrumbs),
  buildFAQSchema(faqs),
];

export default function LastTenPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">أدعية ليالي العشر</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area card glass">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          محتوى أدعية ليالي العشر قيد التجهيز...
        </p>
      </div>

      <RelatedAdhkar currentPath="/last-ten" />
    </div>
  );
}
