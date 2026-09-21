const CACHE="py-2026-09-21-v5";
const CORE=["./","./index.html","./manifest.webmanifest","./data.json"];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET" || u.origin!==self.location.origin) return;

  // Always check the network first for HTML/JS app files so new deployments
  // are not hidden behind an old service-worker cache.
  const isAppFile =
    u.pathname.endsWith("/") ||
    u.pathname.endsWith("/index.html") ||
    u.pathname.endsWith("/sw.js") ||
    u.pathname.endsWith(".js") ||
    u.pathname.endsWith(".webmanifest");

  if(isAppFile){
    e.respondWith(
      fetch(e.request)
        .then(r=>{
          const copy=r.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
          return r;
        })
        .catch(()=>caches.match(e.request).then(c=>c||caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return r;
    }))
  );
});