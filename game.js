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
    musket: IS_SPANISH ? "Mosquete" : "Musket"
  },
  weaponLabels: {
    sword: IS_SPANISH ? "Espada (área c/c 1.5)" : "Longsword (1.5 AoE)",
    pistol: IS_SPANISH ? "Pistola (frente 3x3)" : "Pistol (front 3x3)",
    musket: IS_SPANISH ? "Mosquete (frente 5x3)" : "Musket (front 5x3)"
  },
  captions: {
    weapon: IS_SPANISH ? "ARMA" : "WEAPON",
    heal: IS_SPANISH ? "CURAR" : "HEAL",
    mist: IS_SPANISH ? "BRUMA" : "MIST",
    attack: IS_SPANISH ? "ATACAR" : "ATTACK"
  },
  captionsKeyboard: {
    weapon: IS_SPANISH ? "ARMA (I)" : "WEAPON (I)",
    heal: IS_SPANISH ? "CURAR (L)" : "HEAL (L)",
    mist: IS_SPANISH ? "BRUMA (K)" : "MIST (K)",
    attack: IS_SPANISH ? "ATACAR (J)" : "ATTACK (J)"
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
    noAmmoPistol: IS_SPANISH ? "¡Sin balas de Pistola! Cambia de arma." : "Out of Pistol ammo! Switch weapons.",
    noAmmoMusket: IS_SPANISH ? "¡Sin balas de Mosquete! Cambia de arma." : "Out of Musket ammo! Switch weapons.",
    swordWhiff: IS_SPANISH ? "Blandes tu espada en círculo, pero no hay enemigos al alcance." : "You swing your sword in an arc, but no enemies are near.",
    shotWhiff: (weapon) => IS_SPANISH ? `Disparas tu ${weapon}... pero la bala se pierde sin impactar.` : `You fire your ${weapon}... but the shot finds no target.`,
    panic: IS_SPANISH ? "¡El líder cayó! Los esbirros cercanos entran en pánico y huyen." : "The leader fell! Nearby minions panic and flee.",
    deadPlayer: IS_SPANISH ? "Lior ha caído en combate. Fin de la partida." : "Lior has fallen in battle. Game Over.",
    layUsed: IS_SPANISH ? "Manos Curativas ya fue usado en este piso." : "Lay on Hands was already used on this floor.",
    layHealed: IS_SPANISH ? "Manos Curativas: +6 HP restaurados." : "Lay on Hands: +6 HP restored.",
    fountain: (hp) => IS_SPANISH ? `Santuario de vida: +${hp} HP restaurados.` : `Fountain of life: +${hp} HP restored.`,
    shopEnter: IS_SPANISH ? "Entraste a la tienda del Mercader de Sombras." : "You entered the Shadow Merchant shop.",
    exitLocked: (cnt) => IS_SPANISH ? `¡La puerta está sellada! Elimina a las ${cnt} amenazas restantes.` : `The gate is sealed! Slay the remaining ${cnt} threats.`,
    exitDescend: IS_SPANISH ? "¡Piso purificado! Descendiendo al siguiente nivel..." : "Floor purified! Descending to the next floor...",
    floorIntro: (floor, tier, w, h, ac, hit, dmg) => IS_SPANISH
      ? `Piso ${floor} (Tier ${tier}): ${w}x${h}. CA Lior: ${ac}, Impacto: +${hit}, Daño: +${dmg}.`
      : `Floor ${floor} (Tier ${tier}): ${w}x${h}. Lior AC: ${ac}, Hit bonus: +${hit}, Flat Dmg: +${dmg}.`
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
const TILE_HEAL_FOUNTAIN = 4;
const TILE_SHOP = 5;

const CAMERA_CONFIG = {
  cols: 7,
  rows: 12,
  tileSize: 42,
  playerScreenX: 3,
  playerScreenY: 10
};

const WEAPONS = {
  SWORD: {
    id: "sword",
    name: I18N.weaponNames.sword,
    label: I18N.weaponLabels.sword,
    minDmg: 1,
    maxDmg: 2,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },
  PISTOL: {
    id: "pistol",
    name: I18N.weaponNames.pistol,
    label: I18N.weaponLabels.pistol,
    minDmg: 1,
    maxDmg: 4,
    range: 3,
    isMelee: false,
    ammoType: "pistol"
  },
  MUSKET: {
    id: "musket",
    name: I18N.weaponNames.musket,
    label: I18N.weaponLabels.musket,
    minDmg: 1,
    maxDmg: 6,
    range: 5,
    isMelee: false,
    ammoType: "musket"
  }
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getRandomDungeonDimensions(min = 10, max = 30, floorNumber = 1) {
  if (floorNumber % 10 === 0) {
    const arenaTier = Math.min(5, Math.floor(floorNumber / 10));
    return { width: 20 + arenaTier * 2, height: 14 + arenaTier * 2 };
  }
  const w = Math.floor(Math.random() * (max - min + 1)) + min;
  let h = Math.floor(Math.random() * (max - min + 1)) + min;
  while (h === w) {
    h = Math.floor(Math.random() * (max - min + 1)) + min;
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

  hasTile(x, y) {
    return this.tiles.has(this.getKey(x, y));
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

    this.ammoPistol = 10;
    this.ammoMusket = 4;
    this.equippedWeapon = WEAPONS.SWORD;

    this.mistyStepCharges = 2;
    this.hasUsedLayOnHands = false;
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
    if (this.equippedWeapon === WEAPONS.SWORD) this.equippedWeapon = WEAPONS.PISTOL;
    else if (this.equippedWeapon === WEAPONS.PISTOL) this.equippedWeapon = WEAPONS.MUSKET;
    else this.equippedWeapon = WEAPONS.SWORD;
  }

  useLayOnHands() {
    if (this.hasUsedLayOnHands || this.hp >= this.maxHp) return false;
    this.hp = Math.min(this.maxHp, this.hp + 6);
    this.hasUsedLayOnHands = true;
    return true;
  }
}

class DungeonGenerator {
  constructor(dungeon, floorNumber = 1) {
    this.dungeon = dungeon;
    this.floorNumber = floorNumber;
    this.tier = Math.min(10, Math.floor((this.floorNumber - 1) / 10) + 1);

    const area = dungeon.width * dungeon.height;
    this.totalEnemies = Math.max(2, Math.floor(area / 20));

    for (let y = 0; y < dungeon.height; y++) {
      for (let x = 0; x < dungeon.width; x++) {
        this.generateTile(x, y);
      }
    }

    this.populateEnemies();
    this.placeSpecialTiles();
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

        this.dungeon.enemies.push({
          id: Math.random().toString(36).substring(2, 9),
          x: mx, y: my,
          startX: mx, startY: my,
          name: "MEGA BOSS (4x4)",
          hp: 20, maxHp: 20,
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
          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: IS_SPANISH ? "Minijefe (2x2)" : "Mini Boss (2x2)",
            hp: 8, maxHp: 8,
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
          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: IS_SPANISH ? "Sombra Hostil" : "Hostile Shadow",
            hp: 2, maxHp: 2,
            ac: 8 + this.tier,
            visionRange: 2,
            attackRange: 1,
            isMegaBoss: false,
            isBoss: false,
            size: 1,
            cells: candidateCells,
            fearCooldown: 0
          });
          sequenceCounter++;
        }
        placed = true;
      }
    }
  }

  placeSpecialTiles() {
    const miniBosses = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss);
    const targetShops = Math.max(1, Math.floor(miniBosses.length / 3));
    const placedShopPositions = [];

    for (let i = 0; i < targetShops; i++) {
      const anchor = miniBosses.length > 0 ? miniBosses[i % miniBosses.length] : null;
      let placed = false;

      for (let attempts = 0; attempts < 600 && !placed; attempts++) {
        let sx, sy;
        if (anchor) {
          const ox = Math.floor(Math.random() * 11) - 5;
          const oy = Math.floor(Math.random() * 11) - 5;
          if (Math.hypot(ox, oy) > 5.0) continue;
          sx = anchor.startX + ox;
          sy = anchor.startY + oy;
        } else {
          sx = Math.floor(Math.random() * (this.dungeon.width - 2)) + 1;
          sy = Math.floor(Math.random() * (this.dungeon.height - 2)) + 1;
        }

        if (!this.dungeon.isInsideBounds(sx, sy)) continue;
        if (Math.hypot(sx - this.dungeon.entrance.x, sy - this.dungeon.entrance.y) <= 3) continue;
        if (Math.hypot(sx - this.dungeon.exit.x, sy - this.dungeon.exit.y) <= 2) continue;
        if (this.dungeon.getTile(sx, sy) === TILE_WALL) continue;
        if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === sx && c.y === sy))) continue;

        const tooClose = placedShopPositions.some(p => Math.hypot(sx - p.x, sy - p.y) < 3.0);
        if (tooClose) continue;

        this.dungeon.setTile(sx, sy, TILE_SHOP);
        placedShopPositions.push({ x: sx, y: sy });
        placed = true;
      }
    }

    const targetHeals = Math.floor(this.dungeon.enemies.length / 5);
    const placedHealPositions = [];

    for (let attempts = 0; attempts < 1500 && placedHealPositions.length < targetHeals; attempts++) {
      const hx = Math.floor(Math.random() * (this.dungeon.width - 2)) + 1;
      const hy = Math.floor(Math.random() * (this.dungeon.height - 2)) + 1;

      if (Math.hypot(hx - this.dungeon.entrance.x, hy - this.dungeon.entrance.y) <= 3) continue;
      if (Math.hypot(hx - this.dungeon.exit.x, hy - this.dungeon.exit.y) <= 2) continue;
      if (this.dungeon.getTile(hx, hy) === TILE_SHOP) continue;
      if (this.dungeon.getTile(hx, hy) === TILE_WALL) continue;
      if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === hx && c.y === hy))) continue;

      const tooClose = placedHealPositions.some(p => Math.hypot(hx - p.x, hy - p.y) < 5.0);
      if (tooClose) continue;

      this.dungeon.setTile(hx, hy, TILE_HEAL_FOUNTAIN);
      placedHealPositions.push({ x: hx, y: hy });
    }
  }
}

