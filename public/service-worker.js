const CACHE = 'geotrail-static-v4';
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/data/tourism-records.json', '/assets/richardson-tech.png',
  '/assets/geotrail-bg.jpg', '/assets/geotrail-bg1.jpg', '/favicon.svg',
  '/favicon.ico', '/favicon.png', '/apple-touch-icon.png', '/og-image.png',
  '/icon-192.png', '/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(error => console.warn('GeoTrail cache prewarm skipped:', error)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  })));
});
