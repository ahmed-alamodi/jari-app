'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * WebVitals — Core Web Vitals reporter for GA4 and monitoring.
 *
 * Reports LCP, CLS, INP, FCP, TTFB to Google Analytics 4.
 * Zero external dependencies — uses Next.js built-in hook.
 *
 * This must be a Client Component (uses browser APIs).
 * Include this in the root layout inside <ClientProvider>.
 *
 * Metrics reported:
 * - LCP (Largest Contentful Paint) — target < 2.5s
 * - CLS (Cumulative Layout Shift) — target < 0.1
 * - INP (Interaction to Next Paint) — target < 200ms
 * - FCP (First Contentful Paint) — target < 1.8s
 * - TTFB (Time to First Byte) — target < 800ms
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Report to Google Analytics 4 if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as typeof window & { gtag: Function }).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Development console logging
    if (process.env.NODE_ENV === 'development') {
      const { name, value, rating } = metric;
      const emoji =
        rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(
        `%c${emoji} Web Vital: ${name}`,
        'font-weight:bold',
        `| Value: ${Math.round(value)}${name === 'CLS' ? '' : 'ms'} | Rating: ${rating}`
      );
    }
  });

  return null;
}
