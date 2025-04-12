// Service Worker for Dreamy Sleep App

// Cache name - update this version when files change
const CACHE_NAME = 'dreamy-sleep-v1';

// Files to cache
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './sounds/rain.mp3',
  './sounds/forest.mp3',
  './sounds/waves.mp3',
  './sounds/creek.mp3',
  './sounds/white-noise.mp3',
  './sounds/fan.mp3',
  './sounds/fire.mp3',
  './sounds/train.mp3',
  './sounds/piano.mp3',
  './sounds/meditation.mp3',
  './sounds/lullaby.mp3',
  './sounds/space.mp3',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Install the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch events - serve from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
