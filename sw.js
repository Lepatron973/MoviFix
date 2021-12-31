const currentCache = "movifix-v1";

self.addEventListener('install', (e)=>{
    console.log('installed')
})
self.addEventListener('activate', (e)=>{
   e.waitUntil(
       caches.keys().then(
           cacheNames => {
               return Promise.all(
                   cacheNames.map(
                       oldCache => {
                           if(oldCache != currentCache)
                           return caches.delete(oldCache)
                       }
                   )
               )
           }
       )
   )
})
self.addEventListener('fetch', (e) => {
    // console.log('[Service Worker] Ressource récupérée '+e.request.url);
    if(e.request.method == "GET"){
        e.respondWith(

            fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches.open(currentCache)
                .then(cache => cache.put(e.request,resClone))
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
        )
    
    }
})