/**
 * SISTEMA DE INTERNACIONALIZACIÓN (i18n)
 */
const IS_SPANISH = (navigator.language || navigator.userLanguage || "es").toLowerCase().startsWith("es");

const I18N = {
  cardinals: IS_SPANISH
    ? ["Norte (▲)", "Este (▶)", "Sur (▼)", "Oeste (◀)"]
    : ["North (▲)", "East (▶)", "South (▼)", "West (◀)"],
  doorLocked: (count) => IS_SPANISH ? `BLOQUEADA (${count})` : `LOCKED (${count})`,
  doorOpen: IS_SPANISH ? "ABIERTA" : "OPEN",
  weaponNames: {
    sword: IS_SPANISH ? "Espada" : "Sword",
    pistol: IS_SPANISH ? "Pistola" : "Pistol",
    musket: IS_SPANISH ? "Mosquete" : "Musket",
    blunderbuss: IS_SPANISH ? "Trabuco" : "Blunderbuss"
  },
  weaponLabels: {
    sword: IS_SPANISH ? "Espada (área c/c 1.5)" : "Longsword (1.5 AoE)",
    pistol: IS_SPANISH ? "Pistola (frente 3x3)" : "Pistol (front 3x3)",
    musket: IS_SPANISH ? "Mosquete (frente 5x3)" : "Musket (front 5x3)",
    blunderbuss: IS_SPANISH ? "Trabuco (frente 2x4)" : "Blunderbuss (front 2x4)"
  },
  captions: {
    weapon: IS_SPANISH ? "ARMA" : "WEAPON",
    blast: IS_SPANISH ? "E. BLAST" : "E. BLAST",
    mist: IS_SPANISH ? "BRUMA" : "MIST",
    attack: IS_SPANISH ? "ATACAR" : "ATTACK"
  },
  captionsKeyboard: {
    weapon: IS_SPANISH ? "ARMA (I)" : "WEAPON (I)",
    blast: IS_SPANISH ? "E. BLAST (J)" : "E. BLAST (J)",
    mist: IS_SPANISH ? "BRUMA (L)" : "MIST (L)",
    attack: IS_SPANISH ? "ATACAR (K)" : "ATTACK (K)"
  },
  death: {
    title: IS_SPANISH ? "HAS CAÍDO" : "YOU DIED",
    desc: IS_SPANISH ? "Las sombras del calabozo han consumido a Lior." : "The dungeon shadows have consumed Lior.",
    btn: IS_SPANISH ? "☠ INTENTAR DE NUEVO" : "☠ TRY AGAIN",
    stats: (floor, kills, gold) => IS_SPANISH
      ? `Alcanzaste el Piso: ${floor}<br>Enemigos purificados: ${kills}<br>Oro acumulado: ${gold} PO`
      : `Reached Floor: ${floor}<br>Enemies defeated: ${kills}<br>Total Gold: ${gold} GP`
  },
  victory: {
    title: IS_SPANISH ? "¡PURIFICACIÓN!" : "VICTORY!",
    desc: IS_SPANISH ? "Lior Kurogane ha emergido a la superficie.<br>La luz del sol baña los 100 pisos conquistados." : "Lior Kurogane has reached the surface.<br>Warm sunlight cleanses the 100 conquered floors.",
    btn: IS_SPANISH ? "REINICIAR VIAJE" : "PLAY AGAIN",
    stats: (kills, gold) => IS_SPANISH
      ? `Pisos purificados: 100<br>Enemigos eliminados: ${kills}<br>Oro reunido: ${gold} PO`
      : `Floors cleared: 100<br>Enemies purged: ${kills}<br>Gold gathered: ${gold} GP`
  },
  logs: {
    outOfBounds: IS_SPANISH ? "El muro exterior te detiene." : "The outer perimeter stops you.",
    backOutOfBounds: IS_SPANISH ? "Un muro exterior detiene tu retroceso." : "An outer perimeter wall blocks your retreat.",
    wallFront: IS_SPANISH ? "Un muro blanco bloquea el camino." : "A white wall blocks your path.",
    wallBack: IS_SPANISH ? "Un muro a tu espalda te impide retroceder." : "A wall behind you blocks your retreat.",
    enemyBlock: IS_SPANISH ? "¡Un enemigo bloquea el paso! Ataca para despejarlo." : "An enemy blocks your way! Attack to clear.",
    enemyBlockBack: IS_SPANISH ? "Un enemigo te bloquea el paso por la espalda." : "An enemy blocks your path from behind.",
    merchantPeace: IS_SPANISH ? "Baja tu arma, tengo cosas buenas para ti." : "Lower your weapon, I have good wares for you.",
    merchantNoAttack: IS_SPANISH ? "No puedes atacar en el santuario del mercader." : "You cannot attack in the merchant's sanctuary.",
    noAmmoPistol: IS_SPANISH ? "¡Sin balas de Pistola! Cambia de arma." : "Out of Pistol ammo! Switch weapons.",
    noAmmoMusket: IS_SPANISH ? "¡Sin balas de Mosquete! Cambia de arma." : "Out of Musket ammo! Switch weapons.",
    noAmmoBlunderbuss: IS_SPANISH ? "¡Sin balas de Trabuco! Cambia de arma." : "Out of Blunderbuss ammo! Switch weapons.",
    chestPotion: (heal) => IS_SPANISH ? `Encontraste una poción: +${heal} HP.` : `You found a potion: +${heal} HP.`,
    chestWeapon: (weapon, ammo) => IS_SPANISH
      ? `Encontraste ${weapon} y ${ammo} ${ammo === 1 ? "bala" : "balas"}.`
      : `You found a ${weapon} and ${ammo} ${ammo === 1 ? "round" : "rounds"}.`,
    chestAmmo: (weapon, ammo) => IS_SPANISH
      ? `El cofre tenía ${ammo} ${ammo === 1 ? "bala" : "balas"} de ${weapon}.`
      : `The chest had ${ammo} ${ammo === 1 ? "round" : "rounds"} for your ${weapon}.`,
    swordWhiff: IS_SPANISH ? "Blandes tu espada en círculo, pero no hay enemigos al alcance." : "You swing your sword in an arc, but no enemies are near.",
    shotWhiff: (weapon) => IS_SPANISH ? `Disparas tu ${weapon}... pero la bala se pierde sin impactar.` : `You fire your ${weapon}... but the shot finds no target.`,
    panic: IS_SPANISH ? "¡El líder cayó! Los esbirros cercanos entran en pánico y huyen." : "The leader fell! Nearby minions panic and flee.",
    deadPlayer: IS_SPANISH ? "Lior ha caído en combate. Fin de la partida." : "Lior has fallen in battle. Game Over.",
    blastCharging: (rem) => IS_SPANISH ? `Eldritch Blast cargando (${rem} acciones restantes).` : `Eldritch Blast is charging (${rem} actions left).`,
    blastWhiff: IS_SPANISH ? "Liberas un rayo de Eldritch Blast, pero no hay objetivos en tu línea de visión." : "You unleash an Eldritch Blast, but no enemies are in line of sight.",
    blastFired: (target, dmg) => IS_SPANISH ? `¡Eldritch Blast impacta a ${target} por ${dmg} de daño arcano!` : `Eldritch Blast strikes ${target} for ${dmg} force damage!`,
    exitLocked: (cnt) => IS_SPANISH ? `¡La puerta está sellada! Elimina a las ${cnt} amenazas restantes.` : `The gate is sealed! Slay the remaining ${cnt} threats.`,
    exitDescend: IS_SPANISH ? "¡Descendiendo al siguiente nivel...!" : "Descending to the next floor...",
    floorIntro: (floor, tier, w, h, ac, hit, dmg) => IS_SPANISH
      ? `Piso ${floor} (Tier ${tier}): ${w}x${h}. CA Lior: ${ac}, Impacto: +${hit}, Daño: +${dmg}.`
      : `Floor ${floor} (Tier ${tier}): ${w}x${h}. Lior AC: ${ac}, Hit bonus: +${hit}, Flat Dmg: +${dmg}.`,
    bunnyCaught: IS_SPANISH
      ? "¡Atrapaste al Conejo Dorado! Obtienes 5 monedas de oro."
      : "You caught the Golden Bunny! You receive 5 gold coins."
  }
};

/**
 * ATLAS PRO IMAGINIBUS LIORIS KUROGANE
 */
const LIOR_SPRITES = {
  IDLE: {
    SWORD:       { x: 51,  y: 52, w: 132, h: 197 },
    PISTOL:      { x: 286, y: 62, w: 114, h: 187 },
    MUSKET:      { x: 496, y: 35, w: 163, h: 223 },
    BLUNDERBUSS: { x: 720, y: 61, w: 114, h: 185 }
  },
  SWORD_SPIN: [
    { x: 903,  y: 80, w: 151, h: 178 },
    { x: 1048, y: 52, w: 297, h: 214 },
    { x: 1372, y: 81, w: 119, h: 177 }
  ],
  MISTY_STEP: [
    { x: 700, y: 545, w: 112, h: 180 },
    { x: 810, y: 535, w: 94, h: 185 },
    { x: 900, y: 545, w: 100, h: 160 }
  ],
  HEAL: [
    { x: 1260, y: 535, w: 120, h: 190 },
    { x: 1390, y: 535, w: 132, h: 190 }
  ],
  DRINK_POTION: [
    { x: 1020, y: 538, w: 92, h: 188 },
    { x: 1135, y: 545, w: 108, h: 183 }
  ],
  WEAPON_CHANGE: { x: 50, y: 800, w: 116, h: 190 },
  PISTOL_SHOT: {
    sprite: { x: 35, y: 298, w: 132, h: 154 },
    muzzle: { x: 155, y: 322, w: 74, h: 80 },
    projectile: { x: 243, y: 340, w: 62, h: 58 },
    trail: { x: 328, y: 360, w: 230, h: 32 },
    impact: { x: 594, y: 340, w: 91, h: 100 }
  },
  MUSKET_SHOT: {
    sprite: { x: 15, y: 540, w: 135, h: 164 },
    muzzle: { x: 142, y: 564, w: 67, h: 84 },
    projectile: { x: 202, y: 585, w: 130, h: 50 },
    trail: { x: 328, y: 600, w: 224, h: 32 },
    impact: { x: 568, y: 562, w: 120, h: 145 }
  }
};

