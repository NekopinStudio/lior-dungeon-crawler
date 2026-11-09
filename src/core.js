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
    chestPotion: (heal) => `Encontraste una poción roja: +${heal} HP.`,
    chestShieldPotion: (segs, cur, max) => `Encontraste +${segs} ${segs === 1 ? "segmento" : "segmentos"} de escudo (${cur}/${max}).`,
    chestShieldSegment: (cur, max) => `Encontraste +1 segmento de escudo (${cur}/${max}).`,
    chestShieldFallbackAmmo: (weapon, ammo) => `Escudo al máximo (10/10): recibes +${ammo} ${ammo === 1 ? "bala" : "balas"} de ${weapon}.`,
    pickupShieldPotion: (segs, cur, max) => `Obtuviste +${segs} ${segs === 1 ? "segmento" : "segmentos"} de escudo (${cur}/${max}).`,
    chestWeapon: (weapon, ammo) => `Encontraste ${weapon} y ${ammo} ${ammo === 1 ? "bala" : "balas"}.`,
    chestAmmo: (weapon, ammo) => `El cofre tenía ${ammo} ${ammo === 1 ? "bala" : "balas"} de ${weapon}.`,
    swordWhiff: "Blandes tu espada en círculo, pero no hay enemigos al alcance.",
    shotWhiff: (weapon) => `Disparas tu ${weapon}... pero la bala se pierde sin impactar.`,
    wallImpact: (weapon) => `Tu disparo de ${weapon} impacta contra un muro.`,
    attackHit: (total, ac, dmg, name, hp) => `[${total} vs CA ${ac}]: ${dmg} DMG -> ${name} (HP: ${hp})`,
    attackDefended: (total, ac, name) => `[${total} vs CA ${ac}] ${name} se defiende.`,
    criticalMiss: (name) => `${name} pifia y queda aturdido para su próximo ataque.`,
    stunned: (name) => `${name} pierde su turno de ataque por el aturdimiento.`,
    enemyHit: (name, total, ac, dmg, mitigated = 0, remSeg = 0, extraEffect = "") => {
      const base = mitigated > 0
        ? (dmg <= 0
            ? `[${name}] IMPACTA [${total} vs CA ${ac}] 🛡 Escudo bloqueó el impacto completo (-${mitigated} DMG, quedan ${remSeg}/10 seg.).`
            : `[${name}] IMPACTA [${total} vs CA ${ac}] -${dmg} HP (🛡 absorbió ${mitigated}, quedan ${remSeg}/10 seg.).`)
        : `[${name}] IMPACTA [${total} vs CA ${ac}] -${dmg} de daño.`;
      return extraEffect ? `${base} ${extraEffect}` : base;
    },
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
    boughtPotion: (heal, price) => `Bebiste una poción roja: +${heal} HP (-${price} PO).`,
    boughtShield: (count, price, cur, max) =>
      `Compraste +${count} ${count === 1 ? "segmento" : "segmentos"} de escudo (-${price} PO) · Escudo: ${cur}/${max}.`,
    boughtBlessedAmmo: (price, charges) =>
      `Pólvora Maldita adquirida (-${price} PO): +1d6 🔮 de daño maldito verdadero en tus próximos ${charges} disparos (${charges} cargas).`,
    shieldFullReject: "Escudo al máximo (10/10 segmentos). No puedes comprar más segmentos.",
    shieldSpaceReject: (req, avail) =>
      `Espacio insuficiente: solicitaste +${req} seg., pero solo caben +${avail} (máx. 10/10).`,
    shieldGoldReject: (cost, gold) =>
      `Oro insuficiente: necesitas ${cost} PO y tienes ${gold} PO.`,
    mistyInvalid: "Destino inválido para Misty Step."
  }
};

const LIOR_SPRITES = {
  IDLE: [
    { x: 193, y: 5,   w: 76,  h: 124 },
    { x: 300, y: 4,   w: 76,  h: 125 },
    { x: 407, y: 4,   w: 77,  h: 125 }
  ],
  WALK: [
    { x: 302, y: 136, w: 79,  h: 132 },
    { x: 408, y: 136, w: 83,  h: 132 },
    { x: 518, y: 138, w: 82,  h: 133 },
    { x: 639, y: 135, w: 87,  h: 136 },
    { x: 760, y: 137, w: 85,  h: 131 },
    { x: 873, y: 136, w: 92,  h: 136 },
    { x: 994, y: 136, w: 93,  h: 133 },
    { x: 1117, y: 139, w: 91, h: 132 }
  ],
  SWORD_SPIN: [
    { x: 208, y: 271, w: 121, h: 138 },
    { x: 375, y: 274, w: 176, h: 134 },
    { x: 599, y: 297, w: 161, h: 116 },
    { x: 867, y: 281, w: 103, h: 128 }
  ],
  ELDRITCH_BLAST: [
    { x: 256, y: 425, w: 132, h: 144 },
    { x: 463, y: 413, w: 163, h: 154 },
    { x: 736, y: 412, w: 130, h: 167 },
    { x: 920, y: 440, w: 93,  h: 133 }
  ],
  HEAL: [
    { x: 270, y: 576, w: 81,  h: 128 },
    { x: 438, y: 575, w: 80,  h: 128 },
    { x: 599, y: 580, w: 80,  h: 123 },
    { x: 760, y: 584, w: 85,  h: 121 }
  ],
  MISTY_STEP: [
    { x: 262, y: 710, w: 104, h: 124 },
    { x: 441, y: 708, w: 99,  h: 122 },
    { x: 608, y: 711, w: 96,  h: 122 },
    { x: 761, y: 713, w: 84,  h: 123 }
  ],
  GUN_RECOIL: [
    { x: 243, y: 844, w: 117, h: 117 },
    { x: 419, y: 850, w: 94,  h: 116 },
    { x: 599, y: 850, w: 86,  h: 119 },
    { x: 749, y: 857, w: 94,  h: 113 },
    { x: 917, y: 868, w: 105, h: 106 },
    { x: 1078, y: 866, w: 102, h: 108 }
  ],
  HURT: [
    { x: 230, y: 966, w: 95,  h: 108 },
    { x: 418, y: 976, w: 92,  h: 97  },
    { x: 590, y: 988, w: 94,  h: 93  }
  ],
  DEFEAT: [
    { x: 216, y: 1079, w: 107, h: 105 },
    { x: 402, y: 1096, w: 194, h: 87  },
    { x: 619, y: 1115, w: 215, h: 69  },
    { x: 863, y: 1128, w: 198, h: 57  }
  ]
};

const LIOR_ROWS = Object.fromEntries(Object.entries(LIOR_SPRITES).map(([name, frames]) => [
  name,
  {
    y0: Math.min(...frames.map(f => f.y)),
    y1: Math.max(...frames.map(f => f.y + f.h - 1)),
    xs: frames.map(f => [f.x, f.x + f.w - 1])
  }
]));

const LIOR2_SPRITES = {
  FRONT_IDLE: [
    { sheet: "lior2", view: "front", x: 316,  y: 1,   w: 163, h: 319 },
    { sheet: "lior2", view: "front", x: 538,  y: 1,   w: 162, h: 319 },
    { sheet: "lior2", view: "front", x: 758,  y: 1,   w: 163, h: 319 },
    { sheet: "lior2", view: "front", x: 978,  y: 0,   w: 162, h: 320 },
    { sheet: "lior2", view: "front", x: 1199, y: 8,   w: 159, h: 312 },
    { sheet: "lior2", view: "front", x: 1419, y: 8,   w: 159, h: 312 },
    { sheet: "lior2", view: "front", x: 1637, y: 8,   w: 160, h: 312 }
  ],
  FRONT_WALK: [
    { sheet: "lior2", view: "front", x: 328,  y: 338, w: 145, h: 320 },
    { sheet: "lior2", view: "front", x: 550,  y: 338, w: 146, h: 320 },
    { sheet: "lior2", view: "front", x: 774,  y: 338, w: 145, h: 320 },
    { sheet: "lior2", view: "front", x: 998,  y: 338, w: 144, h: 320 },
    { sheet: "lior2", view: "front", x: 1209, y: 340, w: 160, h: 314 },
    { sheet: "lior2", view: "front", x: 1447, y: 339, w: 144, h: 319 }
  ],
  FRONT_GUN: [
    { sheet: "lior2", view: "front", x: 397,  y: 673, w: 215, h: 319 },
    { sheet: "lior2", view: "front", x: 926,  y: 677, w: 190, h: 315 },
    { sheet: "lior2", view: "front", x: 1315, y: 681, w: 216, h: 311 }
  ],
  SIDE_IDLE: [
    { sheet: "lior2", view: "side",  x: 359,  y: 1012, w: 151, h: 312 },
    { sheet: "lior2", view: "side",  x: 574,  y: 1012, w: 150, h: 312 },
    { sheet: "lior2", view: "side",  x: 787,  y: 1012, w: 151, h: 313 },
    { sheet: "lior2", view: "side",  x: 1002, y: 1012, w: 149, h: 312 },
    { sheet: "lior2", view: "side",  x: 1215, y: 1012, w: 150, h: 312 },
    { sheet: "lior2", view: "side",  x: 1429, y: 1012, w: 151, h: 313 },
    { sheet: "lior2", view: "side",  x: 1646, y: 1012, w: 149, h: 313 },
    { sheet: "lior2", view: "side",  x: 1858, y: 1012, w: 152, h: 313 }
  ],
  SIDE_WALK: [
    { sheet: "lior2", view: "side",  x: 407,  y: 1334, w: 150, h: 294 },
    { sheet: "lior2", view: "side",  x: 697,  y: 1334, w: 152, h: 294 },
    { sheet: "lior2", view: "side",  x: 983,  y: 1334, w: 152, h: 294 },
    { sheet: "lior2", view: "side",  x: 1251, y: 1334, w: 150, h: 294 },
    { sheet: "lior2", view: "side",  x: 1521, y: 1334, w: 149, h: 294 }
  ],
  SIDE_GUN: [
    { sheet: "lior2", view: "side",  x: 440,  y: 1658, w: 234, h: 291 },
    { sheet: "lior2", view: "side",  x: 733,  y: 1658, w: 281, h: 291 }
  ]
};

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
  eblast: {
    src: "Assets/Lior/EBlast.jpg",
    cols: 3,
    trim: false,
    panels: [
      { x: 23,   y: 2055, w: 433, h: 782  },
      { x: 503,  y: 918,  w: 433, h: 1919 },
      { x: 1013, y: 0,    w: 376, h: 2912 }
    ]
  },
  pistol: {
    src: "Assets/Lior/PistolShot.jpg",
    cols: 3,
    trim: true,
    panels: [
      { x: 356,  y: 350, w: 468, h: 470 },
      { x: 1492, y: 456, w: 495, h: 258 },
      { x: 2745, y: 350, w: 484, h: 470 }
    ]
  },
  musket: {
    src: "Assets/Lior/MosqueteShot.jpg",
    cols: 3,
    trim: true,
    panels: [
      { x: 161,  y: 157, w: 873,  h: 840 },
      { x: 1268, y: 352, w: 1004, h: 481 },
      { x: 2523, y: 170, w: 912,  h: 827 }
    ]
  },
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

const CHIPTUNE_NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const CHIPTUNE_FLAT_MAP = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };

