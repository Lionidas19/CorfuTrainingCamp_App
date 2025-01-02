'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "21098c04f070129d62c8138529bf61b4",
"assets/AssetManifest.bin.json": "68e277354e67cad6800d396edb154f51",
"assets/AssetManifest.json": "263faf6f509fb52cf5825a0fd8e39509",
"assets/assets/images/back_row.jpg": "4d4c115de9dee425c446cc5f79edd9bb",
"assets/assets/images/bike.jpg": "431f7f866178ad1c051250edc01ce3cb",
"assets/assets/images/bike2.jpg": "f925106f9b72aa04e873f5466a1008ac",
"assets/assets/images/bike3.jpg": "feb3deac87a68ca7f31548ca113658fe",
"assets/assets/images/bike4.jpg": "a1c64b4d132b866dbb1c7d2311d9d90e",
"assets/assets/images/bike4.png": "785cc671bc3777ad0b47b14070370fc8",
"assets/assets/images/clap.jpg": "d0f9e7d593c339d53287a641bc544426",
"assets/assets/images/green.png": "fe809e475170542edbd5586b3d6b6a4f",
"assets/assets/images/logo.png": "50ef5267e453af5c1e37ac9aceb634b9",
"assets/assets/images/logo_white.png": "20210a4de72a1ca1f08c13893312a784",
"assets/assets/images/logo_white_small.png": "30407797702012a0476864952889f9c4",
"assets/assets/images/machines.jpg": "6802d271728a88f34f0d1ad09cdf6f1a",
"assets/assets/images/orange.png": "64e6da4780595c71a99b50859bf9b8b3",
"assets/assets/images/red.png": "6673c18d4b52a6df5195e9c3d1d5a0b4",
"assets/assets/images/smith.jpg": "115755fed293e16b729c082bbd2c57d8",
"assets/assets/images/stock.jpg": "8f9ea14c502569600cd7da1a06886dc7",
"assets/assets/images/subscription.jpg": "2cf42b07f75890a0309bb92c985cc951",
"assets/assets/images/weight.jpg": "a2052174495952f253418c44f1a0bdf2",
"assets/assets/images/weight.png": "ca6b52a8d5fc0251824a61c08683695a",
"assets/assets/images/weights2.jpg": "ae16c2b87381b22691ce863d951d87ee",
"assets/assets/images/workout.jpg": "25be071c5a4d20e50f3816b6cc501e65",
"assets/assets/images/yellow.png": "38c5729b015107747bc338acbdc31a9e",
"assets/assets/svgs/green.svg": "c55e97ba2490ea633dcb3a3a539c67be",
"assets/assets/svgs/orange.svg": "82d2af6b2d3aa06d2d6d0e6b13c33537",
"assets/assets/svgs/red.svg": "4d8dac54e7535e8152cfa28936f90c31",
"assets/assets/svgs/yellow.svg": "f597a644ca6cb76ef6a1a5fbaa1740ac",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "50229724a9189ff2d7f2640ecff4cb66",
"assets/NOTICES": "cfd5dfa9ff002f06f8796567acaf4e69",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "6fa1adbe16f7dac0138899a6f43c83a2",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "0a9f22bdf4ccdb4db73415e7e00c83d6",
"icons/Icon-192.png": "8d31062334a5f48b059bc749bb39ac18",
"icons/Icon-512.png": "8b6115a1a294c02e03d21e8cdfd42e29",
"icons/Icon-maskable-192.png": "8d31062334a5f48b059bc749bb39ac18",
"icons/Icon-maskable-512.png": "8b6115a1a294c02e03d21e8cdfd42e29",
"index.html": "bdf0c61d823bc62077f1036d1ff14a6b",
"/": "bdf0c61d823bc62077f1036d1ff14a6b",
"main.dart.js": "66ff488cfb5a2646a3bbbba6ca8b4022",
"manifest.json": "516fca1464def9d1d9944c4c10023297",
"version.json": "ea397551023c57a32bea4aa523e4e282"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