/**
 * MOTOR DE AUDIO SINTETIZADO (Web Audio API)
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playLogoJingle() {
    this.init();
    if (!this.ctx) return;
    const chordNotes = [261.63, 329.63, 392.00, 523.25];
    chordNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.6);
    });
  }

  playStep() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSword() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playShot(isMusket = false) {
    this.init();
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * (isMusket ? 0.25 : 0.16));
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isMusket ? 650 : 950, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + (isMusket ? 0.25 : 0.16));

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isMusket ? 0.35 : 0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (isMusket ? 0.25 : 0.16));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playHurt() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playHeal() {
    this.init();
    if (!this.ctx) return;
    const notes = [330, 440, 554, 659];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.05);
      osc.stop(this.ctx.currentTime + idx * 0.05 + 0.25);
    });
  }

  playEldritchBlast() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(640, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playMisty() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playCoin() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playDeath() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.7);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.7);
  }
}

const sounds = new SoundEngine();

const DIR_VECTORS = [
  { x: 0, y: -1 }, // N
  { x: 1, y: 0 },  // E
  { x: 0, y: 1 },  // S
  { x: -1, y: 0 }  // W
];

const TILE_OUT_OF_BOUNDS = -1;
const TILE_FLOOR = 0;
const TILE_WALL = 1;
const TILE_ENTRANCE = 2;
const TILE_EXIT = 3;
const TILE_CHEST = 4;

const ACTION_BINDINGS = {
  keyboard: { attack: "K", mist: "L", blast: "J", weapon: "I" },
  gamepad: {
    attack: { index: 0, standardLabel: "A", genericLabel: "1" },
    mist: { index: 1, standardLabel: "B", genericLabel: "2" },
    blast: { index: 2, standardLabel: "X", genericLabel: "3" },
    weapon: { index: 3, standardLabel: "Y", genericLabel: "4" }
  }
};

const CAMERA_CONFIG = {
  cols: 7,
  rows: 12,
  tileSize: 42,
  playerScreenX: 3,
  playerScreenY: 10
};

const CAMERA_CARDINAL_BASIS = [
  { forward: { x: 0, y: -1 }, right: { x: 1, y: 0 } },
  { forward: { x: 1, y: 0 },  right: { x: 0, y: 1 } },
  { forward: { x: 0, y: 1 },  right: { x: -1, y: 0 } },
  { forward: { x: -1, y: 0 }, right: { x: 0, y: -1 } }
];

const ENEMY_SPRITES = {
  small: [
    { x: 0, y: 96, w: 144, h: 144 },
    { x: 624, y: 96, w: 144, h: 144 },
    { x: 1248, y: 96, w: 144, h: 144 }
  ],
  miniBoss: { x: 1880, y: 104, w: 176, h: 176 },
  megaBoss: { x: 2568, y: 770, w: 220, h: 236 },
  bunnyIdle: { x: 0, y: 64, w: 256, h: 256 },
  bunnyFlee: [
    { x: 1672, y: 940, w: 288, h: 224 },
    { x: 2120, y: 940, w: 272, h: 224 },
    { x: 2548, y: 940, w: 248, h: 224 }
  ]
};

const CHEST_SPRITES = [0, 16, 32, 48, 64].map(x => ({ x, y: 0, w: 16, h: 16 }));

const WEAPONS = {
  SWORD: {
    id: "sword",
    name: I18N.weaponNames.sword,
    label: I18N.weaponLabels.sword,
    damage: 2,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },
  PISTOL: {
    id: "pistol",
    name: I18N.weaponNames.pistol,
    label: I18N.weaponLabels.pistol,
    damage: 4,
    range: 3,
    width: 3,
    isMelee: false,
    ammoType: "pistol",
    ammoProperty: "ammoPistol"
  },
  MUSKET: {
    id: "musket",
    name: I18N.weaponNames.musket,
    label: I18N.weaponLabels.musket,
    damage: 6,
    range: 5,
    width: 3,
    isMelee: false,
    ammoType: "musket",
    ammoProperty: "ammoMusket"
  },
  BLUNDERBUSS: {
    id: "blunderbuss",
    name: I18N.weaponNames.blunderbuss,
    label: I18N.weaponLabels.blunderbuss,
    damage: 8,
    range: 2,
    width: 4,
    isMelee: false,
    ammoType: "blunderbuss",
    ammoProperty: "ammoBlunderbuss"
  }
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getRandomDungeonDimensions(min = 10, max = 30, floorNumber = 1) {
  if (floorNumber % 10 === 0) {
    return { width: 22, height: 16 };
  }

  const absoluteMin = 10;
  const absoluteMax = 30;
  const currentMax = Math.min(absoluteMax, 11 + Math.max(0, floorNumber - 1));

  const w = Math.floor(Math.random() * (currentMax - absoluteMin + 1)) + absoluteMin;
  let h = Math.floor(Math.random() * (currentMax - absoluteMin + 1)) + absoluteMin;

  if (currentMax > absoluteMin) {
    while (h === w) {
      h = Math.floor(Math.random() * (currentMax - absoluteMin + 1)) + absoluteMin;
    }
  }

  return { width: w, height: h };
}

class Dungeon {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.revealed = new Set();
    this.enemies = [];
    this.npcs = [];
    this.chests = new Set();
    this.isMerchantRoom = false;

    this.entrance = { x: 1, y: height - 1 };
    this.exit = { x: width - 2, y: 0 };
  }

  getKey(x, y) {
    return `${x},${y}`;
  }

  isInsideBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getTile(x, y) {
    if (!this.isInsideBounds(x, y)) return TILE_OUT_OF_BOUNDS;
    return this.tiles.has(this.getKey(x, y)) ? this.tiles.get(this.getKey(x, y)) : TILE_FLOOR;
  }

  setTile(x, y, type) {
    if (this.isInsideBounds(x, y)) {
      this.tiles.set(this.getKey(x, y), type);
    }
  }

  markRevealed(x, y) {
    this.revealed.add(this.getKey(x, y));
  }

  isRevealed(x, y) {
    return this.revealed.has(this.getKey(x, y));
  }
}

class Player {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.direction = 0;
    this.maxHp = 61;
    this.hp = 61;
    this.ac = 10;
    this.gold = 0;
    this.kills = 0;

    this.ammoPistol = 0;
    this.ammoMusket = 0;
    this.ammoBlunderbuss = 0;
    this.unlockedWeapons = new Set([WEAPONS.SWORD.id]);
    this.equippedWeapon = WEAPONS.SWORD;

    this.mistyStepCharges = 2;

    // Sistema de recarga de Eldritch Blast (10 acciones)
    this.blastMaxCharges = 10;
    this.blastCurrentCharges = 10;
  }

  turnLeft() {
    this.direction = (this.direction + 3) % 4;
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  getNextForwardPos(steps = 1) {
    const v = DIR_VECTORS[this.direction];
    return { x: this.x + v.x * steps, y: this.y + v.y * steps };
  }

  getNextBackwardPos() {
    const v = DIR_VECTORS[this.direction];
    return { x: this.x - v.x, y: this.y - v.y };
  }

  moveForward() {
    const next = this.getNextForwardPos(1);
    this.x = next.x;
    this.y = next.y;
  }

  moveBackward() {
    const prev = this.getNextBackwardPos();
    this.x = prev.x;
    this.y = prev.y;
  }

  cycleWeapon() {
    const availableWeapons = Object.values(WEAPONS).filter(weapon => this.unlockedWeapons.has(weapon.id));
    if (availableWeapons.length < 2) return;
    const currentIndex = availableWeapons.findIndex(weapon => weapon.id === this.equippedWeapon.id);
    this.equippedWeapon = availableWeapons[(currentIndex + 1) % availableWeapons.length];
  }

  advanceAction() {
    if (this.blastCurrentCharges < this.blastMaxCharges) {
      this.blastCurrentCharges++;
    }
  }

  isBlastReady() {
    return this.blastCurrentCharges >= this.blastMaxCharges;
  }
}

class DungeonGenerator {
  constructor(dungeon, floorNumber = 1) {
    this.dungeon = dungeon;
    this.floorNumber = floorNumber;
    this.tier = Math.min(10, Math.floor((this.floorNumber - 1) / 10) + 1);

    if (this.dungeon.isMerchantRoom) {
      this.generateMerchantRoom();
      return;
    }

    const area = dungeon.width * dungeon.height;
    this.totalEnemies = Math.max(2, Math.floor(area / 20));

    for (let y = 0; y < dungeon.height; y++) {
      for (let x = 0; x < dungeon.width; x++) {
        this.generateTile(x, y);
      }
    }

    this.populateEnemies();
    this.placeChests();
    this.placeGoldenBunny();
    this.ensureStartingEnemyVisible();
  }

  generateMerchantRoom() {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const isDoor = (x === 2 && (y === 0 || y === 4));
        const isBorder = (x === 0 || x === 4 || y === 0 || y === 4);
        if (isBorder && !isDoor) {
          this.dungeon.setTile(x, y, TILE_WALL);
        } else {
          this.dungeon.setTile(x, y, TILE_FLOOR);
        }
      }
    }

    this.dungeon.entrance = { x: 2, y: 4 };
    this.dungeon.exit = { x: 2, y: 0 };
    this.dungeon.setTile(2, 4, TILE_ENTRANCE);
    this.dungeon.setTile(2, 0, TILE_EXIT);

    this.dungeon.npcs.push({
      id: "merchant",
      name: "Mercader de Sombras",
      x: 1,
      y: 2,
      isMerchant: true
    });
  }

  generateTile(x, y) {
    if (x === this.dungeon.entrance.x && y === this.dungeon.entrance.y) {
      this.dungeon.setTile(x, y, TILE_ENTRANCE);
      return;
    }
    if (x === this.dungeon.exit.x && y === this.dungeon.exit.y) {
      this.dungeon.setTile(x, y, TILE_EXIT);
      return;
    }

    if (x === 0 || x === this.dungeon.width - 1 || y === 0 || y === this.dungeon.height - 1) {
      this.dungeon.setTile(x, y, TILE_WALL);
      return;
    }

    if (x === this.dungeon.entrance.x && y === this.dungeon.entrance.y - 1) {
      this.dungeon.setTile(x, y, TILE_FLOOR);
      return;
    }

    if (Math.hypot(x - this.dungeon.entrance.x, y - this.dungeon.entrance.y) <= 2.2) {
      this.dungeon.setTile(x, y, TILE_FLOOR);
      return;
    }
    if (Math.hypot(x - this.dungeon.exit.x, y - this.dungeon.exit.y) <= 1.5) {
      this.dungeon.setTile(x, y, TILE_FLOOR);
      return;
    }

    const isWall = Math.random() < 0.20;
    this.dungeon.setTile(x, y, isWall ? TILE_WALL : TILE_FLOOR);
  }

  generateCells(originX, originY, size) {
    const cells = [];
    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        cells.push({ x: originX + dx, y: originY + dy });
      }
    }
    return cells;
  }

  populateEnemies() {
    if (this.floorNumber % 10 === 0 && this.dungeon.width >= 10 && this.dungeon.height >= 10) {
      let megaBossPlaced = false;
      for (let attempts = 0; attempts < 1000 && !megaBossPlaced; attempts++) {
        const mx = Math.floor(Math.random() * (this.dungeon.width - 6)) + 2;
        const my = Math.floor(Math.random() * (this.dungeon.height - 6)) + 2;

        if (Math.hypot(mx - this.dungeon.entrance.x, my - this.dungeon.entrance.y) <= 6.0) continue;
        if (Math.hypot(mx - this.dungeon.exit.x, my - this.dungeon.exit.y) <= 4.0) continue;

        const bossCells = this.generateCells(mx, my, 4);
        bossCells.forEach(c => this.dungeon.setTile(c.x, c.y, TILE_FLOOR));

        const megaBossHp = 18 + this.tier * 6;

        this.dungeon.enemies.push({
          id: Math.random().toString(36).substring(2, 9),
          x: mx, y: my,
          startX: mx, startY: my,
          name: "MEGA BOSS (4x4)",
          hp: megaBossHp,
          maxHp: megaBossHp,
          ac: 12 + this.tier,
          visionRange: 4,
          attackRange: 4,
          isMegaBoss: true,
          isBoss: true,
          size: 4,
          cells: bossCells,
          fearCooldown: 0
        });
        megaBossPlaced = true;
      }
    }

    let sequenceCounter = 0;
    for (let i = 0; i < this.totalEnemies; i++) {
      const isBoss = (sequenceCounter === 3 && this.dungeon.width >= 6 && this.dungeon.height >= 6);
      const enemySize = isBoss ? 2 : 1;
      let placed = false;

      for (let attempts = 0; attempts < 800 && !placed; attempts++) {
        const rx = Math.floor(Math.random() * (this.dungeon.width - enemySize - 2)) + 1;
        const ry = Math.floor(Math.random() * (this.dungeon.height - enemySize - 2)) + 1;

        if (Math.hypot(rx - this.dungeon.entrance.x, ry - this.dungeon.entrance.y) <= 3.5) continue;
        if (Math.hypot(rx - this.dungeon.exit.x, ry - this.dungeon.exit.y) <= 2.5) continue;

        const candidateCells = this.generateCells(rx, ry, enemySize);
        const collides = this.dungeon.enemies.some(existing =>
          existing.cells.some(c1 => candidateCells.some(c2 => c1.x === c2.x && c1.y === c2.y))
        );
        if (collides) continue;

        candidateCells.forEach(c => this.dungeon.setTile(c.x, c.y, TILE_FLOOR));

        if (isBoss) {
          const miniBossHp = 6 + this.tier * 2;

          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: IS_SPANISH ? "Minijefe (2x2)" : "Mini Boss (2x2)",
            hp: miniBossHp,
            maxHp: miniBossHp,
            ac: 10 + this.tier,
            visionRange: 3,
            attackRange: 2,
            isMegaBoss: false,
            isBoss: true,
            size: 2,
            cells: candidateCells,
            fearCooldown: 0
          });
          sequenceCounter = 0;
        } else {
          const shadowHp = 2 + Math.floor((this.tier - 1) / 2);

          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: IS_SPANISH ? "Sombra Hostil" : "Hostile Shadow",
            hp: shadowHp,
            maxHp: shadowHp,
            ac: 8 + this.tier,
            visionRange: 2,
            attackRange: 1,
            isMegaBoss: false,
            isBoss: false,
            size: 1,
            spriteSet: Math.floor(Math.random() * ENEMY_SPRITES.small.length),
            cells: candidateCells,
            fearCooldown: 0
          });
          sequenceCounter++;
        }
        placed = true;
      }
    }
  }

  placeGoldenBunny() {
    const miniBossCount = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss).length;
    const spawnChance = Math.min(1.0, miniBossCount * 0.10);

    if (spawnChance <= 0 || Math.random() >= spawnChance) return;

    for (let attempts = 0; attempts < 600; attempts++) {
      const x = Math.floor(Math.random() * (this.dungeon.width - 2)) + 1;
      const y = Math.floor(Math.random() * (this.dungeon.height - 2)) + 1;
      if (this.dungeon.getTile(x, y) !== TILE_FLOOR) continue;
      if (Math.hypot(x - this.dungeon.entrance.x, y - this.dungeon.entrance.y) <= 2) continue;
      if (Math.hypot(x - this.dungeon.exit.x, y - this.dungeon.exit.y) <= 1.5) continue;
      if (this.dungeon.enemies.some(enemy => enemy.cells.some(cell => cell.x === x && cell.y === y))) continue;

      this.dungeon.npcs.push({
        id: "golden-bunny",
        name: "Golden Bunny",
        x,
        y,
        isFleeing: false,
        fleeDirection: { dx: 1, dy: 0 },
        fleeStartedAt: 0
      });
      return;
    }
  }

  ensureStartingEnemyVisible() {
    const enemy = this.dungeon.enemies.find(candidate => candidate.size === 1 && !candidate.isBoss);
    if (!enemy) return;

    const { x, y } = this.dungeon.entrance;
    for (let distance = 4; distance <= 8; distance++) {
      const targetX = x;
      const targetY = y - distance;
      if (!this.dungeon.isInsideBounds(targetX, targetY)) continue;
      if (this.dungeon.chests.has(this.dungeon.getKey(targetX, targetY))) continue;
      if (this.dungeon.npcs.some(npc => npc.x === targetX && npc.y === targetY)) continue;
      if (this.dungeon.enemies.some(other => other !== enemy
        && other.cells.some(cell => cell.x === targetX && cell.y === targetY))) continue;

      for (let step = 1; step < distance; step++) {
        const corridorY = y - step;
        if (!this.dungeon.chests.has(this.dungeon.getKey(x, corridorY))) {
          this.dungeon.setTile(x, corridorY, TILE_FLOOR);
        }
      }

      enemy.x = targetX;
      enemy.y = targetY;
      enemy.startX = targetX;
      enemy.startY = targetY;
      enemy.cells = [{ x: targetX, y: targetY }];
      this.dungeon.setTile(targetX, targetY, TILE_FLOOR);
      return;
    }
  }

  placeChests() {
    const miniBosses = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss);
    const targetChests = Math.max(1, Math.floor(miniBosses.length / 3))
      + Math.floor(this.dungeon.enemies.length / 5);

    for (let attempts = 0; attempts < 1500 && this.dungeon.chests.size < targetChests; attempts++) {
      const x = Math.floor(Math.random() * (this.dungeon.width - 2)) + 1;
      const y = Math.floor(Math.random() * (this.dungeon.height - 2)) + 1;
      if (this.dungeon.getTile(x, y) !== TILE_FLOOR) continue;
      if (Math.hypot(x - this.dungeon.entrance.x, y - this.dungeon.entrance.y) <= 3) continue;
      if (Math.hypot(x - this.dungeon.exit.x, y - this.dungeon.exit.y) <= 2) continue;
      if (this.dungeon.enemies.some(enemy => enemy.cells.some(cell => cell.x === x && cell.y === y))) continue;
      if ([...this.dungeon.chests].some(key => {
        const [chestX, chestY] = key.split(",").map(Number);
        return Math.hypot(x - chestX, y - chestY) < 3;
      })) continue;

      this.dungeon.setTile(x, y, TILE_CHEST);
      this.dungeon.chests.add(this.dungeon.getKey(x, y));
    }
  }
}

/**
 * PROYECCIÓN Y TRANSFORMACIÓN DE CÁMARA RELATIVA
 */
