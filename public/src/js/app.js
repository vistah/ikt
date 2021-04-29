if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('././PWA/sw.js')
        .then(function() {
            console.log('service worker registriert')
        });
}