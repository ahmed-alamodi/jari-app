import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.comprehensive;

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
  { name: 'جوامع الدعاء', path: '/comprehensive' },
];

const faqs = [
  {
    question: 'ما هي جوامع الدعاء؟',
    answer:
      'جوامع الدعاء هي الأدعية الجامعة التي تشمل خيرَي الدنيا والآخرة، ومنها: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار"، وغيرها من الأدعية القرآنية والنبوية.',
  },
];

const schemas = [
  buildWebPageSchema({ title: pageMeta.title, description: pageMeta.description, path: pageMeta.path }),
  buildBreadcrumbSchema(breadcrumbs),
  buildFAQSchema(faqs),
];

export default function ComprehensivePage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">جوامع الدعاء</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area card glass">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          محتوى جوامع الدعاء قيد التجهيز...
        </p>
      </div>

      <RelatedAdhkar currentPath="/comprehensive" />
    </div>
  );
}
