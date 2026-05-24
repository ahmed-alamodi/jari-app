import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import Tasbeeh from '../../components/Tasbeeh';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.tasbeeh;

export const metadata = generatePageMetadata({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  keywords: [...pageMeta.keywords],
});

const breadcrumbs = [
  { name: 'الرئيسية', path: '/' },
  { name: 'المسبحة', path: '/tasbeeh' },
];

const faqs = [
  {
    question: 'كيف أستخدم المسبحة الإلكترونية؟',
    answer:
      'اضغط على الزر الرئيسي للمسبحة لكل تسبيحة، وسيقوم العداد بالزيادة تلقائياً. عند الوصول إلى 33 أو 100 يمكنك إعادة ضبط العداد والبدء من جديد.',
  },
  {
    question: 'ما أفضل التسبيحات التي يُستحب قولها بالمسبحة؟',
    answer:
      'من أفضل التسبيحات: سبحان الله (33 مرة)، الحمد لله (33 مرة)، الله أكبر (33 مرة)، ولا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير (مرة).',
  },
];

const schemas = [
  buildWebPageSchema({
    title: pageMeta.title,
    description: pageMeta.description,
    path: pageMeta.path,
  }),
  buildBreadcrumbSchema(breadcrumbs),
  buildFAQSchema(faqs),
];

export default function TasbeehPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">المسبحة</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area">
        <Tasbeeh />
      </div>

      <RelatedAdhkar currentPath="/tasbeeh" />
    </div>
  );
}