class CameraTransformer {
  static getBasis(direction) {
    const cardinal = ((direction % 4) + 4) % 4;
    return CAMERA_CARDINAL_BASIS[cardinal];
  }

  static screenToWorld(screenX, screenY, player) {
    const lateral = screenX - CAMERA_CONFIG.playerScreenX;
    const forward = CAMERA_CONFIG.playerScreenY - screenY;
    const basis = CameraTransformer.getBasis(player.direction);
    return {
      x: player.x + basis.forward.x * forward + basis.right.x * lateral,
      y: player.y + basis.forward.y * forward + basis.right.y * lateral
    };
  }

  static worldToScreen(worldX, worldY, player) {
    const dx = worldX - player.x;
    const dy = worldY - player.y;
    const basis = CameraTransformer.getBasis(player.direction);
    const forward = dx * basis.forward.x + dy * basis.forward.y;
    const lateral = dx * basis.right.x + dy * basis.right.y;
    return {
      screenX: CAMERA_CONFIG.playerScreenX + lateral,
      screenY: CAMERA_CONFIG.playerScreenY - forward
    };
  }
}

/**
 * SISTEMA DE VISIBILIDAD ROBUSTO
 */
class VisibilitySystem {
  static hasLineOfSight(screenX0, screenY0, screenX1, screenY1, dungeon, player) {
    if (screenX0 === screenX1 && screenY0 === screenY1) return true;

    const p0 = CameraTransformer.screenToWorld(screenX0, screenY0, player);
    const p1 = CameraTransformer.screenToWorld(screenX1, screenY1, player);
    return VisibilitySystem.hasWorldLineOfSight(p0.x, p0.y, p1.x, p1.y, dungeon);
  }

  static hasWorldLineOfSight(x0, y0, x1, y1, dungeon) {
    if (x0 === x1 && y0 === y1) return true;

    let curX = x0;
    let curY = y0;
    const dx = Math.abs(x1 - curX);
    const dy = Math.abs(y1 - curY);
    const sx = curX < x1 ? 1 : -1;
    const sy = curY < y1 ? 1 : -1;
    let err = dx - dy;

    const maxSteps = dx + dy + 2;
    let steps = 0;

    while (true) {
      steps++;
      if (steps > maxSteps) return false;

      if (curX === x1 && curY === y1) return true;

      if ((curX !== x0 || curY !== y0) && (curX !== x1 || curY !== y1)) {
        if (dungeon.getTile(curX, curY) === TILE_WALL) {
          return false;
        }
      }

      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; curX += sx; }
      if (e2 < dx) { err += dx; curY += sy; }
    }
  }
}

class Renderer {
  constructor(canvas, dungeon, player, generator) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dungeon = dungeon;
    this.player = player;
    this.generator = generator;
    this.game = null;
    this.isVictorySequence = false;
    this.victoryStep = 0;

    this.terrainThemes = [
      {
        floorColor: "#111713",
        wallColor: "#292e2c",
        boundaryColor: "#080c0a",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_1/Dungeon_1.png"),
        wallCrop: { x: 32, y: 16, w: 16, h: 16 }
      },
      {
        floorColor: "#20170f",
        wallColor: "#4a2f1d",
        boundaryColor: "#0d0906",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_2/Dungeon_2.png"),
        wallCrop: { x: 32, y: 16, w: 16, h: 16 }
      },
      {
        floorColor: "#111c2d",
        wallColor: "#293b57",
        boundaryColor: "#070e1b",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_3/Dungeon_3.png"),
        wallCrop: { x: 96, y: 16, w: 16, h: 16 }
      }
    ];
    this.mapDecorations = {
      chests: this.loadTerrainTexture("Assets/Map/Chests/Treasure_Chests(16x16).png")
    };
    this.enemySpriteSheet = this.loadTerrainTexture("Assets/Enemy/enemy-spriteSheet.jpg");
    this.goldenBunnySheet = this.loadTerrainTexture("Assets/Enemy/Golden-bunny.jpg");
    this.merchantSpriteSheet = this.loadTerrainTexture("Assets/Enemy/merchant.png");
    this.keyedSpriteCache = new Map();

    this.liorSpritesheet = this.loadTerrainTexture("Assets/Lior/lior_spritesheet.png");

