console.log('这是项目B的service worker')
self.addEventListener('install', event => {
  console.log('B sw installing…');

  // cache a cat SVG,运行之前做一些事情
  // event.waitUntil(
  //   caches.open('static-v1').then(cache => cache.add('/cat.jpg'))
  // );
  // self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('B activate');
  // clients.claim();
});

self.addEventListener('message',function(event){
  console.log('收到消息3', event.data)
  event.source.postMessage('B SW')
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  console.log('b v4 fetch',url.pathname)
});
// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url);

//   // serve the cat SVG from the cache if the request is
//   // same-origin and the path is '/dog.svg'
//   if (url.origin == location.origin && url.pathname == '/dog.jpg') {
//     event.respondWith(caches.match('/cat.jpg'));
//   }
// });
