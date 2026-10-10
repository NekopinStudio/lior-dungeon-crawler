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
    wallFront: "Un muro blanco bloquea el camino.",
    wallBack: "Un muro a tu espalda te impide retroceder.",
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
    floorIntro: (floor, tier, w, h, ac, hit, dmg) =>
      `Piso ${floor} (Tier ${tier}): ${w}x${h}. CA Lior: ${ac}, Impacto: +${hit}, Daño: +${dmg}.`,
    bossArena: (name) => `¡${name} te espera en la arena! Sus esbirros acuden sin descanso.`,
    bunnyCaught: "¡Atrapaste al Conejo Dorado! Obtienes 5 monedas de oro.",
    boughtPistol: "Compraste 6 balas de Pistola (-1 PO).",
    boughtMusket: "Compraste 4 balas de Mosquete (-1 PO).",
    boughtBlunderbuss: "Compraste 2 balas de Trabuco (-1 PO).",
    boughtPotion: (heal, price) => `Bebiste una poción: +${heal} HP (-${price} PO).`
  }
};

/**
 * LIOR: hoja principal (fila por fila según los rótulos). Cada frame es
 * { x, y, w, h } en píxeles de lior.png; el recorte fino lo hace el Renderer.
 */
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

/**
 * lior2.png (alfa real): vistas frontal y lateral derecha. Los rangos x excluyen las etiquetas de fila.
 */
const LIOR2_ROWS = {
  FRONT_IDLE: { view: "front", y0: 0,    y1: 319,  xs: [[316, 478], [538, 699], [758, 920], [978, 1139], [1199, 1357], [1419, 1577], [1637, 1796]] },
  FRONT_WALK: { view: "front", y0: 337,  y1: 657,  xs: [[328, 472], [550, 695], [774, 918], [998, 1142], [1208, 1368], [1446, 1591]] },
  FRONT_GUN:  { view: "front", y0: 673,  y1: 991,  xs: [[397, 612], [924, 1117], [1308, 1530]] },
  SIDE_IDLE:  { view: "side",  y0: 1012, y1: 1324, xs: [[358, 509], [574, 723], [787, 937], [1001, 1151], [1214, 1365], [1429, 1579], [1646, 1795], [1858, 2009]] },
  SIDE_WALK:  { view: "side",  y0: 1334, y1: 1628, xs: [[407, 556], [697, 848], [983, 1134], [1251, 1400], [1521, 1669]] },
  // Destello y haz recortados (los dibuja el sistema de efectos); el primer frame se omite porque el rótulo de la hoja le tapa el sombrero.
  SIDE_GUN:   { view: "side",  y0: 1647, y1: 1949, xs: [[732, 933], [1013, 1233]] }
};

const LIOR2_SPRITES = Object.fromEntries(Object.entries(LIOR2_ROWS).map(([name, row]) => [
  name,
  row.xs.map(([x0, x1]) => ({ sheet: "lior2", view: row.view, x: x0, y: row.y0, w: x1 - x0 + 1, h: row.y1 - row.y0 + 1 }))
]));

const flipFrames = frames => frames.map(frame => ({ ...frame, flip: true }));

// Filas de lior2 por encaramiento (1 Este, 2 Sur, 3 Oeste reflejado); el Norte conserva lior.png.
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

/**
 * EFECTOS DE ARMAS: 3 fases por hoja. "cols" = columnas iguales; "panels" = recortes
 * manuales (el trabuco dibuja un panel completo de 5x2 casillas).
 */
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
    weapon: { index: 3, standardLabel: "Y", genericLabel: "4" },
    weaponAlt: [4, 5]
  }
};

// Modo vertical: viewport 7x12 con el mundo rotando. Landscape: 11x11 centrado, con el Norte fijo.
const CAMERA_PROFILES = {
  classic: { cols: 7, rows: 12, tileSize: 42, anchors: [{ x: 3, y: 10 }, { x: 3, y: 10 }, { x: 3, y: 10 }, { x: 3, y: 10 }] },
  fixed: { cols: 11, rows: 11, tileSize: 40, anchors: [{ x: 5, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 5 }] }
};

