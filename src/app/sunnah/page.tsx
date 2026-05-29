import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import RelatedAdhkar from '../../components/seo/RelatedAdhkar';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';
import FridayClient from '../../features/friday/components/FridayClient';

export const dynamic = 'force-static';

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
  { name: 'سنن الجمعة وأذكارها', path: '/sunnah' },
];

const faqs = [
  {
    question: 'ما هي أهم سنن وآداب يوم الجمعة؟',
    answer:
      'من أهم سنن يوم الجمعة: الاغتسال (غسل الجمعة)، والتطيب، ولبس أحسن الثياب، واستعمال السواك، والتبكير إلى المسجد، وقراءة سورة الكهف، والإكثار من الصلاة على النبي ﷺ، والدعاء في ساعة الاستجابة.',
  },
  {
    question: 'ما فضل قراءة سورة الكهف يوم الجمعة؟',
    answer:
      'قراءة سورة الكهف يوم الجمعة تضيء للمسلم نوراً ما بين الجمعتين، كما ثبت في الحديث الصحيح عن النبي ﷺ: «مَنْ قَرَأَ سُورَةَ الْكَهْفِ يَوْمَ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ».',
  },
  {
    question: 'متى تكون ساعة الاستجابة يوم الجمعة؟',
    answer:
      'أرجح أقوال العلماء أن ساعة الاستجابة يوم الجمعة هي الساعة الأخيرة من النهار قبل غروب الشمس (آخر ساعة قبل صلاة المغرب)، فينبغي للمسلم أن يجتهد في الدعاء والابتهال في هذا الوقت المبارك.',
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
        <h1 className="page-title">{pageMeta.title}</h1>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div style={{ marginTop: '20px' }}>
        <FridayClient />
      </div>

      <RelatedAdhkar currentPath="/sunnah" />
    </div>
  );
}

