/**
 * Shared font loader for all OG image routes.
 *
 * IMPORTANT: Satori (next/og rendering engine) requires fonts in TTF or OTF format.
 * It does NOT support woff2. We request woff from Google Fonts by using an
 * older User-Agent, then parse the URL from the CSS response.
 */
export async function loadArabicFont(): Promise<ArrayBuffer | null> {
  try {
    // Use an older UA so Google Fonts returns woff (not woff2)
    // Satori only supports TTF/OTF — woff is actually binary-compatible with OTF
    // Actually Satori supports woff1 (with raw OpenType tables inside)
    const cssResponse = await fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400',
      {
        headers: {
          // IE11 UA: Google returns woff format (not woff2) for older browsers
          'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!cssResponse.ok) return null;
    const css = await cssResponse.text();

    // Extract woff URL — for older UAs Google returns TTF or woff
    const fontUrlMatch = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
    if (!fontUrlMatch?.[1]) return null;

    const fontResponse = await fetch(fontUrlMatch[1], {
      next: { revalidate: 86400 },
    });

    if (!fontResponse.ok) return null;
    return fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}
