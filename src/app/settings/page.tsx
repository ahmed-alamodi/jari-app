import SettingsClient from '../../components/SettingsClient';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { PAGE_META } from '../../lib/seo/config';

const pageMeta = PAGE_META.settings;

// Settings page should NOT be indexed by search engines
export const metadata = generatePageMetadata({
  title: pageMeta.title,
  description: pageMeta.description,
  path: pageMeta.path,
  keywords: [...pageMeta.keywords],
  noIndex: true,
});

export default function SettingsPage() {
  return <SettingsClient />;
}

