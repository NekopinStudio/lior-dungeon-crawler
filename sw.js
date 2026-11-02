const CACHE_PREFIX = "lior-dungeon-crawler-";
const CACHE_NAME = `${CACHE_PREFIX}v14`;
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
  "./Assets/Lior/lior.png",
  "./Assets/Lior/lior2.png",
  "./Assets/Lior/EBlast.jpg",
  "./Assets/Lior/PistolShot.jpg",
  "./Assets/Lior/MosqueteShot.jpg",
  "./Assets/Lior/trabucoShot.jpg",
  "./Assets/Enemy/disparos.jpg",
  "./Assets/Enemy/Golden-bunny.jpg",
  "./Assets/Enemy/merchant.png",
  "./Assets/Enemy/1x1/1. kobold.jpg",
  "./Assets/Enemy/1x1/2. Goblin.jpg",
  "./Assets/Enemy/1x1/3.Skelleton.jpg",
  "./Assets/Enemy/1x1/4. Zombie.jpg",
  "./Assets/Enemy/1x1/5. orc.jpg",
  "./Assets/Enemy/1x1/6. Gnoll.jpg",
  "./Assets/Enemy/1x1/7. hobgoblin.jpg",
  "./Assets/Enemy/1x1/8. lizardfolk.jpg",
  "./Assets/Enemy/1x1/9. imp.jpg",
  "./Assets/Enemy/1x1/10. bugbear.jpg",
  "./Assets/Enemy/2x2/1. ogre.png",
  "./Assets/Enemy/2x2/2. troll.jpg",
  "./Assets/Enemy/2x2/3. minotaur.jpg",
  "./Assets/Enemy/2x2/4. owlbear.jpg",
  "./Assets/Enemy/2x2/5. manticore.jpg",
  "./Assets/Enemy/2x2/6. basilisk.jpg",
  "./Assets/Enemy/2x2/7. chimera.jpg",
  "./Assets/Enemy/2x2/8. bulette.jpg",
  "./Assets/Enemy/2x2/9. hillGiant.jpg",
  "./Assets/Enemy/2x2/10. youngDragon.jpg",
  "./Assets/Enemy/4x4/1. roc.jpg",
  "./Assets/Enemy/4x4/2. tarrasque.jpg",
  "./Assets/Enemy/4x4/3. ironGolem.jpg",
  "./Assets/Enemy/4x4/4. kraken.jpg",
  "./Assets/Enemy/4x4/5. stormGigant.jpg",
  "./Assets/Enemy/4x4/6. beholder.jpg",
  "./Assets/Enemy/4x4/7. purpleworm.jpg",
  "./Assets/Enemy/4x4/8. Balor.jpg",
  "./Assets/Enemy/4x4/9. AncientRedDragon.jpg",
  "./Assets/Enemy/4x4/10. solarDragon.jpg",
  "./Assets/Map/Dungeon_1/Dungeon_1.png",
  "./Assets/Map/Dungeon_1/Grass_Type_1.png",
  "./Assets/Map/Dungeon_1/Grass_Type_2.png",
  "./Assets/Map/Dungeon_2/Dungeon_2.png",
  "./Assets/Map/Dungeon_2/Dungeon_2_Wall_Additions.png",
  "./Assets/Map/Dungeon_2/Grass_Type_1.png",
  "./Assets/Map/Dungeon_2/Grass_Type_2.png",
  "./Assets/Map/Dungeon_3/Dungeon_3.png",
  "./Assets/Map/Dungeon_3/Dungeon3_Wall_Additions.png",
  "./Assets/Map/Dungeon_3/Snow_Type_1.png",
  "./Assets/Map/Dungeon_3/Snow_type_2.png",
  "./Assets/Map/Chests/Treasure_Chests(16x16).png",
  "./Assets/Map/PowerUps/PickUp_Items-Sheet.png",
  "./Assets/Map/Animated Mushrooms/Dungeon_Animated_Mushrooms.png",
  "./Assets/Map/UI/UI_Ballsy.png",
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