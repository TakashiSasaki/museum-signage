const CACHE_NAME = 'nexus-signage-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './image.png',
    './cover.jpg',
    './space.jpg',
    './bio.jpg',
    './robot.jpg',
    './energy.jpg',
    './icon-192.png',
    './icon-512.png',
    './qrcode.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If we have a valid response, clone it and update the cache in the background
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // If network fetch fails (offline), fall back to cache
                return caches.match(event.request);
            })
    );
});
