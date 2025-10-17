// Taxi Türlihof PWA Service Worker
const CACHE_NAME = 'taxi-turlihof-v1.0.2';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/preisrechner',
  '/buchen',
  '/flotte',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('[SW] Cache installation failed:', err);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Strategy - Network First, Cache Fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (Google APIs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we got a response, add it to cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // If not in cache, return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // For other requests, return a generic offline response
            return new Response('Offline - Bitte überprüfen Sie Ihre Internetverbindung', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle Push Notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Taxi Türlihof Benachrichtigung',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'App öffnen',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Schließen',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Taxi Türlihof', options)
  );
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle Background Sync (for future use)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    // Could be used to sync offline bookings when online
  }
});

console.log('[SW] Taxi Türlihof Service Worker loaded successfully!');