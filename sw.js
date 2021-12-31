const cacheName = "movifix-cache";
const appCachecFiles = [
    "./index.php",
    "./public/css/style.css",
    "./public/js/main.js",
    "/public/ressources/icons/android-chrome-192x192.png",
    "/public/ressources/icons/android-chrome-512x512.png"
]
self.addEventListener('install', (e)=>{
    e.waintUntil(caches.open(cacheName).then((cache)=>{
        // return cache.addAll(appCachecFiles)
        // console.log(caches.)
    }))
})
self.addEventListener('fetch', (e) => {
    // console.log('[Service Worker] Ressource récupérée '+e.request.url);
    if(e.request.method == "GET"){
        caches.match(e.request)
        .then((res)=>{
            if(res == undefined){
                fetch(e.request)
                .then((res)=>{
                    if(res.url != ''){

                        // console.log(res.url)
                        let responseClone = res.clone();
                        caches.open(cacheName)
                        .then((cache)=>{
                            cache.put(e.request,res)
                        })
                        console.log(res);
                    }
                })
            }else{
                // console.log(res)
            }
        })
    }
})