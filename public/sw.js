/**
 * Jari App — Production Service Worker
 *
 * Strategy:
 * - App Shell (HTML/CSS/JS): Cache-First with network fallback
 * - Google Fonts / Static Assets: Cache-First, 30-day TTL
 * - Dynamic Adhkar API (islambook.com): Network-First, 24h cache fallback
 * - Offline fallback page served for navigation requests
 */

const CACHE_VERSION = 'v2';
const SHELL_CACHE = `jari-shell-${CACHE_VERSION}`;
const FONT_CACHE = `jari-fonts-${CACHE_VERSION}`;
const DATA_CACHE = `jari-data-${CACHE_VERSION}`;

// App shell assets to precache on install
const SHELL_ASSETS = [
  '/',
  '/morning',
  '/evening',
  '/sleep',
  '/adhkar',
  '/tasbeeh',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ─── Install: Precache App Shell ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) =>
        cache.addAll(SHELL_ASSETS).catch((err) => {
          // Don't fail install if individual shell assets are missing
          console.warn('[SW] Shell precache partial failure:', err);
        })
      )
      .then(() => self.skipWaiting())
  );
});

// ─── Activate: Clean Old Caches ──────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const CURRENT_CACHES = [SHELL_CACHE, FONT_CACHE, DATA_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !CURRENT_CACHES.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── Fetch: Routing Strategy ─────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // 1. Google Fonts → Cache-First (30 days)
  if (
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    event.respondWith(cacheFirst(request, FONT_CACHE, 30 * 24 * 60 * 60));
    return;
  }

  // 2. Dynamic adhkar data (islambook.com) → Network-First with 24h cache
  if (url.hostname === 'www.islambook.com') {
    event.respondWith(networkFirst(request, DATA_CACHE, 24 * 60 * 60));
    return;
  }

  // 3. Next.js static assets (_next/static) → Cache-First (immutable)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, SHELL_CACHE, 365 * 24 * 60 * 60));
    return;
  }

  // 4. Navigation requests → Network-First with shell fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/').then((cached) => cached || new Response('Offline', { status: 503 }))
      )
    );
    return;
  }

  // 5. Everything else → Network-First
  event.respondWith(networkFirst(request, SHELL_CACHE, 60 * 60));
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Cache-First strategy: serve from cache, fallback to network and update cache */
async function cacheFirst(request, cacheName, maxAgeSeconds) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Check if cached response is still fresh
    const cachedDate = cached.headers.get('sw-cache-date');
    if (cachedDate) {
      const age = (Date.now() - parseInt(cachedDate, 10)) / 1000;
      if (age < maxAgeSeconds) return cached;
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cloned = response.clone();
      // Add cache date header
      const headers = new Headers(cloned.headers);
      headers.set('sw-cache-date', Date.now().toString());
      const toCache = new Response(await cloned.blob(), {
        status: cloned.status,
        statusText: cloned.statusText,
        headers,
      });
      cache.put(request, toCache);
    }
    return response;
  } catch {
    return cached || new Response('Network error', { status: 503 });
  }
}

/** Network-First strategy: try network, fallback to cache */
async function networkFirst(request, cacheName, maxAgeSeconds) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('sw-cache-date', Date.now().toString());
      const toCache = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      cache.put(request, toCache);
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      const cachedDate = cached.headers.get('sw-cache-date');
      if (cachedDate) {
        const age = (Date.now() - parseInt(cachedDate, 10)) / 1000;
        if (age < maxAgeSeconds) return cached;
      } else {
        return cached;
      }
    }
    return new Response('Network error', { status: 503 });
  }
}

// ─── Notification Click Handler ───────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url && 'focus' in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow('/');
        }
      })
  );
});
