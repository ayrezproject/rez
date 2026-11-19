// sw.js — Service Worker untuk Mode Produksi & Offline PWA Lapangan Satgas BGN
const CACHE_NAME = 'sppg-bgn-v1.0.1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './scoring.js',
  './app.js',
  './style.css',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Jika offline dan membuka dokumen html, kembalikan index.html dari cache
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
