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
    enemyHit: (name, total, ac, dmg, mitigated = 0, remSeg = 0) =>
      mitigated > 0
        ? `[${name}] IMPACTA [${total} vs CA ${ac}] -${dmg} HP (🛡 absorbió ${mitigated}, quedan ${remSeg}/10 seg.).`
        : `[${name}] IMPACTA [${total} vs CA ${ac}] -${dmg} de daño.`,
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
      hudBtn.title = this.musicMuted ? "Activar música (B)" : "Silenciar música (B)";
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
const PROJECTILE_LAUNCH_DELAY_MS = 220;
const PROJECTILE_IMPACT_MS = 180;

const BUNNY_SPRITES = {
  bunnyIdle: { x: 78, y: 84, w: 132, h: 214 },
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

const MAX_SHIELD_SEGMENTS = 10;
const SAVE_STORAGE_KEY = "lior_dungeon_save_v1";
const SHIELD_POTION_SEGMENTS = 1;
const CHEST_REWARD_PROBABILITIES = {
  potion: 0.40,
  shield: 0.10,
  weaponOrAmmo: 0.50
};

/**
 * Precio del siguiente segmento de escudo según la cantidad real de segmentos que Lior ya tenga:
 * Precio del siguiente segmento = cantidad actual de segmentos + 1.
 * Si Lior ya tiene 10 segmentos, no puede comprar más (Infinity).
 */
function calculateNextShieldSegmentPrice(currentSegments = 0) {
  const current = Math.floor(Number(currentSegments) || 0);
  if (!Number.isInteger(current) || current < 0 || current >= MAX_SHIELD_SEGMENTS) return Infinity;
  return current + 1;
}

/**
 * Precio progresivo de comprar `segmentCount` segmentos en la tienda a partir de `currentSegments`:
 * Cada segmento adquirido cuesta (segmentos actuales en ese instante + 1).
 * Ejemplo: si Lior tiene 2 segmentos y compra 3, paga 3 + 4 + 5 = 12 de oro y termina con 5 segmentos.
 */
function calculateShieldPurchaseCost(segmentCount, currentSegments = 0) {
  const count = Math.floor(Number(segmentCount));
  const current = Math.floor(Number(currentSegments) || 0);
  if (!Number.isInteger(count) || count < 1) return Infinity;
  if (!Number.isInteger(current) || current < 0 || current >= MAX_SHIELD_SEGMENTS) return Infinity;
  if (current + count > MAX_SHIELD_SEGMENTS) return Infinity;
  return count * current + (count * (count + 1)) / 2;
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
  // Daño fijo fijado en 22: permite eliminar de 1 solo impacto a los enemigos 2x2 hasta nivel 20
  // (Trol tier 2 tiene 22 HP), pero desde nivel 21 (Minotauro tier 3 tiene 32 HP) ya no los elimina de un solo golpe.
  return 22;
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

function createMinion(floor, x, y, visionRange = 2, isSummoned = false) {
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
    isSummoned: !!isSummoned,
    size: 1,
    cells: [{ x, y }],
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
    this.maxShieldSegments = MAX_SHIELD_SEGMENTS;
    this.shieldSegments = 0;
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

    this.mistyStepMaxCharges = 2;
    this.mistyStepCharges = 2;
    this.mistyStepRechargeMax = 20;
    this.mistyStepActionCounter = 0;
    this.blastMaxCharges = 10;
    this.blastCurrentCharges = 10;
    this.hasRetrievedQuestItem = false;
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
            visionRange: 3,
            attackRange: 1.5,
            isMegaBoss: false,
            isBoss: true,
            size: 2,
            cells: candidateCells,
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

let _lastSyncedViewport = { w: 0, h: 0, top: 0, left: 0 };
let _viewportSyncRaf = null;

function getViewportMetrics() {
  if (typeof window === "undefined") {
    return { width: 800, height: 450, offsetTop: 0, offsetLeft: 0, scale: 1 };
  }
  const vv = window.visualViewport;
  const docEl = typeof document !== "undefined" ? document.documentElement : null;
  const useVisual = vv && (!vv.scale || vv.scale <= 1.02);
  const rawW = useVisual
    ? vv.width
    : (window.innerWidth || docEl?.clientWidth || 800);
  const rawH = useVisual
    ? vv.height
    : (window.innerHeight || docEl?.clientHeight || 450);
  const offsetTop = useVisual ? Math.max(0, Math.round(vv.offsetTop || 0)) : 0;
  const offsetLeft = useVisual ? Math.max(0, Math.round(vv.offsetLeft || 0)) : 0;
  return {
    width: Math.max(240, Math.round(rawW)),
    height: Math.max(180, Math.round(rawH)),
    offsetTop,
    offsetLeft,
    scale: vv?.scale || 1
  };
}

function syncViewportCssVars() {
  if (typeof document === "undefined" || !document.documentElement) return false;
  const { width, height, offsetTop, offsetLeft, scale } = getViewportMetrics();
  if (scale > 1.02) return false;
  const changed = (
    Math.abs(width - _lastSyncedViewport.w) >= 1 ||
    Math.abs(height - _lastSyncedViewport.h) >= 1 ||
    Math.abs(offsetTop - _lastSyncedViewport.top) >= 1 ||
    Math.abs(offsetLeft - _lastSyncedViewport.left) >= 1
  );
  if (!changed) return false;
  _lastSyncedViewport = { w: width, h: height, top: offsetTop, left: offsetLeft };
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--app-width", `${width}px`);
  rootStyle.setProperty("--app-height", `${height}px`);
  rootStyle.setProperty("--vv-offset-top", `${offsetTop}px`);
  rootStyle.setProperty("--vv-offset-left", `${offsetLeft}px`);
  if (typeof window !== "undefined" && (window.scrollX !== 0 || window.scrollY !== 0)) {
    window.scrollTo(0, 0);
  }
  return true;
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

    this.textureCache = new Map();
    this.terrainThemes = [
      {
        floorColor: "#141821",
        floorAltColors: ["#171c26", "#12161f", "#191f2a", "#151a24"],
        wallColor: "#282e3d",
        wallTopColor: "#394154",
        wallFrontColor: "#1d2230",
        boundaryColor: "#06080e",
        torchColor: "rgba(255, 148, 56, 0.24)",
        wallAtlasSrc: "Assets/Map/Dungeon_1/Dungeon_1.png",
        wallOverlayAtlasSrc: "Assets/Map/Dungeon_1/Dungeon_1.png",
        floorOverlay1Src: "Assets/Map/Dungeon_1/Grass_Type_1.png",
        floorOverlay2Src: "Assets/Map/Dungeon_1/Grass_Type_2.png",
        wallAtlas: null,
        wallOverlayAtlas: null,
        floorOverlay1: null,
        floorOverlay2: null,
        wallCrops: [
          { x: 0, y: 0, w: 16, h: 16 },
          { x: 16, y: 0, w: 16, h: 16 },
          { x: 32, y: 0, w: 16, h: 16 },
          { x: 32, y: 16, w: 16, h: 16 },
          { x: 48, y: 16, w: 16, h: 16 }
        ],
        wallOverlayCrops: [
          { x: 96, y: 0, w: 16, h: 16 },
          { x: 112, y: 0, w: 16, h: 16 },
          { x: 144, y: 0, w: 16, h: 16 },
          { x: 96, y: 16, w: 16, h: 16 }
        ],
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
        wallAtlasSrc: "Assets/Map/Dungeon_2/Dungeon_2.png",
        wallOverlayAtlasSrc: "Assets/Map/Dungeon_2/Dungeon_2_Wall_Additions.png",
        floorOverlay1Src: "Assets/Map/Dungeon_2/Grass_Type_1.png",
        floorOverlay2Src: "Assets/Map/Dungeon_2/Grass_Type_2.png",
        wallAtlas: null,
        wallOverlayAtlas: null,
        floorOverlay1: null,
        floorOverlay2: null,
        wallCrops: [
          { x: 0, y: 0, w: 16, h: 16 },
          { x: 16, y: 0, w: 16, h: 16 },
          { x: 32, y: 0, w: 16, h: 16 },
          { x: 32, y: 16, w: 16, h: 16 },
          { x: 48, y: 16, w: 16, h: 16 }
        ],
        wallOverlayCrops: [
          { x: 0, y: 0, w: 32, h: 16 },
          { x: 32, y: 0, w: 32, h: 16 },
          { x: 64, y: 0, w: 32, h: 16 }
        ],
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
        wallAtlasSrc: "Assets/Map/Dungeon_3/Dungeon_3.png",
        wallOverlayAtlasSrc: "Assets/Map/Dungeon_3/Dungeon3_Wall_Additions.png",
        floorOverlay1Src: "Assets/Map/Dungeon_3/Snow_Type_1.png",
        floorOverlay2Src: "Assets/Map/Dungeon_3/Snow_type_2.png",
        wallAtlas: null,
        wallOverlayAtlas: null,
        floorOverlay1: null,
        floorOverlay2: null,
        wallCrops: [
          { x: 96, y: 0, w: 16, h: 16 },
          { x: 112, y: 0, w: 16, h: 16 },
          { x: 128, y: 0, w: 16, h: 16 },
          { x: 96, y: 16, w: 16, h: 16 },
          { x: 128, y: 16, w: 16, h: 16 }
        ],
        wallOverlayCrops: [
          { x: 0, y: 0, w: 32, h: 32 },
          { x: 32, y: 0, w: 32, h: 32 },
          { x: 64, y: 0, w: 32, h: 32 }
        ],
        pebbleCrops: [
          { x: 208, y: 192, w: 16, h: 16 },
          { x: 224, y: 192, w: 16, h: 16 },
          { x: 208, y: 208, w: 16, h: 16 }
        ],
        archCrop: { x: 96, y: 0, w: 48, h: 48 }
      }
    ];
    // Cargar inicialmente solo el Bioma 1 (necesario para el Piso 1); Biomas 2 y 3 se precargan en segundo plano
    this.ensureThemeLoaded(0);

    this.mapDecorations = {
      chests: this.loadTerrainTexture("Assets/Map/Chests/Treasure_Chests(16x16).png"),
      pickups: this.loadTerrainTexture("Assets/Map/PowerUps/PickUp_Items-Sheet.png"),
      mushrooms: this.loadTerrainTexture("Assets/Map/Animated Mushrooms/Dungeon_Animated_Mushrooms.png"),
      uiBallsy: this.loadTerrainTexture("Assets/Map/UI/UI_Ballsy.png")
    };
    this.goldenBunnySheet = null;
    this.merchantSpriteSheet = null;
    this.keyedSpriteCache = new Map();

    this.liorSheet = this.loadTerrainTexture("Assets/Lior/lior.png");
    this.lior2Sheet = this.loadTerrainTexture("Assets/Lior/lior2.png");
    this.effectImages = {};
    this.enemyImages = new Map();
    this.enemyAnimCache = new Map();
    this.enemyProjectiles = [];
    this.animUntil = 0;
    this.animLoopActive = false;

    this.playerAnimation = null;
    this.playerAnimationFrame = null;
    this.chestOpening = null;
    this.chestOpeningFrame = null;
    this.blueChestOpening = null;
    this.blueChestOpeningFrame = null;
    this.damageFlashUntil = 0;
    this.floatingNumbers = [];

    this.cameraAnchor = { x: 7, y: 4 };
    this.cameraFacing = player.direction;
    this.cameraOffset = { x: 0, y: 0 };
    this.lastCameraTick = 0;
    this.bossPresentation = null;
    this.roarEffects = [];
    this.cameraMode = "fixed";
    this.isPortraitBlocked = false;

    this._cameraInitialized = false;
    this.setCameraMode("fixed", false);
    this.updateOrientationState();

    let resizeTimer = null;
    let settleTimer = null;
    const applyViewportUpdate = () => {
      if (_viewportSyncRaf !== null) {
        cancelAnimationFrame(_viewportSyncRaf);
        _viewportSyncRaf = null;
      }
      this.updateOrientationState();
      this.setCameraMode("fixed", false);
    };
    const onViewportChange = (isOrientation = false) => {
      syncViewportCssVars();
      this.updateOrientationState();
      if (_viewportSyncRaf === null) {
        _viewportSyncRaf = requestAnimationFrame(() => {
          _viewportSyncRaf = null;
          this.updateOrientationState();
          this.setCameraMode("fixed", false);
        });
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyViewportUpdate, 80);
      if (isOrientation) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(applyViewportUpdate, 300);
      }
    };
    window.addEventListener("resize", () => onViewportChange(false), { passive: true });
    window.addEventListener("orientationchange", () => onViewportChange(true), { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => onViewportChange(false), { passive: true });
      window.visualViewport.addEventListener("scroll", () => {
        if (syncViewportCssVars()) {
          this.draw();
        }
      }, { passive: true });
    }

    setInterval(() => {
      if (this.game?.isIntroActive()) return;
      if (!this.playerAnimation && !this.chestOpening) this.draw();
    }, 100);
  }

  static detectCameraMode() {
    return "fixed";
  }

  static isMobileDevice() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || "";
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    const isTouch = (navigator.maxTouchPoints || 0) > 0;
    const isCoarse = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    const isIPadOS = /Macintosh/i.test(ua) && isTouch && isCoarse;
    return isMobileUA || isIPadOS || (isTouch && isCoarse);
  }

  static isPortraitViewport() {
    if (!Renderer.isMobileDevice()) return false;
    const { width, height } = getViewportMetrics();
    const isPortraitRatio = height > width;
    const isPortraitMedia = !!(window.matchMedia && window.matchMedia("(orientation: portrait)").matches);
    return isPortraitRatio || isPortraitMedia;
  }

  updateOrientationState() {
    syncViewportCssVars();
    const portrait = Renderer.isPortraitViewport();
    this.isPortraitBlocked = portrait;
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.toggle("is-portrait", portrait);
      document.body.classList.toggle("mode-landscape", !portrait);
    }
    const overlay = document.getElementById("rotate-device-overlay");
    if (overlay) {
      overlay.classList.toggle("hidden", !portrait);
    }
    if (portrait && this.game?.touchController) {
      this.game.touchController.cancelAllGestures();
    }
  }

  computeResponsiveProfile() {
    const { width: vw, height: vh } = getViewportMetrics();
    const isPortrait = vh > vw;
    const effW = isPortrait ? vh : vw;
    const effH = isPortrait ? vw : vh;
    const aspect = Math.max(1.2, Math.min(2.85, effW / Math.max(1, effH)));

    const rows = aspect >= 1.65 ? 9 : 11;
    const tileSize = Math.max(28, Math.min(64, Math.floor(effH / rows)));
    let cols = Math.max(11, Math.min(27, Math.round(rows * aspect)));
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
    syncViewportCssVars();
    const prevCols = CAMERA_CONFIG.cols || 15;
    const prevRows = CAMERA_CONFIG.rows || 9;
    const prevAnchorX = Math.floor(prevCols / 2);
    const prevAnchorY = Math.floor(prevRows / 2);

    const profile = this.computeResponsiveProfile();
    CAMERA_PROFILES.fixed = profile;
    CAMERA_PROFILES.classic = profile;
    this.cameraMode = "fixed";
    CAMERA_CONFIG.mode = "fixed";
    CAMERA_CONFIG.cols = profile.cols;
    CAMERA_CONFIG.rows = profile.rows;
    CAMERA_CONFIG.tileSize = profile.tileSize;

    const targetW = profile.cols * profile.tileSize;
    const targetH = profile.rows * profile.tileSize;
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }
    this.canvas.style.removeProperty("aspect-ratio");
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.add("mode-landscape");
    }

    const newAnchor = profile.anchors[this.cameraFacing] || profile.anchors[0];
    if (!this._cameraInitialized) {
      this._cameraInitialized = true;
      this.snapCamera();
    } else {
      const deltaX = newAnchor.x - prevAnchorX;
      const deltaY = newAnchor.y - prevAnchorY;
      this.cameraAnchor.x += deltaX;
      this.cameraAnchor.y += deltaY;
      CAMERA_CONFIG.playerScreenX = Math.round(this.cameraAnchor.x);
      CAMERA_CONFIG.playerScreenY = Math.round(this.cameraAnchor.y);
    }

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
    this.cameraFacing = this.player.direction;
    this.lastCameraTick = performance.now();
    this.keepAnimating(450);
  }

  /**
   * Inicia la presentación cinematográfica única de un enemigo de tamaño 4x4 (Sección 7.2):
   * 1. Detecta la aparición inicial del enemigo 4x4 (!enemy.introPresented).
   * 2. Desplaza la cámara suavemente hacia el monstruo.
   * 3. Reproduce el rugido correspondiente a su categoría y piso + efecto visual de rugido.
   * 4. Inicia o mantiene la música de combate del encuentro.
   * 5. Regresa suavemente la cámara a Lior sin bloquear el control del personaje.
   */
  startLargeEnemyPresentation(enemy, floorNumber = 1) {
    if (!enemy || enemy.introPresented) return;
    if (!sounds.isBossRoarEligible(enemy, floorNumber, { ignorePlayed: false })) return;
    enemy.introPresented = true;
    if (enemy.cells && this.dungeon) {
      enemy.cells.forEach(c => this.dungeon.markRevealed(c.x, c.y));
    }
    const size = enemy.size || 4;
    const focusWorldX = enemy.x + (size - 1) / 2;
    const focusWorldY = enemy.y + (size - 1) / 2;
    const now = performance.now();
    this.bossPresentation = {
      enemy,
      floorNumber,
      focusWorldX,
      focusWorldY,
      startedAt: now,
      panInMs: 520,
      holdMs: 920,
      panOutMs: 520,
      roarTriggered: false
    };
    this.lastCameraTick = now;
    this.keepAnimating(2100);
  }

  /**
   * Si el jugador se mueve o actúa durante la presentación del enemigo 4x4,
   * asegura que el rugido se haya disparado y regresa suavemente la cámara a Lior.
   */
   settleLargeEnemyPresentationToPlayer() {
    if (!this.bossPresentation) return;
    const now = performance.now();
    const pres = this.bossPresentation;
    const activePhase = pres.panInMs + pres.holdMs;
    if (!pres.roarTriggered) {
      pres.roarTriggered = true;
      sounds.playMonsterRoar(pres.enemy, pres.floorNumber);
      this.game?.syncBiomeMusic?.();
      this.playEnemyAnim(pres.enemy, "attack");
      const isDragon = pres.floorNumber === 100
        || !!(pres.enemy?.isMegaBoss && pres.enemy?.originTier === 10);
      this.triggerRoarVisualEffect(pres.focusWorldX, pres.focusWorldY, isDragon);
    }
    if (now - pres.startedAt < activePhase) {
      pres.startedAt = now - activePhase;
      this.keepAnimating(550);
    }
  }

  /**
   * Añade un efecto visual breve de onda expansiva y distorsión de aire al rugir un enemigo 4x4 (Sección 7.3).
   */
  triggerRoarVisualEffect(worldX, worldY, isDragon = false) {
    if (!this.roarEffects) this.roarEffects = [];
    this.roarEffects.push({
      worldX,
      worldY,
      isDragon,
      startedAt: performance.now(),
      duration: 880
    });
    this.keepAnimating(920);
  }

  drawRoarEffects(targetCtx, now) {
    if (!this.roarEffects || this.roarEffects.length === 0) return;
    this.roarEffects = this.roarEffects.filter(fx => now - fx.startedAt < fx.duration);
    if (this.roarEffects.length === 0) return;

    const tileSize = CAMERA_CONFIG.tileSize;
    this.roarEffects.forEach(fx => {
      const progress = Math.max(0, Math.min(1, (now - fx.startedAt) / fx.duration));
      const { screenX, screenY } = CameraTransformer.worldToScreen(fx.worldX, fx.worldY, this.player);
      const cx = (screenX + 0.5) * tileSize;
      const cy = (screenY + 0.5) * tileSize;

      targetCtx.save();
      for (let ring = 0; ring < 3; ring++) {
        const ringDelay = ring * 0.16;
        const ringProg = Math.max(0, Math.min(1, (progress - ringDelay) / (1 - ringDelay)));
        if (ringProg <= 0 || ringProg >= 1) continue;

        const easeOut = 1 - Math.pow(1 - ringProg, 2.3);
        const radius = tileSize * (0.85 + easeOut * (fx.isDragon ? 5.2 : 4.0));
        const alpha = (1 - ringProg) * (fx.isDragon ? 0.68 : 0.55);

        targetCtx.strokeStyle = fx.isDragon
          ? `rgba(255, 120, 40, ${alpha})`
          : `rgba(220, 38, 70, ${alpha})`;
        targetCtx.lineWidth = (1 - ringProg) * 4.2 + 1.2;
        targetCtx.beginPath();
        targetCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        targetCtx.stroke();

        targetCtx.strokeStyle = fx.isDragon
          ? `rgba(255, 220, 110, ${alpha * 0.52})`
          : `rgba(168, 85, 247, ${alpha * 0.45})`;
        targetCtx.lineWidth = 1.4;
        targetCtx.beginPath();
        targetCtx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
        targetCtx.stroke();
      }

      const rayCount = 12;
      const rayAlpha = (1 - progress) * 0.48;
      targetCtx.strokeStyle = fx.isDragon
        ? `rgba(255, 195, 95, ${rayAlpha})`
        : `rgba(244, 63, 94, ${rayAlpha})`;
      targetCtx.lineWidth = 1.7;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + progress * 0.25;
        const rInner = tileSize * (0.95 + progress * 2.1);
        const rOuter = rInner + tileSize * (0.62 * (1 - progress * 0.45));
        targetCtx.beginPath();
        targetCtx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
        targetCtx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
        targetCtx.stroke();
      }
      targetCtx.restore();
    });
  }

  updateCamera(now) {
    const anchors = CAMERA_PROFILES.fixed.anchors;
    const baseAnchor = anchors[this.cameraFacing] || anchors[0];
    let targetX = baseAnchor.x;
    let targetY = baseAnchor.y;
    let smoothingTau = 70;

    // 1. Presentación cinematográfica de enemigo 4x4 (Sección 7.2)
    if (this.bossPresentation) {
      const pres = this.bossPresentation;
      const elapsed = now - pres.startedAt;
      const totalDuration = pres.panInMs + pres.holdMs + pres.panOutMs;

      if (elapsed >= pres.panInMs * 0.72 && !pres.roarTriggered) {
        pres.roarTriggered = true;
        sounds.playMonsterRoar(pres.enemy, pres.floorNumber);
        this.game?.syncBiomeMusic?.();
        this.playEnemyAnim(pres.enemy, "attack");
        const isDragon = pres.floorNumber === 100
          || !!(pres.enemy?.isMegaBoss && pres.enemy?.originTier === 10);
        this.triggerRoarVisualEffect(pres.focusWorldX, pres.focusWorldY, isDragon);
      }

      if (elapsed < pres.panInMs + pres.holdMs) {
        const dx = pres.focusWorldX - this.player.x;
        const dy = pres.focusWorldY - this.player.y;
        if (CAMERA_CONFIG.mode === "fixed") {
          targetX = baseAnchor.x - dx;
          targetY = baseAnchor.y - dy;
        } else {
          const basis = CameraTransformer.getBasis(this.player.direction);
          const forward = dx * basis.forward.x + dy * basis.forward.y;
          const lateral = dx * basis.right.x + dy * basis.right.y;
          targetX = baseAnchor.x - lateral;
          targetY = baseAnchor.y + forward;
        }
        smoothingTau = 110;
        this.keepAnimating(120);
      } else if (elapsed < totalDuration) {
        smoothingTau = 90;
        this.keepAnimating(120);
      } else {
        this.bossPresentation = null;
      }
    }

    // 2. Seguimiento suave del marcador de Misty Step cuando sale del campo de visión (Sección 7.1)
    if (this.game?.mistyStepPreview && !this.game.mistyStepPreview.canceled) {
      const dest = this.game.mistyStepPreview;
      const dx = dest.x - this.player.x;
      const dy = dest.y - this.player.y;
      const cols = CAMERA_CONFIG.cols || 15;
      const rows = CAMERA_CONFIG.rows || 9;
      const marginX = 2.0;
      const marginY = 1.6;

      let rawMarkerX, rawMarkerY;
      if (CAMERA_CONFIG.mode === "fixed") {
        rawMarkerX = baseAnchor.x + dx;
        rawMarkerY = baseAnchor.y + dy;
      } else {
        const basis = CameraTransformer.getBasis(this.player.direction);
        const forward = dx * basis.forward.x + dy * basis.forward.y;
        const lateral = dx * basis.right.x + dy * basis.right.y;
        rawMarkerX = baseAnchor.x + lateral;
        rawMarkerY = baseAnchor.y - forward;
      }

      let shiftX = 0;
      let shiftY = 0;
      if (rawMarkerX < marginX) {
        shiftX = marginX - rawMarkerX;
      } else if (rawMarkerX > (cols - 1 - marginX)) {
        shiftX = (cols - 1 - marginX) - rawMarkerX;
      }
      if (rawMarkerY < marginY) {
        shiftY = marginY - rawMarkerY;
      } else if (rawMarkerY > (rows - 1 - marginY)) {
        shiftY = (rows - 1 - marginY) - rawMarkerY;
      }

      targetX = baseAnchor.x + shiftX;
      targetY = baseAnchor.y + shiftY;
      smoothingTau = 75;
    }

    const anchor = this.cameraAnchor;
    const dt = Math.min(100, Math.max(0, now - (this.lastCameraTick || now)));
    this.lastCameraTick = now;
    const blend = 1 - Math.exp(-dt / smoothingTau);
    anchor.x += (targetX - anchor.x) * blend;
    anchor.y += (targetY - anchor.y) * blend;
    if (Math.abs(targetX - anchor.x) < 0.01 && Math.abs(targetY - anchor.y) < 0.01) {
      anchor.x = targetX;
      anchor.y = targetY;
    } else {
      this.keepAnimating(100);
    }

    CAMERA_CONFIG.playerScreenX = Math.round(anchor.x);
    CAMERA_CONFIG.playerScreenY = Math.round(anchor.y);

    let shakeX = 0;
    let shakeY = 0;
    if (this.roarEffects && this.roarEffects.length > 0) {
      const activeRoar = this.roarEffects[this.roarEffects.length - 1];
      const rElapsed = now - activeRoar.startedAt;
      if (rElapsed >= 0 && rElapsed < activeRoar.duration) {
        const decay = 1 - rElapsed / activeRoar.duration;
        const amp = (activeRoar.isDragon ? 4.0 : 2.6) * decay * decay;
        shakeX = Math.sin(now * 0.09) * amp;
        shakeY = Math.cos(now * 0.11) * amp;
      }
    }

    this.cameraOffset = {
      x: (anchor.x - CAMERA_CONFIG.playerScreenX) * CAMERA_CONFIG.tileSize + shakeX,
      y: (anchor.y - CAMERA_CONFIG.playerScreenY) * CAMERA_CONFIG.tileSize + shakeY
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
    if (!src) return null;
    if (this.textureCache && this.textureCache.has(src)) {
      return this.textureCache.get(src);
    }
    const image = new Image();
    image.addEventListener("load", () => {
      if (!this.game?.isIntroActive()) {
        this.draw();
      }
    });
    image.src = src;
    if (this.textureCache) {
      this.textureCache.set(src, image);
    }
    return image;
  }

  ensureThemeLoaded(themeIndex = 0) {
    const idx = Math.max(0, Math.min(this.terrainThemes.length - 1, themeIndex));
    const theme = this.terrainThemes[idx];
    if (!theme) return null;
    if (!theme.wallAtlas && theme.wallAtlasSrc) {
      theme.wallAtlas = this.loadTerrainTexture(theme.wallAtlasSrc);
    }
    if (!theme.wallOverlayAtlas && theme.wallOverlayAtlasSrc) {
      theme.wallOverlayAtlas = this.loadTerrainTexture(theme.wallOverlayAtlasSrc);
    }
    if (!theme.floorOverlay1 && theme.floorOverlay1Src) {
      theme.floorOverlay1 = this.loadTerrainTexture(theme.floorOverlay1Src);
    }
    if (!theme.floorOverlay2 && theme.floorOverlay2Src) {
      theme.floorOverlay2 = this.loadTerrainTexture(theme.floorOverlay2Src);
    }
    return theme;
  }

  ensureEffectImage(sheetKey) {
    const config = EFFECT_SHEETS[sheetKey];
    if (!config) return null;
    if (!this.effectImages[sheetKey]) {
      this.effectImages[sheetKey] = this.loadTerrainTexture(config.src);
    }
    return this.effectImages[sheetKey];
  }

  ensureNpcSheetsLoaded() {
    if (!this.goldenBunnySheet) {
      this.goldenBunnySheet = this.loadTerrainTexture("Assets/Enemy/Golden-bunny.jpg");
    }
    if (!this.merchantSpriteSheet) {
      this.merchantSpriteSheet = this.loadTerrainTexture("Assets/Enemy/merchant.png");
    }
  }

  static isMagentaPixel(r, g, b) {
    const minRB = Math.min(r, b);
    if (minRB >= 60 && Math.abs(r - b) <= 80 && g < minRB * 0.52) return true;
    return r > 185 && b > 185 && g < minRB - 28;
  }

  static isBackgroundPixel(r, g, b, bgRef) {
    if (Renderer.isMagentaPixel(r, g, b)) return true;
    if (!bgRef) return false;
    if (Array.isArray(bgRef[0])) {
      return bgRef.some(ref => Math.abs(r - ref[0]) + Math.abs(g - ref[1]) + Math.abs(b - ref[2]) < 68);
    }
    return Math.abs(r - bgRef[0]) + Math.abs(g - bgRef[1]) + Math.abs(b - bgRef[2]) < 68;
  }

  static getBackgroundReference(data, width = 0, height = 0) {
    if (!width || !height) {
      const r = data[0], g = data[1], b = data[2];
      return Renderer.isMagentaPixel(r, g, b) || data[3] < 16 ? null : [r, g, b];
    }
    const corners = [
      0,
      (width - 1) * 4,
      (height - 1) * width * 4,
      ((height - 1) * width + (width - 1)) * 4
    ];
    const refs = [];
    for (const idx of corners) {
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
      if (a >= 16 && !Renderer.isMagentaPixel(r, g, b)) {
        if (!refs.some(ref => Math.abs(r - ref[0]) + Math.abs(g - ref[1]) + Math.abs(b - ref[2]) < 24)) {
          refs.push([r, g, b]);
        }
      }
    }
    return refs.length > 0 ? refs : null;
  }

  /**
   * Elimina los halos magentas/púrpuras producidos por la compresión JPEG o el antialiasing en los bordes
   * de 1 píxel contiguos a píxeles transparentes sin alterar los colores internos del sprite.
   */
  static despillSpriteEdges(data, width, height) {
    const total = width * height;
    const isTransparent = new Uint8Array(total);
    for (let i = 0; i < total; i++) {
      if (data[i * 4 + 3] < 20) isTransparent[i] = 1;
    }

    for (let y = 0; y < height; y++) {
      const rowOff = y * width;
      for (let x = 0; x < width; x++) {
        const i = rowOff + x;
        if (isTransparent[i]) continue;
        const touchesBg = (
          (x > 0 && isTransparent[i - 1]) ||
          (x + 1 < width && isTransparent[i + 1]) ||
          (y > 0 && isTransparent[i - width]) ||
          (y + 1 < height && isTransparent[i + width])
        );
        if (!touchesBg) continue;

        const off = i * 4;
        const r = data[off], g = data[off + 1], b = data[off + 2];
        const minRB = Math.min(r, b);
        if (minRB >= 56 && Math.abs(r - b) <= 78 && g < minRB * 0.62) {
          data[off + 3] = 0;
        } else if (r > g + 18 && b > g + 18) {
          data[off] = Math.min(r, g + 10);
          data[off + 2] = Math.min(b, g + 10);
        }
      }
    }
  }

  /**
   * Recorta el espacio transparente sobrante sin cortar ningún píxel visible y calcula el eje
   * horizontal estable del cuerpo (footAnchorX) ponderando la columna vertebral vertical del sprite
   * para que lanzas, espadas, armas de fuego o sombreros caídos no desplacen al personaje.
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

    let maxColCount = 0;
    for (let x = minX; x <= maxX; x++) {
      if (cols[x] > maxColCount) maxColCount = cols[x];
    }

    let weightedSumX = 0;
    let totalWeight = 0;
    const coreThreshold = Math.max(2, maxColCount * 0.45);
    for (let x = minX; x <= maxX; x++) {
      if (cols[x] >= coreThreshold) {
        const w = cols[x] * cols[x];
        weightedSumX += (x - minX) * w;
        totalWeight += w;
      }
    }

    trimmed.trimLeft = minX;
    trimmed.trimTop = minY;
    trimmed.sourceWidth = width;
    trimmed.sourceHeight = height;
    trimmed.footAnchorX = totalWeight > 0 ? (weightedSumX / totalWeight) : (trimmedW / 2);
    trimmed.footAnchorY = trimmedH;
    return trimmed;
  }

  getKeyedSprite(sheet, sourceRect, backgroundType, options = {}) {
    if (!sheet || !sheet.complete || sheet.naturalWidth === 0 || !sourceRect) return null;
    const bgRefKey = options.bgRef ? JSON.stringify(options.bgRef) : "";
    const cacheKey = `${sheet.src}:${sourceRect.x},${sourceRect.y},${sourceRect.w},${sourceRect.h}:${backgroundType}:${options.trim ? 1 : 0}:${bgRefKey}`;
    if (!options.clusterMask && this.keyedSpriteCache.has(cacheKey)) {
      return this.keyedSpriteCache.get(cacheKey);
    }

    const sprite = document.createElement("canvas");
    sprite.width = Math.max(1, Math.round(sourceRect.w));
    sprite.height = Math.max(1, Math.round(sourceRect.h));
    const spriteCtx = sprite.getContext("2d", { willReadFrequently: true });
    spriteCtx.imageSmoothingEnabled = false;
    spriteCtx.drawImage(sheet, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h,
      0, 0, sprite.width, sprite.height);

    if (backgroundType !== "alpha" || options.clusterMask) {
      const imageData = spriteCtx.getImageData(0, 0, sprite.width, sprite.height);
      const { data } = imageData;
      const w = sprite.width;
      const h = sprite.height;

      if (backgroundType === "magenta") {
        const mask = options.clusterMask;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const offset = idx * 4;
            if (mask && !mask(x, y)) {
              data[offset + 3] = 0;
              continue;
            }
            if (Renderer.isBackgroundPixel(data[offset], data[offset + 1], data[offset + 2], options.bgRef)) {
              data[offset + 3] = 0;
            }
          }
        }
        Renderer.despillSpriteEdges(data, w, h);
      } else if (backgroundType !== "alpha") {
        this.floodKeyBackground(data, w, h, backgroundType);
        Renderer.despillSpriteEdges(data, w, h);
      }
      spriteCtx.putImageData(imageData, 0, 0);
    }

    const result = options.trim ? this.trimCanvas(sprite) : sprite;
    if (!options.clusterMask) {
      this.keyedSpriteCache.set(cacheKey, result);
    }
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
      return Math.abs(data[offset] - background[0]) < 30
        && Math.abs(data[offset] - data[offset + 1]) < 45
        && Math.abs(data[offset + 1] - background[1]) < 30
        && Math.abs(data[offset + 2] - background[2]) < 30;
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

  /**
   * Segmentación 2D por componentes conexos con eliminación automática de líneas de cuadrícula,
   * cabeceras de texto ("IDLE", "WALK", "MOVEMENT", "ATTACK", "HURT", "DEATH"), márgenes exteriores
   * y enmascaramiento por componente para impedir filtraciones de fotogramas vecinos (bleeding).
   */
  segmentSheet(image, { rowGap = 3, trimFrames = true } = {}) {
    const STEP = Math.max(1, Math.min(2, Math.floor(Math.min(image.naturalWidth, image.naturalHeight) / 300) || 1));
    const width = Math.floor(image.naturalWidth / STEP);
    const height = Math.floor(image.naturalHeight / STEP);
    if (width < 4 || height < 4) return null;

    const probe = document.createElement("canvas");
    probe.width = width;
    probe.height = height;
    const probeCtx = probe.getContext("2d", { willReadFrequently: true });
    probeCtx.imageSmoothingEnabled = false;
    probeCtx.drawImage(image, 0, 0, width, height);
    const { data } = probeCtx.getImageData(0, 0, width, height);
    const bgRef = Renderer.getBackgroundReference(data, width, height);

    const bg = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      const off = i * 4;
      if (data[off + 3] < 16 || Renderer.isBackgroundPixel(data[off], data[off + 1], data[off + 2], bgRef)) {
        bg[i] = 1;
      }
    }

    // Detectar y eliminar líneas rectas delgadas de cuadrícula (bordes de celdas de 1-4px en ogre.png / roc.jpg)
    const gridMask = new Uint8Array(width * height);
    const minLineRun = Math.max(22, Math.floor(Math.min(width, height) * 0.04));

    for (let y = 0; y < height; y++) {
      const rowOff = y * width;
      let runStart = -1;
      for (let x = 0; x <= width; x++) {
        let isThinV = false;
        if (x < width && !bg[rowOff + x]) {
          const upBg = (y < 1 || bg[(y - 1) * width + x]) || (y < 2 || bg[(y - 2) * width + x]);
          const dnBg = (y + 1 >= height || bg[(y + 1) * width + x]) || (y + 2 >= height || bg[(y + 2) * width + x]);
          isThinV = upBg && dnBg;
        }
        if (isThinV) {
          if (runStart < 0) runStart = x;
        } else if (runStart >= 0) {
          if (x - runStart >= minLineRun) {
            for (let gx = runStart; gx < x; gx++) {
              gridMask[rowOff + gx] = 1;
              if (y > 0) gridMask[(y - 1) * width + gx] = 1;
              if (y + 1 < height) gridMask[(y + 1) * width + gx] = 1;
            }
          }
          runStart = -1;
        }
      }
    }

    for (let x = 0; x < width; x++) {
      let runStart = -1;
      for (let y = 0; y <= height; y++) {
        let isThinH = false;
        if (y < height && !bg[y * width + x]) {
          const ltBg = (x < 1 || bg[y * width + (x - 1)]) || (x < 2 || bg[y * width + (x - 2)]);
          const rtBg = (x + 1 >= width || bg[y * width + (x + 1)]) || (x + 2 >= width || bg[y * width + (x + 2)]);
          isThinH = ltBg && rtBg;
        }
        if (isThinH) {
          if (runStart < 0) runStart = y;
        } else if (runStart >= 0) {
          if (y - runStart >= minLineRun) {
            for (let gy = runStart; gy < y; gy++) {
              gridMask[gy * width + x] = 1;
              if (x > 0) gridMask[gy * width + (x - 1)] = 1;
              if (x + 1 < width) gridMask[gy * width + (x + 1)] = 1;
            }
          }
          runStart = -1;
        }
      }
    }

    const solid = new Uint8Array(width * height);
    const rowCounts = new Uint32Array(height);
    for (let y = 0; y < height; y++) {
      const rowOff = y * width;
      for (let x = 0; x < width; x++) {
        const i = rowOff + x;
        if (!bg[i] && !gridMask[i]) {
          solid[i] = 1;
          rowCounts[y]++;
        }
      }
    }

    let bands = Renderer.findRuns(rowCounts, Math.max(3, Math.floor(6 / STEP)), Math.max(1, Math.floor(rowGap * 2 / STEP)));
    const tallest = bands.reduce((max, b) => Math.max(max, b.end - b.start + 1), 0);
    // Filtrar filas cortas que corresponden a cabeceras de texto ("IDLE", "WALK", "MOVEMENT", "HURT", "DEATH")
    bands = bands.filter(b => (b.end - b.start + 1) >= tallest * 0.42);

    const rows = bands.map(band => {
      const bandY0 = band.start;
      const bandH = band.end - band.start + 1;
      const labels = new Int32Array(width * bandH);
      const queue = new Int32Array(width * bandH);
      const comps = [];
      let currentLabel = 0;

      for (let by = 0; by < bandH; by++) {
        const globalRow = (bandY0 + by) * width;
        const localRow = by * width;
        for (let bx = 0; bx < width; bx++) {
          const localIdx = localRow + bx;
          if (!solid[globalRow + bx] || labels[localIdx] !== 0) continue;

          currentLabel++;
          labels[localIdx] = currentLabel;
          let qHead = 0, qTail = 0;
          queue[qTail++] = localIdx;

          let minX = bx, maxX = bx, minY = by, maxY = by, area = 0;
          while (qHead < qTail) {
            const cur = queue[qHead++];
            area++;
            const cx = cur % width;
            const cy = (cur - cx) / width;
            if (cx < minX) minX = cx;
            if (cx > maxX) maxX = cx;
            if (cy < minY) minY = cy;
            if (cy > maxY) maxY = cy;

            for (let dy = -1; dy <= 1; dy++) {
              const ny = cy + dy;
              if (ny < 0 || ny >= bandH) continue;
              const nLocalRow = ny * width;
              const nGlobalRow = (bandY0 + ny) * width;
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = cx + dx;
                if (nx < 0 || nx >= width) continue;
                const nLocal = nLocalRow + nx;
                if (labels[nLocal] === 0 && solid[nGlobalRow + nx]) {
                  labels[nLocal] = currentLabel;
                  queue[qTail++] = nLocal;
                }
              }
            }
          }

          const cw = maxX - minX + 1;
          const ch = maxY - minY + 1;
          const minArea = Math.max(4, Math.floor(16 / (STEP * STEP)));
          if (area < minArea) continue;
          // Ignorar etiquetas de texto en la esquina superior de la celda (ej. "ATTACK", "HURT", "DEATH" en roc.jpg)
          if (minY < bandH * 0.14 && (minY + ch) < bandH * 0.24 && ch < bandH * 0.20) continue;

          comps.push({ lbl: currentLabel, x0: minX, y0: minY, x1: maxX, y1: maxY, w: cw, h: ch, area });
        }
      }

      const major = [];
      const minor = [];
      for (const comp of comps) {
        if (comp.area >= bandH * bandH * 0.035 && comp.h >= bandH * 0.25) {
          major.push(comp);
        } else {
          minor.push(comp);
        }
      }

      major.sort((a, b) => a.x0 - b.x0);
      const clusters = major.map(c => ({
        x0: c.x0, y0: c.y0, x1: c.x1, y1: c.y1,
        labels: new Set([c.lbl])
      }));

      const majorWidths = major.map(c => c.w).sort((a, b) => a - b);
      const medW = majorWidths[Math.floor(majorWidths.length / 2)] || bandH;
      const attachPad = Math.max(6, Math.floor(24 / STEP));
      const unattached = [];

      for (const mc of minor) {
        let bestIdx = -1;
        let bestDist = Infinity;
        for (let idx = 0; idx < clusters.length; idx++) {
          const cl = clusters[idx];
          let dist = 0;
          if (mc.x1 < cl.x0 - attachPad || mc.x0 > cl.x1 + attachPad) {
            dist = Math.min(Math.abs(mc.x0 - cl.x1), Math.abs(mc.x1 - cl.x0));
          }
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        }
        if (bestIdx >= 0 && bestDist <= medW * 0.32) {
          const cl = clusters[bestIdx];
          cl.x0 = Math.min(cl.x0, mc.x0);
          cl.y0 = Math.min(cl.y0, mc.y0);
          cl.x1 = Math.max(cl.x1, mc.x1);
          cl.y1 = Math.max(cl.y1, mc.y1);
          cl.labels.add(mc.lbl);
        } else {
          unattached.push(mc);
        }
      }

      unattached.sort((a, b) => a.x0 - b.x0);
      const uClusters = [];
      const uGapMax = Math.max(Math.floor(48 / STEP), medW * 0.35);
      for (const mc of unattached) {
        const last = uClusters[uClusters.length - 1];
        if (last && mc.x0 - last.x1 <= uGapMax) {
          last.x0 = Math.min(last.x0, mc.x0);
          last.y0 = Math.min(last.y0, mc.y0);
          last.x1 = Math.max(last.x1, mc.x1);
          last.y1 = Math.max(last.y1, mc.y1);
          last.area += mc.area;
          last.labels.add(mc.lbl);
        } else {
          uClusters.push({
            x0: mc.x0, y0: mc.y0, x1: mc.x1, y1: mc.y1,
            area: mc.area,
            labels: new Set([mc.lbl])
          });
        }
      }

      const minClusterArea = Math.max(18, Math.floor(90 / (STEP * STEP)));
      for (const ucl of uClusters) {
        if (ucl.area >= minClusterArea) {
          clusters.push(ucl);
        }
      }

      clusters.sort((a, b) => a.x0 - b.x0);

      // Recolectar todas las etiquetas de los demás clusters de la fila para bloquear filtraciones vecinas
      const allClusterLabels = new Set();
      clusters.forEach(cl => cl.labels.forEach(l => allClusterLabels.add(l)));

      return clusters.map(cl => {
        const srcX0 = Math.max(0, cl.x0 * STEP - STEP);
        const srcY0 = Math.max(0, (bandY0 + cl.y0) * STEP - STEP);
        const srcX1 = Math.min(image.naturalWidth, (cl.x1 + 1) * STEP + STEP);
        const srcY1 = Math.min(image.naturalHeight, (bandY0 + cl.y1 + 1) * STEP + STEP);
        const rect = { x: srcX0, y: srcY0, w: srcX1 - srcX0, h: srcY1 - srcY0 };

        const clusterMask = (localX, localY) => {
          const px = Math.min(width - 1, Math.max(0, Math.floor((srcX0 + localX) / STEP)));
          const py = Math.min(bandH - 1, Math.max(0, Math.floor((srcY0 + localY) / STEP) - bandY0));
          const lbl = labels[py * width + px];
          if (cl.labels.has(lbl)) return true;
          if (lbl !== 0 && allClusterLabels.has(lbl)) return false;
          // Permitir 1 paso de borde antialiasing sólo si es vecino directo de este cluster y no de otro
          for (let dy = -1; dy <= 1; dy++) {
            const ny = py + dy;
            if (ny < 0 || ny >= bandH) continue;
            for (let dx = -1; dx <= 1; dx++) {
              const nx = px + dx;
              if (nx < 0 || nx >= width) continue;
              if (cl.labels.has(labels[ny * width + nx])) return true;
            }
          }
          return false;
        };

        const sprite = this.getKeyedSprite(image, rect, "magenta", {
          bgRef,
          trim: trimFrames,
          clusterMask
        });
        if (sprite) {
          sprite.sheetX0 = srcX0;
          sprite.sheetX1 = srcX1;
        }
        return sprite;
      }).filter(Boolean);
    }).filter(frames => frames.length > 0);

    return rows.length > 0 ? rows : null;
  }

  loadSheetImage(src) {
    if (!src) return null;
    let image = this.enemyImages.get(src);
    if (!image) {
      image = this.loadTerrainTexture(src);
      if (image) this.enemyImages.set(src, image);
    }
    return image?.complete && image.naturalWidth > 0 ? image : null;
  }

  getEnemyAnimation(src) {
    if (this.enemyAnimCache.has(src)) return this.enemyAnimCache.get(src);
    const image = this.loadSheetImage(src);
    if (!image) return null;

    const rows = this.segmentSheet(image, { trimFrames: true });
    let animation = null;
    if (rows && rows.length > 0) {
      const splitRowBySectionGap = (rowFrames) => {
        if (!rowFrames || rowFrames.length < 4) return null;
        const gaps = [];
        for (let i = 1; i < rowFrames.length; i++) {
          const prevEnd = rowFrames[i - 1].sheetX1 ?? 0;
          const curStart = rowFrames[i].sheetX0 ?? 0;
          gaps.push({ index: i, gap: Math.max(1, curStart - prevEnd) });
        }
        const sortedGaps = [...gaps].map(g => g.gap).sort((a, b) => a - b);
        const medianGap = sortedGaps[Math.floor(sortedGaps.length / 2)] || 1;
        const maxGapObj = gaps.reduce((best, cur) => (cur.gap > best.gap ? cur : best), gaps[0]);
        if (maxGapObj && maxGapObj.gap >= Math.max(90, medianGap * 1.9)) {
          return {
            left: rowFrames.slice(0, maxGapObj.index),
            right: rowFrames.slice(maxGapObj.index)
          };
        }
        return null;
      };

      const rawIdleRow = rows[0];
      const idleSplit = splitRowBySectionGap(rawIdleRow);
      const idle = idleSplit
        ? idleSplit.left
        : (rawIdleRow.length >= 6 ? rawIdleRow.slice(0, 3) : rawIdleRow);

      let attack = idle;
      let hurt = idle;
      let death = idle;

      if (rows.length >= 4) {
        // Hojas de 4 filas (ej. 1. roc.jpg: Fila 0=Idle, Fila 1=Movement, Fila 2=Attack+Hurt, Fila 3=Death)
        const row2 = rows[2];
        const row2Split = splitRowBySectionGap(row2);
        if (row2Split) {
          attack = row2Split.left;
          hurt = row2Split.right;
        } else if (row2.length >= 4) {
          const half = Math.ceil(row2.length / 2);
          attack = row2.slice(0, half);
          hurt = row2.slice(half);
        } else {
          attack = row2;
          hurt = rows[3].slice(0, Math.min(2, rows[3].length));
        }
        death = rows[rows.length - 1];
      } else {
        const rawAttackRow = rows.length > 1 ? rows[1] : rawIdleRow;
        const attackSplit = splitRowBySectionGap(rawAttackRow);
        attack = attackSplit ? attackSplit.right : rawAttackRow;

        const last = rows.length > 2 ? rows[rows.length - 1] : attack;
        const lastSplit = splitRowBySectionGap(last);
        if (lastSplit) {
          hurt = lastSplit.left;
          death = lastSplit.right;
        } else {
          const hurtCount = last.length > 2 ? Math.min(2, Math.ceil(last.length / 2)) : last.length;
          hurt = last.slice(0, hurtCount);
          death = last.length > 2 ? last.slice(hurtCount) : last;
        }
      }

      animation = {
        idle,
        attack,
        hurt,
        death,
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

  static getEnemyHorizontalBounds(enemy) {
    if (enemy?.cells && enemy.cells.length > 0) {
      let minX = Infinity;
      let maxX = -Infinity;
      for (let i = 0; i < enemy.cells.length; i++) {
        const cx = enemy.cells[i].x;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
      }
      if (Number.isFinite(minX) && Number.isFinite(maxX)) {
        return { minX, maxX, centerX: (minX + maxX) / 2 };
      }
    }
    const minX = enemy?.x ?? 0;
    const size = Math.max(1, enemy?.size || 1);
    const maxX = minX + size - 1;
    return { minX, maxX, centerX: (minX + maxX) / 2 };
  }

  static recordEnemyRelativePlayerX(enemy, player) {
    if (!enemy || !player) return;
    const { minX, maxX } = Renderer.getEnemyHorizontalBounds(enemy);
    if (player.x < minX) {
      enemy.lastRelativeX = -1;
    } else if (player.x > maxX) {
      enemy.lastRelativeX = 1;
    }
  }

  static orientEnemyTowardsPlayer(enemy, player) {
    if (!enemy || !player) return false;
    const { minX, maxX, centerX } = Renderer.getEnemyHorizontalBounds(enemy);
    let faceLeft;

    if (player.x < minX) {
      faceLeft = true;
      enemy.lastRelativeX = -1;
    } else if (player.x > maxX) {
      faceLeft = false;
      enemy.lastRelativeX = 1;
    } else if (enemy.lastRelativeX === -1 || enemy.lastRelativeX === 1) {
      faceLeft = enemy.lastRelativeX < 0;
    } else if (typeof enemy.lastMoveDx === "number" && enemy.lastMoveDx !== 0) {
      faceLeft = enemy.lastMoveDx < 0;
    } else if (player.x !== centerX) {
      faceLeft = player.x < centerX;
      enemy.lastRelativeX = faceLeft ? -1 : 1;
    } else if (typeof enemy.facingLeft === "boolean") {
      faceLeft = enemy.facingLeft;
    } else {
      faceLeft = false;
    }

    enemy.facingLeft = faceLeft;
    enemy.flipX = faceLeft;
    enemy.facing = faceLeft ? "left" : "right";
    return faceLeft;
  }

  orientEnemyTowardsPlayer(enemy, player = this.player) {
    return Renderer.orientEnemyTowardsPlayer(enemy, player);
  }

  playEnemyAnim(enemy, state) {
    if (!enemy || enemy.anim?.state === "death") return;
    if (state === "attack" || state === "hurt") {
      this.orientEnemyTowardsPlayer(enemy, this.player);
    }
    enemy.anim = { state, startedAt: performance.now() };
    this.keepAnimating(ENEMY_ANIM_MS[state] * 8);
  }

  startEnemyDeath(enemy) {
    if (!enemy) return;
    this.orientEnemyTowardsPlayer(enemy, this.player);
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

  showFloatingNumber(x, y, text, type, isCritical = false) {
    this.floatingNumbers.push({ x, y, text, type, isCritical: !!isCritical, startedAt: performance.now() });
    this.keepAnimating(1000);
  }

  drawPixelExplosionIcon(targetCtx, cx, cy) {
    const p = 2;
    const outer = [
      [-3, -3], [0, -4], [3, -3],
      [-4, 0],           [4, 0],
      [-3, 3],  [0, 4],  [3, 3],
      [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
      [-2, -1],                             [2, -1],
      [-2, 0],                              [2, 0],
      [-2, 1],                              [2, 1],
      [-2, 2],  [-1, 2],  [0, 2],  [1, 2],  [2, 2]
    ];
    const mid = [
      [0, -3], [-3, 0], [3, 0], [0, 3],
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],           [1, 0],
      [-1, 1],  [0, 1],  [1, 1]
    ];
    const core = [[0, 0]];

    targetCtx.save();
    targetCtx.fillStyle = "#101010";
    outer.forEach(([dx, dy]) => {
      targetCtx.fillRect(Math.round(cx + dx * p - p / 2) - 1, Math.round(cy + dy * p - p / 2) - 1, p + 2, p + 2);
    });
    targetCtx.fillStyle = "#ff2d20";
    outer.forEach(([dx, dy]) => {
      targetCtx.fillRect(Math.round(cx + dx * p - p / 2), Math.round(cy + dy * p - p / 2), p, p);
    });
    targetCtx.fillStyle = "#ff9f1c";
    mid.forEach(([dx, dy]) => {
      targetCtx.fillRect(Math.round(cx + dx * p - p / 2), Math.round(cy + dy * p - p / 2), p, p);
    });
    targetCtx.fillStyle = "#fff3b0";
    core.forEach(([dx, dy]) => {
      targetCtx.fillRect(Math.round(cx + dx * p - p / 2), Math.round(cy + dy * p - p / 2), p, p);
    });
    targetCtx.restore();
  }

  drawFloatingNumbers(targetCtx, now) {
    this.floatingNumbers = this.floatingNumbers.filter(number => now - number.startedAt < 1000);
    const tileSize = CAMERA_CONFIG.tileSize;
    const placedLabels = [];
    const startingAngles = { damage: -Math.PI / 2, gold: -Math.PI / 4, healing: -3 * Math.PI / 4, shield: -5 * Math.PI / 8 };
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
      const textWidth = targetCtx.measureText(number.text).width;
      const critIconSpace = number.isCritical ? 18 : 0;
      const labelWidth = textWidth + 6 + critIconSpace;
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
      const textCenterX = number.isCritical ? (position.x + critIconSpace / 2) : position.x;
      if (number.isCritical) {
        const iconCenterX = textCenterX - textWidth / 2 - 9;
        this.drawPixelExplosionIcon(targetCtx, iconCenterX, position.y);
      }
      targetCtx.fillStyle = number.type === "healing"
        ? "#5cff78"
        : (number.type === "shield" ? "#60d5ff" : (number.type === "gold" ? "#ffdf55" : "#ff5757"));
      targetCtx.strokeText(number.text, textCenterX, position.y);
      targetCtx.fillText(number.text, textCenterX, position.y);
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
    const image = this.loadSheetImage(PROJECTILE_SHEET.src);
    if (!image) return null;
    const panelRect = PROJECTILE_SHEET.panels?.[caliber]?.[phase];
    if (panelRect) {
      return this.getKeyedSprite(image, panelRect, "magenta", { trim: true });
    }
    if (this.projectileRows === undefined) {
      this.projectileRows = this.segmentSheet(image, { trimFrames: true });
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
      const w = Math.max(1, Math.round(sprite.width * scale));
      const h = Math.max(1, Math.round(sprite.height * scale));
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.globalAlpha = alpha;
      targetCtx.translate(Math.round(center.x), Math.round(center.y));
      targetCtx.rotate(angle);
      targetCtx.drawImage(sprite, -Math.round(w / 2), -Math.round(h / 2), w, h);
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
    if (!config) return null;
    const image = this.ensureEffectImage(sheetKey);
    if (!image || !image.complete || image.naturalWidth === 0) return null;

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

    if (enemy.anim && (enemy.anim.state === "attack" || enemy.anim.state === "hurt")) {
      this.orientEnemyTowardsPlayer(enemy, this.player);
    }

    if (!animation) {
      targetCtx.fillStyle = enemy.isBoss ? "#cc0029" : "#ff3333";
      targetCtx.fillRect(px + 2, py + 2, drawSize - 4, drawSize - 4);
      return;
    }

    const sprite = this.getEnemyFrame(enemy, animation, performance.now());
    const isWideBoss = enemy.size >= 2 && animation.refWidth > animation.refHeight * 1.3;
    const fitWidth = isWideBoss ? drawSize * 1.14 : drawSize * 1.04;
    const fitHeight = drawSize * 1.04;
    const scale = Math.min(fitWidth / animation.refWidth, fitHeight / animation.refHeight);
    const width = Math.max(1, Math.round(sprite.width * scale));
    const height = Math.max(1, Math.round(sprite.height * scale));
    const anchorX = (sprite.footAnchorX ?? sprite.width / 2) * scale;
    const centerX = px + drawSize / 2;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.fillStyle = "rgba(0, 0, 0, 0.38)";
    targetCtx.beginPath();
    const shadowY = isWideBoss ? (py + drawSize * 0.84) : (py + drawSize - 3);
    targetCtx.ellipse(centerX, shadowY, drawSize * 0.32, drawSize * 0.11, 0, 0, Math.PI * 2);
    targetCtx.fill();

    const flipHorizontally = !!(enemy.facingLeft || enemy.flipX);
    if (flipHorizontally) {
      targetCtx.translate(centerX, 0);
      targetCtx.scale(-1, 1);
      targetCtx.translate(-centerX, 0);
    }

    const drawX = Math.round(Math.max(px - drawSize * 0.65, Math.min(px + drawSize * 1.65 - width, centerX - anchorX)));
    const drawY = isWideBoss
      ? Math.round(py + (drawSize - height) * 0.55)
      : Math.round(py + drawSize - height);
    targetCtx.drawImage(sprite, drawX, drawY, width, height);
    targetCtx.restore();
  }

  drawGoldenBunny(targetCtx, bunny, screenX, screenY) {
    if (!this.goldenBunnySheet) {
      this.goldenBunnySheet = this.loadTerrainTexture("Assets/Enemy/Golden-bunny.jpg");
    }
    const fleeing = bunny.isFleeing;
    const frame = fleeing
      ? BUNNY_SPRITES.bunnyFlee[Math.floor((performance.now() - bunny.fleeStartedAt) / 120) % BUNNY_SPRITES.bunnyFlee.length]
      : BUNNY_SPRITES.bunnyIdle;
    const sprite = this.getKeyedSprite(this.goldenBunnySheet, frame, "black", { trim: true });
    if (!sprite) return;

    const tileSize = CAMERA_CONFIG.tileSize;
    const scale = Math.min((tileSize * 0.88) / sprite.width, (tileSize * 0.88) / sprite.height);
    const width = Math.max(1, Math.round(sprite.width * scale));
    const height = Math.max(1, Math.round(sprite.height * scale));
    const px = Math.round(screenX * tileSize + (tileSize - width) / 2);
    const py = Math.round(screenY * tileSize + tileSize - height - 2);
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
    if (!this.merchantSpriteSheet) {
      this.merchantSpriteSheet = this.loadTerrainTexture("Assets/Enemy/merchant.png");
    }
    const tileSize = CAMERA_CONFIG.tileSize;
    const frameIdx = (Math.floor(performance.now() / 1600) % 5 === 4) ? 1 : 0;
    const frame = MERCHANT_SPRITES[frameIdx] || MERCHANT_SPRITES[0];
    const sprite = this.getKeyedSprite(this.merchantSpriteSheet, frame, "gray", { trim: true });
    if (sprite) {
      const height = Math.max(1, Math.round(tileSize * 1.22));
      const width = Math.max(1, Math.round(height * (sprite.width / sprite.height)));
      const drawX = Math.round(px + (tileSize - width) / 2);
      const drawY = Math.round(py + tileSize - height);
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
      targetCtx.beginPath();
      targetCtx.ellipse(px + tileSize / 2, py + tileSize - 3, tileSize * 0.34, tileSize * 0.12, 0, 0, Math.PI * 2);
      targetCtx.fill();
      targetCtx.drawImage(sprite, drawX, drawY, width, height);
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
    return this.ensureThemeLoaded(themeIndex);
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
      targetCtx.drawImage(theme.wallOverlayAtlas, ov.x, ov.y, ov.w, ov.h,
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

  drawBlueChestSprite(targetCtx, px, py, opacity, frameIndex = 0) {
    const chests = this.mapDecorations.chests;
    if (!chests.complete || chests.naturalWidth === 0) return;
    const frame = BLUE_CHEST_SPRITES[frameIndex] || BLUE_CHEST_SPRITES[0];
    targetCtx.save();
    targetCtx.globalAlpha = opacity;
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(chests, frame.x, frame.y, frame.w, frame.h, px + 5, py + 5,
      CAMERA_CONFIG.tileSize - 10, CAMERA_CONFIG.tileSize - 10);
    targetCtx.restore();
  }

  drawBlueChestOpeningFrame(targetCtx, playerScreenX, playerScreenY) {
    if (!this.blueChestOpening) return;
    const { screenX, screenY } = CameraTransformer.worldToScreen(
      this.blueChestOpening.x, this.blueChestOpening.y, this.player
    );
    if (screenX < 0 || screenX >= CAMERA_CONFIG.cols || screenY < 0 || screenY >= CAMERA_CONFIG.rows) return;
    if (!VisibilitySystem.hasLineOfSight(
      playerScreenX, playerScreenY, screenX, screenY, this.dungeon, this.player
    )) return;

    const frameIndex = Math.min(BLUE_CHEST_SPRITES.length - 1,
      Math.floor((performance.now() - this.blueChestOpening.startedAt) / 90));
    this.drawBlueChestSprite(targetCtx, screenX * CAMERA_CONFIG.tileSize,
      screenY * CAMERA_CONFIG.tileSize, 1, frameIndex);
  }

  playBlueChestOpening(x, y) {
    if (this.blueChestOpeningFrame !== null) cancelAnimationFrame(this.blueChestOpeningFrame);
    const opening = { x, y, startedAt: performance.now() };
    this.blueChestOpening = opening;
    const animate = () => {
      if (this.blueChestOpening !== opening) return;
      if (performance.now() - opening.startedAt >= BLUE_CHEST_SPRITES.length * 90) {
        this.blueChestOpening = null;
        this.blueChestOpeningFrame = null;
        this.redrawCurrentView();
        return;
      }
      this.redrawCurrentView();
      this.blueChestOpeningFrame = requestAnimationFrame(animate);
    };
    animate();
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

      const frames = pickup.type === "gold"
        ? PICKUP_SPRITES.coins
        : (pickup.type === "shield_potion" ? PICKUP_SPRITES.shieldPotion : PICKUP_SPRITES.potion);
      const frame = frames[Math.floor(now / 100) % frames.length];
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
      const drawX = Math.round((px + tileSize / 2) - footAnchorX);
      const drawY = Math.round(footBaselineY - renderH);
      targetCtx.drawImage(sprite, drawX, drawY, Math.max(1, Math.round(renderW)), Math.max(1, Math.round(renderH)));
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
          } else if (tile === TILE_BLUE_CHEST) {
            mCtx.fillStyle = "#38bdf8";
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

  pruneUnusedEnemyCache() {
    if (this.enemyAnimCache.size <= 16) return;
    const activeSrcs = new Set(
      (this.dungeon?.enemies || []).map(e => e.spriteSrc).filter(Boolean)
    );
    for (const key of this.enemyAnimCache.keys()) {
      if (this.enemyAnimCache.size <= 12) break;
      if (!activeSrcs.has(key)) {
        this.enemyAnimCache.delete(key);
      }
    }
  }

  setDungeon(dungeon, generator) {
    this.dungeon = dungeon;
    this.generator = generator;
    this.bossPresentation = null;
    this.roarEffects = [];
    this.pruneUnusedEnemyCache();
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
        const isBossSpotlight = !!(
          this.bossPresentation &&
          Math.hypot(worldCoord.x - this.bossPresentation.focusWorldX, worldCoord.y - this.bossPresentation.focusWorldY) <= 3.6
        );
        const isMistySpotlight = !!(
          this.game?.mistyStepPreview &&
          !this.game.mistyStepPreview.canceled &&
          Math.hypot(worldCoord.x - this.game.mistyStepPreview.x, worldCoord.y - this.game.mistyStepPreview.y) <= 1.5
        );
        const inLineOfSight = isPlayerCell || isBossSpotlight || isMistySpotlight || VisibilitySystem.hasLineOfSight(
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
        } else if (tileType === TILE_BLUE_CHEST) {
          this.drawEnhancedFloorCell(targetCtx, theme, worldCoord.x, worldCoord.y, px, py, tileSize, inLineOfSight, frameNow);
          this.drawBlueChestSprite(targetCtx, px, py, inLineOfSight ? 1 : 0.42);
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
    this.drawBlueChestOpeningFrame(targetCtx, playerScreenX, playerScreenY);
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

      if (this.bossPresentation && this.bossPresentation.enemy === enemy) {
        hasVisibleCell = true;
      }
      if (!hasVisibleCell) return;
      if (minScreenX + enemy.size <= 0 || minScreenX >= cols || minScreenY + enemy.size <= 0 || minScreenY >= rows) return;

      this.drawEnemySprite(targetCtx, enemy, minScreenX * tileSize, minScreenY * tileSize);
    });

    this.drawRoarEffects(targetCtx, frameNow);

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
    const rawDamage = Math.max(0, Math.floor(incomingDamage));
    if (rawDamage <= 0) {
      return {
        rawDamage: 0,
        mitigatedDamage: 0,
        effectiveDamage: 0,
        shieldConsumed: 0,
        extraDamage: 0,
        hpDamage: 0,
        totalDamage: 0
      };
    }

    let effectiveDamage = rawDamage;
    let mitigatedDamage = 0;
    let shieldConsumed = 0;

    if ((player.shieldSegments || 0) > 0) {
      player.shieldSegments = Math.max(0, player.shieldSegments - 1);
      shieldConsumed = 1;
      // Redondeo coherente hacia arriba del daño reducido para evitar que impactos de 1 de daño se anulen a 0:
      // 20 -> 10, 42 -> 21, 3 -> 2, 1 -> 1.
      effectiveDamage = Math.max(1, Math.ceil(rawDamage / 2));
      mitigatedDamage = rawDamage - effectiveDamage;
      if (game?.stats) {
        game.stats.shieldSegmentsConsumed++;
        game.stats.shieldDamageMitigated += mitigatedDamage;
      }
    }

    let remaining = effectiveDamage;
    const extraDamage = Math.min(player.extraHp || 0, remaining);
    player.extraHp = Math.max(0, (player.extraHp || 0) - extraDamage);
    remaining -= extraDamage;
    const hpDamage = Math.min(player.hp, remaining);
    player.hp = Math.max(0, player.hp - hpDamage);
    const totalDamage = extraDamage + hpDamage;

    if (totalDamage > 0 || shieldConsumed > 0) {
      if (totalDamage > 0 && game?.stats) {
        game.stats.damageTakenInstances++;
        game.stats.totalDamageTaken += totalDamage;
      }
      const floatLabel = shieldConsumed > 0
        ? `-${totalDamage} HP (🛡-${mitigatedDamage})`
        : `-${totalDamage} HP`;
      game?.renderer?.showFloatingNumber(player.x, player.y, floatLabel, "damage");
      if (player.hp <= 0) {
        game?.clearSavedGame?.();
      } else {
        game?.syncBiomeMusic?.();
      }
      game?.updateHUD?.();
      if (game?.isShopOpen?.()) game.updateShopHUD();
    }
    return {
      rawDamage,
      mitigatedDamage,
      effectiveDamage,
      shieldConsumed,
      extraDamage,
      hpDamage,
      totalDamage
    };
  }

  static applyDamageToEnemy(game, target, incomingDamage, animate = true) {
    if (!target || target.hp <= 0) return 0;
    if (game?.player) {
      Renderer.orientEnemyTowardsPlayer(target, game.player);
    }
    const damage = Math.min(target.hp, Math.max(0, Math.floor(incomingDamage)));
    target.hp = Math.max(0, target.hp - damage);
    if (animate && target.hp > 0) game.renderer?.playEnemyAnim(target, "hurt");
    return damage;
  }

  static applyBlunderbussKnockback(game, target, maxPushSteps = 2) {
    if (target.size !== 1 || target.hp <= 0) return { moved: false, stepsMoved: 0, hitWall: false };

    const dx = Math.sign(target.x - game.player.x);
    const dy = Math.sign(target.y - game.player.y);
    if (dx === 0 && dy === 0) return { moved: false, stepsMoved: 0, hitWall: false };

    const { dungeon, player } = game;
    let curX = target.x;
    let curY = target.y;
    let stepsMoved = 0;
    let hitWall = false;

    for (let step = 1; step <= maxPushSteps; step++) {
      const nextX = curX + dx;
      const nextY = curY + dy;

      if (!dungeon.isInsideBounds(nextX, nextY)) {
        hitWall = true;
        break;
      }

      const tile = dungeon.getTile(nextX, nextY);
      const lockedExit = tile === TILE_EXIT && dungeon.enemies.some(enemy => enemy.hp > 0);
      if (tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS || lockedExit) {
        hitWall = true;
        break;
      }

      if (nextX === player.x && nextY === player.y) {
        break;
      }

      const occupied = dungeon.enemies.some(enemy => enemy !== target && enemy.hp > 0
        && enemy.cells?.some(cell => cell.x === nextX && cell.y === nextY));
      if (occupied) {
        break;
      }

      curX = nextX;
      curY = nextY;
      stepsMoved++;
    }

    if (stepsMoved > 0) {
      target.x = curX;
      target.y = curY;
      target.cells = [{ x: curX, y: curY }];
    }

    return { moved: stepsMoved > 0, stepsMoved, hitWall };
  }

  static rollWeaponDamageBreakdown(player, weapon = player.equippedWeapon) {
    const weaponId = weapon.id;
    const level = Math.max(0, Math.min(3, player.weaponUpgrades[weaponId] || 0));
    if (weaponId === "pistol" && level >= 2) {
      const normalDice = 2;
      const trueDice = level === 2 ? 1 : 2;
      const normalDamage = CombatSystem.rollDamageDice(normalDice, 6);
      const trueDamage = CombatSystem.rollDamageDice(trueDice, 6);
      return {
        normalDamage,
        trueDamage,
        totalDamage: normalDamage + trueDamage
      };
    }
    const [diceCount, dieSides] = WEAPON_DAMAGE_BY_UPGRADE[weaponId][level];
    const normalDamage = CombatSystem.rollDamageDice(diceCount, dieSides);
    return {
      normalDamage,
      trueDamage: 0,
      totalDamage: normalDamage
    };
  }

  static rollAttack(game, target, weapon = game.player.equippedWeapon) {
    if (target && game?.player) {
      Renderer.orientEnemyTowardsPlayer(target, game.player);
    }
    const result = CombatSystem.resolveD20Attack(game.player, target, game.hitBonus);
    if (!result) return false;
    if (result.fumble) {
      game.log(TEXT.logs.criticalMiss("Lior"));
      game.player.stunned = true;
      return true;
    }

    const dmgBreakdown = CombatSystem.rollWeaponDamageBreakdown(game.player, weapon);

    if (!result.hit) {
      if (dmgBreakdown.trueDamage > 0) {
        const damage = CombatSystem.applyDamageToEnemy(game, target, dmgBreakdown.trueDamage);
        if (game?.stats && weapon.id === "pistol") {
          game.stats.pistolHits++;
        }
        if (damage > 0) {
          game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage", false);
        }
        game.log(TEXT.logs.attackHit(result.total, target.ac, damage, target.name, target.hp));
        return false;
      }
      game.log(TEXT.logs.attackDefended(result.total, target.ac, target.name));
      return false;
    }

    let knockbackResult = null;
    if (weapon.id === "blunderbuss") {
      knockbackResult = CombatSystem.applyBlunderbussKnockback(game, target, 2);
    }

    const isCriticalHit = !!(result.critical || (weapon.id === "blunderbuss" && knockbackResult?.hitWall));
    const baseDamage = dmgBreakdown.totalDamage;
    const rolledDamage = isCriticalHit ? Math.ceil(baseDamage * 1.5) : baseDamage;
    const damage = CombatSystem.applyDamageToEnemy(game, target, rolledDamage);
    if (game?.stats) {
      if (weapon.isMelee) game.stats.swordHits++;
      else if (weapon.id === "pistol") game.stats.pistolHits++;
      else if (weapon.id === "musket") game.stats.musketHits++;
      else if (weapon.id === "blunderbuss") game.stats.blunderbussHits++;
    }
    if (damage > 0) {
      game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage", isCriticalHit);
    }
    game.log(TEXT.logs.attackHit(result.total, target.ac, damage, target.name, target.hp));
    return false;
  }

  static rollWeaponDamage(player, weapon = player.equippedWeapon) {
    return CombatSystem.rollWeaponDamageBreakdown(player, weapon).totalDamage;
  }

  static processDeaths(game, targets) {
    const dead = targets.filter(enemy => enemy.hp <= 0);
    if (dead.length === 0) return [];

    const deadIds = new Set(dead.map(enemy => enemy.id));
    game.dungeon.enemies = game.dungeon.enemies.filter(enemy => !deadIds.has(enemy.id));
    dead.forEach(enemy => {
      if (game?.stats) {
        game.stats.killsTotal++;
        if (enemy.isMegaBoss) {
          game.stats.killsMegaBosses++;
          if (enemy.originTier === 10 || game.floor === 100) {
            game.stats.solarDragonDefeated = true;
            game.spawnBlueChest(enemy.x, enemy.y);
          }
        } else if (enemy.isBoss) {
          game.stats.killsMiniBosses++;
        } else {
          game.stats.killsMinions++;
        }
        game.stats.killsByName[enemy.name] = (game.stats.killsByName[enemy.name] || 0) + 1;
      }
      if (enemy.isMegaBoss) {
        game.player.highestMegaBossTierDefeated = Math.max(
          game.player.highestMegaBossTierDefeated,
          enemy.spawnTier || enemy.originTier || 1
        );
      }
      game.player.kills++;
      // Los esbirros invocados repetidamente por megajefes (isSummoned === true) no sueltan oro ni pociones
      // para impedir el farmeo infinito de escudo o recursos en salas de jefe.
      if (!enemy.isSummoned) {
        const dropChance = enemy.isMegaBoss ? 1 : (enemy.isBoss ? 0.5 : 0.25);
        if (enemy.isMegaBoss || Math.random() < dropChance) {
          const goldDrop = enemy.isMegaBoss ? 10 : (enemy.isBoss ? rollDie(3) : rollDie(2));
          game.spawnPickup("gold", enemy.x, enemy.y, goldDrop);
        }
        if (enemy.size === 1 && !enemy.isBoss) {
          const pickPotionType = () => (Math.random() < 0.35 ? "shield_potion" : "potion");
          if (game.dungeon?.isBossRoom || game.floor % 10 === 0) {
            game.player.minionKillsSincePotion++;
            if (game.player.minionKillsSincePotion >= 16) {
              game.player.minionKillsSincePotion = 0;
              game.spawnPickup(pickPotionType(), enemy.x, enemy.y);
            }
          } else if (Math.random() < 0.05) {
            game.spawnPickup(pickPotionType(), enemy.x, enemy.y);
          }
        }
      }
      game.renderer?.startEnemyDeath(enemy);
    });
    game?.syncBiomeMusic?.();
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
      if (game?.stats) game.stats.swordSwings++;
      targets = dungeon.enemies.filter(enemy =>
        enemy.cells && enemy.cells.some(cell => Math.hypot(cell.x - player.x, cell.y - player.y) <= 1.5)
      );
      if (targets.length === 0) game.log(TEXT.logs.swordWhiff);
    } else {
      player[weapon.ammoProperty]--;
      if (game?.stats) {
        if (weapon.id === "pistol") game.stats.pistolShots++;
        else if (weapon.id === "musket") game.stats.musketShots++;
        else if (weapon.id === "blunderbuss") game.stats.blunderbussShots++;
      }
      if (player[weapon.ammoProperty] <= 0) player.equippedWeapon = WEAPONS.SWORD;
      sounds.playShot(weapon.id);
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

const _BOOT_TIMESTAMP = typeof performance !== "undefined" ? performance.now() : Date.now();

/**
 * GESTOR DE PRECARGA PROGRESIVA Y ASÍNCRONA DURANTE LA INTRODUCCIÓN NARRATIVA (Sección 4):
 * - Divide los recursos en Críticos (indispensables para el Piso 1, Lior, HUD, SFX básicos y Bioma 1)
 *   y Secundarios (efectos de armas avanzadas, enemigos de pisos posteriores, biomas 2 y 3, pistas MIDI futuras).
 * - Ejecuta pequeñas tareas asíncronas en segundo plano sin bloquear el hilo principal ni congelar la presentación.
 * - Precarga archivos de audio y MIDI en silencio sin reproducirlos anticipadamente.
 */
class ResourcePreloader {
  constructor(game) {
    this.game = game;
    this.criticalTasks = [];
    this.secondaryTasks = [];
    this.queuedKeys = new Set();
    this.completedKeys = new Set();

    this.criticalTotal = 0;
    this.criticalDone = 0;
    this.secondaryTotal = 0;
    this.secondaryDone = 0;

    this.criticalReady = false;
    this.allReady = false;
    this.isRunning = false;
    this.stepTimer = null;
    this.criticalResolvers = [];
    this.progressListeners = new Set();

    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    this.metrics = {
      bootStartedAt: _BOOT_TIMESTAMP,
      preloaderCreatedAt: now,
      introShownAt: null,
      criticalReadyAt: null,
      secondaryReadyAt: null,
      floor1ReadyAt: null
    };
    if (typeof window !== "undefined") {
      window.__liorLoadMetrics = this.metrics;
    }
  }

  waitForImage(img, timeoutMs = 450) {
    if (!img) return Promise.resolve(false);
    if (img.complete && img.naturalWidth > 0) return Promise.resolve(true);
    return new Promise(resolve => {
      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(ok);
      };
      const timer = setTimeout(() => done(false), timeoutMs);
      img.addEventListener("load", () => done(true), { once: true });
      img.addEventListener("error", () => done(false), { once: true });
    });
  }

  enqueueTask(key, fn, isCritical = false) {
    if (!key || this.queuedKeys.has(key) || this.completedKeys.has(key)) return;
    this.queuedKeys.add(key);
    const task = { key, fn, isCritical };
    if (isCritical) {
      this.criticalTasks.push(task);
      this.criticalTotal++;
      this.criticalReady = false;
    } else {
      this.secondaryTasks.push(task);
      this.secondaryTotal++;
      this.allReady = false;
    }
  }

  prepareImageAndRun(img, onReady) {
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      try { onReady(); } catch {}
    } else {
      img.addEventListener("load", () => {
        setTimeout(() => { try { onReady(); } catch {} }, 0);
      }, { once: true });
    }
  }

  buildInitialQueues() {
    const renderer = this.game?.renderer;

    // --- 1. RECURSOS CRÍTICOS (Piso 1, Lior, Bioma 1, SFX de acciones y rugido 1-4) ---
    this.enqueueTask("midi:intro", () => sounds.preloadMidiTrack("intro"), true);
    this.enqueueTask("midi:biome1", () => sounds.preloadMidiTrack("biome1"), true);

    this.enqueueTask("img:biome1", () => {
      renderer?.ensureThemeLoaded(0);
    }, true);

    this.enqueueTask("img:lior-sheets", () => {
      if (!renderer) return;
      this.prepareImageAndRun(renderer.liorSheet, () => {
        LIOR_SPRITES.IDLE.forEach(rect => renderer.getLiorFrame(rect));
      });
      this.prepareImageAndRun(renderer.lior2Sheet, () => {
        if (LIOR2_REFERENCE.front) renderer.getLiorFrame(LIOR2_REFERENCE.front);
        if (LIOR2_REFERENCE.side) renderer.getLiorFrame(LIOR2_REFERENCE.side);
      });
    }, true);

    this.enqueueTask("frames:lior-actions", () => {
      if (!renderer) return;
      this.prepareImageAndRun(renderer.liorSheet, () => {
        LIOR_SPRITES.WALK.slice(0, 4).forEach(rect => renderer.getLiorFrame(rect));
        LIOR_SPRITES.SWORD_SPIN.forEach(rect => renderer.getLiorFrame(rect));
        LIOR_SPRITES.HURT.forEach(rect => renderer.getLiorFrame(rect));
      });
    }, true);

    // Enemigos presentes en el Piso 1 + Kobold y Ogro base del Tier 1
    const floor1EnemySrcs = new Set([
      ENEMY_ROSTER.minion[0]?.src,
      ENEMY_ROSTER.miniBoss[0]?.src,
      ...((this.game?.dungeon?.enemies || []).map(e => e.spriteSrc))
    ].filter(Boolean));

    for (const src of floor1EnemySrcs) {
      this.enqueueTask(`enemy:critical:${src}`, () => {
        if (!renderer) return;
        const img = renderer.loadTerrainTexture(src);
        renderer.enemyImages.set(src, img);
        this.prepareImageAndRun(img, () => renderer.getEnemyAnimation(src));
      }, true);
    }

    // SFX críticos de acciones básicas y rugido de pisos 1-4 (sin reproducirlos)
    const criticalSfxList = [
      AUDIO_FILES.actions.pistol,
      AUDIO_FILES.actions.musket,
      AUDIO_FILES.actions.blunderbuss,
      AUDIO_FILES.actions.eldritchBlast,
      AUDIO_FILES.actions.mistyStep,
      AUDIO_FILES.actions.heal,
      AUDIO_FILES.actions.liorHurt,
      AUDIO_FILES.actions.coinPick,
      AUDIO_FILES.actions.pickup,
      AUDIO_FILES.monster.floors1to4
    ];
    criticalSfxList.forEach(src => {
      this.enqueueTask(`sfx:critical:${src}`, () => sounds.preloadAudioFile(src), true);
    });

    // --- 2. RECURSOS SECUNDARIOS (Efectos de armas, proyectiles, NPCs, pisos y jefes posteriores) ---
    Object.keys(EFFECT_SHEETS).forEach(sheetKey => {
      this.enqueueTask(`effect:${sheetKey}`, () => {
        if (!renderer) return;
        const img = renderer.ensureEffectImage(sheetKey);
        this.prepareImageAndRun(img, () => {
          for (let phase = 0; phase < 3; phase++) {
            renderer.getEffectSprite(sheetKey, phase);
          }
        });
      }, false);
    });

    this.enqueueTask("projectiles:sheet", () => {
      if (!renderer) return;
      const img = renderer.loadTerrainTexture(PROJECTILE_SHEET.src);
      renderer.enemyImages.set(PROJECTILE_SHEET.src, img);
      this.prepareImageAndRun(img, () => renderer.getProjectileSprite("small", 1));
    }, false);

    this.enqueueTask("npcs:sheets", () => {
      if (!renderer) return;
      renderer.ensureNpcSheetsLoaded();
    }, false);

    ["shop", "crisis", "special_10_50", "biome2", "special_60_90", "biome3", "final_dragon"].forEach(trackId => {
      this.enqueueTask(`midi:secondary:${trackId}`, () => sounds.preloadMidiTrack(trackId), false);
    });

    [
      AUDIO_FILES.monster.floors5to9,
      AUDIO_FILES.monster.dragon,
      AUDIO_FILES.gameOverEffect,
      AUDIO_FILES.gameOverSong
    ].forEach(src => {
      const decodeBuffer = !src.endsWith(".wav");
      this.enqueueTask(`sfx:secondary:${src}`, () => sounds.preloadAudioFile(src, { decodeBuffer }), false);
    });

    // Precargar enemigos cercanos (Tiers 1-2 y primer jefe 4x4 de Piso 10)
    const nearEnemySrcs = [
      ENEMY_ROSTER.minion[1]?.src,
      ENEMY_ROSTER.minion[2]?.src,
      ENEMY_ROSTER.miniBoss[1]?.src,
      ENEMY_ROSTER.megaBoss[0]?.src
    ].filter(Boolean);

    nearEnemySrcs.forEach(src => {
      this.enqueueTask(`enemy:secondary:${src}`, () => {
        if (!renderer) return;
        const img = renderer.loadTerrainTexture(src);
        renderer.enemyImages.set(src, img);
        this.prepareImageAndRun(img, () => renderer.getEnemyAnimation(src));
      }, false);
    });

    this.enqueueTask("theme:biome2", () => { renderer?.ensureThemeLoaded(1); }, false);
    this.enqueueTask("theme:biome3", () => { renderer?.ensureThemeLoaded(2); }, false);
  }

  start() {
    if (!this.initialQueuesBuilt) {
      this.initialQueuesBuilt = true;
      this.buildInitialQueues();
    }
    if (this.isRunning && this.stepTimer !== null) return;
    this.isRunning = true;
    this.scheduleNext(8);
  }

  scheduleNext(delayMs = 12) {
    if (!this.isRunning) return;
    clearTimeout(this.stepTimer);
    this.stepTimer = setTimeout(() => this.runStep(), delayMs);
  }

  notifyProgress() {
    this.progressListeners.forEach(listener => {
      try { listener(this.getCriticalProgressPercent()); } catch {}
    });
  }

  getCriticalProgressPercent() {
    if (this.criticalTotal <= 0) return 100;
    return Math.min(100, Math.round((this.criticalDone / this.criticalTotal) * 100));
  }

  async runStep() {
    if (!this.isRunning) return;

    if (this.criticalTasks.length > 0) {
      const task = this.criticalTasks.shift();
      try {
        await task.fn();
      } catch {}
      this.completedKeys.add(task.key);
      this.criticalDone++;
      this.notifyProgress();

      if (this.criticalTasks.length === 0 && !this.criticalReady) {
        this.markCriticalReady();
      }
      this.scheduleNext(10);
      return;
    }

    if (!this.criticalReady) {
      this.markCriticalReady();
    }

    if (this.secondaryTasks.length > 0) {
      const task = this.secondaryTasks.shift();
      try {
        await task.fn();
      } catch {}
      this.completedKeys.add(task.key);
      this.secondaryDone++;
      this.scheduleNext(18);
      return;
    }

    this.allReady = true;
    this.isRunning = false;
    if (!this.metrics.secondaryReadyAt) {
      this.metrics.secondaryReadyAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    }
  }

  markCriticalReady() {
    this.criticalReady = true;
    if (!this.metrics.criticalReadyAt) {
      this.metrics.criticalReadyAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    }
    const resolvers = this.criticalResolvers.splice(0);
    resolvers.forEach(r => { try { r(true); } catch {} });
  }

  hasPendingNetworkCritical() {
    const renderer = this.game?.renderer;
    if (!renderer) return false;
    const theme0 = renderer.ensureThemeLoaded(0);
    const criticalImgs = [
      renderer.liorSheet,
      renderer.lior2Sheet,
      theme0?.wallAtlas
    ].filter(Boolean);
    return criticalImgs.some(img => !img.complete);
  }

  /**
   * Ejecuta de inmediato las preparaciones críticas cuyos recursos base ya estén disponibles en memoria,
   * garantizando que el Piso 1 comience con sus texturas y sprites listos sin añadir esperas artificiales.
   */
  ensureCriticalForImmediateStart() {
    const renderer = this.game?.renderer;
    if (renderer) {
      renderer.ensureThemeLoaded(0);
      if (renderer.liorSheet?.complete && renderer.liorSheet.naturalWidth > 0) {
        LIOR_SPRITES.IDLE.forEach(rect => renderer.getLiorFrame(rect));
      }
      if (renderer.lior2Sheet?.complete && renderer.lior2Sheet.naturalWidth > 0) {
        if (LIOR2_REFERENCE.front) renderer.getLiorFrame(LIOR2_REFERENCE.front);
        if (LIOR2_REFERENCE.side) renderer.getLiorFrame(LIOR2_REFERENCE.side);
      }
      (this.game?.dungeon?.enemies || []).forEach(enemy => {
        if (enemy.spriteSrc) {
          const img = renderer.loadTerrainTexture(enemy.spriteSrc);
          renderer.enemyImages.set(enemy.spriteSrc, img);
          if (img?.complete && img.naturalWidth > 0) {
            renderer.getEnemyAnimation(enemy.spriteSrc);
          }
        }
      });
    }
    if (!this.hasPendingNetworkCritical()) {
      this.markCriticalReady();
    }
    this.start();
  }

  waitForCritical(timeoutMs = 1000) {
    this.ensureCriticalForImmediateStart();
    if (this.criticalReady) return Promise.resolve(true);

    return new Promise(resolve => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        this.markCriticalReady();
        resolve(true);
      };
      const timer = setTimeout(finish, timeoutMs);
      this.criticalResolvers.push(finish);
      const drainFast = async () => {
        while (this.criticalTasks.length > 0 && !settled) {
          const task = this.criticalTasks.shift();
          try { await task.fn(); } catch {}
          this.completedKeys.add(task.key);
          this.criticalDone++;
          this.notifyProgress();
        }
        finish();
      };
      drainFast();
    });
  }

  /**
   * Precarga de forma anticipada los recursos del piso actual y del próximo encuentro especial.
   */
  preloadForFloor(floorNumber = 1) {
    const renderer = this.game?.renderer;
    if (!renderer) return;

    const themeIdx = Math.min(2, Math.floor((Math.max(1, floorNumber) - 1) / 34));
    renderer.ensureThemeLoaded(themeIdx);

    const enemies = this.game?.dungeon?.enemies || [];
    enemies.forEach(enemy => {
      if (!enemy.spriteSrc) return;
      this.enqueueTask(`enemy:floor:${enemy.spriteSrc}`, () => {
        const img = renderer.loadTerrainTexture(enemy.spriteSrc);
        renderer.enemyImages.set(enemy.spriteSrc, img);
        this.prepareImageAndRun(img, () => renderer.getEnemyAnimation(enemy.spriteSrc));
      }, false);
    });

    const cycleFloor = ((Math.max(1, floorNumber) - 1) % 10) + 1;
    if (cycleFloor >= 4) {
      this.enqueueTask(`sfx:roar:5-9`, () => sounds.preloadAudioFile(AUDIO_FILES.monster.floors5to9), false);
    }
    if (floorNumber >= 88) {
      this.enqueueTask(`sfx:roar:dragon`, () => sounds.preloadAudioFile(AUDIO_FILES.monster.dragon), false);
      this.enqueueTask(`midi:final_dragon`, () => sounds.preloadMidiTrack("final_dragon"), false);
    }
    if (cycleFloor >= 8 || floorNumber % 10 === 0) {
      const bossIndex = Math.min(ENEMY_ROSTER.megaBoss.length - 1, Math.max(0, Math.ceil(floorNumber / 10) - 1));
      const bossEntry = ENEMY_ROSTER.megaBoss[bossIndex];
      if (bossEntry?.src) {
        this.enqueueTask(`enemy:boss:${bossEntry.src}`, () => {
          const img = renderer.loadTerrainTexture(bossEntry.src);
          renderer.enemyImages.set(bossEntry.src, img);
          this.prepareImageAndRun(img, () => renderer.getEnemyAnimation(bossEntry.src));
        }, false);
      }
    }
    this.start();
  }
}

const ENDING_PANELS = [
  {
    id: 1,
    crop: { x: 0, y: 0, w: 731, h: 390 },
    duration: 4500,
    text: "Tras conquistar los 100 pisos del calabozo, Lior emerge exhausta y ensangrentada a la superficie."
  },
  {
    id: 2,
    crop: { x: 733, y: 0, w: 579, h: 390 },
    duration: 4500,
    text: "En sus manos descansa el legendario objeto encomendado por su patrona: una fina tanga negra enjoyada."
  },
  {
    id: 3,
    crop: { x: 0, y: 393, w: 639, h: 377 },
    duration: 4500,
    text: "Junto a la prenda, una carta con el sello de la Dama del Dolor: «Para ti, de tu patrona. jeje ♥»"
  },
  {
    id: 4,
    crop: { x: 641, y: 393, w: 671, h: 377 },
    duration: 4800,
    text: "LIOR: «¿...Todo esto por esto?...»"
  },
  {
    id: 5,
    crop: { x: 0, y: 772, w: 1312, h: 427 },
    duration: 5200,
    text: "La luz del crepúsculo baña el horizonte. La misión ha concluido con un absurdo triunfo."
  }
];

class EndingCinematicController {
  constructor(game) {
    this.game = game;
    this.container = document.getElementById("ending-cinematic");
    this.canvas = document.getElementById("ending-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.textEl = document.getElementById("ending-text");
    this.progressEl = document.getElementById("ending-progress");
    this.skipBtn = document.getElementById("btn-skip-ending");

    this.isActive = false;
    this.panelIndex = 0;
    this.panelStartedAt = 0;
    this.prevPanelIndex = -1;
    this.rafId = null;
    this.onCompleteCallback = null;

    const endingCandidates = [
      "Ruinas góticas y diálogo de Lior.png",
      "Ruinas góticas y diálogo de lior.png",
      "Ruinas goticas y dialogo de Lior.png",
      "69486.png",
      "Assets/Video/Ruinas góticas y diálogo de Lior.png",
      "Assets/Video/69486.png"
    ];
    let candidateIdx = 0;
    this.sheetImage = new Image();
    this.sheetLoaded = false;
    this.sheetImage.addEventListener("load", () => {
      this.sheetLoaded = true;
    });
    this.sheetImage.addEventListener("error", () => {
      candidateIdx++;
      if (candidateIdx < endingCandidates.length) {
        this.sheetImage.src = endingCandidates[candidateIdx];
      }
    });
    this.sheetImage.src = endingCandidates[0];

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
      this.container.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
      this.container.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      }, { passive: false });
      this.container.addEventListener("touchend", (e) => {
        e.stopPropagation();
      }, { passive: false });
      this.container.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target.closest("#btn-skip-ending, #btn-ending-fullscreen, #btn-ending-music")) return;
        this.advanceOrReveal();
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (!this.isActive) return;
      if (document.hidden) {
        this.hiddenAt = performance.now();
      } else if (this.hiddenAt) {
        const pausedDuration = performance.now() - this.hiddenAt;
        this.panelStartedAt += pausedDuration;
        this.hiddenAt = null;
      }
    });
  }

  buildProgressDots() {
    if (!this.progressEl) return;
    this.progressEl.innerHTML = "";
    ENDING_PANELS.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "intro-dot";
      dot.setAttribute("data-idx", String(idx));
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
    sounds.playMusic("intro");
    this.showPanel(0);

    const loop = (now) => {
      if (!this.isActive) return;
      this.renderFrame(now);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  showPanel(index) {
    if (index >= ENDING_PANELS.length) {
      this.finish(false);
      return;
    }
    this.prevPanelIndex = this.panelIndex;
    this.panelIndex = index;
    this.panelStartedAt = performance.now();
    const panel = ENDING_PANELS[index];

    if (this.textEl) {
      this.textEl.textContent = panel.text;
    }
    this.updateProgressDots();
  }

  advanceOrReveal() {
    if (!this.isActive) return;
    if (this.game?.renderer?.isPortraitBlocked) return;
    const now = performance.now();
    if (now - this.panelStartedAt < 250) return;
    if (this.panelIndex + 1 < ENDING_PANELS.length) {
      this.showPanel(this.panelIndex + 1);
    } else {
      this.finish(false);
    }
  }

  renderPanelArtwork(targetCtx, panel, progress, alpha = 1) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    targetCtx.save();
    targetCtx.globalAlpha = alpha;

    if (this.sheetLoaded && this.sheetImage.naturalWidth > 0) {
      const { x, y, w, h } = panel.crop;
      const padTop = Math.max(44, Math.round(H * 0.12));
      const padBottom = Math.max(38, Math.round(H * 0.11));
      const padSides = Math.max(20, Math.round(W * 0.04));
      const availW = Math.max(120, W - padSides * 2);
      const availH = Math.max(100, H - padTop - padBottom);

      const fitScale = Math.min(availW / w, availH / h);
      const drawW = Math.round(w * fitScale);
      const drawH = Math.round(h * fitScale);
      const dx = Math.round((W - drawW) / 2);
      const dy = Math.round(padTop + (availH - drawH) / 2);

      const glow = targetCtx.createRadialGradient(
        W / 2, dy + drawH / 2, Math.min(drawW, drawH) * 0.15,
        W / 2, dy + drawH / 2, Math.max(drawW, drawH) * 0.75
      );
      glow.addColorStop(0, "rgba(180, 80, 140, 0.25)");
      glow.addColorStop(1, "rgba(4, 5, 12, 0)");
      targetCtx.fillStyle = glow;
      targetCtx.fillRect(0, 0, W, H);

      targetCtx.fillStyle = "#050711";
      targetCtx.fillRect(dx - 4, dy - 4, drawW + 8, drawH + 8);

      targetCtx.drawImage(this.sheetImage, x, y, w, h, dx, dy, drawW, drawH);

      targetCtx.strokeStyle = "#c084fc";
      targetCtx.lineWidth = 2;
      targetCtx.strokeRect(dx - 1, dy - 1, drawW + 2, drawH + 2);
      targetCtx.strokeStyle = "#4a1d6e";
      targetCtx.lineWidth = 1;
      targetCtx.strokeRect(dx - 4, dy - 4, drawW + 8, drawH + 8);
    } else {
      const grad = targetCtx.createRadialGradient(W / 2, H * 0.4, 20, W / 2, H / 2, W * 0.7);
      grad.addColorStop(0, "#4a1236");
      grad.addColorStop(1, "#08040d");
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(0, 0, W, H);
      targetCtx.fillStyle = "#ffd700";
      targetCtx.font = "bold 16px monospace";
      targetCtx.textAlign = "center";
      targetCtx.fillText("✦ EL ENCARGO DE LA DAMA DEL DOLOR ✦", W / 2, H / 2 - 20);
      targetCtx.font = "13px monospace";
      targetCtx.fillStyle = "#e2e8f0";
      targetCtx.fillText(panel.text, W / 2, H / 2 + 15);
    }

    targetCtx.restore();
  }

  renderFrame(now) {
    if (!this.ctx || !this.canvas) return;
    const { width: targetW, height: targetH } = getViewportMetrics();
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }

    const W = this.canvas.width;
    const H = this.canvas.height;
    const panel = ENDING_PANELS[this.panelIndex];
    if (!panel) return;

    const elapsed = now - this.panelStartedAt;
    const progress = Math.min(1, elapsed / panel.duration);

    // Avance manual exclusivamente: no avanzar automáticamente por tiempo

    this.ctx.fillStyle = "#03040a";
    this.ctx.fillRect(0, 0, W, H);

    if (elapsed < 300 && this.prevPanelIndex >= 0 && this.prevPanelIndex !== this.panelIndex) {
      const prevPanel = ENDING_PANELS[this.prevPanelIndex];
      if (prevPanel) {
        this.renderPanelArtwork(this.ctx, prevPanel, 1, 1 - elapsed / 300);
      }
      this.renderPanelArtwork(this.ctx, panel, progress, elapsed / 300);
    } else {
      this.renderPanelArtwork(this.ctx, panel, progress, 1);
    }

    this.ctx.save();
    this.particles.forEach(p => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      this.ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha * 0.45})`;
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
    if (typeof this.onCompleteCallback === "function") {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb(skipped);
    }
  }
}

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
    this.isWaitingForCritical = false;
    this.isWaitingForConfirmation = false;
    this.confirmationReadyAt = 0;
    this.panelIndex = 0;
    this.panelStartedAt = 0;
    this.prevPanelIndex = -1;
    this.rafId = null;
    this.onCompleteCallback = null;
    this.hiddenAt = null;

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
        if (!this.isWaitingForConfirmation) {
          this.panelIndex = NARRATIVE_PANELS.length - 1;
          this.showFinalConfirmation();
        } else {
          this.finish(true);
        }
      });
    }
    if (this.container) {
      this.container.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
      this.container.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      }, { passive: false });
      this.container.addEventListener("touchend", (e) => {
        e.stopPropagation();
      }, { passive: false });
      this.container.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target.closest("#btn-skip-intro, #btn-intro-fullscreen, #btn-intro-music")) return;
        this.advanceOrReveal();
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (!this.isActive) return;
      if (document.hidden) {
        this.hiddenAt = performance.now();
      } else if (this.hiddenAt) {
        const pausedDuration = performance.now() - this.hiddenAt;
        this.panelStartedAt += pausedDuration;
        this.hiddenAt = null;
      }
    });
  }

  buildProgressDots() {
    if (!this.progressEl) return;
    this.progressEl.innerHTML = "";
    NARRATIVE_PANELS.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "intro-dot";
      dot.setAttribute("data-idx", String(idx));
      this.progressEl.appendChild(dot);
    });
  }

  updateProgressDots() {
    if (!this.progressEl) return;
    this.progressEl.querySelectorAll(".intro-dot").forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === this.panelIndex);
      dot.classList.toggle("is-done", idx < this.panelIndex || this.isWaitingForConfirmation);
    });
  }

  start(onComplete) {
    if (!this.container || !this.canvas) {
      this.game?.preloader?.ensureCriticalForImmediateStart();
      if (onComplete) onComplete();
      return;
    }
    this.onCompleteCallback = onComplete;
    this.isActive = true;
    this.isWaitingForCritical = false;
    this.isWaitingForConfirmation = false;
    this.confirmationReadyAt = 0;
    this.panelIndex = 0;
    this.prevPanelIndex = -1;
    if (this.game?.preloader) {
      this.game.preloader.metrics.introShownAt = typeof performance !== "undefined" ? performance.now() : Date.now();
      this.game.preloader.start();
    }
    this.buildProgressDots();
    this.container.classList.remove("hidden");
    sounds.playMusic("intro");
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
      this.showFinalConfirmation();
      return;
    }
    this.prevPanelIndex = this.panelIndex;
    this.panelIndex = index;
    this.panelStartedAt = performance.now();

    if (this.textEl && !this.isWaitingForCritical) {
      this.textEl.textContent = `Escena ${index + 1} / ${NARRATIVE_PANELS.length}`;
    }
    this.updateProgressDots();
    sounds.playMusic("intro");
  }

  showFinalConfirmation() {
    this.isWaitingForConfirmation = true;
    this.confirmationReadyAt = performance.now();
    this.updateProgressDots();
    if (this.textEl) {
      this.textEl.innerHTML = `<strong>«El descenso comienza. Cuando estés listo, continúa.»</strong> <span style="color:#ffd700;font-size:11px;">[ TOCA O PULSA ESPACIO PARA COMENZAR ]</span>`;
    }
  }

  advanceOrReveal() {
    if (!this.isActive || this.isWaitingForCritical) return;
    if (this.game?.renderer?.isPortraitBlocked) return;
    const now = performance.now();
    if (now - this.panelStartedAt < 250) return;

    if (this.isWaitingForConfirmation) {
      if (now - this.confirmationReadyAt < 250) return;
      this.finish(false);
      return;
    }

    if (this.panelIndex + 1 < NARRATIVE_PANELS.length) {
      this.showPanel(this.panelIndex + 1);
    } else {
      this.showFinalConfirmation();
    }
  }

  renderPanelArtwork(targetCtx, panel, progress, alpha = 1) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    targetCtx.save();
    targetCtx.globalAlpha = alpha;

    if (this.sheetLoaded && this.sheetImage.naturalWidth > 0) {
      const { x, y, w, h } = panel.crop;
      const padTop = Math.max(44, Math.round(H * 0.12));
      const padBottom = Math.max(38, Math.round(H * 0.11));
      const padSides = Math.max(20, Math.round(W * 0.04));
      const availW = Math.max(120, W - padSides * 2);
      const availH = Math.max(100, H - padTop - padBottom);

      const fitScale = Math.min(availW / w, availH / h);
      const drawW = Math.round(w * fitScale);
      const drawH = Math.round(h * fitScale);
      const dx = Math.round((W - drawW) / 2);
      const dy = Math.round(padTop + (availH - drawH) / 2);

      const glow = targetCtx.createRadialGradient(
        W / 2, dy + drawH / 2, Math.min(drawW, drawH) * 0.15,
        W / 2, dy + drawH / 2, Math.max(drawW, drawH) * 0.75
      );
      glow.addColorStop(0, "rgba(126, 87, 194, 0.22)");
      glow.addColorStop(1, "rgba(4, 5, 12, 0)");
      targetCtx.fillStyle = glow;
      targetCtx.fillRect(0, 0, W, H);

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
    const { width: targetW, height: targetH } = getViewportMetrics();
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

    // Avance manual interactivo exclusivamente: se eliminó el avance automático por tiempo

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

  completeIntroTransition(skipped = false) {
    if (!this.isActive) return;
    this.isActive = false;
    this.isWaitingForCritical = false;
    this.isWaitingForConfirmation = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.container) {
      this.container.classList.add("hidden");
    }
    if (this.game?.preloader?.metrics && !this.game.preloader.metrics.floor1ReadyAt) {
      this.game.preloader.metrics.floor1ReadyAt = typeof performance !== "undefined" ? performance.now() : Date.now();
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

  finish(skipped = false) {
    if (!this.isActive || this.isWaitingForCritical) return;
    const preloader = this.game?.preloader;
    if (preloader) {
      preloader.ensureCriticalForImmediateStart();
      if (!preloader.criticalReady && preloader.hasPendingNetworkCritical()) {
        this.isWaitingForCritical = true;
        const updateCaption = (pct) => {
          if (this.textEl && this.isWaitingForCritical) {
            this.textEl.textContent = `Preparando recursos del calabozo... ${pct}%`;
          }
        };
        updateCaption(preloader.getCriticalProgressPercent());
        preloader.progressListeners.add(updateCaption);
        preloader.waitForCritical(900).finally(() => {
          preloader.progressListeners.delete(updateCaption);
          this.completeIntroTransition(skipped);
        });
        return;
      }
    }
    this.completeIntroTransition(skipped);
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
    const menuSuspendBtn = document.getElementById("btn-menu-suspend-game");
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
    if (menuSuspendBtn) {
      menuSuspendBtn.addEventListener("click", () => {
        this.closeHelpModal();
        this.game.suspendGame();
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
    this.game.updateMenuSaveStatus?.();
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
    const rect = this.surface?.getBoundingClientRect?.();
    if (rect && rect.width > 0) {
      return clientX < (rect.left + rect.width / 2) ? "left" : "right";
    }
    const { width } = getViewportMetrics();
    return clientX < width / 2 ? "left" : "right";
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
      "button, #shop-modal, #merchant-dialog-modal, #narrative-intro, #ending-cinematic, #tutorial-help-modal, #save-resume-modal, #death-screen, #victory-screen, #rotate-device-overlay"
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
    const radius = Math.max(cellW, cellH) * 0.78;

    const baseAnchor = CAMERA_PROFILES.fixed?.anchors?.[0] || { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
    const baseScreenX = rect.left + (baseAnchor.x + 0.5) * cellW;
    const baseScreenY = rect.top + (baseAnchor.y + 0.5) * cellH;
    if (Math.hypot(clientX - baseScreenX, clientY - baseScreenY) <= radius) {
      return true;
    }

    const offsetPxX = this.game?.renderer?.cameraOffset?.x || 0;
    const offsetPxY = this.game?.renderer?.cameraOffset?.y || 0;
    const scaleX = rect.width / Math.max(1, canvas.width || (cols * CAMERA_CONFIG.tileSize));
    const scaleY = rect.height / Math.max(1, canvas.height || (rows * CAMERA_CONFIG.tileSize));
    const liorScreenX = rect.left + (CAMERA_CONFIG.playerScreenX + 0.5) * cellW + offsetPxX * scaleX;
    const liorScreenY = rect.top + (CAMERA_CONFIG.playerScreenY + 0.5) * cellH + offsetPxY * scaleY;
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
    if (this.game.renderer?.isPortraitBlocked) {
      this.cancelAllGestures();
      return;
    }
    if (this.game.isIntroActive() || (this.game.endingCinematic && this.game.endingCinematic.isActive) || this.game.isShopOpen() || this.game.isPausedForDialog || this.game.tutorial?.isHelpModalOpen() || this.game.isResumeModalOpen?.()) return;
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
    if (this.game.renderer?.isPortraitBlocked) {
      this.cancelAllGestures();
      return;
    }
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
    if (this.game.renderer?.isPortraitBlocked) {
      this.cancelAllGestures();
      return;
    }
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
    this.resumeModal = document.getElementById("save-resume-modal");
    this.resumeModalMode = null;
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

    const existingSave = this.readSavedGame();
    this.hasPendingResumePrompt = !!existingSave;
    this.pendingNarrativeIntro = !existingSave && !!options.playNarrativeIntro;
    this.preloader = new ResourcePreloader(this);
    this.narrativeIntro = new NarrativeIntroController(this);
    this.endingCinematic = new EndingCinematicController(this);
    this.tutorial = new TutorialController(this);
    this.stats = new RunStats();
    this.isAutoWalking = false;

    this.initDungeonFloor(false);
    this.touchController = new TouchGestureController(this, document.getElementById("game-container"));
    this.bindEvents();
    this.initShopEvents();
    this.initSaveResumeEvents();
    this.initDeviceDetection();
    this.initOrientationNotice();
    this.startGamepadLoop();
    window.__lior = this;

    if (existingSave) {
      this.preloader.start();
      this.openResumeModal(existingSave, "boot");
    } else if (options.playNarrativeIntro) {
      this.startNewGameIntro();
    } else {
      this.preloader.start();
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.tutorial.startIfEligible();
    }
  }

  get tier() {
    return Math.min(10, Math.floor((this.floor - 1) / 10) + 1);
  }

  /**
   * Devuelve el identificador de la canción de 8 bits correspondiente al bioma actual:
   * - Bioma 1 (Pisos 1–34): "biome1"
   * - Bioma 2 (Pisos 35–68): "biome2"
   * - Bioma 3 (Pisos 69–100): "biome3"
   */
  getBiomeTrackForFloor(floorNumber = this.floor) {
    const themeIndex = Math.min(2, Math.floor((Math.max(1, floorNumber) - 1) / 34));
    return ["biome1", "biome2", "biome3"][themeIndex];
  }

  isFinalDragonAlive() {
    if (this.inMerchantFloor || !this.dungeon?.enemies) return false;
    return this.floor === 100 && this.dungeon.enemies.some(
      e => e.hp > 0 && (e.isMegaBoss || e.size >= 4 || /drag[oó]n|dragon/i.test((e.name || "") + " " + (e.spriteSrc || "")))
    );
  }

  isSpecialEncounterActive() {
    if (this.inMerchantFloor || !this.dungeon?.enemies) return false;
    if (this.floor < 10 || this.floor > 90 || this.floor % 10 !== 0) return false;
    return this.dungeon.enemies.some(e => e.hp > 0);
  }

  /**
   * Determina la pista de música que corresponde al contexto actual siguiendo
   * estrictamente las prioridades de la Sección 5:
   * 1. Muerte / Game Over -> null (gestionado por game-over-efect.mp3 -> game-over-song.wav)
   * 2. Introducción narrativa -> "intro" (18. Infinite Darkness Midi.mid)
   * 3. Tienda / Sala del Mercader -> "shop" (16. Truth Midi.mid, prioridad sobre Crisis)
   * 4. Dragón Final (Piso 100) -> "final_dragon" (12. Strong Boss Midi.mid, prioridad sobre Crisis)
   * 5. Vida crítica (0 < HP <= 10) -> "crisis" (09. Crisis Midi.mid)
   * 6. Encuentros especiales pisos 60, 70, 80, 90 -> "special_60_90" (03. Boss Battle Midi.mid)
   * 7. Encuentros especiales pisos 10, 20, 30, 40, 50 -> "special_10_50" (01. Slay The Evil Midi.mid)
   * 8. Pisos normales (o encuentro especial concluido) -> "biome1" / "biome2" / "biome3"
   */
  resolveDesiredMusicTrack() {
    if (this.isGameOverTriggered || (this.player && this.player.hp <= 0)) {
      return null;
    }
    if (this.isIntroActive()) {
      return "intro";
    }
    if (this.isShopOpen() || this.inMerchantFloor || this.dungeon?.isMerchantRoom) {
      return "shop";
    }
    if (this.isFinalDragonAlive()) {
      return "final_dragon";
    }
    if (this.player && this.player.hp > 0 && this.player.hp <= 10) {
      return "crisis";
    }
    if (this.isSpecialEncounterActive()) {
      if ([60, 70, 80, 90].includes(this.floor)) return "special_60_90";
      if ([10, 20, 30, 40, 50].includes(this.floor)) return "special_10_50";
    }
    return this.getBiomeTrackForFloor(this.floor);
  }

  syncBiomeMusic() {
    const trackId = this.resolveDesiredMusicTrack();
    if (!trackId) return;
    sounds.playMusic(trackId);
  }

  /**
   * Presenta la aparición inicial de enemigos en el piso actual (Secciones 6 y 7.2):
   * - Si hay un enemigo de tamaño 4x4 sin presentar, inicia la presentación cinematográfica
   *   de cámara con su rugido y música del encuentro.
   * - En pisos normales (1 al 9 de cada ciclo de diez pisos), reproduce una sola vez el rugido
   *   inicial correspondiente a la categoría del piso (1-4monster.mp3 o 5-9monster.mp3).
   */
  /**
   * Presenta la aparición inicial de la criatura jefe exclusivamente en los niveles múltiplos de diez
   * (10, 20, 30, 40, 50, 60, 70, 80, 90 y 100), desplazando la cámara, activando el rugido correspondiente
   * una sola vez y regresando suavemente a Lior. Los niveles intermedios (1–9 de cada ciclo) permanecen
   * libres de rugidos de jefe.
   */
  triggerFloorInitialPresentation() {
    if (this.isIntroActive() || this.inMerchantFloor || !this.dungeon) return;
    if (this.floor < 10 || this.floor > 100 || this.floor % 10 !== 0) return;

    const largeEnemy = this.dungeon.enemies.find(
      e => e.hp > 0 && e.isMegaBoss && (e.size || 0) >= 4 && !e.introPresented
    );
    if (largeEnemy) {
      this.renderer?.startLargeEnemyPresentation(largeEnemy, this.floor);
    }
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

  isResumeModalOpen() {
    return !!(this.resumeModal && !this.resumeModal.classList.contains("hidden"));
  }

  isIntroActive() {
    return !!(this.pendingNarrativeIntro || (this.narrativeIntro && this.narrativeIntro.isActive));
  }

  isGameplayBlocked() {
    return (
      this.isVictory
      || this.isAutoWalking
      || this.isPausedForDialog
      || this.isShopOpen()
      || this.isResumeModalOpen()
      || this.isIntroActive()
      || (this.endingCinematic && this.endingCinematic.isActive)
      || this.tutorial?.isHelpModalOpen()
      || this.renderer?.isPortraitBlocked
      || performance.now() < this.shopClosingCooldown
      || !this.player
      || this.player.hp <= 0
    );
  }

  /**
   * Guarda automáticamente el progreso en localStorage al momento de entrar a un piso
   * (NUNCA al entrar a la tienda, ya que la tienda pertenece al piso anterior).
   */
  saveFloorCheckpoint() {
    if (this.inMerchantFloor || this.dungeon?.isMerchantRoom) return false;
    if (this.isVictory || this.isGameOverTriggered) return false;
    if (!this.player || this.player.hp <= 0 || !this.dungeon) return false;

    const payload = {
      version: 1,
      savedAt: Date.now(),
      floor: this.floor,
      inMerchantFloor: false,
      player: {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.direction,
        maxHp: this.player.maxHp,
        hp: this.player.hp,
        ac: this.player.ac,
        maxExtraHp: this.player.maxExtraHp,
        extraHp: this.player.extraHp,
        maxShieldSegments: this.player.maxShieldSegments,
        shieldSegments: this.player.shieldSegments,
        stunned: false,
        gold: this.player.gold,
        kills: this.player.kills,
        minionKillsSincePotion: this.player.minionKillsSincePotion,
        ammoPistol: this.player.ammoPistol,
        ammoMusket: this.player.ammoMusket,
        ammoBlunderbuss: this.player.ammoBlunderbuss,
        unlockedWeapons: [...this.player.unlockedWeapons],
        equippedWeaponId: this.player.equippedWeapon?.id || WEAPONS.SWORD.id,
        weaponUpgrades: { ...this.player.weaponUpgrades },
        highestMegaBossTierDefeated: this.player.highestMegaBossTierDefeated,
        mistyStepMaxCharges: this.player.mistyStepMaxCharges,
        mistyStepCharges: this.player.mistyStepCharges,
        mistyStepRechargeMax: this.player.mistyStepRechargeMax,
        mistyStepActionCounter: this.player.mistyStepActionCounter,
        blastMaxCharges: this.player.blastMaxCharges,
        blastCurrentCharges: this.player.blastCurrentCharges,
        hasRetrievedQuestItem: !!this.player.hasRetrievedQuestItem
      },
      stats: {
        ...(this.stats || new RunStats()),
        killsByName: { ...(this.stats?.killsByName || {}) }
      },
      dungeon: {
        width: this.dungeon.width,
        height: this.dungeon.height,
        isMerchantRoom: false,
        isBossRoom: !!this.dungeon.isBossRoom,
        turnCount: this.dungeon.turnCount || 0,
        entrance: { ...this.dungeon.entrance },
        exit: { ...this.dungeon.exit },
        tiles: [...this.dungeon.tiles.entries()],
        revealed: [...this.dungeon.revealed],
        chests: [...this.dungeon.chests],
        npcs: (this.dungeon.npcs || []).map(n => ({
          ...n,
          fleeDirection: n.fleeDirection ? { ...n.fleeDirection } : { dx: 1, dy: 0 }
        })),
        pickups: (this.dungeon.pickups || []).map(p => ({ ...p })),
        enemies: (this.dungeon.enemies || []).map(e => ({
          ...e,
          cells: (e.cells || []).map(c => ({ ...c })),
          anim: null,
          introPresented: false,
          roarPlayed: false
        }))
      }
    };

    try {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      return false;
    }
    this.updateMenuSaveStatus();
    return true;
  }

  readSavedGame() {
    try {
      const raw = localStorage.getItem(SAVE_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (
        !parsed
        || parsed.version !== 1
        || !Number.isInteger(parsed.floor)
        || parsed.floor < 1
        || parsed.floor > 100
        || !parsed.player
        || !(Number(parsed.player.hp) > 0)
      ) {
        localStorage.removeItem(SAVE_STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      try { localStorage.removeItem(SAVE_STORAGE_KEY); } catch {}
      return null;
    }
  }

  hasSavedGame() {
    return !!this.readSavedGame();
  }

  clearSavedGame() {
    try {
      localStorage.removeItem(SAVE_STORAGE_KEY);
    } catch {}
    this.updateMenuSaveStatus();
  }

  updateMenuSaveStatus() {
    const statusEl = document.getElementById("menu-save-status");
    if (!statusEl) return;
    const saved = this.readSavedGame();
    if (saved) {
      const fl = String(saved.floor).padStart(2, "0");
      statusEl.textContent = `💾 Guardado automático activo: Inicio del Piso ${fl} · Si mueres, reinicias desde el Piso 1`;
    } else {
      statusEl.textContent = "💾 Guardado automático al entrar a cada piso · Si mueres, reinicias desde el Piso 1";
    }
  }

  loadSavedGame(saveData = null) {
    const data = saveData || this.readSavedGame();
    if (!data || !data.player || !(Number(data.player.hp) > 0)) return false;

    this.hasPendingResumePrompt = false;
    this.pendingNarrativeIntro = false;
    this.isGameOverTriggered = false;
    sounds.stopGameOverAudio();
    this.floor = Math.max(1, Math.min(100, Math.floor(Number(data.floor) || 1)));
    sounds.resetBossRoarTracking(this.floor);
    this.inMerchantFloor = false;
    this.isVictory = false;
    this.isAutoWalking = false;
    this.isPausedForDialog = false;
    this.isAnimatingTurn = false;
    this.pendingEnemyProjectiles = 0;
    this.showWeaponRange = false;
    this.isAiming = false;
    this.eldritchBlastPreviewDir = null;
    this.mistyStepPreview = null;
    this.mistyStepConfirmation = null;
    this.entryPreviewUntil = performance.now() + 1500;
    clearTimeout(this.merchantInitTimer);
    this.touchController?.cancelAllGestures();
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();

    this.stats = new RunStats();
    if (data.stats && typeof data.stats === "object") {
      Object.keys(this.stats).forEach(key => {
        if (key === "killsByName") {
          this.stats.killsByName = { ...(data.stats.killsByName || {}) };
        } else if (key in data.stats) {
          this.stats[key] = data.stats[key];
        }
      });
    }

    if (
      data.dungeon
      && Number.isInteger(data.dungeon.width)
      && Number.isInteger(data.dungeon.height)
      && Array.isArray(data.dungeon.tiles)
    ) {
      this.dungeon = new Dungeon(data.dungeon.width, data.dungeon.height);
      this.dungeon.isMerchantRoom = false;
      this.dungeon.isBossRoom = !!data.dungeon.isBossRoom;
      this.dungeon.turnCount = Number(data.dungeon.turnCount) || 0;
      if (data.dungeon.entrance) this.dungeon.entrance = { ...data.dungeon.entrance };
      if (data.dungeon.exit) this.dungeon.exit = { ...data.dungeon.exit };
      this.dungeon.tiles = new Map(data.dungeon.tiles);
      this.dungeon.revealed = new Set(Array.isArray(data.dungeon.revealed) ? data.dungeon.revealed : []);
      this.dungeon.chests = new Set(Array.isArray(data.dungeon.chests) ? data.dungeon.chests : []);
      this.dungeon.npcs = (data.dungeon.npcs || []).map(n => ({
        ...n,
        fleeDirection: n.fleeDirection ? { ...n.fleeDirection } : { dx: 1, dy: 0 }
      }));
      this.dungeon.pickups = (data.dungeon.pickups || []).map(p => ({ ...p }));
      this.dungeon.enemies = (data.dungeon.enemies || []).map(e => ({
        ...e,
        cells: (e.cells || []).map(c => ({ ...c })),
        anim: null,
        introPresented: false,
        roarPlayed: false
      }));
      this.generator = {
        dungeon: this.dungeon,
        floorNumber: this.floor,
        tier: this.tier
      };
    } else {
      const { width, height } = getRandomDungeonDimensions(10, 30, this.floor);
      this.dungeon = new Dungeon(width, height);
      this.dungeon.isMerchantRoom = false;
      this.generator = new DungeonGenerator(this.dungeon, this.floor);
    }

    const startX = Number.isInteger(data.player.x) ? data.player.x : this.dungeon.entrance.x;
    const startY = Number.isInteger(data.player.y) ? data.player.y : this.dungeon.entrance.y;
    this.player = new Player(startX, startY);
    this.player.direction = Number.isInteger(data.player.direction) ? ((data.player.direction % 4) + 4) % 4 : 0;
    this.player.maxHp = calculateLiorMaxHP(this.floor);
    this.player.hp = Math.max(1, Math.min(this.player.maxHp, Math.floor(Number(data.player.hp) || this.player.maxHp)));
    this.player.ac = this.playerAC;
    this.player.maxExtraHp = calculateMaxExtraHP(this.player.maxHp);
    this.player.extraHp = 0;
    this.player.maxShieldSegments = MAX_SHIELD_SEGMENTS;
    this.player.shieldSegments = Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(Number(data.player.shieldSegments) || 0)));
    this.player.stunned = false;
    this.player.gold = Math.max(0, Math.floor(Number(data.player.gold) || 0));
    this.player.kills = Math.max(0, Math.floor(Number(data.player.kills) || 0));
    this.player.minionKillsSincePotion = Math.max(0, Math.floor(Number(data.player.minionKillsSincePotion) || 0));
    this.player.ammoPistol = Math.max(0, Math.floor(Number(data.player.ammoPistol) || 0));
    this.player.ammoMusket = Math.max(0, Math.floor(Number(data.player.ammoMusket) || 0));
    this.player.ammoBlunderbuss = Math.max(0, Math.floor(Number(data.player.ammoBlunderbuss) || 0));

    const unlockedList = Array.isArray(data.player.unlockedWeapons) ? data.player.unlockedWeapons : [WEAPONS.SWORD.id];
    this.player.unlockedWeapons = new Set([WEAPONS.SWORD.id, ...unlockedList]);

    const upg = data.player.weaponUpgrades || {};
    this.player.weaponUpgrades = {
      sword: Math.max(0, Math.min(3, Math.floor(Number(upg.sword) || 0))),
      pistol: Math.max(0, Math.min(3, Math.floor(Number(upg.pistol) || 0))),
      musket: Math.max(0, Math.min(3, Math.floor(Number(upg.musket) || 0))),
      blunderbuss: Math.max(0, Math.min(3, Math.floor(Number(upg.blunderbuss) || 0)))
    };

    const desiredWeapon = Object.values(WEAPONS).find(w => w.id === data.player.equippedWeaponId) || WEAPONS.SWORD;
    this.player.equippedWeapon = desiredWeapon;
    this.player.ensureEquippedWeaponAvailable();

    this.player.highestMegaBossTierDefeated = Math.max(0, Math.floor(Number(data.player.highestMegaBossTierDefeated) || 0));
    this.player.mistyStepMaxCharges = Math.max(1, Math.floor(Number(data.player.mistyStepMaxCharges) || 2));
    this.player.mistyStepCharges = Math.max(0, Math.min(this.player.mistyStepMaxCharges, Math.floor(Number(data.player.mistyStepCharges ?? 2))));
    this.player.mistyStepRechargeMax = Math.max(1, Math.floor(Number(data.player.mistyStepRechargeMax) || 20));
    this.player.mistyStepActionCounter = Math.max(0, Math.floor(Number(data.player.mistyStepActionCounter) || 0));
    this.player.blastMaxCharges = Math.max(1, Math.floor(Number(data.player.blastMaxCharges) || 10));
    this.player.blastCurrentCharges = Math.max(0, Math.min(this.player.blastMaxCharges, Math.floor(Number(data.player.blastCurrentCharges ?? 10))));
    this.player.hasRetrievedQuestItem = !!data.player.hasRetrievedQuestItem;

    if (!this.renderer) {
      this.renderer = new Renderer(this.canvas, this.dungeon, this.player, this.generator);
    } else {
      this.renderer.player = this.player;
      this.renderer.setDungeon(this.dungeon, this.generator);
    }
    this.renderer.game = this;

    this.dungeon.enemies.forEach(enemy => {
      enemy.seenAtSpawn = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);
    });
    this.preloader?.preloadForFloor(this.floor);

    this.closeResumeModal();
    this.updateHUD();
    this.updateButtonLabels();
    this.updateMenuSaveStatus();
    this.syncBiomeMusic();
    this.triggerFloorInitialPresentation();
    this.showFloorBanner(this.floor, "Partida reanudada.");
    this.log(`💾 Partida reanudada en el Piso ${this.floor}.`);
    this.renderer.draw();
    return true;
  }

  openResumeModal(saveData = null, mode = "boot") {
    const data = saveData || this.readSavedGame();
    if (!this.resumeModal || !data) return false;
    this.resumeModalMode = mode;
    this.touchController?.cancelAllGestures();
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();

    const flNum = Math.max(1, Math.min(100, Math.floor(Number(data.floor) || 1)));
    const flStr = String(flNum).padStart(2, "0");
    const maxHp = calculateLiorMaxHP(flNum);
    const hp = Math.max(1, Math.min(maxHp, Math.floor(Number(data.player?.hp) || maxHp)));
    const segs = Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(Number(data.player?.shieldSegments) || 0)));
    const gold = Math.max(0, Math.floor(Number(data.player?.gold) || 0));
    const kills = Math.max(0, Math.floor(Number(data.player?.kills) || 0));
    const weaponId = data.player?.equippedWeaponId || "sword";
    const weaponName = TEXT.weaponNames[weaponId] || TEXT.weaponNames.sword;

    const titleEl = document.getElementById("save-resume-title");
    const descEl = document.getElementById("save-resume-desc");
    const floorEl = document.getElementById("save-stat-floor");
    const vitalsEl = document.getElementById("save-stat-vitals");
    const goldEl = document.getElementById("save-stat-gold");
    const weaponEl = document.getElementById("save-stat-weapon");
    const killsEl = document.getElementById("save-stat-kills");
    const resumeBtn = document.getElementById("btn-resume-saved-game");

    if (titleEl) {
      titleEl.textContent = mode === "suspend" ? "✦ PARTIDA SUSPENDIDA ✦" : "✦ PARTIDA GUARDADA ✦";
    }
    if (descEl) {
      descEl.textContent = mode === "suspend"
        ? `Tu progreso está guardado en el inicio del Piso ${flStr}. Puedes cerrar el juego y regresar cuando quieras.`
        : `Se encontró un descenso en curso guardado al entrar al Piso ${flStr}.`;
    }
    if (floorEl) floorEl.textContent = `Piso ${flStr}`;
    if (vitalsEl) vitalsEl.textContent = `${hp}/${maxHp} HP · 🛡${segs}/${MAX_SHIELD_SEGMENTS}`;
    if (goldEl) goldEl.textContent = `${gold} PO`;
    if (weaponEl) weaponEl.textContent = weaponName;
    if (killsEl) killsEl.textContent = String(kills);
    if (resumeBtn) {
      resumeBtn.textContent = mode === "suspend"
        ? "▶ VOLVER A LA PARTIDA"
        : `▶ CONTINUAR EN PISO ${flStr}`;
    }

    this.resumeModal.classList.remove("hidden");
    return true;
  }

  closeResumeModal() {
    if (!this.resumeModal) return;
    this.resumeModal.classList.add("hidden");
    this.resumeModalMode = null;
  }

  suspendGame() {
    if (this.isVictory || !this.player || this.player.hp <= 0) return false;
    if (!this.inMerchantFloor && !this.hasSavedGame()) {
      this.saveFloorCheckpoint();
    }
    const saved = this.readSavedGame();
    if (!saved) return false;
    return this.openResumeModal(saved, "suspend");
  }

  resumeFromSavedGame() {
    if (this.resumeModalMode === "suspend" && !this.hasPendingResumePrompt) {
      this.closeResumeModal();
      this.syncBiomeMusic();
      this.renderer?.draw();
      return true;
    }
    return this.loadSavedGame();
  }

  startFreshNewGame() {
    this.hasPendingResumePrompt = false;
    this.closeResumeModal();
    this.resetGame();
  }

  initSaveResumeEvents() {
    const resumeBtn = document.getElementById("btn-resume-saved-game");
    const discardBtn = document.getElementById("btn-discard-saved-game");
    if (resumeBtn) {
      resumeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.resumeFromSavedGame();
      });
    }
    if (discardBtn) {
      discardBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startFreshNewGame();
      });
    }
  }

  startNewGameIntro() {
    this.pendingNarrativeIntro = false;
    if (!this.narrativeIntro) {
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
      this.tutorial?.startIfEligible();
      return;
    }
    sounds.playMusic("intro");
    this.narrativeIntro.start(() => {
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
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
        this.renderer?.keepAnimating(450);
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

  canUseNativeFullscreen() {
    const docEl = document.documentElement;
    if (!docEl) return false;
    const hasReq = !!(
      docEl.requestFullscreen
      || docEl.webkitRequestFullscreen
      || docEl.mozRequestFullScreen
      || docEl.msRequestFullscreen
    );
    if (!hasReq) return false;
    if ("fullscreenEnabled" in document && document.fullscreenEnabled === false) return false;
    if ("webkitFullscreenEnabled" in document && document.webkitFullscreenEnabled === false) return false;
    return true;
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

  updateFullscreenUI(forceResize = false) {
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
      const vpChanged = syncViewportCssVars();
      this.renderer.updateOrientationState();
      if (forceResize || vpChanged) {
        this.renderer.setCameraMode("fixed", false);
      } else {
        this.renderer.draw();
      }
    }
  }

  async requestAutoFullscreen() {
    if (this.userExitedFullscreen) return;
    document.body.classList.add("pseudo-fullscreen");
    if (this.isNativeFullscreenActive()) {
      this.updateFullscreenUI(false);
      return;
    }
    if (this.canUseNativeFullscreen()) {
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
          // Mantiene pseudo-fullscreen activo si el navegador requiere gesto de usuario o no soporta Fullscreen API
        }
      }
    }
    this.updateFullscreenUI(false);
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
      this.updateFullscreenUI(true);
      return;
    }

    if (manual && document.body.classList.contains("pseudo-fullscreen")) {
      const req = this.canUseNativeFullscreen()
        ? (docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen)
        : null;
      if (req && !this._triedManualNativeFs) {
        this._triedManualNativeFs = true;
        try {
          this.userExitedFullscreen = false;
          await req.call(docEl, { navigationUI: "hide" });
          if (screen.orientation && typeof screen.orientation.lock === "function") {
            screen.orientation.lock("landscape").catch(() => {});
          }
          this.updateFullscreenUI(true);
          return;
        } catch {}
      }
      this._triedManualNativeFs = false;
      this.userExitedFullscreen = true;
      document.body.classList.remove("pseudo-fullscreen");
      this.updateFullscreenUI(true);
      return;
    }

    this.userExitedFullscreen = false;
    const req = this.canUseNativeFullscreen()
      ? (docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen)
      : null;

    if (req) {
      try {
        await req.call(docEl, { navigationUI: "hide" });
        if (screen.orientation && typeof screen.orientation.lock === "function") {
          screen.orientation.lock("landscape").catch(() => {});
        }
        document.body.classList.add("pseudo-fullscreen");
        this.updateFullscreenUI(true);
        return;
      } catch {
        // Fallback si el contenedor o navegador bloquea la API nativa (ej. Safari iOS)
      }
    }

    document.body.classList.add("pseudo-fullscreen");
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    this.updateFullscreenUI(true);
  }

  initFullscreenControls() {
    this.userExitedFullscreen = false;
    this._autoFullscreenAttempted = false;
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
      document.addEventListener(evt, () => this.updateFullscreenUI(true));
    }

    for (const btnId of ["btn-music-toggle", "btn-intro-music", "btn-menu-music"]) {
      const mBtn = document.getElementById(btnId);
      if (mBtn) {
        mBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          sounds.toggleMusicMute();
        });
      }
    }
    sounds.updateMusicButtonsUI();

    // 1. Activar modo inmersivo desde el inicio
    this.requestAutoFullscreen();

    // 2. Intentar pantalla completa nativa una única vez en el primer gesto del usuario
    // sin re-ejecutar en cada toque en navegadores sin Fullscreen API (como Safari en iPhone).
    const onFirstUserGesture = (e) => {
      if (this._autoFullscreenAttempted) return;
      if (e.target && e.target.closest && e.target.closest("#btn-fullscreen, #btn-intro-fullscreen, #btn-menu-fullscreen")) {
        return;
      }
      this._autoFullscreenAttempted = true;
      window.removeEventListener("pointerdown", onFirstUserGesture);
      window.removeEventListener("touchstart", onFirstUserGesture);
      window.removeEventListener("keydown", onFirstUserGesture);
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
    const { width, height } = getViewportMetrics();
    const compactScreen = Math.max(width, height) <= 1024
      && Math.min(width, height) <= 520;
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

    if (!isMerchantTransition) {
      sounds.resetBossRoarTracking(this.floor);
    }
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
      this.player.mistyStepMaxCharges = 2;
      this.player.mistyStepCharges = 2;
      this.player.mistyStepRechargeMax = 20;
      this.player.mistyStepActionCounter = 0;
    }

    this.player.maxHp = calculateLiorMaxHP(this.floor);
    this.player.hp = Math.min(this.player.hp, this.player.maxHp);
    this.player.maxExtraHp = calculateMaxExtraHP(this.player.maxHp);
    this.player.extraHp = Math.min(this.player.extraHp, this.player.maxExtraHp);
    this.player.maxShieldSegments = MAX_SHIELD_SEGMENTS;
    this.player.shieldSegments = Math.max(0, Math.min(this.player.maxShieldSegments, Math.floor(this.player.shieldSegments || 0)));
    this.player.ac = this.playerAC;
    if (!isMerchantTransition) this.entryPreviewUntil = performance.now() + 1500;

    if (!this.renderer) {
      this.renderer = new Renderer(this.canvas, this.dungeon, this.player, this.generator);
    } else {
      this.renderer.player = this.player;
      this.renderer.setDungeon(this.dungeon, this.generator);
    }
    this.renderer.game = this;

    if (!isMerchantTransition && this.dungeon && this.player) {
      this.dungeon.enemies.forEach(enemy => {
        enemy.seenAtSpawn = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);
      });
    }
    this.preloader?.preloadForFloor(this.floor);

    this.updateHUD();
    this.updateButtonLabels();
    if (!isMerchantTransition && !this.isIntroActive() && !this.hasPendingResumePrompt) {
      this.saveFloorCheckpoint();
    }
    if (!this.isIntroActive() && !this.hasPendingResumePrompt) {
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
    }

    if (isMerchantTransition) {
      this.log(`[MERCADER]: «${TEXT.logs.merchantPeace}»`);
      this.merchantInitTimer = setTimeout(() => {
        if (!this.inMerchantFloor || this.isShopOpen() || this.isPausedForDialog) return;
        this.triggerMerchantInteraction();
      }, 300);
    } else {
      this.log(TEXT.logs.floorIntro(this.floor, this.tier, this.dungeon.width, this.dungeon.height, this.player.ac, this.hitBonus));
      const arenaBoss = this.dungeon.enemies.find(e => e.isMegaBoss || e.size >= 4);
      if (arenaBoss) {
        this.log(TEXT.logs.bossArena(arenaBoss.name));
        this.showFloorBanner(this.floor, `¡${arenaBoss.name}!`);
      } else if (!this.isIntroActive() && !this.hasPendingResumePrompt) {
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
    this.clearSavedGame();
    this.hasPendingResumePrompt = false;
    this.closeResumeModal();
    this.isGameOverTriggered = false;
    sounds.stopGameOverAudio();
    sounds.resetBossRoarTracking();
    this.floor = 1;
    this.inMerchantFloor = false;
    this.isVictory = false;
    this.isAutoWalking = false;
    if (this.stats) this.stats.reset();
    if (this.endingCinematic) this.endingCinematic.finish(true);
    if (this.renderer) {
      this.renderer.isVictorySequence = false;
      this.renderer.victoryStep = 0;
    }
    const hudEl = document.getElementById("hud");
    if (hudEl) hudEl.style.removeProperty("display");
    if (this.victoryScreen) {
      this.victoryScreen.classList.remove("visible");
      this.victoryScreen.classList.add("hidden");
    }
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
    this.pendingNarrativeIntro = true;
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
    this.syncBiomeMusic();
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
      this.syncBiomeMusic();
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
    const potionPrice = calculatePotionPrice(this.floor);
    if (potionBtn) {
      potionBtn.textContent = `${potionPrice} PO`;
      potionBtn.disabled = this.player.gold < potionPrice || this.player.hp >= this.player.maxHp;
    }
    const potionLabel = document.getElementById("potion-shop-label");
    if (potionLabel) potionLabel.textContent = `Poción Roja (${calculatePotionDice(this.floor)}d4 + 4)`;
    this.updateShopShieldHUD();
    this.updateShopUpgrades();
  }

  updateShopShieldHUD() {
    if (!this.player) return;
    const currentSegs = Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(this.player.shieldSegments || 0)));
    const maxSegs = MAX_SHIELD_SEGMENTS;
    const availSpace = Math.max(0, maxSegs - currentSegs);
    const nextSinglePrice = calculateNextShieldSegmentPrice(currentSegs);

    const labelEl = document.getElementById("shield-shop-label");
    if (labelEl) labelEl.textContent = `Escudo (${currentSegs}/${maxSegs})`;

    const buyBtn = document.getElementById("buy-shield-segments");
    if (buyBtn) {
      if (availSpace <= 0) {
        buyBtn.textContent = "MÁX";
        buyBtn.disabled = true;
      } else {
        buyBtn.textContent = `${nextSinglePrice} PO`;
        buyBtn.disabled = !Number.isFinite(nextSinglePrice) || this.player.gold < nextSinglePrice;
      }
    }
  }

  purchaseShieldSegments() {
    if (!this.player) return false;
    const currentSegs = Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(this.player.shieldSegments || 0)));
    const availSpace = Math.max(0, MAX_SHIELD_SEGMENTS - currentSegs);

    if (availSpace <= 0) {
      this.log(TEXT.logs.shieldFullReject);
      this.updateShopShieldHUD();
      return false;
    }

    const count = 1;
    const cost = calculateNextShieldSegmentPrice(currentSegs);
    if (!Number.isFinite(cost) || this.player.gold < cost) {
      const msg = TEXT.logs.shieldGoldReject(cost, this.player.gold);
      this.log(msg);
      this.updateShopShieldHUD();
      return false;
    }

    this.player.gold -= cost;
    const restored = restoreShieldSegments(this.player, count);
    if (this.stats) {
      this.stats.shieldSegmentsPurchased += restored.segmentsRestored;
      this.stats.shieldSegmentsRestored += restored.segmentsRestored;
    }
    sounds.playPickup();
    this.renderer?.showFloatingNumber(this.player.x, this.player.y, `+${restored.segmentsRestored} 🛡`, "shield");
    const confirmMsg = TEXT.logs.boughtShield(restored.segmentsRestored, cost, this.player.shieldSegments, this.player.maxShieldSegments);
    this.log(confirmMsg);

    this.updateHUD();
    this.updateShopHUD();
    return true;
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
    sounds.playPickup();
    this.updateShopHUD();
    this.updateHUD();
    return true;
  }

  addGold(amount, x = this.player.x, y = this.player.y) {
    const reward = Math.max(0, Math.floor(amount));
    if (reward === 0) return;
    this.player.gold += reward;
    if (this.stats) this.stats.goldCollected += reward;
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
          sounds.playPickup();
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
          sounds.playPickup();
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
          sounds.playPickup();
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
              if (this.stats) {
                this.stats.potionsDrunk++;
                this.stats.totalHealing += restored.totalRestored;
              }
              this.renderer.showFloatingNumber(this.player.x, this.player.y, `+${restored.totalRestored} HP`, "healing");
            }
            sounds.playHeal();
            this.syncBiomeMusic();
            this.updateHUD();
            this.updateShopHUD();
            this.log(TEXT.logs.boughtPotion(restored.totalRestored, price));
          }
        }
      });
    }

    const buyShieldBtn = document.getElementById("buy-shield-segments");
    if (buyShieldBtn) {
      buyShieldBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.purchaseShieldSegments();
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
    this.player.maxShieldSegments = MAX_SHIELD_SEGMENTS;
    this.player.shieldSegments = Math.max(0, Math.min(this.player.maxShieldSegments, Math.floor(this.player.shieldSegments || 0)));
    const directionNames = ["Norte", "Este", "Sur", "Oeste"];
    const directionArrows = ["↑", "→", "↓", "←"];
    const maxHpCap = Math.max(1, this.player.maxHp);
    if (elFloor) elFloor.textContent = String(this.floor).padStart(2, "0");
    if (elDir) elDir.textContent = directionNames[this.player.direction];
    if (elDirArrow) elDirArrow.textContent = directionArrows[this.player.direction];
    if (elVitals) {
      elVitals.textContent = `${this.player.hp}/${this.player.maxHp} · 🛡${this.player.shieldSegments}/${this.player.maxShieldSegments}`;
    }
    if (elHpFill) elHpFill.style.width = `${(this.player.hp / maxHpCap) * 100}%`;
    if (elExtraFill) elExtraFill.style.width = `${(this.player.shieldSegments / MAX_SHIELD_SEGMENTS) * 100}%`;

    const elShieldTrack = document.getElementById("hud-shield-track");
    if (elShieldTrack) {
      elShieldTrack.title = `Segmentos de escudo (${this.player.shieldSegments}/${this.player.maxShieldSegments})`;
    }
    const elShieldCells = document.getElementById("hud-shield-cells");
    if (elShieldCells) {
      const cells = elShieldCells.querySelectorAll(".shield-cell");
      cells.forEach((cell, idx) => {
        const isAvailable = (idx + 1) <= this.player.shieldSegments;
        cell.classList.toggle("is-active", isAvailable);
        cell.classList.toggle("is-empty", !isAvailable);
      });
    }
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
    this.dungeon.enemies.push(createMinion(this.floor, spot.x, spot.y, 3, true));
  }

  triggerGameOver() {
    this.clearSavedGame();
    if (this.isGameOverTriggered) return;
    this.isGameOverTriggered = true;
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

  spawnBlueChest(approxX, approxY) {
    if (this.dungeon.blueChestSpawned) return;
    this.dungeon.blueChestSpawned = true;
    let target = null;
    const candidates = [
      { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 6, y: 3 }, { x: 8, y: 3 },
      { x: 7, y: 2 }, { x: 7, y: 5 }, { x: 6, y: 4 }, { x: 8, y: 4 }
    ];
    for (const c of candidates) {
      if (this.dungeon.isInsideBounds(c.x, c.y) &&
          this.dungeon.getTile(c.x, c.y) === TILE_FLOOR &&
          !(c.x === this.player.x && c.y === this.player.y) &&
          !(c.x === this.dungeon.exit.x && c.y === this.dungeon.exit.y)) {
        target = c;
        break;
      }
    }
    if (!target) {
      for (let r = 1; r < 7 && !target; r++) {
        for (let dy = -r; dy <= r && !target; dy++) {
          for (let dx = -r; dx <= r && !target; dx++) {
            const tx = 7 + dx;
            const ty = 7 + dy;
            if (this.dungeon.isInsideBounds(tx, ty) &&
                this.dungeon.getTile(tx, ty) === TILE_FLOOR &&
                !(tx === this.player.x && ty === this.player.y) &&
                !(tx === this.dungeon.exit.x && ty === this.dungeon.exit.y)) {
              target = { x: tx, y: ty };
            }
          }
        }
      }
    }
    if (target) {
      this.dungeon.setTile(target.x, target.y, TILE_BLUE_CHEST);
      this.dungeon.blueChest = { x: target.x, y: target.y };
      this.log("¡El líder cayó! Un cofre azul ha aparecido en la arena.");
      this.renderer?.draw();
    }
  }

  openBlueChest() {
    const tile = this.dungeon.getTile(this.player.x, this.player.y);
    if (tile !== TILE_BLUE_CHEST) return;

    this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    this.player.hasRetrievedQuestItem = true;
    this.renderer.playBlueChestOpening(this.player.x, this.player.y);
    sounds.playPickup();
    this.log("¡Has recuperado el encargo de la Dama del Dolor!");

    this.isAutoWalking = true;
    setTimeout(() => {
      this.autoWalkToExit();
    }, 700);
  }

  autoWalkToExit() {
    const dungeon = this.dungeon;
    const startX = this.player.x;
    const startY = this.player.y;
    const exitX = dungeon.exit.x;
    const exitY = dungeon.exit.y;

    const queue = [{ x: startX, y: startY, path: [] }];
    const visited = new Set([`${startX},${startY}`]);
    const dirs = [
      { x: 0, y: -1, cardinal: 0 },
      { x: 1, y: 0, cardinal: 1 },
      { x: 0, y: 1, cardinal: 2 },
      { x: -1, y: 0, cardinal: 3 }
    ];

    let foundPath = [];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.x === exitX && curr.y === exitY) {
        foundPath = curr.path;
        break;
      }
      for (const d of dirs) {
        const nx = curr.x + d.x;
        const ny = curr.y + d.y;
        const key = `${nx},${ny}`;
        if (!visited.has(key) && dungeon.isInsideBounds(nx, ny) && dungeon.getTile(nx, ny) !== TILE_WALL) {
          visited.add(key);
          queue.push({ x: nx, y: ny, path: [...curr.path, { x: nx, y: ny, cardinal: d.cardinal }] });
        }
      }
    }

    if (foundPath.length === 0) {
      this.isAutoWalking = false;
      this.startEndingCinematic();
      return;
    }

    let stepIndex = 0;
    const walkTimer = setInterval(() => {
      if (stepIndex >= foundPath.length) {
        clearInterval(walkTimer);
        this.isAutoWalking = false;
        this.startEndingCinematic();
        return;
      }
      const nextStep = foundPath[stepIndex++];
      this.player.direction = nextStep.cardinal;
      this.player.x = nextStep.x;
      this.player.y = nextStep.y;
      sounds.playStep();
      this.renderer.commitCameraFacing();
      this.renderer.playWalk();
      this.renderer.draw();

      if (this.player.x === exitX && this.player.y === exitY) {
        clearInterval(walkTimer);
        this.isAutoWalking = false;
        setTimeout(() => this.startEndingCinematic(), 350);
      }
    }, 240);
  }

  startEndingCinematic() {
    this.clearSavedGame();
    this.isVictory = true;
    this.isAutoWalking = false;
    const hudEl = document.getElementById("hud");
    if (hudEl) hudEl.style.display = "none";

    if (this.endingCinematic) {
      this.endingCinematic.start(() => {
        this.showRunStatsScreen();
      });
    } else {
      this.showRunStatsScreen();
    }
  }

  showRunStatsScreen() {
    this.clearSavedGame();
    this.isVictory = true;
    sounds.stopMusic();
    sounds.playLogoJingle();

    if (this.stats) {
      this.stats.finalGold = this.player.gold;
      this.stats.floorsCleared = Math.max(100, this.floor);
    }

    const stats = this.stats || new RunStats();

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val);
    };

    setTxt("vstat-floors", stats.floorsCleared);
    setTxt("vstat-gold-total", `${stats.goldCollected} PO`);
    setTxt("vstat-gold-final", `${stats.finalGold} PO`);
    setTxt("vstat-steps", stats.totalSteps);

    setTxt("vstat-kills-total", stats.killsTotal);
    setTxt("vstat-kills-minions", stats.killsMinions);
    setTxt("vstat-kills-minibosses", stats.killsMiniBosses);
    setTxt("vstat-kills-megabosses", stats.killsMegaBosses);
    setTxt("vstat-dragon", stats.solarDragonDefeated ? "¡ABATIDO!" : "NO DERROTADO");

    setTxt("vstat-sword", `${stats.swordSwings} (${stats.swordHits} imp.)`);
    setTxt("vstat-pistol", `${stats.pistolShots} (${stats.pistolHits} imp.)`);
    setTxt("vstat-musket", `${stats.musketShots} (${stats.musketHits} imp.)`);
    setTxt("vstat-blunderbuss", `${stats.blunderbussShots} (${stats.blunderbussHits} imp.)`);
    setTxt("vstat-blast", `${stats.eldritchBlastCasts} (${stats.eldritchBlastHits} imp.)`);
    setTxt("vstat-misty", stats.mistyStepUses);

    setTxt("vstat-potions", `${stats.potionsDrunk} / ${stats.bluePotionsDrunk || 0}`);
    setTxt("vstat-healing", `+${stats.totalHealing} HP`);
    setTxt("vstat-shield-used", `${stats.shieldSegmentsConsumed || 0} (-${stats.shieldDamageMitigated || 0} DMG)`);
    setTxt("vstat-hits-taken", stats.damageTakenInstances);
    setTxt("vstat-damage-taken", `-${stats.totalDamageTaken} HP`);

    if (this.victoryScreen) {
      this.victoryScreen.classList.remove("hidden");
      this.victoryScreen.classList.add("visible");
    }
  }

  startVictorySequence() {
    this.startEndingCinematic();
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
    if (this.stats) this.stats.mistyStepUses++;

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
      this.clearSavedGame();
      this.updateHUD();
      this.renderer.draw();
      this.triggerGameOver();
      return;
    }

    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.player.x = destination.x;
    this.player.y = destination.y;
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.renderer.commitCameraFacing();
    this.renderer.playMistyStep();
    this.processEnemiesTurn();
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
    if (this.stats) this.stats.eldritchBlastCasts++;
    this.renderer.commitCameraFacing();
    const rayCount = calculateEldritchBlastRayCount(this.floor);
    const damageByRay = splitDamageAcrossRays(calculateEldritchBlastDamage(this.floor), rayCount);
    this.renderer.playEldritchBlastAnimation(beamReach);

    if (hitEnemy) {
      if (this.stats) this.stats.eldritchBlastHits++;
      Renderer.orientEnemyTowardsPlayer(hitEnemy, this.player);
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

    const prevWeaponId = this.player.equippedWeapon?.id;
    this.player.cycleWeapon();
    if (this.player.equippedWeapon?.id === prevWeaponId) return;

    this.showWeaponRange = true;
    if (!this.player.equippedWeapon.isMelee) this.renderer.commitCameraFacing();
    sounds.playPickup();

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

      Renderer.recordEnemyRelativePlayerX(enemy, this.player);

      if (canAttack) {
        Renderer.orientEnemyTowardsPlayer(enemy, this.player);
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
        }

        if (isRanged) {
          const turnDungeon = this.dungeon;
          this.pendingEnemyProjectiles++;
          this.isAnimatingTurn = true;
          setTimeout(() => {
            try {
              if (this.dungeon !== turnDungeon || this.player.hp <= 0 || this.isVictory || !attack.hit) return;
              const dmgRes = CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
              if (this.player.hp > 0) sounds.playHurt();
              this.log(TEXT.logs.enemyHit(
                enemy.name,
                attack.total,
                this.player.ac,
                dmgRes.totalDamage,
                dmgRes.mitigatedDamage,
                this.player.shieldSegments
              ));
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
          const dmgRes = CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
          tookDamage = true;
          this.log(TEXT.logs.enemyHit(
            enemy.name,
            attack.total,
            this.player.ac,
            dmgRes.totalDamage,
            dmgRes.mitigatedDamage,
            this.player.shieldSegments
          ));
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
        if (this.dungeon.turnCount % 4 !== 0) {
          directions = [];
        } else {
          const centerX = enemy.x + (enemy.size - 1) / 2;
          const centerY = enemy.y + (enemy.size - 1) / 2;
          directions.sort((a, b) => {
            const dA = Math.hypot((centerX + a.dx) - this.player.x, (centerY + a.dy) - this.player.y);
            const dB = Math.hypot((centerX + b.dx) - this.player.x, (centerY + b.dy) - this.player.y);
            return dA - dB;
          });
        }
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
          if (dir.dx !== 0) {
            enemy.lastMoveDx = dir.dx;
            enemy.facingLeft = dir.dx < 0;
            enemy.flipX = enemy.facingLeft;
            enemy.facing = enemy.facingLeft ? "left" : "right";
          }
          Renderer.recordEnemyRelativePlayerX(enemy, this.player);
          break;
        }
      }
    });

    if (tookDamage) {
      if (this.player.hp > 0) sounds.playHurt();
      this.renderer.playHurt(this.player.hp <= 0);
    }

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
      if (this.stats) this.stats.totalSteps++;
    }
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.player.x = nextX;
    this.player.y = nextY;
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.renderer.settleLargeEnemyPresentationToPlayer?.();
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
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.player.moveBackward();
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
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

  openChest(rollOverride = null) {
    const chestKey = this.dungeon.getKey(this.player.x, this.player.y);
    if (!this.dungeon.chests.has(chestKey)) return null;

    this.dungeon.chests.delete(chestKey);
    this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    this.renderer.playChestOpening(this.player.x, this.player.y);

    const roll = (typeof rollOverride === "number" && Number.isFinite(rollOverride))
      ? Math.max(0, Math.min(0.999999, rollOverride))
      : Math.random();

    const potionCutoff = CHEST_REWARD_PROBABILITIES.potion; // 0.40 (40 %)
    const shieldCutoff = potionCutoff + CHEST_REWARD_PROBABILITIES.shield; // 0.50 (10 %)
    let outcome = null;

    if (roll < potionCutoff) {
      // 40 % de probabilidad: Poción de curación
      const restored = restoreHealth(this.player, rollPotionHealing(this.floor));
      if (restored.totalRestored > 0) {
        if (this.stats) {
          this.stats.potionsDrunk++;
          this.stats.totalHealing += restored.totalRestored;
        }
        this.renderer.showFloatingNumber(this.player.x, this.player.y, `+${restored.totalRestored} HP`, "healing");
      }
      sounds.playHeal();
      this.syncBiomeMusic();
      this.renderer.playDrinkPotion();
      this.log(TEXT.logs.chestPotion(restored.totalRestored));
      outcome = { type: "potion", healed: restored.totalRestored };
    } else if (roll < shieldCutoff) {
      // 10 % de probabilidad: Exactamente 1 segmento de escudo (máximo 1 por cofre)
      const currentSegs = Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(this.player.shieldSegments || 0)));
      if (currentSegs < MAX_SHIELD_SEGMENTS) {
        const shieldRes = restoreShieldSegments(this.player, 1);
        if (shieldRes.segmentsRestored > 0) {
          if (this.stats) {
            this.stats.bluePotionsDrunk++;
            this.stats.shieldSegmentsRestored += shieldRes.segmentsRestored;
          }
          this.renderer.showFloatingNumber(this.player.x, this.player.y, "+1 🛡", "shield");
        }
        sounds.playPickup();
        this.renderer.playDrinkPotion();
        this.log(TEXT.logs.chestShieldSegment(this.player.shieldSegments, this.player.maxShieldSegments));
        outcome = { type: "shield", segmentsAdded: shieldRes.segmentsRestored, currentSegments: this.player.shieldSegments };
      } else {
        // Comportamiento determinista sin re-tirada aleatoria cuando Lior ya tiene 10/10 segmentos:
        // Si le falta vida, recibe curación; si tiene la vida completa, recibe munición fija de Pistola.
        if (this.player.hp < this.player.maxHp) {
          const restored = restoreHealth(this.player, rollPotionHealing(this.floor));
          if (restored.totalRestored > 0) {
            if (this.stats) {
              this.stats.potionsDrunk++;
              this.stats.totalHealing += restored.totalRestored;
            }
            this.renderer.showFloatingNumber(this.player.x, this.player.y, `+${restored.totalRestored} HP`, "healing");
          }
          sounds.playHeal();
          this.syncBiomeMusic();
          this.renderer.playDrinkPotion();
          this.log(TEXT.logs.chestPotion(restored.totalRestored));
          outcome = { type: "shield_fallback_potion", healed: restored.totalRestored };
        } else {
          const fallbackWeapon = WEAPONS.PISTOL;
          const fallbackAmmo = 3 + Math.floor((this.tier - 1) * 1.5);
          this.player.unlockedWeapons.add(fallbackWeapon.id);
          this.player[fallbackWeapon.ammoProperty] += fallbackAmmo;
          sounds.playPickup();
          this.log(TEXT.logs.chestShieldFallbackAmmo(fallbackWeapon.name, fallbackAmmo));
          outcome = { type: "shield_fallback_ammo", weapon: fallbackWeapon.id, ammo: fallbackAmmo };
        }
      }
    } else {
      // 50 % restante: Recompensas actuales de armas / munición
      const weaponOptions = [WEAPONS.PISTOL, WEAPONS.MUSKET, WEAPONS.BLUNDERBUSS];
      const weapon = weaponOptions[Math.floor(Math.random() * weaponOptions.length)];
      const ammoDice = { pistol: 6, musket: 4, blunderbuss: 2 }[weapon.id];
      const ammo = rollDie(ammoDice) + Math.floor((this.tier - 1) * 1.5);
      const isNewWeapon = !this.player.unlockedWeapons.has(weapon.id);
      this.player.unlockedWeapons.add(weapon.id);
      this.player[weapon.ammoProperty] += ammo;
      sounds.playPickup();

      if (isNewWeapon) {
        this.log(TEXT.logs.chestWeapon(weapon.name, ammo));
      } else {
        this.log(TEXT.logs.chestAmmo(weapon.name, ammo));
      }
      outcome = { type: "weapon_or_ammo", weapon: weapon.id, ammo, isNewWeapon };
    }

    this.updateHUD();
    if (this.isShopOpen()) this.updateShopHUD();
    return outcome;
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
    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_BLUE_CHEST) {
      this.openBlueChest();
    }

    this.checkGoldenBunnyCapture();
    this.collectGroundPickups();
    this.updateHUD();

    if (this.player.x === this.dungeon.exit.x && this.player.y === this.dungeon.exit.y) {
      if (this.dungeon.enemies.length > 0) {
        this.log(TEXT.logs.exitLocked(this.dungeon.enemies.length));
      } else if (this.floor >= 100) {
        if (!this.player.hasRetrievedQuestItem) {
          this.log("La salida aguarda, pero antes debes abrir el cofre azul y recuperar el encargo.");
        } else {
          this.startEndingCinematic();
          return;
        }
      } else {
        sounds.playStep();
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
    let healed = false;
    let pickedGold = false;
    collected.forEach(pickup => {
      if (pickup.type === "gold") {
        this.addGold(pickup.amount, pickup.x, pickup.y);
        pickedGold = true;
        consumed.add(pickup);
        return;
      }

      if (pickup.type === "shield_potion") {
        const shieldRes = restoreShieldSegments(this.player, SHIELD_POTION_SEGMENTS);
        if (shieldRes.segmentsRestored === 0) return;
        if (this.stats) {
          this.stats.bluePotionsDrunk++;
          this.stats.shieldSegmentsRestored += shieldRes.segmentsRestored;
        }
        this.renderer.showFloatingNumber(pickup.x, pickup.y, `+${shieldRes.segmentsRestored} 🛡`, "shield");
        this.log(TEXT.logs.pickupShieldPotion(shieldRes.segmentsRestored, this.player.shieldSegments, this.player.maxShieldSegments));
        healed = true;
        consumed.add(pickup);
        return;
      }

      const restored = restoreHealth(this.player, rollPotionHealing(this.floor));
      if (restored.totalRestored === 0) return;
      if (this.stats) {
        this.stats.potionsDrunk++;
        this.stats.totalHealing += restored.totalRestored;
      }
      this.renderer.showFloatingNumber(pickup.x, pickup.y, `+${restored.totalRestored} HP`, "healing");
      healed = true;
      consumed.add(pickup);
    });
    this.dungeon.pickups = this.dungeon.pickups.filter(pickup => !consumed.has(pickup));
    if (pickedGold) sounds.playCoin();
    if (healed) {
      sounds.playHeal();
      this.syncBiomeMusic();
    }
    if (consumed.size > 0) {
      this.updateHUD();
      if (this.isShopOpen()) this.updateShopHUD();
    }
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
      let lastPointerDownAt = 0;
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        lastPointerDownAt = performance.now();
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
      btn.addEventListener("click", (e) => {
        if (e.detail === 0 && performance.now() - lastPointerDownAt > 350) action();
      });
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
    const victoryRestartBtn = document.getElementById("btn-victory-restart") || document.querySelector(".victory-restart-btn");
    if (victoryRestartBtn) victoryRestartBtn.addEventListener("click", () => this.resetGame());

    window.addEventListener("keydown", (e) => {
      if (this.endingCinematic && this.endingCinematic.isActive) {
        if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen();
          e.preventDefault();
        } else if (e.key === "Escape") {
          this.endingCinematic.finish(true);
          e.preventDefault();
        } else if (["Enter", " ", "ArrowRight"].includes(e.key)) {
          if (!e.repeat) this.endingCinematic.advanceOrReveal();
          e.preventDefault();
        }
        return;
      }

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

      if (this.isResumeModalOpen()) {
        if (["Enter", " "].includes(e.key)) {
          if (!e.repeat) this.resumeFromSavedGame();
          e.preventDefault();
        } else if (e.key === "Escape" && this.resumeModalMode === "suspend") {
          if (!e.repeat) this.resumeFromSavedGame();
          e.preventDefault();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen(true);
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
        case "b":
        case "B":
          if (!e.repeat) sounds.toggleMusicMute();
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

  if (!splashScreen) {
    new GameController({ playNarrativeIntro: true });
    return;
  }

  function startGame(fromUserGesture = false) {
    if (gameStarted) return;
    gameStarted = true;
    clearTimeout(stayTimer);
    try { sessionStorage.setItem("lior_intro_played", "true"); } catch {}

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

  sounds.preloadMidiTrack("intro");
  sounds.playLogoJingle();
  requestAnimationFrame(() => splashLogo?.classList.add("show"));
  stayTimer = setTimeout(startGame, SPLASH_FADE_MS + SPLASH_STAY_MS);

  splashScreen.addEventListener("click", () => startGame(true));
  splashScreen.addEventListener("touchstart", () => startGame(true), { passive: true });
});