/* Walk2Eat v4 — Service Worker (cache-first for static assets, network-first for API) */

var CACHE_NAME = 'walk2eat-v4.0.0';

var STATIC_ASSETS = [
  './',
  './index.html',
  './login.html',
  './dashboard.html',
  './map.html',
  './preferences.html',
  './favorites.html',
  './history.html',
  './proposal.html',
  './place.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/config.js',
  './assets/js/routes-poc-data.js',
  './assets/js/themes.js',
  './assets/js/dashboard.js',
  './assets/js/map.js',
  './assets/branding-hq/favicon.svg',
  './assets/branding-hq/walk2eat-navbar-dark-128.png',
  './assets/branding-hq/walk2eat-symbol-128.png',
  './assets/branding-hq/walk2eat-symbol-180.png',
  './assets/branding-hq/walk2eat-symbol-192.png',
  './assets/branding-hq/walk2eat-symbol-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Network-first for API calls (ORS, Overpass)
  if (url.hostname !== location.hostname) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-first for local static assets
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(resp) {
        var clone = resp.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
        return resp;
      });
    })
  );
});