class CameraTransformer {
  static screenToWorld(screenX, screenY, player) {
    const lateralOffset = screenX - CAMERA_CONFIG.playerScreenX;
    const forwardOffset = -(screenY - CAMERA_CONFIG.playerScreenY);

    let worldX = player.x;
    let worldY = player.y;

    switch (player.direction) {
      case 0: worldX += lateralOffset; worldY -= forwardOffset; break;
      case 1: worldX += forwardOffset; worldY += lateralOffset; break;
      case 2: worldX -= lateralOffset; worldY += forwardOffset; break;
      case 3: worldX -= forwardOffset; worldY -= lateralOffset; break;
    }

    return { x: worldX, y: worldY };
  }

  static worldToScreen(worldX, worldY, player) {
    const dx = worldX - player.x;
    const dy = worldY - player.y;
    let forwardOffset = 0;
    let lateralOffset = 0;

    switch (player.direction) {
      case 0: forwardOffset = -dy; lateralOffset = dx; break;
      case 1: forwardOffset = dx; lateralOffset = dy; break;
      case 2: forwardOffset = dy; lateralOffset = -dx; break;
      case 3: forwardOffset = -dx; lateralOffset = -dy; break;
    }

    const screenX = CAMERA_CONFIG.playerScreenX + lateralOffset;
    const screenY = CAMERA_CONFIG.playerScreenY - forwardOffset;
    return { screenX, screenY };
  }
}

