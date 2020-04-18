const staticCacheName = "site-static-v3";
const dynamicCache = "dynamic-cache-v1";
const assets = [
  "/",
  "/index.html",

  "/fallback",
  "/static/js/bundle.js",
  "/static/js/1.chunk.js",
  "/static/js/main.chunk.js",
  "https://fonts.googleapis.com/css?family=Raleway:100,300,400,500,700|Gotu|Caveat+Brush|Work+Sans:100,300,400,500,700&display=swap",
  "https://fonts.gstatic.com/s/gotu/v1/o-0FIpksx3QOpHoBi6p56hQ.woff2",
  "https://fonts.gstatic.com/s/worksans/v7/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2",
  "https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2",
  "http://localhost:3000/favicon.svg",
];

// routes from react router that should fallback to fallback page if offline and page not in dynamic cache
const routes = [
  "http://localhost:3000/",
  "http://localhost:3000/index.html",
  "http://localhost:3000/editor",
  "http://localhost:3000/dailies",
  "http://localhost:3000/words",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install service worker
self.addEventListener("install", (event) => {
  console.log("service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("service worker caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (event) => {
  // prevent cache anything coming from firestore
  if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheResponse) => {
          return (
            cacheResponse ||
            fetch(event.request).then((fetchResponse) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchResponse.clone());
                limitCacheSize(dynamicCache, 15);
                return fetchResponse;
              });
            })
          );
        })
        .catch(() => {
          console.log(event.request.url);
          if (routes.includes(event.request.url)) {
            return caches.match("/fallback");
          }
        })
    );
  }
});
