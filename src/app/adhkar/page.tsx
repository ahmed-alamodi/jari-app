import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import AdhkarIndexClient from '../../components/AdhkarIndexClient';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { buildWebPageSchema, buildBreadcrumbSchema, buildItemListSchema } from '../../lib/seo/schema';
import { PAGE_META } from '../../lib/seo/config';
import categories from '../../data/categories.json';

export const dynamic = 'force-static';

const pageMeta = PAGE_META.adhkar;

export const metadata = generatePageMetadata({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  keywords: [...pageMeta.keywords],
});

const breadcrumbs = [
  { name: 'الرئيسية', path: '/' },
  { name: 'فهرس حصن المسلم', path: '/adhkar' },
];

// ItemList schema for the 133 categories
const itemListSchema = buildItemListSchema({
  name: 'فهرس حصن المسلم',
  description: 'قائمة شاملة بأكثر من 133 قسماً من أقسام حصن المسلم',
  path: '/adhkar',
  items: categories.slice(0, 50).map((cat, i) => ({
    name: cat.title,
    path: `/adhkar/${cat.slug}`,
    position: i + 1,
  })),
});

const schemas = [
  buildWebPageSchema({
    title: pageMeta.title,
    description: pageMeta.description,
    path: pageMeta.path,
  }),
  buildBreadcrumbSchema(breadcrumbs),
  itemListSchema,
];

export default function AdhkarIndexPage() {
  return (
    <>
      <JsonLd schema={schemas} />
      <Breadcrumb items={breadcrumbs} />
      <AdhkarIndexClient />
    </>
  );
}