// Estado vivo de la cámara; playerScreenX/Y son la casilla entera de Lior en pantalla.
const CAMERA_CONFIG = {
  mode: "classic",
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

const ENEMY_ROSTER = {
  minion: [
    { name: "Kobold", src: "Assets/Enemy/1x1/1. kobold.jpg" },
    { name: "Goblin", src: "Assets/Enemy/1x1/2. Goblin.jpg" },
    { name: "Esqueleto", src: "Assets/Enemy/1x1/3.Skelleton.jpg", ranged: true },
    { name: "Zombi", src: "Assets/Enemy/1x1/4. Zombie.jpg" },
    { name: "Orco", src: "Assets/Enemy/1x1/5. orc.jpg" },
    { name: "Gnoll", src: "Assets/Enemy/1x1/6. Gnoll.jpg" },
    { name: "Hobgoblin", src: "Assets/Enemy/1x1/7. hobgoblin.jpg" },
    { name: "Hombre lagarto", src: "Assets/Enemy/1x1/8. lizardfolk.jpg" },
    { name: "Diablillo", src: "Assets/Enemy/1x1/9. imp.jpg", ranged: true },
    { name: "Osgo", src: "Assets/Enemy/1x1/10. bugbear.jpg" }
  ],
  miniBoss: [
    { name: "Ogro", src: "Assets/Enemy/2x2/1. ogre.png" },
    { name: "Trol", src: "Assets/Enemy/2x2/2. troll.jpg" },
    { name: "Minotauro", src: "Assets/Enemy/2x2/3. minotaur.jpg" },
    { name: "Osobúho", src: "Assets/Enemy/2x2/4. owlbear.jpg" },
    { name: "Mantícora", src: "Assets/Enemy/2x2/5. manticore.jpg" },
    { name: "Basilisco", src: "Assets/Enemy/2x2/6. basilisk.jpg" },
    { name: "Quimera", src: "Assets/Enemy/2x2/7. chimera.jpg" },
    { name: "Bulette", src: "Assets/Enemy/2x2/8. bulette.jpg" },
    { name: "Gigante de las colinas", src: "Assets/Enemy/2x2/9. hillGiant.jpg" },
    { name: "Dragón joven", src: "Assets/Enemy/2x2/10. youngDragon.jpg" }
  ],
  megaBoss: [
    { name: "Roc", src: "Assets/Enemy/4x4/1. roc.jpg" },
    { name: "Tarrasca", src: "Assets/Enemy/4x4/2. tarrasque.jpg" },
    { name: "Gólem de hierro", src: "Assets/Enemy/4x4/3. ironGolem.jpg" },
    { name: "Kraken", src: "Assets/Enemy/4x4/4. kraken.jpg" },
    { name: "Gigante de tormenta", src: "Assets/Enemy/4x4/5. stormGigant.jpg" },
    { name: "Beholder", src: "Assets/Enemy/4x4/6. beholder.jpg" },
    { name: "Gusano púrpura", src: "Assets/Enemy/4x4/7. purpleworm.jpg" },
    { name: "Balor", src: "Assets/Enemy/4x4/8. Balor.jpg" },
    { name: "Dragón rojo ancestral", src: "Assets/Enemy/4x4/9. AncientRedDragon.jpg" },
    { name: "Dragón solar", src: "Assets/Enemy/4x4/10. solarDragon.jpg" }
  ]
};

// Milisegundos por frame de cada estado de la máquina de animación de enemigos.
const ENEMY_ANIM_MS = { idle: 175, attack: 110, hurt: 100, death: 130 };

// disparos.jpg: 3 filas (calibres) x 3 columnas (carga, vuelo, impacto).
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
    damage: 4,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },
  PISTOL: {
    id: "pistol",
    name: TEXT.weaponNames.pistol,
    label: TEXT.weaponLabels.pistol,
    damage: 6,
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
    damage: 8,
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
    damage: 8,
    range: 2,
    width: 5,
    isMelee: false,
    ammoType: "blunderbuss",
    ammoProperty: "ammoBlunderbuss"
  }
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function calculateLiorMaxHP(floor) {
  return 16 + (floor - 1) * 7;
}

