import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Jari App — SEO & Security Middleware
 *
 * Runs at the Edge before every request. Responsibilities:
 * 1. Canonical URL enforcement (no trailing slashes except root)
 * 2. Security headers (X-Frame-Options, CSP, etc.)
 * 3. X-Robots-Tag for API routes
 * 4. Cache-Control hints for static pages
 */
export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // ─── 1. Canonical: Remove trailing slashes (except root "/") ────────────
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, { status: 301 });
  }

  // ─── 2. Block double-slash patterns ─────────────────────────────────────
  if (pathname.includes('//')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+/g, '/');
    return NextResponse.redirect(url, { status: 301 });
  }

  const response = NextResponse.next();

  // ─── 3. Security Headers ─────────────────────────────────────────────────
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // Permissions policy (restrict browser features we don't use)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Content Security Policy (permissive for Islamic content sites with external audio)
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https://www.islambook.com blob:",
      "connect-src 'self' https://www.islambook.com https://va.vercel-scripts.com https://www.google-analytics.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // ─── 4. X-Robots-Tag for API routes ─────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // ─── 5. Cache hints for static adhkar pages ──────────────────────────────
  // These pages rarely change — hint to CDN/browser to cache aggressively
  const staticRoutes = ['/morning', '/evening', '/sleep', '/tasbeeh'];
  if (staticRoutes.includes(pathname)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}

// ─── Matcher: Apply middleware to all routes except static assets ──────────
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
     * - /icons/ (PWA icons)
     * - /files/ (PDF downloads)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|icons/|files/).*)',
  ],
};
