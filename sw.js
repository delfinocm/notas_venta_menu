const CACHE_NAME = 'legion-ventas-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.png',
  './Vexillum.jpg',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
];

// Durante la fase de instalación, descargamos los archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché listos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Durante la petición (fetch), servimos desde la caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo de la caché, o haz la petición a internet
        return response || fetch(event.request);
      })
  );
});

// Limpieza de cachés antiguas si cambias la versión
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});