function calculateLiorAC(floor) {
  return 12 + Math.floor((floor - 1) / 10);
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

// Dados d4 necesarios para que Nd4 + 4 (máximo 4N + 4) cubra ~25% del HP máximo.
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

function calculateMinionHP(floor) {
  return 4 + Math.floor((floor - 1) / 2);
}

function calculateMiniBossHP(floor) {
  return 16 + (floor - 1) * 2;
}

function calculateMegaBossHP(floor) {
  return 64 + Math.floor(floor / 10) * 64;
}

function calculateTier(floor) {
  return 1 + Math.floor((floor - 1) / 10);
}

function calculateEnemyAttackBonus(floor) {
  return Math.floor((floor - 1) / 10);
}

function calculateEldritchBlastRayCount(floor) {
  return calculateTier(floor);
}

function calculateEldritchBlastDamage(floor) {
  return 20 * calculateTier(floor) + 4;
}

function splitDamageAcrossRays(totalDamage, rayCount) {
  const baseDamage = Math.floor(totalDamage / rayCount);
  const remainder = totalDamage % rayCount;
  return Array.from({ length: rayCount }, (_, index) => baseDamage + (index < remainder ? 1 : 0));
}

function getTierForFloor(floorNumber) {
  return Math.min(10, calculateTier(floorNumber));
}

// Población acumulativa: en el tier N pueden aparecer las entradas 1..N.
function pickCumulativeEntry(list, tier) {
  return list[Math.floor(Math.random() * Math.min(tier, list.length))];
}

function getBossRoomMinionLimit(tier) {
  return 10 + (tier - 1);
}

function createMinion(floor, x, y, visionRange = 2) {
  const tier = getTierForFloor(floor);
  const entry = pickCumulativeEntry(ENEMY_ROSTER.minion, tier);
  const hp = calculateMinionHP(floor);
  return {
    id: Math.random().toString(36).substring(2, 9),
    x, y,
    startX: x, startY: y,
    name: entry.name,
    spriteSrc: entry.src,
    hp,
    maxHp: hp,
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

    // Patrulla superior fija: x=6, y=2 en la arena de 15x15.
    const mx = 6;
    const my = 2;
    const bossCells = this.generateCells(mx, my, 4);
    bossCells.forEach(c => this.dungeon.setTile(c.x, c.y, TILE_FLOOR));

    const megaBossHp = calculateMegaBossHP(this.floorNumber);

    this.dungeon.enemies.push({
      id: Math.random().toString(36).substring(2, 9),
      x: mx, y: my,
      startX: mx, startY: my,
      name: entry.name,
      spriteSrc: entry.src,
      hp: megaBossHp,
      maxHp: megaBossHp,
      ac: 14 + calculateEnemyAttackBonus(this.floorNumber),
      visionRange: 4,
      // 8 casillas desde su fila inferior (y=5) alcanzan hasta y=13: solo queda a salvo la fila pegada al muro sur.
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
          const miniBossHp = calculateMiniBossHP(this.floorNumber);

          this.dungeon.enemies.push({
            id: Math.random().toString(36).substring(2, 9),
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: entry.name,
            spriteSrc: entry.src,
            hp: miniBossHp,
            maxHp: miniBossHp,
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
      chests: this.loadTerrainTexture("Assets/Map/Chests/Treasure_Chests(16x16).png"),
      pickups: this.loadTerrainTexture("Assets/Map/PowerUps/PickUp_Items-Sheet.png")
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
    // Precarga y segmenta disparos.jpg para que el primer proyectil no caiga al dibujo de respaldo.
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

    this.cameraAnchor = { x: 3, y: 10 };
    this.cameraFacing = player.direction;
    this.cameraOffset = { x: 0, y: 0 };
    this.lastCameraTick = 0;
    this.cameraMode = null;
    this.setCameraMode(Renderer.detectCameraMode(), false);

    // Girar el dispositivo o redimensionar solo cambia el viewport; la partida no se toca.
    let resizeTimer = null;
    const onViewportChange = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const mode = Renderer.detectCameraMode();
        if (mode !== this.cameraMode) this.setCameraMode(mode, true);
      }, 120);
    };
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);

    // Ciclo de reposo (IDLE) de Lior.
    setInterval(() => {
      if (!this.playerAnimation && !this.chestOpening) this.draw();
    }, 100);
  }

  static detectCameraMode() {
    return window.innerWidth > window.innerHeight ? "fixed" : "classic";
  }

  // Cambia viewport, tamaño de celda y canvas sin tocar mazmorra, niebla, enemigos ni estado de Lior.
  setCameraMode(mode, animate) {
    const profile = CAMERA_PROFILES[mode];
    this.cameraMode = mode;
    CAMERA_CONFIG.mode = mode;
    CAMERA_CONFIG.cols = profile.cols;
    CAMERA_CONFIG.rows = profile.rows;
    CAMERA_CONFIG.tileSize = profile.tileSize;

    this.canvas.width = profile.cols * profile.tileSize;
    this.canvas.height = profile.rows * profile.tileSize;
    this.canvas.style.aspectRatio = `${profile.cols} / ${profile.rows}`;
    document.body.classList.toggle("mode-landscape", mode === "fixed");

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
    const anchor = CAMERA_PROFILES[this.cameraMode].anchors[this.cameraFacing];
    this.cameraAnchor = { ...anchor };
    CAMERA_CONFIG.playerScreenX = anchor.x;
    CAMERA_CONFIG.playerScreenY = anchor.y;
    this.cameraOffset = { x: 0, y: 0 };
  }

  // Fija el encaramiento del ancla solo al caminar o ejecutar/preparar una acción balística; un giro no la mueve.
  commitCameraFacing() {
    if (this.cameraFacing === this.player.direction) return;
    this.cameraFacing = this.player.direction;
    this.lastCameraTick = performance.now();
    this.keepAnimating(700);
  }

  updateCamera(now) {
    if (this.cameraMode !== "fixed") {
      this.cameraOffset = { x: 0, y: 0 };
      return;
    }
    const target = CAMERA_PROFILES.fixed.anchors[this.cameraFacing];
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

  // En la cámara fija el giro se ve en el sprite; en la clásica Lior siempre mira hacia arriba.
  getLiorFacing() {
    return CAMERA_CONFIG.mode === "fixed" ? this.player.direction : 0;
  }

  getFacingAngle() {
    return CAMERA_CONFIG.mode === "fixed" ? this.player.direction * Math.PI / 2 : 0;
  }

  // Filas de Lior para el encaramiento actual; `count` remuestrea para conservar el ritmo de los efectos.
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

  // Magenta puro y sus variantes de compresión JPG / fondos púrpura / rejillas rosadas.
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

  // Si la esquina no es magenta, usa su color como fondo alternativo.
  static getBackgroundReference(data) {
    const r = data[0], g = data[1], b = data[2];
    return Renderer.isMagentaPixel(r, g, b) || data[3] === 0 ? null : [r, g, b];
  }

  trimCanvas(sprite) {
    const { width, height } = sprite;
    const spriteCtx = sprite.getContext("2d", { willReadFrequently: true });
    const { data } = spriteCtx.getImageData(0, 0, width, height);
    const rows = new Uint32Array(height);
    const cols = new Uint32Array(width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 16) { rows[y]++; cols[x]++; }
      }
    }
    let minY = 0, maxY = height - 1, minX = 0, maxX = width - 1;
    while (minY < maxY && rows[minY] < 2) minY++;
    while (maxY > minY && rows[maxY] < 2) maxY--;
    while (minX < maxX && cols[minX] < 2) minX++;
    while (maxX > minX && cols[maxX] < 2) maxX--;

    const trimmed = document.createElement("canvas");
    trimmed.width = maxX - minX + 1;
    trimmed.height = maxY - minY + 1;
    trimmed.getContext("2d").drawImage(sprite, minX, minY, trimmed.width, trimmed.height,
      0, 0, trimmed.width, trimmed.height);
    return trimmed;
  }

  /**
   * Recorta una región de la hoja y elimina el fondo.
   * backgroundType: "magenta" (chroma key #FF00FF, PNG o JPG), "alpha" (ya transparente),
   * "gray" / "black" (relleno por inundación desde los bordes).
   */
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

  // Tramos consecutivos de `counts` con al menos `minCount`; une huecos de hasta `maxGap` posiciones.
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

  // Une los tramos estrechos (restos de un mismo frame) con su vecino más cercano.
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

  /**
   * Segmenta una hoja sobre fondo magenta: franjas horizontales de contenido y, dentro de cada una, frames.
   * Devuelve filas de canvas ya sin fondo (null si no hay contenido).
   */
  segmentSheet(image, { rowGap = 1, colGap = 2, mergeNarrow = true, denseFractions = [0.06, 0.15] } = {}) {
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

    // Descarta rótulos y ruido: franjas mucho más bajas que la mayor.
    let bands = Renderer.findRuns(rowCounts, 3, rowGap);
    const tallest = bands.reduce((max, b) => Math.max(max, b.end - b.start + 1), 0);
    bands = bands.filter(b => b.end - b.start + 1 >= tallest * 0.2);

    const rows = bands.map(band => {
      const colCounts = new Uint32Array(width);
      for (let y = band.start; y <= band.end; y++) {
        for (let x = 0; x < width; x++) colCounts[x] += solid[y * width + x];
      }
      // Frames que se tocan (o con armas finas que los parten) se separan por columnas densas (cuerpos),
      // cortando en el valle; entre las particiones candidatas gana la de anchos más uniformes.
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
        return this.getKeyedSprite(image, { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, "magenta", { bgRef });
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

  // Ciclos del enemigo: fila superior = idle, siguiente = ataque, última = daño y muerte.
  getEnemyAnimation(src) {
    if (this.enemyAnimCache.has(src)) return this.enemyAnimCache.get(src);
    const image = this.loadSheetImage(src);
    if (!image) return null;

    const rows = this.segmentSheet(image);
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

  // Duración total (ms) de la animación de muerte, o un valor por defecto si la hoja aún no carga.
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

  // Redibuja a cada frame del navegador mientras haya animaciones de enemigos o proyectiles.
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

  // Proyectil enemigo: calibre pequeño/mediano/grande = fila de disparos.jpg; fases 0 carga, 1 vuelo, 2 impacto.
  getProjectileSprite(caliber, phase) {
    if (this.projectileRows === undefined) {
      const image = this.loadSheetImage(PROJECTILE_SHEET.src);
      if (!image) return null;
      this.projectileRows = this.segmentSheet(image, {
        rowGap: Math.floor(image.naturalHeight / 4 * 0.05),
        colGap: Math.floor(image.naturalWidth / 4 * 0.1),
        mergeNarrow: false,
        denseFractions: []
      });
    }
    return this.projectileRows?.[PROJECTILE_SHEET.rows[caliber]]?.[phase] ?? null;
  }

  // Lanza un proyectil hacia Lior; devuelve los ms hasta el impacto para sincronizar el daño visual.
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

    // Un disparo fallado sobrepasa a Lior y no deja destello.
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

      // Destello en la casilla de Lior antes de que se muestre el daño.
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
    // Escala común a todo el ciclo, calculada con el reposo, para que el sprite no "respire" entre frames.
    const scale = Math.min(drawSize / animation.refWidth, drawSize / animation.refHeight);
    const width = sprite.width * scale;
    const height = sprite.height * scale;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(sprite, px + (drawSize - width) / 2, py + drawSize - height, width, height);
    targetCtx.restore();
  }

  drawGoldenBunny(targetCtx, bunny, screenX, screenY) {
    const fleeing = bunny.isFleeing;
    const frame = fleeing
      ? BUNNY_SPRITES.bunnyFlee[Math.floor((performance.now() - bunny.fleeStartedAt) / 120) % BUNNY_SPRITES.bunnyFlee.length]
      : BUNNY_SPRITES.bunnyIdle;
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
    // Cada hoja se escala con su propia pose de reposo para que Lior mida lo mismo en los cuatro encaramientos.
    const reference = this.getLiorFrame(frameRect.sheet === "lior2" ? LIOR2_REFERENCE[frameRect.view] : LIOR_SPRITES.IDLE[0]);

    if (sprite && reference) {
      const scale = (tileSize * 1.35) / reference.height;
      const renderW = sprite.width * scale;
      const renderH = sprite.height * scale;
      if (frameRect.flip) {
        targetCtx.translate(px + tileSize / 2, 0);
        targetCtx.scale(-1, 1);
        targetCtx.translate(-(px + tileSize / 2), 0);
      }
      targetCtx.drawImage(sprite, px + (tileSize - renderW) / 2, py + tileSize - renderH + 2, renderW, renderH);
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

    if (actionFrame?.effects) this.drawEffects(targetCtx, actionFrame.effects, this.playerAnimation.origin);
  }

  // Coordenadas en casillas de pantalla relativas al ancla de Lior al crear el efecto (`origin`);
  // `rotation` gira haz y área alrededor de Lior hacia su encaramiento real.
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
    // Si la fila de lior2 tiene otro número de frames, la duración total se mantiene.
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

  // El golpe espera a que termine la animación en curso para no taparla.
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

  // beamReach: distancia en casillas desde Lior hasta el final del rayo.
  playEldritchBlastAnimation(beamReach, rayCount = 1) {
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

  /**
   * shot: { impact: {x, y} mundo, area: [{x, y}] celdas mundo (trabuco) }.
   * Pistola y mosquete: proyectil rotado hacia el impacto. Trabuco: dispersión sobre el área 2x5.
   */
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
  }

  drawBase(targetCtx) {
    const { canvas } = this;
    this.updateCamera(performance.now());
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

    // El desplazamiento fraccionario de la cámara fija se aplica a todo el mundo; sobra una casilla de margen.
    const margin = CAMERA_CONFIG.mode === "fixed" ? 1 : 0;
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
            targetCtx.fillStyle = tileType === TILE_ENTRANCE
              ? "#ff4141"
              : (this.dungeon.enemies.length > 0 ? "#ffd700" : "#39ef73");
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

        const entryPreview = this.game && this.game.entryPreviewUntil > performance.now();
        if (this.game && (this.game.showWeaponRange || entryPreview)) {
          const inRange = CombatSystem.isCellInWeaponRange(
            this.player,
            worldCoord.x,
            worldCoord.y,
            this.player.equippedWeapon
          );
          if (inRange && !(worldCoord.x === this.player.x && worldCoord.y === this.player.y)) {
            targetCtx.save();
            targetCtx.strokeStyle = entryPreview && !this.game.showWeaponRange
              ? "rgba(255, 202, 72, 0.95)"
              : "rgba(255, 45, 45, 0.9)";
            targetCtx.lineWidth = 2.5;
            targetCtx.fillStyle = entryPreview && !this.game.showWeaponRange
              ? "rgba(255, 190, 40, 0.18)"
              : "rgba(255, 0, 0, 0.14)";
            targetCtx.fillRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
            targetCtx.strokeRect(px + 1.5, py + 1.5, tileSize - 3, tileSize - 3);
            targetCtx.restore();
          }
        }
      }
    }

    this.drawGroundPickups(targetCtx, performance.now());
    this.drawChestOpeningFrame(targetCtx, playerScreenX, playerScreenY);

    const frameNow = performance.now();
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

  // Línea de tiro: devuelve la primera celda de muro (o límite) entre el origen y el destino, o null si está despejada.
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

  // Resuelve un disparo: objetivos alcanzados, punto de impacto y, en el trabuco, el área cubierta.
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

    // Sin objetivos: la bala sigue recto hasta el muro o el alcance máximo.
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

  static rollAttack(game, target, damageSides) {
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

    const baseDamage = rollDie(damageSides) + game.dmgBonus;
    const rolledDamage = result.critical ? Math.ceil(baseDamage * 1.5) : baseDamage;
    const damage = CombatSystem.applyDamageToEnemy(game, target, rolledDamage);
    if (damage > 0) game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage");
    game.log(TEXT.logs.attackHit(result.total, target.ac, damage, target.name, target.hp));
    return false;
  }

  // Retira a los enemigos caídos, reparte oro y devuelve los minijefes muertos.
  static processDeaths(game, targets) {
    const dead = targets.filter(enemy => enemy.hp <= 0);
    if (dead.length === 0) return [];

    const deadIds = new Set(dead.map(enemy => enemy.id));
    game.dungeon.enemies = game.dungeon.enemies.filter(enemy => !deadIds.has(enemy.id));
    dead.forEach(enemy => {
      game.player.kills++;
      const goldDrop = enemy.isMegaBoss ? 10 : (enemy.isBoss ? rollDie(3) : rollDie(2));
      game.spawnPickup("gold", enemy.x, enemy.y, goldDrop);
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
    if (game.isAnimatingTurn || game.isVictory || player.hp <= 0 || game.isPausedForDialog) {
      if (player.hp <= 0) game.log(TEXT.logs.deadPlayer);
      return;
    }

    if (game.consumeStunnedTurn()) return;
    game.clearMistyStepConfirmation();
    game.showWeaponRange = false;

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
      if (CombatSystem.rollAttack(game, target, weapon.damage)) {
        playerFumbled = true;
        break;
      }
    }
    const deadMiniBosses = CombatSystem.processDeaths(game, targets);
    CombatSystem.applyPanic(game, deadMiniBosses);

    if (playerFumbled) {
      game.processEnemiesTurn();
      game.updateHUD();
      game.renderer.draw();
      return;
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
    this.isAnimatingTurn = false;
    this.pendingEnemyProjectiles = 0;
    this.showWeaponRange = false;
    this.entryPreviewUntil = 0;
    this.mistyStepConfirmation = null;
    this.statusMessageTimer = null;
    this.statusMessageFadeTimer = null;
    this.dialogTimer = null;
    this.dialogFadeTimer = null;
    this.shopSelection = 0;
    this.dialogCallback = null;
    this.gamepadMapping = "standard";
    this.controlDevice = this.getPreferredControlDevice();

    this.initDungeonFloor();
    this.bindEvents();
    this.initShopEvents();
    this.initDeviceDetection();
    this.startGamepadLoop();
    window.__lior = this;
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

  get dmgBonus() {
    return Math.min(20, 1 + Math.floor(((this.floor - 1) * 19) / 99));
  }

  initDeviceDetection() {
    this.setControlDevice(this.controlDevice);
    window.addEventListener("keydown", () => this.setControlDevice("keyboard"));
    window.addEventListener("touchstart", () => this.setControlDevice("touch"));
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
    this.updateControlLegend();
    if (!changed) return;
    // Conserva los controles visibles y sincroniza sus leyendas con el dispositivo activo.
    this.updateButtonLabels();
  }

  updateControlLegend() {
    const legend = document.getElementById("pc-legend");
    if (!legend) return;
    legend.textContent = this.controlDevice === "gamepad"
      ? "[D-Pad / Stick] Mover/Girar | [A] Atacar | [X] Blast | [B] Bruma | [Y / LB] Cambiar Arma"
      : "[WASD] Mover/Girar | [K] Atacar | [J] Blast | [L] Bruma | [I] Cambiar Arma";
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

    const keyLabels = this.controlDevice === "keyboard" || this.controlDevice === "touch";
    if (this.controlDevice === "keyboard") {
      btnUp.textContent = "W";
      btnDown.textContent = "S";
      btnLeft.textContent = "A";
      btnRight.textContent = "D";
    } else {
      btnUp.textContent = "▲";
      btnDown.textContent = "▼";
      btnLeft.textContent = "◀";
      btnRight.textContent = "▶";
    }

    if (keyLabels) {
      btnD.textContent = ACTION_BINDINGS.keyboard.weapon;
      if (blastInner) blastInner.textContent = ACTION_BINDINGS.keyboard.blast;
      btnB.textContent = ACTION_BINDINGS.keyboard.mist;
      btnA.textContent = ACTION_BINDINGS.keyboard.attack;

      capD.textContent = TEXT.captionsKeyboard.weapon;
      capB.textContent = TEXT.captionsKeyboard.mist;
      capA.textContent = TEXT.captionsKeyboard.attack;
    } else {
      const gamepadLabel = binding => this.controlDevice === "gamepad" && this.gamepadMapping !== "standard"
        ? binding.genericLabel
        : binding.standardLabel;
      btnD.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.weapon);
      if (blastInner) blastInner.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.blast);
      btnB.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.mist);
      btnA.textContent = gamepadLabel(ACTION_BINDINGS.gamepad.attack);

      capD.textContent = TEXT.captions.weapon;
      capB.textContent = TEXT.captions.mist;
      capA.textContent = TEXT.captions.attack;
    }

    if (capC) {
      const baseCaption = keyLabels
        ? TEXT.captionsKeyboard.blast
        : TEXT.captions.blast;
      const cur = this.player ? this.player.blastCurrentCharges : 10;
      const max = this.player ? this.player.blastMaxCharges : 10;
      capC.innerHTML = `${baseCaption} (<span id="blast-counter">${cur}/${max}</span>)`;
    }
  }

  initDungeonFloor(isMerchantTransition = false) {
    this.inMerchantFloor = isMerchantTransition;
    this.showWeaponRange = false;
    this.mistyStepConfirmation = null;
    this.entryPreviewUntil = 0;

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
      setTimeout(() => {
        this.showMerchantDialog(`«${TEXT.logs.merchantPeace}»`, () => {
          this.openShop();
        });
      }, 300);
    } else {
      this.log(TEXT.logs.floorIntro(this.floor, this.tier, this.dungeon.width, this.dungeon.height, this.player.ac, this.hitBonus, this.dmgBonus));
      const arenaBoss = this.dungeon.enemies.find(e => e.isMegaBoss);
      if (arenaBoss) this.log(TEXT.logs.bossArena(arenaBoss.name));
    }

    this.renderer.draw();
  }

  showMerchantDialog(text, onDismiss, speaker = "✦ MERCADER DE SOMBRAS ✦") {
    if (!this.dialogModal) {
      if (onDismiss) onDismiss();
      return;
    }
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

    this.deathScreen.classList.remove("visible");
    this.deathScreen.classList.add("hidden");
    this.closeShop();
    if (this.dialogModal) this.dialogModal.classList.add("hidden");

    this.mistyStepConfirmation = null;
    clearTimeout(this.statusMessageTimer);
    clearTimeout(this.statusMessageFadeTimer);
    clearTimeout(this.dialogTimer);
    clearTimeout(this.dialogFadeTimer);
    this.dialogCallback = null;

    this.player = null;
    this.initDungeonFloor(false);
  }

  openShop() {
    if (!this.shopModal) return;
    this.shopSelection = 0;
    this.updateShopSelection();
    this.updateShopHUD();
    this.shopModal.classList.remove("hidden");
  }

  closeShop() {
    if (!this.shopModal) return;
    this.shopModal.classList.add("hidden");
  }

  updateShopSelection() {
    const items = [...(this.shopModal?.querySelectorAll(".shop-item") || [])];
    if (items.length === 0) return;
    this.shopSelection = (this.shopSelection + items.length) % items.length;
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
    const item = this.shopModal?.querySelector(`.shop-item[data-shop-index="${this.shopSelection}"]`);
    item?.querySelector("button")?.click();
  }

  updateShopHUD() {
    const goldDisplay = document.getElementById("shop-gold-display");
    if (goldDisplay) goldDisplay.textContent = this.player.gold;
    const potionBtn = document.getElementById("buy-potion");
    if (potionBtn) potionBtn.textContent = `${calculatePotionPrice(this.floor)} PO`;
    const potionLabel = document.getElementById("potion-shop-label");
    if (potionLabel) potionLabel.textContent = `Poción de Vida (${calculatePotionDice(this.floor)}d4 + 4)`;
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

    if (this.dialogModal) {
      this.dialogModal.addEventListener("click", () => this.dismissMerchantDialog());
      this.dialogModal.addEventListener("touchstart", () => this.dismissMerchantDialog(), { passive: true });
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
        if (this.player.gold >= 1) {
          this.player.gold -= 1;
          this.player.ammoPistol += 6;
          this.player.unlockedWeapons.add(WEAPONS.PISTOL.id);
          sounds.playCoin();
          this.updateHUD();
          this.updateShopHUD();
          this.log(TEXT.logs.boughtPistol);
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
          this.log(TEXT.logs.boughtMusket);
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
          this.log(TEXT.logs.boughtBlunderbuss);
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
      elWeaponIcon.className = `weapon-icon weapon-icon-${weapon.id}`;
      elWeaponIcon.textContent = "";
    }
    if (elMisty) elMisty.textContent = this.player.mistyStepCharges;

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

    const attackBtn = document.getElementById("btn-a");
    if (attackBtn) {
      attackBtn.disabled = this.player.hp <= 0 || (this.inMerchantFloor && !this.player.stunned);
    }

    const mistyBtn = document.getElementById("btn-b");
    if (mistyBtn) mistyBtn.disabled = this.player.hp <= 0
      || (this.player.mistyStepCharges <= 0 && !this.player.stunned);

    const blastBtn = document.getElementById("btn-c");
    const blastCounter = document.getElementById("blast-counter");
    if (blastBtn) {
      const chargePct = Math.min(100, Math.floor((this.player.blastCurrentCharges / this.player.blastMaxCharges) * 100));
      blastBtn.style.setProperty("--charge-pct", chargePct);

      if (this.player.isBlastReady()) {
        blastBtn.classList.remove("btn-charging");
        blastBtn.classList.add("btn-ready");
        blastBtn.disabled = this.player.hp <= 0 || (this.inMerchantFloor && !this.player.stunned);
      } else {
        blastBtn.classList.remove("btn-ready");
        blastBtn.classList.add("btn-charging");
        blastBtn.disabled = !this.player.stunned || this.player.hp <= 0;
      }
    }

    if (blastCounter) {
      blastCounter.textContent = `${this.player.blastCurrentCharges}/${this.player.blastMaxCharges}`;
    }

    const weaponBtn = document.getElementById("btn-d");
    if (weaponBtn) weaponBtn.disabled = this.player.hp <= 0
      || (this.player.getAvailableWeapons().length <= 1 && !this.player.stunned);
  }

  // Arena de mega jefe: invoca 1 esbirro en una celda libre distante si hay menos del límite vivos.
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

  castMistyStep() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.showWeaponRange = false;
    if (this.player.mistyStepCharges <= 0) return;

    const destination = this.getMistyStepDestination();
    if (destination.blocked) return;
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

  getMistyStepDestination() {
    const dirVec = DIR_VECTORS[this.player.direction];
    let encounteredObstacle = false;

    for (let step = 1; step <= 8; step++) {
      const cx = this.player.x + dirVec.x * step;
      const cy = this.player.y + dirVec.y * step;

      if (!this.dungeon.isInsideBounds(cx, cy)) {
        return { x: cx, y: cy, dangerous: true, blocked: false };
      }

      const tile = this.dungeon.getTile(cx, cy);
      const enemy = this.dungeon.enemies.some(candidate =>
        candidate.cells?.some(cell => cell.x === cx && cell.y === cy)
      );
      if (tile === TILE_WALL || enemy) {
        encounteredObstacle = true;
      } else if (encounteredObstacle || step === 8) {
        return { x: cx, y: cy, dangerous: false, blocked: false };
      }
    }

    return { x: this.player.x, y: this.player.y, dangerous: false, blocked: true };
  }

  castEldritchBlast() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
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
    this.renderer.playEldritchBlastAnimation(beamReach, rayCount);

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

  cycleWeapon() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    if (this.player.unlockedWeapons.size < 2) return;
    this.player.cycleWeapon();
    this.showWeaponRange = true;
    // Preparar un arma de fuego adelanta el ancla hacia donde apunta Lior.
    if (!this.player.equippedWeapon.isMelee) this.renderer.commitCameraFacing();
    sounds.playStep();
    this.updateHUD();
    this.renderer.draw();
  }

  turnLeft() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.player.turnLeft();
    this.showWeaponRange = true;
    this.renderer.commitCameraFacing();
    sounds.playStep();
    this.updateHUD();
    this.renderer.draw();
  }

  turnRight() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.player.turnRight();
    this.showWeaponRange = true;
    this.renderer.commitCameraFacing();
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
      // Mega jefe: ataca un turno sí y uno no; en el turno de pausa solo se reposiciona en X.
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
          const damageSides = enemy.isMegaBoss ? 8 : (enemy.isBoss ? 4 : 2);
          const baseDamage = CombatSystem.rollDamageDice(this.tier, damageSides);
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

        if (attack.hit) {
          if (!isRanged) {
            sounds.playHurt();
            CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
            tookDamage = true;
            this.log(hitMessage);
          }
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

      // Arenas de mega jefe: persecución directa en cada turno, sin patrullas ni huidas.
      if (this.dungeon.isBossRoom) mode = "chase";

      let directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];

      if (enemy.isMegaBoss) {
        // Patrulla superior: solo eje X, alineado con la columna de Lior; nunca baja en Y.
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

    // Cada 4 turnos el mega jefe invoca exactamente 1 esbirro.
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

  moveForward() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.showWeaponRange = false;

    const next = this.player.getNextForwardPos(1);
    if (!this.dungeon.isInsideBounds(next.x, next.y)) {
      this.log(TEXT.logs.outOfBounds);
      return;
    }
    if (this.dungeon.getTile(next.x, next.y) === TILE_WALL) {
      this.log(TEXT.logs.wallFront);
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === next.x && c.y === next.y));
    if (enemyBlocking) {
      this.log(TEXT.logs.enemyBlock);
      return;
    }

    const merchant = this.dungeon.npcs.find(npc => npc.isMerchant && npc.x === next.x && npc.y === next.y);
    if (merchant) {
      this.showMerchantDialog(`«${TEXT.logs.merchantPeace}»`, () => {
        this.openShop();
      });
      return;
    }

    this.player.advanceAction();
    this.player.moveForward();
    sounds.playStep();
    this.renderer.commitCameraFacing();
    this.renderer.playWalk();

    this.checkGoldenBunnyCapture();
    this.processEnemiesTurn();
    this.handleTileInteractions();
    this.renderer.draw();
  }

  moveCardinal(direction) {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.player.direction = direction;
    this.moveForward();
    // Si el paso fue bloqueado, igualmente se refleja el nuevo encaramiento.
    this.renderer.commitCameraFacing();
    this.updateHUD();
    this.renderer.draw();
  }

  moveBackward() {
    if (this.isAnimatingTurn || this.isVictory || this.isPausedForDialog || this.player.hp <= 0) return;
    if (this.consumeStunnedTurn()) return;
    this.clearMistyStepConfirmation();
    this.showWeaponRange = false;

    const prev = this.player.getNextBackwardPos();
    if (!this.dungeon.isInsideBounds(prev.x, prev.y)) {
      this.log(TEXT.logs.backOutOfBounds);
      return;
    }
    if (this.dungeon.getTile(prev.x, prev.y) === TILE_WALL) {
      this.log(TEXT.logs.wallBack);
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e => e.cells && e.cells.some(c => c.x === prev.x && c.y === prev.y));
    if (enemyBlocking) {
      this.log(TEXT.logs.enemyBlockBack);
      return;
    }

    const merchant = this.dungeon.npcs.find(npc => npc.isMerchant && npc.x === prev.x && npc.y === prev.y);
    if (merchant) {
      this.showMerchantDialog(`«${TEXT.logs.merchantPeace}»`, () => {
        this.openShop();
      });
      return;
    }

    this.player.advanceAction();
    this.player.moveBackward();
    sounds.playStep();
    this.renderer.commitCameraFacing();
    this.renderer.playWalk();
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
    const HOLD_REPEAT_MS = 130;
    let holdDelayTimer = null;
    let holdRepeatTimer = null;
    const stopHold = () => {
      clearTimeout(holdDelayTimer);
      clearInterval(holdRepeatTimer);
      holdDelayTimer = null;
      holdRepeatTimer = null;
    };
    for (const [id, action] of Object.entries(dpadActions)) {
      const btn = document.getElementById(id);
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        stopHold();
        action();
        holdDelayTimer = setTimeout(() => {
          holdRepeatTimer = setInterval(action, HOLD_REPEAT_MS);
        }, HOLD_DELAY_MS);
      });
      for (const type of ["pointerup", "pointercancel", "pointerleave", "touchend", "touchcancel", "mouseleave"]) {
        btn.addEventListener(type, stopHold);
      }
      // Activación por teclado (Enter/Espacio sobre el botón enfocado).
      btn.addEventListener("click", (e) => { if (e.detail === 0) action(); });
    }
    window.addEventListener("blur", stopHold);
    document.addEventListener("visibilitychange", stopHold);
    window.addEventListener("pointerup", stopHold);
    window.addEventListener("pointercancel", stopHold);

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

      if (this.shopModal && !this.shopModal.classList.contains("hidden")) {
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
          case "Enter":
          case " ":
            if (!e.repeat) this.purchaseSelectedShopItem();
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
          if (!e.repeat) this.castMistyStep();
          break;
        case "j":
        case "J":
          if (!e.repeat) this.castEldritchBlast();
          break;
        case "i":
        case "I":
          if (!e.repeat) this.cycleWeapon();
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
        const shopOpen = this.shopModal && !this.shopModal.classList.contains("hidden");

        if (shopOpen) {
          if (movedY) this.moveShopSelection(inputY < 0 ? -1 : 1);
          if (pressedThisFrame(gamepadActions.attack.index)) this.purchaseSelectedShopItem();
          if (pressedThisFrame(gamepadActions.mist.index)) this.closeShop();
        } else if (this.isPausedForDialog) {
          if (pressedThisFrame(gamepadActions.attack.index)
            || pressedThisFrame(gamepadActions.mist.index)
            || pressedThisFrame(9)) this.dismissMerchantDialog();
        } else if (this.isAnimatingTurn) {
          // Ignore gameplay input until every enemy projectile resolves.
        } else if (this.player.stunned && (movedY || movedX
          || pressedThisFrame(gamepadActions.attack.index)
          || pressedThisFrame(gamepadActions.mist.index)
          || pressedThisFrame(gamepadActions.blast.index)
          || pressedThisFrame(gamepadActions.weapon.index)
          || gamepadActions.weaponAlt.some(pressedThisFrame))) {
          this.consumeStunnedTurn();
        } else {
          if (movedY || movedX) {
            if (this.renderer.cameraMode === "fixed") {
              if (movedY) this.moveCardinal(inputY < 0 ? 0 : 2);
              else this.moveCardinal(inputX < 0 ? 3 : 1);
            } else if (movedY) {
              if (inputY < 0) this.moveForward();
              else this.moveBackward();
            } else if (inputX < 0) {
              this.turnLeft();
            } else {
              this.turnRight();
            }
          }

          if (pressedThisFrame(gamepadActions.attack.index)) CombatSystem.executeAttack(this);
          if (pressedThisFrame(gamepadActions.mist.index)) this.castMistyStep();
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

// Pantalla de inicio: fade in del logo, 1 s visible, fade out y arranque de la partida.
window.addEventListener("DOMContentLoaded", () => {
  const SPLASH_FADE_MS = 700;
  const SPLASH_STAY_MS = 1000;
  const splashScreen = document.getElementById("splash-screen");
  const splashLogo = splashScreen?.querySelector(".splash-logo");
  let gameStarted = false;
  let stayTimer;

  if (!splashScreen || sessionStorage.getItem("lior_intro_played")) {
    if (splashScreen) splashScreen.style.display = "none";
    new GameController();
    return;
  }

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    clearTimeout(stayTimer);
    sessionStorage.setItem("lior_intro_played", "true");

    new GameController();
    splashScreen.classList.remove("show");
    splashScreen.classList.add("fade-out");
    setTimeout(() => { splashScreen.style.display = "none"; }, SPLASH_FADE_MS);
  }

  sounds.playLogoJingle();
  requestAnimationFrame(() => splashLogo?.classList.add("show"));
  stayTimer = setTimeout(startGame, SPLASH_FADE_MS + SPLASH_STAY_MS);

  splashScreen.addEventListener("click", startGame);
  splashScreen.addEventListener("touchstart", startGame, { passive: true });
});
