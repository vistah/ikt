self.addEventListener('install', event => {
    console.log('service worker --> installing ...', event);
})

self.addEventListener('activate', event => {
    console.log('service worker --> activating ...', event);
    return self.clients.claim();
})

self.addEventListener('fetch', event =>{
    console.log('service worker --> fetching ...', event.request);
    if(event.request.url.endsWith('/hello'))
    {
        event.respondWith(new Response("Hello FIW!"))
    }
})

