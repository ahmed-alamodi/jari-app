import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.sunnah;

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
  { name: 'سنة نبوية', path: '/sunnah' },
];

const faqs = [
  {
    question: 'ما هي أبرز السنن اليومية التي ينبغي للمسلم المحافظة عليها؟',
    answer:
      'من أبرز السنن اليومية: السواك، وقول بسم الله عند الدخول، والدعاء عند الخروج من البيت، وقراءة الآيات قبل النوم، وقول الأذكار عند الأكل والشرب.',
  },
];

const schemas = [
  buildWebPageSchema({ title: pageMeta.title, description: pageMeta.description, path: pageMeta.path }),
  buildBreadcrumbSchema(breadcrumbs),
  buildFAQSchema(faqs),
];

export default function SunnahPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">سنة نبوية</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area card glass">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          محتوى السنن النبوية قيد التجهيز...
        </p>
      </div>

      <RelatedAdhkar currentPath="/sunnah" />
    </div>
  );
}