    this.playerAnimation = null;
    this.playerAnimationFrame = null;
    this.chestOpening = null;
    this.chestOpeningFrame = null;
  }

  loadTerrainTexture(src) {
    const image = new Image();
    image.addEventListener("load", () => this.draw());
    image.src = src;
    return image;
  }

  getKeyedSprite(sheet, sourceRect, backgroundType) {
    if (!sheet.complete || sheet.naturalWidth === 0) return null;
    const cacheKey = `${sheet.src}:${sourceRect.x},${sourceRect.y},${sourceRect.w},${sourceRect.h}:${backgroundType}`;
    if (this.keyedSpriteCache.has(cacheKey)) return this.keyedSpriteCache.get(cacheKey);

    const sprite = document.createElement("canvas");
    sprite.width = sourceRect.w;
    sprite.height = sourceRect.h;
    const spriteCtx = sprite.getContext("2d", { willReadFrequently: true });
    spriteCtx.drawImage(sheet, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h,
      0, 0, sourceRect.w, sourceRect.h);

    const imageData = spriteCtx.getImageData(0, 0, sprite.width, sprite.height);
    const { data } = imageData;
    const visited = new Uint8Array(sprite.width * sprite.height);
    const queue = new Int32Array(sprite.width * sprite.height);
    const background = backgroundType === "gray"
      ? [data[0], data[1], data[2]]
      : [0, 0, 0];
    const isBackground = (pixel) => {
      const offset = pixel * 4;
      if (backgroundType === "enemy") {
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        const isBlack = Math.max(red, green, blue) < 30;
        const isGray = Math.max(red, green, blue) - Math.min(red, green, blue) < 14
          && red >= 92 && red <= 142;
        return isBlack || isGray;
      }
      if (backgroundType === "black") {
        return Math.max(data[offset], data[offset + 1], data[offset + 2]) < 30;
      }
      return Math.abs(data[offset] - background[0]) < 27
        && Math.abs(data[offset + 1] - background[1]) < 27
        && Math.abs(data[offset + 2] - background[2]) < 27;
    };

    let queueEnd = 0;
    const enqueue = (pixel) => {
      if (pixel < 0 || pixel >= visited.length || visited[pixel] || !isBackground(pixel)) return;
      visited[pixel] = 1;
      queue[queueEnd++] = pixel;
    };
    for (let x = 0; x < sprite.width; x++) {
      enqueue(x);
      enqueue((sprite.height - 1) * sprite.width + x);
    }
    for (let y = 0; y < sprite.height; y++) {
      enqueue(y * sprite.width);
      enqueue(y * sprite.width + sprite.width - 1);
    }

    for (let head = 0; head < queueEnd; head++) {
      const pixel = queue[head];
      data[pixel * 4 + 3] = 0;
      const x = pixel % sprite.width;
      const y = Math.floor(pixel / sprite.width);
      if (x > 0) enqueue(pixel - 1);
      if (x + 1 < sprite.width) enqueue(pixel + 1);
      if (y > 0) enqueue(pixel - sprite.width);
      if (y + 1 < sprite.height) enqueue(pixel + sprite.width);
    }

    const isMegaBossFrame = backgroundType === "enemy"
      && sourceRect.x === ENEMY_SPRITES.megaBoss.x
      && sourceRect.y === ENEMY_SPRITES.megaBoss.y;
    if (isMegaBossFrame) {
      const artifactVisited = new Uint8Array(sprite.width * sprite.height);
      for (let start = 0; start < artifactVisited.length; start++) {
        if (artifactVisited[start] || data[start * 4 + 3] === 0) continue;
        artifactVisited[start] = 1;
        const component = [start];
        let minX = start % sprite.width;
        let maxX = minX;
        let minY = Math.floor(start / sprite.width);
        let maxY = minY;

        for (let head = 0; head < component.length; head++) {
          const pixel = component[head];
          const x = pixel % sprite.width;
          const y = Math.floor(pixel / sprite.width);
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          for (let nextY = Math.max(0, y - 1); nextY <= Math.min(sprite.height - 1, y + 1); nextY++) {
            for (let nextX = Math.max(0, x - 1); nextX <= Math.min(sprite.width - 1, x + 1); nextX++) {
              const next = nextY * sprite.width + nextX;
              if (artifactVisited[next] || data[next * 4 + 3] === 0) continue;
              artifactVisited[next] = 1;
              component.push(next);
            }
          }
        }

        const isThinBorderArtifact = maxX - minX <= 1 && component.length <= 24
          && (minX < 24 || maxX >= sprite.width - 24 || minY < 16 || maxY >= sprite.height - 16);
        if (isThinBorderArtifact) {
          component.forEach(pixel => { data[pixel * 4 + 3] = 0; });
        }
      }
    }

    spriteCtx.putImageData(imageData, 0, 0);
    this.keyedSpriteCache.set(cacheKey, sprite);
    return sprite;
  }

  drawEnemySprite(targetCtx, enemy, px, py) {
    const sourceRect = enemy.isMegaBoss
      ? ENEMY_SPRITES.megaBoss
      : (enemy.isBoss ? ENEMY_SPRITES.miniBoss : ENEMY_SPRITES.small[enemy.spriteSet || 0]);
    const sprite = this.getKeyedSprite(this.enemySpriteSheet, sourceRect, "enemy");
    const tileSize = CAMERA_CONFIG.tileSize;
    const drawSize = enemy.size * tileSize;

    if (!sprite) {
      targetCtx.fillStyle = enemy.isBoss ? "#cc0029" : "#ff3333";
      targetCtx.fillRect(px + 2, py + 2, drawSize - 4, drawSize - 4);
      return;
    }

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(sprite, px, py, drawSize, drawSize);
    targetCtx.restore();
  }

  drawGoldenBunny(targetCtx, bunny, screenX, screenY) {
    const fleeing = bunny.isFleeing;
    const frame = fleeing
      ? ENEMY_SPRITES.bunnyFlee[Math.floor((performance.now() - bunny.fleeStartedAt) / 120) % ENEMY_SPRITES.bunnyFlee.length]
      : ENEMY_SPRITES.bunnyIdle;
    const sprite = this.getKeyedSprite(this.goldenBunnySheet, frame, "black");
    if (!sprite) return;

    const tileSize = CAMERA_CONFIG.tileSize;
    const scale = Math.min(tileSize / frame.w, tileSize / frame.h);
    const width = frame.w * scale;
    const height = frame.h * scale;
    const px = screenX * tileSize + (tileSize - width) / 2;
    const py = screenY * tileSize + tileSize - height;
    const nextScreen = CameraTransformer.worldToScreen(
      bunny.x + bunny.fleeDirection.dx,
      bunny.y + bunny.fleeDirection.dy,
      this.player
    );
    const movingLeft = fleeing && nextScreen.screenX < screenX;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    if (movingLeft) {
      targetCtx.translate(px + width, 0);
      targetCtx.scale(-1, 1);
      targetCtx.drawImage(sprite, 0, py, width, height);
    } else {
      targetCtx.drawImage(sprite, px, py, width, height);
    }
    targetCtx.restore();
  }

  drawMerchantSprite(targetCtx, px, py) {
    const tileSize = CAMERA_CONFIG.tileSize;
    const frame = { x: 12, y: 9, w: 37, h: 47 };
    const sprite = this.getKeyedSprite(this.merchantSpriteSheet, frame, "gray");
    if (sprite) {
      const height = tileSize * 1.25;
      const width = height * (frame.w / frame.h);
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(sprite, px + (tileSize - width) / 2,
        py + tileSize - height, width, height);
      targetCtx.restore();
      return;
    }

    targetCtx.save();
    targetCtx.fillStyle = "#ffd700";
    targetCtx.strokeStyle = "#ffffff";
    targetCtx.lineWidth = 2;
    targetCtx.beginPath();
    targetCtx.arc(px + tileSize / 2, py + tileSize / 2, tileSize * 0.4, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.stroke();

    targetCtx.fillStyle = "#000000";
    targetCtx.font = "bold 16px monospace";
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "middle";
    targetCtx.fillText("✦", px + tileSize / 2, py + tileSize / 2);
    targetCtx.restore();
  }

  getTerrainTheme() {
    const floorNumber = this.generator?.floorNumber || 1;
    const themeIndex = Math.min(2, Math.floor((floorNumber - 1) / 34));
    return this.terrainThemes[themeIndex];
  }

  drawTerrainTile(targetCtx, texture, sourceRect, x, y, fallbackColor, opacity = 1) {
    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.fillStyle = fallbackColor;
    targetCtx.fillRect(x, y, CAMERA_CONFIG.tileSize, CAMERA_CONFIG.tileSize);

    if (texture?.complete && texture.naturalWidth > 0 && sourceRect) {
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(texture, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h,
        x, y, CAMERA_CONFIG.tileSize, CAMERA_CONFIG.tileSize);
    }
    targetCtx.restore();
  }

  drawChestSprite(targetCtx, px, py, opacity, frameIndex = 0) {
    const chests = this.mapDecorations.chests;
    if (!chests.complete || chests.naturalWidth === 0) return;
    const frame = CHEST_SPRITES[frameIndex];
    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(chests, frame.x, frame.y, frame.w, frame.h, px + 5, py + 5,
      CAMERA_CONFIG.tileSize - 10, CAMERA_CONFIG.tileSize - 10);
    targetCtx.restore();
  }

  drawChestOpeningFrame(targetCtx, playerScreenX, playerScreenY) {
    if (!this.chestOpening) return;
    const { screenX, screenY } = CameraTransformer.worldToScreen(
      this.chestOpening.x, this.chestOpening.y, this.player
    );
    if (screenX < 0 || screenX >= CAMERA_CONFIG.cols || screenY < 0 || screenY >= CAMERA_CONFIG.rows) return;
    if (!VisibilitySystem.hasLineOfSight(
      playerScreenX, playerScreenY, screenX, screenY, this.dungeon, this.player
    )) return;

    const frameIndex = Math.min(CHEST_SPRITES.length - 1,
      Math.floor((performance.now() - this.chestOpening.startedAt) / 90));
    this.drawChestSprite(targetCtx, screenX * CAMERA_CONFIG.tileSize,
      screenY * CAMERA_CONFIG.tileSize, 1, frameIndex);
  }

  playChestOpening(x, y) {
    if (this.chestOpeningFrame !== null) cancelAnimationFrame(this.chestOpeningFrame);
    const opening = { x, y, startedAt: performance.now() };
    this.chestOpening = opening;
    const animate = () => {
      if (this.chestOpening !== opening) return;
      if (performance.now() - opening.startedAt >= CHEST_SPRITES.length * 90) {
        this.chestOpening = null;
        this.chestOpeningFrame = null;
        this.redrawCurrentView();
        return;
      }
      this.redrawCurrentView();
      this.chestOpeningFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  drawLiorSprite(targetCtx, px, py, tileSize) {
    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;

    if (this.liorSpritesheet && this.liorSpritesheet.complete && this.liorSpritesheet.naturalWidth > 0) {
      let spriteDef = LIOR_SPRITES.IDLE.SWORD;
      if (this.player.equippedWeapon.id === "pistol") spriteDef = LIOR_SPRITES.IDLE.PISTOL;
      else if (this.player.equippedWeapon.id === "musket") spriteDef = LIOR_SPRITES.IDLE.MUSKET;
      else if (this.player.equippedWeapon.id === "blunderbuss") spriteDef = LIOR_SPRITES.IDLE.BLUNDERBUSS;

      let actionFrame = null;
      if (this.playerAnimation) {
        const frameIndex = Math.floor(
          (performance.now() - this.playerAnimation.startedAt) / this.playerAnimation.frameDuration
        );
        if (frameIndex < this.playerAnimation.frames.length) {
          actionFrame = this.playerAnimation.frames[frameIndex];
          spriteDef = actionFrame.sprite || actionFrame;
        }
      }

      const renderH = tileSize * 1.35;
      const renderW = renderH * (spriteDef.w / spriteDef.h);
      const drawX = px + (tileSize - renderW) / 2;
      const drawY = py + (tileSize - renderH) + 2;

      targetCtx.drawImage(
        this.liorSpritesheet,
        spriteDef.x, spriteDef.y, spriteDef.w, spriteDef.h,
        drawX, drawY, renderW, renderH
      );

      if (actionFrame?.effects) {
        this.drawPlayerEffects(targetCtx, actionFrame.effects, px, py, tileSize);
      }
    } else {
      const centerX = px + tileSize / 2;
      const centerY = py + tileSize / 2;

      targetCtx.fillStyle = this.player.hp > 0 ? "#00b0ff" : "#555555";
      targetCtx.beginPath();
      targetCtx.arc(centerX, centerY, tileSize * 0.38, 0, Math.PI * 2);
      targetCtx.fill();

      targetCtx.strokeStyle = "#ffffff";
      targetCtx.lineWidth = 2.5;
      targetCtx.stroke();

      if (this.player.hp > 0) {
        targetCtx.beginPath();
        targetCtx.moveTo(centerX, centerY);
        targetCtx.lineTo(centerX, centerY - tileSize * 0.55);
        targetCtx.stroke();
      }
    }
    targetCtx.restore();
  }

  drawPlayerEffects(targetCtx, effects, px, py, tileSize) {
    const centerX = px + tileSize / 2;
    effects.forEach(effect => {
      if (effect.type === "muzzle") {
        targetCtx.drawImage(this.liorSpritesheet, effect.sprite.x, effect.sprite.y,
          effect.sprite.w, effect.sprite.h, centerX + tileSize * 0.05, py - tileSize * 0.55,
          tileSize * 0.75, tileSize * 0.75);
      } else if (effect.type === "projectile") {
        const projectileY = py - tileSize * effect.distance;
        targetCtx.drawImage(this.liorSpritesheet, effect.sprite.x, effect.sprite.y,
          effect.sprite.w, effect.sprite.h, centerX - tileSize * 0.2, projectileY - tileSize * 0.2,
          tileSize * 0.4, tileSize * 0.4);
      } else if (effect.type === "trail") {
        const length = tileSize * effect.distance;
        targetCtx.save();
        targetCtx.translate(centerX, py - length / 2);
        targetCtx.rotate(-Math.PI / 2);
        targetCtx.drawImage(this.liorSpritesheet, effect.sprite.x, effect.sprite.y,
          effect.sprite.w, effect.sprite.h, -length / 2, -tileSize * 0.12, length, tileSize * 0.24);
        targetCtx.restore();
      } else if (effect.type === "impact") {
        const impactY = py - tileSize * effect.distance;
        targetCtx.drawImage(this.liorSpritesheet, effect.sprite.x, effect.sprite.y,
          effect.sprite.w, effect.sprite.h, centerX - tileSize * 0.65, impactY - tileSize * 0.65,
          tileSize * 1.3, tileSize * 1.3);
      }
    });
  }

  playSpriteAnimation(frames, frameDuration) {
    if (this.playerAnimationFrame !== null) {
      cancelAnimationFrame(this.playerAnimationFrame);
    }

    const animation = { frames, frameDuration, startedAt: performance.now() };
    this.playerAnimation = animation;
    const animate = () => {
      if (this.playerAnimation !== animation) return;

      if (performance.now() - animation.startedAt >= frames.length * frameDuration) {
        this.playerAnimation = null;
        this.playerAnimationFrame = null;
        this.redrawCurrentView();
        return;
      }

      this.redrawCurrentView();
      this.playerAnimationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  redrawCurrentView() {
    this.draw();
  }

  playSwordSpin() {
    this.playSpriteAnimation(LIOR_SPRITES.SWORD_SPIN, 110);
  }

  playMistyStep() {
    this.playSpriteAnimation(LIOR_SPRITES.MISTY_STEP, 100);
  }

  playEldritchBlastAnimation(distance) {
    const shot = LIOR_SPRITES.MUSKET_SHOT;
    const shooter = LIOR_SPRITES.HEAL[1] || LIOR_SPRITES.IDLE.SWORD;
    const frames = [
      { sprite: LIOR_SPRITES.HEAL[0], effects: [{ type: "muzzle", sprite: shot.muzzle }] },
      { sprite: shooter, effects: [
        { type: "projectile", sprite: shot.projectile, distance: Math.max(1, distance * 0.5) },
        { type: "trail", sprite: shot.trail, distance: Math.max(1, distance * 0.5) }
      ] },
      { sprite: shooter, effects: [{ type: "impact", sprite: shot.impact, distance: Math.max(1, distance) }] }
    ];
    this.playSpriteAnimation(frames, 90);
  }

  playDrinkPotion() {
    this.playSpriteAnimation(LIOR_SPRITES.DRINK_POTION, 160);
  }

  playWeaponChange() {
    this.playSpriteAnimation([LIOR_SPRITES.WEAPON_CHANGE], 220);
  }

  playShot(weaponId) {
    const shot = weaponId === "pistol" ? LIOR_SPRITES.PISTOL_SHOT : LIOR_SPRITES.MUSKET_SHOT;
    const distance = weaponId === "pistol" ? 3 : (weaponId === "blunderbuss" ? 2 : 5);
    const shooter = weaponId === "blunderbuss" ? LIOR_SPRITES.IDLE.BLUNDERBUSS : shot.sprite;
    const frames = [
      { sprite: shooter, effects: [{ type: "muzzle", sprite: shot.muzzle }] },
      { sprite: shooter, effects: [
        { type: "projectile", sprite: shot.projectile, distance: distance * 0.55 },
        { type: "trail", sprite: shot.trail, distance: distance * 0.55 }
      ] },
      { sprite: shooter, effects: [{ type: "impact", sprite: shot.impact, distance }] }
    ];
    this.playSpriteAnimation(frames, 100);
  }

  setDungeon(dungeon, generator) {
    this.dungeon = dungeon;
    this.generator = generator;
  }

  draw() {
    this.drawBase(this.ctx);
  }

  drawBase(targetCtx) {
    const { canvas } = this;
    const { cols, rows, tileSize, playerScreenX, playerScreenY } = CAMERA_CONFIG;

    targetCtx.fillStyle = "#000000";
    targetCtx.fillRect(0, 0, canvas.width, canvas.height);

    if (this.isVictorySequence) {
      for (let sy = 0; sy < rows; sy++) {
        for (let sx = 0; sx < cols; sx++) {
          const px = sx * tileSize;
          const py = sy * tileSize;

          if (sy < 4) {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#38bdf8" : "#0284c7";
          } else if (sy === 4 || sy === 5) {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#8b5a2b" : "#6f431b";
          } else {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#22c55e" : "#16a34a";
          }
          targetCtx.fillRect(px, py, tileSize, tileSize);
          targetCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          targetCtx.strokeRect(px, py, tileSize, tileSize);
        }
      }

      const sparklePositions = [[1, 1], [5, 1], [2, 3], [4, 2], [6, 4], [0, 5]];
      const sparkleTime = performance.now() / 350;

      for (const [sx, sy] of sparklePositions) {
        const px = sx * tileSize + tileSize / 2;
        const py = sy * tileSize + tileSize / 2;
        const pulse = 0.5 + Math.sin(sparkleTime + sx + sy) * 0.5;
        const size = 3 + pulse * 4;

        targetCtx.save();
        targetCtx.globalAlpha = 0.45 + pulse * 0.55;
        targetCtx.fillStyle = "#ffffff";
        targetCtx.beginPath();
        targetCtx.moveTo(px, py - size);
        targetCtx.lineTo(px + size * 0.35, py - size * 0.35);
        targetCtx.lineTo(px + size, py);
        targetCtx.lineTo(px + size * 0.35, py + size * 0.35);
        targetCtx.lineTo(px, py + size);
        targetCtx.lineTo(px - size * 0.35, py + size * 0.35);
        targetCtx.lineTo(px - size, py);
        targetCtx.lineTo(px - size * 0.35, py - size * 0.35);
        targetCtx.closePath();
        targetCtx.fill();
        targetCtx.restore();
      }

      const liorPx = playerScreenX * tileSize;
      const liorPy = (playerScreenY - this.victoryStep) * tileSize;
      this.drawLiorSprite(targetCtx, liorPx, liorPy, tileSize);
      return;
    }

    const theme = this.getTerrainTheme();
    this.dungeon.markRevealed(this.player.x, this.player.y);

    for (let sy = 0; sy < rows; sy++) {
      for (let sx = 0; sx < cols; sx++) {
        const worldCoord = CameraTransformer.screenToWorld(sx, sy, this.player);
        const tileType = this.dungeon.getTile(worldCoord.x, worldCoord.y);
        const px = sx * tileSize;
        const py = sy * tileSize;

        const isPlayerCell = (sx === playerScreenX && sy === playerScreenY);
        const inLineOfSight = isPlayerCell || VisibilitySystem.hasLineOfSight(
          playerScreenX, playerScreenY, sx, sy, this.dungeon, this.player
        );

        if (inLineOfSight) this.dungeon.markRevealed(worldCoord.x, worldCoord.y);
        const wasEverRevealed = this.dungeon.isRevealed(worldCoord.x, worldCoord.y);

        if (!inLineOfSight && !wasEverRevealed) {
          targetCtx.fillStyle = "#000000";
          targetCtx.fillRect(px, py, tileSize, tileSize);
          continue;
        }

        if (tileType === TILE_WALL) {
          const opacity = inLineOfSight ? 1 : 0.45;
          this.drawTerrainTile(targetCtx, theme.wallAtlas, theme.wallCrop, px, py,
            inLineOfSight ? theme.wallColor : "#111111", opacity);
        } else if (tileType === TILE_CHEST) {
          this.drawTerrainTile(targetCtx, null, null, px, py,
            theme.floorColor, inLineOfSight ? 1 : 0.4);
          this.drawChestSprite(targetCtx, px, py, inLineOfSight ? 1 : 0.4);
        } else if (tileType === TILE_ENTRANCE || tileType === TILE_EXIT) {
          this.drawTerrainTile(targetCtx, null, null, px, py, theme.floorColor,
            inLineOfSight ? 1 : 0.4);
          if (inLineOfSight) {
            targetCtx.save();
            targetCtx.font = "bold 18px monospace";
            targetCtx.textAlign = "center";
            targetCtx.textBaseline = "middle";
            targetCtx.lineWidth = 3;
            targetCtx.strokeStyle = "#000000";
            targetCtx.fillStyle = tileType === TILE_ENTRANCE ? "#00e676" : "#ffd700";
            targetCtx.strokeText(tileType === TILE_ENTRANCE ? "▼" : "▲",
              px + tileSize / 2, py + tileSize / 2);
            targetCtx.fillText(tileType === TILE_ENTRANCE ? "▼" : "▲",
              px + tileSize / 2, py + tileSize / 2);
            targetCtx.restore();
          }
        } else if (tileType === TILE_FLOOR) {
          this.drawTerrainTile(targetCtx, null, null, px, py, theme.floorColor,
            inLineOfSight ? 1 : 0.4);
        } else if (tileType === TILE_OUT_OF_BOUNDS) {
          this.drawTerrainTile(targetCtx, null, null, px, py, theme.boundaryColor,
            inLineOfSight ? 1 : 0.45);
        }

        targetCtx.strokeStyle = inLineOfSight ? "#2e2e34" : "#141416";
        targetCtx.lineWidth = 1;
        targetCtx.strokeRect(px, py, tileSize, tileSize);

        if (this.game && this.game.showWeaponRange) {
          const inRange = CombatSystem.isCellInWeaponRange(
            this.player,
            worldCoord.x,
            worldCoord.y,
            this.player.equippedWeapon
          );
          if (inRange && !(worldCoord.x === this.player.x && worldCoord.y === this.player.y)) {
            targetCtx.save();
            targetCtx.strokeStyle = "rgba(255, 45, 45, 0.9)";
            targetCtx.lineWidth = 2.5;
            targetCtx.fillStyle = "rgba(255, 0, 0, 0.14)";
            targetCtx.fillRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
            targetCtx.strokeRect(px + 1.5, py + 1.5, tileSize - 3, tileSize - 3);
            targetCtx.restore();
          }
        }
      }
    }

    this.drawChestOpeningFrame(targetCtx, playerScreenX, playerScreenY);

    this.dungeon.enemies.forEach(enemy => {
      if (!enemy.cells || enemy.cells.length === 0) return;

      let minScreenX = 999;
      let minScreenY = 999;
      let hasVisibleCell = false;

      enemy.cells.forEach(cell => {
        const { screenX, screenY } = CameraTransformer.worldToScreen(cell.x, cell.y, this.player);
        if (screenX >= 0 && screenX < cols && screenY >= 0 && screenY < rows) {
          if (VisibilitySystem.hasLineOfSight(playerScreenX, playerScreenY, screenX, screenY, this.dungeon, this.player)) {
            hasVisibleCell = true;
          }
        }
        if (screenX < minScreenX) minScreenX = screenX;
        if (screenY < minScreenY) minScreenY = screenY;
      });

      if (!hasVisibleCell) return;
      if (minScreenX + enemy.size <= 0 || minScreenX >= cols || minScreenY + enemy.size <= 0 || minScreenY >= rows) return;

      this.drawEnemySprite(targetCtx, enemy, minScreenX * tileSize, minScreenY * tileSize);
    });

    this.dungeon.npcs.forEach(npc => {
      const { screenX, screenY } = CameraTransformer.worldToScreen(npc.x, npc.y, this.player);
      if (screenX < 0 || screenX >= cols || screenY < 0 || screenY >= rows) return;
      const visible = VisibilitySystem.hasLineOfSight(
        playerScreenX, playerScreenY, screenX, screenY, this.dungeon, this.player
      );
      if (!visible) return;

      if (npc.isMerchant) {
        this.drawMerchantSprite(targetCtx, screenX * tileSize, screenY * tileSize);
      } else {
        this.drawGoldenBunny(targetCtx, npc, screenX, screenY);
      }
    });

    const liorCellPx = playerScreenX * tileSize;
    const liorCellPy = playerScreenY * tileSize;
    this.drawLiorSprite(targetCtx, liorCellPx, liorCellPy, tileSize);
  }
}

class CombatSystem {
  static getMinDistToPlayer(player, enemy) {
    if (!enemy.cells || enemy.cells.length === 0) return 999;
    let minDist = 999;
    enemy.cells.forEach(cell => {
      const d = Math.hypot(cell.x - player.x, cell.y - player.y);
      if (d < minDist) minDist = d;
    });
    return minDist;
  }

  static canEnemySeePlayer(player, dungeon, enemy) {
    if (!enemy.cells) return false;
    return enemy.cells.some(cell =>
      VisibilitySystem.hasWorldLineOfSight(cell.x, cell.y, player.x, player.y, dungeon)
    );
  }

  static isCellInWeaponRange(player, targetX, targetY, weapon) {
    const dx = targetX - player.x;
    const dy = targetY - player.y;

    if (weapon.isMelee) {
      return Math.hypot(dx, dy) <= weapon.range;
    }

    const basis = CameraTransformer.getBasis(player.direction);
    const forward = dx * basis.forward.x + dy * basis.forward.y;
    const lateral = dx * basis.right.x + dy * basis.right.y;

    const leftEdge = -Math.floor(weapon.width / 2);
    const rightEdge = leftEdge + weapon.width - 1;
    return forward >= 1 && forward <= weapon.range && lateral >= leftEdge && lateral <= rightEdge;
  }

  static executeAttack(game) {
    const { player, dungeon } = game;
    game.showWeaponRange = false;

    if (player.hp <= 0 || game.isPausedForDialog) {
      if (player.hp <= 0) game.log(I18N.logs.deadPlayer);
      return;
    }

    if (dungeon.isMerchantRoom) {
      game.log(I18N.logs.merchantNoAttack);
      return;
    }

    player.advanceAction();

    const weapon = player.equippedWeapon;
    const hitBonus = game.hitBonus;
    const dmgBonus = game.dmgBonus;

    if (weapon.ammoProperty) {
      if (player[weapon.ammoProperty] <= 0) {
        const noAmmoMessage = {
          pistol: I18N.logs.noAmmoPistol,
          musket: I18N.logs.noAmmoMusket,
          blunderbuss: I18N.logs.noAmmoBlunderbuss
        }[weapon.id];
        game.log(noAmmoMessage);
        return;
      }
      player[weapon.ammoProperty]--;
      sounds.playShot(weapon.id !== "pistol");
      game.renderer?.playShot(weapon.id);
    } else {
      sounds.playSword();
      game.renderer?.playSwordSpin();
    }

    let deadMiniBosses = [];

    if (weapon.isMelee) {
      const targetsHit = [];
      dungeon.enemies.forEach(enemy => {
        if (!enemy.cells) return;
        const touches = enemy.cells.some(cell => Math.hypot(cell.x - player.x, cell.y - player.y) <= 1.5);
        if (touches) targetsHit.push(enemy);
      });

      if (targetsHit.length === 0) {
        game.log(I18N.logs.swordWhiff);
      } else {
        targetsHit.forEach(target => {
          const d20 = rollDie(20);
          const attackTotal = d20 + hitBonus;

          if (d20 === 20 || attackTotal >= target.ac) {
            const totalDmg = weapon.damage + dmgBonus;
            target.hp -= totalDmg;
            game.log(`> [${attackTotal} vs CA ${target.ac}]: ${totalDmg} DMG -> ${target.name} (HP: ${Math.max(0, target.hp)})`);
          } else {
            game.log(`> [${attackTotal} vs CA ${target.ac}] Defended by ${target.name}.`);
          }
        });

        const deadEnemyIds = new Set();
        targetsHit.forEach(e => {
          if (e.hp <= 0) {
            deadEnemyIds.add(e.id);
            player.kills++;
            if (e.isBoss && !e.isMegaBoss) deadMiniBosses.push(e);
          }
        });

        if (deadEnemyIds.size > 0) {
          sounds.playCoin();
          dungeon.enemies = dungeon.enemies.filter(e => {
            if (deadEnemyIds.has(e.id)) {
              let goldDrop = e.isMegaBoss ? 10 : (e.isBoss ? rollDie(3) : (Math.random() < 0.5 ? 1 : 0));
              player.gold += goldDrop;
              game.log(`+${goldDrop} PO (${e.name})`);
              return false;
            }
            return true;
          });
        }
      }
    } else {
      let target = null;
      let minDist = 999;

      dungeon.enemies.forEach(enemy => {
        if (!enemy.cells) return;
        enemy.cells.forEach(cell => {
          if (CombatSystem.isCellInWeaponRange(player, cell.x, cell.y, weapon)) {
            if (VisibilitySystem.hasWorldLineOfSight(player.x, player.y, cell.x, cell.y, dungeon)) {
              const dist = Math.hypot(cell.x - player.x, cell.y - player.y);
              if (dist < minDist) {
                minDist = dist;
                target = enemy;
              }
            }
          }
        });
      });

      if (!target) {
        game.log(I18N.logs.shotWhiff(weapon.name));
      } else {
        const d20 = rollDie(20);
        const attackTotal = d20 + hitBonus;

        if (d20 === 20 || attackTotal >= target.ac) {
          const totalDmg = weapon.damage + dmgBonus;
          target.hp -= totalDmg;
          game.log(`> [${attackTotal} vs CA ${target.ac}]: ${totalDmg} DMG -> ${target.name} (HP: ${Math.max(0, target.hp)})`);

          if (target.hp <= 0) {
            sounds.playCoin();
            player.kills++;
            let goldDrop = target.isMegaBoss ? 10 : (target.isBoss ? rollDie(3) : (Math.random() < 0.5 ? 1 : 0));
            player.gold += goldDrop;
            game.log(`+${goldDrop} PO (${target.name})`);

            if (target.isBoss && !target.isMegaBoss) deadMiniBosses.push(target);
            dungeon.enemies = dungeon.enemies.filter(e => e.id !== target.id);
          }
        } else {
          game.log(`> [${attackTotal} vs CA ${target.ac}] Defended by ${target.name}.`);
        }
      }
    }

    if (deadMiniBosses.length > 0) {
      deadMiniBosses.forEach(mb => {
        dungeon.enemies.forEach(other => {
          if (!other.isBoss) {
            if (Math.hypot(other.x - mb.x, other.y - mb.y) <= 2.2) {
              other.fearCooldown = 2;
            }
          }
        });
      });
      game.log(I18N.logs.panic);
    }

    game.processEnemiesTurn();
    game.updateHUD();
    game.renderer.draw();
  }
}

class GameController {
  constructor() {
    this.floor = 1;
    this.inMerchantFloor = false;
    this.canvas = document.getElementById("viewport");
    this.victoryScreen = document.getElementById("victory-screen");
    this.deathScreen = document.getElementById("death-screen");
    this.shopModal = document.getElementById("shop-modal");
    this.dialogModal = document.getElementById("merchant-dialog-modal");
    this.isVictory = false;
    this.isPausedForDialog = false;
    this.showWeaponRange = false;
    this.dialogCallback = null;
    this.megaBossEmptyTurns = 0;
    this.gamepadMapping = "standard";
    this.controlDevice = "touch";

    this.initDungeonFloor();
    this.bindEvents();
    this.initShopEvents();
    this.initDeviceDetection();
    this.startGamepadLoop();
  }

  get tier() {
    return Math.min(10, Math.floor((this.floor - 1) / 10) + 1);
  }

  get playerAC() {
    return 9 + this.tier;
  }

  get hitBonus() {
    return this.tier;
  }

  get dmgBonus() {
    return Math.min(20, 1 + Math.floor(((this.floor - 1) * 19) / 99));
  }

  initDeviceDetection() {
    window.addEventListener("keydown", () => this.setControlDevice("keyboard"));
    window.addEventListener("touchstart", () => this.setControlDevice("touch"));
    window.addEventListener("gamepadconnected", (event) => {
      this.gamepadMapping = event.gamepad?.mapping || "";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
      this.setControlDevice("gamepad");
    });
    window.addEventListener("gamepaddisconnected", () => {
      this.gamepadMapping = "standard";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
      this.setControlDevice("touch");
    });
  }

  setControlDevice(device) {
    if (this.controlDevice === device) return;
    this.controlDevice = device;
    this.updateButtonLabels();
  }

  updateButtonLabels() {
    const btnUp = document.getElementById("btn-forward");
    const btnDown = document.getElementById("btn-backward");
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");

    const btnD = document.getElementById("btn-d");
    const btnC = document.getElementById("btn-c");
    const btnB = document.getElementById("btn-b");
    const btnA = document.getElementById("btn-a");

    const capD = document.getElementById("caption-d");
    const capC = document.getElementById("caption-c");
    const capB = document.getElementById("caption-b");
    const capA = document.getElementById("caption-a");

    const blastInner = btnC ? (btnC.querySelector(".arcade-btn-inner") || btnC) : null;

    if (this.controlDevice === "keyboard") {
      btnUp.textContent = "W";
      btnDown.textContent = "S";
      btnLeft.textContent = "A";
      btnRight.textContent = "D";

      btnD.textContent = ACTION_BINDINGS.keyboard.weapon;
      if (blastInner) blastInner.textContent = ACTION_BINDINGS.keyboard.blast;
      btnB.textContent = ACTION_BINDINGS.keyboard.mist;
      btnA.textContent = ACTION_BINDINGS.keyboard.attack;

      capD.textContent = I18N.captionsKeyboard.weapon;
      capB.textContent = I18N.captionsKeyboard.mist;
      capA.textContent = I18N.captionsKeyboard.attack;
    } else {
      btnUp.textContent = "▲";
      btnDown.textContent = "▼";
      btnLeft.textContent = "◀";
      btnRight.textContent = "▶";

      const gamepadLabel = binding => this.controlDevice === "gamepad" && this.gamepadMapping !== "standard"
        ? binding.genericLabel
        : binding.standardLabel;
      btnD.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.weapon);
      if (blastInner) blastInner.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.blast);
      btnB.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.mist);
      btnA.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.attack);

      capD.textContent = I18N.captions.weapon;
      capB.textContent = I18N.captions.mist;
      capA.textContent = I18N.captions.attack;
    }

    if (capC) {
      const baseCaption = this.controlDevice === "keyboard"
        ? I18N.captionsKeyboard.blast
        : I18N.captions.blast;
      const cur = this.player ? this.player.blastCurrentCharges : 10;
      const max = this.player ? this.player.blastMaxCharges : 10;
      capC.innerHTML = `${baseCaption} (<span id="blast-counter">${cur}/${max}</span>)`;
    }
  }

  initDungeonFloor(isMerchantTransition = false) {
    this.inMerchantFloor = isMerchantTransition;
    this.showWeaponRange = false;

    if (isMerchantTransition) {
      this.dungeon = new Dungeon(5, 5);
      this.dungeon.isMerchantRoom = true;
      this.generator = new DungeonGenerator(this.dungeon, this.floor);
    } else {
      const { width, height } = getRandomDungeonDimensions(10, 30, this.floor);
      this.dungeon = new Dungeon(width, height);
      this.dungeon.isMerchantRoom = false;
      this.generator = new DungeonGenerator(this.dungeon, this.floor);
    }

    this.megaBossEmptyTurns = 0;

    const startX = isMerchantTransition ? 2 : this.dungeon.entrance.x;
    const startY = isMerchantTransition ? 3 : this.dungeon.entrance.y;

    if (!this.player) {
      this.player = new Player(startX, startY);
    } else {
      this.player.x = startX;
      this.player.y = startY;
      this.player.direction = 0;
      this.player.mistyStepCharges = 2;
    }

    this.player.ac = this.playerAC;

    if (!this.renderer) {
      this.renderer = new Renderer(this.canvas, this.dungeon, this.player, this.generator);
    } else {
      this.renderer.player = this.player;
      this.renderer.setDungeon(this.dungeon, this.generator);
    }
    this.renderer.game = this;

    this.updateHUD();
    this.updateButtonLabels();

    if (isMerchantTransition) {
      this.log(`[MERCADER]: «${I18N.logs.merchantPeace}»`);
      setTimeout(() => {
        this.showMerchantDialog(`«${I18N.logs.merchantPeace}»`, () => {
          this.openShop();
        });
      }, 300);
    } else {
      this.log(I18N.logs.floorIntro(this.floor, this.tier, this.dungeon.width, this.dungeon.height, this.player.ac, this.hitBonus, this.dmgBonus));
    }

    this.renderer.draw();
  }

  showMerchantDialog(text, onDismiss) {
    if (!this.dialogModal) {
      if (onDismiss) onDismiss();
      return;
    }
    this.isPausedForDialog = true;
    this.dialogCallback = onDismiss;

    const dialogText = document.getElementById("dialog-text");
    if (dialogText) dialogText.textContent = text;

    this.dialogModal.classList.remove("hidden");
  }

  dismissMerchantDialog() {
    if (!this.isPausedForDialog) return;
    this.isPausedForDialog = false;
    if (this.dialogModal) this.dialogModal.classList.add("hidden");
    if (typeof this.dialogCallback === "function") {
      const cb = this.dialogCallback;
      this.dialogCallback = null;
      cb();
    }
  }

  resetGame() {
    this.floor = 1;
    this.inMerchantFloor = false;
    this.isVictory = false;
    this.isPausedForDialog = false;
    this.showWeaponRange = false;
    this.megaBossEmptyTurns = 0;

    this.deathScreen.classList.remove("visible");
    this.deathScreen.classList.add("hidden");
    this.closeShop();
    if (this.dialogModal) this.dialogModal.classList.add("hidden");

    const logBox = document.getElementById("log-entries");
    if (logBox) logBox.innerHTML = "";

    this.player = null;
    this.initDungeonFloor(false);
  }

  openShop() {
    if (!this.shopModal) return;
    this.updateShopHUD();
    this.shopModal.classList.remove("hidden");
  }

  closeShop() {
    if (!this.shopModal) return;
    this.shopModal.classList.add("hidden");
  }

  updateShopHUD() {
    const goldDisplay = document.getElementById("shop-gold-display");
    if (goldDisplay) goldDisplay.textContent = this.player.gold;
  }

  initShopEvents() {
    const btnClose = document.getElementById("close-shop");
    if (btnClose) btnClose.addEventListener("click", () => this.closeShop());

    if (this.dialogModal) {
      this.dialogModal.addEventListener("click", () => this.dismissMerchantDialog());
      this.dialogModal.addEventListener("touchstart", () => this.dismissMerchantDialog(), { passive: true });
    }

    const buyPistol = document.getElementById("buy-pistol-ammo");
    if (buyPistol) {
      buyPistol.addEventListener("click", () => {
        if (this.player.gold >= 1) {
          this.player.gold -= 1;
          this.player.ammoPistol += 6;
          this.player.unlockedWeapons.add(WEAPONS.PISTOL.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log("Compraste 6 balas de Pistola (-1 PO).");
        }
      });
    }

    const buyMusket = document.getElementById("buy-musket-ammo");
    if (buyMusket) {
      buyMusket.addEventListener("click", () => {
        if (this.player.gold >= 1) {
          this.player.gold -= 1;
          this.player.ammoMusket += 4;
          this.player.unlockedWeapons.add(WEAPONS.MUSKET.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log("Compraste 4 balas de Mosquete (-1 PO).");
        }
      });
    }

    const buyBlunderbuss = document.getElementById("buy-blunderbuss-ammo");
    if (buyBlunderbuss) {
      buyBlunderbuss.addEventListener("click", () => {
        if (this.player.gold >= 1) {
          this.player.gold -= 1;
          this.player.ammoBlunderbuss += 2;
          this.player.unlockedWeapons.add(WEAPONS.BLUNDERBUSS.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log("Compraste 2 balas de Trabuco (-1 PO).");
        }
      });
    }

    const buyPotion = document.getElementById("buy-potion");
    if (buyPotion) {
      buyPotion.addEventListener("click", () => {
        if (this.player.gold >= 2) {
          const heal = rollDie(4) + rollDie(4) + 4;
          if (this.player.hp < this.player.maxHp) {
            this.player.gold -= 2;
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
            sounds.playHeal();
            this.updateHUD();
            this.updateShopHUD();
            this.log(`Bebiste una poción: +${heal} HP (-2 PO).`);
          }
        }
      });
    }
  }

  log(message) {
    const logBox = document.getElementById("log-entries");
    if (!logBox) return;
    const entry = document.createElement("div");
    entry.textContent = `> ${message}`;
    logBox.appendChild(entry);
    const container = document.getElementById("log-container");
    if (container) container.scrollTop = 99999;
  }

  updateHUD() {
    const elFloor = document.getElementById("hud-floor");
    const elDir = document.getElementById("hud-dir");
    const elHp = document.getElementById("hud-hp");
    const elGold = document.getElementById("hud-gold");
    const elAmmo = document.getElementById("hud-ammo");
    const elWeapon = document.getElementById("hud-weapon");
    const elMisty = document.getElementById("misty-charges");

    if (elFloor) elFloor.textContent = this.inMerchantFloor ? `${this.floor} (Refugio)` : this.floor;
    if (elDir) elDir.textContent = I18N.cardinals[this.player.direction];
    if (elHp) elHp.textContent = this.player.hp;
    if (elGold) elGold.textContent = this.player.gold;
    if (elAmmo) {
      elAmmo.textContent = `P:${this.player.ammoPistol} | M:${this.player.ammoMusket} | T:${this.player.ammoBlunderbuss}`;
    }
    if (elWeapon) elWeapon.textContent = this.player.equippedWeapon.name;
    if (elMisty) elMisty.textContent = this.player.mistyStepCharges;

    const doorEl = document.getElementById("hud-door");
    if (doorEl) {
      const enemiesRemain = this.dungeon.enemies.length > 0;
      if (enemiesRemain) {
        doorEl.textContent = I18N.doorLocked(this.dungeon.enemies.length);
        doorEl.className = "door-locked";
      } else {
        doorEl.textContent = I18N.doorOpen;
        doorEl.className = "door-open";
      }
    }

    const attackBtn = document.getElementById("btn-a");
    if (attackBtn) {
      attackBtn.disabled = this.inMerchantFloor || this.player.hp <= 0;
    }

    const mistyBtn = document.getElementById("btn-b");
    if (mistyBtn) mistyBtn.disabled = this.player.mistyStepCharges <= 0 || this.player.hp <= 0;

    const blastBtn = document.getElementById("btn-c");
    const blastCounter = document.getElementById("blast-counter");
    if (blastBtn) {
      const chargePct = Math.min(100, Math.floor((this.player.blastCurrentCharges / this.player.blastMaxCharges) * 100));
      blastBtn.style.setProperty("--charge-pct", chargePct);

      if (this.player.isBlastReady()) {
        blastBtn.classList.remove("btn-charging");
        blastBtn.classList.add("btn-ready");
        blastBtn.disabled = this.inMerchantFloor || this.player.hp <= 0;
      } else {
        blastBtn.classList.remove("btn-ready");
        blastBtn.classList.add("btn-charging");
        blastBtn.disabled = true;
      }
    }

    if (blastCounter) {
      blastCounter.textContent = `${this.player.blastCurrentCharges}/${this.player.blastMaxCharges}`;
    }

    const weaponBtn = document.getElementById("btn-d");
    if (weaponBtn) weaponBtn.disabled = this.player.unlockedWeapons.size <= 1 || this.player.hp <= 0;
  }

  spawnMegaBossAdds(megaBoss) {
    const addsToSpawn = rollDie(Math.min(5, Math.max(1, Math.floor(this.floor / 20) + 1)));
    this.log(`[Mega Boss] +${addsToSpawn} reinforcements!`);
    let spawned = 0;

    for (let dy = -3; dy <= 6 && spawned < addsToSpawn; dy++) {
      for (let dx = -3; dx <= 6 && spawned < addsToSpawn; dx++) {
        const sx = megaBoss.x + dx;
        const sy = megaBoss.y + dy;

        if (!this.dungeon.isInsideBounds(sx, sy)) continue;
        if (this.dungeon.getTile(sx, sy) === TILE_WALL) continue;
        if (sx === this.player.x && sy === this.player.y) continue;

        const isOccupied = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === sx && c.y === sy));
        if (isOccupied) continue;

        const shadowHp = 2 + Math.floor((this.tier - 1) / 2);
        this.dungeon.enemies.push({
          id: Math.random().toString(36).substring(2, 9),
          x: sx, y: sy,
          startX: sx, startY: sy,
          name: IS_SPANISH ? "Sombra Invocada" : "Summoned Shadow",
          hp: shadowHp,
          maxHp: shadowHp,
          ac: 8 + this.tier,
          visionRange: 3,
          attackRange: 1,
          isMegaBoss: false,
          isBoss: false,
          size: 1,
          cells: [{ x: sx, y: sy }],
          fearCooldown: 0
        });
        spawned++;
      }
    }
  }

  triggerGameOver() {
    sounds.playDeath();
    this.log(I18N.logs.deadPlayer);

    setTimeout(() => {
      const stats = document.getElementById("death-stats-display");
      const title = document.querySelector(".death-title");
      const desc = document.querySelector(".death-desc");
      const btn = document.getElementById("btn-restart-game");

      if (title) title.textContent = I18N.death.title;
      if (desc) desc.textContent = I18N.death.desc;
      if (btn) btn.textContent = I18N.death.btn;
      if (stats) stats.innerHTML = I18N.death.stats(this.floor, this.player.kills, this.player.gold);

      this.deathScreen.classList.remove("hidden");
      this.deathScreen.classList.add("visible");
    }, 500);
  }

  startVictorySequence() {
    this.isVictory = true;
    document.getElementById("control-dock").style.display = "none";
    document.getElementById("hud").style.display = "none";

    this.renderer.isVictorySequence = true;
    this.renderer.victoryStep = 0;
    this.renderer.draw();

    let steps = 0;
    const walkInterval = setInterval(() => {
      steps++;
      this.renderer.victoryStep = steps;
      sounds.playStep();
      this.renderer.draw();

      if (steps >= 6) {
        clearInterval(walkInterval);
        setTimeout(() => {
          const title = document.querySelector(".victory-title");
          const desc = document.querySelector(".victory-desc");
          const stats = document.getElementById("victory-stats-display");
          const btn = document.querySelector(".victory-restart-btn");

          if (title) title.textContent = I18N.victory.title;
          if (desc) desc.innerHTML = I18N.victory.desc;
          if (stats) stats.innerHTML = I18N.victory.stats(this.player.kills, this.player.gold);
          if (btn) btn.textContent = I18N.victory.btn;

          this.victoryScreen.classList.remove("hidden");
          this.victoryScreen.classList.add("visible");
          sounds.playLogoJingle();
        }, 800);
      }
    }, 400);
  }

  castMistyStep() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.mistyStepCharges <= 0 || this.player.hp <= 0) return;

    this.player.advanceAction();
    sounds.playMisty();
    this.player.mistyStepCharges--;

    const dirVec = DIR_VECTORS[this.player.direction];
    let targetX = this.player.x;
    let targetY = this.player.y;
    let foundOpenTile = false;
    let encounteredObstacle = false;

    for (let step = 1; step <= 8; step++) {
      const cx = this.player.x + dirVec.x * step;
      const cy = this.player.y + dirVec.y * step;

      if (!this.dungeon.isInsideBounds(cx, cy)) {
        this.player.hp = 0;
        this.updateHUD();
        this.renderer.draw();
        this.triggerGameOver();
        return;
      }

      const tile = this.dungeon.getTile(cx, cy);
      if (tile === TILE_WALL) {
        encounteredObstacle = true;
      } else if (encounteredObstacle && (tile === TILE_FLOOR || tile === TILE_CHEST)) {
        targetX = cx;
        targetY = cy;
        foundOpenTile = true;
        break;
      }
    }

    if (foundOpenTile) {
      this.player.x = targetX;
      this.player.y = targetY;
    } else {
      const freeStep = this.player.getNextForwardPos(3);
      const freeStepTile = this.dungeon.getTile(freeStep.x, freeStep.y);
      if (this.dungeon.isInsideBounds(freeStep.x, freeStep.y)
        && (freeStepTile === TILE_FLOOR || freeStepTile === TILE_CHEST)) {
        this.player.x = freeStep.x;
        this.player.y = freeStep.y;
      }
    }

    this.renderer.playMistyStep();
    this.handleTileInteractions();
    this.updateHUD();
  }

  castEldritchBlast() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;

    if (this.inMerchantFloor) {
      this.log(I18N.logs.merchantNoAttack);
      return;
    }

    if (!this.player.isBlastReady()) {
      const remaining = this.player.blastMaxCharges - this.player.blastCurrentCharges;
      this.log(I18N.logs.blastCharging(remaining));
      return;
    }

    const dirVec = DIR_VECTORS[this.player.direction];
    let hitEnemy = null;
    let hitDistance = 0;

    for (let dist = 1; dist <= 8; dist++) {
      const targetX = this.player.x + dirVec.x * dist;
      const targetY = this.player.y + dirVec.y * dist;

      if (!this.dungeon.isInsideBounds(targetX, targetY) || this.dungeon.getTile(targetX, targetY) === TILE_WALL) {
        break;
      }

      const enemyAtCell = this.dungeon.enemies.find(e => e.cells && e.cells.some(c => c.x === targetX && c.y === targetY));
      if (enemyAtCell) {
        hitEnemy = enemyAtCell;
        hitDistance = dist;
        break;
      }
    }

    sounds.playEldritchBlast();
    this.player.blastCurrentCharges = 0;
    this.renderer.playEldritchBlastAnimation(hitDistance || 3);

    let deadMiniBosses = [];

    if (hitEnemy) {
      // Daño fijo establecido exactamente en 11 puntos, sin modificadores
      const blastDamage = 11;
      hitEnemy.hp -= blastDamage;
      this.log(I18N.logs.blastFired(hitEnemy.name, blastDamage));

      if (hitEnemy.hp <= 0) {
        sounds.playCoin();
        this.player.kills++;
        let goldDrop = hitEnemy.isMegaBoss ? 10 : (hitEnemy.isBoss ? rollDie(3) : 1);
        this.player.gold += goldDrop;
        this.log(`+${goldDrop} PO (${hitEnemy.name})`);

        if (hitEnemy.isBoss && !hitEnemy.isMegaBoss) deadMiniBosses.push(hitEnemy);
        this.dungeon.enemies = this.dungeon.enemies.filter(e => e.id !== hitEnemy.id);
      }
    } else {
      this.log(I18N.logs.blastWhiff);
    }

    if (deadMiniBosses.length > 0) {
      deadMiniBosses.forEach(mb => {
        dungeon.enemies.forEach(other => {
          if (!other.isBoss) {
            if (Math.hypot(other.x - mb.x, other.y - mb.y) <= 2.2) {
              other.fearCooldown = 2;
            }
          }
        });
      });
      this.log(I18N.logs.panic);
    }

    this.processEnemiesTurn();
    this.updateHUD();
    this.renderer.draw();
  }

  cycleWeapon() {
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.player.unlockedWeapons.size < 2) return;
    this.player.cycleWeapon();
    this.showWeaponRange = true;
    this.renderer.playWeaponChange();
    sounds.playStep();
    this.updateHUD();
    this.renderer.draw();
  }

  turnLeft() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    this.player.advanceAction();
    this.player.turnLeft();
    sounds.playStep();
    this.updateHUD();
    this.renderer.draw();
  }

  turnRight() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    this.player.advanceAction();
    this.player.turnRight();
    sounds.playStep();
    this.updateHUD();
    this.renderer.draw();
  }

  moveGoldenBunny(bunny) {
    const seesPlayer = VisibilitySystem.hasWorldLineOfSight(
      bunny.x, bunny.y, this.player.x, this.player.y, this.dungeon
    );
    if (!seesPlayer) {
      bunny.isFleeing = false;
      return;
    }

    bunny.isFleeing = true;
    bunny.fleeStartedAt = performance.now();
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 }
    ].sort((a, b) => {
      const distanceA = Math.hypot(bunny.x + a.dx - this.player.x, bunny.y + a.dy - this.player.y);
      const distanceB = Math.hypot(bunny.x + b.dx - this.player.x, bunny.y + b.dy - this.player.y);
      return distanceB - distanceA;
    });

    for (const direction of directions) {
      const x = bunny.x + direction.dx;
      const y = bunny.y + direction.dy;
      if (!this.dungeon.isInsideBounds(x, y) || this.dungeon.getTile(x, y) !== TILE_FLOOR) continue;
      if (x === this.player.x && y === this.player.y) continue;
      if (this.dungeon.enemies.some(enemy => enemy.cells.some(cell => cell.x === x && cell.y === y))) continue;
      if (this.dungeon.npcs.some(other => other !== bunny && other.x === x && other.y === y)) continue;

      bunny.x = x;
      bunny.y = y;
      bunny.fleeDirection = direction;
      return;
    }
  }

  processEnemiesTurn() {
    if (this.player.hp <= 0 || this.isVictory || this.inMerchantFloor) return;

    const megaBoss = this.dungeon.enemies.find(e => e.isMegaBoss);
    if (megaBoss) {
      const otherEnemiesCount = this.dungeon.enemies.filter(e => !e.isMegaBoss).length;
      if (otherEnemiesCount === 0) {
        this.megaBossEmptyTurns++;
        if (this.megaBossEmptyTurns > 1) {
          this.spawnMegaBossAdds(megaBoss);
          this.megaBossEmptyTurns = 0;
        }
      } else {
        this.megaBossEmptyTurns = 0;
      }
    }

    const miniBosses = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss);
    const enemySnapshot = [...this.dungeon.enemies];

    enemySnapshot.forEach(enemy => {
      if (this.player.hp <= 0) return;
      if (!this.dungeon.enemies.includes(enemy) || !enemy.cells || enemy.cells.length === 0) return;

      if (enemy.fearCooldown > 0) enemy.fearCooldown--;

      const distToPlayer = CombatSystem.getMinDistToPlayer(this.player, enemy);
      const hasLOS = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);

      if (hasLOS && distToPlayer <= enemy.attackRange && enemy.fearCooldown === 0) {
        const eD20 = rollDie(20);
        const hitMod = this.hitBonus;
        const dmgMod = this.dmgBonus;
        const totalAtk = eD20 + hitMod;

        if (totalAtk >= this.player.ac) {
          sounds.playHurt();
          const baseDmg = enemy.isMegaBoss ? (rollDie(6) + 2) : (enemy.isBoss ? rollDie(4) + 1 : rollDie(2));
          const totalDmg = baseDmg + dmgMod;
          this.player.hp = Math.max(0, this.player.hp - totalDmg);
          this.log(`> [${enemy.name}] HIT [${totalAtk} vs CA ${this.player.ac}] -${totalDmg} HP.`);
        }
        return;
      }

      let mode = "patrol";
      if (enemy.fearCooldown > 0) {
        mode = "flee";
      } else if (enemy.isBoss) {
        if (distToPlayer <= enemy.visionRange) mode = "chase";
      } else {
        const escortingMiniBoss = miniBosses.find(mb => Math.hypot(mb.x - enemy.x, mb.y - enemy.y) <= 1.8);
        if (escortingMiniBoss && Math.hypot(escortingMiniBoss.x - this.player.x, escortingMiniBoss.y - this.player.y) <= escortingMiniBoss.visionRange) {
          mode = "chase";
        } else if (distToPlayer <= enemy.visionRange) {
          const hasAlly = this.dungeon.enemies.some(o => o !== enemy && o.cells && Math.hypot(o.x - enemy.x, o.y - enemy.y) <= 2.2);
          mode = hasAlly ? "chase" : "flee";
        }
      }

      const directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];

      if (mode === "flee") {
        directions.sort((a, b) => {
          const dA = Math.hypot((enemy.x + a.dx) - this.player.x, (enemy.y + a.dy) - this.player.y);
          const dB = Math.hypot((enemy.x + b.dx) - this.player.x, (enemy.y + b.dy) - this.player.y);
          return dB - dA;
        });
      } else if (mode === "chase") {
        directions.sort((a, b) => {
          const dA = Math.hypot((enemy.x + a.dx) - this.player.x, (enemy.y + a.dy) - this.player.y);
          const dB = Math.hypot((enemy.x + b.dx) - this.player.x, (enemy.y + b.dy) - this.player.y);
          return dA - dB;
        });
      } else {
        directions.sort(() => Math.random() - 0.5);
      }

      for (const dir of directions) {
        const candidateCells = enemy.cells.map(c => ({ x: c.x + dir.dx, y: c.y + dir.dy }));
        const isValid = candidateCells.every(c => {
          if (!this.dungeon.isInsideBounds(c.x, c.y)) return false;
          if (this.dungeon.getTile(c.x, c.y) === TILE_WALL) return false;
          if (c.x === this.player.x && c.y === this.player.y) return false;
          return true;
        });

        if (!isValid) continue;

        const collidesWithOther = this.dungeon.enemies.some(other => {
          if (other === enemy || !other.cells) return false;
          return other.cells.some(oc => candidateCells.some(nc => nc.x === oc.x && nc.y === oc.y));
        });

        if (!collidesWithOther) {
          enemy.x += dir.dx;
          enemy.y += dir.dy;
          enemy.cells = candidateCells;
          break;
        }
      }
    });

    if (this.player.hp > 0) {
      this.dungeon.npcs.forEach(npc => {
        if (!npc.isMerchant) this.moveGoldenBunny(npc);
      });
    }
    if (this.player.hp <= 0) this.triggerGameOver();
  }

  moveForward() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;

    const next = this.player.getNextForwardPos(1);
    if (!this.dungeon.isInsideBounds(next.x, next.y)) {
      this.log(I18N.logs.outOfBounds);
      return;
    }
    if (this.dungeon.getTile(next.x, next.y) === TILE_WALL) {
      this.log(I18N.logs.wallFront);
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === next.x && c.y === next.y));
    if (enemyBlocking) {
      this.log(I18N.logs.enemyBlock);
      return;
    }

    const merchant = this.dungeon.npcs.find(npc => npc.isMerchant && npc.x === next.x && npc.y === next.y);
    if (merchant) {
      this.showMerchantDialog(`«${I18N.logs.merchantPeace}»`, () => {
        this.openShop();
      });
      return;
    }

    this.player.advanceAction();
    this.player.moveForward();
    sounds.playStep();

    this.checkGoldenBunnyCapture();
    this.processEnemiesTurn();
    this.handleTileInteractions();
    this.renderer.draw();
  }

  moveBackward() {
    this.showWeaponRange = false;
    if (this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;

    const prev = this.player.getNextBackwardPos();
    if (!this.dungeon.isInsideBounds(prev.x, prev.y)) {
      this.log(I18N.logs.backOutOfBounds);
      return;
    }
    if (this.dungeon.getTile(prev.x, prev.y) === TILE_WALL) {
      this.log(I18N.logs.wallBack);
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === prev.x && c.y === prev.y));
    if (enemyBlocking) {
      this.log(I18N.logs.enemyBlockBack);
      return;
    }

    const merchant = this.dungeon.npcs.find(npc => npc.isMerchant && npc.x === prev.x && npc.y === prev.y);
    if (merchant) {
      this.showMerchantDialog(`«${I18N.logs.merchantPeace}»`, () => {
        this.openShop();
      });
      return;
    }

    this.player.advanceAction();
    this.player.moveBackward();
    sounds.playStep();
    this.checkGoldenBunnyCapture();
    this.processEnemiesTurn();
    this.handleTileInteractions();
    this.renderer.draw();
  }

  openChest() {
    const chestKey = this.dungeon.getKey(this.player.x, this.player.y);
    if (!this.dungeon.chests.has(chestKey)) return;

    this.dungeon.chests.delete(chestKey);
    this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    this.renderer.playChestOpening(this.player.x, this.player.y);
    sounds.playCoin();

    if (Math.random() < 0.5) {
      const healing = rollDie(4) + rollDie(4) + 4;
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + healing);
      sounds.playHeal();
      this.renderer.playDrinkPotion();
      this.log(I18N.logs.chestPotion(healing));
    } else {
      const weaponOptions = [WEAPONS.PISTOL, WEAPONS.MUSKET, WEAPONS.BLUNDERBUSS];
      const weapon = weaponOptions[Math.floor(Math.random() * weaponOptions.length)];
      const ammoDice = { pistol: 6, musket: 4, blunderbuss: 2 }[weapon.id];
      const ammo = rollDie(ammoDice);
      const isNewWeapon = !this.player.unlockedWeapons.has(weapon.id);
      this.player.unlockedWeapons.add(weapon.id);
      this.player[weapon.ammoProperty] += ammo;

      if (isNewWeapon) {
        this.player.equippedWeapon = weapon;
        this.renderer.playWeaponChange();
        this.log(I18N.logs.chestWeapon(weapon.name, ammo));
      } else {
        this.log(I18N.logs.chestAmmo(weapon.name, ammo));
      }
    }

    this.updateHUD();
  }

  checkGoldenBunnyCapture() {
    const bunnyIndex = this.dungeon.npcs.findIndex(
      npc => npc.id === "golden-bunny" && npc.x === this.player.x && npc.y === this.player.y
    );

    if (bunnyIndex !== -1) {
      this.dungeon.npcs.splice(bunnyIndex, 1);
      this.player.gold += 5;
      sounds.playCoin();
      this.log(I18N.logs.bunnyCaught);
      this.updateHUD();
      return true;
    }
    return false;
  }

  handleTileInteractions() {
    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_CHEST) {
      this.openChest();
    }

    this.checkGoldenBunnyCapture();
    this.updateHUD();

    if (this.player.x === this.dungeon.exit.x && this.player.y === this.dungeon.exit.y) {
      if (this.dungeon.enemies.length > 0) {
        this.log(I18N.logs.exitLocked(this.dungeon.enemies.length));
      } else {
        if (this.floor >= 100) {
          this.startVictorySequence();
          return;
        }

        sounds.playCoin();
        this.log(I18N.logs.exitDescend);

        if (this.inMerchantFloor) {
          this.floor++;
          setTimeout(() => this.initDungeonFloor(false), 500);
        } else {
          setTimeout(() => this.initDungeonFloor(true), 500);
        }
        return;
      }
    }

    this.renderer.draw();
  }

  bindEvents() {
    document.getElementById("btn-forward").addEventListener("click", () => this.moveForward());
    document.getElementById("btn-left").addEventListener("click", () => this.turnLeft());
    document.getElementById("btn-right").addEventListener("click", () => this.turnRight());
    document.getElementById("btn-backward").addEventListener("click", () => this.moveBackward());

    document.getElementById("btn-d").addEventListener("click", () => this.cycleWeapon());
    document.getElementById("btn-c").addEventListener("click", () => this.castEldritchBlast());
    document.getElementById("btn-b").addEventListener("click", () => this.castMistyStep());
    document.getElementById("btn-a").addEventListener("click", () => {
      CombatSystem.executeAttack(this);
    });

    const restartBtn = document.getElementById("btn-restart-game");
    if (restartBtn) restartBtn.addEventListener("click", () => this.resetGame());

    window.addEventListener("keydown", (e) => {
      if (this.isVictory) return;

      if (this.isPausedForDialog) {
        if (["Enter", " ", "Escape"].includes(e.key)) {
          this.dismissMerchantDialog();
        }
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          this.turnLeft();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.turnRight();
          break;
        case "ArrowUp":
        case "w":
        case "W":
          this.moveForward();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.moveBackward();
          break;
        case "k":
        case "K":
        case " ":
          CombatSystem.executeAttack(this);
          break;
        case "l":
        case "L":
          this.castMistyStep();
          break;
        case "j":
        case "J":
          this.castEldritchBlast();
          break;
        case "i":
        case "I":
          this.cycleWeapon();
          break;
        case "Escape":
          this.closeShop();
          break;
      }
    });
  }

  startGamepadLoop() {
    this.lastGamepadAxes = { x: 0, y: 0 };
    this.lastGamepadButtons = [];

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      let gp = null;
      for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) { gp = gamepads[i]; break; }
      }

      if (gp && !this.isVictory) {
        const mapping = gp.mapping || "";
        if (mapping !== this.gamepadMapping) {
          this.gamepadMapping = mapping;
          if (this.controlDevice === "gamepad") this.updateButtonLabels();
        }
        if (this.controlDevice !== "gamepad") this.setControlDevice("gamepad");

        const axisX = gp.axes[0] || 0;
        const axisY = gp.axes[1] || 0;
        const dpadUp = gp.buttons[12] && gp.buttons[12].pressed;
        const dpadDown = gp.buttons[13] && gp.buttons[13].pressed;
        const dpadLeft = gp.buttons[14] && gp.buttons[14].pressed;
        const dpadRight = gp.buttons[15] && gp.buttons[15].pressed;

        const threshold = 0.5;
        const btnStates = gp.buttons.map(b => b.pressed);

        if (this.isPausedForDialog) {
          if (btnStates.some((pressed, idx) => pressed && !this.lastGamepadButtons[idx])) {
            this.dismissMerchantDialog();
          }
        } else {
          if ((axisY < -threshold || dpadUp) && this.lastGamepadAxes.y >= -threshold) this.moveForward();
          else if ((axisY > threshold || dpadDown) && this.lastGamepadAxes.y <= threshold) this.moveBackward();
          else if ((axisX < -threshold || dpadLeft) && this.lastGamepadAxes.x >= -threshold) this.turnLeft();
          else if ((axisX > threshold || dpadRight) && this.lastGamepadAxes.x <= threshold) this.turnRight();

          const gamepadActions = ACTION_BINDINGS.gamepad;
          if (btnStates[gamepadActions.attack.index] && !this.lastGamepadButtons[gamepadActions.attack.index]) {
            CombatSystem.executeAttack(this);
          }
          if (btnStates[gamepadActions.mist.index] && !this.lastGamepadButtons[gamepadActions.mist.index]) {
            this.castMistyStep();
          }
          if (btnStates[gamepadActions.blast.index] && !this.lastGamepadButtons[gamepadActions.blast.index]) {
            this.castEldritchBlast();
          }
          if (btnStates[gamepadActions.weapon.index] && !this.lastGamepadButtons[gamepadActions.weapon.index]) {
            this.cycleWeapon();
          }
        }

        this.lastGamepadAxes.x = (axisX < -threshold || dpadLeft) ? -1 : (axisX > threshold || dpadRight ? 1 : 0);
        this.lastGamepadAxes.y = (axisY < -threshold || dpadUp) ? -1 : (axisY > threshold || dpadDown ? 1 : 0);
        this.lastGamepadButtons = btnStates;
      }
      requestAnimationFrame(pollGamepad);
    };
    requestAnimationFrame(pollGamepad);
  }
}