/**
 * SISTEMA DE VISIBILIDAD (BRESENHAM CON TOPE DE SEGURIDAD)
 */
class VisibilitySystem {
  static hasLineOfSight(screenX0, screenY0, screenX1, screenY1, dungeon, player) {
    let x0 = screenX0;
    let y0 = screenY0;
    const x1 = screenX1;
    const y1 = screenY1;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    const maxSteps = dx + dy + 2;
    let steps = 0;

    while (true) {
      steps++;
      if (steps > maxSteps) return false;

      if (x0 === x1 && y0 === y1) return true;

      if (x0 !== screenX0 || y0 !== screenY0) {
        const worldPos = CameraTransformer.screenToWorld(x0, y0, player);
        if (dungeon.getTile(worldPos.x, worldPos.y) === TILE_WALL) {
          return false;
        }
      }

      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  static hasWorldLineOfSight(x0, y0, x1, y1, dungeon) {
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

      if ((curX !== x0 || curY !== y0) && dungeon.getTile(curX, curY) === TILE_WALL) {
        return false;
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
    this.isVictorySequence = false;
    this.victoryStep = 0;

    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = canvas.width;
    this.offscreenCanvas.height = canvas.height;
    this.offCtx = this.offscreenCanvas.getContext("2d");

    this.currentAngle = player.direction * 90;
    this.targetAngle = player.direction * 90;
    this.isAnimating = false;
  }

  setDungeon(dungeon, generator) {
    this.dungeon = dungeon;
    this.generator = generator;
  }

  animateTurn(deltaQuarterTurns) {
    this.targetAngle += deltaQuarterTurns * 90;
    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(() => this.stepAnimation());
    }
  }

  stepAnimation() {
    const diff = this.targetAngle - this.currentAngle;
    if (Math.abs(diff) < 0.3) {
      this.currentAngle = this.targetAngle;
      this.isAnimating = false;
      this.drawBase(this.ctx);
      return;
    }

    this.currentAngle += diff * 0.32;
    this.drawWithRotation(this.currentAngle - this.player.direction * 90);
    requestAnimationFrame(() => this.stepAnimation());
  }

  draw() {
    this.drawBase(this.ctx);
  }

  drawWithRotation(angleOffsetDeg) {
    const { ctx, canvas } = this;
    const { tileSize, playerScreenX, playerScreenY } = CAMERA_CONFIG;
    const pivotX = playerScreenX * tileSize + tileSize / 2;
    const pivotY = playerScreenY * tileSize + tileSize / 2;

    this.drawBase(this.offCtx);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate((angleOffsetDeg * Math.PI) / 180);
    ctx.translate(-pivotX, -pivotY);
    ctx.drawImage(this.offscreenCanvas, 0, 0);
    ctx.restore();
  }

  drawBase(targetCtx) {
    const { canvas } = this;
    const { cols, rows, tileSize, playerScreenX, playerScreenY } = CAMERA_CONFIG;

    targetCtx.fillStyle = "#000000";
    targetCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Cinemática de victoria: Piso 100 completado (Cielo azul, sendero marrón y césped verde)
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

      const liorPx = playerScreenX * tileSize + tileSize / 2;
      const liorPy = (playerScreenY - this.victoryStep) * tileSize + tileSize / 2;

      targetCtx.fillStyle = "#00b0ff";
      targetCtx.beginPath();
      targetCtx.arc(liorPx, liorPy, tileSize * 0.35, 0, Math.PI * 2);
      targetCtx.fill();

      targetCtx.strokeStyle = "#ffffff";
      targetCtx.lineWidth = 2.5;
      targetCtx.beginPath();
      targetCtx.moveTo(liorPx, liorPy);
      targetCtx.lineTo(liorPx, liorPy - tileSize * 0.65);
      targetCtx.stroke();
      return;
    }

    const enemiesRemain = this.dungeon.enemies.length > 0;

    for (let sy = 0; sy < rows; sy++) {
      for (let sx = 0; sx < cols; sx++) {
        const worldCoord = CameraTransformer.screenToWorld(sx, sy, this.player);
        const tileType = this.dungeon.getTile(worldCoord.x, worldCoord.y);
        const px = sx * tileSize;
        const py = sy * tileSize;

        const inLineOfSight = VisibilitySystem.hasLineOfSight(
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
          targetCtx.fillStyle = inLineOfSight ? "#ffffff" : "#666666";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_ENTRANCE) {
          targetCtx.fillStyle = inLineOfSight ? "#00e676" : "#00552b";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_EXIT) {
          targetCtx.fillStyle = enemiesRemain
            ? (inLineOfSight ? "#b71c1c" : "#4a0000")
            : (inLineOfSight ? "#ffb300" : "#664700");
          targetCtx.fillRect(px, py, tileSize, tileSize);
          if (inLineOfSight && enemiesRemain) {
            targetCtx.strokeStyle = "#ffffff";
            targetCtx.lineWidth = 1.5;
            targetCtx.strokeRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
          }
        } else if (tileType === TILE_HEAL_FOUNTAIN) {
          targetCtx.fillStyle = inLineOfSight ? "#062817" : "#02120a";
          targetCtx.fillRect(px, py, tileSize, tileSize);
          if (inLineOfSight) {
            targetCtx.fillStyle = "#00e676";
            targetCtx.font = "bold 20px monospace";
            targetCtx.textAlign = "center";
            targetCtx.textBaseline = "middle";
            targetCtx.fillText("+", px + tileSize / 2, py + tileSize / 2);
          }
        } else if (tileType === TILE_SHOP) {
          targetCtx.fillStyle = inLineOfSight ? "#2b2204" : "#141002";
          targetCtx.fillRect(px, py, tileSize, tileSize);
          if (inLineOfSight) {
            targetCtx.fillStyle = "#ffd700";
            targetCtx.font = "bold 18px monospace";
            targetCtx.textAlign = "center";
            targetCtx.textBaseline = "middle";
            targetCtx.fillText("T", px + tileSize / 2, py + tileSize / 2);
          }
        } else if (tileType === TILE_FLOOR) {
          targetCtx.fillStyle = inLineOfSight ? "#101014" : "#08080a";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_OUT_OF_BOUNDS) {
          targetCtx.fillStyle = "#050508";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        }

        targetCtx.strokeStyle = inLineOfSight ? "#2e2e34" : "#141416";
        targetCtx.lineWidth = 1;
        targetCtx.strokeRect(px, py, tileSize, tileSize);
      }
    }

    this.dungeon.enemies.forEach(enemy => {
      if (!enemy.cells) return;
      enemy.cells.forEach(cell => {
        const { screenX, screenY } = CameraTransformer.worldToScreen(cell.x, cell.y, this.player);
        if (screenX >= 0 && screenX < cols && screenY >= 0 && screenY < rows) {
          const visible = VisibilitySystem.hasLineOfSight(
            playerScreenX, playerScreenY, screenX, screenY, this.dungeon, this.player
          );
          if (visible) {
            const px = screenX * tileSize;
            const py = screenY * tileSize;

            if (enemy.isMegaBoss) {
              targetCtx.fillStyle = "#800020";
              targetCtx.fillRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
              targetCtx.strokeStyle = "#ffd700";
              targetCtx.lineWidth = 2;
              targetCtx.strokeRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
            } else if (enemy.isBoss) {
              targetCtx.fillStyle = "#cc0029";
              targetCtx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
              targetCtx.strokeStyle = "#ffffff";
              targetCtx.lineWidth = 1.5;
              targetCtx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
            } else {
              const cx = px + tileSize / 2;
              const cy = py + tileSize / 2;
              targetCtx.fillStyle = enemy.fearCooldown > 0 ? "#ff99bb" : "#ff3333";
              targetCtx.beginPath();
              targetCtx.arc(cx, cy, 7, 0, Math.PI * 2);
              targetCtx.fill();
            }
          }
        }
      });
    });

    const liorPx = playerScreenX * tileSize + tileSize / 2;
    const liorPy = playerScreenY * tileSize + tileSize / 2;

    targetCtx.fillStyle = this.player.hp > 0 ? "#00b0ff" : "#555555";
    targetCtx.beginPath();
    targetCtx.arc(liorPx, liorPy, tileSize * 0.35, 0, Math.PI * 2);
    targetCtx.fill();

    if (this.player.hp > 0) {
      targetCtx.strokeStyle = "#ffffff";
      targetCtx.lineWidth = 2.5;
      targetCtx.beginPath();
      targetCtx.moveTo(liorPx, liorPy);
      targetCtx.lineTo(liorPx, liorPy - tileSize * 0.65);
      targetCtx.stroke();
    }
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

    let forward = 0;
    let lateral = 0;

    switch (player.direction) {
      case 0: forward = -dy; lateral = dx; break;
      case 1: forward = dx; lateral = dy; break;
      case 2: forward = dy; lateral = -dx; break;
      case 3: forward = -dx; lateral = -dy; break;
    }

    return (forward >= 1 && forward <= weapon.range && Math.abs(lateral) <= 1);
  }

  static executeAttack(game) {
    const { player, dungeon } = game;

    if (player.hp <= 0) {
      game.log(I18N.logs.deadPlayer);
      return;
    }

    const weapon = player.equippedWeapon;
    const hitBonus = game.hitBonus;
    const dmgBonus = game.dmgBonus;

    if (weapon.ammoType === "pistol") {
      if (player.ammoPistol <= 0) {
        game.log(I18N.logs.noAmmoPistol);
        return;
      }
      player.ammoPistol--;
      sounds.playShot(false);
    } else if (weapon.ammoType === "musket") {
      if (player.ammoMusket <= 0) {
        game.log(I18N.logs.noAmmoMusket);
        return;
      }
      player.ammoMusket--;
      sounds.playShot(true);
    } else {
      sounds.playSword();
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
            const baseDmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1)) + weapon.minDmg;
            const totalDmg = baseDmg + dmgBonus;
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
          const baseDmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1)) + weapon.minDmg;
          const totalDmg = baseDmg + dmgBonus;
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
    this.canvas = document.getElementById("viewport");
    this.shopModal = document.getElementById("shop-modal");
    this.victoryScreen = document.getElementById("victory-screen");
    this.deathScreen = document.getElementById("death-screen");
    this.isShopOpen = false;
    this.isVictory = false;
    this.megaBossEmptyTurns = 0;
    this.shopSelectedIndex = 0;
    this.controlDevice = "touch";

    this.initDungeonFloor();
    this.bindEvents();
    this.bindShopEvents();
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

  // Daño adicional plano escala de +1 a +20 del piso 1 al 100
  get dmgBonus() {
    return Math.min(20, 1 + Math.floor(((this.floor - 1) * 19) / 99));
  }

  initDeviceDetection() {
    window.addEventListener("keydown", () => this.setControlDevice("keyboard"));
    window.addEventListener("touchstart", () => this.setControlDevice("touch"));
    window.addEventListener("gamepadconnected", () => this.setControlDevice("gamepad"));
    window.addEventListener("gamepaddisconnected", () => this.setControlDevice("touch"));
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

    if (this.controlDevice === "keyboard") {
      btnUp.textContent = "W";
      btnDown.textContent = "S";
      btnLeft.textContent = "A";
      btnRight.textContent = "D";

      btnD.textContent = "I";
      btnC.textContent = "L";
      btnB.textContent = "K";
      btnA.textContent = "J";

      capD.textContent = I18N.captionsKeyboard.weapon;
      capC.textContent = I18N.captionsKeyboard.heal;
      capB.textContent = I18N.captionsKeyboard.mist;
      capA.textContent = I18N.captionsKeyboard.attack;
    } else {
      btnUp.textContent = "▲";
      btnDown.textContent = "▼";
      btnLeft.textContent = "◀";
      btnRight.textContent = "▶";

      btnD.textContent = "Y";
      btnC.textContent = "X";
      btnB.textContent = "B";
      btnA.textContent = "A";

      capD.textContent = I18N.captions.weapon;
      capC.textContent = I18N.captions.heal;
      capB.textContent = I18N.captions.mist;
      capA.textContent = I18N.captions.attack;
    }
  }

  initDungeonFloor() {
    const { width, height } = getRandomDungeonDimensions(10, 30, this.floor);
    this.dungeon = new Dungeon(width, height);
    this.generator = new DungeonGenerator(this.dungeon, this.floor);
    this.megaBossEmptyTurns = 0;

    if (!this.player) {
      this.player = new Player(this.dungeon.entrance.x, this.dungeon.entrance.y);
    } else {
      this.player.x = this.dungeon.entrance.x;
      this.player.y = this.dungeon.entrance.y;
      this.player.hasUsedLayOnHands = false;
      this.player.mistyStepCharges = 2;
    }

    this.player.ac = this.playerAC;

    if (!this.renderer) {
      this.renderer = new Renderer(this.canvas, this.dungeon, this.player, this.generator);
    } else {
      this.renderer.player = this.player;
      this.renderer.setDungeon(this.dungeon, this.generator);
    }

    this.updateHUD();
    this.updateButtonLabels();

    this.log(I18N.logs.floorIntro(this.floor, this.tier, width, height, this.player.ac, this.hitBonus, this.dmgBonus));
    this.renderer.draw();
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

    if (elFloor) elFloor.textContent = this.floor;
    if (elDir) elDir.textContent = I18N.cardinals[this.player.direction];
    if (elHp) elHp.textContent = this.player.hp;
    if (elGold) elGold.textContent = this.player.gold;
    if (elAmmo) elAmmo.textContent = `P:${this.player.ammoPistol} | M:${this.player.ammoMusket}`;
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

    const mistyBtn = document.getElementById("btn-b");
    if (mistyBtn) mistyBtn.disabled = this.player.mistyStepCharges <= 0 || this.player.hp <= 0;

    const layBtn = document.getElementById("btn-c");
    if (layBtn) layBtn.disabled = this.player.hasUsedLayOnHands || this.player.hp <= 0;

    const shopGold = document.getElementById("shop-gold-display");
    if (shopGold) shopGold.textContent = this.player.gold;
  }

  openShop() {
    this.isShopOpen = true;
    this.shopSelectedIndex = 0;
    this.shopModal.classList.remove("hidden");
    this.updateHUD();
    sounds.playCoin();
    this.updateShopFocus();
    this.log(I18N.logs.shopEnter);
  }

  closeShop() {
    this.isShopOpen = false;
    this.shopModal.classList.add("hidden");
    this.removeShopFocus();
    this.renderer.draw();
  }

  getShopElements() {
    return [
      { row: document.querySelectorAll(".shop-item")[0], btn: document.getElementById("buy-pistol-ammo") },
      { row: document.querySelectorAll(".shop-item")[1], btn: document.getElementById("buy-musket-ammo") },
      { row: document.querySelectorAll(".shop-item")[2], btn: document.getElementById("buy-potion") },
      { row: document.getElementById("close-shop"), btn: document.getElementById("close-shop") }
    ];
  }

  updateShopFocus() {
    const items = this.getShopElements();
    items.forEach((item, idx) => {
      if (idx === this.shopSelectedIndex) {
        if (item.row) item.row.classList.add("focused");
        if (item.btn) item.btn.focus();
      } else {
        if (item.row) item.row.classList.remove("focused");
      }
    });
  }

  removeShopFocus() {
    const items = this.getShopElements();
    items.forEach(item => {
      if (item.row) item.row.classList.remove("focused");
    });
  }

  navigateShop(direction) {
    const items = this.getShopElements();
    this.shopSelectedIndex = (this.shopSelectedIndex + direction + items.length) % items.length;
    sounds.playStep();
    this.updateShopFocus();
  }

  confirmShopSelection() {
    const items = this.getShopElements();
    const current = items[this.shopSelectedIndex];
    if (current && current.btn) current.btn.click();
  }

  bindShopEvents() {
    document.getElementById("buy-pistol-ammo").addEventListener("click", () => {
      if (this.player.gold >= 1) {
        this.player.gold -= 1;
        this.player.ammoPistol += 4;
        sounds.playCoin();
        this.log("+4 balas Pistola (-1 PO)");
        this.updateHUD();
      }
    });

    document.getElementById("buy-musket-ammo").addEventListener("click", () => {
      if (this.player.gold >= 1) {
        this.player.gold -= 1;
        this.player.ammoMusket += 2;
        sounds.playCoin();
        this.log("+2 balas Mosquete (-1 PO)");
        this.updateHUD();
      }
    });

    document.getElementById("buy-potion").addEventListener("click", () => {
      if (this.player.gold >= 2) {
        if (this.player.hp >= this.player.maxHp) return;
        this.player.gold -= 2;
        sounds.playHeal();
        const heal = rollDie(8) + 5;
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
        this.log(`+${heal} HP (-2 PO)`);
        this.updateHUD();
      }
    });

    document.getElementById("close-shop").addEventListener("click", () => {
      this.closeShop();
    });
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

        this.dungeon.enemies.push({
          id: Math.random().toString(36).substring(2, 9),
          x: sx, y: sy,
          startX: sx, startY: sy,
          name: IS_SPANISH ? "Sombra Invocada" : "Summoned Shadow",
          hp: 2, maxHp: 2,
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
    if (this.isShopOpen || this.isVictory || this.player.mistyStepCharges <= 0 || this.player.hp <= 0) return;

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
      } else if (encounteredObstacle && tile === TILE_FLOOR) {
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
      if (this.dungeon.isInsideBounds(freeStep.x, freeStep.y) && this.dungeon.getTile(freeStep.x, freeStep.y) === TILE_FLOOR) {
        this.player.x = freeStep.x;
        this.player.y = freeStep.y;
      }
    }

    this.updateHUD();
    this.renderer.draw();
  }

  useLayOnHands() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;
    if (this.player.useLayOnHands()) {
      sounds.playHeal();
      this.log(I18N.logs.layHealed);
      this.updateHUD();
    } else {
      this.log(I18N.logs.layUsed);
    }
  }

  cycleWeapon() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;
    this.player.cycleWeapon();
    sounds.playStep();
    this.updateHUD();
  }

  turnLeft() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;
    this.player.turnLeft();
    sounds.playStep();
    this.updateHUD();
    this.renderer.animateTurn(-1);
  }

  turnRight() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;
    this.player.turnRight();
    sounds.playStep();
    this.updateHUD();
    this.renderer.animateTurn(1);
  }

  processEnemiesTurn() {
    if (this.player.hp <= 0 || this.isVictory) return;

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

    if (this.player.hp <= 0) this.triggerGameOver();
  }

  moveForward() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;

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

    this.player.moveForward();
    sounds.playStep();
    this.processEnemiesTurn();
    this.handleTileInteractions();
  }

  moveBackward() {
    if (this.isShopOpen || this.isVictory || this.player.hp <= 0) return;

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

    this.player.moveBackward();
    sounds.playStep();
    this.processEnemiesTurn();
    this.handleTileInteractions();
  }

  handleTileInteractions() {
    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_HEAL_FOUNTAIN) {
      const heal = rollDie(6);
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
      sounds.playHeal();
      this.log(I18N.logs.fountain(heal));
      this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    }

    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_SHOP) {
      this.openShop();
    }

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
        this.floor++;
        setTimeout(() => this.initDungeonFloor(), 600);
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
    document.getElementById("btn-c").addEventListener("click", () => this.useLayOnHands());
    document.getElementById("btn-b").addEventListener("click", () => this.castMistyStep());
    document.getElementById("btn-a").addEventListener("click", () => {
      if (this.isShopOpen) return;
      CombatSystem.executeAttack(this);
    });

    const restartBtn = document.getElementById("btn-restart-game");
    if (restartBtn) restartBtn.addEventListener("click", () => location.reload());

    window.addEventListener("keydown", (e) => {
      if (this.isShopOpen) {
        if (e.key === "Escape" || e.key === "b" || e.key === "B") {
          e.preventDefault();
          this.closeShop();
        } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          e.preventDefault();
          this.navigateShop(-1);
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          e.preventDefault();
          this.navigateShop(1);
        } else if (e.key === "Enter" || e.key === " " || e.key === "j" || e.key === "J") {
          e.preventDefault();
          this.confirmShopSelection();
        }
        return;
      }

      if (this.isVictory) return;

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
        case "j":
        case "J":
        case " ":
          CombatSystem.executeAttack(this);
          break;
        case "k":
        case "K":
          this.castMistyStep();
          break;
        case "l":
        case "L":
          this.useLayOnHands();
          break;
        case "i":
        case "I":
          this.cycleWeapon();
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
        if (this.controlDevice !== "gamepad") this.setControlDevice("gamepad");

        const axisX = gp.axes[0] || 0;
        const axisY = gp.axes[1] || 0;
        const dpadUp = gp.buttons[12] && gp.buttons[12].pressed;
        const dpadDown = gp.buttons[13] && gp.buttons[13].pressed;
        const dpadLeft = gp.buttons[14] && gp.buttons[14].pressed;
        const dpadRight = gp.buttons[15] && gp.buttons[15].pressed;

        const threshold = 0.5;
        const btnStates = gp.buttons.map(b => b.pressed);

        if (this.isShopOpen) {
          if ((axisY < -threshold || dpadUp) && this.lastGamepadAxes.y >= -threshold) this.navigateShop(-1);
          else if ((axisY > threshold || dpadDown) && this.lastGamepadAxes.y <= threshold) this.navigateShop(1);

          if (btnStates[0] && !this.lastGamepadButtons[0]) this.confirmShopSelection();
          if ((btnStates[1] && !this.lastGamepadButtons[1]) || (btnStates[9] && !this.lastGamepadButtons[9])) this.closeShop();
        } else {
          if ((axisY < -threshold || dpadUp) && this.lastGamepadAxes.y >= -threshold) this.moveForward();
          else if ((axisY > threshold || dpadDown) && this.lastGamepadAxes.y <= threshold) this.moveBackward();
          else if ((axisX < -threshold || dpadLeft) && this.lastGamepadAxes.x >= -threshold) this.turnLeft();
          else if ((axisX > threshold || dpadRight) && this.lastGamepadAxes.x <= threshold) this.turnRight();

          if (btnStates[0] && !this.lastGamepadButtons[0]) CombatSystem.executeAttack(this);
          if (btnStates[1] && !this.lastGamepadButtons[1]) this.castMistyStep();
          if (btnStates[2] && !this.lastGamepadButtons[2]) this.useLayOnHands();
          if (btnStates[3] && !this.lastGamepadButtons[3]) this.cycleWeapon();
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

// INICIALIZACIÓN CON PANTALLA SPLASH
window.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  let gameStarted = false;

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;

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

  if (splashScreen) {
    splashScreen.classList.add("fade-in");
    splashScreen.addEventListener("click", startGame);
    splashScreen.addEventListener("touchstart", startGame, { passive: true });
  }

  setTimeout(startGame, 1200);
});