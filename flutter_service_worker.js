'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2758d7599cb847695016abf52f355f31",
"assets/assets/fonts/GE_Bold.otf": "f86e72cd4ccd6c28b5462e576496687a",
"assets/assets/fonts/GE_Medium.otf": "05a3fc15b77e6147281f0717495a8803",
"assets/assets/Icons/instagram.ttf": "dae1eef277a87898e68b144dff61f6ff",
"assets/assets/Icons/support.ttf": "14f0eeee87295dfe8ea80a0940ea9ee0",
"assets/assets/Icons/twitter.ttf": "c8b7e949e2fd64299a8627c01f9d2626",
"assets/assets/Icons/youtube.ttf": "7a03544a1b2c3667203a982019672fd9",
"assets/assets/images/aboutUs.png": "bd7103510a884a231d487ee10f234722",
"assets/assets/images/accounting-about.png": "4369ead65466c38023a91ee87f116ac8",
"assets/assets/images/accounting-circle.png": "e774e4f85a36b3846d290d32fda6e495",
"assets/assets/images/accounting-features.png": "dfae0d30870bef18db9e1b67dc35cb28",
"assets/assets/images/accounting-logo-blue.svg": "744e394a7517db7a6a8d144470acc788",
"assets/assets/images/accounting-logo-white.svg": "930407279f703639f8c9e08da6a5251c",
"assets/assets/images/accounting-main.png": "d416656ea48e8c3c8d51194278fd3859",
"assets/assets/images/accounts.png": "d72b9b5e1d5db089b4d134fdf1ed8dc9",
"assets/assets/images/assets_icon.png": "41bcb0241a73c5733a4e6f5909dd09eb",
"assets/assets/images/box.svg": "016eb983429060b9308d54e1179253ea",
"assets/assets/images/card_background.png": "2ab123a0bff803f8c568f368844c4d3c",
"assets/assets/images/driver.png": "9f145a585b031fe79c8e6019be1e85b9",
"assets/assets/images/features.png": "dd01bc4df1975fb531b98dd5d34d40d3",
"assets/assets/images/invoice.png": "aee9fa1c5c9f6c6291d178b9a15840cc",
"assets/assets/images/logo_blue.svg": "e66d400d9d9d024d04c95844dea53cb0",
"assets/assets/images/logo_white.svg": "0a1c9a87025a2fde1a0d6e75345ebdfc",
"assets/assets/images/main_department.png": "279613715bff2e43912c503c3fa4a4e9",
"assets/assets/images/order.png": "e4d17d3a3778def642dbd78c8f7f9e36",
"assets/assets/images/permission.png": "4f93e20595ea69336cc8414aad65cb5f",
"assets/assets/images/policy.png": "03cc143ea14d3a5a5122392fa35cf091",
"assets/assets/images/smart_image.png": "9fea410f318edce2ffbe06eba1ebd5a9",
"assets/assets/images/transfer.png": "0ce46a233868e7f18bf52bedd2d1103e",
"assets/assets/images/usable.png": "4604340ea20433cfebc67ba64ffab39d",
"assets/FontManifest.json": "1f5a102652d4c091fcebfae11704f19c",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "be21c302e21f8a5c946dd6b540cb5364",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.ico": "99dc87c25fca06ae59c7d09202da3152",
"icons/Icon-192.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-512.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-maskable-192.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-maskable-512.png": "d41d8cd98f00b204e9800998ecf8427e",
"index.html": "387d0c4085861f8ecbafa461e69eb574",
"/": "387d0c4085861f8ecbafa461e69eb574",
"main.dart.js": "9c8aab8b758feb8fed0b9a8f4aa50d71",
"manifest.json": "890d66a1ccbb66992aa240bc47bb5d95",
"version.json": "1f5c6845d72a77e26526132ddf355631"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
