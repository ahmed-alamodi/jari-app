/**
 * ResourceHints — Server Component that injects performance resource hints.
 *
 * Adds preconnect, dns-prefetch, and preload hints to speed up:
 * - External font loading
 * - Dynamic adhkar fetching from islambook.com
 * - Critical assets
 *
 * This is a Server Component — renders once, zero JS bundle cost.
 */

export default function ResourceHints() {
  return (
    <>
      {/* Preconnect to Google Fonts (for any remaining CSS refs) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for dynamic adhkar source */}
      <link rel="dns-prefetch" href="//www.islambook.com" />

      {/* Preconnect to Vercel Analytics */}
      <link rel="preconnect" href="https://va.vercel-scripts.com" />

      {/* Prefetch key pages for faster navigation */}
      <link rel="prefetch" href="/morning" as="document" />
      <link rel="prefetch" href="/evening" as="document" />
    </>
  );
}
