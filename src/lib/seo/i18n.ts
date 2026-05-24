/**
 * Jari App — Internationalization SEO Utilities
 *
 * Currently Arabic-only. Architecture is ready to add
 * English (/en) or other locales in the future.
 */

import { SEO_CONFIG } from './config';

/**
 * Builds the `alternates.languages` object for Next.js Metadata.
 * Currently returns Arabic self-referencing + x-default.
 *
 * To add English in the future:
 *   return {
 *     ar: `${SEO_CONFIG.siteUrl}${path}`,
 *     en: `${SEO_CONFIG.siteUrl}/en${path}`,
 *     'x-default': `${SEO_CONFIG.siteUrl}${path}`,
 *   };
 */
export function buildHreflang(path: string): Record<string, string> {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}${path}`;
  return {
    ar: canonicalUrl,
    'x-default': canonicalUrl,
  };
}

/**
 * RTL-aware breadcrumb separator for visual display.
 * In RTL, breadcrumbs typically read right-to-left,
 * so separators use '‹' (U+2039) or simple slash.
 */
export const BREADCRUMB_SEPARATOR = '‹';

/**
 * Map of locale codes to human-readable display names.
 * Extend when adding new languages.
 */
export const LOCALE_NAMES: Record<string, string> = {
  ar: 'العربية',
  'ar-SA': 'العربية (السعودية)',
  en: 'English',
};

/**
 * Returns the HTML lang attribute value for the current locale.
 */
export function getLangAttribute(locale: string = 'ar'): string {
  const langMap: Record<string, string> = {
    ar: 'ar',
    'ar-SA': 'ar',
    'ar_SA': 'ar',
    en: 'en',
  };
  return langMap[locale] ?? 'ar';
}

/**
 * Returns the HTML dir attribute for the given locale.
 */
export function getDirAttribute(locale: string = 'ar'): 'rtl' | 'ltr' {
  const rtlLocales = ['ar', 'ar-SA', 'ar_SA', 'he', 'fa', 'ur'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
