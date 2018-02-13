var staticCacheName = 'rest-review-v3';

/**
 * Cache known basic resources after service worker install.
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                'index.html',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'css/styles.css',
                'data/restaurants.json'
            ]);
        })
    );
});

/**
 * Fetch from cache if cached resource.
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(staticCacheName).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                // Uncomment this for caching debugging
                // if (response) {
                //     console.log(`Getting from cache ${event.request.url}`);
                //     return response;
                // } else {
                //     console.log(`Getting from network ${event.request.url}`);
                //     return fetch(event.request).then(function(response) {
                //         if (event.request.method !== 'POST') {
                //             console.log(`Adding to cache ${event.request.url}`);
                //             cache.put(event.request, response.clone());
                //         }
                //         return response;
                //     });
                // }

                return response || fetch(event.request).then(function(response) {
                    if (event.request.method !== 'POST') cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});