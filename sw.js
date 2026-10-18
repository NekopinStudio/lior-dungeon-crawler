const CACHE_PREFIX = "lior-dungeon-crawler-";
const CACHE_NAME = `${CACHE_PREFIX}v8`;
const SHELL_PATHS = [
  "./",
  "./index.html",
  "./styles.css",
  "./game.js",
  "./manifest.webmanifest",
  "./Descenso de Lior al Abismo.png",
  "./Ruinas góticas y diálogo de Lior.png",
  "./Assets/Audio/game-over-efect.mp3",
  "./Assets/Audio/game-over-song.wav",
  "./Assets/Audio/Actions/coinpick.mp3",
  "./Assets/Audio/Actions/eldritchblast.mp3",
  "./Assets/Audio/Actions/heal.mp3",
  "./Assets/Audio/Actions/liorhurt.mp3",
  "./Assets/Audio/Actions/mistystep.mp3",
  "./Assets/Audio/Actions/mosquete.mp3",
  "./Assets/Audio/Actions/pickupsomething.mp3",
  "./Assets/Audio/Actions/pistol.mp3",
  "./Assets/Audio/Actions/trabuco.mp3",
  "./Assets/Audio/bgm/01. Slay The Evil Midi.mid",
  "./Assets/Audio/bgm/02. Perilous Dungeon Midi.mid",
  "./Assets/Audio/bgm/03. Boss Battle Midi.mid",
  "./Assets/Audio/bgm/05. Last Mission Midi.mid",
  "./Assets/Audio/bgm/06. Unknown Planet Midi.mid",
  "./Assets/Audio/bgm/09. Crisis Midi.mid",
  "./Assets/Audio/bgm/12. Strong Boss Midi.mid",
  "./Assets/Audio/bgm/16. Truth Midi.mid",
  "./Assets/Audio/bgm/18. Infinite Darkness Midi.mid",
  "./Assets/Audio/monster/1-4monster.mp3",
  "./Assets/Audio/monster/5-9monster.mp3",
  "./Assets/Audio/monster/Dragon.mp3",
  "./Assets/Video/nekopinGames.png",
  "./pwa-icon-192.png",
  "./pwa-icon-512.jpg"
];
const SHELL_URLS = new Set(SHELL_PATHS.map(path => new URL(path, self.registration.scope).href));

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled([...SHELL_URLS].map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || SHELL_URLS.has(url.href)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(request)
          || await cache.match(new URL("./index.html", self.registration.scope).href);
        if (cached) return cached;
        throw new Error("No hay una copia disponible sin conexión.");
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});