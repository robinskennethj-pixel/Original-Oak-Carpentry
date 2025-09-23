// Service Worker for Ogun Carpentry
// This is a basic service worker to prevent 404 errors
// You can extend this for PWA functionality if needed

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // Basic fetch handling - can be extended for offline functionality
  event.respondWith(fetch(event.request));
});