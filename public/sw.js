// ZIVA Literacy service worker. Scope: this app only (learn.zivarukah.com).
// - Downloads the whole app (pages, scripts, styles, icons) for offline use,
//   using the list in /precache.json made at build time.
// - Never caches anything from other websites (e.g. zivarukah.com).
// - The app stores no learner data on servers; progress lives on the device.
const PREFIX = "ziva-literacy-";
let VERSION = "dev";

async function readManifest() {
  const res = await fetch("/precache.json", { cache: "no-store" });
  if (!res.ok) throw new Error("no precache list");
  return res.json();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const { version, urls } = await readManifest();
        VERSION = version;
        const cache = await caches.open(PREFIX + version);
        // Add one by one so a single failure doesn't stop the rest.
        await Promise.all(urls.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => {})));
      } catch {
        // Development or a missing list: fall back to caching as pages are used.
      }
      // First install: start working straight away. An update instead waits
      // until the learner taps "Update now" (or next opens the app), so a
      // lesson is never swapped out in the middle.
      if (!self.registration.active) await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      let keep = null;
      try {
        keep = PREFIX + (await readManifest()).version;
      } catch {
        // offline during activate: keep everything
      }
      if (keep) {
        for (const key of await caches.keys()) {
          // Old versions and pages saved while browsing are replaced by the new full copy.
          if (key.startsWith(PREFIX) && key !== keep) await caches.delete(key);
        }
      }
      await self.clients.claim();
    })(),
  );
});

async function fromCache(request) {
  const url = new URL(request.url);
  return (
    (await caches.match(request, { ignoreSearch: true })) ||
    (url.pathname.endsWith("/") ? null : await caches.match(url.pathname + "/", { ignoreSearch: true }))
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    // Pages: try the network (fresh content), fall back to the saved copy offline.
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(PREFIX + "runtime");
            cache.put(request, response.clone()).catch(() => {});
          }
          return response;
        } catch {
          return (await fromCache(request)) || (await caches.match("/")) || Response.error();
        }
      })(),
    );
    return;
  }

  // Scripts, styles, icons: saved copy first (they never change once built).
  event.respondWith(
    (async () => {
      const cached = await fromCache(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/icons/"))) {
          const cache = await caches.open(PREFIX + "runtime");
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch {
        return Response.error();
      }
    })(),
  );
});

// The page can ask how much is saved for offline use, or apply a waiting update.
self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") {
    self.skipWaiting();
    return;
  }
  if (event.data === "offline-status") {
    event.waitUntil(
      (async () => {
        const keys = (await caches.keys()).filter((k) => k.startsWith(PREFIX) && k !== PREFIX + "runtime");
        event.source?.postMessage({ type: "offline-status", ready: keys.length > 0 });
      })(),
    );
  }
});