function chiptuneNoteToFreq(noteStr) {
  if (!noteStr || noteStr === "-" || noteStr === ".") return 0;
  const nameRaw = noteStr.slice(0, -1);
  const octave = parseInt(noteStr.slice(-1), 10);
  const name = CHIPTUNE_FLAT_MAP[nameRaw] || nameRaw;
  const semitone = CHIPTUNE_NOTE_NAMES.indexOf(name);
  if (semitone < 0 || Number.isNaN(octave)) return 0;
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * CUATRO COMPOSICIONES ORIGINALES EN ESTILO CHIPTUNE DE 8 BITS (128 pasos / bucle continuo sin cortes):
 * Diseñadas con progresión narrativa oscura, solemne y opresiva en torno al Motivo de Lior (semitono frigio + caída al tritono/quinta):
 * - "intro":  La Imposición de la Dama del Dolor (Re frigio/armónico oscuro, 56 BPM) — Solemne, austera, con silencios tensos, clímax sobrenatural y retorno sombrío.
 * - "biome1": El Comienzo del Descenso (Mi frigio/locrio, 64 BPM) — Inquietud, aislamiento, frases cortas con silencios, graves electrónicos, notas agudas aisladas y disonancias graduales.
 * - "biome2": La Opresión de las Profundidades (Do locrio/disminuido, 70 BPM) — Pulso contenido pero más insistente, motivos descendentes repetitivos e irresolutos y bajos electrónicos densos.
 * - "biome3": Las Profundidades Extremas (La abisal/locrio en registro grave, 52 BPM) — Lento, pesado e implacable, timbres 8-bit ásperos, sub-bajos profundos y resoluciones incompletas.
 */
/**
 * RUTAS EXACTAS DE LOS ARCHIVOS DE AUDIO DEL PROYECTO (Verificadas en Assets/Audio/):
 * 1. Raíz (Assets/Audio/):
 *    - "Assets/Audio/game-over-efect.mp3"
 *    - "Assets/Audio/game-over-song.wav"
 * 2. Efectos de acciones (Assets/Audio/Actions/*.mp3):
 *    - "Assets/Audio/Actions/coinpick.mp3"
 *    - "Assets/Audio/Actions/eldritchblast.mp3"
 *    - "Assets/Audio/Actions/heal.mp3"
 *    - "Assets/Audio/Actions/liorhurt.mp3"
 *    - "Assets/Audio/Actions/mistystep.mp3"
 *    - "Assets/Audio/Actions/mosquete.mp3"
 *    - "Assets/Audio/Actions/pickupsomething.mp3"
 *    - "Assets/Audio/Actions/pistol.mp3"
 *    - "Assets/Audio/Actions/trabuco.mp3"
 * 3. Música de fondo MIDI (Assets/Audio/bgm/*.mid):
 *    - "Assets/Audio/bgm/18. Infinite Darkness Midi.mid" (Introducción narrativa)
 *    - "Assets/Audio/bgm/01. Slay The Evil Midi.mid"     (Encuentros especiales pisos 10, 20, 30, 40, 50)
 *    - "Assets/Audio/bgm/03. Boss Battle Midi.mid"       (Encuentros especiales pisos 60, 70, 80, 90)
 *    - "Assets/Audio/bgm/12. Strong Boss Midi.mid"       (Combate exclusivo contra el Dragón Final - piso 100)
 *    - "Assets/Audio/bgm/09. Crisis Midi.mid"            (Condición de vida crítica: HP <= 10)
 *    - "Assets/Audio/bgm/16. Truth Midi.mid"             (Tienda)
 *    - "Assets/Audio/bgm/02. Perilous Dungeon Midi.mid"  (Pisos normales - Bioma 1)
 *    - "Assets/Audio/bgm/06. Unknown Planet Midi.mid"    (Pisos normales - Bioma 2)
 *    - "Assets/Audio/bgm/05. Last Mission Midi.mid"      (Pisos normales - Bioma 3)
 * 4. Rugidos de monstruos (Assets/Audio/monster/*.mp3):
 *    - "Assets/Audio/monster/1-4monster.mp3"             (Pisos 1 al 4 de cada ciclo de 10 pisos)
 *    - "Assets/Audio/monster/5-9monster.mp3"             (Pisos 5 al 9 de cada ciclo de 10 pisos)
 *    - "Assets/Audio/monster/Dragon.mp3"                 (Rugido exclusivo del Dragón Final)
 */
const AUDIO_FILES = {
  gameOverEffect: "Assets/Audio/game-over-efect.mp3",
  gameOverSong:   "Assets/Audio/game-over-song.wav",
  actions: {
    coinPick:      "Assets/Audio/Actions/coinpick.mp3",
    eldritchBlast: "Assets/Audio/Actions/eldritchblast.mp3",
    heal:          "Assets/Audio/Actions/heal.mp3",
    liorHurt:      "Assets/Audio/Actions/liorhurt.mp3",
    mistyStep:     "Assets/Audio/Actions/mistystep.mp3",
    musket:        "Assets/Audio/Actions/mosquete.mp3",
    pickup:        "Assets/Audio/Actions/pickupsomething.mp3",
    pistol:        "Assets/Audio/Actions/pistol.mp3",
    blunderbuss:   "Assets/Audio/Actions/trabuco.mp3"
  },
  monster: {
    floors1to4: "Assets/Audio/monster/1-4monster.mp3",
    floors5to9: "Assets/Audio/monster/5-9monster.mp3",
    dragon:     "Assets/Audio/monster/Dragon.mp3"
  },
  bgm: {
    intro:         "Assets/Audio/bgm/18. Infinite Darkness Midi.mid",
    special_10_50: "Assets/Audio/bgm/01. Slay The Evil Midi.mid",
    special_60_90: "Assets/Audio/bgm/03. Boss Battle Midi.mid",
    final_dragon:  "Assets/Audio/bgm/12. Strong Boss Midi.mid",
    crisis:        "Assets/Audio/bgm/09. Crisis Midi.mid",
    shop:          "Assets/Audio/bgm/16. Truth Midi.mid",
    biome1:        "Assets/Audio/bgm/02. Perilous Dungeon Midi.mid",
    biome2:        "Assets/Audio/bgm/06. Unknown Planet Midi.mid",
    biome3:        "Assets/Audio/bgm/05. Last Mission Midi.mid"
  }
};

/**
 * Decodificador autónomo de archivos Standard MIDI File (SMF Formato 0 y 1) sin dependencias externas.
 * Convierte cualquier archivo .mid/.midi de Assets/Audio/bgm/ en una lista temporal de eventos de nota
 * lista para ser reproducida con precisión por Web Audio API en bucle continuo.
 */
function parseStandardMidiFile(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  if (bytes.length < 14) return null;

  // Verificar cabecera "MThd"
  if (
    bytes[0] !== 0x4D || bytes[1] !== 0x54 ||
    bytes[2] !== 0x68 || bytes[3] !== 0x64
  ) {
    return null;
  }

  const headerLen = view.getUint32(4, false);
  const numTracks = view.getUint16(10, false);
  const division = view.getUint16(12, false);
  const ticksPerBeat = (division & 0x8000) ? 480 : Math.max(1, division);

  let pos = 8 + headerLen;
  const tempoEvents = [{ tick: 0, usPerBeat: 500000 }]; // 120 BPM por defecto
  const rawNotes = [];

  const readVarLen = ( idxRef ) => {
    let value = 0;
    let count = 0;
    while (idxRef.p < bytes.length && count < 4) {
      const b = bytes[idxRef.p++];
      value = (value << 7) | (b & 0x7F);
      count++;
      if ((b & 0x80) === 0) break;
    }
    return value;
  };

  for (let t = 0; t < numTracks && pos + 8 <= bytes.length; t++) {
    // Buscar bloque "MTrk"
    if (
      bytes[pos] !== 0x4D || bytes[pos + 1] !== 0x54 ||
      bytes[pos + 2] !== 0x72 || bytes[pos + 3] !== 0x6B
    ) {
      break;
    }
    const trackLen = view.getUint32(pos + 4, false);
    const trackEnd = Math.min(bytes.length, pos + 8 + trackLen);
    const idxRef = { p: pos + 8 };

    let absTick = 0;
    let runningStatus = 0;
    const channelProgram = new Uint8Array(16);
    const channelVolume = new Uint8Array(16).fill(100);
    const channelExpression = new Uint8Array(16).fill(127);
    const activeNotes = new Map();

    while (idxRef.p < trackEnd) {
      const delta = readVarLen(idxRef);
      absTick += delta;
      if (idxRef.p >= trackEnd) break;

      let status = bytes[idxRef.p];
      if (status < 0x80) {
        status = runningStatus;
      } else {
        idxRef.p++;
        if (status < 0xF0) runningStatus = status;
      }

      if (status === 0xFF) {
        // Meta evento
        if (idxRef.p >= trackEnd) break;
        const metaType = bytes[idxRef.p++];
        const len = readVarLen(idxRef);
        if (metaType === 0x51 && len === 3 && idxRef.p + 3 <= trackEnd) {
          const usPerBeat = (bytes[idxRef.p] << 16) | (bytes[idxRef.p + 1] << 8) | bytes[idxRef.p + 2];
          if (usPerBeat > 0) {
            tempoEvents.push({ tick: absTick, usPerBeat });
          }
        }
        idxRef.p += len;
      } else if (status === 0xF0 || status === 0xF7) {
        // Evento SysEx
        const len = readVarLen(idxRef);
        idxRef.p += len;
      } else {
        const type = status & 0xF0;
        const ch = status & 0x0F;

        if (type === 0x90) {
          const pitch = bytes[idxRef.p++] & 0x7F;
          const vel = bytes[idxRef.p++] & 0x7F;
          const key = (ch << 8) | pitch;
          if (vel > 0) {
            if (activeNotes.has(key)) {
              const prev = activeNotes.get(key);
              if (absTick > prev.startTick) {
                rawNotes.push({ ...prev, endTick: absTick });
              }
            }
            const effVel = Math.max(1, Math.min(127, Math.round(
              vel * (channelVolume[ch] / 100) * (channelExpression[ch] / 127)
            )));
            activeNotes.set(key, {
              startTick: absTick,
              channel: ch,
              pitch,
              velocity: effVel,
              program: channelProgram[ch]
            });
          } else if (activeNotes.has(key)) {
            const prev = activeNotes.get(key);
            activeNotes.delete(key);
            if (absTick > prev.startTick) {
              rawNotes.push({ ...prev, endTick: absTick });
            }
          }
        } else if (type === 0x80) {
          const pitch = bytes[idxRef.p++] & 0x7F;
          idxRef.p++; // velocity de Note Off
          const key = (ch << 8) | pitch;
          if (activeNotes.has(key)) {
            const prev = activeNotes.get(key);
            activeNotes.delete(key);
            if (absTick > prev.startTick) {
              rawNotes.push({ ...prev, endTick: absTick });
            }
          }
        } else if (type === 0xB0) {
          const cc = bytes[idxRef.p++] & 0x7F;
          const val = bytes[idxRef.p++] & 0x7F;
          if (cc === 7) channelVolume[ch] = Math.max(16, val);
          else if (cc === 11) channelExpression[ch] = Math.max(24, val);
        } else if (type === 0xC0) {
          channelProgram[ch] = bytes[idxRef.p++] & 0x7F;
        } else if (type === 0xD0) {
          idxRef.p += 1;
        } else if (type === 0xA0 || type === 0xE0) {
          idxRef.p += 2;
        } else {
          break;
        }
      }
    }

    // Cerrar notas que hayan quedado abiertas al final de la pista
    activeNotes.forEach(prev => {
      if (absTick > prev.startTick) {
        rawNotes.push({ ...prev, endTick: absTick });
      }
    });

    pos = trackEnd;
  }

  if (rawNotes.length === 0) return null;

  // Ordenar eventos de tempo y construir conversor de ticks a segundos
  tempoEvents.sort((a, b) => a.tick - b.tick);
  const tempoSegments = [];
  let accSeconds = 0;
  let lastTick = 0;
  let currentUsPerBeat = 500000;

  for (const te of tempoEvents) {
    if (te.tick > lastTick) {
      accSeconds += ((te.tick - lastTick) / ticksPerBeat) * (currentUsPerBeat / 1000000);
      lastTick = te.tick;
    }
    currentUsPerBeat = te.usPerBeat;
    tempoSegments.push({ tick: te.tick, timeSec: accSeconds, usPerBeat: currentUsPerBeat });
  }

  const tickToSeconds = (tick) => {
    let seg = tempoSegments[0];
    for (let i = 1; i < tempoSegments.length; i++) {
      if (tempoSegments[i].tick <= tick) seg = tempoSegments[i];
      else break;
    }
    return seg.timeSec + ((tick - seg.tick) / ticksPerBeat) * (seg.usPerBeat / 1000000);
  };

  let minStartSec = Infinity;
  let maxEndSec = 0;
  const notes = rawNotes.map(n => {
    const startSec = tickToSeconds(n.startTick);
    const endSec = tickToSeconds(n.endTick);
    const duration = Math.max(0.035, Math.min(6.0, endSec - startSec));
    if (startSec < minStartSec) minStartSec = startSec;
    if (startSec + duration > maxEndSec) maxEndSec = startSec + duration;
    return {
      startTime: startSec,
      duration,
      channel: n.channel,
      pitch: n.pitch,
      velocity: n.velocity,
      program: n.program
    };
  });

  // Eliminar silencio muerto inicial si existe para que la pista entre sin retraso
  const offsetSec = Number.isFinite(minStartSec) && minStartSec > 0.05 ? minStartSec - 0.02 : 0;
  if (offsetSec > 0) {
    notes.forEach(n => { n.startTime = Math.max(0, n.startTime - offsetSec); });
    maxEndSec = Math.max(0.5, maxEndSec - offsetSec);
  }

  notes.sort((a, b) => a.startTime - b.startTime);
  return {
    notes,
    totalDuration: Math.max(1.0, maxEndSec + 0.05)
  };
}

// Respaldo para sintaxis heredada si algún test consulta CHIPTUNE_TRACKS
const CHIPTUNE_TRACKS = {
  intro:         { id: "intro",         audioSrc: AUDIO_FILES.bgm.intro,          fallbackId: "intro" },
  special_10_50: { id: "special_10_50", audioSrc: AUDIO_FILES.bgm.special_10_50, fallbackId: "biome2" },
  special_60_90: { id: "special_60_90", audioSrc: AUDIO_FILES.bgm.special_60_90, fallbackId: "biome3" },
  final_dragon:  { id: "final_dragon",  audioSrc: AUDIO_FILES.bgm.final_dragon,  fallbackId: "biome3" },
  crisis:        { id: "crisis",        audioSrc: AUDIO_FILES.bgm.crisis,        fallbackId: "biome2" },
  shop:          { id: "shop",          audioSrc: AUDIO_FILES.bgm.shop,          fallbackId: "biome1" },
  biome1:        { id: "biome1",        audioSrc: AUDIO_FILES.bgm.biome1,        fallbackId: "biome1" },
  biome2:        { id: "biome2",        audioSrc: AUDIO_FILES.bgm.biome2,        fallbackId: "biome2" },
  biome3:        { id: "biome3",        audioSrc: AUDIO_FILES.bgm.biome3,        fallbackId: "biome3" }
};

const FALLBACK_SYNTH_PATTERNS = {
  intro: {
    id: "intro",
    title: "La Imposición de la Dama del Dolor",
    audioSrc: "Assets/Audio/intro_8bit.wav",
    bpm: 56,
    leadWave: "square",
    harmWave: "triangle",
    bassSubWave: "sawtooth",
    droneWave: "sawtooth",
    leadGain: 0.048,
    harmGain: 0.03,
    bassGain: 0.072,
    droneGain: 0.024,
    leadFilterFreq: 1550,
    harmFilterFreq: 1200,
    bassFilterFreq: 340,
    droneFilterFreq: 280,
    leadAttack: 0.035,
    leadVibratoHz: 4.2,
    leadVibratoDepth: 2.2,
    harmDetune: -5,
    droneDetune: 6,
    lead: [
      "-", "-", "D4", ".", ".", ".", "-", "-", "Eb4", ".", "D4", ".", ".", "-", "-", "-",
      "-", "-", "F4", ".", "Eb4", ".", "D4", ".", "C#4", ".", ".", ".", "-", "-", "-", "-",
      "D4", ".", ".", "-", "F4", ".", "G4", ".", "Ab4", ".", ".", ".", "G4", ".", "F4", "-",
      "Eb4", ".", ".", "-", "F4", ".", "Eb4", ".", "D4", ".", "C#4", ".", "D4", ".", "-", "-",
      "A4", ".", ".", ".", "Bb4", ".", "A4", ".", "Ab4", ".", ".", ".", "G4", ".", "F4", ".",
      "Eb4", ".", ".", "D4", "C#4", ".", "D4", ".", "F4", ".", "Eb4", ".", "D4", ".", ".", "-",
      "-", "-", "Eb4", ".", "D4", ".", "-", "-", "Ab3", ".", "G3", ".", "F3", ".", "-", "-",
      "Eb3", ".", ".", "-", "D3", ".", "C#3", ".", "D3", ".", ".", "-", "-", "-", "-", "-"
    ],
    harm: [
      "-", "-", "-", "-", "-", "-", "-", "-", "A3", ".", ".", ".", "-", "-", "-", "-",
      "-", "-", "Bb3", ".", ".", ".", "A3", ".", "E3", ".", "G3", ".", "-", "-", "-", "-",
      "A3", ".", "F3", ".", "-", "-", "B3", ".", "C4", ".", "B3", ".", ".", "-", "-", "-",
      "Bb3", ".", "G3", ".", "-", "-", "Bb3", ".", "A3", ".", "G3", ".", "F3", ".", "-", "-",
      "D4", ".", "F4", ".", "G4", ".", "F4", ".", "C4", ".", "Eb4", ".", "B3", ".", "D4", ".",
      "Bb3", ".", "G3", ".", "A3", ".", "Bb3", ".", "A3", ".", "G3", ".", "F#3", ".", "F3", "-",
      "-", "-", "Bb3", ".", "A3", ".", "-", "-", "Eb3", ".", ".", "-", "D3", ".", "-", "-",
      "Bb2", ".", ".", "-", "A2", ".", "G2", ".", "F2", ".", "E2", ".", "Eb2", ".", "-", "-"
    ],
    bass: [
      "D2", ".", ".", ".", ".", ".", "-", "-", "D2", ".", ".", ".", "A1", ".", "-", "-",
      "Bb1", ".", ".", ".", ".", ".", "-", "-", "A1", ".", ".", ".", ".", "-", "-", "-",
      "D2", ".", ".", "-", "C2", ".", ".", "-", "B1", ".", ".", ".", "Bb1", ".", ".", "-",
      "Eb2", ".", ".", "-", "C2", ".", ".", "-", "A1", ".", ".", ".", "D2", ".", "A1", "-",
      "D2", ".", "A1", ".", "G1", ".", "A1", ".", "Ab1", ".", "Eb2", ".", "G1", ".", "D2", ".",
      "Bb1", ".", "F1", ".", "A1", ".", "E1", ".", "Bb1", ".", "Eb1", ".", "D1", ".", "A1", ".",
      "Bb1", ".", ".", "-", "A1", ".", ".", "-", "Ab1", ".", ".", "-", "G1", ".", ".", "-",
      "Eb1", ".", ".", ".", "A1", ".", ".", ".", "D1", ".", ".", "-", "A1", ".", "Eb1", "."
    ],
    drone: [
      "D1", ".", ".", ".", ".", ".", ".", ".", "D1", ".", ".", ".", "-", "-", "-", "-",
      "Bb0", ".", ".", ".", ".", ".", ".", ".", "A0", ".", ".", ".", "-", "-", "-", "-",
      "D1", ".", ".", ".", "C1", ".", ".", ".", "Ab0", ".", ".", ".", "G0", ".", ".", "-",
      "Eb1", ".", ".", ".", "A0", ".", ".", ".", "D1", ".", ".", ".", "-", "-", "-", "-",
      "D1", ".", ".", ".", "Bb0", ".", ".", ".", "Ab0", ".", ".", ".", "G0", ".", ".", ".",
      "Bb0", ".", ".", ".", "A0", ".", ".", ".", "Eb1", ".", ".", ".", "D1", ".", ".", "-",
      "Bb0", ".", ".", ".", "A0", ".", ".", "-", "Ab0", ".", ".", ".", "G0", ".", "-", "-",
      "Eb1", ".", ".", ".", "A0", ".", ".", ".", "D1", ".", ".", ".", "A0", ".", ".", "."
    ],
    drums: [
      "T", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".",
      "T", ".", ".", ".", ".", ".", ".", ".", "G", ".", ".", ".", ".", ".", ".", ".",
      "T", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", "G", ".", ".", ".",
      "T", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "M", ".", ".", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "G", ".", ".", ".",
      "T", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".",
      "P", ".", ".", ".", "G", ".", ".", ".", "T", ".", ".", ".", ".", ".", ".", "."
    ]
  },
  biome1: {
    id: "biome1",
    title: "El Comienzo del Descenso",
    audioSrc: "Assets/Audio/bioma1_8bit.wav",
    bpm: 64,
    leadWave: "square",
    harmWave: "triangle",
    bassSubWave: "square",
    droneWave: "triangle",
    leadGain: 0.044,
    harmGain: 0.028,
    bassGain: 0.074,
    droneGain: 0.02,
    leadFilterFreq: 1400,
    harmFilterFreq: 2200,
    bassFilterFreq: 310,
    droneFilterFreq: 260,
    leadAttack: 0.025,
    leadVibratoHz: 3.8,
    leadVibratoDepth: 1.6,
    harmDetune: 4,
    droneDetune: -4,
    lead: [
      "E4", ".", ".", "-", "F4", ".", "B3", ".", ".", "-", "-", "-", "-", "-", "-", "-",
      "-", "-", "G4", ".", "F4", ".", "E4", ".", ".", "-", "-", "-", "-", "-", "-", "-",
      "E4", ".", "F4", ".", "A4", ".", "G4", ".", "F4", ".", "-", "-", "-", "-", "-", "-",
      "-", "-", "B3", ".", "C4", ".", "B3", ".", "A3", ".", ".", "-", "-", "-", "-", "-",
      "E4", ".", ".", "-", "Bb4", ".", "A4", ".", "F4", ".", "E4", ".", "-", "-", "-", "-",
      "-", "-", "F4", ".", "E4", ".", "Bb3", ".", "B3", ".", ".", ".", "-", "-", "-", "-",
      "G4", ".", "F4", ".", "-", "-", "E4", ".", "Eb4", ".", "-", "-", "C4", ".", "B3", ".",
      "-", "-", "F4", ".", "E4", ".", "D#4", ".", "B3", ".", ".", "-", "-", "-", "-", "-"
    ],
    harm: [
      "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "B5", "-", "-", "-", "C6", "-",
      "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "F5", "-", "-", "-", "E5", "-",
      "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "C6", "-", "B5", "-", "-", "-",
      "-", "-", "G3", ".", "F3", ".", "-", "-", "-", "-", "E5", "-", "D#5", "-", "-", "-",
      "-", "-", "B3", ".", "C4", ".", ".", "-", "Bb3", ".", "A3", ".", "-", "-", "Bb5", "-",
      "G3", ".", "F3", ".", "-", "-", "E3", ".", "F3", ".", ".", "-", "-", "-", "F5", "-",
      "Bb3", ".", "A3", ".", "-", "-", "G3", ".", "F#3", ".", "-", "-", "F3", ".", "E3", ".",
      "-", "-", "A3", ".", "G3", ".", "F#3", ".", "F3", ".", "-", "-", "B5", "-", "-", "-"
    ],
    bass: [
      "E2", ".", ".", "-", "B1", ".", ".", "-", "E2", ".", ".", "-", "B1", ".", ".", "-",
      "C2", ".", ".", "-", "B1", ".", ".", "-", "A1", ".", ".", "-", "B1", ".", ".", "-",
      "E2", ".", ".", "-", "B1", ".", ".", "-", "F2", ".", ".", "-", "C2", ".", ".", "-",
      "G1", ".", ".", "-", "A1", ".", ".", "-", "B1", ".", ".", "-", "F1", ".", "B1", "-",
      "E2", ".", ".", "-", "Bb1", ".", ".", "-", "A1", ".", ".", "-", "F1", ".", ".", "-",
      "C2", ".", ".", "-", "G1", ".", ".", "-", "Bb1", ".", ".", "-", "B1", ".", ".", "-",
      "C2", ".", ".", "-", "B1", ".", ".", "-", "Bb1", ".", ".", "-", "A1", ".", ".", "-",
      "F1", ".", ".", "-", "E1", ".", ".", "-", "B1", ".", ".", "-", "F1", ".", "B1", "."
    ],
    drone: [
      "E1", ".", ".", ".", ".", ".", ".", ".", "-", "-", "-", "-", "-", "-", "-", "-",
      "C1", ".", ".", ".", ".", ".", "-", "-", "B0", ".", ".", ".", "-", "-", "-", "-",
      "E1", ".", ".", ".", ".", ".", "-", "-", "F1", ".", ".", ".", "-", "-", "-", "-",
      "A0", ".", ".", ".", "B0", ".", ".", ".", "-", "-", "-", "-", "-", "-", "-", "-",
      "E1", ".", ".", ".", "Bb0", ".", ".", ".", "A0", ".", ".", ".", "F0", ".", ".", "-",
      "C1", ".", ".", ".", "Bb0", ".", ".", ".", "B0", ".", ".", ".", "-", "-", "-", "-",
      "C1", ".", ".", "-", "Bb0", ".", ".", "-", "A0", ".", ".", "-", "F0", ".", ".", "-",
      "F0", ".", ".", ".", "B0", ".", ".", ".", ".", ".", ".", "-", "-", "-", "-", "-"
    ],
    drums: [
      "P", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".",
      "P", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", "G", ".", ".", ".",
      "P", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".",
      "P", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", "G", ".", ".", ".",
      "P", ".", ".", ".", "P", ".", ".", ".", "P", ".", ".", ".", "G", ".", ".", ".",
      "P", ".", ".", ".", "P", ".", ".", ".", "P", ".", ".", ".", "M", ".", ".", ".",
      "P", ".", ".", ".", "P", ".", ".", ".", "P", ".", ".", ".", "G", ".", ".", ".",
      "P", ".", ".", ".", "G", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", "."
    ]
  },
  biome2: {
    id: "biome2",
    title: "La Opresión de las Profundidades",
    audioSrc: "Assets/Audio/bioma2_8bit.wav",
    bpm: 70,
    leadWave: "sawtooth",
    harmWave: "square",
    bassSubWave: "sawtooth",
    droneWave: "sawtooth",
    leadGain: 0.046,
    harmGain: 0.03,
    bassGain: 0.082,
    droneGain: 0.028,
    leadFilterFreq: 1250,
    harmFilterFreq: 1050,
    bassFilterFreq: 380,
    droneFilterFreq: 290,
    leadAttack: 0.018,
    leadVibratoHz: 4.8,
    leadVibratoDepth: 2.5,
    harmDetune: -7,
    droneDetune: 8,
    lead: [
      "G4", ".", "Gb4", ".", "F4", ".", "C4", ".", "-", "-", "Gb4", ".", "F4", ".", "Db4", ".",
      "C4", ".", "B3", ".", "C4", ".", "Db4", ".", "C4", ".", "-", "-", "B3", ".", "Bb3", ".",
      "Ab4", ".", "G4", ".", "Gb4", ".", "F4", ".", "Eb4", ".", "Db4", ".", "C4", ".", "B3", ".",
      "F4", ".", "E4", ".", "Eb4", ".", "Db4", ".", "C4", ".", "B3", ".", "Bb3", ".", "-", "-",
      "C4", ".", "Db4", ".", "Gb4", ".", "F4", ".", "E4", ".", "Eb4", ".", "Db4", ".", "C4", ".",
      "Db4", ".", "C4", ".", "B3", ".", "Bb3", ".", "A3", ".", "Ab3", ".", "G3", ".", "Gb3", ".",
      "G4", ".", "Gb4", ".", "F4", ".", "Db4", ".", "Eb4", ".", "Db4", ".", "C4", ".", "G3", ".",
      "Ab3", ".", "G3", ".", "Gb3", ".", "F3", ".", "E3", ".", "Eb3", ".", "Db3", ".", "B3", "."
    ],
    harm: [
      "C4", ".", ".", "-", "Db4", ".", "G3", ".", "Ab3", ".", "A3", ".", "Ab3", ".", "G3", ".",
      "Gb3", ".", "F3", ".", "E3", ".", "F3", ".", "Gb3", ".", "F3", ".", "E3", ".", "Db3", ".",
      "C4", ".", "B3", ".", "Bb3", ".", "A3", ".", "Ab3", ".", "G3", ".", "Gb3", ".", "F3", ".",
      "B3", ".", "Bb3", ".", "A3", ".", "Ab3", ".", "G3", ".", "Gb3", ".", "F3", ".", "E3", ".",
      "Gb3", ".", "G3", ".", "C4", ".", "B3", ".", "Bb3", ".", "A3", ".", "Ab3", ".", "Gb3", ".",
      "G3", ".", "Gb3", ".", "F3", ".", "E3", ".", "Eb3", ".", "D3", ".", "Db3", ".", "C3", ".",
      "C4", ".", "B3", ".", "Bb3", ".", "G3", ".", "Ab3", ".", "G3", ".", "Gb3", ".", "Db3", ".",
      "D3", ".", "Db3", ".", "C3", ".", "B2", ".", "Bb2", ".", "A2", ".", "Ab2", ".", "Gb3", "."
    ],
    bass: [
      "C2", ".", "G1", ".", "Gb1", ".", "F1", ".", "C2", ".", "Gb1", ".", "F1", ".", "Db1", ".",
      "C2", ".", "G1", ".", "Ab1", ".", "G1", ".", "Gb1", ".", "F1", ".", "E1", ".", "Db1", ".",
      "F1", ".", "C2", ".", "B1", ".", "Bb1", ".", "Ab1", ".", "G1", ".", "Gb1", ".", "F1", ".",
      "Db2", ".", "Ab1", ".", "G1", ".", "Gb1", ".", "F1", ".", "E1", ".", "Eb1", ".", "Db1", ".",
      "C2", ".", "Db2", ".", "Gb1", ".", "G1", ".", "Ab1", ".", "Gb1", ".", "F1", ".", "E1", ".",
      "Eb1", ".", "D1", ".", "Db1", ".", "C1", ".", "B0", ".", "Bb0", ".", "A0", ".", "Ab0", ".",
      "C2", ".", "Gb1", ".", "F1", ".", "Db1", ".", "C1", ".", "Gb1", ".", "F1", ".", "E1", ".",
      "Eb1", ".", "Db1", ".", "C1", ".", "B0", ".", "Bb0", ".", "A0", ".", "Ab0", ".", "G1", "."
    ],
    drone: [
      "C1", ".", ".", ".", "Gb1", ".", ".", ".", "C1", ".", ".", ".", "Db1", ".", ".", ".",
      "C1", ".", ".", ".", "Ab0", ".", ".", ".", "Gb0", ".", ".", ".", "G0", ".", ".", ".",
      "F0", ".", ".", ".", "Gb0", ".", ".", ".", "Ab0", ".", ".", ".", "A0", ".", ".", ".",
      "Db1", ".", ".", ".", "C1", ".", ".", ".", "B0", ".", ".", ".", "Bb0", ".", ".", ".",
      "C1", ".", ".", ".", "Gb0", ".", ".", ".", "Ab0", ".", ".", ".", "F0", ".", ".", ".",
      "Eb0", ".", ".", ".", "Db1", ".", ".", ".", "B0", ".", ".", ".", "Ab0", ".", ".", ".",
      "C1", ".", ".", ".", "Gb0", ".", ".", ".", "F0", ".", ".", ".", "E0", ".", ".", ".",
      "Eb0", ".", ".", ".", "Db1", ".", ".", ".", "G0", ".", ".", ".", "Gb0", ".", ".", "."
    ],
    drums: [
      "P", ".", ".", ".", "P", ".", "G", ".", "P", ".", ".", ".", "M", ".", ".", ".",
      "P", ".", ".", ".", "P", ".", "G", ".", "P", ".", "P", ".", "M", ".", "G", ".",
      "P", ".", ".", ".", "P", ".", "G", ".", "P", ".", ".", ".", "M", ".", ".", ".",
      "P", ".", "P", ".", "M", ".", "G", ".", "P", ".", "P", ".", "T", ".", "G", ".",
      "T", ".", "P", ".", "P", ".", "G", ".", "P", ".", "P", ".", "M", ".", "G", ".",
      "T", ".", "P", ".", "P", ".", "M", ".", "P", ".", "P", ".", "T", ".", "M", ".",
      "P", ".", ".", ".", "P", ".", "G", ".", "P", ".", "P", ".", "M", ".", ".", ".",
      "T", ".", "P", ".", "M", ".", "P", ".", "T", ".", "P", ".", "M", ".", "G", "."
    ]
  },
  biome3: {
    id: "biome3",
    title: "Las Profundidades Extremas",
    audioSrc: "Assets/Audio/bioma3_8bit.wav",
    bpm: 52,
    leadWave: "sawtooth",
    harmWave: "sawtooth",
    bassSubWave: "sawtooth",
    droneWave: "square",
    leadGain: 0.048,
    harmGain: 0.032,
    bassGain: 0.088,
    droneGain: 0.034,
    leadFilterFreq: 980,
    harmFilterFreq: 860,
    bassFilterFreq: 290,
    droneFilterFreq: 240,
    leadAttack: 0.04,
    leadVibratoHz: 3.2,
    leadVibratoDepth: 3.4,
    harmDetune: -11,
    droneDetune: 12,
    lead: [
      "A3", ".", ".", ".", "Bb3", ".", "-", "-", "E3", ".", ".", ".", "Eb3", ".", ".", "-",
      "-", "-", "F3", ".", "E3", ".", "Bb2", ".", "A2", ".", "Ab2", ".", ".", "-", "-", "-",
      "Eb5", ".", ".", "-", "E5", ".", "Bb4", ".", "A4", ".", "Ab4", ".", ".", "-", "-", "-",
      "C4", ".", "B3", ".", "Bb3", ".", "-", "-", "F3", ".", "E3", ".", "Eb3", ".", "-", "-",
      "A3", ".", "Bb3", ".", "C4", ".", "B3", ".", "Bb3", ".", "E3", ".", "Eb3", ".", "D3", ".",
      "Db3", ".", ".", "-", "G3", ".", "Gb3", ".", "F3", ".", "E3", ".", "Eb3", ".", ".", "-",
      "C4", ".", ".", "-", "B3", ".", "Bb3", ".", "-", "-", "E3", ".", "Eb3", ".", "-", "-",
      "F3", ".", "E3", ".", "Eb3", ".", "D3", ".", "Bb2", ".", "Eb3", ".", "E3", ".", "-", "-"
    ],
    harm: [
      "Eb3", ".", ".", ".", "E3", ".", "-", "-", "Bb2", ".", ".", ".", "A2", ".", ".", "-",
      "-", "-", "B2", ".", "Bb2", ".", "E2", ".", "Eb2", ".", "D2", ".", ".", "-", "-", "-",
      "A4", ".", ".", "-", "Bb4", ".", "E4", ".", "Eb4", ".", "D4", ".", ".", "-", "-", "-",
      "Gb3", ".", "F3", ".", "E3", ".", "-", "-", "B2", ".", "Bb2", ".", "A2", ".", "-", "-",
      "Eb3", ".", "E3", ".", "Gb3", ".", "F3", ".", "E3", ".", "Bb2", ".", "A2", ".", "Ab2", ".",
      "G2", ".", ".", "-", "Db3", ".", "C3", ".", "B2", ".", "Bb2", ".", "A2", ".", ".", "-",
      "Gb3", ".", ".", "-", "F3", ".", "E3", ".", "-", "-", "Bb2", ".", "A2", ".", "-", "-",
      "B2", ".", "Bb2", ".", "A2", ".", "Ab2", ".", "E2", ".", "A2", ".", "Bb2", ".", ".", "-"
    ],
    bass: [
      "A1", ".", ".", ".", "Eb1", ".", ".", ".", "E1", ".", ".", ".", "Bb0", ".", ".", ".",
      "A0", ".", ".", ".", "Bb0", ".", ".", ".", "E1", ".", ".", ".", "Eb1", ".", ".", ".",
      "A1", ".", ".", ".", "Bb1", ".", ".", ".", "E1", ".", ".", ".", "Eb1", ".", ".", ".",
      "Gb1", ".", ".", ".", "F1", ".", ".", ".", "B0", ".", ".", ".", "Bb0", ".", ".", ".",
      "A1", ".", "G1", ".", "Gb1", ".", "F1", ".", "E1", ".", "Eb1", ".", "D1", ".", "Db1", ".",
      "C1", ".", "B0", ".", "Bb0", ".", "A0", ".", "Ab0", ".", "G0", ".", "Gb0", ".", "F0", ".",
      "A1", ".", ".", ".", "Eb1", ".", ".", ".", "Bb0", ".", ".", ".", "A0", ".", ".", ".",
      "B0", ".", ".", ".", "Bb0", ".", ".", ".", "E1", ".", ".", ".", "Eb1", ".", "Bb0", "."
    ],
    drone: [
      "A0", ".", ".", ".", ".", ".", ".", ".", "Eb1", ".", ".", ".", ".", ".", ".", ".",
      "A0", ".", ".", ".", "Bb0", ".", ".", ".", "E0", ".", ".", ".", "Eb0", ".", ".", ".",
      "A0", ".", ".", ".", "Bb0", ".", ".", ".", "E0", ".", ".", ".", "Eb0", ".", ".", ".",
      "Gb0", ".", ".", ".", "F0", ".", ".", ".", "B0", ".", ".", ".", "Bb0", ".", ".", ".",
      "A0", ".", ".", ".", "Gb0", ".", ".", ".", "E0", ".", ".", ".", "Eb0", ".", ".", ".",
      "C1", ".", ".", ".", "Bb0", ".", ".", ".", "Ab0", ".", ".", ".", "F0", ".", ".", ".",
      "A0", ".", ".", ".", "Eb0", ".", ".", ".", "Bb0", ".", ".", ".", "A0", ".", ".", ".",
      "B0", ".", ".", ".", "Bb0", ".", ".", ".", "E0", ".", ".", ".", "Bb0", ".", ".", "."
    ],
    drums: [
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "M", ".", ".", ".",
      "T", ".", ".", ".", "G", ".", ".", ".", "T", ".", ".", ".", "P", ".", ".", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "M", ".", ".", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "G", ".", ".", ".",
      "T", ".", ".", ".", "M", ".", ".", ".", "T", ".", ".", ".", "P", ".", ".", ".",
      "T", ".", ".", ".", "M", ".", ".", ".", "T", ".", ".", ".", "M", ".", "G", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "M", ".", ".", ".",
      "T", ".", ".", ".", "P", ".", ".", ".", "T", ".", ".", ".", "M", ".", ".", "."
    ]
  }
};


class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterCompressor = null;
    this.masterMusicGain = null;
    this.masterSfxGain = null;
    this.noiseBuffer = null;
    this.musicMuted = false;
    this.baseMusicGainValue = 0.62;
    this.musicDuckTimer = null;

    this.currentTrackId = null;
    this.desiredTrackId = "intro";

    // Estado del secuenciador MIDI
    this.midiCache = new Map();
    this.midiLoadPromises = new Map();
    this.activeMidiData = null;
    this.midiNoteIndex = 0;
    this.midiLoopStartTime = 0;
    this.activeOscillators = new Set();

    // Estado del secuenciador de respaldo (cuando un entorno file:// bloquea fetch)
    this.musicStep = 0;
    this.nextNoteTime = 0;
    this.schedulerTimer = null;

    // Caché de buffers Web Audio, elementos Audio y control de rugidos de jefe
    this.sfxCache = new Map();
    this.sfxBufferCache = new Map();
    this.sfxRawBufferCache = new Map();
    this.sfxTrimMeta = new Map();
    this.sfxLoadPromises = new Map();
    this.lastSfxTime = new Map();
    this.activeSfxNodes = new Set();
    this.sfxHistory = [];
    this.playedBossRoars = new Set();

    this.isGameOverActive = false;
    this.gameOverEffectAudio = null;
    this.gameOverSongAudio = null;
    this.gameOverFallbackTimer = null;

    this.activeHtmlAudioElements = new Set();
    this.isBackgroundSuspended = false;
    this._lifecycleBound = false;
    this._resumePendingOnGesture = false;

    this._unlockBound = false;
    this.bindAutoUnlock();
    this.bindLifecycleEvents();
  }

  /**
   * Comprueba si el documento se encuentra oculto o en segundo plano.
   */
  isPageHidden() {
    if (typeof document === "undefined") return false;
    return !!(document.hidden || document.visibilityState === "hidden");
  }

  /**
   * Comprueba si el estado actual del juego permite reproducir o reanudar música.
   */
  canPlayMusicInCurrentState() {
    if (this.isPageHidden() || this.isBackgroundSuspended) return false;
    if (this.musicMuted) return false;
    const gc = typeof window !== "undefined" ? (window.__lior || window.gameController) : null;
    if (gc && gc.renderer && gc.renderer.isPortraitBlocked) return false;
    return true;
  }

  /**
   * Gestiona el ciclo de vida de visibilidad y primer/segundo plano en Android e iPhone (iOS):
   * - visibilitychange (cuando document.hidden pasa a true/false)
   * - pagehide / pageshow (suspensión, cierre o navegación en iOS Safari / WebKit)
   * - blur / focus y freeze / resume como respaldo adicional en navegadores móviles
   */
  bindLifecycleEvents() {
    if (this._lifecycleBound || typeof window === "undefined" || typeof document === "undefined") return;
    this._lifecycleBound = true;

    this._onVisibilityChange = () => {
      if (this.isPageHidden()) {
        this.suspendForBackground("visibilitychange");
      } else {
        this.resumeFromBackground("visibilitychange");
      }
    };

    this._onPageHide = () => {
      this.suspendForBackground("pagehide");
    };

    this._onPageShow = () => {
      if (!this.isPageHidden()) {
        this.resumeFromBackground("pageshow");
      }
    };

    this._onWindowBlur = () => {
      if (this.isPageHidden()) {
        this.suspendForBackground("blur");
      }
    };

    this._onWindowFocus = () => {
      if (!this.isPageHidden() && this.isBackgroundSuspended) {
        this.resumeFromBackground("focus");
      }
    };

    document.addEventListener("visibilitychange", this._onVisibilityChange, { passive: true });
    window.addEventListener("pagehide", this._onPageHide, { passive: true });
    window.addEventListener("pageshow", this._onPageShow, { passive: true });
    window.addEventListener("blur", this._onWindowBlur, { passive: true });
    window.addEventListener("focus", this._onWindowFocus, { passive: true });
    document.addEventListener("freeze", this._onPageHide, { passive: true });
    document.addEventListener("resume", this._onPageShow, { passive: true });
  }

  /**
   * Detiene y suspende inmediatamente toda reproducción de música y efectos activos
   * cuando la aplicación pasa a segundo plano, se oculta la pestaña o se suspende en iOS/Android.
   */
  suspendForBackground(reason = "hidden") {
    this.isBackgroundSuspended = true;

    // 1. Detener el temporizador del secuenciador para impedir que se programen nuevas notas en segundo plano
    if (this.schedulerTimer !== null) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    // 2. Cancelar temporizadores de atenuación pendientes
    if (this.musicDuckTimer !== null) {
      clearTimeout(this.musicDuckTimer);
      this.musicDuckTimer = null;
    }

    // 3. Detener todas las voces Web Audio programadas actualmente
    this.stopAllScheduledVoices();

    // 4. Detener cualquier nodo de efecto Web Audio activo
    if (this.activeSfxNodes && this.activeSfxNodes.size > 0) {
      this.activeSfxNodes.forEach(node => {
        try { node.stop(); } catch {}
        try { node.disconnect(); } catch {}
      });
      this.activeSfxNodes.clear();
    }

    // 5. Pausar pistas HTMLAudioElement de Game Over si estaban sonando
    if (this.gameOverEffectAudio) {
      try {
        if (!this.gameOverEffectAudio.paused) {
          this.gameOverEffectAudio._pausedByBackground = true;
          this.gameOverEffectAudio.pause();
        }
      } catch {}
    }
    if (this.gameOverSongAudio) {
      try {
        if (!this.gameOverSongAudio.paused) {
          this.gameOverSongAudio._pausedByBackground = true;
          this.gameOverSongAudio.pause();
        }
      } catch {}
    }

    // 6. Pausar y limpiar cualquier instancia HTMLAudioElement de SFX activa
    if (this.activeHtmlAudioElements && this.activeHtmlAudioElements.size > 0) {
      this.activeHtmlAudioElements.forEach(audioEl => {
        try {
          if (audioEl !== this.gameOverEffectAudio && audioEl !== this.gameOverSongAudio) {
            audioEl.pause();
            audioEl.currentTime = 0;
          }
        } catch {}
      });
      this.activeHtmlAudioElements.clear();
    }

    // 7. Suspender el AudioContext para liberar el hardware de audio en Android e iPhone
    if (this.ctx && typeof this.ctx.suspend === "function" && this.ctx.state === "running") {
      try {
        const suspendRes = this.ctx.suspend();
        if (suspendRes && typeof suspendRes.catch === "function") {
          suspendRes.catch(() => {});
        }
      } catch {}
    }
  }

  /**
   * Reanuda el audio de forma segura únicamente cuando la página vuelve a estar visible
   * y el estado del juego y de silencio (musicMuted) lo permiten, evitando duplicar pistas.
   */
  resumeFromBackground(reason = "visible") {
    if (this.isPageHidden()) return false;
    this.isBackgroundSuspended = false;

    // Respetar el estado de silencio configurado por el jugador
    if (this.musicMuted) {
      if (this.masterMusicGain && this.ctx) {
        try {
          this.masterMusicGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this.masterMusicGain.gain.setValueAtTime(0, this.ctx.currentTime);
        } catch {}
      }
      return false;
    }

    // Si estaba en pantalla de Game Over, reanudar únicamente el audio de Game Over correspondiente
    if (this.isGameOverActive) {
      if (this.gameOverEffectAudio && this.gameOverEffectAudio._pausedByBackground && !this.gameOverEffectAudio.ended) {
        this.gameOverEffectAudio._pausedByBackground = false;
        if (typeof this.gameOverEffectAudio.play === "function") {
          this.gameOverEffectAudio.play().catch(() => {
            this._resumePendingOnGesture = true;
          });
        }
      } else if (this.gameOverSongAudio) {
        this.gameOverSongAudio._pausedByBackground = false;
        this.gameOverSongAudio.volume = this.musicMuted ? 0 : 0.76;
        if (this.gameOverSongAudio.paused && typeof this.gameOverSongAudio.play === "function") {
          this.gameOverSongAudio.play().catch(() => {
            this._resumePendingOnGesture = true;
          });
        }
      }
      return true;
    }

    // Sincronizar cuál es la pista deseada según el estado actual del juego
    const gc = typeof window !== "undefined" ? (window.__lior || window.gameController) : null;
    if (gc && typeof gc.resolveDesiredMusicTrack === "function") {
      const resolvedTrack = gc.resolveDesiredMusicTrack();
      if (resolvedTrack) {
        this.desiredTrackId = resolvedTrack;
      }
    }

    if (!this.desiredTrackId || !this.canPlayMusicInCurrentState()) {
      return false;
    }

    if (!this.ctx) {
      this.init();
    }

    const startOrSyncScheduler = () => {
      if (this.isPageHidden() || this.isBackgroundSuspended || this.musicMuted || this.isGameOverActive) return;
      if (!this.ctx) return;

      // Garantizar que nunca haya dos intervalos ni voces superpuestas
      if (this.schedulerTimer !== null) {
        clearInterval(this.schedulerTimer);
        this.schedulerTimer = null;
      }
      this.stopAllScheduledVoices();

      const targetTrack = this.desiredTrackId;
      if (!targetTrack || !CHIPTUNE_TRACKS[targetTrack]) return;

      if (this.currentTrackId !== targetTrack) {
        this.currentTrackId = targetTrack;
        this.activeMidiData = this.midiCache.get(targetTrack) || null;
        this.midiNoteIndex = 0;
        this.musicStep = 0;
        if (!this.activeMidiData) {
          this.loadMidiTrack(targetTrack).then(parsed => {
            if (parsed && this.currentTrackId === targetTrack && !this.isGameOverActive && !this.isBackgroundSuspended && this.ctx) {
              this.stopAllScheduledVoices();
              this.activeMidiData = parsed;
              this.midiNoteIndex = 0;
              this.midiLoopStartTime = this.ctx.currentTime + 0.02;
            }
          });
        }
      }

      if (this.masterMusicGain) {
        try {
          this.masterMusicGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this.masterMusicGain.gain.setValueAtTime(this.musicMuted ? 0 : this.baseMusicGainValue, this.ctx.currentTime);
        } catch {}
      }

      const now = this.ctx.currentTime;
      if (this.activeMidiData && this.activeMidiData.notes.length > 0) {
        const currentNoteOffset = this.activeMidiData.notes[this.midiNoteIndex]?.startTime || 0;
        this.midiLoopStartTime = now + 0.03 - currentNoteOffset;
      }
      this.nextNoteTime = now + 0.03;
      this.schedulerTimer = setInterval(() => this.scheduleMusicSteps(), 25);
    };

    if (this.ctx && this.ctx.state === "suspended" && typeof this.ctx.resume === "function") {
      try {
        const resumePromise = this.ctx.resume();
        if (resumePromise && typeof resumePromise.then === "function") {
          resumePromise.then(() => {
            this._resumePendingOnGesture = false;
            startOrSyncScheduler();
          }).catch(() => {
            this._resumePendingOnGesture = true;
          });
          return true;
        }
      } catch {
        this._resumePendingOnGesture = true;
      }
    }

    startOrSyncScheduler();
    return true;
  }

  bindAutoUnlock() {
    if (this._unlockBound || typeof window === "undefined") return;
    this._unlockBound = true;
    const unlock = () => {
      if (this.isPageHidden()) return;
      this.isBackgroundSuspended = false;
      this.init();
      if (this._resumePendingOnGesture) {
        this._resumePendingOnGesture = false;
        this.resumeFromBackground("gesture");
        return;
      }
      if (this.isGameOverActive) {
        if (this.gameOverSongAudio && this.gameOverSongAudio.paused && (!this.gameOverEffectAudio || this.gameOverEffectAudio.ended)) {
          if (typeof this.gameOverSongAudio.play === "function") {
            this.gameOverSongAudio.play().catch(() => {});
          }
        }
        return;
      }
      if (this.desiredTrackId && !this.schedulerTimer && !this.musicMuted) {
        this.playMusic(this.desiredTrackId);
      } else if (this.ctx && this.ctx.state === "running" && this.currentTrackId) {
        if (this.nextNoteTime < this.ctx.currentTime) {
          this.nextNoteTime = this.ctx.currentTime + 0.02;
        }
      }
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        let outputNode = this.ctx.destination;
        if (typeof this.ctx.createDynamicsCompressor === "function") {
          try {
            this.masterCompressor = this.ctx.createDynamicsCompressor();
            this.masterCompressor.threshold.setValueAtTime(-10, this.ctx.currentTime);
            this.masterCompressor.knee.setValueAtTime(12, this.ctx.currentTime);
            this.masterCompressor.ratio.setValueAtTime(4, this.ctx.currentTime);
            this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
            this.masterCompressor.release.setValueAtTime(0.15, this.ctx.currentTime);
            this.masterCompressor.connect(this.ctx.destination);
            outputNode = this.masterCompressor;
          } catch {
            outputNode = this.ctx.destination;
          }
        }
        this.masterMusicGain = this.ctx.createGain();
        this.masterMusicGain.gain.value = this.musicMuted ? 0 : this.baseMusicGainValue;
        this.masterMusicGain.connect(outputNode);

        this.masterSfxGain = this.ctx.createGain();
        this.masterSfxGain.gain.value = 0.92;
        this.masterSfxGain.connect(outputNode);

        this.buildNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === "suspended" && !this.isPageHidden() && !this.isBackgroundSuspended) {
      this.ctx.resume().catch(() => {});
    }
    if (this.ctx && this.sfxRawBufferCache.size > 0) {
      this.decodePendingSfxBuffers();
    }
  }

  /**
   * Analiza el AudioBuffer decodificado para detectar y recortar silencios muertos al inicio y al final,
   * y calcular un factor de normalización suave que equilibre la mezcla sin alterar el archivo original.
   */
  prepareDecodedBuffer(audioBuffer, encodedSrc = "") {
    if (!audioBuffer || typeof audioBuffer.getChannelData !== "function") return audioBuffer;
    try {
      const sr = audioBuffer.sampleRate || 44100;
      const len = audioBuffer.length || 0;
      const channels = Math.max(1, audioBuffer.numberOfChannels || 1);
      if (len < 64) return audioBuffer;

      const ch0 = audioBuffer.getChannelData(0);
      const ch1 = channels > 1 ? audioBuffer.getChannelData(1) : null;
      const startThreshold = 0.0075;
      const endThreshold = 0.0035;

      let firstActive = 0;
      while (firstActive < len) {
        const s = ch1 ? Math.max(Math.abs(ch0[firstActive]), Math.abs(ch1[firstActive])) : Math.abs(ch0[firstActive]);
        if (s >= startThreshold) break;
        firstActive++;
      }
      if (firstActive >= len) firstActive = 0;

      let lastActive = len - 1;
      while (lastActive > firstActive) {
        const s = ch1 ? Math.max(Math.abs(ch0[lastActive]), Math.abs(ch1[lastActive])) : Math.abs(ch0[lastActive]);
        if (s >= endThreshold) break;
        lastActive--;
      }

      let peak = 0;
      const step = Math.max(1, Math.floor((lastActive - firstActive + 1) / 4000));
      for (let i = firstActive; i <= lastActive; i += step) {
        const s = ch1 ? Math.max(Math.abs(ch0[i]), Math.abs(ch1[i])) : Math.abs(ch0[i]);
        if (s > peak) peak = s;
      }

      const preMargin = Math.floor(sr * 0.002);
      const postMargin = Math.floor(sr * 0.025);
      const startSample = Math.max(0, firstActive - preMargin);
      const endSample = Math.min(len, lastActive + postMargin);
      const trimStartSec = startSample / sr;
      const rawTrimDurationSec = Math.max(0.04, (endSample - startSample) / sr);
      const isRoarOrDeath = encodedSrc.includes("/monster/") || encodedSrc.includes("game-over");
      const maxAllowedDur = isRoarOrDeath ? 4.5 : 2.2;
      const trimDurationSec = Math.min(maxAllowedDur, rawTrimDurationSec);
      const normGain = peak > 0.05 ? Math.min(1.25, Math.max(0.72, 0.88 / peak)) : 1.0;

      audioBuffer._trimStartSec = trimStartSec;
      audioBuffer._trimDurationSec = trimDurationSec;
      audioBuffer._normGain = normGain;
      this.sfxTrimMeta.set(encodedSrc, { trimStartSec, trimDurationSec, normGain });
    } catch {}
    return audioBuffer;
  }

  decodePendingSfxBuffers() {
    if (!this.ctx || typeof this.ctx.decodeAudioData !== "function") return;
    this.sfxRawBufferCache.forEach((rawBuf, encodedSrc) => {
      if (this.sfxBufferCache.has(encodedSrc)) return;
      this.sfxRawBufferCache.delete(encodedSrc);
      try {
        const copy = rawBuf.slice(0);
        const decodeRes = this.ctx.decodeAudioData(
          copy,
          decoded => {
            if (decoded) {
              this.prepareDecodedBuffer(decoded, encodedSrc);
              this.sfxBufferCache.set(encodedSrc, decoded);
            }
          },
          () => {}
        );
        if (decodeRes && typeof decodeRes.then === "function") {
          decodeRes.then(decoded => {
            if (decoded) {
              this.prepareDecodedBuffer(decoded, encodedSrc);
              this.sfxBufferCache.set(encodedSrc, decoded);
            }
          }).catch(() => {});
        }
      } catch {}
    });
  }

  /**
   * Precarga en memoria un archivo de efecto de sonido o música MP3/WAV sin reproducirlo.
   */
  async preloadAudioFile(src, { decodeBuffer = true } = {}) {
    if (!src) return null;
    const encodedSrc = encodeURI(src);
    if (typeof Audio !== "undefined" && !this.sfxCache.has(encodedSrc)) {
      try {
        const audioEl = new Audio();
        audioEl.preload = "auto";
        audioEl.src = encodedSrc;
        this.sfxCache.set(encodedSrc, audioEl);
      } catch {}
    }
    if (!decodeBuffer || typeof fetch !== "function") {
      return this.sfxCache.get(encodedSrc) || null;
    }
    if (this.sfxBufferCache.has(encodedSrc)) {
      return this.sfxBufferCache.get(encodedSrc);
    }
    if (this.sfxLoadPromises.has(encodedSrc)) {
      return this.sfxLoadPromises.get(encodedSrc);
    }
    const promise = (async () => {
      try {
        const resp = await fetch(encodedSrc);
        if (!resp.ok) return null;
        const rawBuf = await resp.arrayBuffer();
        if (!rawBuf || rawBuf.byteLength === 0) return null;
        if (this.ctx && typeof this.ctx.decodeAudioData === "function") {
          const decoded = await new Promise(resolve => {
            try {
              const copy = rawBuf.slice(0);
              const res = this.ctx.decodeAudioData(copy, buf => resolve(buf), () => resolve(null));
              if (res && typeof res.then === "function") {
                res.then(resolve).catch(() => resolve(null));
              }
            } catch {
              resolve(null);
            }
          });
          if (decoded) {
            this.prepareDecodedBuffer(decoded, encodedSrc);
            this.sfxBufferCache.set(encodedSrc, decoded);
            return decoded;
          }
        } else {
          this.sfxRawBufferCache.set(encodedSrc, rawBuf);
        }
        return rawBuf;
      } catch {
        return null;
      }
    })();
    this.sfxLoadPromises.set(encodedSrc, promise);
    const result = await promise;
    this.sfxLoadPromises.delete(encodedSrc);
    return result;
  }

  /**
   * Precarga y parsea una pista MIDI en memoria sin iniciar su reproducción.
   */
  async preloadMidiTrack(trackId) {
    return this.loadMidiTrack(trackId);
  }

  canTriggerSfx(sfxKey, dedupeMs = 45) {
    if (!sfxKey || dedupeMs <= 0) return true;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const prev = this.lastSfxTime.get(sfxKey);
    if (prev !== undefined && (now - prev) < dedupeMs) {
      return false;
    }
    this.lastSfxTime.set(sfxKey, now);
    return true;
  }

  recordSfxHistory(sfxKey, src) {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    this.sfxHistory.push({ key: sfxKey, src, time: now });
    if (this.sfxHistory.length > 120) {
      this.sfxHistory.shift();
    }
  }

  /**
   * Atenúa temporalmente el bus de música cuando ocurre un evento sonoro prioritario (como el rugido de un jefe).
   */
  duckMusicTemporarily(duckedGain = 0.34, durationMs = 1100) {
    if (this.musicMuted || !this.ctx || !this.masterMusicGain) return;
    clearTimeout(this.musicDuckTimer);
    const now = this.ctx.currentTime;
    try {
      this.masterMusicGain.gain.cancelScheduledValues(now);
      this.masterMusicGain.gain.setTargetAtTime(duckedGain, now, 0.035);
    } catch {}
    this.musicDuckTimer = setTimeout(() => {
      this.musicDuckTimer = null;
      if (!this.musicMuted && this.ctx && this.masterMusicGain) {
        try {
          this.masterMusicGain.gain.setTargetAtTime(this.baseMusicGainValue, this.ctx.currentTime, 0.18);
        } catch {}
      }
    }, durationMs);
  }

  buildNoiseBuffer() {
    if (!this.ctx || this.noiseBuffer) return;
    const sr = this.ctx.sampleRate;
    const len = Math.floor(sr * 0.35);
    const buffer = this.ctx.createBuffer(1, len, sr);
    const data = buffer.getChannelData(0);
    let lfsr = 0x4000;
    for (let i = 0; i < len; i++) {
      if (i % 3 === 0) {
        const bit = ((lfsr >> 0) ^ (lfsr >> 1)) & 1;
        lfsr = (lfsr >> 1) | (bit << 14);
      }
      data[i] = (lfsr & 1) ? 1.0 : -1.0;
    }
    this.noiseBuffer = buffer;
  }

  /**
   * Comprueba si los efectos normales de acciones del juego deben silenciarse
   * porque se está mostrando la introducción narrativa.
   */
  areGameplaySfxSuppressed() {
    const gc = typeof window !== "undefined" ? (window.__lior || window.gameController) : null;
    return !!(gc && typeof gc.isIntroActive === "function" && gc.isIntroActive());
  }

  /**
   * Reproduce un archivo de audio MP3/WAV desde su ruta exacta en Assets/Audio/.
   * Utiliza AudioBuffer decodificado con recorte automático de silencio muerto y envolvente suave
   * cuando está disponible, e instancias aisladas de HTMLAudioElement como respaldo.
   */
  playAudioFile(src, { volume = 0.85, loop = false, onEnded = null, fallbackFn = null, sfxKey = null, dedupeMs = 45, forceHtmlAudio = false } = {}) {
    if (!src) {
      if (typeof fallbackFn === "function") fallbackFn();
      return null;
    }
    if (this.isPageHidden() || this.isBackgroundSuspended) {
      return null;
    }
    const key = sfxKey || src;
    if (!loop && !this.canTriggerSfx(key, dedupeMs)) {
      return null;
    }
    this.recordSfxHistory(key, src);

    const encodedSrc = encodeURI(src);
    this.init();

    const isNativeAudioElement = typeof Audio === "function" && /\[native code\]/.test(Function.prototype.toString.call(Audio));
    if (
      !forceHtmlAudio &&
      !loop &&
      isNativeAudioElement &&
      this.ctx &&
      this.ctx.state === "running" &&
      this.sfxBufferCache.has(encodedSrc) &&
      typeof this.ctx.createBufferSource === "function"
    ) {
      try {
        const buffer = this.sfxBufferCache.get(encodedSrc);
        const source = this.ctx.createBufferSource();
        const gainNode = this.ctx.createGain();
        source.buffer = buffer;
        source.loop = false;

        const now = this.ctx.currentTime;
        const offsetSec = buffer._trimStartSec || 0;
        const playDurSec = buffer._trimDurationSec || Math.max(0.04, buffer.duration - offsetSec);
        const effVol = Math.max(0.001, Math.min(1.15, volume * (buffer._normGain || 1.0)));
        const fadeOutStart = now + Math.max(0.015, playDurSec - 0.018);

        gainNode.gain.setValueAtTime(effVol, now);
        gainNode.gain.setValueAtTime(effVol, fadeOutStart);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + playDurSec);

        source.connect(gainNode);
        gainNode.connect(this.masterSfxGain || this.ctx.destination);

        let endedHandled = false;
        const handleObj = {
          source,
          gainNode,
          src: encodedSrc,
          loop: false,
          paused: false,
          ended: false,
          currentTime: 0,
          onended: null,
          pause: () => {
            if (handleObj.ended) return;
            handleObj.paused = true;
            handleObj.ended = true;
            try { source.stop(); } catch {}
            try { source.disconnect(); } catch {}
            this.activeSfxNodes.delete(source);
          }
        };

        this.activeSfxNodes.add(source);
        source.onended = () => {
          this.activeSfxNodes.delete(source);
          handleObj.ended = true;
          handleObj.paused = true;
          if (endedHandled) return;
          endedHandled = true;
          if (typeof handleObj.onended === "function") handleObj.onended();
          if (typeof onEnded === "function") onEnded();
        };
        source.start(now, offsetSec, playDurSec);
        return handleObj;
      } catch {
        // Continúa con el respaldo HTMLAudioElement
      }
    }

    if (!loop && !this.sfxBufferCache.has(encodedSrc) && !this.sfxLoadPromises.has(encodedSrc)) {
      this.preloadAudioFile(src, { decodeBuffer: true }).catch(() => {});
    }

    if (typeof Audio === "undefined") {
      if (typeof fallbackFn === "function") fallbackFn();
      if (typeof onEnded === "function") setTimeout(onEnded, 650);
      return null;
    }

    try {
      let baseAudio = this.sfxCache.get(encodedSrc);
      if (!baseAudio) {
        baseAudio = new Audio(encodedSrc);
        baseAudio.preload = "auto";
        this.sfxCache.set(encodedSrc, baseAudio);
      }

      const instance = (typeof baseAudio.cloneNode === "function" && baseAudio.readyState >= 2)
        ? baseAudio.cloneNode()
        : new Audio(encodedSrc);
      instance.preload = "auto";
      instance.loop = !!loop;
      const trimMeta = this.sfxTrimMeta.get(encodedSrc);
      const normGain = trimMeta?.normGain || 1.0;
      instance.volume = Math.max(0, Math.min(1, volume * Math.min(1.08, normGain)));
      try {
        instance.currentTime = (!loop && trimMeta?.trimStartSec) ? trimMeta.trimStartSec : 0;
      } catch {}

      let endedHandled = false;
      const cleanupTrackedAudio = () => {
        if (this.activeHtmlAudioElements) {
          this.activeHtmlAudioElements.delete(instance);
        }
      };
      const triggerEnded = () => {
        cleanupTrackedAudio();
        if (endedHandled) return;
        endedHandled = true;
        if (typeof onEnded === "function") onEnded();
      };

      instance.addEventListener("ended", triggerEnded, { once: true });
      instance.addEventListener("pause", () => {
        if (!instance._pausedByBackground) cleanupTrackedAudio();
      });
      if (this.activeHtmlAudioElements) {
        this.activeHtmlAudioElements.add(instance);
      }

      const playPromise = instance.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          if (typeof fallbackFn === "function") fallbackFn();
          if (typeof onEnded === "function") {
            setTimeout(triggerEnded, 650);
          }
        });
      }
      return instance;
    } catch {
      if (typeof fallbackFn === "function") fallbackFn();
      if (typeof onEnded === "function") setTimeout(onEnded, 650);
      return null;
    }
  }

  /**
   * Carga y parsea un archivo MIDI (.mid / .midi) desde Assets/Audio/bgm/.
   */
  async loadMidiTrack(trackId) {
    if (this.midiCache.has(trackId)) return this.midiCache.get(trackId);
    if (this.midiLoadPromises.has(trackId)) return this.midiLoadPromises.get(trackId);

    const trackMeta = CHIPTUNE_TRACKS[trackId];
    if (!trackMeta || !trackMeta.audioSrc || typeof fetch !== "function") return null;

    const promise = (async () => {
      const baseSrc = trackMeta.audioSrc;
      const candidates = [baseSrc];
      if (baseSrc.endsWith(".mid")) {
        candidates.push(baseSrc.slice(0, -4) + ".midi");
      } else if (baseSrc.endsWith(".midi")) {
        candidates.push(baseSrc.slice(0, -5) + ".mid");
      }

      for (const candidate of candidates) {
        try {
          const resp = await fetch(encodeURI(candidate));
          if (!resp.ok) continue;
          const buf = await resp.arrayBuffer();
          const parsed = parseStandardMidiFile(buf);
          if (parsed && parsed.notes.length > 0) {
            this.midiCache.set(trackId, parsed);
            return parsed;
          }
        } catch {
          // Continúa con el siguiente candidato o usa el sintetizador de respaldo
        }
      }
      return null;
    })();

    this.midiLoadPromises.set(trackId, promise);
    const result = await promise;
    this.midiLoadPromises.delete(trackId);
    return result;
  }

  stopAllScheduledVoices() {
    this.activeOscillators.forEach(node => {
      try { node.stop(); } catch {}
      try { node.disconnect(); } catch {}
    });
    this.activeOscillators.clear();
  }

  /**
   * Inicia o cambia la pista de música de fondo en bucle continuo sin reiniciarla si ya está activa.
   */
  playMusic(trackId) {
    if (!trackId || !CHIPTUNE_TRACKS[trackId]) return;
    if (this.isGameOverActive) return;

    this.desiredTrackId = trackId;
    if (this.isPageHidden() || this.isBackgroundSuspended) {
      this.currentTrackId = trackId;
      this.updateMusicButtonsUI();
      return;
    }

    this.init();
    if (!this.ctx) return;

    if (this.currentTrackId === trackId && this.schedulerTimer !== null) {
      return;
    }

    this.stopAllScheduledVoices();
    this.currentTrackId = trackId;
    this.activeMidiData = this.midiCache.get(trackId) || null;
    this.midiNoteIndex = 0;
    this.midiLoopStartTime = this.ctx.currentTime + 0.03;
    this.musicStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.03;

    if (!this.activeMidiData) {
      this.loadMidiTrack(trackId).then(parsed => {
        if (parsed && this.currentTrackId === trackId && !this.isGameOverActive && !this.isPageHidden() && !this.isBackgroundSuspended && this.ctx) {
          this.stopAllScheduledVoices();
          this.activeMidiData = parsed;
          this.midiNoteIndex = 0;
          this.midiLoopStartTime = this.ctx.currentTime + 0.02;
        }
      });
    }

    if (this.schedulerTimer === null) {
      this.schedulerTimer = setInterval(() => this.scheduleMusicSteps(), 25);
    }
    this.updateMusicButtonsUI();
  }

  stopMusic() {
    this.desiredTrackId = null;
    this.currentTrackId = null;
    this.activeMidiData = null;
    if (this.schedulerTimer !== null) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.stopAllScheduledVoices();
  }

  /**
   * Detiene inmediatamente el efecto de muerte y la canción en bucle de Game Over.
   */
  stopGameOverAudio() {
    this.isGameOverActive = false;
    if (this.gameOverFallbackTimer !== null) {
      clearTimeout(this.gameOverFallbackTimer);
      this.gameOverFallbackTimer = null;
    }
    if (this.gameOverEffectAudio) {
      try {
        this.gameOverEffectAudio.onended = null;
        this.gameOverEffectAudio.pause();
        this.gameOverEffectAudio.currentTime = 0;
      } catch {}
      this.gameOverEffectAudio = null;
    }
    if (this.gameOverSongAudio) {
      try {
        this.gameOverSongAudio.pause();
        this.gameOverSongAudio.currentTime = 0;
      } catch {}
      this.gameOverSongAudio = null;
    }
  }

  toggleMusicMute() {
    this.musicMuted = !this.musicMuted;
    this.init();
    if (this.masterMusicGain && this.ctx) {
      clearTimeout(this.musicDuckTimer);
      this.musicDuckTimer = null;
      this.masterMusicGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterMusicGain.gain.setValueAtTime(this.musicMuted ? 0 : this.baseMusicGainValue, this.ctx.currentTime);
    }
    if (this.gameOverSongAudio) {
      this.gameOverSongAudio.volume = this.musicMuted ? 0 : 0.76;
    }
    if (!this.musicMuted && !this.isGameOverActive && this.desiredTrackId && !this.schedulerTimer) {
      this.playMusic(this.desiredTrackId);
    }
    this.updateMusicButtonsUI();
    return !this.musicMuted;
  }

  updateMusicButtonsUI() {
    const label = this.musicMuted ? "🔇" : "♪";
    const hudBtn = document.getElementById("btn-music-toggle");
    if (hudBtn) {
      hudBtn.textContent = label;
      hudBtn.title = this.musicMuted ? "Activar música" : "Silenciar música";
      hudBtn.classList.toggle("is-muted", this.musicMuted);
    }
    const introBtn = document.getElementById("btn-intro-music");
    if (introBtn) {
      introBtn.textContent = this.musicMuted ? "🔇 MÚSICA OFF" : "♪ MÚSICA";
    }
    const menuBtn = document.getElementById("btn-menu-music");
    if (menuBtn) {
      menuBtn.textContent = this.musicMuted ? "🔇 Activar Música" : "♪ Silenciar Música";
    }
  }

  scheduleMusicSteps() {
    if (this.isPageHidden() || this.isBackgroundSuspended) {
      this.suspendForBackground("scheduler-guard");
      return;
    }
    if (!this.ctx || !this.currentTrackId || this.isGameOverActive) return;
    if (this.ctx.state === "suspended") return;

    if (this.activeMidiData && this.activeMidiData.notes.length > 0) {
      this.scheduleMidiTrackSteps(this.activeMidiData);
      return;
    }

    const meta = CHIPTUNE_TRACKS[this.currentTrackId];
    const fallbackKey = meta?.fallbackId || "biome1";
    const track = FALLBACK_SYNTH_PATTERNS[fallbackKey] || FALLBACK_SYNTH_PATTERNS.biome1;
    if (!track) return;

    const totalSteps = track.lead.length || 128;
    const stepDuration = 60.0 / track.bpm / 4.0;
    const now = this.ctx.currentTime;

    if (this.nextNoteTime < now - 0.15) {
      this.nextNoteTime = now + 0.02;
    }

    while (this.nextNoteTime < now + 0.12) {
      this.scheduleSingleStep(track, this.musicStep, this.nextNoteTime, stepDuration, totalSteps);
      this.nextNoteTime += stepDuration;
      this.musicStep = (this.musicStep + 1) % totalSteps;
    }
  }

  /**
   * Secuenciador en tiempo real de eventos MIDI con bucle continuo sin cortes y resincronización suave.
   */
  scheduleMidiTrackSteps(midiData) {
    const now = this.ctx.currentTime;
    const lookahead = 0.14;
    const { notes, totalDuration } = midiData;

    if (this.midiNoteIndex >= notes.length) {
      this.midiLoopStartTime += totalDuration;
      this.midiNoteIndex = 0;
    }

    const expectedTime = this.midiLoopStartTime + (notes[this.midiNoteIndex]?.startTime || 0);
    if (now - expectedTime > 0.25) {
      this.midiLoopStartTime = now - (notes[this.midiNoteIndex]?.startTime || 0);
    }

    let safety = 0;
    while (safety++ < 64) {
      if (this.midiNoteIndex >= notes.length) {
        this.midiLoopStartTime += totalDuration;
        this.midiNoteIndex = 0;
      }
      const ev = notes[this.midiNoteIndex];
      const absNoteTime = this.midiLoopStartTime + ev.startTime;
      if (absNoteTime > now + lookahead) {
        break;
      }
      if (absNoteTime >= now - 0.05) {
        this.triggerMidiNoteEvent(ev, Math.max(now, absNoteTime));
      }
      this.midiNoteIndex++;
    }
  }

  triggerMidiNoteEvent(ev, time) {
    if (this.musicMuted || !this.masterMusicGain || !this.ctx) return;

    if (ev.channel === 9) {
      const p = ev.pitch;
      const velScale = Math.max(0.2, Math.min(1.0, ev.velocity / 127));
      if (p === 35 || p === 36 || p === 41 || p === 43 || p === 45) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(p <= 36 ? 95 : 115, time);
        osc.frequency.exponentialRampToValueAtTime(28, time + 0.18);
        gain.gain.setValueAtTime(0.062 * velScale, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);
        osc.connect(gain);
        gain.connect(this.masterMusicGain);
        this.activeOscillators.add(osc);
        osc.onended = () => this.activeOscillators.delete(osc);
        osc.start(time);
        osc.stop(time + 0.21);
      } else if (this.noiseBuffer) {
        const isSnare = (p === 38 || p === 40 || p === 37 || p === 39);
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = isSnare ? "bandpass" : "highpass";
        filter.frequency.setValueAtTime(isSnare ? 950 : 3600, time);
        const gain = this.ctx.createGain();
        const dur = isSnare ? 0.12 : 0.05;
        gain.gain.setValueAtTime((isSnare ? 0.034 : 0.017) * velScale, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterMusicGain);
        this.activeOscillators.add(noise);
        noise.onended = () => this.activeOscillators.delete(noise);
        noise.start(time);
        noise.stop(time + dur + 0.01);
      }
      return;
    }

    const freq = 440 * Math.pow(2, (ev.pitch - 69) / 12);
    if (!Number.isFinite(freq) || freq < 20 || freq > 12000) return;

    const prog = ev.program || 0;
    const isBass = (prog >= 32 && prog <= 39) || ev.pitch < 46;
    const isStringsOrPad = (prog >= 16 && prog <= 23) || (prog >= 40 && prog <= 55) || (prog >= 88 && prog <= 95);
    const waveType = isBass ? "triangle" : (isStringsOrPad ? "sawtooth" : "square");
    const filterFreq = isBass ? 420 : (isStringsOrPad ? 1350 : 1850);
    const velNorm = Math.max(0.15, Math.min(1.0, ev.velocity / 127));
    const baseGain = isBass ? 0.064 : (isStringsOrPad ? 0.032 : 0.039);
    const gainVal = baseGain * velNorm;
    const dur = Math.max(0.04, Math.min(4.5, ev.duration));
    const atk = isStringsOrPad ? Math.min(0.04, dur * 0.3) : 0.012;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, time);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterFreq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(gainVal, time + atk);
    gain.gain.setValueAtTime(gainVal * 0.78, time + dur * 0.75);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterMusicGain);

    this.activeOscillators.add(osc);
    osc.onended = () => this.activeOscillators.delete(osc);
    osc.start(time);
    osc.stop(time + dur + 0.01);
  }

  scheduleTonalVoice({
    seq,
    step,
    totalSteps,
    time,
    stepDuration,
    waveType = "square",
    gainValue = 0.045,
    filterFreq = 1400,
    attackTime = 0.02,
    detuneCents = 0,
    vibratoHz = 0,
    vibratoDepth = 0,
    subWave = null
  }) {
    if (!seq) return;
    const note = seq[step];
    if (!note || note === "." || note === "-") return;

    const freq = chiptuneNoteToFreq(note);
    if (freq <= 0) return;

    let holdSteps = 1;
    while (step + holdSteps < totalSteps && seq[step + holdSteps] === ".") {
      holdSteps++;
    }

    const dur = stepDuration * holdSteps * 0.96;
    const atk = Math.min(attackTime, dur * 0.35);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterFreq, time);
    filter.Q.setValueAtTime(1.2, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(gainValue, time + atk);
    gain.gain.setValueAtTime(gainValue * 0.82, time + dur * 0.72);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    const osc = this.ctx.createOscillator();
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, time);
    if (detuneCents) {
      osc.detune.setValueAtTime(detuneCents, time);
    }

    if (vibratoHz > 0 && vibratoDepth > 0 && dur > 0.25) {
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(vibratoHz, time);
      lfoGain.gain.setValueAtTime(vibratoDepth, time);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start(time + 0.1);
      lfo.stop(time + dur);
    }

    osc.connect(filter);

    if (subWave) {
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = subWave;
      subOsc.frequency.setValueAtTime(freq * 0.5, time);
      subGain.gain.setValueAtTime(0.45, time);
      subOsc.connect(subGain);
      subGain.connect(filter);
      this.activeOscillators.add(subOsc);
      subOsc.onended = () => this.activeOscillators.delete(subOsc);
      subOsc.start(time);
      subOsc.stop(time + dur + 0.008);
    }

    filter.connect(gain);
    gain.connect(this.masterMusicGain);
    this.activeOscillators.add(osc);
    osc.onended = () => this.activeOscillators.delete(osc);
    osc.start(time);
    osc.stop(time + dur + 0.008);
  }

  scheduleSingleStep(track, step, time, stepDuration, totalSteps = 128) {
    if (this.musicMuted || !this.masterMusicGain) return;

    this.scheduleTonalVoice({
      seq: track.lead,
      step,
      totalSteps,
      time,
      stepDuration,
      waveType: track.leadWave || "square",
      gainValue: track.leadGain || 0.046,
      filterFreq: track.leadFilterFreq || 1400,
      attackTime: track.leadAttack || 0.025,
      vibratoHz: track.leadVibratoHz || 0,
      vibratoDepth: track.leadVibratoDepth || 0
    });

    this.scheduleTonalVoice({
      seq: track.harm,
      step,
      totalSteps,
      time,
      stepDuration,
      waveType: track.harmWave || "triangle",
      gainValue: track.harmGain || 0.03,
      filterFreq: track.harmFilterFreq || 1200,
      attackTime: 0.02,
      detuneCents: track.harmDetune || 0
    });

    this.scheduleTonalVoice({
      seq: track.bass,
      step,
      totalSteps,
      time,
      stepDuration,
      waveType: "triangle",
      gainValue: track.bassGain || 0.075,
      filterFreq: track.bassFilterFreq || 340,
      attackTime: 0.014,
      subWave: track.bassSubWave || null
    });

    if (track.drone) {
      this.scheduleTonalVoice({
        seq: track.drone,
        step,
        totalSteps,
        time,
        stepDuration,
        waveType: track.droneWave || "sawtooth",
        gainValue: track.droneGain || 0.024,
        filterFreq: track.droneFilterFreq || 260,
        attackTime: 0.045,
        detuneCents: track.droneDetune || 0
      });
    }

    const drum = track.drums ? track.drums[step] : ".";
    if (drum === "T") {
      const oscT = this.ctx.createOscillator();
      const filterT = this.ctx.createBiquadFilter();
      const gainT = this.ctx.createGain();
      oscT.type = "triangle";
      oscT.frequency.setValueAtTime(92, time);
      oscT.frequency.exponentialRampToValueAtTime(28, time + 0.26);
      filterT.type = "lowpass";
      filterT.frequency.setValueAtTime(240, time);
      gainT.gain.setValueAtTime(0.068, time);
      gainT.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
      oscT.connect(filterT);
      filterT.connect(gainT);
      gainT.connect(this.masterMusicGain);
      oscT.start(time);
      oscT.stop(time + 0.29);
    } else if (drum === "P") {
      const oscP = this.ctx.createOscillator();
      const gainP = this.ctx.createGain();
      oscP.type = "triangle";
      oscP.frequency.setValueAtTime(68, time);
      oscP.frequency.exponentialRampToValueAtTime(26, time + 0.15);
      gainP.gain.setValueAtTime(0.05, time);
      gainP.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
      oscP.connect(gainP);
      gainP.connect(this.masterMusicGain);
      oscP.start(time);
      oscP.stop(time + 0.17);
    } else if (drum === "M" && this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(620, time);
      filter.Q.setValueAtTime(4.5, time);
      const gainN = this.ctx.createGain();
      gainN.gain.setValueAtTime(0.026, time);
      gainN.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);
      noise.connect(filter);
      filter.connect(gainN);
      gainN.connect(this.masterMusicGain);
      noise.start(time);
      noise.stop(time + 0.15);
    } else if (drum === "G" && this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(360, time);
      const gainN = this.ctx.createGain();
      gainN.gain.setValueAtTime(0.0001, time);
      gainN.gain.linearRampToValueAtTime(0.018, time + 0.04);
      gainN.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
      noise.connect(filter);
      filter.connect(gainN);
      gainN.connect(this.masterMusicGain);
      noise.start(time);
      noise.stop(time + 0.13);
    }
  }

  playLogoJingle() {
    if (this.isPageHidden() || this.isBackgroundSuspended) return;
    this.init();
    if (!this.ctx) return;
    const out = this.masterSfxGain || this.ctx.destination;
    const chordNotes = [261.63, 329.63, 392.00, 523.25];
    chordNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.075, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(out);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.6);
    });
  }

  playStep() {
    if (this.isPageHidden() || this.isBackgroundSuspended) return;
    if (this.areGameplaySfxSuppressed()) return;
    if (!this.canTriggerSfx("step", 45)) return;
    this.recordSfxHistory("step", "synth:step");
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.075, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.masterSfxGain || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSword() {
    if (this.isPageHidden() || this.isBackgroundSuspended) return;
    if (this.areGameplaySfxSuppressed()) return;
    if (!this.canTriggerSfx("sword", 70)) return;
    this.recordSfxHistory("sword", "synth:sword");
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.masterSfxGain || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playShot(weaponIdOrIsMusket = "pistol") {
    if (this.areGameplaySfxSuppressed()) return;
    let weaponId = weaponIdOrIsMusket;
    if (typeof weaponIdOrIsMusket === "boolean") {
      weaponId = weaponIdOrIsMusket ? "musket" : "pistol";
    }
    const srcMap = {
      pistol: AUDIO_FILES.actions.pistol,
      musket: AUDIO_FILES.actions.musket,
      blunderbuss: AUDIO_FILES.actions.blunderbuss
    };
    const src = srcMap[weaponId] || AUDIO_FILES.actions.pistol;
    this.playAudioFile(src, { volume: 0.84, sfxKey: `shot:${weaponId}`, dedupeMs: 70 });
  }

  playHurt() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.liorHurt, { volume: 0.85, sfxKey: "liorHurt", dedupeMs: 90 });
  }

  playHeal() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.heal, { volume: 0.82, sfxKey: "heal", dedupeMs: 80 });
  }

  playEldritchBlast() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.eldritchBlast, { volume: 0.88, sfxKey: "eldritchBlast", dedupeMs: 80 });
  }

  playMisty() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.mistyStep, { volume: 0.82, sfxKey: "mistyStep", dedupeMs: 80 });
  }

  playCoin() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.coinPick, { volume: 0.78, sfxKey: "coinPick", dedupeMs: 55 });
  }

  playPickup() {
    if (this.areGameplaySfxSuppressed()) return;
    this.playAudioFile(AUDIO_FILES.actions.pickup, { volume: 0.78, sfxKey: "pickup", dedupeMs: 65 });
  }

  /**
   * Restablece el registro de rugidos de jefe reproducidos (al iniciar nueva partida) o para un piso concreto.
   */
  resetBossRoarTracking(floorNumber = null) {
    if (floorNumber === null || floorNumber === undefined) {
      this.playedBossRoars.clear();
      return;
    }
    const prefix = `${Math.floor(Number(floorNumber) || 0)}:`;
    for (const key of [...this.playedBossRoars]) {
      if (key.startsWith(prefix)) this.playedBossRoars.delete(key);
    }
  }

  /**
   * Centraliza la decisión de si se permite reproducir un rugido de jefe:
   * - Exclusivamente en los niveles múltiplos de 10 (10, 20, 30, 40, 50, 60, 70, 80, 90 y 100).
   * - Nunca en los niveles intermedios (1–9, 11–19, 21–29, ..., 91–99).
   * - Exclusivamente para la criatura jefe principal del encuentro (isMegaBoss / tamaño 4x4).
   * - Una única vez por aparición legítima del jefe.
   */
  isBossRoarEligible(enemy = null, floorNumber = 1, { ignorePlayed = false } = {}) {
    const floor = Math.floor(Number(floorNumber) || 0);
    if (floor < 10 || floor > 100 || floor % 10 !== 0) {
      return false;
    }
    if (!enemy || !enemy.isMegaBoss || (enemy.size || 0) < 4 || (enemy.hp !== undefined && enemy.hp <= 0)) {
      return false;
    }
    if (!ignorePlayed) {
      if (enemy.roarPlayed) return false;
      const roarId = `${floor}:${enemy.id || enemy.name || "boss"}`;
      if (this.playedBossRoars.has(roarId)) return false;
    }
    return true;
  }

  /**
   * Devuelve el archivo de rugido exacto correspondiente a la criatura jefe del nivel múltiplo de diez,
   * o null si el nivel es intermedio (1–9 de cada ciclo) o la criatura no es un jefe de nivel múltiplo de diez:
   * - Niveles 10, 20, 30 y 40 (Jefes 1–4): Assets/Audio/monster/1-4monster.mp3
   * - Niveles 50, 60, 70, 80 y 90 (Jefes 5–9): Assets/Audio/monster/5-9monster.mp3
   * - Nivel 100 (Dragón Final, Jefe 10): Assets/Audio/monster/Dragon.mp3
   */
  getMonsterRoarSrc(enemy = null, floorNumber = 1) {
    const floor = Math.floor(Number(floorNumber) || 0);
    if (!this.isBossRoarEligible(enemy, floor, { ignorePlayed: true })) {
      return null;
    }
    if (floor === 100 || enemy?.originTier === 10) {
      return AUDIO_FILES.monster.dragon;
    }
    const bossTier = enemy?.originTier || Math.min(10, Math.floor(floor / 10));
    return bossTier <= 4 ? AUDIO_FILES.monster.floors1to4 : AUDIO_FILES.monster.floors5to9;
  }

  /**
   * Reproduce el rugido de la criatura jefe exclusivamente cuando aparece en su nivel múltiplo de diez (10..100).
   */
  playMonsterRoar(enemy = null, floorNumber = 1) {
    if (this.areGameplaySfxSuppressed() || this.isGameOverActive) return null;
    const floor = Math.floor(Number(floorNumber) || 0);
    if (!this.isBossRoarEligible(enemy, floor, { ignorePlayed: false })) {
      return null;
    }
    const src = this.getMonsterRoarSrc(enemy, floor);
    if (!src) return null;

    enemy.roarPlayed = true;
    const roarId = `${floor}:${enemy.id || enemy.name || "boss"}`;
    this.playedBossRoars.add(roarId);
    this.duckMusicTemporarily(0.34, 1150);

    return this.playAudioFile(src, {
      volume: 0.94,
      sfxKey: `roar:${floor}:${src}`,
      dedupeMs: 500
    });
  }

  /**
   * Secuencia de muerte y Game Over:
   * 1. Detiene la música actual.
   * 2. Reproduce inmediatamente Assets/Audio/game-over-efect.mp3.
   * 3. Al terminar el efecto, si la pantalla de Game Over continúa activa, inicia
   *    Assets/Audio/game-over-song.wav en bucle continuo.
   */
  playDeath() {
    if (this.isGameOverActive) return;
    this.stopMusic();
    this.stopGameOverAudio();
    this.isGameOverActive = true;

    const startLoopingGameOverSong = () => {
      if (!this.isGameOverActive) return;
      if (this.gameOverFallbackTimer !== null) {
        clearTimeout(this.gameOverFallbackTimer);
        this.gameOverFallbackTimer = null;
      }
      if (this.gameOverSongAudio) return;
      this.gameOverSongAudio = this.playAudioFile(AUDIO_FILES.gameOverSong, {
        volume: this.musicMuted ? 0 : 0.76,
        loop: true,
        sfxKey: "gameOverSong",
        dedupeMs: 0,
        forceHtmlAudio: true
      });
    };

    this.gameOverEffectAudio = this.playAudioFile(AUDIO_FILES.gameOverEffect, {
      volume: 0.90,
      loop: false,
      sfxKey: "gameOverEffect",
      dedupeMs: 0,
      forceHtmlAudio: true,
      onEnded: startLoopingGameOverSong
    });
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
const TILE_BLUE_CHEST = 5;

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

const LIOR_ACTION_ATLASES = {
  "pistol": {
    "folder": "Pistol",
    "frames": 4
  },
  "musket": {
    "folder": "Musket",
    "frames": 4
  },
  "blunderbuss": {
    "folder": "Blunderbuss",
    "frames": 4
  },
  "ELDRITCH_BLAST": {
    "folder": "EldritchBlast",
    "frames": 4
  },
  "MISTY_STEP": {
    "folder": "MistyStep",
    "frames": 4
  }
};
const ENEMY_DIRECTIONAL_ATLASES = {
  "Assets/Enemy/1x1/1. kobold.jpg": "Assets/Enemy/Directional/kobold.png",
  "Assets/Enemy/1x1/2. Goblin.jpg": "Assets/Enemy/Directional/goblin.png",
  "Assets/Enemy/1x1/3.Skelleton.jpg": "Assets/Enemy/Directional/esqueleto.png",
  "Assets/Enemy/1x1/4. Zombie.jpg": "Assets/Enemy/Directional/zombi.png",
  "Assets/Enemy/1x1/5. orc.jpg": "Assets/Enemy/Directional/orco.png",
  "Assets/Enemy/1x1/6. Gnoll.jpg": "Assets/Enemy/Directional/gnoll.png",
  "Assets/Enemy/1x1/7. hobgoblin.jpg": "Assets/Enemy/Directional/hobgoblin.png",
  "Assets/Enemy/1x1/8. lizardfolk.jpg": "Assets/Enemy/Directional/hombre-lagarto.png",
  "Assets/Enemy/1x1/9. imp.jpg": "Assets/Enemy/Directional/diablillo.png",
  "Assets/Enemy/1x1/10. bugbear.jpg": "Assets/Enemy/Directional/osgo.png",
  "Assets/Enemy/2x2/1. ogre.png": "Assets/Enemy/Directional/ogro.png",
  "Assets/Enemy/2x2/2. troll.jpg": "Assets/Enemy/Directional/trol.png",
  "Assets/Enemy/2x2/3. minotaur.jpg": "Assets/Enemy/Directional/minotauro.png",
  "Assets/Enemy/2x2/4. owlbear.jpg": "Assets/Enemy/Directional/osobuho.png",
  "Assets/Enemy/2x2/5. manticore.jpg": "Assets/Enemy/Directional/manticora.png",
  "Assets/Enemy/2x2/6. basilisk.jpg": "Assets/Enemy/Directional/basilisco.png",
  "Assets/Enemy/2x2/7. chimera.jpg": "Assets/Enemy/Directional/quimera.png",
  "Assets/Enemy/2x2/8. bulette.jpg": "Assets/Enemy/Directional/bulette.png",
  "Assets/Enemy/2x2/9. hillGiant.jpg": "Assets/Enemy/Directional/gigante-de-las-colinas.png",
  "Assets/Enemy/2x2/10. youngDragon.jpg": "Assets/Enemy/Directional/dragon-joven.png",
  "Assets/Enemy/4x4/1. roc.jpg": "Assets/Enemy/Directional/roc.png",
  "Assets/Enemy/4x4/3. ironGolem.jpg": "Assets/Enemy/Directional/golem-de-hierro.png",
  "Assets/Enemy/4x4/4. kraken.jpg": "Assets/Enemy/Directional/kraken.png",
  "Assets/Enemy/4x4/5. stormGigant.jpg": "Assets/Enemy/Directional/gigante-de-tormenta.png",
  "Assets/Enemy/4x4/6. beholder.jpg": "Assets/Enemy/Directional/beholder.png",
  "Assets/Enemy/4x4/7. purpleworm.jpg": "Assets/Enemy/Directional/gusano-purpura.png",
  "Assets/Enemy/4x4/8. Balor.jpg": "Assets/Enemy/Directional/balor.png",
  "Assets/Enemy/4x4/9. AncientRedDragon.jpg": "Assets/Enemy/Directional/dragon-rojo-ancestral.png",
  "Assets/Enemy/4x4/10. solarDragon.jpg": "Assets/Enemy/Directional/dragon-solar.png",
  "Assets/Enemy/4x4/2. tarrasque.jpg": "Assets/Enemy/Directional/caudillo-ogro.png"
};
const OGRE_WARLORD_ATLAS = "Assets/Enemy/Directional/caudillo-ogro.png";

Object.assign(LIOR_ACTION_ATLASES, {
  "SWORD_SPIN": {
    "folder": "Sword",
    "frames": 8
  },
  "HURT": {
    "folder": "Hurt",
    "frames": 4
  },
  "DEFEAT": {
    "folder": "Death",
    "frames": 4
  },
  "INTERACT": {
    "folder": "Interact",
    "frames": 4
  }
});
Object.assign(EFFECT_SHEETS, {
  "pistol": {
    "src": "Assets/Effects/Renewed/pistol.png",
    "cols": 4,
    "alpha": true,
    "trim": true
  },
  "musket": {
    "src": "Assets/Effects/Renewed/musket.png",
    "cols": 4,
    "alpha": true,
    "trim": true
  },
  "blunderbuss": {
    "src": "Assets/Effects/Renewed/blunderbuss.png",
    "cols": 4,
    "alpha": true,
    "trim": true
  },
  "eblast": {
    "src": "Assets/Effects/Renewed/eblast.png",
    "cols": 3,
    "alpha": true,
    "trim": true
  },
  "arrow": {
    "src": "Assets/Effects/Renewed/arrow.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "sling": {
    "src": "Assets/Effects/Renewed/sling.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "javelin": {
    "src": "Assets/Effects/Renewed/javelin.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "spine": {
    "src": "Assets/Effects/Renewed/spine.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "axe": {
    "src": "Assets/Effects/Renewed/axe.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "club": {
    "src": "Assets/Effects/Renewed/club.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "claw": {
    "src": "Assets/Effects/Renewed/claw.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "bite": {
    "src": "Assets/Effects/Renewed/bite.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "toxin": {
    "src": "Assets/Effects/Renewed/toxin.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "flame": {
    "src": "Assets/Effects/Renewed/flame.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "lightning": {
    "src": "Assets/Effects/Renewed/lightning.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "stone": {
    "src": "Assets/Effects/Renewed/stone.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "whip": {
    "src": "Assets/Effects/Renewed/whip.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "antimagic": {
    "src": "Assets/Effects/Renewed/antimagic.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "radiant": {
    "src": "Assets/Effects/Renewed/radiant.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "tentacle": {
    "src": "Assets/Effects/Renewed/tentacle.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "heal": {
    "src": "Assets/Effects/Renewed/heal.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "shield": {
    "src": "Assets/Effects/Renewed/shield.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "shieldbreak": {
    "src": "Assets/Effects/Renewed/shieldbreak.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "critical": {
    "src": "Assets/Effects/Renewed/critical.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "coin": {
    "src": "Assets/Effects/Renewed/coin.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "loot": {
    "src": "Assets/Effects/Renewed/loot.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "bluechest": {
    "src": "Assets/Effects/Renewed/bluechest.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "portal": {
    "src": "Assets/Effects/Renewed/portal.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "poison": {
    "src": "Assets/Effects/Renewed/poison.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "burn": {
    "src": "Assets/Effects/Renewed/burn.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "bleed": {
    "src": "Assets/Effects/Renewed/bleed.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "stun": {
    "src": "Assets/Effects/Renewed/stun.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "bind": {
    "src": "Assets/Effects/Renewed/bind.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "slow": {
    "src": "Assets/Effects/Renewed/slow.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "curse": {
    "src": "Assets/Effects/Renewed/curse.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "blind": {
    "src": "Assets/Effects/Renewed/blind.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "swordhit": {
    "src": "Assets/Effects/Renewed/swordhit.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "swordcrit": {
    "src": "Assets/Effects/Renewed/swordcrit.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "bladeglint": {
    "src": "Assets/Effects/Renewed/bladeglint.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "mistdeparture": {
    "src": "Assets/Effects/Renewed/mistdeparture.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "mistarrival": {
    "src": "Assets/Effects/Renewed/mistarrival.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "panic": {
    "src": "Assets/Effects/Renewed/panic.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "alert": {
    "src": "Assets/Effects/Renewed/alert.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "danger": {
    "src": "Assets/Effects/Renewed/danger.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "line": {
    "src": "Assets/Effects/Renewed/line.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "cone": {
    "src": "Assets/Effects/Renewed/cone.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "circle": {
    "src": "Assets/Effects/Renewed/circle.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "rectangle": {
    "src": "Assets/Effects/Renewed/rectangle.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "push": {
    "src": "Assets/Effects/Renewed/push.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "wall": {
    "src": "Assets/Effects/Renewed/wall.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "summon": {
    "src": "Assets/Effects/Renewed/summon.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "cooldown": {
    "src": "Assets/Effects/Renewed/cooldown.png",
    "cols": 1,
    "alpha": true,
    "trim": true
  },
  "status-poison-apply": {
    "src": "Assets/Effects/Status/status-poison-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-poison-persist": {
    "src": "Assets/Effects/Status/status-poison-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-poison-clear": {
    "src": "Assets/Effects/Status/status-poison-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-burn-apply": {
    "src": "Assets/Effects/Status/status-burn-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-burn-persist": {
    "src": "Assets/Effects/Status/status-burn-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-burn-clear": {
    "src": "Assets/Effects/Status/status-burn-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-bleeding-apply": {
    "src": "Assets/Effects/Status/status-bleeding-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-bleeding-persist": {
    "src": "Assets/Effects/Status/status-bleeding-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-bleeding-clear": {
    "src": "Assets/Effects/Status/status-bleeding-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-stun-apply": {
    "src": "Assets/Effects/Status/status-stun-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-stun-persist": {
    "src": "Assets/Effects/Status/status-stun-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-stun-clear": {
    "src": "Assets/Effects/Status/status-stun-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-immobilization-apply": {
    "src": "Assets/Effects/Status/status-immobilization-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-immobilization-persist": {
    "src": "Assets/Effects/Status/status-immobilization-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-immobilization-clear": {
    "src": "Assets/Effects/Status/status-immobilization-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-slow-apply": {
    "src": "Assets/Effects/Status/status-slow-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-slow-persist": {
    "src": "Assets/Effects/Status/status-slow-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-slow-clear": {
    "src": "Assets/Effects/Status/status-slow-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-blindness-apply": {
    "src": "Assets/Effects/Status/status-blindness-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-blindness-persist": {
    "src": "Assets/Effects/Status/status-blindness-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-blindness-clear": {
    "src": "Assets/Effects/Status/status-blindness-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-curse-apply": {
    "src": "Assets/Effects/Status/status-curse-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-curse-persist": {
    "src": "Assets/Effects/Status/status-curse-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-curse-clear": {
    "src": "Assets/Effects/Status/status-curse-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-vulnerability-apply": {
    "src": "Assets/Effects/Status/status-vulnerability-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-vulnerability-persist": {
    "src": "Assets/Effects/Status/status-vulnerability-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-vulnerability-clear": {
    "src": "Assets/Effects/Status/status-vulnerability-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-grasp-apply": {
    "src": "Assets/Effects/Status/status-grasp-apply.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-grasp-persist": {
    "src": "Assets/Effects/Status/status-grasp-persist.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  },
  "status-grasp-clear": {
    "src": "Assets/Effects/Status/status-grasp-clear.png",
    "cols": 4,
    "alpha": true,
    "trim": false
  }
});
const ENEMY_ACTION_ATLASES = {
  "kobold": {
    "src": "Assets/Enemy/Actions/kobold.png",
    "category": "minion"
  },
  "goblin": {
    "src": "Assets/Enemy/Actions/goblin.png",
    "category": "minion"
  },
  "esqueleto": {
    "src": "Assets/Enemy/Actions/esqueleto.png",
    "category": "minion"
  },
  "zombi": {
    "src": "Assets/Enemy/Actions/zombi.png",
    "category": "minion"
  },
  "orco": {
    "src": "Assets/Enemy/Actions/orco.png",
    "category": "minion"
  },
  "gnoll": {
    "src": "Assets/Enemy/Actions/gnoll.png",
    "category": "minion"
  },
  "hobgoblin": {
    "src": "Assets/Enemy/Actions/hobgoblin.png",
    "category": "minion"
  },
  "hombre-lagarto": {
    "src": "Assets/Enemy/Actions/hombre-lagarto.png",
    "category": "minion"
  },
  "diablillo": {
    "src": "Assets/Enemy/Actions/diablillo.png",
    "category": "minion"
  },
  "osgo": {
    "src": "Assets/Enemy/Actions/osgo.png",
    "category": "minion"
  },
  "ogro": {
    "src": "Assets/Enemy/Actions/ogro.png",
    "category": "miniBoss"
  },
  "trol": {
    "src": "Assets/Enemy/Actions/trol.png",
    "category": "miniBoss"
  },
  "minotauro": {
    "src": "Assets/Enemy/Actions/minotauro.png",
    "category": "miniBoss"
  },
  "osobuho": {
    "src": "Assets/Enemy/Actions/osobuho.png",
    "category": "miniBoss"
  },
  "manticora": {
    "src": "Assets/Enemy/Actions/manticora.png",
    "category": "miniBoss"
  },
  "basilisco": {
    "src": "Assets/Enemy/Actions/basilisco.png",
    "category": "miniBoss"
  },
  "quimera": {
    "src": "Assets/Enemy/Actions/quimera.png",
    "category": "miniBoss"
  },
  "bulette": {
    "src": "Assets/Enemy/Actions/bulette.png",
    "category": "miniBoss"
  },
  "gigante-de-las-colinas": {
    "src": "Assets/Enemy/Actions/gigante-de-las-colinas.png",
    "category": "miniBoss"
  },
  "caudillo-ogro": {
    "src": "Assets/Enemy/Actions/caudillo-ogro.png",
    "category": "phase2"
  },
  "golem-de-hierro": {
    "src": "Assets/Enemy/Actions/golem-de-hierro.png",
    "category": "phase2"
  },
  "roc": {
    "src": "Assets/Enemy/Actions/roc.png",
    "category": "phase2"
  },
  "gigante-de-tormenta": {
    "src": "Assets/Enemy/Actions/gigante-de-tormenta.png",
    "category": "phase2"
  },
  "kraken": {
    "src": "Assets/Enemy/Actions/kraken.png",
    "category": "phase2"
  },
  "beholder": {
    "src": "Assets/Enemy/Actions/beholder.png",
    "category": "phase2"
  },
  "gusano-purpura": {
    "src": "Assets/Enemy/Actions/gusano-purpura.png",
    "category": "phase2"
  },
  "balor": {
    "src": "Assets/Enemy/Actions/balor.png",
    "category": "phase2"
  },
  "dragon-rojo-ancestral": {
    "src": "Assets/Enemy/Actions/dragon-rojo-ancestral.png",
    "category": "phase2"
  },
  "dragon-joven": {
    "src": "Assets/Enemy/Actions/dragon-joven.png",
    "category": "miniBoss"
  },
  "dragon-solar": {
    "src": "Assets/Enemy/Actions/dragon-solar.png",
    "category": "phase2"
  }
};
const ENEMY_PROJECTILE_ART = {
  "kobold": "sling",
  "goblin": "arrow",
  "orco": "javelin",
  "gnoll": "arrow",
  "hobgoblin": "arrow",
  "hombre-lagarto": "javelin",
  "diablillo": "flame",
  "osgo": "javelin",
  "ogro": "club",
  "trol": "club",
  "minotauro": "axe",
  "osobuho": "claw",
  "manticora": "spine",
  "basilisco": "stone",
  "quimera": "flame",
  "bulette": "stone",
  "gigante-de-las-colinas": "club",
  "dragon-joven": "flame",
  "caudillo-ogro": "club",
  "golem-de-hierro": "stone",
  "roc": "lightning",
  "gigante-de-tormenta": "lightning",
  "kraken": "tentacle",
  "beholder": "antimagic",
  "gusano-purpura": "bite",
  "balor": "whip",
  "dragon-rojo-ancestral": "flame",
  "dragon-solar": "radiant"
};
const ENEMY_MELEE_ART = {
  "kobold": "claw",
  "goblin": "axe",
  "esqueleto": "axe",
  "zombi": "bite",
  "orco": "axe",
  "gnoll": "axe",
  "hobgoblin": "axe",
  "hombre-lagarto": "claw",
  "diablillo": "claw",
  "osgo": "club"
};

const ENEMY_EQUIPPED = {
  "goblin": {
    "ranged": "Assets/Enemy/Equipped/goblin-ranged.png",
    "melee": "Assets/Enemy/Equipped/goblin-melee.png"
  },
  "hobgoblin": {
    "ranged": "Assets/Enemy/Equipped/hobgoblin-ranged.png",
    "melee": "Assets/Enemy/Equipped/hobgoblin-melee.png"
  },
  "gnoll": {
    "melee": "Assets/Enemy/Equipped/gnoll-melee.png",
    "ranged": "Assets/Enemy/Equipped/gnoll-ranged.png"
  },
  "kobold": {
    "ranged": "Assets/Enemy/Equipped/kobold-ranged.png",
    "melee": "Assets/Enemy/Equipped/kobold-melee.png"
  },
  "orco": {
    "melee": "Assets/Enemy/Equipped/orco-melee.png",
    "ranged": "Assets/Enemy/Equipped/orco-ranged.png"
  },
  "osgo": {
    "melee": "Assets/Enemy/Equipped/osgo-melee.png",
    "ranged": "Assets/Enemy/Equipped/osgo-ranged.png"
  },
  "hombre-lagarto": {
    "melee": "Assets/Enemy/Equipped/hombre-lagarto-melee.png",
    "ranged": "Assets/Enemy/Equipped/hombre-lagarto-ranged.png"
  },
  "diablillo": {
    "ranged": "Assets/Enemy/Equipped/diablillo-ranged.png"
  }
};

const ENEMY_WALK_RENEWED = {
  "caudillo-ogro": "Assets/Enemy/Walk/caudillo-ogro.png",
  "goblin": "Assets/Enemy/Walk/goblin.png",
  "kobold": "Assets/Enemy/Walk/kobold.png"
};

LIOR_ACTION_ATLASES.PET_IDLE = { folder: "PetIdle", frames: 4 };

const LIOR_MOTION = {
  "WALK": {
    "folder": "WalkMotion",
    "frames": 7,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "PET_IDLE": {
    "folder": "PetIdleMotion",
    "frames": 8,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "pistol": {
    "folder": "PistolMotion",
    "frames": 6,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "musket": {
    "folder": "MusketMotion",
    "frames": 6,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "ELDRITCH_BLAST": {
    "folder": "EldritchMotion",
    "frames": 8,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "MISTY_STEP": {
    "folder": "MistyMotion",
    "frames": 8,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  },
  "blunderbuss": {
    "folder": "BlunderbussMotion",
    "frames": 6,
    "directions": [
      "south",
      "east",
      "north",
      "west"
    ]
  }
};
const ENEMY_MOTION = {
  "goblin": {
    "ranged": "Assets/Enemy/Motion/goblin-ranged.png",
    "melee": "Assets/Enemy/Motion/goblin-melee.png"
  },
  "hobgoblin": {
    "ranged": "Assets/Enemy/Motion/hobgoblin-ranged.png",
    "melee": "Assets/Enemy/Motion/hobgoblin-melee.png"
  },
  "gnoll": {
    "ranged": "Assets/Enemy/Motion/gnoll-ranged.png",
    "melee": "Assets/Enemy/Motion/gnoll-melee.png"
  },
  "orco": {
    "ranged": "Assets/Enemy/Motion/orco-ranged.png",
    "melee": "Assets/Enemy/Motion/orco-melee.png"
  },
  "kobold": {
    "ranged": "Assets/Enemy/Motion/kobold-ranged.png",
    "melee": "Assets/Enemy/Motion/kobold-melee.png"
  },
  "caudillo-ogro": {
    "boss": "Assets/Enemy/Motion/caudillo-ogro-boss.png"
  },
  "osgo": {
    "ranged": "Assets/Enemy/Motion/osgo-ranged.png",
    "melee": "Assets/Enemy/Motion/osgo-melee.png"
  },
  "hombre-lagarto": {
    "ranged": "Assets/Enemy/Motion/hombre-lagarto-ranged.png",
    "melee": "Assets/Enemy/Motion/hombre-lagarto-melee.png"
  },
  "diablillo": {
    "ranged": "Assets/Enemy/Motion/diablillo-ranged.png"
  },
  "esqueleto": {
    "melee": "Assets/Enemy/Motion/esqueleto-melee.png"
  },
  "zombi": {
    "melee": "Assets/Enemy/Motion/zombi-melee.png"
  }
};
const ENEMY_WALK_MOTION = {
  "goblin": {
    "ranged": "Assets/Enemy/Motion/goblin-ranged-walk.png"
  },
  "caudillo-ogro": {
    "boss": "Assets/Enemy/Motion/caudillo-ogro-boss-walk.png"
  }
};

const ENEMY_ROSTER = {
  minion: [
    { name: "Kobold", src: "Assets/Enemy/1x1/1. kobold.jpg", tier: 1, category: "minion" },
    { name: "Goblin", src: "Assets/Enemy/1x1/2. Goblin.jpg", tier: 2, category: "minion" },
    { name: "Esqueleto", src: "Assets/Enemy/1x1/3.Skelleton.jpg", ranged: false, tier: 3, category: "minion" },
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
    { name: "Caudillo ogro", src: "Assets/Enemy/4x4/2. tarrasque.jpg", tier: 2, category: "megaBoss" },
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

const PLAYER_STEP_MS = 240;
const ENEMY_STEP_MS = 210;
const ENEMY_LEGACY_STEP_MS = 165;
const MISTY_FRAME_MS = 135;
const ENEMY_ANIM_MS = { idle: 160, move: 115, taunt: 135, attack: 130, hurt: 95, death: 125 };

const PROJECTILE_SHEET = {
  src: "Assets/Enemy/disparos.jpg",
  rows: { small: 0, medium: 1, large: 2 },
  sizes: { small: 0.9, medium: 1.3, large: 2.2 },
  panels: {
    small: [
      { x: 263,  y: 108, w: 162, h: 163 },
      { x: 1272, y: 160, w: 242, h: 152 },
      { x: 2258, y: 108, w: 232, h: 230 }
    ],
    medium: [
      { x: 181,  y: 498, w: 292, h: 358 },
      { x: 1145, y: 550, w: 416, h: 244 },
      { x: 2177, y: 484, w: 405, h: 372 }
    ],
    large: [
      { x: 112,  y: 998, w: 464, h: 469 },
      { x: 1007, y: 954, w: 715, h: 532 },
      { x: 2108, y: 944, w: 578, h: 542 }
    ]
  }
};
const PROJECTILE_LAUNCH_DELAY_MS = 2 * ENEMY_ANIM_MS.attack;
const PROJECTILE_IMPACT_MS = 180;

const BUNNY_SPRITES = {
  bunnyIdle: { x: 78, y: 84, w: 132, h: 214 },
  bunnyIdleFrames: [
    { x: 77,  y: 84,  w: 132, h: 212 },
    { x: 349, y: 84,  w: 147, h: 212 },
    { x: 589, y: 96,  w: 212, h: 201 },
    { x: 876, y: 101, w: 206, h: 196 }
  ],
  bunnyFlee: [
    { x: 1678, y: 946, w: 276, h: 216 },
    { x: 2003, y: 946, w: 382, h: 220 },
    { x: 2554, y: 946, w: 226, h: 220 }
  ]
};

const MERCHANT_SPRITES = [
  { x: 13, y: 10, w: 35, h: 45 },
  { x: 61, y: 10, w: 35, h: 45 }
];

const CHEST_SPRITES = [0, 16, 32, 48, 64].map(x => ({ x, y: 0, w: 16, h: 16 }));
const BLUE_CHEST_SPRITES = [0, 16, 32, 48, 64].map(x => ({ x, y: 48, w: 16, h: 16 }));
const PICKUP_SPRITES = {
  potion: [{ x: 0, y: 0, w: 16, h: 16 }],
  shieldPotion: [
    { x: 48, y: 16, w: 16, h: 16 },
    { x: 64, y: 16, w: 16, h: 16 },
    { x: 80, y: 16, w: 16, h: 16 },
    { x: 96, y: 16, w: 16, h: 16 },
    { x: 112, y: 16, w: 16, h: 16 }
  ],
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
  pistol: [[1, 6], [2, 6], [2, 6], [2, 6]],
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
  // 20 HP en el piso 1, 200 HP en el piso 100.
  // Progresión gradual, entre 1 y 2 HP por piso (sin saltos de 20 HP).
  const f = Math.max(1, Math.min(100, Math.floor(Number(floor) || 1)));
  return 20 + Math.round((f - 1) * 180 / 99);
}

function calculateLiorAC(floor) {
  const tier = getTierForFloor(floor);
  return 12 + Math.floor((tier - 1) / 2);
}

const MAX_SHIELD_SEGMENTS = 10;
const SHORTCUT_MAP_PRICE = 10;
const SHOP_VIEWS = ["supplies", "upgrades", "shortcuts"];

function shortcutDestination(floor) {
  const nextBoss = Math.min(100, (Math.floor(floor / 10) + 1) * 10);
  return Math.min(floor + 4, nextBoss);
}

function shortcutGoldReward(floor) {
  const skipped = Math.max(0, shortcutDestination(floor) - floor - 1);
  let expectedGold = 0;
  for (let offset = 1; offset <= skipped; offset++) {
    const tier = getTierForFloor(floor + offset);
    const minEnemies = Math.floor(10 * 11 / 20);
    const averageMinionGold = 1.5 + Math.floor((tier - 1) / 4);
    expectedGold += minEnemies * 0.30 * averageMinionGold;
  }
  return Math.floor(expectedGold);
}

const SAVE_STORAGE_KEY = "lior_dungeon_save_redesign_v2";
const SHIELD_POTION_SEGMENTS = 1;

const ENEMY_FLEE_DURATION_TURNS = 3;
const ENEMY_ALLY_DETECTION_RADIUS = 3;
const MINION_VISION_RANGE = 2;
const MINION_PATROL_RADIUS = 3;

const STUN_STATUS_BADGE_STYLE = {
  effect: "status-stun-persist",
  tag: "ATURDIDO",
  borderColor: "#fde047",
  bgColor: "rgba(20, 14, 4, 0.92)",
  textColor: "#fef08a"
};

function calculateBlessedAmmoPrice(floor = 1) {
  const tier = getTierForFloor(floor);
  return 8 + tier;
}
const CHEST_REWARD_PROBABILITIES = {
  potion: 0.40,
  shield: 0.10,
  weaponOrAmmo: 0.50
};

/**
 * Precio del siguiente segmento de escudo según la cantidad real de segmentos que Lior ya tenga:
 * Escalado suave por pares de segmentos: 1 + Math.floor(segmentosActuales / 2)
 * (Segmentos 1-2: 1 PO, 3-4: 2 PO, 5-6: 3 PO, 7-8: 4 PO, 9-10: 5 PO; total 0->10 = 30 PO).
 */
function calculateNextShieldSegmentPrice(currentSegments = 0) {
  const current = Math.floor(Number(currentSegments) || 0);
  if (!Number.isInteger(current) || current < 0 || current >= MAX_SHIELD_SEGMENTS) return Infinity;
  return 1 + Math.floor(current / 2);
}

/**
 * Precio progresivo de comprar `segmentCount` segmentos en la tienda a partir de `currentSegments`.
 */
function calculateShieldPurchaseCost(segmentCount, currentSegments = 0) {
  const count = Math.floor(Number(segmentCount));
  const current = Math.floor(Number(currentSegments) || 0);
  if (!Number.isInteger(count) || count < 1) return Infinity;
  if (!Number.isInteger(current) || current < 0 || current >= MAX_SHIELD_SEGMENTS) return Infinity;
  if (current + count > MAX_SHIELD_SEGMENTS) return Infinity;
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += calculateNextShieldSegmentPrice(current + i);
  }
  return total;
}

function restoreShieldSegments(player, segments = SHIELD_POTION_SEGMENTS) {
  if (!player) return { segmentsRestored: 0, currentSegments: 0, maxSegments: MAX_SHIELD_SEGMENTS };
  player.maxShieldSegments = MAX_SHIELD_SEGMENTS;
  const current = Math.max(0, Math.min(player.maxShieldSegments, Math.floor(player.shieldSegments || 0)));
  const incoming = Math.max(0, Math.floor(Number(segments) || 0));
  const segmentsRestored = Math.min(player.maxShieldSegments - current, incoming);
  player.shieldSegments = current + segmentsRestored;
  return {
    segmentsRestored,
    currentSegments: player.shieldSegments,
    maxSegments: player.maxShieldSegments
  };
}

/**
 * Compatibilidad entre extraHp y el nuevo sistema de escudo por segmentos:
 * Se limita maxExtraHp a 0 para evitar acumular +50% de sobrecuración encima de los 10 segmentos
 * de mitigación al 50%, reutilizando la barra secundaria del HUD (#hud-extra-fill) para los 10 segmentos.
 */
function calculateMaxExtraHP(maxHP) {
  return 0;
}

function restoreHealth(player, healing) {
  let remaining = Math.max(0, Math.floor(healing));
  if (player.cursedHealing) {
    remaining = Math.max(1, Math.floor(remaining / 2));
    player.cursedHealing = false;
  }
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
  return Math.max(1, Math.ceil(target / 4));
}

function calculatePotionPrice(floor) {
  // Una poción cuesta 2 PO en los pisos 1-10; aumenta 1 PO por bloque.
  // La curación sigue escalando con la vida máxima del personaje.
  return 2 + (getTierForFloor(floor) - 1);
}

function rollPotionHealing(floor) {
  const maxHp = calculateLiorMaxHP(floor);
  return Math.max(1, Math.round(maxHp * 0.25));
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
  // Del Tier 1 al Tier 5 (pisos 1 al 50) se mantiene en 22 de daño fijo;
  // a partir del Tier 6 (pisos 51 al 100) mejora a 44 de daño fijo.
  return getTierForFloor(floor) >= 6 ? 44 : 22;
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
  return 6 + Math.floor((Math.max(1, tier) - 1) / 2);
}

function createMinion(floor, x, y, visionRange = MINION_VISION_RANGE, isSummoned = false) {
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
    attackCadence: 1,
    attackCooldown: 0,
    lastAttackTurn: null,
    ranged: entry.name === "Diablillo" || (!["Esqueleto", "Zombi"].includes(entry.name) && Math.random() < 0.4),
    isMegaBoss: false,
    isBoss: false,
    isSummoned: !!isSummoned,
    size: 1,
    cells: [{ x, y }],
    state: "patrol",
    patrolDir: 1,
    patrolDirY: 1,
    patrolRadius: MINION_PATROL_RADIUS,
    fearCooldown: 0,
    stunned: false,
    facingLeft: false,
    flipX: false,
    facing: "right",
    lastRelativeX: 0,
    lastMoveDx: 0
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

class RunStats {
  constructor() {
    this.reset();
  }

  reset() {
    this.floorsCleared = 0;
    this.totalSteps = 0;
    this.goldCollected = 0;
    this.finalGold = 0;

    this.killsTotal = 0;
    this.killsMinions = 0;
    this.killsMiniBosses = 0;
    this.killsMegaBosses = 0;
    this.solarDragonDefeated = false;
    this.killsByName = {};

    this.swordSwings = 0;
    this.swordHits = 0;
    this.pistolShots = 0;
    this.pistolHits = 0;
    this.musketShots = 0;
    this.musketHits = 0;
    this.blunderbussShots = 0;
    this.blunderbussHits = 0;
    this.eldritchBlastCasts = 0;
    this.eldritchBlastHits = 0;
    this.mistyStepUses = 0;

    this.potionsDrunk = 0;
    this.bluePotionsDrunk = 0;
    this.totalHealing = 0;
    this.shieldSegmentsPurchased = 0;
    this.shieldSegmentsRestored = 0;
    this.shieldSegmentsConsumed = 0;
    this.shieldDamageMitigated = 0;
    this.damageTakenInstances = 0;
    this.totalDamageTaken = 0;
  }
}

class Dungeon {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.revealed = new Set();
    this.mapRevision = 0;
    this.enemies = [];
    this.npcs = [];
    this.chests = new Set();
    this.pickups = [];
    this.isMerchantRoom = false;
    this.isBossRoom = false;
    this.turnCount = 0;
    this.lastProcessedPlayerAction = -1;
    this.lastDisplacementTurn = -1;
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
    if (!this.isInsideBounds(x, y)) return;
    const key = this.getKey(x, y);
    if (this.tiles.get(key) === type) return;
    this.tiles.set(key, type);
    this.mapRevision++;
  }

  markRevealed(x, y) {
    const key = this.getKey(x, y);
    if (this.revealed.has(key)) return;
    this.revealed.add(key);
    this.mapRevision++;
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
    this.maxShieldSegments = MAX_SHIELD_SEGMENTS;
    this.shieldSegments = 0;
    this.stunned = false;
    this.gold = 0;
    this.hasShortcutMap = false;
    this.kills = 0;
    this.minionKillsSincePotion = 0;

    this.ammoPistol = 0;
    this.ammoMusket = 0;
    this.ammoBlunderbuss = 0;
    this.unlockedWeapons = new Set([WEAPONS.SWORD.id]);
    this.equippedWeapon = WEAPONS.SWORD;
    this.weaponUpgrades = { sword: 0, pistol: 0, musket: 0, blunderbuss: 0 };
    this.highestMegaBossTierDefeated = 0;

    this.mistyStepMaxCharges = 2;
    this.mistyStepCharges = 2;
    this.mistyStepRechargeMax = 20;
    this.mistyStepActionCounter = 0;
    this.blastMaxCharges = 10;
    this.blastCurrentCharges = 10;
    this.blessedAmmoCharges = 0;
    this.antimagicCritLock = false;
    this.hasRetrievedQuestItem = false;
    this.actionTurnCount = 0;
    this.moveInterp = null;
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

  advanceAction(options = {}) {
    this.actionTurnCount = (this.actionTurnCount || 0) + 1;
    if (!options?.skipBlastCharge && this.blastCurrentCharges < this.blastMaxCharges) {
      this.blastCurrentCharges++;
    }
    const maxMisty = this.mistyStepMaxCharges || 2;
    const rechargeCadence = this.mistyStepRechargeMax || 20;
    if (this.mistyStepCharges < maxMisty) {
      this.mistyStepActionCounter = (this.mistyStepActionCounter || 0) + 1;
      if (this.mistyStepActionCounter >= rechargeCadence) {
        this.mistyStepCharges = Math.min(maxMisty, this.mistyStepCharges + 1);
        this.mistyStepActionCounter = 0;
      }
    } else {
      this.mistyStepActionCounter = 0;
    }
    return this.actionTurnCount;
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
      attackRange: 4,
      attackCadence: 4,
      attackCooldown: 0,
      lastAttackTurn: null,
      bossAttackReady: true,
      solarPhase2Triggered: false,
      phaseTwoTriggered: false,
      isMegaBoss: true,
      isBoss: true,
      size: 4,
      cells: bossCells,
      state: "patrol",
      fearCooldown: 0,
      stunned: false,
      facingLeft: false,
      flipX: false,
      facing: "right",
      lastRelativeX: 0,
      lastMoveDx: 0
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
            visionRange: (entry.tier === 5 || entry.tier === 10) ? 4 : 3,
            attackRange: 2,
            attackCadence: 2,
            attackCooldown: 0,
            lastAttackTurn: null,
            movedLastTurn: false,
            isMegaBoss: false,
            isBoss: true,
            size: 2,
            cells: candidateCells,
            state: "patrol",
            fearCooldown: 0,
            stunned: false,
            facingLeft: false,
            flipX: false,
            facing: "right",
            lastRelativeX: 0,
            lastMoveDx: 0
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

