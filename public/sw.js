// sw.js - Minimal Service Worker to bypass network and make PWA installable without caching

self.addEventListener('install', () => {
  console.log('[Service Worker] Install');
  // Skip waiting to immediately activate the new service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through all network requests without caching
  event.respondWith(fetch(event.request));
});
