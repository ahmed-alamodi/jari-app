import HomeClient from '../components/HomeClient';
import { buildWebPageSchema } from '../lib/seo/schema';
import { generatePageMetadata } from '../lib/seo/metadata';
import { PAGE_META } from '../lib/seo/config';

export const dynamic = 'force-static';

const pageMeta = PAGE_META.home;

export const metadata = generatePageMetadata({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  keywords: [...pageMeta.keywords],
});

export default function Home() {
  const webPageSchema = buildWebPageSchema({
    title: pageMeta.title,
    description: pageMeta.description,
    path: '/',
  });

  return <HomeClient webPageSchema={webPageSchema} />;
}
