const CACHE_VERSION = 'smart-rentals-v1'
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/pwa-icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

const isApiRequest = (url) => url.pathname.startsWith('/api/')

const offlineApiResponse = () =>
  new Response(JSON.stringify({ message: 'You are offline. Please reconnect and try again.' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  })

const networkFirstNavigation = async (request) => {
  try {
    const response = await fetch(request)
    const cache = await caches.open(CACHE_VERSION)
    cache.put('/index.html', response.clone())
    return response
  } catch {
    return caches.match('/index.html')
  }
}

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE_VERSION)
  const cached = await cache.match(request)
  const fetched = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached)

  return cached || fetched
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (isApiRequest(url)) {
    event.respondWith(fetch(event.request).catch(offlineApiResponse))
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(event.request))
    return
  }

  if (event.request.method === 'GET') {
    event.respondWith(staleWhileRevalidate(event.request))
  }
})
