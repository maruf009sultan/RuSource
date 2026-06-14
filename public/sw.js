/// <reference lib="webworker" />
// RuSource Service Worker v4
// - Auto-versioned via CACHE_NAME timestamp (update the version suffix on each deploy)
// - Precaches app shell, fonts, and PWA icons
// - Stale-while-revalidate for CSS/JS (except sw.js itself)
// - Cache-first for fonts and static assets
// - Network-first for HTML/navigation
// - Skips caching for sw.js itself to ensure updates are always fetched

const CACHE_NAME = "rusource-v4-20260614";

const PRECACHE = [
  "/",
  "/browse",
  "/categories",
  "/manifest.json",
  "/favicon.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/icon-maskable-512x512.png",
  "/fonts/Inter-400.woff2",
  "/fonts/Inter-500.woff2",
  "/fonts/Inter-600.woff2",
  "/fonts/Inter-700.woff2",
  "/fonts/Unbounded-400.woff2",
  "/fonts/Unbounded-600.woff2",
  "/fonts/Unbounded-800.woff2",
  "/fonts/Unbounded-900.woff2",
  "/fonts/JetBrainsMono-400.woff2",
  "/fonts/JetBrainsMono-600.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Never cache the service worker itself — always fetch from network
  if (url.pathname === "/sw.js") {
    event.respondWith(
      fetch(request).then((response) => {
        // Return the fresh SW response directly without caching
        return response;
      }).catch(() => {
        // If network fails, try cache as last resort
        return caches.match(request);
      })
    );
    return;
  }

  // Cache-first: fonts (immutable)
  if (url.pathname.startsWith("/fonts/") || url.pathname.endsWith(".woff2")) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
      )
    );
    return;
  }

  // Stale-while-revalidate: CSS and JS (but not sw.js, handled above)
  if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Cache-first: static assets
  if (url.pathname.endsWith(".svg") || url.pathname.endsWith(".png") || url.pathname.endsWith(".ico") || url.pathname.endsWith(".webp")) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
      )
    );
    return;
  }

  // Network-first: HTML
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request).then((r) => r || caches.match("/")))
    );
    return;
  }
});
