self.addEventListener('install', event => {
    console.log('service worker --> installing ...', event);
    //Cache angelegt; Wenn die Anweisungen im waitUntil erledigt wurden, ist das Install-Ereignis beendet
    event.waitUntil(
        //Cache wird geoeffnet, wenn vorhanden; sonst angelegt
        caches.open('static v1')
            .then(cache => {
                console.log('Service-Worker-Cache erzeugt und offen');
                //Hier wird festgelegt, welche Ressource in den Cache geladen wird
                //Pre-Caching
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/htw.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://code.getmdl.io/1.3.0/material.blue_grey-red.min.css',
                    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
                    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
                    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
                ]);
            })
    );
})

self.addEventListener('activate', event => {
    console.log('service worker --> activating ...', event);
    //Alte Caches loeschen
    event.waitUntil(
        caches.keys()
            //Alle Caches, die es gibt
            //Aktuelle Cache-Version soll bleiben, alle anderen sollen geloescht werden
            .then(keyList => {
                return Promise.all(keyList.map( key => {
                    if(key !== 'static v1' && key !== 'dynamic v1'){
                        console.log('service worker --> old cache remove: ', key);
                        return caches.delete(key);
                    }
                }))
            } )
    );
    //Man muss die Anwendung nicht mehr reloaden, damit der Service Worker sofort die Kontrolle uebernimmt
    return self.clients.claim();
})

self.addEventListener('fetch', event =>{
    //console.log('service worker --> fetching ...', event);
    /*if(event.request.url.endsWith('/hello'))
    {
        event.respondWith(new Response("Hello FIW!"))
    }*/

    //Bei der Webanfrage -> Der Request braucht ein Response. Danach wird im Cache geschaut und bei Vorhandensein zurückgegeben.
    // Wenn kein passendes Match aus dem Cache geladen werden kann, wird die Anfrage an den Service Worker weitergeleitet.
    event.respondWith(caches.match(event.request)
        .then(response => {
            if(response){
                return response;
            } else {
                return fetch(event.request)
                    //Dynamischer Cache
                    //Gleich Request dem Response zuweisen -> Schluessel-Werte-Paar
                    .then(res => {
                        return caches.open('dynamic v1')
                            .then(cache => {
                                cache.put(event.request.url, res);
                                return res;
                            })
                    })
            }
        })
    );
})

