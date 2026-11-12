const CACHE_NAME = "zhongxu-life-v32";
const APP_SHELL = [
  "./众需生活-3.6.82-小程序同源在线版.html",
  "./众需生活-3.6.81-小程序同源在线版.html",
  "./众需生活-3.6.80-小程序同源在线版.html",
  "./众需生活-3.6.76-在线演示.html",
  "./众需生活-3.6.75-在线演示.html",
  "./众需生活-3.6.74-在线演示.html",
  "./众需生活-3.6.73-在线演示.html",
  "./众需生活-3.6.72-在线演示.html",
  "./众需生活-3.6.69-在线演示.html",
  "./众需生活-可交互演示.html",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/camera-studio.svg",
  "./assets/wellness-garden.svg",
  "./assets/travel-lake.svg",
  "./assets/referral-garden.svg",
  "./assets/cinematic-dusk.svg",
  "./assets/cinematic-studio.svg",
  "./assets/cinematic-market.svg",
  "./assets/cinematic-garden.svg",
  "./assets/cinematic-live.svg",
  "./assets/cinematic-wallet.svg",
  "./assets/avatar-default.png",
  "./assets/people-life.jpg",
  "./assets/travel-lake.jpg",
  "./assets/live-concert.jpg",
  "./assets/portrait-studio.jpg",
  "./assets/botanical-wellness.jpg",
  "./assets/finance-desk.jpg",
  "./众需生活-手机下载测试.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("./众需生活-3.6.82-小程序同源在线版.html"));
    }),
  );
});