// INITIUM CUM VELO APERIENTI
window.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const introVideo = document.getElementById("intro-video");
  const splashLogo = splashScreen?.querySelector(".splash-logo");
  const skipIntro = document.getElementById("skip-intro");
  let gameStarted = false;
  let fallbackTimer;

  if (sessionStorage.getItem("lior_intro_played")) {
    if (splashScreen) splashScreen.style.display = "none";
    new GameController();
    return;
  }

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    clearTimeout(fallbackTimer);
    introVideo?.pause();
    sessionStorage.setItem("lior_intro_played", "true");

    if (splashScreen) {
      splashScreen.classList.add("fade-out");
      setTimeout(() => {
        splashScreen.style.display = "none";
        new GameController();
      }, 300);
    } else {
      new GameController();
    }
  }

  function showLogoFallback() {
    if (gameStarted || !splashLogo) return;
    introVideo?.classList.add("hidden");
    splashLogo.classList.remove("hidden");
    fallbackTimer = setTimeout(startGame, 1200);
  }

  if (splashScreen) {
    if (introVideo && splashLogo) {
      splashLogo.classList.add("hidden");
      introVideo.addEventListener("ended", startGame, { once: true });
      introVideo.addEventListener("error", showLogoFallback, { once: true });
      introVideo.addEventListener("canplay", () => clearTimeout(fallbackTimer), { once: true });
      fallbackTimer = setTimeout(showLogoFallback, 10000);
      introVideo.play().catch(showLogoFallback);
    }

    splashScreen.addEventListener("click", startGame);
    splashScreen.addEventListener("touchstart", startGame, { passive: true });
  }

  skipIntro?.addEventListener("click", (event) => {
    event.stopPropagation();
    startGame();
  });
});