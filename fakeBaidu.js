self.addEventListener('install',async function(){
    console.log('fakeBaidu install');
    await self.skipWaiting();
    
})

self.addEventListener('activate',async function(){
    console.log('fakeBaidu activate');
    await self.clients.claim();
})

self.addEventListener('fetch', async function (event) {
    // console.log('fakeBaidu fetch');
    const url = new URL(event.request.url);
    if(url.pathname==='/api') {
      event.respondWith(new Response('this is fake api'))
    }
    //console.log(url, 'fakeBaidu fetch',url)
    // if(url === 'https://www.baidu.com/?fake=true'){
    //     event.respondWith(new Response('fake baidu'));
    // }
})