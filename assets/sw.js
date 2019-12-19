var CACHE_NAME  = "Mojingo-Kits";

var urlsToCache = [];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)//上記で指定しているキャッシュ名
            .then(
                function(cache){
                    return cache.addAll(urlsToCache);//指定したリソースをキャッシュへ追加
                })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(
                function (response) {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
    );
});