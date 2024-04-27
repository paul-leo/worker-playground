const name = 'sw2';
const version = 1;
console.log('这是根项目的service worker2');
self.addEventListener('install', (event) => {
    console.log(name, ':', version, 'installing');
    // cache a cat SVG,运行之前做一些事情
    // event.waitUntil(
    //     caches.open('static-v1').then((cache) => cache.add('/images/cat.jpg'))
    // );
    // self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log(name, ':', version, 'activated!');
    // clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    console.log(name, ':', version, url.pathname);
    if (url.origin == location.origin && url.pathname == '/images/dog.jpg') {
        event.respondWith(caches.match('/images/cat.jpg'));
    }
});
