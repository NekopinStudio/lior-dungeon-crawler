/**
 * TEXTOS DEL JUEGO (español neutro)
 */
const TEXT = {
  cardinals: ["Norte (▲)", "Este (▶)", "Sur (▼)", "Oeste (◀)"],
  doorLocked: (count) => `BLOQUEADA (${count})`,
  doorOpen: "ABIERTA",
  weaponNames: {
    sword: "Espada",
    pistol: "Pistola",
    musket: "Mosquete",
    blunderbuss: "Trabuco"
  },
  weaponLabels: {
    sword: "Espada (área c/c 1.5)",
    pistol: "Pistola (frente 3x3)",
    musket: "Mosquete (frente 5x3)",
    blunderbuss: "Trabuco (frente 2x5)"
  },
  captions: {
    weapon: "ARMA",
    blast: "E. BLAST",
    mist: "BRUMA",
    attack: "ATACAR"
  },
  captionsKeyboard: {
    weapon: "ARMA (I)",
    blast: "E. BLAST (J)",
    mist: "BRUMA (L)",
    attack: "ATACAR (K)"
  },
  death: {
    title: "HAS CAÍDO",
    desc: "Las sombras del calabozo han consumido a Lior.",
    btn: "☠ INTENTAR DE NUEVO",
    stats: (floor, kills, gold) =>
      `Alcanzaste el Piso: ${floor}<br>Enemigos purificados: ${kills}<br>Oro acumulado: ${gold} PO`
  },
  victory: {
    title: "¡PURIFICACIÓN!",
    desc: "Lior Kurogane ha emergido a la superficie.<br>La luz del sol baña los 100 pisos conquistados.",
    btn: "REINICIAR VIAJE",
    stats: (kills, gold) =>
      `Pisos purificados: 100<br>Enemigos eliminados: ${kills}<br>Oro reunido: ${gold} PO`
  },
  logs: {
    outOfBounds: "El muro exterior te detiene.",
    backOutOfBounds: "Un muro exterior detiene tu retroceso.",
    wallFront: "Un muro bloquea el camino.",
    wallBack: "Un muro a tu espalda te impide retroceder.",
    wallCorner: "Una esquina de piedra bloquea el paso diagonal.",
    enemyBlock: "¡Un enemigo bloquea el paso! Ataca para despejarlo.",
    enemyBlockBack: "Un enemigo te bloquea el paso por la espalda.",
    merchantPeace: "Baja tu arma, tengo cosas buenas para ti.",
    merchantNoAttack: "No puedes atacar en el santuario del mercader.",
    noAmmoPistol: "¡Sin balas de Pistola! Cambia de arma.",
    noAmmoMusket: "¡Sin balas de Mosquete! Cambia de arma.",
    noAmmoBlunderbuss: "¡Sin balas de Trabuco! Cambia de arma.",
    chestPotion: (heal) => `Encontraste una poción: +${heal} HP.`,
    chestWeapon: (weapon, ammo) => `Encontraste ${weapon} y ${ammo} ${ammo === 1 ? "bala" : "balas"}.`,
    chestAmmo: (weapon, ammo) => `El cofre tenía ${ammo} ${ammo === 1 ? "bala" : "balas"} de ${weapon}.`,
    swordWhiff: "Blandes tu espada en círculo, pero no hay enemigos al alcance.",
    shotWhiff: (weapon) => `Disparas tu ${weapon}... pero la bala se pierde sin impactar.`,
    wallImpact: (weapon) => `Tu disparo de ${weapon} impacta contra un muro.`,
    attackHit: (total, ac, dmg, name, hp) => `[${total} vs CA ${ac}]: ${dmg} DMG -> ${name} (HP: ${hp})`,
    attackDefended: (total, ac, name) => `[${total} vs CA ${ac}] ${name} se defiende.`,
    criticalMiss: (name) => `${name} pifia y queda aturdido para su próximo ataque.`,
    stunned: (name) => `${name} pierde su turno de ataque por el aturdimiento.`,
    enemyHit: (name, total, ac, dmg) => `[${name}] IMPACTA [${total} vs CA ${ac}] -${dmg} de daño (escudo primero).`,
    goldDrop: (gold, name) => `+${gold} PO (${name})`,
    panic: "¡El líder cayó! Los esbirros cercanos entran en pánico y huyen.",
    deadPlayer: "Lior ha caído en combate. Fin de la partida.",
    blastCharging: (rem) => `Eldritch Blast cargando (${rem} acciones restantes).`,
    blastWhiff: "Liberas un rayo de Eldritch Blast, pero no hay objetivos en tu línea de visión.",
    blastFired: (target, dmg, rays) => `¡Eldritch Blast (${rays} rayos) impacta a ${target} por ${dmg} de daño arcano!`,
    exitLocked: (cnt) => `¡La puerta está sellada! Elimina a las ${cnt} amenazas restantes.`,
    exitDescend: "¡Descendiendo al siguiente nivel...!",
    floorIntro: (floor, tier, w, h, ac, hit) =>
      `Piso ${floor} (Tier ${tier}): ${w}x${h}. CA Lior: ${ac}, Impacto: +${hit}.`,
    bossArena: (name) => `¡${name} te espera en la arena! Sus esbirros acuden sin descanso.`,
    bunnyCaught: "¡Atrapaste al Conejo Dorado! Obtienes 5 monedas de oro.",
    boughtPistol: (price) => `Compraste 6 balas de Pistola (-${price} PO).`,
    boughtMusket: (price) => `Compraste 4 balas de Mosquete (-${price} PO).`,
    boughtBlunderbuss: (price) => `Compraste 2 balas de Trabuco (-${price} PO).`,
    boughtPotion: (heal, price) => `Bebiste una poción: +${heal} HP (-${price} PO).`,
    mistyInvalid: "Destino inválido para Misty Step."
  }
};

const LIOR_ROWS = {
  IDLE:           { y0: 14,   y1: 128,  xs: [[194, 267], [301, 374], [408, 483]] },
  WALK:           { y0: 135,  y1: 274,  xs: [[302, 380], [408, 490], [519, 598], [640, 725], [760, 844], [873, 964], [995, 1086], [1117, 1207]] },
  SWORD_SPIN:     { y0: 278,  y1: 414,  xs: [[208, 328], [375, 549], [599, 759], [867, 968]] },
  ELDRITCH_BLAST: { y0: 418,  y1: 574,  xs: [[256, 386], [463, 625], [736, 864], [921, 1011]] },
  HEAL:           { y0: 576,  y1: 708,  xs: [[271, 349], [439, 516], [599, 678], [761, 843]] },
  MISTY_STEP:     { y0: 712,  y1: 842,  xs: [[263, 365], [442, 538], [608, 703], [762, 844]] },
  GUN_RECOIL:     { y0: 846,  y1: 974,  xs: [[243, 356], [419, 512], [600, 683], [749, 842], [918, 1020], [1078, 1179]] },
  HURT:           { y0: 976,  y1: 1090, xs: [[230, 324], [419, 508], [590, 683]] },
  DEFEAT:         { y0: 1092, y1: 1186, xs: [[216, 322], [402, 528], [544, 753], [771, 833], [863, 1060]] }
};

const LIOR_SPRITES = Object.fromEntries(Object.entries(LIOR_ROWS).map(([name, row]) => [
  name,
  row.xs.map(([x0, x1]) => ({ x: x0, y: row.y0, w: x1 - x0 + 1, h: row.y1 - row.y0 + 1 }))
]));

const LIOR2_ROWS = {
  FRONT_IDLE: { view: "front", y0: 0,    y1: 319,  xs: [[316, 478], [538, 699], [758, 920], [978, 1139], [1199, 1357], [1419, 1577], [1637, 1796]] },
  FRONT_WALK: { view: "front", y0: 337,  y1: 657,  xs: [[328, 472], [550, 695], [774, 918], [998, 1142], [1208, 1368], [1446, 1591]] },
  FRONT_GUN:  { view: "front", y0: 673,  y1: 991,  xs: [[397, 612], [924, 1117], [1308, 1530]] },
  SIDE_IDLE:  { view: "side",  y0: 1012, y1: 1324, xs: [[358, 509], [574, 723], [787, 937], [1001, 1151], [1214, 1365], [1429, 1579], [1646, 1795], [1858, 2009]] },
  SIDE_WALK:  { view: "side",  y0: 1334, y1: 1628, xs: [[407, 556], [697, 848], [983, 1134], [1251, 1400], [1521, 1669]] },
  SIDE_GUN:   { view: "side",  y0: 1647, y1: 1949, xs: [[732, 933], [1013, 1233]] }
};

const LIOR2_SPRITES = Object.fromEntries(Object.entries(LIOR2_ROWS).map(([name, row]) => [
  name,
  row.xs.map(([x0, x1]) => ({ sheet: "lior2", view: row.view, x: x0, y: row.y0, w: x1 - x0 + 1, h: row.y1 - row.y0 + 1 }))
]));

const flipFrames = frames => frames.map(frame => ({ ...frame, flip: true }));

const LIOR_FACING_FRAMES = {
  2: { IDLE: LIOR2_SPRITES.FRONT_IDLE, WALK: LIOR2_SPRITES.FRONT_WALK, GUN_RECOIL: LIOR2_SPRITES.FRONT_GUN, ELDRITCH_BLAST: LIOR2_SPRITES.FRONT_GUN },
  1: { IDLE: LIOR2_SPRITES.SIDE_IDLE, WALK: LIOR2_SPRITES.SIDE_WALK, GUN_RECOIL: LIOR2_SPRITES.SIDE_GUN, ELDRITCH_BLAST: LIOR2_SPRITES.SIDE_GUN },
  3: {
    IDLE: flipFrames(LIOR2_SPRITES.SIDE_IDLE),
    WALK: flipFrames(LIOR2_SPRITES.SIDE_WALK),
    GUN_RECOIL: flipFrames(LIOR2_SPRITES.SIDE_GUN),
    ELDRITCH_BLAST: flipFrames(LIOR2_SPRITES.SIDE_GUN)
  }
};

const LIOR2_REFERENCE = { front: LIOR2_SPRITES.FRONT_IDLE[0], side: LIOR2_SPRITES.SIDE_IDLE[0] };

const EFFECT_SHEETS = {
  eblast:      { src: "Assets/Lior/EBlast.jpg",        cols: 3, trim: false },
  pistol:      { src: "Assets/Lior/PistolShot.jpg",    cols: 3, trim: true },
  musket:      { src: "Assets/Lior/MosqueteShot.jpg",  cols: 3, trim: true },
  blunderbuss: {
    src: "Assets/Lior/trabucoShot.jpg",
    trim: false,
    panels: [
      { x: 36,   y: 410, w: 1023, h: 453 },
      { x: 1106, y: 410, w: 1027, h: 453 },
      { x: 2176, y: 410, w: 1052, h: 453 }
    ]
  }
};

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
    weapon: { index: 3, standardLabel: "Y", genericLabel: "4" },
    weaponAlt: [4, 5]
  }
};

const CAMERA_PROFILES = {
  classic: { cols: 15, rows: 9, tileSize: 40, anchors: [{ x: 7, y: 4 }, { x: 7, y: 4 }, { x: 7, y: 4 }, { x: 7, y: 4 }] },
  fixed: { cols: 15, rows: 9, tileSize: 40, anchors: [{ x: 7, y: 4 }, { x: 7, y: 4 }, { x: 7, y: 4 }, { x: 7, y: 4 }] }
};

const CAMERA_CONFIG = {
  mode: "fixed",
  cols: 15,
  rows: 9,
  tileSize: 40,
  playerScreenX: 7,
  playerScreenY: 4
};

const CAMERA_CARDINAL_BASIS = [
  { forward: { x: 0, y: -1 }, right: { x: 1, y: 0 } },
  { forward: { x: 1, y: 0 },  right: { x: 0, y: 1 } },
  { forward: { x: 0, y: 1 },  right: { x: -1, y: 0 } },
  { forward: { x: -1, y: 0 }, right: { x: 0, y: -1 } }
];

const ENEMY_ROSTER = {
  minion: [
    { name: "Kobold", src: "Assets/Enemy/1x1/1. kobold.jpg", tier: 1, category: "minion" },
    { name: "Goblin", src: "Assets/Enemy/1x1/2. Goblin.jpg", tier: 2, category: "minion" },
    { name: "Esqueleto", src: "Assets/Enemy/1x1/3.Skelleton.jpg", ranged: true, tier: 3, category: "minion" },
    { name: "Zombi", src: "Assets/Enemy/1x1/4. Zombie.jpg", tier: 4, category: "minion" },
    { name: "Orco", src: "Assets/Enemy/1x1/5. orc.jpg", tier: 5, category: "minion" },
    { name: "Gnoll", src: "Assets/Enemy/1x1/6. Gnoll.jpg", tier: 6, category: "minion" },
    { name: "Hobgoblin", src: "Assets/Enemy/1x1/7. hobgoblin.jpg", tier: 7, category: "minion" },
    { name: "Hombre lagarto", src: "Assets/Enemy/1x1/8. lizardfolk.jpg", tier: 8, category: "minion" },
    { name: "Diablillo", src: "Assets/Enemy/1x1/9. imp.jpg", ranged: true, tier: 9, category: "minion" },
    { name: "Osgo", src: "Assets/Enemy/1x1/10. bugbear.jpg", tier: 10, category: "minion" }
  ],
  miniBoss: [
    { name: "Ogro", src: "Assets/Enemy/2x2/1. ogre.png", tier: 1, category: "miniBoss" },
    { name: "Trol", src: "Assets/Enemy/2x2/2. troll.jpg", tier: 2, category: "miniBoss" },
    { name: "Minotauro", src: "Assets/Enemy/2x2/3. minotaur.jpg", tier: 3, category: "miniBoss" },
    { name: "Osobúho", src: "Assets/Enemy/2x2/4. owlbear.jpg", tier: 4, category: "miniBoss" },
    { name: "Mantícora", src: "Assets/Enemy/2x2/5. manticore.jpg", tier: 5, category: "miniBoss" },
    { name: "Basilisco", src: "Assets/Enemy/2x2/6. basilisk.jpg", tier: 6, category: "miniBoss" },
    { name: "Quimera", src: "Assets/Enemy/2x2/7. chimera.jpg", tier: 7, category: "miniBoss" },
    { name: "Bulette", src: "Assets/Enemy/2x2/8. bulette.jpg", tier: 8, category: "miniBoss" },
    { name: "Gigante de las colinas", src: "Assets/Enemy/2x2/9. hillGiant.jpg", tier: 9, category: "miniBoss" },
    { name: "Dragón joven", src: "Assets/Enemy/2x2/10. youngDragon.jpg", tier: 10, category: "miniBoss" }
  ],
  megaBoss: [
    { name: "Roc", src: "Assets/Enemy/4x4/1. roc.jpg", tier: 1, category: "megaBoss" },
    { name: "Tarrasca", src: "Assets/Enemy/4x4/2. tarrasque.jpg", tier: 2, category: "megaBoss" },
    { name: "Gólem de hierro", src: "Assets/Enemy/4x4/3. ironGolem.jpg", tier: 3, category: "megaBoss" },
    { name: "Kraken", src: "Assets/Enemy/4x4/4. kraken.jpg", tier: 4, category: "megaBoss" },
    { name: "Gigante de tormenta", src: "Assets/Enemy/4x4/5. stormGigant.jpg", tier: 5, category: "megaBoss" },
    { name: "Beholder", src: "Assets/Enemy/4x4/6. beholder.jpg", tier: 6, category: "megaBoss" },
    { name: "Gusano púrpura", src: "Assets/Enemy/4x4/7. purpleworm.jpg", tier: 7, category: "megaBoss" },
    { name: "Balor", src: "Assets/Enemy/4x4/8. Balor.jpg", tier: 8, category: "megaBoss" },
    { name: "Dragón rojo ancestral", src: "Assets/Enemy/4x4/9. AncientRedDragon.jpg", tier: 9, category: "megaBoss" },
    { name: "Dragón solar", src: "Assets/Enemy/4x4/10. solarDragon.jpg", tier: 10, category: "megaBoss" }
  ]
};

const ENEMY_ANIM_MS = { idle: 175, attack: 110, hurt: 100, death: 130 };

const PROJECTILE_SHEET = {
  src: "Assets/Enemy/disparos.jpg",
  rows: { small: 0, medium: 1, large: 2 },
  sizes: { small: 0.9, medium: 1.3, large: 2.2 }
};
const PROJECTILE_LAUNCH_DELAY_MS = 220;
const PROJECTILE_IMPACT_MS = 180;

const BUNNY_SPRITES = {
  bunnyIdle: { x: 0, y: 64, w: 256, h: 256 },
  bunnyFlee: [
    { x: 1672, y: 940, w: 288, h: 224 },
    { x: 2120, y: 940, w: 272, h: 224 },
    { x: 2548, y: 940, w: 248, h: 224 }
  ]
};

const CHEST_SPRITES = [0, 16, 32, 48, 64].map(x => ({ x, y: 0, w: 16, h: 16 }));
const PICKUP_SPRITES = {
  potion: [{ x: 0, y: 0, w: 16, h: 16 }, { x: 16, y: 0, w: 16, h: 16 }],
  coins: [
    { x: 96, y: 0, w: 16, h: 16 }, { x: 112, y: 0, w: 16, h: 16 },
    { x: 0, y: 16, w: 16, h: 16 }, { x: 16, y: 16, w: 16, h: 16 },
    { x: 32, y: 16, w: 16, h: 16 }
  ]
};

const WEAPONS = {
  SWORD: {
    id: "sword",
    name: TEXT.weaponNames.sword,
    label: TEXT.weaponLabels.sword,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },
  PISTOL: {
    id: "pistol",
    name: TEXT.weaponNames.pistol,
    label: TEXT.weaponLabels.pistol,
    range: 3,
    width: 3,
    isMelee: false,
    ammoType: "pistol",
    ammoProperty: "ammoPistol"
  },
  MUSKET: {
    id: "musket",
    name: TEXT.weaponNames.musket,
    label: TEXT.weaponLabels.musket,
    range: 5,
    width: 3,
    isMelee: false,
    ammoType: "musket",
    ammoProperty: "ammoMusket"
  },
  BLUNDERBUSS: {
    id: "blunderbuss",
    name: TEXT.weaponNames.blunderbuss,
    label: TEXT.weaponLabels.blunderbuss,
    range: 2,
    width: 5,
    isMelee: false,
    ammoType: "blunderbuss",
    ammoProperty: "ammoBlunderbuss"
  }
};

const WEAPON_DAMAGE_BY_UPGRADE = {
  sword: [[1, 4], [2, 4], [3, 4], [4, 4]],
  pistol: [[1, 6], [2, 6], [3, 6], [4, 6]],
  musket: [[1, 8], [2, 8], [3, 8], [4, 8]],
  blunderbuss: [[1, 8], [2, 8], [3, 8], [4, 8]]
};

const AMMO_BASE_PRICES = { pistol: 1, musket: 1, blunderbuss: 1 };

const MINION_HP_BY_TIER = [0, 4, 7, 11, 16, 22, 29, 37, 46, 56, 67];
const MINI_BOSS_HP_BY_TIER = [0, 16, 24, 34, 46, 60, 76, 94, 114, 136, 160];
const MINI_BOSS_MAX_HP_BY_ORIGIN_TIER = [0, 16, 22, 32, 44, 58, 80, 100, 122, 146, 174];
const MEGA_BOSS_MAX_HP_BY_ORIGIN_TIER = [0, 64, 100, 145, 200, 265, 340, 425, 520, 625, 740];

const MINION_DAMAGE_BY_TIER = [
  null, [1, 3, 0], [1, 3, 1], [1, 4, 0], [1, 4, 1], [1, 4, 2],
  [1, 6, 0], [1, 6, 1], [1, 6, 2], [1, 8, 0], [1, 8, 1]
];
const MINI_BOSS_DAMAGE_BY_TIER = [
  null, [1, 4, 0], [1, 4, 1], [1, 6, 0], [1, 6, 1], [1, 6, 2],
  [2, 6, 0], [2, 6, 1], [2, 6, 2], [2, 8, 0], [2, 8, 1]
];
const MEGA_BOSS_DAMAGE_BY_TIER = [
  null, [1, 6, 0], [1, 6, 2], [2, 6, 0], [2, 6, 2], [2, 6, 4],
  [3, 6, 0], [3, 6, 2], [3, 6, 4], [4, 6, 0], [4, 6, 4]
];

const WEAPON_UPGRADE_BASE_PRICES = {
  sword: 10,
  pistol: 15,
  musket: 20,
  blunderbuss: 25
};

const WEAPON_UPGRADE_LEVEL_MULTIPLIERS = [1, 3, 5];

function calculateWeaponUpgradePrice(weaponId, targetLevel) {
  const basePrice = WEAPON_UPGRADE_BASE_PRICES[weaponId];
  const levelMultiplier = WEAPON_UPGRADE_LEVEL_MULTIPLIERS[targetLevel - 1];
  if (!basePrice || !levelMultiplier) return Infinity;
  return Math.ceil(basePrice * levelMultiplier);
}

function calculateAmmoPrice(weaponId, weaponUpgrades) {
  const basePrice = AMMO_BASE_PRICES[weaponId];
  if (basePrice === undefined) return Infinity;
  const upgradeLevel = Math.max(0, Math.min(3, Math.floor(weaponUpgrades[weaponId] || 0)));
  return basePrice + upgradeLevel;
}

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function calculateLiorMaxHP(floor) {
  return 30 + 3 * (floor - 1) + 8 * Math.floor((floor - 1) / 10);
}

function calculateLiorAC(floor) {
  const tier = getTierForFloor(floor);
  return 12 + Math.floor((tier - 1) / 2);
}

function calculateMaxExtraHP(maxHP) {
  return Math.floor(Math.max(0, maxHP) / 2);
}

function restoreHealth(player, healing) {
  let remaining = Math.max(0, Math.floor(healing));
  const hpRestored = Math.min(player.maxHp - player.hp, remaining);
  player.hp = Math.min(player.maxHp, player.hp + hpRestored);
  remaining -= hpRestored;
  player.maxExtraHp = calculateMaxExtraHP(player.maxHp);
  const extraRestored = Math.min(player.maxExtraHp - player.extraHp, remaining);
  player.extraHp = Math.min(player.maxExtraHp, player.extraHp + extraRestored);
  return { hpRestored, extraRestored, totalRestored: hpRestored + extraRestored };
}

function calculatePotionDice(floor) {
  const target = calculateLiorMaxHP(floor) * 0.25;
  return Math.max(1, Math.ceil((target - 4) / 4));
}

function calculatePotionPrice(floor) {
  return calculatePotionDice(floor) + 1;
}

function rollPotionHealing(floor) {
  let total = 4;
  for (let i = 0; i < calculatePotionDice(floor); i++) total += rollDie(4);
  return total;
}

function calculateTier(floor) {
  return 1 + Math.floor((floor - 1) / 10);
}

function calculateEnemyAttackBonus(floor) {
  return Math.floor((floor - 1) / 10);
}

function calculateEldritchBlastRayCount(floor) {
  return 1;
}

function calculateEldritchBlastLevel(floor) {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][getTierForFloor(floor) - 1];
}

function calculateEldritchBlastDamage(floor) {
  return MINI_BOSS_HP_BY_TIER[getTierForFloor(floor)];
}

function calculateMinionMaxHP(originTier) {
  return MINION_HP_BY_TIER[Math.max(1, Math.min(10, originTier))];
}

function calculateMiniBossMaxHP(originTier) {
  return MINI_BOSS_MAX_HP_BY_ORIGIN_TIER[Math.max(1, Math.min(10, originTier))];
}

function calculateMegaBossMaxHP(originTier) {
  return MEGA_BOSS_MAX_HP_BY_ORIGIN_TIER[Math.max(1, Math.min(10, originTier))];
}

function getEnemyDamageProfile(enemy) {
  const tier = Math.max(1, Math.min(10, enemy.originTier || enemy.spawnTier || 1));
  const table = enemy.isMegaBoss
    ? MEGA_BOSS_DAMAGE_BY_TIER
    : (enemy.isBoss ? MINI_BOSS_DAMAGE_BY_TIER : MINION_DAMAGE_BY_TIER);
  return table[tier];
}

function splitDamageAcrossRays(totalDamage, rayCount) {
  const baseDamage = Math.floor(totalDamage / rayCount);
  const remainder = totalDamage % rayCount;
  return Array.from({ length: rayCount }, (_, index) => baseDamage + (index < remainder ? 1 : 0));
}

function getTierForFloor(floorNumber) {
  return Math.min(10, calculateTier(floorNumber));
}

function pickCumulativeEntry(list, tier) {
  return list[Math.floor(Math.random() * Math.min(tier, list.length))];
}

function getBossRoomMinionLimit(tier) {
  return 10 + (tier - 1);
}

function createMinion(floor, x, y, visionRange = 2) {
  const spawnTier = getTierForFloor(floor);
  const entry = pickCumulativeEntry(ENEMY_ROSTER.minion, spawnTier);
  const maxHp = calculateMinionMaxHP(entry.tier);
  return {
    id: Math.random().toString(36).substring(2, 9),
    x, y,
    startX: x, startY: y,
    name: entry.name,
    spriteSrc: entry.src,
    hp: maxHp,
    maxHp,
    originTier: entry.tier,
    spawnTier,
    category: entry.category,
    ac: 6 + calculateEnemyAttackBonus(floor),
    visionRange,
    attackRange: 1,
    ranged: !!entry.ranged,
    isMegaBoss: false,
    isBoss: false,
    size: 1,
    cells: [{ x, y }],
    fearCooldown: 0,
    stunned: false
  };
}

