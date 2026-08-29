const CACHE_NAME = "archaic-horizon-v3";
const PRECACHE_URLS = [
  "/",
  "/favicon.ico",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
];

self.addEventListener("install", (event) => {
  // Activate immediately so deploys aren't stuck behind old controllers.
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`Failed to precache ${url}:`, err);
          })
        )
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

function isLocalDev(url) {
  return (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname === "[::1]"
  );
}

function isNextDevAsset(url) {
  return (
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.startsWith("/_next/turbopack")
  );
}

function isNavigationRequest(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html"))
  );
}

function isImmutableStaticAsset(url) {
  // Only content-hashed build output belongs under /_next/static/. Do not
  // cache-first arbitrary .js/.css — dev chunks and public scripts change.
  return url.pathname.startsWith("/_next/static/");
}

function isNextDataRequest(request, url) {
  return (
    request.headers.has("RSC") ||
    request.headers.has("Next-Router-State-Tree") ||
    request.headers.has("Next-Url") ||
    url.pathname.startsWith("/_next/data/")
  );
}

function cachePut(request, response) {
  // Cache API only accepts complete responses — 206 Partial Content (range
  // requests for audio/video) throws if you try to put it.
  if (
    !response ||
    response.status !== 200 ||
    response.type === "opaque" ||
    request.headers.has("Range")
  ) {
    return;
  }

  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
}

function networkFirst(request, { fallbackToShell = false } = {}) {
  return fetch(request)
    .then((response) => {
      cachePut(request, response);
      if (
        fallbackToShell &&
        response.status === 200 &&
        new URL(request.url).pathname === "/"
      ) {
        cachePut("/", response);
      }
      return response;
    })
    .catch(async () => {
      const cached =
        (await caches.match(request)) ||
        (fallbackToShell ? await caches.match("/") : undefined);

      return (
        cached ||
        new Response(fallbackToShell ? "Offline" : "", {
          status: fallbackToShell ? 503 : 504,
          statusText: fallbackToShell
            ? "Service Unavailable"
            : "Gateway Timeout",
          headers: fallbackToShell
            ? { "Content-Type": "text/plain" }
            : undefined,
        })
      );
    });
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) {
      return cached;
    }

    return fetch(request)
      .then((response) => {
        cachePut(request, response);
        return response;
      })
      .catch(() => {
        // Must return a Response — null triggers:
        // TypeError: Failed to convert value to 'Response'
        return new Response("", {
          status: 504,
          statusText: "Gateway Timeout",
        });
      });
  });
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (!event.request.url.startsWith("http")) {
    return;
  }

  const url = new URL(event.request.url);

  // Never intercept dev/HMR traffic — stale chunks break Turbopack module graph.
  if (isLocalDev(url) || isNextDevAsset(url)) {
    return;
  }

  // Never cache the service worker script itself.
  if (url.pathname === "/sw.js" || url.pathname === "/sw-reload.js") {
    return;
  }

  // HTML must be network-first. Cache-first HTML after a deploy serves stale
  // markup that still points at old hashed /_next assets (which 404).
  if (isNavigationRequest(event.request)) {
    event.respondWith(networkFirst(event.request, { fallbackToShell: true }));
    return;
  }

  // App Router RSC / data payloads also go stale across deploys.
  if (isNextDataRequest(event.request, url)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Content-hashed static assets are safe to cache aggressively.
  if (isImmutableStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});
