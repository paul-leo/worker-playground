console.log('这是项目A的service worker')
self.addEventListener('install', event => {
  console.log('A sw installing…');

  // cache a cat SVG,运行之前做一些事情
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/house.jpg'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('A activate');
  clients.claim();
});

self.addEventListener('message',function(event){
  console.log('收到消息',event.data)
  event.source.postMessage('A SW')
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/images/dog.jpg') {
    event.respondWith(caches.match('/house.jpg'));
  }
});