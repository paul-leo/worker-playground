const name = 'sw';
const version = 1;
const time = new Date().getTime();
while (new Date().getTime() - time < 2000) {
    // 2秒后执行完毕
}
console.log('这是根项目的service worker');
self.addEventListener('install', (event) => {
    console.log(name, ':', version, 'installing');
    // cache a cat SVG,运行之前做一些事情
    // event.waitUntil(
    //     caches.open('static-v1').then((cache) => cache.add('/images/cat.jpg'))
    // );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log(name, ':', version, 'activated!');
    event.waitUntil(
        (async function () {
            // Feature-detect
            if (self.registration.navigationPreload) {
                // Enable navigation preloads!
                console.log('Enabling navigation preloads!');
                await self.registration.navigationPreload.enable();
            }
        })()
    );
    // clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    
    event.respondWith(
        (async function () {
            // Respond from the cache if we can
            // const cachedResponse = await caches.match(event.request);
            // if (cachedResponse) return cachedResponse;

            // Else, use the preloaded response, if it's there
            const response = await event.preloadResponse;
            console.log(name, ':', version, url.pathname);
            response && console.log('request:', url, response);
            // 和预加载
            if (response) return response;
            // Else try the network.
            return fetch(event.request);
        })()
    );
});
