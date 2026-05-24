import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildAdhkarPageSchemas } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.arafah;

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
  { name: 'أدعية يوم عرفة', path: '/arafah' },
];

const faqs = [
  {
    question: 'ما أفضل دعاء يوم عرفة؟',
    answer:
      'أفضل دعاء يوم عرفة: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير". قال النبي ﷺ: "خير الدعاء دعاء يوم عرفة، وخير ما قلت أنا والنبيون من قبلي: لا إله إلا الله وحده لا شريك له".',
  },
  {
    question: 'لماذا يُعدّ يوم عرفة أفضل أيام العام للدعاء؟',
    answer:
      'يوم عرفة يوم مبارك فيه يُعتق الله أكثر عباده من النار، ويباهي بهم ملائكته، فهو يوم مغفرة وإجابة للدعاء. والحاج يقف فيه بعرفة ويدعو الله من الظهر حتى غروب الشمس.',
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

export default function ArafahPage() {
  return (
    <div className="animate-fade-in">
      <JsonLd schema={schemas} />

      <div className="page-header">
        <Link href="/" className="btn-back" aria-label="العودة للصفحة الرئيسية">
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <h1 className="page-title">أدعية يوم عرفة</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="content-area card glass">
        <p
          className="arabic-text"
          lang="ar"
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          «لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير»
        </p>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          هنا تجد ملفاً يحتوي على مجموعة من أدعية يوم عرفة لفضله العظيم.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="/files/arafah-prayers.pdf"
            download
            className="btn-download"
            aria-label="تحميل كتاب أدعية عرفة بصيغة PDF"
          >
            <Download size={20} aria-hidden="true" />
            تحميل كتاب الأدعية (PDF)
          </a>
        </div>
      </div>

      <RelatedAdhkar currentPath="/arafah" />
    </div>
  );
}
