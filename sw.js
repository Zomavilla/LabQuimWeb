const V='labquimweb-v28',SHELL=['./'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
 if(r.mode=='navigate'){e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(V).then(c=>c.put('./',k));return x}).catch(()=>caches.match('./')));return}
 e.respondWith(caches.match(r).then(h=>{const f=fetch(r).then(x=>{const k=x.clone();caches.open(V).then(c=>c.put(r,k));return x}).catch(()=>h);return h||f}))});