function getRandomDungeonDimensions(min = 10, max = 30, floorNumber = 1) {
  if (floorNumber % 10 === 0) {
    return { width: 15, height: 15 };
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
    this.pickups = [];
    this.isMerchantRoom = false;
    this.isBossRoom = false;
    this.turnCount = 0;
    this.dyingEnemies = [];

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
    this.maxHp = calculateLiorMaxHP(1);
    this.hp = this.maxHp;
    this.ac = calculateLiorAC(1);
    this.maxExtraHp = calculateMaxExtraHP(this.maxHp);
    this.extraHp = 0;
    this.stunned = false;
    this.gold = 0;
    this.kills = 0;
    this.minionKillsSincePotion = 0;

    this.ammoPistol = 0;
    this.ammoMusket = 0;
    this.ammoBlunderbuss = 0;
    this.unlockedWeapons = new Set([WEAPONS.SWORD.id]);
    this.equippedWeapon = WEAPONS.SWORD;
    this.weaponUpgrades = { sword: 0, pistol: 0, musket: 0, blunderbuss: 0 };
    this.highestMegaBossTierDefeated = 0;

    this.mistyStepCharges = 2;
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
    const availableWeapons = this.getAvailableWeapons();
    if (availableWeapons.length < 2) return;
    const currentIndex = availableWeapons.findIndex(weapon => weapon.id === this.equippedWeapon.id);
    this.equippedWeapon = availableWeapons[(Math.max(0, currentIndex) + 1) % availableWeapons.length];
  }

  getAvailableWeapons() {
    return Object.values(WEAPONS).filter(weapon => this.unlockedWeapons.has(weapon.id)
      && (!weapon.ammoProperty || this[weapon.ammoProperty] > 0));
  }

  ensureEquippedWeaponAvailable() {
    if (!this.getAvailableWeapons().some(weapon => weapon.id === this.equippedWeapon.id)) {
      this.equippedWeapon = WEAPONS.SWORD;
    }
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
    this.tier = getTierForFloor(this.floorNumber);

    if (this.dungeon.isMerchantRoom) {
      this.generateMerchantRoom();
      return;
    }

    this.dungeon.isBossRoom = this.floorNumber >= 10 && this.floorNumber <= 100 && this.floorNumber % 10 === 0;

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
    this.ensureInterestingCellsReachable();
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

    const isWall = !this.dungeon.isBossRoom && Math.random() < 0.20;
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

  placeMegaBoss() {
    const entry = ENEMY_ROSTER.megaBoss[Math.min(ENEMY_ROSTER.megaBoss.length, this.floorNumber / 10) - 1];
    const mx = 6;
    const my = 2;
    const bossCells = this.generateCells(mx, my, 4);
    bossCells.forEach(c => this.dungeon.setTile(c.x, c.y, TILE_FLOOR));

    const megaBossHp = calculateMegaBossMaxHP(entry.tier);

    this.dungeon.enemies.push({
      id: Math.random().toString(36).substring(2, 9),
      x: mx, y: my,
      startX: mx, startY: my,
      name: entry.name,
      spriteSrc: entry.src,
      hp: megaBossHp,
      maxHp: megaBossHp,
      originTier: entry.tier,
      spawnTier: getTierForFloor(this.floorNumber),
      category: entry.category,
      ac: 14 + calculateEnemyAttackBonus(this.floorNumber),
      visionRange: 4,
      attackRange: 8,
      bossAttackReady: true,
      isMegaBoss: true,
      isBoss: true,
      size: 4,
      cells: bossCells,
      fearCooldown: 0,
      stunned: false
    });
  }

  populateEnemies() {
    const isBossRoom = this.dungeon.isBossRoom;
    if (isBossRoom) this.placeMegaBoss();

    const count = isBossRoom ? getBossRoomMinionLimit(this.tier) : this.totalEnemies;
    let sequenceCounter = 0;

    for (let i = 0; i < count; i++) {
      const isBoss = !isBossRoom && sequenceCounter === 3 && this.dungeon.width >= 6 && this.dungeon.height >= 6;
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
          const entry = pickCumulativeEntry(ENEMY_ROSTER.miniBoss, this.tier);
          const miniBossHp = calculateMiniBossMaxHP(entry.tier);

          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: entry.name,
            spriteSrc: entry.src,
            hp: miniBossHp,
            maxHp: miniBossHp,
            originTier: entry.tier,
            spawnTier: this.tier,
            category: entry.category,
            ac: 8 + calculateEnemyAttackBonus(this.floorNumber),
            visionRange: 3,
            attackRange: 1.5,
            isMegaBoss: false,
            isBoss: true,
            size: 2,
            cells: candidateCells,
            fearCooldown: 0,
            stunned: false
          });
          sequenceCounter = 0;
        } else {
          this.dungeon.enemies.push(createMinion(this.floorNumber, rx, ry));
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

  getReachableCells() {
    const start = this.dungeon.entrance;
    const reachable = new Set([this.dungeon.getKey(start.x, start.y)]);
    const queue = [start];
    const directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

    for (let index = 0; index < queue.length; index++) {
      const current = queue[index];
      for (const direction of directions) {
        const next = { x: current.x + direction.x, y: current.y + direction.y };
        if (!this.dungeon.isInsideBounds(next.x, next.y) || this.dungeon.getTile(next.x, next.y) === TILE_WALL) continue;
        const key = this.dungeon.getKey(next.x, next.y);
        if (reachable.has(key)) continue;
        reachable.add(key);
        queue.push(next);
      }
    }
    return reachable;
  }

  findPathToReachable(start, reachable) {
    const entranceKey = this.dungeon.getKey(this.dungeon.entrance.x, this.dungeon.entrance.y);
    const exitKey = this.dungeon.getKey(this.dungeon.exit.x, this.dungeon.exit.y);
    const startKey = this.dungeon.getKey(start.x, start.y);
    const queue = [start];
    const parents = new Map([[startKey, null]]);
    const directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let destinationKey = null;

    for (let index = 0; index < queue.length; index++) {
      const current = queue[index];
      const currentKey = this.dungeon.getKey(current.x, current.y);
      if (reachable.has(currentKey)) {
        destinationKey = currentKey;
        break;
      }

      for (const direction of directions) {
        const next = { x: current.x + direction.x, y: current.y + direction.y };
        if (!this.dungeon.isInsideBounds(next.x, next.y)) continue;
        const key = this.dungeon.getKey(next.x, next.y);
        const onBoundary = next.x === 0 || next.x === this.dungeon.width - 1
          || next.y === 0 || next.y === this.dungeon.height - 1;
        if (onBoundary && key !== entranceKey && key !== exitKey && !reachable.has(key)) continue;
        if (parents.has(key)) continue;
        parents.set(key, currentKey);
        queue.push(next);
      }
    }

    if (destinationKey === null) return [];
    const path = [];
    for (let key = destinationKey; key !== null; key = parents.get(key)) {
      const [x, y] = key.split(",").map(Number);
      path.push({ x, y });
    }
    return path.reverse();
  }

  ensureInterestingCellsReachable() {
    const chestCells = [...this.dungeon.chests].map(key => {
      const [x, y] = key.split(",").map(Number);
      return { x, y };
    });
    const enemyCells = this.dungeon.enemies.flatMap(enemy => enemy.cells || []);
    const npcCells = this.dungeon.npcs.filter(npc => !npc.isMerchant).map(({ x, y }) => ({ x, y }));
    const targets = [this.dungeon.exit, ...chestCells, ...enemyCells, ...npcCells];
    let reachable = this.getReachableCells();

    for (const target of targets) {
      if (reachable.has(this.dungeon.getKey(target.x, target.y))) continue;
      const path = this.findPathToReachable(target, reachable);
      path.forEach(cell => {
        if (this.dungeon.getTile(cell.x, cell.y) === TILE_WALL) {
          this.dungeon.setTile(cell.x, cell.y, TILE_FLOOR);
        }
      });
      reachable = this.getReachableCells();
    }
  }
}

class CameraTransformer {
  static getBasis(direction) {
    const cardinal = ((direction % 4) + 4) % 4;
    return CAMERA_CARDINAL_BASIS[cardinal];
  }

  static screenToWorld(screenX, screenY, player) {
    const lateral = screenX - CAMERA_CONFIG.playerScreenX;
    const forward = CAMERA_CONFIG.playerScreenY - screenY;
    if (CAMERA_CONFIG.mode === "fixed") {
      return { x: player.x + lateral, y: player.y - forward };
    }
    const basis = CameraTransformer.getBasis(player.direction);
    return {
      x: player.x + basis.forward.x * forward + basis.right.x * lateral,
      y: player.y + basis.forward.y * forward + basis.right.y * lateral
    };
  }

  static worldToScreen(worldX, worldY, player) {
    const dx = worldX - player.x;
    const dy = worldY - player.y;
    if (CAMERA_CONFIG.mode === "fixed") {
      return { screenX: CAMERA_CONFIG.playerScreenX + dx, screenY: CAMERA_CONFIG.playerScreenY + dy };
    }
    const basis = CameraTransformer.getBasis(player.direction);
    const forward = dx * basis.forward.x + dy * basis.forward.y;
    const lateral = dx * basis.right.x + dy * basis.right.y;
    return {
      screenX: CAMERA_CONFIG.playerScreenX + lateral,
      screenY: CAMERA_CONFIG.playerScreenY - forward
    };
  }
}

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

function cellHash(x, y, salt = 0) {
  let h = (x * 374761393 + y * 668265263 + salt * 1442695041) | 0;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0);
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
    this.minimapCanvas = document.getElementById("minimap-canvas");
    this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext("2d") : null;

    this.terrainThemes = [
      {
        floorColor: "#141821",
        floorAltColors: ["#171c26", "#12161f", "#191f2a", "#151a24"],
        wallColor: "#282e3d",
        wallTopColor: "#394154",
        wallFrontColor: "#1d2230",
        boundaryColor: "#06080e",
        torchColor: "rgba(255, 148, 56, 0.24)",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_1/Dungeon_1.png"),
        wallCrops: [
          { x: 0, y: 0, w: 16, h: 16 },
          { x: 16, y: 0, w: 16, h: 16 },
          { x: 32, y: 0, w: 16, h: 16 },
          { x: 32, y: 16, w: 16, h: 16 },
          { x: 48, y: 16, w: 16, h: 16 }
        ],
        wallOverlayAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_1/Dungeon_1.png"),
        wallOverlayCrops: [
          { x: 96, y: 0, w: 16, h: 16 },
          { x: 112, y: 0, w: 16, h: 16 },
          { x: 144, y: 0, w: 16, h: 16 },
          { x: 96, y: 16, w: 16, h: 16 }
        ],
        floorOverlay1: this.loadTerrainTexture("Assets/Map/Dungeon_1/Grass_Type_1.png"),
        floorOverlay2: this.loadTerrainTexture("Assets/Map/Dungeon_1/Grass_Type_2.png"),
        pebbleCrops: [
          { x: 0, y: 144, w: 16, h: 16 },
          { x: 16, y: 144, w: 16, h: 16 },
          { x: 32, y: 144, w: 16, h: 16 },
          { x: 64, y: 144, w: 16, h: 16 }
        ],
        archCrop: { x: 0, y: 0, w: 48, h: 48 }
      },
      {
        floorColor: "#1f1612",
        floorAltColors: ["#241a15", "#1c1410", "#271c17", "#211813"],
        wallColor: "#4a2f1d",
        wallTopColor: "#5e3d28",
        wallFrontColor: "#332014",
        boundaryColor: "#0a0705",
        torchColor: "rgba(255, 160, 66, 0.25)",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_2/Dungeon_2.png"),
        wallCrops: [
          { x: 0, y: 0, w: 16, h: 16 },
          { x: 16, y: 0, w: 16, h: 16 },
          { x: 32, y: 0, w: 16, h: 16 },
          { x: 32, y: 16, w: 16, h: 16 },
          { x: 48, y: 16, w: 16, h: 16 }
        ],
        wallOverlayAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_2/Dungeon_2_Wall_Additions.png"),
        wallOverlayCrops: [
          { x: 0, y: 0, w: 32, h: 16 },
          { x: 32, y: 0, w: 32, h: 16 },
          { x: 64, y: 0, w: 32, h: 16 }
        ],
        floorOverlay1: this.loadTerrainTexture("Assets/Map/Dungeon_2/Grass_Type_1.png"),
        floorOverlay2: this.loadTerrainTexture("Assets/Map/Dungeon_2/Grass_Type_2.png"),
        pebbleCrops: [
          { x: 0, y: 192, w: 16, h: 16 },
          { x: 16, y: 192, w: 16, h: 16 },
          { x: 48, y: 192, w: 16, h: 16 }
        ],
        archCrop: { x: 0, y: 0, w: 48, h: 48 }
      },
      {
        floorColor: "#121a2b",
        floorAltColors: ["#151e31", "#101726", "#182238", "#131c2e"],
        wallColor: "#293b57",
        wallTopColor: "#3c5275",
        wallFrontColor: "#1b273b",
        boundaryColor: "#060b14",
        torchColor: "rgba(155, 195, 255, 0.24)",
        wallAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_3/Dungeon_3.png"),
        wallCrops: [
          { x: 96, y: 0, w: 16, h: 16 },
          { x: 112, y: 0, w: 16, h: 16 },
          { x: 128, y: 0, w: 16, h: 16 },
          { x: 96, y: 16, w: 16, h: 16 },
          { x: 128, y: 16, w: 16, h: 16 }
        ],
        wallOverlayAtlas: this.loadTerrainTexture("Assets/Map/Dungeon_3/Dungeon3_Wall_Additions.png"),
        wallOverlayCrops: [
          { x: 0, y: 0, w: 32, h: 32 },
          { x: 32, y: 0, w: 32, h: 32 },
          { x: 64, y: 0, w: 32, h: 32 }
        ],
        floorOverlay1: this.loadTerrainTexture("Assets/Map/Dungeon_3/Snow_Type_1.png"),
        floorOverlay2: this.loadTerrainTexture("Assets/Map/Dungeon_3/Snow_type_2.png"),
        pebbleCrops: [
          { x: 208, y: 192, w: 16, h: 16 },
          { x: 224, y: 192, w: 16, h: 16 },
          { x: 208, y: 208, w: 16, h: 16 }
        ],
        archCrop: { x: 96, y: 0, w: 48, h: 48 }
      }
    ];
    this.mapDecorations = {
      chests: this.loadTerrainTexture("Assets/Map/Chests/Treasure_Chests(16x16).png"),
      pickups: this.loadTerrainTexture("Assets/Map/PowerUps/PickUp_Items-Sheet.png"),
      mushrooms: this.loadTerrainTexture("Assets/Map/Animated Mushrooms/Dungeon_Animated_Mushrooms.png"),
      uiBallsy: this.loadTerrainTexture("Assets/Map/UI/UI_Ballsy.png")
    };
    this.goldenBunnySheet = this.loadTerrainTexture("Assets/Enemy/Golden-bunny.jpg");
    this.merchantSpriteSheet = this.loadTerrainTexture("Assets/Enemy/merchant.png");
    this.keyedSpriteCache = new Map();

    this.liorSheet = this.loadTerrainTexture("Assets/Lior/lior.png");
    this.lior2Sheet = this.loadTerrainTexture("Assets/Lior/lior2.png");
    this.effectImages = Object.fromEntries(
      Object.entries(EFFECT_SHEETS).map(([key, config]) => [key, this.loadTerrainTexture(config.src)])
    );
    this.enemyImages = new Map();
    const projectileSheet = this.loadTerrainTexture(PROJECTILE_SHEET.src);
    this.enemyImages.set(PROJECTILE_SHEET.src, projectileSheet);
    projectileSheet.addEventListener("load", () => this.getProjectileSprite("small", 1));
    this.enemyAnimCache = new Map();
    this.enemyProjectiles = [];
    this.animUntil = 0;
    this.animLoopActive = false;

    this.playerAnimation = null;
    this.playerAnimationFrame = null;
    this.chestOpening = null;
    this.chestOpeningFrame = null;
    this.damageFlashUntil = 0;
    this.floatingNumbers = [];

    this.cameraAnchor = { x: 7, y: 4 };
    this.cameraFacing = player.direction;
    this.cameraOffset = { x: 0, y: 0 };
    this.lastCameraTick = 0;
    this.cameraMode = "fixed";
    this.isPortraitBlocked = false;

    this.setCameraMode("fixed", false);
    this.updateOrientationState();

    let resizeTimer = null;
    const onViewportChange = () => {
      this.updateOrientationState();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateOrientationState();
        this.setCameraMode("fixed", false);
      }, 60);
    };
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);

    setInterval(() => {
      if (!this.playerAnimation && !this.chestOpening) this.draw();
    }, 100);
  }

  static detectCameraMode() {
    return "fixed";
  }

  static isPortraitViewport() {
    return window.innerHeight > window.innerWidth;
  }

  updateOrientationState() {
    const portrait = Renderer.isPortraitViewport();
    this.isPortraitBlocked = portrait;
    const overlay = document.getElementById("rotate-device-overlay");
    if (overlay) {
      overlay.classList.toggle("hidden", !portrait);
    }
    if (portrait && this.game?.touchController) {
      this.game.touchController.cancelAllGestures();
    }
  }

  computeResponsiveProfile() {
    const vw = Math.max(320, window.innerWidth || 640);
    const vh = Math.max(220, window.innerHeight || 360);
    const isPortrait = vh > vw;
    const effW = isPortrait ? vh : vw;
    const effH = isPortrait ? vw : vh;
    const aspect = Math.max(1.2, Math.min(2.6, effW / Math.max(1, effH)));

    const rows = aspect >= 1.65 ? 9 : 11;
    const tileSize = Math.max(36, Math.min(64, Math.floor(effH / rows)));
    let cols = Math.max(11, Math.min(25, Math.round(rows * aspect)));
    if (cols % 2 === 0) cols += 1;

    const anchorX = Math.floor(cols / 2);
    const anchorY = Math.floor(rows / 2);
    const anchors = [
      { x: anchorX, y: anchorY },
      { x: anchorX, y: anchorY },
      { x: anchorX, y: anchorY },
      { x: anchorX, y: anchorY }
    ];
    return { cols, rows, tileSize, anchors };
  }

  setCameraMode(mode = "fixed", animate = false) {
    const profile = this.computeResponsiveProfile();
    CAMERA_PROFILES.fixed = profile;
    CAMERA_PROFILES.classic = profile;
    this.cameraMode = "fixed";
    CAMERA_CONFIG.mode = "fixed";
    CAMERA_CONFIG.cols = profile.cols;
    CAMERA_CONFIG.rows = profile.rows;
    CAMERA_CONFIG.tileSize = profile.tileSize;

    this.canvas.width = profile.cols * profile.tileSize;
    this.canvas.height = profile.rows * profile.tileSize;
    this.canvas.style.aspectRatio = `${profile.cols} / ${profile.rows}`;
    document.body.classList.add("mode-landscape");

    this.snapCamera();

    if (animate) {
      this.canvas.classList.remove("viewport-morph");
      void this.canvas.offsetWidth;
      this.canvas.classList.add("viewport-morph");
    }
    this.draw();
  }

  snapCamera() {
    this.cameraFacing = this.player.direction;
    const anchors = CAMERA_PROFILES.fixed.anchors;
    const anchor = anchors[this.cameraFacing] || anchors[0];
    this.cameraAnchor = { ...anchor };
    CAMERA_CONFIG.playerScreenX = anchor.x;
    CAMERA_CONFIG.playerScreenY = anchor.y;
    this.cameraOffset = { x: 0, y: 0 };
  }

  commitCameraFacing() {
    if (this.cameraFacing === this.player.direction) return;
    this.cameraFacing = this.player.direction;
    this.lastCameraTick = performance.now();
    this.keepAnimating(400);
  }

  updateCamera(now) {
    const anchors = CAMERA_PROFILES.fixed.anchors;
    const target = anchors[this.cameraFacing] || anchors[0];
    const anchor = this.cameraAnchor;
    const dt = Math.min(100, Math.max(0, now - (this.lastCameraTick || now)));
    this.lastCameraTick = now;
    const blend = 1 - Math.exp(-dt / 70);
    anchor.x += (target.x - anchor.x) * blend;
    anchor.y += (target.y - anchor.y) * blend;
    if (Math.abs(target.x - anchor.x) < 0.01 && Math.abs(target.y - anchor.y) < 0.01) {
      anchor.x = target.x;
      anchor.y = target.y;
    } else {
      this.keepAnimating(100);
    }

    CAMERA_CONFIG.playerScreenX = Math.round(anchor.x);
    CAMERA_CONFIG.playerScreenY = Math.round(anchor.y);
    this.cameraOffset = {
      x: (anchor.x - CAMERA_CONFIG.playerScreenX) * CAMERA_CONFIG.tileSize,
      y: (anchor.y - CAMERA_CONFIG.playerScreenY) * CAMERA_CONFIG.tileSize
    };
  }

  getLiorFacing() {
    return CAMERA_CONFIG.mode === "fixed" ? this.player.direction : 0;
  }

  getFacingAngle() {
    return CAMERA_CONFIG.mode === "fixed" ? this.player.direction * Math.PI / 2 : 0;
  }

  getLiorRow(name, count = 0) {
    const frames = LIOR_FACING_FRAMES[this.getLiorFacing()]?.[name] ?? LIOR_SPRITES[name];
    if (!count || count === frames.length) return frames;
    return Array.from({ length: count }, (_, i) => frames[Math.floor(i * frames.length / count)]);
  }

  loadTerrainTexture(src) {
    const image = new Image();
    image.addEventListener("load", () => this.draw());
    image.src = src;
    return image;
  }

  static isMagentaPixel(r, g, b) {
    const minRB = Math.min(r, b);
    if (minRB < 70 || Math.abs(r - b) > 70) return false;
    if (g < minRB * 0.45) return true;
    return r > 200 && b > 200 && g < minRB - 35;
  }

  static isBackgroundPixel(r, g, b, bgRef) {
    if (Renderer.isMagentaPixel(r, g, b)) return true;
    return !!bgRef && Math.abs(r - bgRef[0]) + Math.abs(g - bgRef[1]) + Math.abs(b - bgRef[2]) < 60;
  }

  static getBackgroundReference(data) {
    const r = data[0], g = data[1], b = data[2];
    return Renderer.isMagentaPixel(r, g, b) || data[3] === 0 ? null : [r, g, b];
  }

  /**
   * Recorta únicamente el espacio transparente sobrante sin cortar ningún píxel visible,
   * y calcula el punto de anclaje estable de los pies (footAnchorX, footAnchorY) para evitar
   * saltos laterales o verticales cuando armas, capas o efectos sobresalen del cuerpo.
   */
  trimCanvas(sprite) {
    const { width, height } = sprite;
    const spriteCtx = sprite.getContext("2d", { willReadFrequently: true });
    const { data } = spriteCtx.getImageData(0, 0, width, height);
    const rows = new Uint32Array(height);
    const cols = new Uint32Array(width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 16) {
          rows[y]++;
          cols[x]++;
        }
      }
    }
    let minY = 0, maxY = height - 1, minX = 0, maxX = width - 1;
    while (minY < maxY && rows[minY] < 1) minY++;
    while (maxY > minY && rows[maxY] < 1) maxY--;
    while (minX < maxX && cols[minX] < 1) minX++;
    while (maxX > minX && cols[maxX] < 1) maxX--;

    const trimmedW = Math.max(1, maxX - minX + 1);
    const trimmedH = Math.max(1, maxY - minY + 1);
    const trimmed = document.createElement("canvas");
    trimmed.width = trimmedW;
    trimmed.height = trimmedH;
    trimmed.getContext("2d").drawImage(sprite, minX, minY, trimmedW, trimmedH, 0, 0, trimmedW, trimmedH);

    // Calcular el centro horizontal estable de los pies/base en el 15% inferior del sprite recortado
    const footBandStart = Math.max(minY, maxY - Math.max(4, Math.floor(trimmedH * 0.14)));
    let footMinX = maxX;
    let footMaxX = minX;
    let foundFoot = false;
    for (let x = minX; x <= maxX; x++) {
      let colCount = 0;
      for (let y = footBandStart; y <= maxY; y++) {
        if (data[(y * width + x) * 4 + 3] > 28) colCount++;
      }
      if (colCount >= 2) {
        if (x < footMinX) footMinX = x;
        if (x > footMaxX) footMaxX = x;
        foundFoot = true;
      }
    }

    trimmed.trimLeft = minX;
    trimmed.trimTop = minY;
    trimmed.sourceWidth = width;
    trimmed.sourceHeight = height;
    trimmed.footAnchorX = foundFoot ? ((footMinX + footMaxX) / 2 - minX) : (trimmedW / 2);
    trimmed.footAnchorY = trimmedH;
    return trimmed;
  }

  getKeyedSprite(sheet, sourceRect, backgroundType, options = {}) {
    if (!sheet.complete || sheet.naturalWidth === 0) return null;
    const cacheKey = `${sheet.src}:${sourceRect.x},${sourceRect.y},${sourceRect.w},${sourceRect.h}:${backgroundType}:${options.trim ? 1 : 0}:${options.bgRef || ""}`;
    if (this.keyedSpriteCache.has(cacheKey)) return this.keyedSpriteCache.get(cacheKey);

    const sprite = document.createElement("canvas");
    sprite.width = Math.max(1, Math.round(sourceRect.w));
    sprite.height = Math.max(1, Math.round(sourceRect.h));
    const spriteCtx = sprite.getContext("2d", { willReadFrequently: true });
    spriteCtx.drawImage(sheet, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h,
      0, 0, sprite.width, sprite.height);

    if (backgroundType !== "alpha") {
      const imageData = spriteCtx.getImageData(0, 0, sprite.width, sprite.height);
      const { data } = imageData;

      if (backgroundType === "magenta") {
        for (let offset = 0; offset < data.length; offset += 4) {
          if (Renderer.isBackgroundPixel(data[offset], data[offset + 1], data[offset + 2], options.bgRef)) {
            data[offset + 3] = 0;
          }
        }
      } else {
        this.floodKeyBackground(data, sprite.width, sprite.height, backgroundType);
      }
      spriteCtx.putImageData(imageData, 0, 0);
    }

    const result = options.trim ? this.trimCanvas(sprite) : sprite;
    this.keyedSpriteCache.set(cacheKey, result);
    return result;
  }

  floodKeyBackground(data, width, height, backgroundType) {
    const visited = new Uint8Array(width * height);
    const queue = new Int32Array(width * height);
    const background = backgroundType === "gray"
      ? [data[0], data[1], data[2]]
      : [0, 0, 0];
    const isBackground = (pixel) => {
      const offset = pixel * 4;
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
    for (let x = 0; x < width; x++) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }

    for (let head = 0; head < queueEnd; head++) {
      const pixel = queue[head];
      data[pixel * 4 + 3] = 0;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      if (x > 0) enqueue(pixel - 1);
      if (x + 1 < width) enqueue(pixel + 1);
      if (y > 0) enqueue(pixel - width);
      if (y + 1 < height) enqueue(pixel + width);
    }
  }

  static findRuns(counts, minCount, maxGap) {
    const runs = [];
    let current = null;
    for (let i = 0; i < counts.length; i++) {
      if (counts[i] < minCount) continue;
      if (current && i - current.end - 1 <= maxGap) current.end = i;
      else { current = { start: i, end: i }; runs.push(current); }
    }
    return runs;
  }

  static mergeNarrowRuns(runs) {
    const widths = runs.map(r => r.end - r.start + 1).sort((a, b) => a - b);
    const median = widths[Math.floor(widths.length / 2)] || 0;
    const result = [...runs];
    for (let i = 0; i < result.length && result.length > 1;) {
      const run = result[i];
      if (run.end - run.start + 1 >= median * 0.3) { i++; continue; }
      const prevGap = i > 0 ? run.start - result[i - 1].end : Infinity;
      const nextGap = i < result.length - 1 ? result[i + 1].start - run.end : Infinity;
      const neighbor = prevGap <= nextGap ? result[i - 1] : result[i + 1];
      neighbor.start = Math.min(neighbor.start, run.start);
      neighbor.end = Math.max(neighbor.end, run.end);
      result.splice(i, 1);
    }
    return result;
  }

  segmentSheet(image, { rowGap = 1, colGap = 2, mergeNarrow = true, denseFractions = [0.06, 0.15], trimFrames = true } = {}) {
    const STEP = 4;
    const width = Math.floor(image.naturalWidth / STEP);
    const height = Math.floor(image.naturalHeight / STEP);
    if (width < 4 || height < 4) return null;

    const probe = document.createElement("canvas");
    probe.width = width;
    probe.height = height;
    const probeCtx = probe.getContext("2d", { willReadFrequently: true });
    probeCtx.drawImage(image, 0, 0, width, height);
    const { data } = probeCtx.getImageData(0, 0, width, height);
    const bgRef = Renderer.getBackgroundReference(data);

    const solid = new Uint8Array(width * height);
    const rowCounts = new Uint32Array(height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        if (!Renderer.isBackgroundPixel(data[i * 4], data[i * 4 + 1], data[i * 4 + 2], bgRef)) {
          solid[i] = 1;
          rowCounts[y]++;
        }
      }
    }

    let bands = Renderer.findRuns(rowCounts, 3, rowGap);
    const tallest = bands.reduce((max, b) => Math.max(max, b.end - b.start + 1), 0);
    bands = bands.filter(b => b.end - b.start + 1 >= tallest * 0.2);

    const rows = bands.map(band => {
      const colCounts = new Uint32Array(width);
      for (let y = band.start; y <= band.end; y++) {
        for (let x = 0; x < width; x++) colCounts[x] += solid[y * width + x];
      }
      const bandSteps = band.end - band.start + 1;
      let segments = Renderer.findRuns(colCounts, 2, colGap);
      if (mergeNarrow && segments.length > 1) segments = Renderer.mergeNarrowRuns(segments);
      const widthVariation = runs => {
        const widths = runs.map(r => r.end - r.start + 1);
        const mean = widths.reduce((a, b) => a + b, 0) / widths.length;
        return Math.sqrt(widths.reduce((a, w) => a + (w - mean) ** 2, 0) / widths.length) / mean;
      };
      for (const fraction of denseFractions) {
        let dense = Renderer.findRuns(colCounts, Math.max(2, Math.ceil(fraction * bandSteps)), colGap);
        if (mergeNarrow && dense.length > 1) dense = Renderer.mergeNarrowRuns(dense);
        const better = segments.length < 3
          ? dense.length > segments.length
          : dense.length >= 3 && widthVariation(dense) < widthVariation(segments) * 0.6;
        if (!better) continue;

        let first = 0;
        while (first < width - 1 && colCounts[first] < 2) first++;
        let last = width - 1;
        while (last > first && colCounts[last] < 2) last--;
        const cuts = [first];
        for (let i = 1; i < dense.length; i++) {
          const from = dense[i - 1].end, to = dense[i].start;
          const center = (from + to) / 2;
          let cut = Math.floor(center);
          for (let x = from; x <= to; x++) {
            if (colCounts[x] < colCounts[cut] || (colCounts[x] === colCounts[cut] && Math.abs(x - center) < Math.abs(cut - center))) cut = x;
          }
          cuts.push(cut);
        }
        cuts.push(last);
        segments = dense.map((_, i) => ({ start: cuts[i], end: cuts[i + 1] }));
      }
      const y0 = Math.max(0, band.start * STEP - 2);
      const y1 = Math.min(image.naturalHeight, (band.end + 1) * STEP + 2);
      return segments.map(segment => {
        const x0 = Math.max(0, segment.start * STEP - 2);
        const x1 = Math.min(image.naturalWidth, (segment.end + 1) * STEP + 2);
        return this.getKeyedSprite(image, { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, "magenta", { bgRef, trim: trimFrames });
      }).filter(Boolean);
    }).filter(frames => frames.length > 0);

    return rows.length > 0 ? rows : null;
  }

  loadSheetImage(src) {
    let image = this.enemyImages.get(src);
    if (!image) {
      image = this.loadTerrainTexture(src);
      this.enemyImages.set(src, image);
    }
    return image.complete && image.naturalWidth > 0 ? image : null;
  }

  getEnemyAnimation(src) {
    if (this.enemyAnimCache.has(src)) return this.enemyAnimCache.get(src);
    const image = this.loadSheetImage(src);
    if (!image) return null;

    const rows = this.segmentSheet(image, { trimFrames: true });
    let animation = null;
    if (rows) {
      const idle = rows[0];
      const attack = rows.length > 1 ? rows[1] : idle;
      const last = rows.length > 2 ? rows[rows.length - 1] : attack;
      const hurtCount = last.length > 2 ? Math.min(2, Math.ceil(last.length / 2)) : last.length;
      animation = {
        idle,
        attack,
        hurt: last.slice(0, hurtCount),
        death: last.length > 2 ? last.slice(hurtCount) : last,
        refWidth: Math.max(...idle.map(f => f.width)),
        refHeight: Math.max(...idle.map(f => f.height))
      };
    }
    this.enemyAnimCache.set(src, animation);
    return animation;
  }

  getEnemyDeathDuration(enemy) {
    const animation = this.getEnemyAnimation(enemy.spriteSrc);
    return (animation ? animation.death.length : 4) * ENEMY_ANIM_MS.death + 250;
  }

  playEnemyAnim(enemy, state) {
    if (!enemy || enemy.anim?.state === "death") return;
    enemy.anim = { state, startedAt: performance.now() };
    this.keepAnimating(ENEMY_ANIM_MS[state] * 8);
  }

  startEnemyDeath(enemy) {
    enemy.anim = { state: "death", startedAt: performance.now() };
    if (!this.dungeon.dyingEnemies.includes(enemy)) this.dungeon.dyingEnemies.push(enemy);
    this.keepAnimating(this.getEnemyDeathDuration(enemy) + 100);
  }

  pruneDyingEnemies(now) {
    this.dungeon.dyingEnemies = this.dungeon.dyingEnemies.filter(
      enemy => now - enemy.anim.startedAt < this.getEnemyDeathDuration(enemy)
    );
  }

  keepAnimating(durationMs) {
    this.animUntil = Math.max(this.animUntil, performance.now() + durationMs);
    if (this.animLoopActive) return;
    this.animLoopActive = true;
    const step = () => {
      this.draw();
      if (performance.now() < this.animUntil) requestAnimationFrame(step);
      else this.animLoopActive = false;
    };
    requestAnimationFrame(step);
  }

  showFloatingNumber(x, y, text, type) {
    this.floatingNumbers.push({ x, y, text, type, startedAt: performance.now() });
    this.keepAnimating(1000);
  }

  drawFloatingNumbers(targetCtx, now) {
    this.floatingNumbers = this.floatingNumbers.filter(number => now - number.startedAt < 1000);
    const tileSize = CAMERA_CONFIG.tileSize;
    const placedLabels = [];
    const startingAngles = { damage: -Math.PI / 2, gold: -Math.PI / 4, healing: -3 * Math.PI / 4 };
    this.floatingNumbers.forEach((number, index) => {
      const progress = Math.min(1, (now - number.startedAt) / 1000);
      const { screenX, screenY } = CameraTransformer.worldToScreen(number.x, number.y, this.player);
      const anchorX = (screenX + 0.5) * tileSize;
      const anchorY = (screenY + 0.3 - progress * 0.5) * tileSize;

      targetCtx.save();
      targetCtx.globalAlpha = 1 - progress;
      targetCtx.font = "bold 11px monospace";
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.lineWidth = 2.5;
      targetCtx.strokeStyle = "#101010";
      const labelWidth = targetCtx.measureText(number.text).width + 6;
      const labelHeight = 16;
      const angleStart = startingAngles[number.type] ?? startingAngles.damage;
      let position = null;
      for (let ring = 0; !position; ring++) {
        const radius = 0.8 + Math.floor(ring / 8) * 0.45;
        const angle = angleStart + (ring % 8) * (Math.PI * 2 / 8) + (index % 3) * 0.12;
        const candidate = {
          x: anchorX + Math.cos(angle) * radius * tileSize,
          y: anchorY + Math.sin(angle) * radius * tileSize
        };
        if (!placedLabels.some(label =>
          Math.abs(candidate.x - label.x) * 2 < labelWidth + label.width
          && Math.abs(candidate.y - label.y) * 2 < labelHeight + label.height
        )) position = candidate;
      }
      placedLabels.push({ x: position.x, y: position.y, width: labelWidth, height: labelHeight });
      targetCtx.fillStyle = number.type === "healing"
        ? "#5cff78"
        : (number.type === "gold" ? "#ffdf55" : "#ff5757");
      targetCtx.strokeText(number.text, position.x, position.y);
      targetCtx.fillText(number.text, position.x, position.y);
      targetCtx.restore();
    });
  }

  getEnemyFrame(enemy, animation, now) {
    const state = enemy.anim;
    if (state) {
      const frames = animation[state.state];
      const index = Math.floor((now - state.startedAt) / ENEMY_ANIM_MS[state.state]);
      if (index < frames.length) return frames[index];
      if (state.state === "death") return frames[frames.length - 1];
      enemy.anim = null;
    }
    enemy.animOffset ??= Math.random() * 1000;
    return animation.idle[Math.floor((now + enemy.animOffset) / ENEMY_ANIM_MS.idle) % animation.idle.length];
  }

  getProjectileSprite(caliber, phase) {
    if (this.projectileRows === undefined) {
      const image = this.loadSheetImage(PROJECTILE_SHEET.src);
      if (!image) return null;
      this.projectileRows = this.segmentSheet(image, {
        rowGap: Math.floor(image.naturalHeight / 4 * 0.05),
        colGap: Math.floor(image.naturalWidth / 4 * 0.1),
        mergeNarrow: false,
        denseFractions: [],
        trimFrames: true
      });
    }
    return this.projectileRows?.[PROJECTILE_SHEET.rows[caliber]]?.[phase] ?? null;
  }

  fireEnemyProjectile(enemy, hit) {
    const caliber = enemy.isMegaBoss || enemy.size >= 4 ? "large" : (enemy.size === 2 ? "medium" : "small");
    const cells = enemy.cells;
    const from = {
      x: cells.reduce((sum, c) => sum + c.x, 0) / cells.length,
      y: cells.reduce((sum, c) => sum + c.y, 0) / cells.length
    };
    const to = { x: this.player.x, y: this.player.y };
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const travelMs = Math.min(420, 150 + distance * 70);

    if (!hit && distance > 0) {
      const overshoot = 1.5 / distance;
      to.x += (to.x - from.x) * overshoot;
      to.y += (to.y - from.y) * overshoot;
    }

    const launchAt = performance.now() + PROJECTILE_LAUNCH_DELAY_MS;
    this.enemyProjectiles.push({ caliber, from, to, hit, launchAt, travelMs });
    this.keepAnimating(PROJECTILE_LAUNCH_DELAY_MS + travelMs + PROJECTILE_IMPACT_MS + 100);
    return PROJECTILE_LAUNCH_DELAY_MS + travelMs + (hit ? PROJECTILE_IMPACT_MS : 0);
  }

  drawEnemyProjectiles(targetCtx, now) {
    const tileSize = CAMERA_CONFIG.tileSize;
    const toScreen = point => {
      const { screenX, screenY } = CameraTransformer.worldToScreen(point.x, point.y, this.player);
      return { x: (screenX + 0.5) * tileSize, y: (screenY + 0.5) * tileSize };
    };
    const drawSprite = (sprite, center, sizeTiles, angle, alpha = 1) => {
      if (!sprite) return false;
      const scale = (sizeTiles * tileSize) / Math.max(sprite.width, sprite.height);
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.globalAlpha = alpha;
      targetCtx.translate(center.x, center.y);
      targetCtx.rotate(angle);
      targetCtx.drawImage(sprite, -sprite.width * scale / 2, -sprite.height * scale / 2,
        sprite.width * scale, sprite.height * scale);
      targetCtx.restore();
      return true;
    };

    this.enemyProjectiles = this.enemyProjectiles.filter(shot => {
      const flightEnd = shot.launchAt + shot.travelMs;
      return now < flightEnd + (shot.hit ? PROJECTILE_IMPACT_MS : 0);
    });

    this.enemyProjectiles.forEach(shot => {
      if (now < shot.launchAt) return;
      const size = PROJECTILE_SHEET.sizes[shot.caliber];
      const origin = toScreen(shot.from);
      const target = toScreen(shot.to);
      const flightEnd = shot.launchAt + shot.travelMs;

      if (now < flightEnd) {
        const t = (now - shot.launchAt) / shot.travelMs;
        const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
        const center = { x: origin.x + (target.x - origin.x) * t, y: origin.y + (target.y - origin.y) * t };
        if (!drawSprite(this.getProjectileSprite(shot.caliber, 1), center, size, angle)) {
          targetCtx.fillStyle = "#ffb347";
          targetCtx.beginPath();
          targetCtx.arc(center.x, center.y, size * tileSize * 0.25, 0, Math.PI * 2);
          targetCtx.fill();
        }
        return;
      }

      const progress = (now - flightEnd) / PROJECTILE_IMPACT_MS;
      if (!drawSprite(this.getProjectileSprite(shot.caliber, 2), target, size * 1.3, 0, 1 - progress * 0.5)) {
        targetCtx.save();
        targetCtx.globalAlpha = 1 - progress;
        targetCtx.fillStyle = "#ffffff";
        targetCtx.beginPath();
        targetCtx.arc(target.x, target.y, size * tileSize * 0.5, 0, Math.PI * 2);
        targetCtx.fill();
        targetCtx.restore();
      }
    });
  }

  getLiorFrame(rect) {
    const sheet = rect.sheet === "lior2" ? this.lior2Sheet : this.liorSheet;
    return this.getKeyedSprite(sheet, rect, "alpha", { trim: true });
  }

  getEffectSprite(sheetKey, phase) {
    const config = EFFECT_SHEETS[sheetKey];
    const image = this.effectImages[sheetKey];
    if (!image.complete || image.naturalWidth === 0) return null;

    let rect;
    if (config.panels) {
      rect = config.panels[phase];
    } else {
      const frameWidth = image.naturalWidth / config.cols;
      rect = { x: Math.floor(frameWidth * phase), y: 0, w: Math.floor(frameWidth), h: image.naturalHeight };
    }
    return this.getKeyedSprite(image, rect, "magenta", { trim: config.trim });
  }

  drawEnemySprite(targetCtx, enemy, px, py) {
    const animation = this.getEnemyAnimation(enemy.spriteSrc);
    const tileSize = CAMERA_CONFIG.tileSize;
    const drawSize = enemy.size * tileSize;

    if (!animation) {
      targetCtx.fillStyle = enemy.isBoss ? "#cc0029" : "#ff3333";
      targetCtx.fillRect(px + 2, py + 2, drawSize - 4, drawSize - 4);
      return;
    }

    const sprite = this.getEnemyFrame(enemy, animation, performance.now());
    const scale = Math.min(drawSize / animation.refWidth, drawSize / animation.refHeight);
    const width = sprite.width * scale;
    const height = sprite.height * scale;
    const anchorX = (sprite.footAnchorX ?? sprite.width / 2) * scale;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    // Sombra elíptica sutil bajo los pies del enemigo
    targetCtx.fillStyle = "rgba(0, 0, 0, 0.38)";
    targetCtx.beginPath();
    targetCtx.ellipse(px + drawSize / 2, py + drawSize - 3, drawSize * 0.32, drawSize * 0.11, 0, 0, Math.PI * 2);
    targetCtx.fill();

    const drawX = Math.max(px - drawSize * 0.25, Math.min(px + drawSize * 1.25 - width, px + drawSize / 2 - anchorX));
    targetCtx.drawImage(sprite, drawX, py + drawSize - height, width, height);
    targetCtx.restore();
  }

  drawGoldenBunny(targetCtx, bunny, screenX, screenY) {
    const fleeing = bunny.isFleeing;
    const frame = fleeing
      ? BUNNY_SPRITES.bunnyFlee[Math.floor((performance.now() - bunny.fleeStartedAt) / 120) % BUNNY_SPRITES.bunnyFlee.length]
      : BUNNY_SPRITES.bunnyIdle;
    const sprite = this.getKeyedSprite(this.goldenBunnySheet, frame, "black", { trim: true });
    if (!sprite) return;

    const tileSize = CAMERA_CONFIG.tileSize;
    const scale = Math.min((tileSize * 0.88) / sprite.width, (tileSize * 0.88) / sprite.height);
    const width = sprite.width * scale;
    const height = sprite.height * scale;
    const px = screenX * tileSize + (tileSize - width) / 2;
    const py = screenY * tileSize + tileSize - height - 2;
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
    const sprite = this.getKeyedSprite(this.merchantSpriteSheet, frame, "gray", { trim: true });
    if (sprite) {
      const height = tileSize * 1.22;
      const width = height * (sprite.width / sprite.height);
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
      targetCtx.beginPath();
      targetCtx.ellipse(px + tileSize / 2, py + tileSize - 3, tileSize * 0.34, tileSize * 0.12, 0, 0, Math.PI * 2);
      targetCtx.fill();
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

  /**
   * Mejora estética del escenario (exclusivamente visual, sin cambiar geometría ni colisiones):
   * - Losas de piedra con variaciones tonales deterministas, juntas de mortero y grietas finas.
   * - Variaciones de musgo/raíces/escarcha desde Grass_Type_1/2 y Snow_Type_1/2 en bordes junto a muros.
   * - Muros con relieve 3D frontal, sombras proyectadas y detalles de Wall_Additions.
   * - Antorchas animadas en muros adyacentes a pasillos/puertas con halo cálido (como en el Panel 13).
   * - Pequeños hongos luminiscentes animados en esquinas de muro (Dungeon_Animated_Mushrooms.png).
   */
  drawEnhancedFloorCell(targetCtx, theme, wx, wy, px, py, tileSize, inLineOfSight, now) {
    const opacity = inLineOfSight ? 1 : 0.42;
    const h = cellHash(wx, wy, this.generator?.floorNumber || 1);
    const slabColor = theme.floorAltColors[h % theme.floorAltColors.length] || theme.floorColor;

    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.fillStyle = slabColor;
    targetCtx.fillRect(px, py, tileSize, tileSize);

    // Subdivisión de losas de piedra estilo Panel 13 (bloques irregulares con bisel oscuro/claro)
    const splitX = Math.floor(tileSize * (0.42 + ((h >> 4) % 16) * 0.01));
    const splitY = Math.floor(tileSize * (0.46 + ((h >> 8) % 14) * 0.01));
    targetCtx.strokeStyle = "rgba(7, 9, 15, 0.62)";
    targetCtx.lineWidth = 1;
    targetCtx.strokeRect(px + 0.5, py + 0.5, tileSize - 1, tileSize - 1);
    targetCtx.beginPath();
    targetCtx.moveTo(px + splitX, py + 1);
    targetCtx.lineTo(px + splitX, py + splitY);
    targetCtx.moveTo(px + 1, py + splitY);
    targetCtx.lineTo(px + tileSize - 1, py + splitY);
    targetCtx.moveTo(px + (tileSize - splitX), py + splitY);
    targetCtx.lineTo(px + (tileSize - splitX), py + tileSize - 1);
    targetCtx.stroke();

    // Brillo de borde superior en las losas
    targetCtx.strokeStyle = "rgba(180, 195, 230, 0.06)";
    targetCtx.beginPath();
    targetCtx.moveTo(px + 2, py + 1.5);
    targetCtx.lineTo(px + tileSize - 2, py + 1.5);
    targetCtx.moveTo(px + 2, py + splitY + 1.5);
    targetCtx.lineTo(px + tileSize - 2, py + splitY + 1.5);
    targetCtx.stroke();

    const northWall = this.dungeon.getTile(wx, wy - 1) === TILE_WALL;
    const southWall = this.dungeon.getTile(wx, wy + 1) === TILE_WALL;
    const westWall = this.dungeon.getTile(wx - 1, wy) === TILE_WALL;
    const eastWall = this.dungeon.getTile(wx + 1, wy) === TILE_WALL;

    // Textura orgánica sutil junto a muros usando Grass_Type / Snow_Type de Assets/Map
    if ((northWall || southWall || westWall || eastWall) && (h % 3 === 0)) {
      const overlaySheet = (h & 1) ? theme.floorOverlay1 : theme.floorOverlay2;
      if (overlaySheet?.complete && overlaySheet.naturalWidth >= 48) {
        targetCtx.save();
        targetCtx.globalAlpha = opacity * 0.22;
        targetCtx.imageSmoothingEnabled = false;
        const ox = ((h >> 3) % 3) * 16;
        targetCtx.drawImage(overlaySheet, ox, 0, 16, 16, px, py, tileSize, tileSize);
        targetCtx.restore();
      }
    }

    // Pequeñas piedras/escombros decorativos de la hoja del tema (en los bordes, sin confundirse con pickups)
    if (theme.pebbleCrops && (h % 11 === 0) && theme.wallAtlas?.complete && theme.wallAtlas.naturalWidth > 0) {
      const crop = theme.pebbleCrops[(h >> 5) % theme.pebbleCrops.length];
      targetCtx.save();
      targetCtx.globalAlpha = opacity * 0.45;
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(theme.wallAtlas, crop.x, crop.y, crop.w, crop.h,
        px + 2, py + 2, tileSize - 4, tileSize - 4);
      targetCtx.restore();
    }

    // Pequeños hongos animados en esquinas pegadas a muros (Dungeon_Animated_Mushrooms.png)
    const mushrooms = this.mapDecorations.mushrooms;
    if ((northWall && (westWall || eastWall)) && (h % 5 === 0) && mushrooms?.complete && mushrooms.naturalWidth > 0) {
      const frameIdx = Math.floor(now / 260 + (h % 7)) % 8;
      const rowIdx = ((h >> 6) % 3) * 2;
      const mSize = Math.round(tileSize * 0.34);
      const mx = westWall ? px + 2 : px + tileSize - mSize - 2;
      const my = py + 2;
      targetCtx.save();
      targetCtx.globalAlpha = opacity * 0.72;
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(mushrooms, frameIdx * 16, rowIdx * 16, 16, 16, mx, my, mSize, mSize);
      targetCtx.restore();
    }

    // Sombra proyectada por muros adyacentes (profundidad 2.5D estilo Panel 13)
    if (northWall) {
      const grad = targetCtx.createLinearGradient(px, py, px, py + tileSize * 0.42);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.58)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(px, py, tileSize, tileSize * 0.42);
    }
    if (westWall) {
      const grad = targetCtx.createLinearGradient(px, py, px + tileSize * 0.26, py);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.38)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(px, py, tileSize * 0.26, tileSize);
    }

    targetCtx.restore();
  }

  hasWallTorch(wx, wy) {
    if (this.dungeon.getTile(wx, wy) !== TILE_WALL) return false;
    const southTile = this.dungeon.getTile(wx, wy + 1);
    if (southTile === TILE_WALL || southTile === TILE_OUT_OF_BOUNDS) return false;
    // Antorchas flanqueando la entrada/salida (como en el Panel 13) y distribuidas en muros largos
    const nearEntrance = Math.abs(wy + 1 - this.dungeon.entrance.y) <= 1 && Math.abs(wx - this.dungeon.entrance.x) === 1;
    const nearExit = Math.abs(wy - this.dungeon.exit.y) <= 1 && Math.abs(wx - this.dungeon.exit.x) === 1;
    if (nearEntrance || nearExit) return true;
    return cellHash(wx, wy, 99) % 6 === 0;
  }

  drawEnhancedWallCell(targetCtx, theme, wx, wy, px, py, tileSize, inLineOfSight, now) {
    const opacity = inLineOfSight ? 1 : 0.46;
    const h = cellHash(wx, wy, (this.generator?.floorNumber || 1) + 31);
    const crop = theme.wallCrops[h % theme.wallCrops.length];

    this.drawTerrainTile(targetCtx, theme.wallAtlas, crop, px, py,
      inLineOfSight ? theme.wallColor : "#11131a", opacity);

    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.imageSmoothingEnabled = false;

    // Detalles adicionales de muro (musgo, enredaderas, grietas de Wall_Additions)
    if ((h % 4 === 0) && theme.wallOverlayAtlas?.complete && theme.wallOverlayAtlas.naturalWidth > 0) {
      const ov = theme.wallOverlayCrops[(h >> 3) % theme.wallOverlayCrops.length];
      targetCtx.save();
      targetCtx.globalAlpha = opacity * 0.65;
      targetCtx.drawImage(theme.wallOverlayAtlas, ov.x, ov.y, Math.min(16, ov.w), Math.min(16, ov.h),
        px, py, tileSize, tileSize);
      targetCtx.restore();
    }

    // Frente de piedra con volumen cuando debajo hay suelo
    const southIsFloor = this.dungeon.getTile(wx, wy + 1) !== TILE_WALL && this.dungeon.getTile(wx, wy + 1) !== TILE_OUT_OF_BOUNDS;
    if (southIsFloor) {
      const ledgeH = Math.max(5, Math.round(tileSize * 0.18));
      targetCtx.fillStyle = "rgba(8, 10, 18, 0.55)";
      targetCtx.fillRect(px, py + tileSize - ledgeH, tileSize, ledgeH);
      targetCtx.strokeStyle = "rgba(180, 195, 225, 0.16)";
      targetCtx.lineWidth = 1;
      targetCtx.beginPath();
      targetCtx.moveTo(px, py + tileSize - ledgeH + 0.5);
      targetCtx.lineTo(px + tileSize, py + tileSize - ledgeH + 0.5);
      targetCtx.stroke();
    }

    // Borde superior sutil para separar muros contiguos con claridad
    targetCtx.strokeStyle = "rgba(12, 15, 24, 0.72)";
    targetCtx.lineWidth = 1;
    targetCtx.strokeRect(px + 0.5, py + 0.5, tileSize - 1, tileSize - 1);

    // Antorcha de muro animada (estilo Panel 13)
    if (this.hasWallTorch(wx, wy)) {
      const flicker = 0.85 + 0.15 * Math.sin(now / 95 + wx * 1.7 + wy * 2.3);
      const cx = px + tileSize / 2;
      const cy = py + tileSize * 0.64;

      // Soporte de hierro de la antorcha
      targetCtx.fillStyle = "#1a181d";
      targetCtx.fillRect(cx - 2, cy - 1, 4, 8);
      targetCtx.fillStyle = "#4d3826";
      targetCtx.fillRect(cx - 1.5, cy - 3, 3, 6);

      // Llama pixelada cálida
      targetCtx.fillStyle = "#ff7b1c";
      targetCtx.beginPath();
      targetCtx.arc(cx, cy - 5, 4.2 * flicker, 0, Math.PI * 2);
      targetCtx.fill();
      targetCtx.fillStyle = "#ffd966";
      targetCtx.beginPath();
      targetCtx.arc(cx, cy - 5.5, 2.3 * flicker, 0, Math.PI * 2);
      targetCtx.fill();
    }

    targetCtx.restore();
  }

  drawPortalDoorCell(targetCtx, theme, tileType, wx, wy, px, py, tileSize, inLineOfSight, now) {
    this.drawEnhancedFloorCell(targetCtx, theme, wx, wy, px, py, tileSize, inLineOfSight, now);
    const opacity = inLineOfSight ? 1 : 0.45;
    const isEntrance = tileType === TILE_ENTRANCE;
    const enemiesRemain = this.dungeon.enemies.length > 0;

    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.imageSmoothingEnabled = false;

    // Arco de piedra del atlas del tema si está disponible
    if (theme.wallAtlas?.complete && theme.wallAtlas.naturalWidth >= 48 && theme.archCrop) {
      targetCtx.save();
      targetCtx.globalAlpha = opacity * 0.62;
      targetCtx.drawImage(
        theme.wallAtlas,
        theme.archCrop.x, theme.archCrop.y, theme.archCrop.w, theme.archCrop.h,
        px + 1, py + 1, tileSize - 2, tileSize - 2
      );
      targetCtx.restore();
    }

    if (inLineOfSight) {
      const pulse = 0.72 + 0.28 * Math.sin(now / 260);
      const glowColor = isEntrance
        ? `rgba(255, 65, 65, ${0.24 * pulse})`
        : (enemiesRemain ? `rgba(255, 215, 0, ${0.24 * pulse})` : `rgba(57, 239, 115, ${0.32 * pulse})`);
      const strokeColor = isEntrance
        ? "#ff4141"
        : (enemiesRemain ? "#ffd700" : "#39ef73");

      targetCtx.fillStyle = glowColor;
      targetCtx.fillRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
      targetCtx.strokeStyle = strokeColor;
      targetCtx.lineWidth = 1.5;
      targetCtx.strokeRect(px + 4, py + 4, tileSize - 8, tileSize - 8);

      targetCtx.font = "bold 18px monospace";
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.lineWidth = 3;
      targetCtx.strokeStyle = "#000000";
      targetCtx.fillStyle = strokeColor;
      const symbol = isEntrance ? "▼" : "▲";
      targetCtx.strokeText(symbol, px + tileSize / 2, py + tileSize / 2);
      targetCtx.fillText(symbol, px + tileSize / 2, py + tileSize / 2);
    }
    targetCtx.restore();
  }

  drawTorchLightPools(targetCtx, visibleTorches, tileSize, now) {
    if (!visibleTorches.length) return;
    targetCtx.save();
    targetCtx.globalCompositeOperation = "screen";
    visibleTorches.forEach(({ sx, sy, wx, wy }) => {
      const flicker = 0.9 + 0.1 * Math.sin(now / 110 + wx * 1.9 + wy * 1.3);
      const cx = (sx + 0.5) * tileSize;
      const cy = (sy + 0.85) * tileSize;
      const radius = tileSize * 2.35 * flicker;
      const grad = targetCtx.createRadialGradient(cx, cy, tileSize * 0.1, cx, cy, radius);
      grad.addColorStop(0, "rgba(255, 165, 72, 0.26)");
      grad.addColorStop(0.5, "rgba(255, 115, 38, 0.11)");
      grad.addColorStop(1, "rgba(255, 90, 20, 0)");
      targetCtx.fillStyle = grad;
      targetCtx.beginPath();
      targetCtx.arc(cx, cy, radius, 0, Math.PI * 2);
      targetCtx.fill();
    });
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

  drawGroundPickups(targetCtx, now) {
    const sheet = this.mapDecorations.pickups;
    if (!sheet.complete || sheet.naturalWidth === 0) return;
    const tileSize = CAMERA_CONFIG.tileSize;
    this.dungeon.pickups.forEach(pickup => {
      const { screenX, screenY } = CameraTransformer.worldToScreen(pickup.x, pickup.y, this.player);
      if (screenX < 0 || screenX >= CAMERA_CONFIG.cols || screenY < 0 || screenY >= CAMERA_CONFIG.rows) return;
      if (!VisibilitySystem.hasLineOfSight(
        CAMERA_CONFIG.playerScreenX, CAMERA_CONFIG.playerScreenY, screenX, screenY, this.dungeon, this.player
      )) return;

      const frames = pickup.type === "gold" ? PICKUP_SPRITES.coins : PICKUP_SPRITES.potion;
      const frame = frames[Math.floor(now / (pickup.type === "gold" ? 100 : 220)) % frames.length];
      const size = tileSize * 0.7;
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(sheet, frame.x, frame.y, frame.w, frame.h,
        (screenX + 0.5) * tileSize - size / 2, (screenY + 0.5) * tileSize - size / 2, size, size);
      targetCtx.restore();
    });
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

  /**
   * Dibuja a Lior anclando sus pies (footAnchorX, footAnchorY) al centro-base estable de su casilla.
   */
  drawLiorSprite(targetCtx, px, py, tileSize) {
    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;

    const now = performance.now();
    let actionFrame = null;
    if (this.playerAnimation) {
      const frameIndex = Math.floor((now - this.playerAnimation.startedAt) / this.playerAnimation.frameDuration);
      if (frameIndex < this.playerAnimation.frames.length) actionFrame = this.playerAnimation.frames[frameIndex];
    }

    let frameRect = actionFrame?.sprite;
    if (!frameRect) {
      const idleRow = this.getLiorRow("IDLE");
      frameRect = this.player.hp <= 0
        ? LIOR_SPRITES.DEFEAT[LIOR_SPRITES.DEFEAT.length - 1]
        : idleRow[Math.floor(now / 450) % idleRow.length];
    }

    const sprite = this.getLiorFrame(frameRect);
    const reference = this.getLiorFrame(frameRect.sheet === "lior2" ? LIOR2_REFERENCE[frameRect.view] : LIOR_SPRITES.IDLE[0]);

    // Sombra bajo los pies de Lior (punto de anclaje estable)
    targetCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
    targetCtx.beginPath();
    targetCtx.ellipse(px + tileSize / 2, py + tileSize - 3, tileSize * 0.3, tileSize * 0.11, 0, 0, Math.PI * 2);
    targetCtx.fill();

    if (sprite && reference) {
      const scale = (tileSize * 1.32) / reference.height;
      const renderW = sprite.width * scale;
      const renderH = sprite.height * scale;
      const footAnchorX = (sprite.footAnchorX ?? sprite.width / 2) * scale;
      const footBaselineY = py + tileSize - 2;

      if (frameRect.flip) {
        targetCtx.translate(px + tileSize / 2, 0);
        targetCtx.scale(-1, 1);
        targetCtx.translate(-(px + tileSize / 2), 0);
      }
      const drawX = (px + tileSize / 2) - footAnchorX;
      const drawY = footBaselineY - renderH;
      targetCtx.drawImage(sprite, drawX, drawY, renderW, renderH);
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
    }
    targetCtx.restore();

    if (actionFrame?.effects) this.drawEffects(targetCtx, actionFrame.effects, this.playerAnimation.origin);
  }

  drawEffects(targetCtx, effects, origin) {
    const tileSize = CAMERA_CONFIG.tileSize;
    const shiftX = (CAMERA_CONFIG.playerScreenX - origin.x) * tileSize;
    const shiftY = (CAMERA_CONFIG.playerScreenY - origin.y) * tileSize;
    const pivot = { x: (origin.x + 0.5) * tileSize, y: (origin.y + 0.5) * tileSize };
    const rotateAroundLior = angle => {
      if (!angle) return;
      targetCtx.translate(pivot.x, pivot.y);
      targetCtx.rotate(angle);
      targetCtx.translate(-pivot.x, -pivot.y);
    };

    effects.forEach(effect => {
      const sprite = this.getEffectSprite(effect.sheet, effect.phase);
      if (!sprite) return;

      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.translate(shiftX, shiftY);
      if (effect.clip) {
        targetCtx.beginPath();
        effect.clip.forEach(cell => targetCtx.rect(cell.x * tileSize, cell.y * tileSize, tileSize, tileSize));
        targetCtx.clip();
      }

      if (effect.type === "area") {
        const { x, y, w, h } = effect.rect;
        rotateAroundLior(effect.rotation);
        targetCtx.drawImage(sprite, x * tileSize, y * tileSize, w * tileSize, h * tileSize);
      } else if (effect.type === "beam") {
        const width = effect.width * tileSize;
        const bottom = effect.bottom * tileSize;
        const top = effect.top * tileSize;
        const height = effect.phase === 2 ? bottom - top : width * (sprite.height / sprite.width);
        rotateAroundLior(effect.rotation);
        targetCtx.beginPath();
        targetCtx.rect(0, top, this.canvas.width, bottom - top);
        targetCtx.clip();
        targetCtx.drawImage(sprite, effect.x * tileSize - width / 2, bottom - height, width, height);
      } else {
        const scale = (effect.size * tileSize) / Math.max(sprite.width, sprite.height);
        const width = sprite.width * scale;
        const height = sprite.height * scale;
        targetCtx.translate(effect.x * tileSize, effect.y * tileSize);
        targetCtx.rotate(effect.angle || 0);
        targetCtx.drawImage(sprite, -width / 2, -height / 2, width, height);
      }
      targetCtx.restore();
    });
  }

  /**
   * Indicadores visuales de combate discretos y claros (Sección 10):
   * - Mira de apuntado y trayectoria real del arma equipada.
   * - Previsualización arcana violeta de Eldritch Blast.
   * - Previsualización de destino de Misty Step (válido cian vs inválido carmesí).
   * - Marcador de objetivo práctico durante el Paso 1 del tutorial.
   */
  drawCombatIndicators(targetCtx, now) {
    if (!this.game) return;
    const tileSize = CAMERA_CONFIG.tileSize;
    const pScreenX = CAMERA_CONFIG.playerScreenX;
    const pScreenY = CAMERA_CONFIG.playerScreenY;
    const liorCenterX = (pScreenX + 0.5) * tileSize;
    const liorCenterY = (pScreenY + 0.5) * tileSize;

    // 1. Marcador de ejercicio de movimiento del Tutorial (Paso 1)
    if (this.game.tutorial?.isActive && this.game.tutorial.step === 1 && this.game.tutorial.practiceTarget) {
      const target = this.game.tutorial.practiceTarget;
      const { screenX, screenY } = CameraTransformer.worldToScreen(target.x, target.y, this.player);
      const pulse = 0.65 + 0.35 * Math.sin(now / 180);
      const tx = screenX * tileSize;
      const ty = screenY * tileSize;
      targetCtx.save();
      targetCtx.fillStyle = `rgba(77, 240, 120, ${0.18 * pulse})`;
      targetCtx.strokeStyle = `rgba(77, 240, 120, ${0.9 * pulse})`;
      targetCtx.lineWidth = 2;
      targetCtx.fillRect(tx + 3, ty + 3, tileSize - 6, tileSize - 6);
      targetCtx.strokeRect(tx + 3, ty + 3, tileSize - 6, tileSize - 6);
      targetCtx.restore();
    }

    // 2. Mira de apuntado de arma y trayectoria (Sección 8.3 y 10)
    if (this.game.isAiming || this.game.showWeaponRange) {
      const weapon = this.player.equippedWeapon;
      const dirVec = DIR_VECTORS[this.player.direction];
      const maxReach = weapon.isMelee ? 1 : weapon.range;
      let aimCell = { x: this.player.x + dirVec.x, y: this.player.y + dirVec.y };
      for (let step = 1; step <= maxReach; step++) {
        const cx = this.player.x + dirVec.x * step;
        const cy = this.player.y + dirVec.y * step;
        if (!this.dungeon.isInsideBounds(cx, cy) || this.dungeon.getTile(cx, cy) === TILE_WALL) break;
        aimCell = { x: cx, y: cy };
        const hasEnemy = this.dungeon.enemies.some(e => e.cells?.some(c => c.x === cx && c.y === cy));
        if (hasEnemy) break;
      }

      const { screenX, screenY } = CameraTransformer.worldToScreen(aimCell.x, aimCell.y, this.player);
      const reticleX = (screenX + 0.5) * tileSize;
      const reticleY = (screenY + 0.5) * tileSize;

      targetCtx.save();
      // Línea de trayectoria punteada desde Lior hasta la mira
      targetCtx.strokeStyle = "rgba(255, 90, 90, 0.72)";
      targetCtx.lineWidth = 1.8;
      targetCtx.setLineDash([5, 4]);
      targetCtx.beginPath();
      targetCtx.moveTo(liorCenterX, liorCenterY);
      targetCtx.lineTo(reticleX, reticleY);
      targetCtx.stroke();
      targetCtx.setLineDash([]);

      // Retícula de apuntado (mira clara sin ocultar el sprite)
      const r = tileSize * 0.36;
      targetCtx.strokeStyle = "rgba(255, 215, 90, 0.92)";
      targetCtx.lineWidth = 2;
      targetCtx.beginPath();
      targetCtx.arc(reticleX, reticleY, r, 0, Math.PI * 2);
      targetCtx.moveTo(reticleX - r - 4, reticleY);
      targetCtx.lineTo(reticleX - r * 0.45, reticleY);
      targetCtx.moveTo(reticleX + r * 0.45, reticleY);
      targetCtx.lineTo(reticleX + r + 4, reticleY);
      targetCtx.moveTo(reticleX, reticleY - r - 4);
      targetCtx.lineTo(reticleX, reticleY - r * 0.45);
      targetCtx.moveTo(reticleX, reticleY + r * 0.45);
      targetCtx.lineTo(reticleX, reticleY + r + 4);
      targetCtx.stroke();
      targetCtx.restore();
    }

    // 3. Previsualización arcana violeta de Eldritch Blast (o marcador de cancelación sobre Lior)
    if (this.game.eldritchBlastCanceled) {
      const pulse = 0.75 + 0.25 * Math.sin(now / 120);
      const px = pScreenX * tileSize;
      const py = pScreenY * tileSize;
      targetCtx.save();
      targetCtx.fillStyle = `rgba(251, 191, 36, ${0.22 * pulse})`;
      targetCtx.strokeStyle = `rgba(251, 191, 36, ${0.95 * pulse})`;
      targetCtx.lineWidth = 2.2;
      targetCtx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
      targetCtx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
      targetCtx.font = "bold 13px monospace";
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.fillStyle = "#fef3c7";
      targetCtx.fillText("✕", px + tileSize / 2, py + tileSize / 2);
      targetCtx.restore();
    } else if (this.game.eldritchBlastPreviewDir !== null && this.game.eldritchBlastPreviewDir !== undefined) {
      const dirVec = DIR_VECTORS[this.game.eldritchBlastPreviewDir] || DIR_VECTORS[this.player.direction] || DIR_VECTORS[0];
      const pulse = 0.7 + 0.3 * Math.sin(now / 120);
      targetCtx.save();
      let endScreen = { screenX: pScreenX, screenY: pScreenY };

      for (let dist = 1; dist <= 8; dist++) {
        const tx = this.player.x + dirVec.x * dist;
        const ty = this.player.y + dirVec.y * dist;
        if (!this.dungeon.isInsideBounds(tx, ty) || this.dungeon.getTile(tx, ty) === TILE_WALL) break;
        const sc = CameraTransformer.worldToScreen(tx, ty, this.player);
        endScreen = sc;
        const px = sc.screenX * tileSize;
        const py = sc.screenY * tileSize;

        targetCtx.fillStyle = `rgba(168, 85, 247, ${0.22 * pulse})`;
        targetCtx.strokeStyle = `rgba(216, 180, 254, ${0.88 * pulse})`;
        targetCtx.lineWidth = 2;
        targetCtx.fillRect(px + 3, py + 3, tileSize - 6, tileSize - 6);
        targetCtx.strokeRect(px + 3, py + 3, tileSize - 6, tileSize - 6);

        const enemyHit = this.dungeon.enemies.some(e => e.cells?.some(c => c.x === tx && c.y === ty));
        if (enemyHit) break;
      }

      // Haz guía central violeta
      targetCtx.strokeStyle = `rgba(233, 213, 255, ${0.92 * pulse})`;
      targetCtx.lineWidth = 3;
      targetCtx.beginPath();
      targetCtx.moveTo(liorCenterX, liorCenterY);
      targetCtx.lineTo((endScreen.screenX + 0.5) * tileSize, (endScreen.screenY + 0.5) * tileSize);
      targetCtx.stroke();
      targetCtx.restore();
    }

    // 4. Previsualización de destino de Misty Step (8 direcciones + cancelación sobre Lior)
    if (this.game.mistyStepPreview) {
      const dest = this.game.mistyStepPreview;
      const isSelfCancel = !!dest.canceled || (dest.x === this.player.x && dest.y === this.player.y && !dest.blocked);
      const isValid = !isSelfCancel && !dest.blocked && !dest.dangerous && this.dungeon.isInsideBounds(dest.x, dest.y);
      const { screenX, screenY } = CameraTransformer.worldToScreen(dest.x, dest.y, this.player);
      const px = screenX * tileSize;
      const py = screenY * tileSize;
      const pulse = 0.72 + 0.28 * Math.sin(now / 130);

      targetCtx.save();
      if (isSelfCancel) {
        targetCtx.strokeStyle = `rgba(251, 191, 36, ${0.95 * pulse})`;
        targetCtx.fillStyle = `rgba(251, 191, 36, ${0.22 * pulse})`;
      } else {
        targetCtx.strokeStyle = isValid
          ? `rgba(56, 189, 248, ${0.92 * pulse})`
          : `rgba(255, 75, 92, ${0.92 * pulse})`;
        targetCtx.fillStyle = isValid
          ? `rgba(56, 189, 248, ${0.22 * pulse})`
          : `rgba(255, 75, 92, ${0.22 * pulse})`;
      }
      targetCtx.lineWidth = 2.2;
      if (!isSelfCancel) {
        targetCtx.setLineDash([4, 3]);
        targetCtx.beginPath();
        targetCtx.moveTo(liorCenterX, liorCenterY);
        targetCtx.lineTo(px + tileSize / 2, py + tileSize / 2);
        targetCtx.stroke();
        targetCtx.setLineDash([]);
      }

      targetCtx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
      targetCtx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);

      targetCtx.font = "bold 14px monospace";
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.fillStyle = isSelfCancel ? "#fef3c7" : (isValid ? "#e0f2fe" : "#ffe4e6");
      targetCtx.fillText(isValid ? "◈" : "✕", px + tileSize / 2, py + tileSize / 2);
      targetCtx.restore();
    }
  }

  /**
   * Dibuja el minimapa del Panel 13 en la esquina superior derecha con los datos reales de la mazmorra.
   */
  drawMinimap() {
    if (!this.minimapCtx || !this.minimapCanvas || !this.dungeon) return;
    const mCanvas = this.minimapCanvas;
    const mCtx = this.minimapCtx;
    const W = mCanvas.width;
    const H = mCanvas.height;

    mCtx.clearRect(0, 0, W, H);
    mCtx.fillStyle = "#060812";
    mCtx.fillRect(0, 0, W, H);

    const dw = Math.max(1, this.dungeon.width);
    const dh = Math.max(1, this.dungeon.height);
    const pad = 8;
    const cellPx = Math.max(3, Math.min(10, Math.floor(Math.min((W - pad * 2) / dw, (H - pad * 2) / dh))));
    const mapW = dw * cellPx;
    const mapH = dh * cellPx;
    const offsetX = Math.floor((W - mapW) / 2);
    const offsetY = Math.floor((H - mapH) / 2);

    for (let y = 0; y < dh; y++) {
      for (let x = 0; x < dw; x++) {
        if (!this.dungeon.isRevealed(x, y)) continue;
        const tile = this.dungeon.getTile(x, y);
        const rx = offsetX + x * cellPx;
        const ry = offsetY + y * cellPx;

        if (tile === TILE_WALL) {
          mCtx.fillStyle = "#5a6382";
          mCtx.fillRect(rx, ry, cellPx, cellPx);
        } else {
          mCtx.fillStyle = "#252b3d";
          mCtx.fillRect(rx, ry, cellPx, cellPx);
          if (tile === TILE_ENTRANCE) {
            mCtx.fillStyle = "#f87171";
            mCtx.fillRect(rx + 1, ry + 1, Math.max(2, cellPx - 2), Math.max(2, cellPx - 2));
          } else if (tile === TILE_EXIT) {
            mCtx.fillStyle = this.dungeon.enemies.length > 0 ? "#fbbf24" : "#34d399";
            mCtx.fillRect(rx + 1, ry + 1, Math.max(2, cellPx - 2), Math.max(2, cellPx - 2));
          } else if (tile === TILE_CHEST) {
            mCtx.fillStyle = "#f59e0b";
            mCtx.fillRect(rx + 1, ry + 1, Math.max(2, cellPx - 2), Math.max(2, cellPx - 2));
          }
        }
      }
    }

    // Enemigos visibles en el minimapa
    this.dungeon.enemies.forEach(enemy => {
      if (!enemy.cells) return;
      enemy.cells.forEach(cell => {
        if (!this.dungeon.isRevealed(cell.x, cell.y)) return;
        if (!VisibilitySystem.hasWorldLineOfSight(this.player.x, this.player.y, cell.x, cell.y, this.dungeon)) return;
        mCtx.fillStyle = enemy.isBoss ? "#f43f5e" : "#ef4444";
        mCtx.fillRect(offsetX + cell.x * cellPx + 0.5, offsetY + cell.y * cellPx + 0.5, Math.max(2, cellPx - 1), Math.max(2, cellPx - 1));
      });
    });

    // Posición y orientación de Lior (marcador azul brillante como en el Panel 13)
    const lx = offsetX + (this.player.x + 0.5) * cellPx;
    const ly = offsetY + (this.player.y + 0.5) * cellPx;
    const dirVec = DIR_VECTORS[this.player.direction] || DIR_VECTORS[0];

    mCtx.save();
    mCtx.fillStyle = "rgba(56, 189, 248, 0.32)";
    mCtx.beginPath();
    mCtx.arc(lx, ly, Math.max(4, cellPx * 0.95), 0, Math.PI * 2);
    mCtx.fill();

    mCtx.fillStyle = "#38bdf8";
    mCtx.beginPath();
    mCtx.arc(lx, ly, Math.max(2.2, cellPx * 0.52), 0, Math.PI * 2);
    mCtx.fill();

    mCtx.strokeStyle = "#e0f2fe";
    mCtx.lineWidth = 1.4;
    mCtx.beginPath();
    mCtx.moveTo(lx, ly);
    mCtx.lineTo(lx + dirVec.x * Math.max(3, cellPx * 0.85), ly + dirVec.y * Math.max(3, cellPx * 0.85));
    mCtx.stroke();
    mCtx.restore();
  }

  drawDamageFlash(targetCtx) {
    const remaining = this.damageFlashUntil - performance.now();
    if (remaining <= 0) return;

    const strength = Math.min(1, remaining / 180);
    const { width, height } = this.canvas;
    const vignette = targetCtx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.2,
      width / 2, height / 2, Math.hypot(width, height) / 2
    );
    vignette.addColorStop(0, `rgba(255, 0, 0, ${0.12 * strength})`);
    vignette.addColorStop(1, `rgba(200, 0, 0, ${0.7 * strength})`);
    targetCtx.save();
    targetCtx.fillStyle = vignette;
    targetCtx.fillRect(0, 0, width, height);
    targetCtx.restore();
  }

  playSpriteAnimation(frames, frameDuration, interruptible = false) {
    if (this.playerAnimationFrame !== null) {
      cancelAnimationFrame(this.playerAnimationFrame);
    }

    const animation = { frames, frameDuration, interruptible, startedAt: performance.now(),
      origin: { x: CAMERA_CONFIG.playerScreenX, y: CAMERA_CONFIG.playerScreenY } };
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

  getAnimationRemaining() {
    if (!this.playerAnimation || this.playerAnimation.interruptible) return 0;
    const { frames, frameDuration, startedAt } = this.playerAnimation;
    return Math.max(0, startedAt + frames.length * frameDuration - performance.now());
  }

  redrawCurrentView() {
    this.draw();
  }

  playRow(rowName, frameDuration, interruptible = false) {
    const frames = this.getLiorRow(rowName);
    const duration = frameDuration * LIOR_SPRITES[rowName].length / frames.length;
    this.playSpriteAnimation(frames.map(sprite => ({ sprite })), duration, interruptible);
  }

  playSwordSpin() {
    this.playRow("SWORD_SPIN", 100);
  }

  playMistyStep() {
    this.playRow("MISTY_STEP", 100);
  }

  playDrinkPotion() {
    this.playRow("HEAL", 130);
  }

  playWalk() {
    this.playRow("WALK", 35, true);
  }

  playHurt(isFatal, minDelay = 0) {
    const start = () => {
      this.damageFlashUntil = performance.now() + 180;
      if (isFatal) this.playRow("DEFEAT", 150);
      else this.playRow("HURT", 70);
    };
    const delay = Math.max(minDelay, this.getAnimationRemaining());
    if (delay > 0) setTimeout(start, delay);
    else start();
  }

  playEldritchBlastAnimation(beamReach) {
    const rayCount = 1;
    const centerX = CAMERA_CONFIG.playerScreenX + 0.5;
    const bottom = CAMERA_CONFIG.playerScreenY;
    const top = CAMERA_CONFIG.playerScreenY + 0.5 - beamReach;
    const rotation = this.getFacingAngle();
    const rays = Array.from({ length: rayCount }, (_, index) => ({
      type: "beam",
      sheet: "eblast",
      x: centerX + (index - (rayCount - 1) / 2) * (1.4 / rayCount),
      bottom,
      top,
      width: 1.4 / rayCount,
      rotation
    }));
    const frames = this.getLiorRow("ELDRITCH_BLAST", LIOR_SPRITES.ELDRITCH_BLAST.length).map((sprite, index) => ({
      sprite,
      effects: rays.map(ray => ({ ...ray, phase: Math.min(2, index) }))
    }));
    this.playSpriteAnimation(frames, 110);
  }

  playRangedAttack(weaponId, shot) {
    const lior = { x: CAMERA_CONFIG.playerScreenX + 0.5, y: CAMERA_CONFIG.playerScreenY + 0.5 };
    const frames = this.getLiorRow("GUN_RECOIL", LIOR_SPRITES.GUN_RECOIL.length);

    if (weaponId === "blunderbuss") {
      const clip = shot.area.map(cell => {
        const { screenX, screenY } = CameraTransformer.worldToScreen(cell.x, cell.y, this.player);
        return { x: screenX, y: screenY };
      });
      const rect = {
        x: CAMERA_CONFIG.playerScreenX - 2,
        y: CAMERA_CONFIG.playerScreenY - 2,
        w: 5,
        h: 2
      };
      const phases = [0, 0, 1, 1, 2, 2];
      this.playSpriteAnimation(frames.map((sprite, index) => ({
        sprite,
        effects: [{ type: "area", sheet: "blunderbuss", phase: phases[index], rect, clip, rotation: this.getFacingAngle() }]
      })), 85);
      return;
    }

    const target = CameraTransformer.worldToScreen(shot.impact.x, shot.impact.y, this.player);
    const targetX = target.screenX + 0.5;
    const targetY = target.screenY + 0.5;
    const angle = Math.atan2(targetY - lior.y, targetX - lior.x);
    const sheet = weaponId;
    const isMusket = weaponId === "musket";
    const lerp = t => ({ x: lior.x + (targetX - lior.x) * t, y: lior.y + (targetY - lior.y) * t });
    const muzzle = { type: "point", sheet, phase: 0, size: isMusket ? 1.5 : 1.1, angle,
      x: lior.x + Math.cos(angle) * 0.7, y: lior.y + Math.sin(angle) * 0.7 };
    const projectile = t => ({ type: "point", sheet, phase: 1, size: isMusket ? 1.7 : 1.3, angle, ...lerp(t) });
    const impact = { type: "point", sheet, phase: 2, size: isMusket ? 2.2 : 1.6, x: targetX, y: targetY };

    const effectsByFrame = [
      [muzzle],
      [muzzle, projectile(0.3)],
      [projectile(0.55)],
      [projectile(0.85)],
      [impact],
      [impact]
    ];
    this.playSpriteAnimation(frames.map((sprite, index) => ({ sprite, effects: effectsByFrame[index] })), 80);
  }

  setDungeon(dungeon, generator) {
    this.dungeon = dungeon;
    this.generator = generator;
    this.snapCamera();
  }

  draw() {
    this.drawBase(this.ctx);
    this.drawMinimap();
  }

  drawBase(targetCtx) {
    const { canvas } = this;
    const frameNow = performance.now();
    this.updateCamera(frameNow);
    const { cols, rows, tileSize, playerScreenX, playerScreenY } = CAMERA_CONFIG;

    targetCtx.fillStyle = "#04050a";
    targetCtx.fillRect(0, 0, canvas.width, canvas.height);

    if (this.isVictorySequence) {
      for (let sy = 0; sy < rows; sy++) {
        for (let sx = 0; sx < cols; sx++) {
          const px = sx * tileSize;
          const py = sy * tileSize;

          if (sy < 3) {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#38bdf8" : "#0284c7";
          } else if (sy === 3 || sy === 4) {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#8b5a2b" : "#6f431b";
          } else {
            targetCtx.fillStyle = (sx + sy) % 2 === 0 ? "#22c55e" : "#16a34a";
          }
          targetCtx.fillRect(px, py, tileSize, tileSize);
          targetCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          targetCtx.strokeRect(px, py, tileSize, tileSize);
        }
      }

      const liorPx = playerScreenX * tileSize;
      const liorPy = Math.max(0, (playerScreenY - this.victoryStep * 0.5)) * tileSize;
      this.drawLiorSprite(targetCtx, liorPx, liorPy, tileSize);
      return;
    }

    const theme = this.getTerrainTheme();
    this.dungeon.markRevealed(this.player.x, this.player.y);

    const margin = 1;
    const visibleTorches = [];
    targetCtx.save();
    targetCtx.translate(this.cameraOffset.x, this.cameraOffset.y);

    for (let sy = -margin; sy < rows + margin; sy++) {
      for (let sx = -margin; sx < cols + margin; sx++) {
        const worldCoord = CameraTransformer.screenToWorld(sx, sy, this.player);
        const tileType = this.dungeon.getTile(worldCoord.x, worldCoord.y);
        const px = sx * tileSize;
        const py = sy * tileSize;

        const isPlayerCell = (sx === playerScreenX && sy === playerScreenY);
        const inLineOfSight = isPlayerCell || VisibilitySystem.hasLineOfSight(
          playerScreenX, playerScreenY, sx, sy, this.dungeon, this.player
        );

        if (inLineOfSight && tileType !== TILE_OUT_OF_BOUNDS) {
          this.dungeon.markRevealed(worldCoord.x, worldCoord.y);
        }
        const wasEverRevealed = this.dungeon.isRevealed(worldCoord.x, worldCoord.y);

        if (!inLineOfSight && !wasEverRevealed) {
          targetCtx.fillStyle = "#060810";
          targetCtx.fillRect(px, py, tileSize, tileSize);
          targetCtx.strokeStyle = "rgba(24, 30, 48, 0.38)";
          targetCtx.lineWidth = 1;
          targetCtx.strokeRect(px + 0.5, py + 0.5, tileSize - 1, tileSize - 1);
          continue;
        }

        if (tileType === TILE_WALL) {
          this.drawEnhancedWallCell(targetCtx, theme, worldCoord.x, worldCoord.y, px, py, tileSize, inLineOfSight, frameNow);
          if (inLineOfSight && this.hasWallTorch(worldCoord.x, worldCoord.y)) {
            visibleTorches.push({ sx, sy, wx: worldCoord.x, wy: worldCoord.y });
          }
        } else if (tileType === TILE_CHEST) {
          this.drawEnhancedFloorCell(targetCtx, theme, worldCoord.x, worldCoord.y, px, py, tileSize, inLineOfSight, frameNow);
          this.drawChestSprite(targetCtx, px, py, inLineOfSight ? 1 : 0.42);
        } else if (tileType === TILE_ENTRANCE || tileType === TILE_EXIT) {
          this.drawPortalDoorCell(targetCtx, theme, tileType, worldCoord.x, worldCoord.y, px, py, tileSize, inLineOfSight, frameNow);
        } else if (tileType === TILE_FLOOR) {
          this.drawEnhancedFloorCell(targetCtx, theme, worldCoord.x, worldCoord.y, px, py, tileSize, inLineOfSight, frameNow);
        } else if (tileType === TILE_OUT_OF_BOUNDS) {
          this.drawEnhancedWallCell(targetCtx, theme, worldCoord.x, worldCoord.y, px, py, tileSize, false, frameNow);
          targetCtx.fillStyle = "rgba(4, 6, 12, 0.55)";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        }

        // Indicador de alcance del arma equipada
        const entryPreview = this.game && this.game.entryPreviewUntil > frameNow;
        if (this.game && (this.game.showWeaponRange || this.game.isAiming || entryPreview)) {
          const inRange = CombatSystem.isCellInWeaponRange(
            this.player,
            worldCoord.x,
            worldCoord.y,
            this.player.equippedWeapon
          );
          if (inRange && !(worldCoord.x === this.player.x && worldCoord.y === this.player.y)) {
            const blocked = CombatSystem.findBlockingCell(
              this.dungeon, this.player.x, this.player.y, worldCoord.x, worldCoord.y
            );
            const isBlockedCell = !!blocked;
            targetCtx.save();
            if (isBlockedCell) {
              targetCtx.strokeStyle = "rgba(140, 140, 155, 0.38)";
              targetCtx.fillStyle = "rgba(90, 90, 105, 0.08)";
            } else if (entryPreview && !this.game.showWeaponRange && !this.game.isAiming) {
              targetCtx.strokeStyle = "rgba(255, 202, 72, 0.85)";
              targetCtx.fillStyle = "rgba(255, 190, 40, 0.14)";
            } else {
              targetCtx.strokeStyle = "rgba(255, 72, 72, 0.85)";
              targetCtx.fillStyle = "rgba(255, 35, 35, 0.14)";
            }
            targetCtx.lineWidth = 1.75;
            targetCtx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
            targetCtx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
            targetCtx.restore();
          }
        }
      }
    }

    // Halos cálidos de las antorchas sobre las losas de piedra
    this.drawTorchLightPools(targetCtx, visibleTorches, tileSize, frameNow);

    this.drawGroundPickups(targetCtx, frameNow);
    this.drawChestOpeningFrame(targetCtx, playerScreenX, playerScreenY);
    this.drawCombatIndicators(targetCtx, frameNow);

    this.pruneDyingEnemies(frameNow);
    [...this.dungeon.enemies, ...this.dungeon.dyingEnemies].forEach(enemy => {
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
    this.drawEnemyProjectiles(targetCtx, frameNow);
    targetCtx.restore();
    this.drawFloatingNumbers(targetCtx, frameNow);
    this.drawDamageFlash(targetCtx);
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

  static findBlockingCell(dungeon, x0, y0, x1, y1) {
    let x = x0;
    let y = y0;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (x !== x1 || y !== y1) {
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x += sx; }
      if (e2 < dx) { err += dx; y += sy; }
      const tile = dungeon.getTile(x, y);
      if (tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS) return { x, y };
    }
    return null;
  }

  static resolveShot(player, dungeon, weapon) {
    const basis = CameraTransformer.getBasis(player.direction);
    const toWorld = (forward, lateral) => ({
      x: player.x + basis.forward.x * forward + basis.right.x * lateral,
      y: player.y + basis.forward.y * forward + basis.right.y * lateral
    });

    if (weapon.id === "blunderbuss") {
      const leftEdge = -Math.floor(weapon.width / 2);
      const area = [];
      for (let forward = 1; forward <= weapon.range; forward++) {
        for (let lateral = leftEdge; lateral < leftEdge + weapon.width; lateral++) {
          const cell = toWorld(forward, lateral);
          if (!dungeon.isInsideBounds(cell.x, cell.y)) continue;
          const blocker = CombatSystem.findBlockingCell(dungeon, player.x, player.y, cell.x, cell.y);
          if (blocker && (blocker.x !== cell.x || blocker.y !== cell.y)) continue;
          area.push(cell);
        }
      }
      const targets = dungeon.enemies.filter(enemy =>
        enemy.cells.some(c => area.some(a => a.x === c.x && a.y === c.y))
      );
      return { targets, impact: toWorld(1.5, 0), area, hitWall: false };
    }

    const candidates = [];
    dungeon.enemies.forEach(enemy => {
      enemy.cells.forEach(cell => {
        if (CombatSystem.isCellInWeaponRange(player, cell.x, cell.y, weapon)) {
          candidates.push({
            enemy, cell,
            dist: Math.hypot(cell.x - player.x, cell.y - player.y),
            blocker: CombatSystem.findBlockingCell(dungeon, player.x, player.y, cell.x, cell.y)
          });
        }
      });
    });
    candidates.sort((a, b) => a.dist - b.dist);

    const clear = candidates.find(c => !c.blocker);
    if (clear) return { targets: [clear.enemy], impact: clear.cell, area: null, hitWall: false };
    if (candidates.length > 0) return { targets: [], impact: candidates[0].blocker, area: null, hitWall: true };

    let impact = { x: player.x, y: player.y };
    let hitWall = false;
    for (let step = 1; step <= weapon.range; step++) {
      const cell = toWorld(step, 0);
      impact = cell;
      const tile = dungeon.getTile(cell.x, cell.y);
      if (tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS) { hitWall = true; break; }
    }
    return { targets: [], impact, area: null, hitWall };
  }

  static resolveD20Attack(attacker, target, attackBonus) {
    if (target.hp <= 0) return null;
    const natural = rollDie(20);
    const total = natural + attackBonus;
    const fumble = natural === 1;
    const critical = natural === 20;
    return { natural, total, fumble, critical, hit: !fumble && (critical || total >= target.ac) };
  }

  static rollDamageDice(count, sides) {
    let damage = 0;
    for (let die = 0; die < count; die++) damage += rollDie(sides);
    return damage;
  }

  static applyDamageToPlayer(game, player, incomingDamage) {
    let remaining = Math.max(0, Math.floor(incomingDamage));
    const extraDamage = Math.min(player.extraHp, remaining);
    player.extraHp = Math.max(0, player.extraHp - extraDamage);
    remaining -= extraDamage;
    const hpDamage = Math.min(player.hp, remaining);
    player.hp = Math.max(0, player.hp - hpDamage);
    const totalDamage = extraDamage + hpDamage;
    if (totalDamage > 0) game.renderer?.showFloatingNumber(player.x, player.y, `-${totalDamage} HP`, "damage");
    return { extraDamage, hpDamage, totalDamage };
  }

  static applyDamageToEnemy(game, target, incomingDamage, animate = true) {
    if (target.hp <= 0) return 0;
    const damage = Math.min(target.hp, Math.max(0, Math.floor(incomingDamage)));
    target.hp = Math.max(0, target.hp - damage);
    if (animate && target.hp > 0) game.renderer?.playEnemyAnim(target, "hurt");
    return damage;
  }

  static applyBlunderbussKnockback(game, target) {
    if (target.size !== 1 || target.hp <= 0) return false;

    const dx = Math.sign(target.x - game.player.x);
    const dy = Math.sign(target.y - game.player.y);
    if (dx === 0 && dy === 0) return false;

    const destination = { x: target.x + dx, y: target.y + dy };
    const { dungeon, player } = game;
    if (!dungeon.isInsideBounds(destination.x, destination.y)) return false;

    const tile = dungeon.getTile(destination.x, destination.y);
    const lockedExit = tile === TILE_EXIT && dungeon.enemies.some(enemy => enemy.hp > 0);
    if (tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS || lockedExit
      || (destination.x === player.x && destination.y === player.y)) return false;

    const occupied = dungeon.enemies.some(enemy => enemy !== target && enemy.hp > 0
      && enemy.cells?.some(cell => cell.x === destination.x && cell.y === destination.y));
    if (occupied) return false;

    target.x = destination.x;
    target.y = destination.y;
    target.cells = [destination];
    return true;
  }

  static rollAttack(game, target, weapon = game.player.equippedWeapon) {
    const result = CombatSystem.resolveD20Attack(game.player, target, game.hitBonus);
    if (!result) return false;
    if (result.fumble) {
      game.log(TEXT.logs.criticalMiss("Lior"));
      game.player.stunned = true;
      return true;
    }
    if (!result.hit) {
      game.log(TEXT.logs.attackDefended(result.total, target.ac, target.name));
      return false;
    }

    const baseDamage = CombatSystem.rollWeaponDamage(game.player, weapon);
    const rolledDamage = result.critical ? Math.ceil(baseDamage * 1.5) : baseDamage;
    const damage = CombatSystem.applyDamageToEnemy(game, target, rolledDamage);
    if (weapon.id === "blunderbuss") CombatSystem.applyBlunderbussKnockback(game, target);
    if (damage > 0) game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage");
    game.log(TEXT.logs.attackHit(result.total, target.ac, damage, target.name, target.hp));
    return false;
  }

  static rollWeaponDamage(player, weapon = player.equippedWeapon) {
    const weaponId = weapon.id;
    const level = Math.max(0, Math.min(3, player.weaponUpgrades[weaponId] || 0));
    const [diceCount, dieSides] = WEAPON_DAMAGE_BY_UPGRADE[weaponId][level];
    return CombatSystem.rollDamageDice(diceCount, dieSides);
  }

  static processDeaths(game, targets) {
    const dead = targets.filter(enemy => enemy.hp <= 0);
    if (dead.length === 0) return [];

    const deadIds = new Set(dead.map(enemy => enemy.id));
    game.dungeon.enemies = game.dungeon.enemies.filter(enemy => !deadIds.has(enemy.id));
    dead.forEach(enemy => {
      if (enemy.isMegaBoss) {
        game.player.highestMegaBossTierDefeated = Math.max(
          game.player.highestMegaBossTierDefeated,
          enemy.spawnTier || enemy.originTier || 1
        );
      }
      game.player.kills++;
      const dropChance = enemy.isMegaBoss ? 1 : (enemy.isBoss ? 0.5 : 0.25);
      if (enemy.isMegaBoss || Math.random() < dropChance) {
        const goldDrop = enemy.isMegaBoss ? 10 : (enemy.isBoss ? rollDie(3) : rollDie(2));
        game.spawnPickup("gold", enemy.x, enemy.y, goldDrop);
      }
      if (enemy.size === 1 && !enemy.isBoss) {
        if (game.floor % 10 === 0) {
          game.player.minionKillsSincePotion++;
          if (game.player.minionKillsSincePotion >= 4) {
            game.player.minionKillsSincePotion = 0;
            game.spawnPickup("potion", enemy.x, enemy.y);
          }
        } else if (Math.random() < 0.1) {
          game.spawnPickup("potion", enemy.x, enemy.y);
        }
      }
      game.renderer?.startEnemyDeath(enemy);
    });
    return dead.filter(enemy => enemy.isBoss && !enemy.isMegaBoss);
  }

  static applyPanic(game, deadMiniBosses) {
    if (deadMiniBosses.length === 0) return;
    deadMiniBosses.forEach(miniBoss => {
      game.dungeon.enemies.forEach(other => {
        if (!other.isBoss && Math.hypot(other.x - miniBoss.x, other.y - miniBoss.y) <= 2.2) {
          other.fearCooldown = 2;
        }
      });
    });
    game.log(TEXT.logs.panic);
  }

  static executeAttack(game) {
    const { player, dungeon } = game;
    if (game.isVictory || !player || player.hp <= 0 || game.isPausedForDialog || game.isShopOpen() || game.isIntroActive() || game.tutorial?.isHelpModalOpen() || game.renderer?.isPortraitBlocked) {
      if (player && player.hp <= 0) game.log(TEXT.logs.deadPlayer);
      return;
    }
    // Asegurar que la orientación del personaje sea siempre una de las 4 direcciones cardinales (0..3)
    player.direction = ((player.direction % 4) + 4) % 4;

    // Modo de práctica segura del Tutorial (Paso 3): demuestra/valida el ataque sin gastar munición ni turnos si está en práctica controlada
    if (game.tutorial?.isActive && game.tutorial.step === 2) {
      sounds.playSword();
      game.renderer?.playSwordSpin();
      game.tutorial.onPlayerAction("attack");
      game.updateHUD();
      game.renderer?.draw();
      return;
    }

    if (game.consumeStunnedTurn()) return;
    game.clearMistyStepConfirmation();
    if (!game.isAiming) game.showWeaponRange = false;

    if (dungeon.isMerchantRoom) {
      game.log(TEXT.logs.merchantNoAttack);
      return;
    }

    const weapon = player.equippedWeapon;

    if (weapon.ammoProperty && player[weapon.ammoProperty] <= 0) {
      const noAmmoMessage = {
        pistol: TEXT.logs.noAmmoPistol,
        musket: TEXT.logs.noAmmoMusket,
        blunderbuss: TEXT.logs.noAmmoBlunderbuss
      }[weapon.id];
      game.log(noAmmoMessage);
      return;
    }

    player.advanceAction();

    let targets = [];

    if (weapon.isMelee) {
      sounds.playSword();
      game.renderer?.playSwordSpin();
      targets = dungeon.enemies.filter(enemy =>
        enemy.cells && enemy.cells.some(cell => Math.hypot(cell.x - player.x, cell.y - player.y) <= 1.5)
      );
      if (targets.length === 0) game.log(TEXT.logs.swordWhiff);
    } else {
      player[weapon.ammoProperty]--;
      if (player[weapon.ammoProperty] <= 0) player.equippedWeapon = WEAPONS.SWORD;
      sounds.playShot(weapon.id !== "pistol");
      game.renderer?.commitCameraFacing();
      const shot = CombatSystem.resolveShot(player, dungeon, weapon);
      game.renderer?.playRangedAttack(weapon.id, shot);
      targets = shot.targets;
      if (targets.length === 0) {
        game.log(shot.hitWall ? TEXT.logs.wallImpact(weapon.name) : TEXT.logs.shotWhiff(weapon.name));
      }
    }

    let playerFumbled = false;
    for (const target of targets) {
      if (CombatSystem.rollAttack(game, target, weapon)) {
        playerFumbled = true;
        break;
      }
    }
    const deadMiniBosses = CombatSystem.processDeaths(game, targets);
    CombatSystem.applyPanic(game, deadMiniBosses);

    game.processEnemiesTurn();
    game.updateHUD();
    game.renderer.draw();
  }
}

/**
 * INTRODUCCIÓN NARRATIVA CINEMATOGRÁFICA: DESCENSO DE LIOR AL ABISMO (Paneles 1 al 12)
 * Cada uno de los 12 paneles de la cuadrícula se muestra COMPLETO (contain) sin recortar ni distorsionar.
 * El Panel 13 es exclusivamente referencia de HUD/UI y NUNCA se reproduce en la historia.
 */
const NARRATIVE_PANELS = [
  { id: 1,  crop: { x: 0,    y: 0,   w: 903, h: 407 }, fx: "eclipse",       duration: 4200 },
  { id: 2,  crop: { x: 905,  y: 0,   w: 407, h: 407 }, fx: "chains",        duration: 4200 },
  { id: 3,  crop: { x: 0,    y: 410, w: 334, h: 266 }, fx: "wind",          duration: 3200 },
  { id: 4,  crop: { x: 336,  y: 410, w: 497, h: 266 }, fx: "crimson",       duration: 4200 },
  { id: 5,  crop: { x: 836,  y: 410, w: 476, h: 266 }, fx: "starPulse",     duration: 4000 },
  { id: 6,  crop: { x: 0,    y: 679, w: 305, h: 229 }, fx: "dissolve",      duration: 3400 },
  { id: 7,  crop: { x: 308,  y: 679, w: 231, h: 229 }, fx: "shock",         duration: 3400 },
  { id: 8,  crop: { x: 543,  y: 679, w: 241, h: 229 }, fx: "moonlight",     duration: 3400 },
  { id: 9,  crop: { x: 787,  y: 679, w: 260, h: 229 }, fx: "breath",        duration: 3600 },
  { id: 10, crop: { x: 1050, y: 679, w: 262, h: 229 }, fx: "resolve",       duration: 3800 },
  { id: 11, crop: { x: 0,    y: 912, w: 267, h: 287 }, fx: "wind",          duration: 3800 },
  { id: 12, crop: { x: 270,  y: 912, w: 679, h: 287 }, fx: "portalDescent", duration: 4400 }
];

class NarrativeIntroController {
  constructor(game) {
    this.game = game;
    this.container = document.getElementById("narrative-intro");
    this.canvas = document.getElementById("intro-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.textEl = document.getElementById("intro-text");
    this.progressEl = document.getElementById("intro-progress");
    this.skipBtn = document.getElementById("btn-skip-intro");

    this.isActive = false;
    this.panelIndex = 0;
    this.panelStartedAt = 0;
    this.prevPanelIndex = -1;
    this.rafId = null;
    this.onCompleteCallback = null;

    this.sheetImage = new Image();
    this.sheetLoaded = false;
    this.sheetImage.addEventListener("load", () => {
      this.sheetLoaded = true;
    });
    this.sheetImage.addEventListener("error", () => {
      if (!this.sheetImage.src.includes("Descenso%20de%20lior")) {
        this.sheetImage.src = "Descenso de lior al abismo.png";
      }
    });
    this.sheetImage.src = "Descenso de Lior al Abismo.png";

    this.particles = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: -0.00025 - Math.random() * 0.0005,
      alpha: 0.2 + Math.random() * 0.55
    }));

    this.bindEvents();
  }

  bindEvents() {
    if (this.skipBtn) {
      this.skipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.finish(true);
      });
    }
    if (this.container) {
      this.container.addEventListener("click", (e) => {
        if (e.target.closest("#btn-skip-intro, #btn-intro-fullscreen")) return;
        this.advanceOrReveal();
      });
    }
  }

  buildProgressDots() {
    if (!this.progressEl) return;
    this.progressEl.innerHTML = "";
    NARRATIVE_PANELS.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "intro-dot";
      dot.dataset.idx = String(idx);
      this.progressEl.appendChild(dot);
    });
  }

  updateProgressDots() {
    if (!this.progressEl) return;
    this.progressEl.querySelectorAll(".intro-dot").forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === this.panelIndex);
      dot.classList.toggle("is-done", idx < this.panelIndex);
    });
  }

  start(onComplete) {
    if (!this.container || !this.canvas) {
      if (onComplete) onComplete();
      return;
    }
    this.onCompleteCallback = onComplete;
    this.isActive = true;
    this.panelIndex = 0;
    this.prevPanelIndex = -1;
    this.buildProgressDots();
    this.container.classList.remove("hidden");
    this.showPanel(0);

    const loop = (now) => {
      if (!this.isActive) return;
      this.renderFrame(now);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  showPanel(index) {
    if (index >= NARRATIVE_PANELS.length) {
      this.finish(false);
      return;
    }
    this.prevPanelIndex = this.panelIndex;
    this.panelIndex = index;
    this.panelStartedAt = performance.now();
    const panel = NARRATIVE_PANELS[index];

    if (this.textEl) {
      this.textEl.textContent = `Escena ${index + 1} / ${NARRATIVE_PANELS.length} — Toca la pantalla o pulsa Espacio para continuar ▶`;
    }
    this.updateProgressDots();

    if (panel.fx === "starPulse" || panel.fx === "shock") {
      sounds.playEldritchBlast();
    } else if (panel.fx === "portalDescent") {
      sounds.playMisty();
    } else {
      sounds.playStep();
    }
  }

  advanceOrReveal() {
    if (!this.isActive) return;
    if (this.panelIndex + 1 < NARRATIVE_PANELS.length) {
      this.showPanel(this.panelIndex + 1);
    } else {
      this.finish(false);
    }
  }

  /**
   * Dibuja el panel consecutivo COMPLETO (modo contain) respetando su proporción exacta,
   * sin recortar bordes ni distorsionar la imagen original.
   */
  renderPanelArtwork(targetCtx, panel, progress, alpha = 1) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    targetCtx.save();
    targetCtx.globalAlpha = alpha;

    if (this.sheetLoaded && this.sheetImage.naturalWidth > 0) {
      const { x, y, w, h } = panel.crop;
      const padTop = 44;
      const padBottom = 38;
      const padSides = 20;
      const availW = Math.max(120, W - padSides * 2);
      const availH = Math.max(100, H - padTop - padBottom);

      // Escalado 'contain' puro para que el cuadro salga 100% completo sin distorsión
      const fitScale = Math.min(availW / w, availH / h);
      const drawW = Math.round(w * fitScale);
      const drawH = Math.round(h * fitScale);
      const dx = Math.round((W - drawW) / 2);
      const dy = Math.round(padTop + (availH - drawH) / 2);

      // Resplandor ambiental detrás del cuadro
      const glow = targetCtx.createRadialGradient(
        W / 2, dy + drawH / 2, Math.min(drawW, drawH) * 0.15,
        W / 2, dy + drawH / 2, Math.max(drawW, drawH) * 0.75
      );
      glow.addColorStop(0, "rgba(126, 87, 194, 0.22)");
      glow.addColorStop(1, "rgba(4, 5, 12, 0)");
      targetCtx.fillStyle = glow;
      targetCtx.fillRect(0, 0, W, H);

      // Sombra y marco gótico alrededor del cuadro completo
      targetCtx.fillStyle = "#050711";
      targetCtx.fillRect(dx - 4, dy - 4, drawW + 8, drawH + 8);

      targetCtx.drawImage(this.sheetImage, x, y, w, h, dx, dy, drawW, drawH);

      targetCtx.strokeStyle = "#9ea6c8";
      targetCtx.lineWidth = 2;
      targetCtx.strokeRect(dx - 1, dy - 1, drawW + 2, drawH + 2);
      targetCtx.strokeStyle = "#2b314d";
      targetCtx.lineWidth = 1;
      targetCtx.strokeRect(dx - 4, dy - 4, drawW + 8, drawH + 8);
    } else {
      const grad = targetCtx.createRadialGradient(W / 2, H * 0.4, 20, W / 2, H / 2, W * 0.7);
      grad.addColorStop(0, "#2b1644");
      grad.addColorStop(1, "#05060f");
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(0, 0, W, H);
    }

    targetCtx.restore();
  }

  renderFrame(now) {
    if (!this.ctx || !this.canvas) return;
    const targetW = Math.max(320, window.innerWidth || 800);
    const targetH = Math.max(220, window.innerHeight || 450);
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }

    const W = this.canvas.width;
    const H = this.canvas.height;
    const panel = NARRATIVE_PANELS[this.panelIndex];
    if (!panel) return;

    const elapsed = now - this.panelStartedAt;
    const progress = Math.min(1, elapsed / panel.duration);

    this.ctx.fillStyle = "#03040a";
    this.ctx.fillRect(0, 0, W, H);

    if (elapsed < 300 && this.prevPanelIndex >= 0 && this.prevPanelIndex !== this.panelIndex) {
      const prevPanel = NARRATIVE_PANELS[this.prevPanelIndex];
      if (prevPanel) {
        this.renderPanelArtwork(this.ctx, prevPanel, 1, 1 - elapsed / 300);
      }
      this.renderPanelArtwork(this.ctx, panel, progress, elapsed / 300);
    } else {
      this.renderPanelArtwork(this.ctx, panel, progress, 1);
    }

    // Partículas arcanas discretas en los márgenes
    this.ctx.save();
    this.particles.forEach(p => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      this.ctx.fillStyle = `rgba(210, 180, 255, ${p.alpha * 0.45})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.restore();
  }

  finish(skipped = false) {
    if (!this.isActive) return;
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.container) {
      this.container.classList.add("hidden");
    }
    try {
      sessionStorage.setItem("lior_narrative_intro_seen", "true");
    } catch {}
    if (typeof this.onCompleteCallback === "function") {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb(skipped);
    }
  }
}

/**
 * TUTORIAL INTERACTIVO DURANTE EL NIVEL 1 (5 pasos adaptados a los controles simplificados)
 * - Paso 1: Lado izquierdo (Deslizar) -> Moverse en 8 direcciones.
 * - Paso 2: Lado derecho (Un toque / Tap) -> Ataque básico.
 * - Paso 3: Lado derecho (Mantener presionado y soltar) -> Apuntar y lanzar Eldritch Blast.
 * - Paso 4: Lado izquierdo (Mantener presionado y soltar) -> Apuntar y ejecutar Misty Step.
 * - Paso 5: Presionar ambas zonas (izquierda y derecha) al mismo tiempo -> Cambiar de arma.
 */
class TutorialController {
  constructor(game) {
    this.game = game;
    this.overlay = document.getElementById("tutorial-overlay");
    this.badgeEl = document.getElementById("tutorial-step-badge");
    this.titleEl = document.getElementById("tutorial-step-title");
    this.descEl = document.getElementById("tutorial-step-desc");
    this.progressEl = document.getElementById("tutorial-step-progress");
    this.diagramEl = document.getElementById("tutorial-gesture-diagram");
    this.leftZone = document.getElementById("touch-zone-left");
    this.rightZone = document.getElementById("touch-zone-right");
    this.helpModal = document.getElementById("tutorial-help-modal");

    this.isActive = false;
    this.step = 1;
    this.practiceTarget = null;
    this.tempGrantedWeapon = null;

    this.bindEvents();
  }

  static isCompletedInStorage() {
    try {
      return localStorage.getItem("lior_tutorial_done") === "true"
        || sessionStorage.getItem("lior_tutorial_done") === "true";
    } catch {
      return false;
    }
  }

  static markCompletedInStorage() {
    try {
      localStorage.setItem("lior_tutorial_done", "true");
      sessionStorage.setItem("lior_tutorial_done", "true");
    } catch {}
  }

  bindEvents() {
    const pauseBtn = document.getElementById("btn-tutorial-pause");
    const skipBtn = document.getElementById("btn-tutorial-skip");
    const helpBtn = document.getElementById("btn-tutorial-help");
    const resumeBtn = document.getElementById("btn-tutorial-resume");
    const restartBtn = document.getElementById("btn-tutorial-restart");
    const menuFsBtn = document.getElementById("btn-menu-fullscreen");
    const menuResetBtn = document.getElementById("btn-menu-restart-game");

    if (pauseBtn) pauseBtn.addEventListener("click", () => this.openHelpModal());
    if (skipBtn) skipBtn.addEventListener("click", () => this.skipTutorial());
    if (helpBtn) helpBtn.addEventListener("click", () => this.openHelpModal());
    if (resumeBtn) resumeBtn.addEventListener("click", () => this.closeHelpModal());
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.closeHelpModal();
        this.start(true);
      });
    }
    if (menuFsBtn) {
      menuFsBtn.addEventListener("click", () => {
        this.game.toggleFullscreen(true);
      });
    }
    if (menuResetBtn) {
      menuResetBtn.addEventListener("click", () => {
        this.closeHelpModal();
        this.game.resetGame();
      });
    }
  }

  openHelpModal() {
    if (!this.helpModal) return;
    this.game.touchController?.cancelAllGestures();
    this.helpModal.classList.remove("hidden");
  }

  closeHelpModal() {
    if (!this.helpModal) return;
    this.helpModal.classList.add("hidden");
  }

  isHelpModalOpen() {
    return !!(this.helpModal && !this.helpModal.classList.contains("hidden"));
  }

  startIfEligible() {
    if (this.game.floor !== 1 || this.game.inMerchantFloor) return;
    if (TutorialController.isCompletedInStorage()) return;
    if (this.game.controlDevice !== "touch") return;
    this.start(false);
  }

  start(force = false) {
    if (!force && TutorialController.isCompletedInStorage()) return;
    this.isActive = true;
    const fb = document.getElementById("floor-banner");
    if (fb) fb.classList.add("hidden");
    this.step = 1;
    this.cleanupTempWeapon();
    if (this.overlay) this.overlay.classList.remove("hidden");
    this.setupStep(1);
  }

  findPracticeTargetTile() {
    const { player, dungeon } = this.game;
    const candidates = [
      { x: player.x, y: player.y - 1 },
      { x: player.x + 1, y: player.y - 1 },
      { x: player.x - 1, y: player.y - 1 },
      { x: player.x + 1, y: player.y },
      { x: player.x - 1, y: player.y }
    ];
    for (const c of candidates) {
      if (dungeon.isInsideBounds(c.x, c.y) && dungeon.getTile(c.x, c.y) === TILE_FLOOR
        && !dungeon.enemies.some(e => e.cells?.some(cell => cell.x === c.x && cell.y === c.y))) {
        return c;
      }
    }
    return { x: player.x, y: Math.max(1, player.y - 1) };
  }

  getGestureSVG(step) {
    switch (step) {
      case 1:
        return `<svg viewBox="0 0 90 46"><rect x="2" y="2" width="42" height="42" fill="rgba(56,189,248,0.18)" stroke="#38bdf8"/><circle cx="23" cy="28" r="5" fill="#ffd970"/><path d="M23 28 L23 8 M23 28 L36 12" stroke="#7cf59a" stroke-width="2"/><text x="66" y="26" fill="#94a3b8" font-size="6.5" text-anchor="middle">DESLIZAR</text></svg>`;
      case 2:
        return `<svg viewBox="0 0 90 46"><rect x="47" y="2" width="41" height="42" fill="rgba(248,113,113,0.18)" stroke="#f87171"/><circle cx="67" cy="23" r="8" fill="none" stroke="#ffd970" stroke-width="2"/><circle cx="67" cy="23" r="3.5" fill="#f87171"/><text x="23" y="26" fill="#ffd970" font-size="6.5" text-anchor="middle">1 TOQUE</text></svg>`;
      case 3:
        return `<svg viewBox="0 0 90 46"><rect x="47" y="2" width="41" height="42" fill="rgba(192,132,252,0.18)" stroke="#c084fc"/><circle cx="67" cy="27" r="7" fill="rgba(192,132,252,0.45)" stroke="#e9d5ff" stroke-width="1.8"/><path d="M67 20 L67 5" stroke="#e9d5ff" stroke-width="2.2"/><text x="23" y="26" fill="#d8b4fe" font-size="6.2" text-anchor="middle">MANTENER</text></svg>`;
      case 4:
        return `<svg viewBox="0 0 90 46"><rect x="2" y="2" width="41" height="42" fill="rgba(56,189,248,0.18)" stroke="#38bdf8"/><circle cx="22" cy="27" r="7" fill="rgba(56,189,248,0.45)" stroke="#7dd3fc" stroke-width="1.8"/><path d="M22 20 L22 5" stroke="#7dd3fc" stroke-width="2.2"/><text x="67" y="26" fill="#7dd3fc" font-size="6.2" text-anchor="middle">MANTENER</text></svg>`;
      case 5:
        return `<svg viewBox="0 0 90 46"><rect x="2" y="2" width="41" height="42" fill="rgba(56,189,248,0.16)" stroke="#ffd970"/><rect x="47" y="2" width="41" height="42" fill="rgba(248,113,113,0.16)" stroke="#ffd970"/><circle cx="22" cy="23" r="6.5" fill="#ffd970"/><circle cx="67" cy="23" r="6.5" fill="#ffd970"/><text x="45" y="41" fill="#ffd970" font-size="6" text-anchor="middle">IZQ + DER</text></svg>`;
      default:
        return "";
    }
  }

  setZoneHighlights(leftVisible, rightVisible) {
    if (this.leftZone) this.leftZone.classList.toggle("hidden", !leftVisible);
    if (this.rightZone) this.rightZone.classList.toggle("hidden", !rightVisible);
  }

  setupStep(stepNumber) {
    this.step = stepNumber;
    this.cleanupTempWeapon();

    if (this.diagramEl) this.diagramEl.innerHTML = this.getGestureSVG(stepNumber);
    if (this.badgeEl) this.badgeEl.textContent = `TUTORIAL · PASO ${stepNumber}/5`;

    switch (stepNumber) {
      case 1:
        this.practiceTarget = this.findPracticeTargetTile();
        this.setZoneHighlights(true, false);
        if (this.titleEl) this.titleEl.textContent = "Paso 1: Moverse (Deslizar en Lado Izquierdo)";
        if (this.descEl) {
          this.descEl.textContent = "Desliza el dedo hacia cualquier dirección en el LADO IZQUIERDO de la pantalla para mover a Lior en los 8 puntos cardinales.";
        }
        if (this.progressEl) this.progressEl.textContent = "Objetivo: Desliza en el lado izquierdo para mover a Lior.";
        break;

      case 2:
        this.practiceTarget = null;
        this.setZoneHighlights(false, true);
        if (this.titleEl) this.titleEl.textContent = "Paso 2: Ataque Básico (Toque en Lado Derecho)";
        if (this.descEl) {
          this.descEl.textContent = "Toca una vez (tap) el LADO DERECHO de la pantalla para ejecutar tu ataque básico hacia donde mira Lior.";
        }
        if (this.progressEl) this.progressEl.textContent = "Objetivo: Toca una vez en el lado derecho para atacar.";
        break;

      case 3:
        this.setZoneHighlights(false, true);
        if (this.titleEl) this.titleEl.textContent = "Paso 3: Eldritch Blast (Mantener en Lado Derecho)";
        if (this.descEl) {
          this.descEl.textContent = "Mantén presionado el LADO DERECHO para que aparezca el apuntador violeta, dirígelo hacia tu objetivo y suelta el dedo para lanzar el Eldritch Blast.";
        }
        if (this.progressEl) this.progressEl.textContent = "Objetivo: Mantén presionado el lado derecho, apunta y suelta.";
        break;

      case 4:
        this.setZoneHighlights(true, false);
        if (this.titleEl) this.titleEl.textContent = "Paso 4: Misty Step (Mantener en Lado Izquierdo)";
        if (this.descEl) {
          this.descEl.textContent = "Mantén presionado el dedo en el LADO IZQUIERDO para apuntar el Misty Step, inclina hacia la dirección deseada y suelta para teletransportarte.";
        }
        if (this.progressEl) this.progressEl.textContent = "Objetivo: Mantén presionado el lado izquierdo, apunta y suelta.";
        break;

      case 5:
        this.setZoneHighlights(true, true);
        if (this.game.player.getAvailableWeapons().length < 2) {
          this.tempGrantedWeapon = {
            hadPistolUnlocked: this.game.player.unlockedWeapons.has(WEAPONS.PISTOL.id),
            prevAmmoPistol: this.game.player.ammoPistol,
            prevEquipped: this.game.player.equippedWeapon
          };
          this.game.player.unlockedWeapons.add(WEAPONS.PISTOL.id);
          if (this.game.player.ammoPistol <= 0) this.game.player.ammoPistol = 6;
          this.game.updateHUD();
        }
        if (this.titleEl) this.titleEl.textContent = "Paso 5: Cambio de Arma (Ambas Zonas a la Vez)";
        if (this.descEl) {
          this.descEl.textContent = "Presiona el LADO IZQUIERDO y el LADO DERECHO de la pantalla al mismo tiempo para cambiar tu arma equipada.";
        }
        if (this.progressEl) this.progressEl.textContent = "Objetivo: Presiona ambas zonas de la pantalla al mismo tiempo.";
        break;

      default:
        this.completeTutorial();
        break;
    }

    this.game.renderer?.draw();
  }

  cleanupTempWeapon() {
    if (!this.tempGrantedWeapon || !this.game.player) return;
    if (!this.tempGrantedWeapon.hadPistolUnlocked) {
      this.game.player.unlockedWeapons.delete(WEAPONS.PISTOL.id);
    }
    this.game.player.ammoPistol = this.tempGrantedWeapon.prevAmmoPistol;
    this.game.player.equippedWeapon = this.tempGrantedWeapon.prevEquipped;
    this.tempGrantedWeapon = null;
    this.game.updateHUD();
  }

  onPlayerAction(actionType) {
    if (!this.isActive) return;

    if (this.step === 1 && actionType === "move") {
      this.setupStep(2);
      return;
    }
    if (this.step === 2 && actionType === "attack") {
      this.setupStep(3);
      return;
    }
    if (this.step === 3 && actionType === "eldritch_blast") {
      this.setupStep(4);
      return;
    }
    if (this.step === 4 && actionType === "misty_step") {
      this.setupStep(5);
      return;
    }
    if (this.step === 5 && actionType === "weapon_switch") {
      this.completeTutorial();
    }
  }

  skipTutorial() {
    this.cleanupTempWeapon();
    this.isActive = false;
    this.practiceTarget = null;
    this.setZoneHighlights(false, false);
    if (this.overlay) this.overlay.classList.add("hidden");
    TutorialController.markCompletedInStorage();
    this.game.log("Tutorial omitido. Puedes abrir el botón ☰ MENÚ en el HUD cuando quieras.");
    this.game.renderer?.draw();
  }

  completeTutorial() {
    this.cleanupTempWeapon();
    this.isActive = false;
    this.practiceTarget = null;
    this.setZoneHighlights(false, false);
    if (this.overlay) this.overlay.classList.add("hidden");
    TutorialController.markCompletedInStorage();
    sounds.playCoin();
    this.game.log("¡Tutorial completado! Ya dominas todos los controles.");
    this.game.renderer?.draw();
  }
}

/**
 * SISTEMA DE CONTROLES TÁCTILES SIMPLIFICADO:
 * 1. Lado izquierdo de la pantalla:
 *    - Deslizar hacia cualquier dirección -> Mueve a Lior en los 8 puntos cardinales.
 *    - Mantener presionado -> Activa el apuntador para dirigir y ejecutar el Misty Step al soltar.
 * 2. Lado derecho de la pantalla:
 *    - Tocar una vez (tap) -> Ejecuta el ataque básico hacia donde mira Lior.
 *    - Mantener presionado -> Muestra el apuntador para dirigir el Eldritch Blast; al soltar el dedo, se lanza el Eldritch Blast.
 * 3. Cambio de arma:
 *    - Presionar ambas zonas de la pantalla (izquierda y derecha) al mismo tiempo -> Cambia de arma.
 */
class TouchGestureController {
  constructor(game, surface) {
    this.game = game;
    this.surface = surface;
    this.pointers = new Map();
    this.leftPointerId = null;
    this.rightPointerId = null;
    this.leftHoldTimer = null;
    this.rightHoldTimer = null;
    this.twoFingerTimer = null;
    this.moveRepeatTimer = null;
    this.weaponSwitchTriggered = false;
    this.specialGestureActive = null; // "eldritch" | "misty" | null
    this.HOLD_MISTY_MS = 260;
    this.HOLD_BLAST_MS = 240;
    this.MOVE_REPEAT_MS = 265;

    this.bindEvents();
  }

  getHalf(clientX) {
    const mid = (window.innerWidth || document.documentElement.clientWidth || 640) / 2;
    return clientX < mid ? "left" : "right";
  }

  bindEvents() {
    if (!this.surface) return;

    this.surface.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    window.addEventListener("pointercancel", (e) => this.onPointerCancel(e));
    window.addEventListener("blur", () => this.cancelAllGestures());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.cancelAllGestures();
    });
  }

  isInteractiveOverlayTarget(target) {
    if (!target || !target.closest) return false;
    return !!target.closest(
      "button, #shop-modal, #merchant-dialog-modal, #narrative-intro, #tutorial-help-modal, #death-screen, #victory-screen, #rotate-device-overlay"
    );
  }

  /**
   * Comprueba si las coordenadas de pantalla del puntero están colocadas directamente
   * sobre la casilla actual del propio personaje (Lior) en el canvas.
   */
  isPointerOverPlayerCell(clientX, clientY) {
    const canvas = this.game?.canvas;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const cols = CAMERA_CONFIG.cols || 15;
    const rows = CAMERA_CONFIG.rows || 9;
    const cellW = rect.width / cols;
    const cellH = rect.height / rows;
    const liorScreenX = rect.left + (CAMERA_CONFIG.playerScreenX + 0.5) * cellW;
    const liorScreenY = rect.top + (CAMERA_CONFIG.playerScreenY + 0.5) * cellH;
    const radius = Math.max(cellW, cellH) * 0.78;
    return Math.hypot(clientX - liorScreenX, clientY - liorScreenY) <= radius;
  }

  stopContinuousMove() {
    if (this.moveRepeatTimer !== null) {
      clearInterval(this.moveRepeatTimer);
      this.moveRepeatTimer = null;
    }
  }

  clearHoldTimers() {
    if (this.leftHoldTimer !== null) {
      clearTimeout(this.leftHoldTimer);
      this.leftHoldTimer = null;
    }
    if (this.rightHoldTimer !== null) {
      clearTimeout(this.rightHoldTimer);
      this.rightHoldTimer = null;
    }
    if (this.twoFingerTimer !== null) {
      clearTimeout(this.twoFingerTimer);
      this.twoFingerTimer = null;
    }
  }

  startContinuousMove(track) {
    if (this.moveRepeatTimer !== null) return;
    const stepOnce = () => {
      const current = this.pointers.get(track.id);
      if (!current || this.weaponSwitchTriggered || current.mode !== "move") {
        this.stopContinuousMove();
        return;
      }
      const dx = current.curX - current.startX;
      const dy = current.curY - current.startY;
      if (Math.hypot(dx, dy) < 15) return;
      const moveDir = TouchGestureController.vectorTo8Dir(dx, dy);
      current.stepCount = (current.stepCount || 0) + 1;
      this.game.moveStep(moveDir.dx, moveDir.dy, moveDir.cardinal);
    };

    stepOnce();
    this.moveRepeatTimer = setInterval(stepOnce, this.MOVE_REPEAT_MS);
  }

  activateMistyHold(track) {
    if (!track || track.consumedAction || this.weaponSwitchTriggered || track.mode === "move") return;
    this.stopContinuousMove();
    track.mode = "misty";
    this.specialGestureActive = "misty";
    const dx = track.curX - track.startX;
    const dy = track.curY - track.startY;
    const dist = Math.hypot(dx, dy);
    if (this.isPointerOverPlayerCell(track.curX, track.curY)) {
      this.game.setMistyStepPreview({ canceled: true });
      return;
    }
    if (dist >= 14) {
      track.hasAimedOutward = true;
      const dir8 = TouchGestureController.vectorTo8Dir(dx, dy);
      const steps = dist < 24 ? 8 : Math.max(1, Math.min(8, Math.round(dist / 18)));
      this.game.setMistyStepPreview(dir8, steps);
    } else {
      const cardinal = ((this.game.player.direction % 4) + 4) % 4;
      const dirVec = DIR_VECTORS[cardinal];
      this.game.setMistyStepPreview({ dx: dirVec.x, dy: dirVec.y, cardinal }, 8);
    }
  }

  activateEldritchHold(track) {
    if (!track || track.consumedAction || this.weaponSwitchTriggered) return;
    track.mode = "eldritch";
    this.specialGestureActive = "eldritch";
    const dx = track.curX - track.startX;
    const dy = track.curY - track.startY;
    const dist = Math.hypot(dx, dy);
    if (this.isPointerOverPlayerCell(track.curX, track.curY)) {
      this.game.setEldritchBlastPreview(null, true);
      return;
    }
    if (dist >= 12) {
      track.hasAimedOutward = true;
      const dir = TouchGestureController.vectorToCardinal(dx, dy);
      this.game.setEldritchBlastPreview(dir, false);
    } else {
      const dir = ((this.game.player.direction % 4) + 4) % 4;
      this.game.setEldritchBlastPreview(dir, false);
    }
  }

  onPointerDown(e) {
    if (this.isInteractiveOverlayTarget(e.target)) return;
    if (this.game.renderer?.isPortraitBlocked) return;
    if (this.game.isIntroActive() || this.game.isShopOpen() || this.game.isPausedForDialog || this.game.tutorial?.isHelpModalOpen()) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    if (e.pointerType === "touch") {
      this.game.setControlDevice("touch");
    }

    e.preventDefault();
    const side = this.getHalf(e.clientX);
    const now = performance.now();

    const track = {
      id: e.pointerId,
      side,
      startX: e.clientX,
      startY: e.clientY,
      curX: e.clientX,
      curY: e.clientY,
      startTime: now,
      totalDist: 0,
      stepCount: 0,
      hasAimedOutward: false,
      mode: null, // "move" | "misty" | "eldritch" | "weapon_switch" | null
      consumedAction: false
    };

    this.pointers.set(e.pointerId, track);

    if (side === "left" && this.leftPointerId === null) {
      this.leftPointerId = e.pointerId;
    } else if (side === "right" && this.rightPointerId === null) {
      this.rightPointerId = e.pointerId;
    }

    // Comprobar si es una pulsación simultánea en ambas zonas (izquierda + derecha) para cambiar de arma,
    // SIN confundirse con un dedo que ya se estaba moviendo o apuntando.
    const activePts = [...this.pointers.values()];
    const leftPt = activePts.find(pt => pt.side === "left");
    const rightPt = activePts.find(pt => pt.side === "right");

    if (leftPt && rightPt) {
      const timeDiff = Math.abs(rightPt.startTime - leftPt.startTime);
      const neitherMovingOrAiming = activePts.every(
        pt => pt.mode === null && pt.totalDist < 16 && (pt.stepCount || 0) === 0
      );

      if (timeDiff <= 180 && neitherMovingOrAiming && !this.weaponSwitchTriggered) {
        this.clearHoldTimers();
        this.stopContinuousMove();
        this.specialGestureActive = null;
        this.game.setEldritchBlastPreview(null, false);
        this.game.setMistyStepPreview(null);
        this.weaponSwitchTriggered = true;
        activePts.forEach(pt => {
          pt.consumedAction = true;
          pt.mode = "weapon_switch";
        });
        this.game.cycleWeapon(true);
        return;
      }
    }

    // Si es un toque en el lado derecho (incluso si el dedo izquierdo sigue apoyado tras moverse),
    // preparar el temporizador de mantenido para Eldritch Blast; si suelta antes, dispara el arma equipada.
    if (side === "right" && !this.weaponSwitchTriggered) {
      clearTimeout(this.rightHoldTimer);
      this.rightHoldTimer = setTimeout(() => {
        const cur = this.pointers.get(e.pointerId);
        if (!cur || this.weaponSwitchTriggered || cur.consumedAction) return;
        this.activateEldritchHold(cur);
      }, this.HOLD_BLAST_MS);
    }

    // Si es un toque en el lado izquierdo con un solo dedo, preparar el temporizador de mantenido para Misty Step.
    if (side === "left" && this.pointers.size === 1 && !this.weaponSwitchTriggered) {
      clearTimeout(this.leftHoldTimer);
      this.leftHoldTimer = setTimeout(() => {
        const cur = this.pointers.get(e.pointerId);
        if (!cur || this.pointers.size !== 1 || this.weaponSwitchTriggered || cur.mode === "move" || cur.consumedAction) return;
        this.activateMistyHold(cur);
      }, this.HOLD_MISTY_MS);
    }
  }

  /**
   * Convierte cualquier vector (dx, dy) en una de las 4 direcciones cardinales (0: Norte, 1: Este, 2: Sur, 3: Oeste).
   * Garantiza que Lior siempre mire hacia uno de los 4 puntos cardinales que tienen sprites disponibles.
   */
  static vectorToCardinal(dx, dy) {
    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx >= 0 ? 1 : 3; // Este (1) u Oeste (3)
    }
    return dy >= 0 ? 2 : 0; // Sur (2) o Norte (0)
  }

  /**
   * Convierte un vector (dx, dy) en una de las 8 direcciones de movimiento (incluidas las diagonales),
   * asignando siempre una orientación visual cardinal (0, 1, 2, 3) para respetar los sprites disponibles.
   */
  static vectorTo8Dir(dx, dy) {
    const angle = Math.atan2(dy, dx);
    const octant = Math.round(angle / (Math.PI / 4));
    const cardinal = TouchGestureController.vectorToCardinal(dx, dy);
    const table = {
      0:    { dx: 1,  dy: 0,  cardinal: 1 },        // E
      1:    { dx: 1,  dy: 1,  cardinal },           // SE (cardinal 1 o 2)
      2:    { dx: 0,  dy: 1,  cardinal: 2 },        // S
      3:    { dx: -1, dy: 1,  cardinal },           // SW (cardinal 3 o 2)
      4:    { dx: -1, dy: 0,  cardinal: 3 },        // W
      "-4": { dx: -1, dy: 0,  cardinal: 3 },        // W
      "-3": { dx: -1, dy: -1, cardinal },           // NW (cardinal 3 o 0)
      "-2": { dx: 0,  dy: -1, cardinal: 0 },        // N
      "-1": { dx: 1,  dy: -1, cardinal }            // NE (cardinal 1 o 0)
    };
    return table[octant] || { dx: 0, dy: -1, cardinal: 0 };
  }

  onPointerMove(e) {
    const track = this.pointers.get(e.pointerId);
    if (!track) return;
    if (this.game.renderer?.isPortraitBlocked) {
      this.cancelAllGestures();
      return;
    }

    const stepDist = Math.hypot(e.clientX - track.curX, e.clientY - track.curY);
    track.totalDist += stepDist;
    track.curX = e.clientX;
    track.curY = e.clientY;

    if (this.weaponSwitchTriggered || track.consumedAction) return;

    const dx = track.curX - track.startX;
    const dy = track.curY - track.startY;
    const dispFromStart = Math.hypot(dx, dy);

    // 1. LADO DERECHO: Apuntado especial de Eldritch Blast (mantener presionado)
    if (track.side === "right") {
      if (track.mode === "eldritch" || this.specialGestureActive === "eldritch") {
        // Si el jugador coloca el marcador sobre el propio personaje (o regresa al centro tras haber apuntado),
        // muestra el marcador de cancelación sobre Lior.
        if (this.isPointerOverPlayerCell(track.curX, track.curY) || (track.hasAimedOutward && dispFromStart < 18)) {
          this.game.setEldritchBlastPreview(null, true);
        } else if (dispFromStart >= 14) {
          track.hasAimedOutward = true;
          const dir = TouchGestureController.vectorToCardinal(dx, dy);
          this.game.setEldritchBlastPreview(dir, false);
        }
      }
      return;
    }

    // 2. LADO IZQUIERDO:
    if (track.side === "left") {
      // Si está en modo de apuntado de Misty Step (pulsación prolongada en el lado izquierdo):
      // permite seleccionar las 8 direcciones (incluidas las diagonales) y cancelar sobre el propio personaje.
      if (track.mode === "misty" || this.specialGestureActive === "misty") {
        if (this.isPointerOverPlayerCell(track.curX, track.curY) || (track.hasAimedOutward && dispFromStart < 18)) {
          this.game.setMistyStepPreview({ canceled: true });
        } else if (dispFromStart >= 14) {
          track.hasAimedOutward = true;
          const dir8 = TouchGestureController.vectorTo8Dir(dx, dy);
          const desiredSteps = dispFromStart < 26 ? 8 : Math.max(1, Math.min(8, Math.round(dispFromStart / 18)));
          this.game.setMistyStepPreview(dir8, desiredSteps);
        }
        return;
      }

      // Si desliza el dedo antes de que se cumpla el tiempo de pulsación prolongada -> Movimiento en 8 direcciones
      if (dispFromStart >= 18 && this.pointers.size === 1) {
        clearTimeout(this.leftHoldTimer);
        this.leftHoldTimer = null;
        track.mode = "move";
        this.startContinuousMove(track);
      }
    }
  }

  onPointerUp(e) {
    const track = this.pointers.get(e.pointerId);
    if (!track) return;

    if (e.pointerId === this.leftPointerId) {
      clearTimeout(this.leftHoldTimer);
      this.leftHoldTimer = null;
      this.stopContinuousMove();
    }
    if (e.pointerId === this.rightPointerId) {
      clearTimeout(this.rightHoldTimer);
      this.rightHoldTimer = null;
    }

    const dx = track.curX - track.startX;
    const dy = track.curY - track.startY;
    const displacement = Math.hypot(dx, dy);
    const duration = performance.now() - track.startTime;

    // 1. Lado derecho: resolución del apuntado especial de Eldritch Blast al soltar el dedo
    if ((track.mode === "eldritch" || this.specialGestureActive === "eldritch") && track.side === "right") {
      const wasCanceled = !!this.game.eldritchBlastCanceled || this.isPointerOverPlayerCell(track.curX, track.curY);
      const previewDir = this.game.eldritchBlastPreviewDir ?? this.game.player.direction;
      this.game.setEldritchBlastPreview(null, false);
      this.specialGestureActive = null;
      this.pointers.delete(e.pointerId);
      if (this.rightPointerId === e.pointerId) this.rightPointerId = null;

      if (wasCanceled) {
        this.game.log("Eldritch Blast cancelado.");
        return;
      }
      if (previewDir !== null && previewDir !== undefined) {
        this.game.player.direction = ((previewDir % 4) + 4) % 4;
        this.game.castEldritchBlast();
      }
      return;
    }

    // 2. Lado izquierdo: resolución del apuntado de Misty Step (8 direcciones + cancelación sobre el propio personaje)
    if ((track.mode === "misty" || this.specialGestureActive === "misty") && track.side === "left") {
      const preview = this.game.mistyStepPreview;
      const wasCanceled = !preview
        || !!preview.canceled
        || (preview.x === this.game.player.x && preview.y === this.game.player.y && !preview.blocked)
        || this.isPointerOverPlayerCell(track.curX, track.curY);
      const hasValidPreview = preview && !wasCanceled && !preview.blocked && !preview.dangerous;
      const targetSteps = preview?.steps || 8;
      const dirVec = preview?.dirVec || null;
      const cardinal = preview?.cardinal ?? this.game.player.direction;
      this.game.setMistyStepPreview(null);
      this.specialGestureActive = null;
      this.pointers.delete(e.pointerId);
      if (this.leftPointerId === e.pointerId) this.leftPointerId = null;

      if (wasCanceled) {
        this.game.log("Misty Step cancelado.");
        return;
      }
      if (preview) {
        if (hasValidPreview) {
          this.game.player.direction = ((cardinal % 4) + 4) % 4;
          this.game.castMistyStep(targetSteps, dirVec);
        } else {
          this.game.log(TEXT.logs.mistyInvalid);
        }
      }
      return;
    }

    // 3. Lado derecho: un solo toque (tap) dispara inmediatamente el arma equipada (pistola, mosquete, trabuco o espada)
    // utilizando la orientación cardinal actual del personaje, sin abrir apuntador manual.
    if (
      track.side === "right"
      && !this.weaponSwitchTriggered
      && !track.consumedAction
      && track.mode !== "eldritch"
      && track.mode !== "weapon_switch"
      && duration < 550
    ) {
      this.pointers.delete(e.pointerId);
      if (this.rightPointerId === e.pointerId) this.rightPointerId = null;
      CombatSystem.executeAttack(this.game);
      return;
    }

    // 4. Lado izquierdo: si fue un deslizamiento rápido que aún no había dado su primer paso, da 1 paso en 8 direcciones
    if (
      track.side === "left"
      && !this.weaponSwitchTriggered
      && !track.consumedAction
      && track.mode !== "misty"
      && track.mode !== "weapon_switch"
      && (track.stepCount || 0) === 0
      && displacement >= 15
    ) {
      const moveDir = TouchGestureController.vectorTo8Dir(dx, dy);
      this.pointers.delete(e.pointerId);
      if (this.leftPointerId === e.pointerId) this.leftPointerId = null;
      this.game.moveStep(moveDir.dx, moveDir.dy, moveDir.cardinal);
      return;
    }

    // 5. Limpieza del puntero
    this.pointers.delete(e.pointerId);
    if (e.pointerId === this.leftPointerId) {
      this.leftPointerId = null;
      this.game.setMistyStepPreview(null);
    }
    if (e.pointerId === this.rightPointerId) {
      this.rightPointerId = null;
      this.game.setEldritchBlastPreview(null, false);
    }
    if (this.pointers.size === 0) {
      this.clearHoldTimers();
      this.stopContinuousMove();
      this.weaponSwitchTriggered = false;
      this.specialGestureActive = null;
    }
  }

  onPointerCancel(e) {
    if (e.pointerId === this.leftPointerId) {
      this.stopContinuousMove();
    }
    this.pointers.delete(e.pointerId);
    if (this.pointers.size === 0) {
      this.cancelAllGestures();
    }
  }

  cancelAllGestures() {
    this.clearHoldTimers();
    this.stopContinuousMove();
    this.pointers.clear();
    this.leftPointerId = null;
    this.rightPointerId = null;
    this.weaponSwitchTriggered = false;
    this.specialGestureActive = null;
    if (this.game) {
      this.game.setAimMode(false);
      this.game.setEldritchBlastPreview(null, false);
      this.game.setMistyStepPreview(null);
    }
  }
}

class GameController {
  constructor(options = {}) {
    window.gameController = this;
    this.floor = 1;
    this.inMerchantFloor = false;
    this.canvas = document.getElementById("viewport");
    this.victoryScreen = document.getElementById("victory-screen");
    this.deathScreen = document.getElementById("death-screen");
    this.shopModal = document.getElementById("shop-modal");
    this.dialogModal = document.getElementById("merchant-dialog-modal");
    this.isVictory = false;
    this.isPausedForDialog = false;
    this.isAnimatingTurn = false;
    this.pendingEnemyProjectiles = 0;
    this.showWeaponRange = false;
    this.isAiming = false;
    this.eldritchBlastPreviewDir = null;
    this.mistyStepPreview = null;
    this.entryPreviewUntil = 0;
    this.mistyStepConfirmation = null;
    this.statusMessageTimer = null;
    this.statusMessageFadeTimer = null;
    this.floorBannerTimer = null;
    this.floorBannerFadeTimer = null;
    this.weaponToastTimer = null;
    this.dialogTimer = null;
    this.dialogFadeTimer = null;
    this.merchantInitTimer = null;
    this.shopClosingCooldown = 0;
    this.stopDpadHold = null;
    this.shopSelection = 0;
    this.activeShopView = "supplies";
    this.dialogCallback = null;
    this.gamepadMapping = "standard";
    this.controlDevice = this.getPreferredControlDevice();

    this.narrativeIntro = new NarrativeIntroController(this);
    this.tutorial = new TutorialController(this);

    this.initDungeonFloor(false);
    this.touchController = new TouchGestureController(this, document.getElementById("game-container"));
    this.bindEvents();
    this.initShopEvents();
    this.initDeviceDetection();
    this.initOrientationNotice();
    this.startGamepadLoop();
    window.__lior = this;

    if (options.playNarrativeIntro) {
      this.startNewGameIntro();
    } else {
      this.tutorial.startIfEligible();
    }
  }

  get tier() {
    return Math.min(10, Math.floor((this.floor - 1) / 10) + 1);
  }

  get playerAC() {
    return calculateLiorAC(this.floor);
  }

  get hitBonus() {
    return this.tier;
  }

  isShopOpen() {
    return !!(this.shopModal && !this.shopModal.classList.contains("hidden"));
  }

  isIntroActive() {
    return !!(this.narrativeIntro && this.narrativeIntro.isActive);
  }

  isGameplayBlocked() {
    return (
      this.isVictory
      || this.isPausedForDialog
      || this.isShopOpen()
      || this.isIntroActive()
      || this.tutorial?.isHelpModalOpen()
      || this.renderer?.isPortraitBlocked
      || performance.now() < this.shopClosingCooldown
      || !this.player
      || this.player.hp <= 0
    );
  }

  startNewGameIntro() {
    if (!this.narrativeIntro) {
      this.tutorial?.startIfEligible();
      return;
    }
    this.narrativeIntro.start(() => {
      this.showFloorBanner(this.floor, "El descenso.");
      this.tutorial?.startIfEligible();
      this.renderer?.draw();
    });
  }

  showFloorBanner(floorNum, subtitle = "El descenso.") {
    const banner = document.getElementById("floor-banner");
    const titleEl = document.getElementById("floor-banner-title");
    const subEl = document.getElementById("floor-banner-subtitle");
    if (!banner || !titleEl || !subEl) return;
    if (this.tutorial?.isActive) return;

    clearTimeout(this.floorBannerTimer);
    clearTimeout(this.floorBannerFadeTimer);
    titleEl.textContent = `Nivel ${floorNum}`;
    subEl.textContent = subtitle;
    banner.classList.remove("is-fading", "hidden");

    this.floorBannerFadeTimer = setTimeout(() => banner.classList.add("is-fading"), 2100);
    this.floorBannerTimer = setTimeout(() => {
      banner.classList.add("hidden");
      banner.classList.remove("is-fading");
    }, 2550);
  }

  showWeaponToast(text) {
    const toast = document.getElementById("weapon-toast");
    if (!toast) return;
    clearTimeout(this.weaponToastTimer);
    toast.textContent = text;
    toast.classList.remove("hidden");
    this.weaponToastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 1350);
  }

  setAimMode(active) {
    this.isAiming = false;
    this.showWeaponRange = !!active;
    this.renderer?.draw();
  }

  setAimDirection(direction) {
    const dir = ((direction % 4) + 4) % 4;
    this.player.direction = dir;
    this.renderer?.commitCameraFacing();
    this.updateHUD();
    this.renderer?.draw();
  }

  setEldritchBlastPreview(dir, canceled = false) {
    if (canceled) {
      this.eldritchBlastPreviewDir = null;
      this.eldritchBlastCanceled = true;
      this.renderer?.draw();
      return;
    }
    this.eldritchBlastCanceled = false;
    if (dir === null || dir === undefined) {
      if (this.eldritchBlastPreviewDir !== null) {
        this.eldritchBlastPreviewDir = null;
        this.renderer?.draw();
      }
      return;
    }
    const cardinal = ((dir % 4) + 4) % 4;
    this.eldritchBlastPreviewDir = cardinal;
    this.player.direction = cardinal;
    this.renderer?.commitCameraFacing();
    this.updateHUD();
    this.renderer?.draw();
  }

  setMistyStepPreview(dirOrObj, maxSteps = 8) {
    if (dirOrObj === null || dirOrObj === undefined) {
      if (this.mistyStepPreview !== null) {
        this.mistyStepPreview = null;
        this.renderer?.draw();
      }
      return;
    }
    if (typeof dirOrObj === "object" && dirOrObj.canceled) {
      this.mistyStepPreview = {
        x: this.player.x,
        y: this.player.y,
        steps: 0,
        dangerous: false,
        blocked: false,
        canceled: true
      };
      this.renderer?.draw();
      return;
    }
    if (typeof dirOrObj === "object" && ("dx" in dirOrObj || "x" in dirOrObj)) {
      const dx = Math.sign(dirOrObj.dx ?? dirOrObj.x ?? 0);
      const dy = Math.sign(dirOrObj.dy ?? dirOrObj.y ?? 0);
      const cardinal = dirOrObj.cardinal !== undefined
        ? (((dirOrObj.cardinal % 4) + 4) % 4)
        : TouchGestureController.vectorToCardinal(dx, dy);
      this.player.direction = cardinal;
      this.mistyStepPreview = this.getMistyStepDestination({ dx, dy, cardinal }, maxSteps);
      this.renderer?.commitCameraFacing();
      this.updateHUD();
      this.renderer?.draw();
      return;
    }
    const cardinal = ((dirOrObj % 4) + 4) % 4;
    this.player.direction = cardinal;
    this.mistyStepPreview = this.getMistyStepDestination(cardinal, maxSteps);
    this.renderer?.commitCameraFacing();
    this.updateHUD();
    this.renderer?.draw();
  }

  initDeviceDetection() {
    this.setControlDevice(this.controlDevice);
    window.addEventListener("keydown", () => this.setControlDevice("keyboard"));
    window.addEventListener("touchstart", () => this.setControlDevice("touch"), { passive: true });
    window.addEventListener("gamepadconnected", (event) => {
      this.gamepadMapping = event.gamepad?.mapping || "";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
    });
    window.addEventListener("gamepaddisconnected", () => {
      this.gamepadMapping = "standard";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
      this.setControlDevice(this.getPreferredControlDevice());
    });
  }

  initOrientationNotice() {
    const tryLockLandscape = () => {
      if (screen.orientation && typeof screen.orientation.lock === "function") {
        screen.orientation.lock("landscape").catch(() => {});
      }
    };
    window.addEventListener("pointerdown", tryLockLandscape, { once: true, passive: true });
    this.initFullscreenControls();
  }

  isNativeFullscreenActive() {
    return !!(
      document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullScreenElement
      || document.msFullscreenElement
    );
  }

  isFullscreenActive() {
    return this.isNativeFullscreenActive() || document.body.classList.contains("pseudo-fullscreen");
  }

  updateFullscreenUI() {
    const active = this.isFullscreenActive();
    document.body.classList.toggle("is-fullscreen", active);
    const hudBtn = document.getElementById("btn-fullscreen");
    if (hudBtn) {
      hudBtn.textContent = active ? "🗗" : "⛶";
      hudBtn.title = active ? "Salir de pantalla completa (F)" : "Pantalla completa (F)";
      hudBtn.setAttribute("aria-pressed", String(active));
    }
    const introBtn = document.getElementById("btn-intro-fullscreen");
    if (introBtn) {
      introBtn.textContent = active ? "🗗 SALIR PANTALLA COMPLETA" : "⛶ PANTALLA COMPLETA";
      introBtn.setAttribute("aria-pressed", String(active));
    }
    const menuFsBtn = document.getElementById("btn-menu-fullscreen");
    if (menuFsBtn) {
      menuFsBtn.textContent = active ? "🗗 Salir de Pantalla Completa" : "⛶ Activar Pantalla Completa";
    }
    if (this.renderer) {
      this.renderer.updateOrientationState();
      this.renderer.setCameraMode("fixed", false);
    }
  }

  async requestAutoFullscreen() {
    if (this.userExitedFullscreen) return;
    document.body.classList.add("pseudo-fullscreen");
    if (this.isNativeFullscreenActive()) {
      this.updateFullscreenUI();
      return;
    }
    const docEl = document.documentElement;
    const req = docEl.requestFullscreen
      || docEl.webkitRequestFullscreen
      || docEl.mozRequestFullScreen
      || docEl.msRequestFullscreen;
    if (req) {
      try {
        await req.call(docEl, { navigationUI: "hide" });
        if (screen.orientation && typeof screen.orientation.lock === "function") {
          screen.orientation.lock("landscape").catch(() => {});
        }
      } catch {
        // Mantiene pseudo-fullscreen activo si el navegador requiere gesto de usuario
      }
    }
    this.updateFullscreenUI();
  }

  async toggleFullscreen(manual = true) {
    const docEl = document.documentElement;
    const isNativeFs = this.isNativeFullscreenActive();

    if (isNativeFs) {
      if (manual) this.userExitedFullscreen = true;
      try {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      } catch {}
      document.body.classList.remove("pseudo-fullscreen");
      this.updateFullscreenUI();
      return;
    }

    if (manual && document.body.classList.contains("pseudo-fullscreen")) {
      // Si estaba en pseudo-fullscreen pero aún no en nativo, intentamos nativo primero;
      // si ya había intentado salir manualmente, desactivamos pseudo-fullscreen.
      const req = docEl.requestFullscreen
        || docEl.webkitRequestFullscreen
        || docEl.mozRequestFullScreen
        || docEl.msRequestFullscreen;
      if (req && !this._triedManualNativeFs) {
        this._triedManualNativeFs = true;
        try {
          this.userExitedFullscreen = false;
          await req.call(docEl, { navigationUI: "hide" });
          if (screen.orientation && typeof screen.orientation.lock === "function") {
            screen.orientation.lock("landscape").catch(() => {});
          }
          this.updateFullscreenUI();
          return;
        } catch {}
      }
      this._triedManualNativeFs = false;
      this.userExitedFullscreen = true;
      document.body.classList.remove("pseudo-fullscreen");
      this.updateFullscreenUI();
      return;
    }

    this.userExitedFullscreen = false;
    const req = docEl.requestFullscreen
      || docEl.webkitRequestFullscreen
      || docEl.mozRequestFullScreen
      || docEl.msRequestFullscreen;

    if (req) {
      try {
        await req.call(docEl, { navigationUI: "hide" });
        if (screen.orientation && typeof screen.orientation.lock === "function") {
          screen.orientation.lock("landscape").catch(() => {});
        }
        document.body.classList.add("pseudo-fullscreen");
        this.updateFullscreenUI();
        return;
      } catch {
        // Fallback si el contenedor o navegador bloquea la API nativa
      }
    }

    document.body.classList.add("pseudo-fullscreen");
    this.updateFullscreenUI();
  }

  initFullscreenControls() {
    this.userExitedFullscreen = false;
    const hudBtn = document.getElementById("btn-fullscreen");
    const introBtn = document.getElementById("btn-intro-fullscreen");

    if (hudBtn) {
      hudBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleFullscreen(true);
      });
    }
    if (introBtn) {
      introBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleFullscreen(true);
      });
    }

    for (const evt of ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"]) {
      document.addEventListener(evt, () => this.updateFullscreenUI());
    }

    // 1. Activar pantalla completa desde el inicio (pseudo-fullscreen inmediato + intento nativo)
    this.requestAutoFullscreen();

    // 2. Si el navegador requirió un gesto de usuario para la API nativa, activarla automáticamente
    // en el primer toque, clic o pulsación de tecla del jugador sin que tenga que buscar el botón.
    const onFirstUserGesture = (e) => {
      if (e.target && e.target.closest && e.target.closest("#btn-fullscreen, #btn-intro-fullscreen, #btn-menu-fullscreen")) {
        return;
      }
      if (!this.userExitedFullscreen && !this.isNativeFullscreenActive()) {
        this.requestAutoFullscreen();
      }
    };
    window.addEventListener("pointerdown", onFirstUserGesture, { passive: true });
    window.addEventListener("touchstart", onFirstUserGesture, { passive: true });
    window.addEventListener("keydown", onFirstUserGesture);
  }

  getPreferredControlDevice() {
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
    const compactScreen = Math.max(window.innerWidth, window.innerHeight) <= 1000
      && Math.min(window.innerWidth, window.innerHeight) <= 500;
    return navigator.maxTouchPoints > 0 || coarsePointer || compactScreen ? "touch" : "keyboard";
  }

  setControlDevice(device) {
    const changed = this.controlDevice !== device;
    this.controlDevice = device;
    document.body.classList.toggle("pad-hidden", device !== "touch");
    if (!changed) return;
    this.updateButtonLabels();
  }

  updateControlLegend() {
    // El panel lateral #pc-legend conserva su diseño estructurado con etiquetas <kbd>
  }

  updateButtonLabels() {
    const capC = document.getElementById("caption-c");
    if (capC) {
      const level = calculateEldritchBlastLevel(this.floor || 1);
      capC.textContent = `E. BLAST ${level}`;
    }
  }

  initDungeonFloor(isMerchantTransition = false) {
    this.inMerchantFloor = isMerchantTransition;
    this.showWeaponRange = false;
    this.isAiming = false;
    this.eldritchBlastPreviewDir = null;
    this.mistyStepPreview = null;
    this.mistyStepConfirmation = null;
    this.entryPreviewUntil = 0;
    clearTimeout(this.merchantInitTimer);
    this.touchController?.cancelAllGestures();
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();

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

    this.player.maxHp = calculateLiorMaxHP(this.floor);
    this.player.hp = Math.min(this.player.hp, this.player.maxHp);
    this.player.maxExtraHp = calculateMaxExtraHP(this.player.maxHp);
    this.player.extraHp = Math.min(this.player.extraHp, this.player.maxExtraHp);
    this.player.ac = this.playerAC;
    if (!isMerchantTransition) this.entryPreviewUntil = performance.now() + 1500;

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
      this.log(`[MERCADER]: «${TEXT.logs.merchantPeace}»`);
      this.merchantInitTimer = setTimeout(() => {
        if (!this.inMerchantFloor || this.isShopOpen() || this.isPausedForDialog) return;
        this.triggerMerchantInteraction();
      }, 300);
    } else {
      this.log(TEXT.logs.floorIntro(this.floor, this.tier, this.dungeon.width, this.dungeon.height, this.player.ac, this.hitBonus));
      const arenaBoss = this.dungeon.enemies.find(e => e.isMegaBoss);
      if (arenaBoss) {
        this.log(TEXT.logs.bossArena(arenaBoss.name));
        this.showFloorBanner(this.floor, `¡${arenaBoss.name}!`);
      } else if (!this.isIntroActive()) {
        this.showFloorBanner(this.floor, "El descenso.");
      }
    }

    this.renderer.draw();
  }

  triggerMerchantInteraction() {
    if (this.isShopOpen() || this.isPausedForDialog || performance.now() < this.shopClosingCooldown) {
      return false;
    }
    clearTimeout(this.merchantInitTimer);
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();
    this.touchController?.cancelAllGestures();

    this.showMerchantDialog(`«${TEXT.logs.merchantPeace}»`, () => {
      if (!this.isShopOpen()) {
        this.openShop();
      }
    });
    return true;
  }

  isMerchantAt(x, y) {
    return this.dungeon.npcs.some(npc => npc.isMerchant && npc.x === x && npc.y === y);
  }

  showMerchantDialog(text, onDismiss, speaker = "✦ MERCADER DE SOMBRAS ✦") {
    if (!this.dialogModal) {
      if (onDismiss) onDismiss();
      return;
    }
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();
    this.touchController?.cancelAllGestures();

    this.isPausedForDialog = true;
    this.dialogCallback = onDismiss;
    clearTimeout(this.dialogTimer);
    clearTimeout(this.dialogFadeTimer);

    const dialogText = document.getElementById("dialog-text");
    if (dialogText) dialogText.textContent = text;
    const dialogSpeaker = this.dialogModal.querySelector(".dialog-speaker");
    if (dialogSpeaker) dialogSpeaker.textContent = speaker;

    this.dialogModal.classList.remove("is-fading");
    this.dialogModal.classList.remove("hidden");
    this.dialogFadeTimer = setTimeout(() => this.dialogModal?.classList.add("is-fading"), 2650);
    this.dialogTimer = setTimeout(() => this.dismissMerchantDialog(), 3000);
  }

  dismissMerchantDialog() {
    if (!this.isPausedForDialog) return;
    clearTimeout(this.dialogTimer);
    clearTimeout(this.dialogFadeTimer);
    this.isPausedForDialog = false;
    if (this.dialogModal) {
      this.dialogModal.classList.remove("is-fading");
      this.dialogModal.classList.add("hidden");
    }
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
    this.isAnimatingTurn = false;
    this.pendingEnemyProjectiles = 0;
    this.showWeaponRange = false;
    this.isAiming = false;
    this.eldritchBlastPreviewDir = null;
    this.mistyStepPreview = null;

    this.deathScreen.classList.remove("visible");
    this.deathScreen.classList.add("hidden");
    this.closeShop();
    if (this.dialogModal) this.dialogModal.classList.add("hidden");

    this.mistyStepConfirmation = null;
    clearTimeout(this.statusMessageTimer);
    clearTimeout(this.statusMessageFadeTimer);
    clearTimeout(this.dialogTimer);
    clearTimeout(this.dialogFadeTimer);
    clearTimeout(this.merchantInitTimer);
    this.dialogCallback = null;

    this.player = null;
    this.initDungeonFloor(false);
    this.startNewGameIntro();
  }

  openShop() {
    if (!this.shopModal || this.isShopOpen()) return;
    clearTimeout(this.merchantInitTimer);
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();
    this.touchController?.cancelAllGestures();

    this.setShopView("supplies");
    this.updateShopHUD();
    this.shopModal.classList.remove("hidden");
  }

  setShopView(view, focusTab = false) {
    if (view !== "supplies" && view !== "upgrades") return;
    this.activeShopView = view;
    document.querySelectorAll("[data-shop-view]").forEach(tab => {
      const selected = tab.dataset.shopView === view;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      if (selected && focusTab) tab.focus();
    });
    document.querySelectorAll("[data-shop-panel]").forEach(panel => {
      panel.classList.toggle("hidden", panel.dataset.shopPanel !== view);
    });
    this.shopSelection = 0;
    this.updateShopSelection();
  }

  closeShop() {
    if (!this.shopModal) return;
    const wasOpen = !this.shopModal.classList.contains("hidden");
    this.shopModal.classList.add("hidden");
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();
    this.touchController?.cancelAllGestures();
    if (wasOpen) {
      this.shopClosingCooldown = performance.now() + 250;
    }
  }

  updateShopSelection() {
    const activePanel = this.shopModal?.querySelector(`[data-shop-panel="${this.activeShopView}"]`);
    const items = [...(activePanel?.querySelectorAll(".shop-item:not(.hidden)") || [])];
    if (items.length === 0) return;
    this.shopSelection = ((this.shopSelection % items.length) + items.length) % items.length;
    items.forEach((item, index) => {
      const selected = index === this.shopSelection;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-selected", String(selected));
    });
  }

  moveShopSelection(delta) {
    this.shopSelection += delta;
    this.updateShopSelection();
  }

  purchaseSelectedShopItem() {
    const activePanel = this.shopModal?.querySelector(`[data-shop-panel="${this.activeShopView}"]`);
    const item = activePanel?.querySelectorAll(".shop-item:not(.hidden)")[this.shopSelection];
    item?.querySelector("button")?.click();
  }

  updateShopHUD() {
    const goldDisplay = document.getElementById("shop-gold-display");
    if (goldDisplay) goldDisplay.textContent = this.player.gold;
    ["pistol", "musket", "blunderbuss"].forEach(weaponId => {
      const button = document.getElementById(`buy-${weaponId}-ammo`);
      if (!button) return;
      const price = calculateAmmoPrice(weaponId, this.player.weaponUpgrades);
      button.textContent = `${price} PO`;
      button.disabled = this.player.gold < price;
    });
    const potionBtn = document.getElementById("buy-potion");
    if (potionBtn) potionBtn.textContent = `${calculatePotionPrice(this.floor)} PO`;
    const potionLabel = document.getElementById("potion-shop-label");
    if (potionLabel) potionLabel.textContent = `Poción de Vida (${calculatePotionDice(this.floor)}d4 + 4)`;
    this.updateShopUpgrades();
  }

  updateShopUpgrades() {
    const roman = ["I", "II", "III"];
    this.shopModal?.querySelectorAll("[data-upgrade-for]").forEach(item => {
      const weaponId = item.dataset.upgradeFor;
      const weapon = Object.values(WEAPONS).find(candidate => candidate.id === weaponId);
      const unlocked = this.player.unlockedWeapons.has(weaponId);
      item.classList.remove("hidden");
      if (!weapon) return;

      const level = this.player.weaponUpgrades[weaponId];
      const label = item.querySelector(".upgrade-label");
      const requirement = item.querySelector(".upgrade-requirement");
      const button = item.querySelector("button");
      if (level >= 3) {
        if (label) label.textContent = `${weapon.name}: Mejora III`;
        if (requirement) {
          requirement.textContent = "Nivel máximo";
          requirement.classList.remove("is-blocked");
        }
        button.textContent = "[MÁXIMO]";
        button.disabled = true;
        return;
      }

      if (!Number.isInteger(level) || level < 0) {
        if (requirement) requirement.textContent = "Estado de mejora inválido";
        button.disabled = true;
        return;
      }

      const targetLevel = level + 1;
      const price = calculateWeaponUpgradePrice(weaponId, targetLevel);
      const canAfford = this.player.gold >= price;
      const requirements = [];
      if (!unlocked) requirements.push("Desbloquea el arma en un cofre o comprando munición");
      if (!canAfford) requirements.push(`Faltan ${price - this.player.gold} PO`);

      if (label) label.textContent = `${weapon.name}: Mejora ${roman[level]}`;
      if (requirement) {
        requirement.textContent = requirements.length ? requirements.join(" · ") : "Disponible";
        requirement.classList.toggle("is-blocked", requirements.length > 0);
      }
      button.textContent = `${price} PO`;
      button.disabled = !unlocked || !canAfford;
    });
  }

  purchaseWeaponUpgrade(weaponId) {
    if (!this.inMerchantFloor || !this.isShopOpen()) return false;
    if (!Object.values(WEAPONS).some(weapon => weapon.id === weaponId)) return false;

    const level = this.player.weaponUpgrades[weaponId];
    if (!Number.isInteger(level) || level < 0 || level >= 3) return false;
    if (!this.player.unlockedWeapons.has(weaponId)) return false;

    const price = calculateWeaponUpgradePrice(weaponId, level + 1);
    if (this.player.gold < price) return false;

    this.player.gold -= price;
    this.player.weaponUpgrades[weaponId] = level + 1;
    sounds.playCoin();
    this.updateShopHUD();
    this.updateHUD();
    return true;
  }

  addGold(amount, x = this.player.x, y = this.player.y) {
    const reward = Math.max(0, Math.floor(amount));
    if (reward === 0) return;
    this.player.gold += reward;
    this.updateHUD();
    this.renderer?.showFloatingNumber(x, y, `+${reward} PO`, "gold");
  }

  spawnPickup(type, x, y, amount = 0) {
    const isAvailable = (tileX, tileY) => this.dungeon.getTile(tileX, tileY) === TILE_FLOOR
      && !(tileX === this.player.x && tileY === this.player.y)
      && !this.dungeon.enemies.some(enemy => enemy.cells?.some(cell => cell.x === tileX && cell.y === tileY))
      && !this.dungeon.npcs.some(npc => npc.x === tileX && npc.y === tileY)
      && !this.dungeon.pickups.some(pickup => pickup.x === tileX && pickup.y === tileY);

    let location = null;
    for (let distance = 0; distance < this.dungeon.width + this.dungeon.height && !location; distance++) {
      for (let tileY = Math.max(0, y - distance); tileY <= Math.min(this.dungeon.height - 1, y + distance) && !location; tileY++) {
        for (let tileX = Math.max(0, x - distance); tileX <= Math.min(this.dungeon.width - 1, x + distance); tileX++) {
          if (Math.abs(tileX - x) + Math.abs(tileY - y) === distance && isAvailable(tileX, tileY)) {
            location = { x: tileX, y: tileY };
            break;
          }
        }
      }
    }
    if (!location) return false;
    this.dungeon.pickups.push({ id: Math.random().toString(36).substring(2, 9), type, ...location, amount });
    return true;
  }

  initShopEvents() {
    const btnClose = document.getElementById("close-shop");
    if (btnClose) btnClose.addEventListener("click", () => this.closeShop());

    this.shopModal?.querySelectorAll("[data-shop-view]").forEach(tab => {
      tab.addEventListener("click", () => this.setShopView(tab.dataset.shopView));
    });
    this.shopModal?.querySelectorAll("[data-upgrade-for]").forEach(item => {
      item.querySelector("button")?.addEventListener("click", () => this.purchaseWeaponUpgrade(item.dataset.upgradeFor));
    });

    if (this.dialogModal) {
      this.dialogModal.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dismissMerchantDialog();
      });
    }

    this.shopModal?.querySelectorAll(".shop-item").forEach((item, index) => {
      item.addEventListener("pointerenter", () => {
        this.shopSelection = index;
        this.updateShopSelection();
      });
      item.addEventListener("focusin", () => {
        this.shopSelection = index;
        this.updateShopSelection();
      });
      item.addEventListener("click", event => {
        if (event.target.closest("button")) return;
        this.shopSelection = index;
        this.updateShopSelection();
      });
    });

    const buyPistol = document.getElementById("buy-pistol-ammo");
    if (buyPistol) {
      buyPistol.addEventListener("click", () => {
        const price = calculateAmmoPrice("pistol", this.player.weaponUpgrades);
        if (this.player.gold >= price) {
          this.player.gold -= price;
          this.player.ammoPistol += 6;
          this.player.unlockedWeapons.add(WEAPONS.PISTOL.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log(TEXT.logs.boughtPistol(price));
        }
      });
    }

    const buyMusket = document.getElementById("buy-musket-ammo");
    if (buyMusket) {
      buyMusket.addEventListener("click", () => {
        const price = calculateAmmoPrice("musket", this.player.weaponUpgrades);
        if (this.player.gold >= price) {
          this.player.gold -= price;
          this.player.ammoMusket += 4;
          this.player.unlockedWeapons.add(WEAPONS.MUSKET.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log(TEXT.logs.boughtMusket(price));
        }
      });
    }

    const buyBlunderbuss = document.getElementById("buy-blunderbuss-ammo");
    if (buyBlunderbuss) {
      buyBlunderbuss.addEventListener("click", () => {
        const price = calculateAmmoPrice("blunderbuss", this.player.weaponUpgrades);
        if (this.player.gold >= price) {
          this.player.gold -= price;
          this.player.ammoBlunderbuss += 2;
          this.player.unlockedWeapons.add(WEAPONS.BLUNDERBUSS.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log(TEXT.logs.boughtBlunderbuss(price));
        }
      });
    }

    const buyPotion = document.getElementById("buy-potion");
    if (buyPotion) {
      buyPotion.addEventListener("click", () => {
        const price = calculatePotionPrice(this.floor);
        if (this.player.gold >= price) {
          const heal = rollPotionHealing(this.floor);
          const canRestore = this.player.hp < this.player.maxHp
            || this.player.extraHp < this.player.maxExtraHp;
          if (canRestore) {
            this.player.gold -= price;
            const restored = restoreHealth(this.player, heal);
            if (restored.totalRestored > 0) {
              this.renderer.showFloatingNumber(this.player.x, this.player.y, `+${restored.totalRestored} HP`, "healing");
            }
            sounds.playHeal();
            this.updateHUD();
            this.updateShopHUD();
            this.log(TEXT.logs.boughtPotion(restored.totalRestored, price));
          }
        }
      });
    }
  }

  log(message) {
    const status = document.getElementById("hud-status");
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-fading");
    clearTimeout(this.statusMessageTimer);
    clearTimeout(this.statusMessageFadeTimer);
    this.statusMessageFadeTimer = setTimeout(() => status.classList.add("is-fading"), 2700);
    this.statusMessageTimer = setTimeout(() => {
      if (status.textContent === message) {
        status.textContent = "";
        status.classList.remove("is-fading");
      }
    }, 3000);
  }

  updateHUD() {
    const elFloor = document.getElementById("hud-floor");
    const elDir = document.getElementById("hud-dir");
    const elDirArrow = document.getElementById("hud-dir-arrow");
    const elVitals = document.getElementById("hud-vitals");
    const elHpFill = document.getElementById("hud-hp-fill");
    const elExtraFill = document.getElementById("hud-extra-fill");
    const elGold = document.getElementById("hud-gold");
    const elAmmo = document.getElementById("hud-ammo");
    const elAmmoDisplay = document.getElementById("hud-ammo-display");
    const elWeapon = document.getElementById("hud-weapon");
    const elWeaponIcon = document.getElementById("hud-weapon-icon");
    const elMisty = document.getElementById("misty-charges");
    const elBlastBadge = document.getElementById("hud-blast-badge");
    const elMistyBadge = document.getElementById("hud-misty-badge");

    this.player.ensureEquippedWeaponAvailable();
    this.player.maxExtraHp = calculateMaxExtraHP(this.player.maxHp);
    this.player.extraHp = Math.max(0, Math.min(this.player.extraHp, this.player.maxExtraHp));
    const directionNames = ["Norte", "Este", "Sur", "Oeste"];
    const directionArrows = ["↑", "→", "↓", "←"];
    const totalHealthCapacity = Math.max(1, this.player.maxHp + this.player.maxExtraHp);
    if (elFloor) elFloor.textContent = String(this.floor).padStart(2, "0");
    if (elDir) elDir.textContent = directionNames[this.player.direction];
    if (elDirArrow) elDirArrow.textContent = directionArrows[this.player.direction];
    if (elVitals) elVitals.textContent = `${this.player.hp} / ${this.player.maxHp} (+${this.player.extraHp})`;
    if (elHpFill) elHpFill.style.width = `${(this.player.hp / totalHealthCapacity) * 100}%`;
    if (elExtraFill) elExtraFill.style.width = `${(this.player.extraHp / totalHealthCapacity) * 100}%`;
    if (elGold) elGold.textContent = this.player.gold;
    const weapon = this.player.equippedWeapon;
    if (elAmmo) elAmmo.textContent = weapon.ammoProperty ? this.player[weapon.ammoProperty] : "∞";
    if (elAmmoDisplay) elAmmoDisplay.classList.toggle("weapon-ammo-infinite", !weapon.ammoProperty);
    if (elWeapon) elWeapon.textContent = this.player.equippedWeapon.name;
    if (elWeaponIcon) {
      const upgradeClass = ["", "weapon-tier-bronze", "weapon-tier-silver", "weapon-tier-gold"]
        [this.player.weaponUpgrades[weapon.id] || 0];
      elWeaponIcon.className = `weapon-icon weapon-icon-${weapon.id} ${upgradeClass}`.trim();
      elWeaponIcon.textContent = "";
    }
    if (elMisty) elMisty.textContent = this.player.mistyStepCharges;
    if (elMistyBadge) elMistyBadge.classList.toggle("is-ready", this.player.mistyStepCharges > 0);
    if (elBlastBadge) elBlastBadge.classList.toggle("is-ready", this.player.isBlastReady());

    const doorEl = document.getElementById("hud-door");
    const exitIcon = document.querySelector(".exit-icon");
    if (doorEl) {
      const enemiesRemain = this.dungeon.enemies.length > 0;
      if (enemiesRemain) {
        doorEl.textContent = TEXT.doorLocked(this.dungeon.enemies.length);
        doorEl.className = "door-locked";
        if (exitIcon) exitIcon.style.color = "#ffd700";
      } else {
        doorEl.textContent = TEXT.doorOpen;
        doorEl.className = "door-open";
        if (exitIcon) exitIcon.style.color = "#39ef73";
      }
    }

    const blastCounter = document.getElementById("blast-counter");
    if (blastCounter) {
      blastCounter.textContent = `${this.player.blastCurrentCharges}/${this.player.blastMaxCharges}`;
    }
  }

  summonBossRoomMinion() {
    const limit = getBossRoomMinionLimit(this.tier);
    const alive = this.dungeon.enemies.filter(e => !e.isBoss).length;
    if (alive >= limit) return;

    const freeCells = [];
    for (let y = 0; y < this.dungeon.height; y++) {
      for (let x = 0; x < this.dungeon.width; x++) {
        if (this.dungeon.getTile(x, y) !== TILE_FLOOR) continue;
        if (x === this.player.x && y === this.player.y) continue;
        if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === x && c.y === y))) continue;
        freeCells.push({ x, y });
      }
    }
    if (freeCells.length === 0) return;

    const distant = freeCells.filter(c => Math.hypot(c.x - this.player.x, c.y - this.player.y) >= 3);
    const pool = distant.length > 0 ? distant : freeCells;
    const spot = pool[Math.floor(Math.random() * pool.length)];
    this.dungeon.enemies.push(createMinion(this.floor, spot.x, spot.y, 3));
  }

  triggerGameOver() {
    sounds.playDeath();
    this.log(TEXT.logs.deadPlayer);

    setTimeout(() => {
      const stats = document.getElementById("death-stats-display");
      const title = document.querySelector(".death-title");
      const desc = document.querySelector(".death-desc");
      const btn = document.getElementById("btn-restart-game");

      if (title) title.textContent = TEXT.death.title;
      if (desc) desc.textContent = TEXT.death.desc;
      if (btn) btn.textContent = TEXT.death.btn;
      if (stats) stats.innerHTML = TEXT.death.stats(this.floor, this.player.kills, this.player.gold);

      this.deathScreen.classList.remove("hidden");
      this.deathScreen.classList.add("visible");
    }, 1200);
  }

  startVictorySequence() {
    this.isVictory = true;
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

          if (title) title.textContent = TEXT.victory.title;
          if (desc) desc.innerHTML = TEXT.victory.desc;
          if (stats) stats.innerHTML = TEXT.victory.stats(this.player.kills, this.player.gold);
          if (btn) btn.textContent = TEXT.victory.btn;

          this.victoryScreen.classList.remove("hidden");
          this.victoryScreen.classList.add("visible");
          sounds.playLogoJingle();
        }, 800);
      }
    }, 400);
  }

  clearMistyStepConfirmation() {
    this.mistyStepConfirmation = null;
  }

  consumeStunnedTurn() {
    if (!this.player.stunned) return false;
    this.player.stunned = false;
    this.clearMistyStepConfirmation();
    this.player.advanceAction();
    this.log(TEXT.logs.stunned("Lior"));
    this.processEnemiesTurn();
    this.updateHUD();
    this.renderer.draw();
    return true;
  }

  castMistyStep(maxSteps = 8, directionOverride = null) {
    if (this.isGameplayBlocked()) return;

    // En el Paso 4 del tutorial (Misty Step), demuestra el salto sin consumir cargas reales
    if (this.tutorial?.isActive && this.tutorial.step === 4) {
      sounds.playMisty();
      this.player.direction = ((this.player.direction % 4) + 4) % 4;
      this.renderer.commitCameraFacing();
      this.renderer.playMistyStep();
      this.tutorial.onPlayerAction("misty_step");
      this.updateHUD();
      this.renderer.draw();
      return;
    }

    if (this.consumeStunnedTurn()) return;
    this.showWeaponRange = false;
    if (this.player.mistyStepCharges <= 0) return;

    const destination = this.getMistyStepDestination(directionOverride, maxSteps);
    if (destination.blocked || destination.canceled) return;
    const confirmation = this.mistyStepConfirmation;
    const isConfirmed = confirmation
      && confirmation.floor === this.floor
      && confirmation.x === destination.x
      && confirmation.y === destination.y;

    if (destination.dangerous && !isConfirmed) {
      this.mistyStepConfirmation = { floor: this.floor, x: destination.x, y: destination.y };
      this.showMerchantDialog("«Sería mejor que no me transporte ahí...»", null, "LIOR");
      return;
    }

    this.mistyStepConfirmation = null;
    this.player.advanceAction();
    sounds.playMisty();
    this.player.mistyStepCharges--;

    // Asegurar que la orientación visual de Lior se mantenga en una de las 4 direcciones cardinales (0..3)
    if (destination.cardinal !== undefined) {
      this.player.direction = ((destination.cardinal % 4) + 4) % 4;
    } else {
      this.player.direction = ((this.player.direction % 4) + 4) % 4;
    }

    if (destination.dangerous) {
      this.player.x = destination.x;
      this.player.y = destination.y;
      this.player.hp = 0;
      this.updateHUD();
      this.renderer.draw();
      this.triggerGameOver();
      return;
    }

    this.player.x = destination.x;
    this.player.y = destination.y;
    this.renderer.commitCameraFacing();
    this.renderer.playMistyStep();
    this.handleTileInteractions();
    this.updateHUD();
  }

  /**
   * Calcula el destino de Misty Step en cualquiera de las 8 direcciones (incluidas las diagonales)
   * con un rango de 1 a 8 casillas, manteniendo la regla de que si hay un muro se queda detrás del muro,
   * y conservando siempre una orientación visual cardinal (0..3) para Lior.
   */
  getMistyStepDestination(directionOverride = null, maxSteps = 8) {
    let dirVec;
    let cardinal = ((this.player.direction % 4) + 4) % 4;

    if (directionOverride && typeof directionOverride === "object" && ("dx" in directionOverride || "x" in directionOverride)) {
      const dx = Math.sign(directionOverride.dx ?? directionOverride.x ?? 0);
      const dy = Math.sign(directionOverride.dy ?? directionOverride.y ?? 0);
      dirVec = { x: dx, y: dy };
      cardinal = directionOverride.cardinal !== undefined
        ? (((directionOverride.cardinal % 4) + 4) % 4)
        : TouchGestureController.vectorToCardinal(dx, dy);
    } else {
      const dir = directionOverride !== null && directionOverride !== undefined
        ? (((directionOverride % 4) + 4) % 4)
        : cardinal;
      dirVec = DIR_VECTORS[dir];
      cardinal = dir;
    }

    const clampedMax = Math.max(1, Math.min(8, Math.round(maxSteps || 8)));
    let encounteredObstacle = false;
    let lastValidBeforeWall = null;

    for (let step = 1; step <= 8; step++) {
      const cx = this.player.x + dirVec.x * step;
      const cy = this.player.y + dirVec.y * step;

      if (!this.dungeon.isInsideBounds(cx, cy)) {
        if (lastValidBeforeWall) {
          return { ...lastValidBeforeWall, dangerous: false, blocked: false, steps: clampedMax, dirVec, cardinal };
        }
        return { x: cx, y: cy, dangerous: true, blocked: false, steps: clampedMax, dirVec, cardinal };
      }

      const tile = this.dungeon.getTile(cx, cy);
      const enemy = this.dungeon.enemies.some(candidate =>
        candidate.cells?.some(cell => cell.x === cx && cell.y === cy)
      );
      if (tile === TILE_WALL || enemy) {
        encounteredObstacle = true;
      } else {
        if (!encounteredObstacle) {
          lastValidBeforeWall = { x: cx, y: cy };
        }
        if (encounteredObstacle || step === clampedMax) {
          return { x: cx, y: cy, dangerous: false, blocked: false, steps: step, dirVec, cardinal };
        }
      }
    }

    if (lastValidBeforeWall) {
      return { ...lastValidBeforeWall, dangerous: false, blocked: false, steps: clampedMax, dirVec, cardinal };
    }
    return { x: this.player.x, y: this.player.y, dangerous: false, blocked: true, steps: clampedMax, dirVec, cardinal };
  }

  castEldritchBlast() {
    if (this.isGameplayBlocked()) return;

    // En el Paso 3 del tutorial (Eldritch Blast), demuestra el disparo sin consumir cargas
    if (this.tutorial?.isActive && this.tutorial.step === 3) {
      sounds.playEldritchBlast();
      this.renderer.commitCameraFacing();
      this.renderer.playEldritchBlastAnimation(5);
      this.tutorial.onPlayerAction("eldritch_blast");
      this.updateHUD();
      this.renderer.draw();
      return;
    }

    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.showWeaponRange = false;

    if (this.inMerchantFloor) {
      this.log(TEXT.logs.merchantNoAttack);
      return;
    }

    if (!this.player.isBlastReady()) {
      const remaining = this.player.blastMaxCharges - this.player.blastCurrentCharges;
      this.log(TEXT.logs.blastCharging(remaining));
      return;
    }

    const dirVec = DIR_VECTORS[this.player.direction];
    let hitEnemy = null;
    let beamReach = 8;

    for (let dist = 1; dist <= 8; dist++) {
      const targetX = this.player.x + dirVec.x * dist;
      const targetY = this.player.y + dirVec.y * dist;

      if (!this.dungeon.isInsideBounds(targetX, targetY) || this.dungeon.getTile(targetX, targetY) === TILE_WALL) {
        beamReach = dist - 0.5;
        break;
      }

      const enemyAtCell = this.dungeon.enemies.find(e => e.cells && e.cells.some(c => c.x === targetX && c.y === targetY));
      if (enemyAtCell) {
        hitEnemy = enemyAtCell;
        beamReach = dist;
        break;
      }
    }

    sounds.playEldritchBlast();
    this.player.blastCurrentCharges = 0;
    this.renderer.commitCameraFacing();
    const rayCount = calculateEldritchBlastRayCount(this.floor);
    const damageByRay = splitDamageAcrossRays(calculateEldritchBlastDamage(this.floor), rayCount);
    this.renderer.playEldritchBlastAnimation(beamReach);

    if (hitEnemy) {
      let blastDamage = 0;
      damageByRay.forEach(rayDamage => {
        blastDamage += CombatSystem.applyDamageToEnemy(this, hitEnemy, rayDamage, false);
      });
      if (blastDamage > 0) this.renderer.showFloatingNumber(hitEnemy.x, hitEnemy.y, `-${blastDamage} HP`, "damage");
      if (hitEnemy.hp > 0) this.renderer.playEnemyAnim(hitEnemy, "hurt");
      this.log(TEXT.logs.blastFired(hitEnemy.name, blastDamage, rayCount));
      CombatSystem.applyPanic(this, CombatSystem.processDeaths(this, [hitEnemy]));
    } else {
      this.log(TEXT.logs.blastWhiff);
    }

    this.processEnemiesTurn();
    this.updateHUD();
    this.renderer.draw();
  }

  cycleWeapon(showToast = true) {
    if (this.isGameplayBlocked()) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    if (this.player.getAvailableWeapons().length < 2) return;

    this.player.cycleWeapon();
    this.showWeaponRange = true;
    if (!this.player.equippedWeapon.isMelee) this.renderer.commitCameraFacing();
    sounds.playStep();

    const w = this.player.equippedWeapon;
    const ammoInfo = w.ammoProperty ? ` (${this.player[w.ammoProperty]} balas)` : " (∞)";
    if (showToast) {
      this.showWeaponToast(`⚔ ARMA: ${w.name.toUpperCase()}${ammoInfo}`);
    }

    this.tutorial?.onPlayerAction("weapon_switch");
    this.updateHUD();
    this.renderer.draw();
  }

  turnLeft() {
    if (this.isGameplayBlocked()) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.player.turnLeft();
    this.showWeaponRange = true;
    this.renderer.commitCameraFacing();
    sounds.playStep();

    const facingPos = this.player.getNextForwardPos(1);
    if (this.isMerchantAt(facingPos.x, facingPos.y)) {
      this.updateHUD();
      this.renderer.draw();
      this.triggerMerchantInteraction();
      return;
    }

    this.updateHUD();
    this.renderer.draw();
  }

  turnRight() {
    if (this.isGameplayBlocked()) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.player.turnRight();
    this.showWeaponRange = true;
    this.renderer.commitCameraFacing();
    sounds.playStep();

    const facingPos = this.player.getNextForwardPos(1);
    if (this.isMerchantAt(facingPos.x, facingPos.y)) {
      this.updateHUD();
      this.renderer.draw();
      this.triggerMerchantInteraction();
      return;
    }

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

    const miniBosses = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss);
    const enemySnapshot = [...this.dungeon.enemies];
    let tookDamage = false;
    this.dungeon.turnCount++;

    enemySnapshot.forEach(enemy => {
      if (this.player.hp <= 0) return;
      if (!this.dungeon.enemies.includes(enemy) || !enemy.cells || enemy.cells.length === 0) return;

      if (enemy.stunned) {
        enemy.stunned = false;
        this.log(TEXT.logs.stunned(enemy.name));
        return;
      }

      if (this.dungeon.isBossRoom) enemy.fearCooldown = 0;
      if (enemy.fearCooldown > 0) enemy.fearCooldown--;

      const distToPlayer = CombatSystem.getMinDistToPlayer(this.player, enemy);
      const hasLOS = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);

      let canAttack = hasLOS && distToPlayer <= enemy.attackRange && enemy.fearCooldown === 0;
      if (canAttack && enemy.isMegaBoss) {
        if (enemy.bossAttackReady) enemy.bossAttackReady = false;
        else { enemy.bossAttackReady = true; canAttack = false; }
      }

      if (canAttack) {
        const attack = CombatSystem.resolveD20Attack(
          enemy,
          this.player,
          calculateEnemyAttackBonus(this.floor)
        );
        if (!attack) return;

        this.renderer.playEnemyAnim(enemy, "attack");
        const isRanged = enemy.isBoss || enemy.ranged || distToPlayer > 1;
        const impactDelay = isRanged ? this.renderer.fireEnemyProjectile(enemy, attack.hit) : 0;
        let totalDmg = 0;
        let hitMessage = "";

        if (attack.hit) {
          const [damageDice, damageSides, flatBonus] = getEnemyDamageProfile(enemy);
          const baseDamage = CombatSystem.rollDamageDice(damageDice, damageSides) + flatBonus;
          totalDmg = attack.critical ? Math.ceil(baseDamage * 1.5) : baseDamage;
          hitMessage = TEXT.logs.enemyHit(enemy.name, attack.total, this.player.ac, totalDmg);
        }

        if (isRanged) {
          const turnDungeon = this.dungeon;
          this.pendingEnemyProjectiles++;
          this.isAnimatingTurn = true;
          setTimeout(() => {
            try {
              if (this.dungeon !== turnDungeon || this.player.hp <= 0 || this.isVictory || !attack.hit) return;
              sounds.playHurt();
              CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
              this.log(hitMessage);
              this.updateHUD();
              this.renderer.playHurt(this.player.hp <= 0);
              if (this.player.hp <= 0) this.triggerGameOver();
            } finally {
              this.pendingEnemyProjectiles = Math.max(0, this.pendingEnemyProjectiles - 1);
              this.isAnimatingTurn = this.pendingEnemyProjectiles > 0;
            }
          }, impactDelay);
        }

        if (attack.fumble) {
          enemy.stunned = true;
          this.log(TEXT.logs.criticalMiss(enemy.name));
          return;
        }

        if (attack.hit && !isRanged) {
          sounds.playHurt();
          CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
          tookDamage = true;
          this.log(hitMessage);
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

      if (this.dungeon.isBossRoom) mode = "chase";

      let directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];

      if (enemy.isMegaBoss) {
        const lastCol = Math.max(...enemy.cells.map(c => c.x));
        if (this.player.x < enemy.x) directions = [{ dx: -1, dy: 0 }];
        else if (this.player.x > lastCol) directions = [{ dx: 1, dy: 0 }];
        else directions = [];
      } else if (mode === "flee") {
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

    if (tookDamage) this.renderer.playHurt(this.player.hp <= 0);

    if (this.player.hp > 0 && this.dungeon.isBossRoom && this.dungeon.turnCount % 4 === 0
      && this.dungeon.enemies.some(e => e.isMegaBoss)) {
      this.summonBossRoomMinion();
    }

    if (this.player.hp > 0) {
      this.dungeon.npcs.forEach(npc => {
        if (!npc.isMerchant) this.moveGoldenBunny(npc);
      });
    }
    if (this.player.hp <= 0) this.triggerGameOver();
  }

  moveStep(dx, dy, facingCardinal = null) {
    if (this.isGameplayBlocked()) return false;
    if (this.consumeStunnedTurn()) return false;
    this.clearMistyStepConfirmation();
    this.showWeaponRange = false;

    if (facingCardinal !== null && facingCardinal !== undefined) {
      this.player.direction = ((facingCardinal % 4) + 4) % 4;
    } else if (dx !== 0 || dy !== 0) {
      this.player.direction = TouchGestureController.vectorToCardinal(dx, dy);
    }

    let nextX = this.player.x + dx;
    let nextY = this.player.y + dy;

    const isWalkableCell = (cx, cy) => {
      if (!this.dungeon.isInsideBounds(cx, cy)) return false;
      if (this.dungeon.getTile(cx, cy) === TILE_WALL) return false;
      if (this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === cx && c.y === cy))) return false;
      if (this.isMerchantAt(cx, cy)) return false;
      return true;
    };

    if (dx !== 0 && dy !== 0 && !isWalkableCell(nextX, nextY)) {
      if (isWalkableCell(this.player.x, this.player.y + dy)) {
        dx = 0;
        nextX = this.player.x;
        nextY = this.player.y + dy;
        this.player.direction = dy < 0 ? 0 : 2;
      } else if (isWalkableCell(this.player.x + dx, this.player.y)) {
        dy = 0;
        nextX = this.player.x + dx;
        nextY = this.player.y;
        this.player.direction = dx > 0 ? 1 : 3;
      }
    }

    if (!this.dungeon.isInsideBounds(nextX, nextY)) {
      this.renderer.commitCameraFacing();
      this.updateHUD();
      this.renderer.draw();
      this.log(TEXT.logs.outOfBounds);
      return false;
    }

    if (this.dungeon.getTile(nextX, nextY) === TILE_WALL) {
      this.renderer.commitCameraFacing();
      this.updateHUD();
      this.renderer.draw();
      this.log(TEXT.logs.wallFront);
      return false;
    }

    if (dx !== 0 && dy !== 0) {
      const wallHoriz = this.dungeon.getTile(this.player.x + dx, this.player.y) === TILE_WALL;
      const wallVert = this.dungeon.getTile(this.player.x, this.player.y + dy) === TILE_WALL;
      if (wallHoriz && wallVert) {
        this.renderer.commitCameraFacing();
        this.updateHUD();
        this.renderer.draw();
        this.log(TEXT.logs.wallCorner);
        return false;
      }
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === nextX && c.y === nextY));
    if (enemyBlocking) {
      this.renderer.commitCameraFacing();
      this.updateHUD();
      this.renderer.draw();
      this.log(TEXT.logs.enemyBlock);
      return false;
    }

    if (this.isMerchantAt(nextX, nextY)) {
      this.renderer.commitCameraFacing();
      this.updateHUD();
      this.renderer.draw();
      this.triggerMerchantInteraction();
      return false;
    }

    const isTutorialMovePractice = this.tutorial?.isActive && this.tutorial.step === 1;
    if (!isTutorialMovePractice) {
      this.player.advanceAction();
    }
    this.player.x = nextX;
    this.player.y = nextY;
    sounds.playStep();
    this.renderer.commitCameraFacing();
    this.renderer.playWalk();

    this.tutorial?.onPlayerAction("move");
    this.checkGoldenBunnyCapture();
    if (!isTutorialMovePractice) {
      this.processEnemiesTurn();
    }
    this.handleTileInteractions();
    this.updateHUD();
    this.renderer.draw();
    return true;
  }

  moveForward() {
    const v = DIR_VECTORS[this.player.direction];
    return this.moveStep(v.x, v.y, this.player.direction);
  }

  moveCardinal(direction) {
    const dir = ((direction % 4) + 4) % 4;
    const v = DIR_VECTORS[dir];
    return this.moveStep(v.x, v.y, dir);
  }

  moveBackward() {
    if (this.isGameplayBlocked()) return false;
    if (this.consumeStunnedTurn()) return false;
    this.clearMistyStepConfirmation();
    this.showWeaponRange = false;

    const prev = this.player.getNextBackwardPos();
    if (!this.dungeon.isInsideBounds(prev.x, prev.y)) {
      this.log(TEXT.logs.backOutOfBounds);
      return false;
    }
    if (this.dungeon.getTile(prev.x, prev.y) === TILE_WALL) {
      this.log(TEXT.logs.wallBack);
      return false;
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === prev.x && c.y === prev.y));
    if (enemyBlocking) {
      this.log(TEXT.logs.enemyBlockBack);
      return false;
    }

    if (this.isMerchantAt(prev.x, prev.y)) {
      this.triggerMerchantInteraction();
      return false;
    }

    this.player.advanceAction();
    this.player.moveBackward();
    sounds.playStep();
    this.renderer.commitCameraFacing();
    this.renderer.playWalk();
    this.tutorial?.onPlayerAction("move");
    this.checkGoldenBunnyCapture();
    this.processEnemiesTurn();
    this.handleTileInteractions();
    this.renderer.draw();
    return true;
  }

  openChest() {
    const chestKey = this.dungeon.getKey(this.player.x, this.player.y);
    if (!this.dungeon.chests.has(chestKey)) return;

    this.dungeon.chests.delete(chestKey);
    this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    this.renderer.playChestOpening(this.player.x, this.player.y);
    sounds.playCoin();

    if (Math.random() < 0.5) {
      const restored = restoreHealth(this.player, rollPotionHealing(this.floor));
      if (restored.totalRestored > 0) {
        this.renderer.showFloatingNumber(this.player.x, this.player.y, `+${restored.totalRestored} HP`, "healing");
      }
      sounds.playHeal();
      this.renderer.playDrinkPotion();
      this.log(TEXT.logs.chestPotion(restored.totalRestored));
    } else {
      const weaponOptions = [WEAPONS.PISTOL, WEAPONS.MUSKET, WEAPONS.BLUNDERBUSS];
      const weapon = weaponOptions[Math.floor(Math.random() * weaponOptions.length)];
      const ammoDice = { pistol: 6, musket: 4, blunderbuss: 2 }[weapon.id];
      const ammo = rollDie(ammoDice) + Math.floor((this.tier - 1) * 1.5);
      const isNewWeapon = !this.player.unlockedWeapons.has(weapon.id);
      this.player.unlockedWeapons.add(weapon.id);
      this.player[weapon.ammoProperty] += ammo;

      if (isNewWeapon) {
        this.log(TEXT.logs.chestWeapon(weapon.name, ammo));
      } else {
        this.log(TEXT.logs.chestAmmo(weapon.name, ammo));
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
      this.addGold(5, this.player.x, this.player.y);
      sounds.playCoin();
      this.log(TEXT.logs.bunnyCaught);
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
    this.collectGroundPickups();
    this.updateHUD();

    if (this.player.x === this.dungeon.exit.x && this.player.y === this.dungeon.exit.y) {
      if (this.dungeon.enemies.length > 0) {
        this.log(TEXT.logs.exitLocked(this.dungeon.enemies.length));
      } else {
        if (this.floor >= 100) {
          this.startVictorySequence();
          return;
        }

        sounds.playCoin();
        this.log(TEXT.logs.exitDescend);

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

  collectGroundPickups() {
    const collected = this.dungeon.pickups.filter(pickup => pickup.x === this.player.x && pickup.y === this.player.y);
    const consumed = new Set();
    collected.forEach(pickup => {
      if (pickup.type === "gold") {
        this.addGold(pickup.amount, pickup.x, pickup.y);
        sounds.playCoin();
        consumed.add(pickup);
        return;
      }

      const restored = restoreHealth(this.player, rollPotionHealing(this.floor));
      if (restored.totalRestored === 0) return;
      this.renderer.showFloatingNumber(pickup.x, pickup.y, `+${restored.totalRestored} HP`, "healing");
      sounds.playHeal();
      consumed.add(pickup);
    });
    this.dungeon.pickups = this.dungeon.pickups.filter(pickup => !consumed.has(pickup));
    if (consumed.size > 0) this.updateHUD();
  }

  bindEvents() {
    const isFixed = () => this.renderer.cameraMode === "fixed";
    const dpadActions = {
      "btn-forward": () => isFixed() ? this.moveCardinal(0) : this.moveForward(),
      "btn-right": () => isFixed() ? this.moveCardinal(1) : this.turnRight(),
      "btn-backward": () => isFixed() ? this.moveCardinal(2) : this.moveBackward(),
      "btn-left": () => isFixed() ? this.moveCardinal(3) : this.turnLeft()
    };
    const HOLD_DELAY_MS = 250;
    const HOLD_REPEAT_MS = 180;
    let holdDelayTimer = null;
    let holdRepeatTimer = null;
    const stopHold = () => {
      clearTimeout(holdDelayTimer);
      clearInterval(holdRepeatTimer);
      holdDelayTimer = null;
      holdRepeatTimer = null;
    };
    this.stopDpadHold = stopHold;

    for (const [id, action] of Object.entries(dpadActions)) {
      const btn = document.getElementById(id);
      if (!btn) continue;
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        stopHold();
        action();
        holdDelayTimer = setTimeout(() => {
          holdRepeatTimer = setInterval(() => {
            if (this.isGameplayBlocked()) {
              stopHold();
              return;
            }
            action();
          }, HOLD_REPEAT_MS);
        }, HOLD_DELAY_MS);
      });
      for (const type of ["pointerup", "pointercancel", "pointerleave", "touchend", "touchcancel", "mouseleave"]) {
        btn.addEventListener(type, stopHold);
      }
      btn.addEventListener("click", (e) => { if (e.detail === 0) action(); });
    }
    window.addEventListener("blur", stopHold);
    document.addEventListener("visibilitychange", stopHold);
    window.addEventListener("pointerup", stopHold);
    window.addEventListener("pointercancel", stopHold);

    document.getElementById("btn-d")?.addEventListener("click", () => this.cycleWeapon());
    document.getElementById("btn-c")?.addEventListener("click", () => this.castEldritchBlast());
    document.getElementById("btn-b")?.addEventListener("click", () => this.castMistyStep());
    document.getElementById("btn-a")?.addEventListener("click", () => {
      CombatSystem.executeAttack(this);
    });

    const restartBtn = document.getElementById("btn-restart-game");
    if (restartBtn) restartBtn.addEventListener("click", () => this.resetGame());

    window.addEventListener("keydown", (e) => {
      if (this.isVictory) return;

      if (this.isIntroActive()) {
        if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen();
          e.preventDefault();
        } else if (e.key === "Escape") {
          this.narrativeIntro.finish(true);
          e.preventDefault();
        } else if (["Enter", " ", "ArrowRight"].includes(e.key)) {
          this.narrativeIntro.advanceOrReveal();
          e.preventDefault();
        }
        return;
      }

      if (this.tutorial?.isHelpModalOpen()) {
        if (["Escape", "Enter", " ", "m", "M"].includes(e.key)) {
          this.tutorial.closeHelpModal();
          e.preventDefault();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen(true);
          e.preventDefault();
        }
        return;
      }

      if (this.isShopOpen()) {
        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            if (!e.repeat) this.moveShopSelection(-1);
            e.preventDefault();
            break;
          case "ArrowDown":
          case "s":
          case "S":
            if (!e.repeat) this.moveShopSelection(1);
            e.preventDefault();
            break;
          case "ArrowLeft":
          case "ArrowRight":
            if (!e.repeat) {
              const nextView = this.activeShopView === "supplies" ? "upgrades" : "supplies";
              this.setShopView(nextView, true);
            }
            e.preventDefault();
            break;
          case "Enter":
          case " ":
            if (!e.repeat) {
              const focusedTab = e.target.closest?.("[data-shop-view]");
              if (focusedTab) focusedTab.click();
              else this.purchaseSelectedShopItem();
            }
            e.preventDefault();
            break;
          case "Escape":
            this.closeShop();
            e.preventDefault();
            break;
        }
        return;
      }

      if (this.isPausedForDialog) {
        if (["Enter", " ", "Escape"].includes(e.key)) {
          this.dismissMerchantDialog();
          e.preventDefault();
        }
        return;
      }

      const fixedCamera = this.renderer.cameraMode === "fixed";
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          if (fixedCamera) this.moveCardinal(3);
          else this.turnLeft();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (fixedCamera) this.moveCardinal(1);
          else this.turnRight();
          break;
        case "ArrowUp":
        case "w":
        case "W":
          if (fixedCamera) this.moveCardinal(0);
          else this.moveForward();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (fixedCamera) this.moveCardinal(2);
          else this.moveBackward();
          break;
        case "q":
        case "Q":
          this.moveStep(-1, -1, 0);
          break;
        case "e":
        case "E":
          this.moveStep(1, -1, 0);
          break;
        case "z":
        case "Z":
          this.moveStep(-1, 1, 2);
          break;
        case "c":
        case "C":
          this.moveStep(1, 1, 2);
          break;
        case "k":
        case "K":
          if (!e.repeat) CombatSystem.executeAttack(this);
          break;
        case "Enter":
        case " ":
          if (e.target?.closest?.("button")) break;
          if (!e.repeat) CombatSystem.executeAttack(this);
          break;
        case "l":
        case "L":
          if (!e.repeat) this.castMistyStep(8);
          break;
        case "j":
        case "J":
          if (!e.repeat) this.castEldritchBlast();
          break;
        case "i":
        case "I":
          if (!e.repeat) this.cycleWeapon();
          break;
        case "f":
        case "F":
          if (!e.repeat) this.toggleFullscreen(true);
          break;
        case "m":
        case "M":
          if (!e.repeat) this.tutorial?.openHelpModal();
          break;
        case "Escape":
          if (this.isShopOpen()) this.closeShop();
          else this.tutorial?.openHelpModal();
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
        const threshold = 0.25;
        const rawAxisX = gp.axes[0] || 0;
        const rawAxisY = gp.axes[1] || 0;
        const axisX = Math.abs(rawAxisX) >= threshold ? Math.sign(rawAxisX) : 0;
        const axisY = Math.abs(rawAxisY) >= threshold ? Math.sign(rawAxisY) : 0;
        const btnStates = gp.buttons.map(button => button.pressed);
        if ((axisX || axisY || btnStates.some(Boolean)) && this.controlDevice !== "gamepad") {
          this.setControlDevice("gamepad");
        }
        const pressedThisFrame = index => !!btnStates[index] && !this.lastGamepadButtons[index];
        const dpadUp = !!gp.buttons[12]?.pressed;
        const dpadDown = !!gp.buttons[13]?.pressed;
        const dpadLeft = !!gp.buttons[14]?.pressed;
        const dpadRight = !!gp.buttons[15]?.pressed;
        const inputX = dpadLeft ? -1 : (dpadRight ? 1 : axisX);
        const inputY = dpadUp ? -1 : (dpadDown ? 1 : axisY);
        const movedX = inputX !== 0 && inputX !== this.lastGamepadAxes.x;
        const movedY = inputY !== 0 && inputY !== this.lastGamepadAxes.y;
        const gamepadActions = ACTION_BINDINGS.gamepad;
        const shopOpen = this.isShopOpen();

        if (this.isIntroActive()) {
          if (pressedThisFrame(gamepadActions.attack.index)) this.narrativeIntro.advanceOrReveal();
          if (pressedThisFrame(gamepadActions.mist.index) || pressedThisFrame(9)) this.narrativeIntro.finish(true);
        } else if (shopOpen) {
          if (movedY) this.moveShopSelection(inputY < 0 ? -1 : 1);
          if (movedX) this.setShopView(this.activeShopView === "supplies" ? "upgrades" : "supplies");
          if (pressedThisFrame(gamepadActions.attack.index)) this.purchaseSelectedShopItem();
          if (pressedThisFrame(gamepadActions.mist.index)) this.closeShop();
        } else if (this.isPausedForDialog) {
          if (pressedThisFrame(gamepadActions.attack.index)
            || pressedThisFrame(gamepadActions.mist.index)
            || pressedThisFrame(9)) this.dismissMerchantDialog();
        } else if (this.isAnimatingTurn) {
          // Espera a que terminen los proyectiles en vuelo
        } else if (this.player.stunned && (movedY || movedX
          || pressedThisFrame(gamepadActions.attack.index)
          || pressedThisFrame(gamepadActions.mist.index)
          || pressedThisFrame(gamepadActions.blast.index)
          || pressedThisFrame(gamepadActions.weapon.index)
          || gamepadActions.weaponAlt.some(pressedThisFrame))) {
          this.consumeStunnedTurn();
        } else {
          if (movedY || movedX) {
            if (movedX && movedY) {
              this.moveStep(inputX, inputY);
            } else if (movedY) {
              this.moveCardinal(inputY < 0 ? 0 : 2);
            } else if (movedX) {
              this.moveCardinal(inputX < 0 ? 3 : 1);
            }
          }

          if (pressedThisFrame(gamepadActions.attack.index)) CombatSystem.executeAttack(this);
          if (pressedThisFrame(gamepadActions.mist.index)) this.castMistyStep(8);
          if (pressedThisFrame(gamepadActions.blast.index)) this.castEldritchBlast();
          if (pressedThisFrame(gamepadActions.weapon.index)
            || gamepadActions.weaponAlt.some(pressedThisFrame)) this.cycleWeapon();
        }

        this.lastGamepadAxes.x = inputX;
        this.lastGamepadAxes.y = inputY;
        this.lastGamepadButtons = btnStates;
      } else {
        this.lastGamepadAxes = { x: 0, y: 0 };
        this.lastGamepadButtons = [];
      }
      requestAnimationFrame(pollGamepad);
    };
    requestAnimationFrame(pollGamepad);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const SPLASH_FADE_MS = 650;
  const SPLASH_STAY_MS = 950;
  const splashScreen = document.getElementById("splash-screen");
  const splashLogo = splashScreen?.querySelector(".splash-logo");
  let gameStarted = false;
  let stayTimer;

  const introAlreadyPlayed = sessionStorage.getItem("lior_intro_played") === "true";

  if (!splashScreen || introAlreadyPlayed) {
    if (splashScreen) splashScreen.style.display = "none";
    new GameController({ playNarrativeIntro: !introAlreadyPlayed });
    return;
  }

  function startGame(fromUserGesture = false) {
    if (gameStarted) return;
    gameStarted = true;
    clearTimeout(stayTimer);
    sessionStorage.setItem("lior_intro_played", "true");

    if (fromUserGesture) {
      const docEl = document.documentElement;
      const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
      if (req && !document.fullscreenElement && !document.webkitFullscreenElement) {
        req.call(docEl, { navigationUI: "hide" }).catch(() => {});
      }
      if (screen.orientation && typeof screen.orientation.lock === "function") {
        screen.orientation.lock("landscape").catch(() => {});
      }
    }

    new GameController({ playNarrativeIntro: true });
    splashScreen.classList.remove("show");
    splashScreen.classList.add("fade-out");
    setTimeout(() => { splashScreen.style.display = "none"; }, SPLASH_FADE_MS);
  }

  sounds.playLogoJingle();
  requestAnimationFrame(() => splashLogo?.classList.add("show"));
  stayTimer = setTimeout(startGame, SPLASH_FADE_MS + SPLASH_STAY_MS);

  splashScreen.addEventListener("click", () => startGame(true));
  splashScreen.addEventListener("touchstart", () => startGame(true), { passive: true });
});