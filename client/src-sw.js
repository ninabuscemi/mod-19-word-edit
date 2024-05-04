const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all assets defined in the service worker manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a cache strategy for pages
const pageCache = new CacheFirst({
cacheName: 'page-cache',
plugins: [
new CacheableResponsePlugin({
statuses: [0, 200], // Cache successful responses
}),
new ExpirationPlugin({
maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pages for 30 days
}),
],
});

// Warm the page cache with the index.html and root URL
warmStrategyCache({
urls: ['/index.html', '/'],
strategy: pageCache,
});

// Use the page cache for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

// Cache assets (styles, scripts, and workers) with a stale-while-revalidate strategy
registerRoute(
({ request }) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
cacheName: 'asset-cache',
plugins: [
new CacheableResponsePlugin({
statuses: [0, 200], // Cache successful responses
}),
],
})
);