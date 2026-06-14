/// <reference lib="webworker" />
// RuSource Service Worker v3 — pre-cache WOFF2 fonts, stale-while-revalidate for CSS/JS
const CACHE_NAME = "rusource-v3";

const PRECACHE = [
  "/",
  "/browse",
  "/categories",
  "/manifest.json",
  "/favicon.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
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

  // Stale-while-revalidate: CSS and JS
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
