const CACHE_VERSION = 'smart-rentals-v1'
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/pwa-icon.svg',
  '/pwa-192.png',
  '/pwa-512.png',
  '/apple-touch-icon.png',
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

const shouldOmitCredentials = (request) => {
  try {
    const pathname = new URL(request.url).pathname
    return pathname === '/manifest.webmanifest' || APP_SHELL.includes(pathname)
  } catch {
    return false
  }
}

const doFetch = (request) => (shouldOmitCredentials(request) ? fetch(request, { credentials: 'omit' }) : fetch(request))

const offlineApiResponse = () =>
  new Response(JSON.stringify({ message: 'You are offline. Please reconnect and try again.' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  })

const offlinePageResponse = () =>
  new Response('<h1>Offline</h1><p>Please reconnect and try again.</p>', {
    status: 503,
    headers: { 'Content-Type': 'text/html' },
  })

const networkFirstNavigation = async (request) => {
  try {
    const response = await doFetch(request)
    const cache = await caches.open(CACHE_VERSION)
    cache.put('/index.html', response.clone())
    return response
  } catch {
    const cached = await caches.match('/index.html')
    return cached || offlinePageResponse()
  }
}

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE_VERSION)
  const cached = await cache.match(request)
  const fetched = doFetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached)

  const result = (await fetched) || cached || offlinePageResponse()
  return result
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
