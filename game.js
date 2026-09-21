/**
 * MOTOR DE AUDIO SINTETIZADO (Web Audio API)
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
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
      osc.frequency.setValueAtTime(
        freq,
        this.ctx.currentTime + idx * 0.08
      );

      gain.gain.setValueAtTime(
        0.08,
        this.ctx.currentTime + idx * 0.08
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + idx * 0.08 + 0.6
      );

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
    osc.frequency.exponentialRampToValueAtTime(
      30,
      this.ctx.currentTime + 0.05
    );

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.05
    );

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
    osc.frequency.exponentialRampToValueAtTime(
      180,
      this.ctx.currentTime + 0.12
    );

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.12
    );

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playShot(isMusket = false) {
    this.init();
    if (!this.ctx) return;

    const duration = isMusket ? 0.25 : 0.16;
    const bufferSize = Math.floor(
      this.ctx.sampleRate * duration
    );

    const buffer = this.ctx.createBuffer(
      1,
      bufferSize,
      this.ctx.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";

    filter.frequency.setValueAtTime(
      isMusket ? 650 : 950,
      this.ctx.currentTime
    );

    filter.frequency.exponentialRampToValueAtTime(
      80,
      this.ctx.currentTime + duration
    );

    const gain = this.ctx.createGain();

    gain.gain.setValueAtTime(
      isMusket ? 0.35 : 0.25,
      this.ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + duration
    );

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
    osc.frequency.exponentialRampToValueAtTime(
      40,
      this.ctx.currentTime + 0.2
    );

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.2
    );

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

      const start = this.ctx.currentTime + idx * 0.05;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        start + 0.25
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.25);
    });
  }

  playMisty() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      260,
      this.ctx.currentTime + 0.3
    );

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.3
    );

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

    osc.frequency.setValueAtTime(
      987.77,
      this.ctx.currentTime
    );

    osc.frequency.setValueAtTime(
      1318.51,
      this.ctx.currentTime + 0.07
    );

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.25
    );

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
    osc.frequency.exponentialRampToValueAtTime(
      25,
      this.ctx.currentTime + 0.7
    );

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + 0.7
    );

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.7);
  }
}

const sounds = new SoundEngine();

const CARDINALS = [
  "Norte (▲)",
  "Este (▶)",
  "Sur (▼)",
  "Oeste (◀)"
];

const DIR_VECTORS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
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
    name: "Espada",
    label: "Espada (área c/c 1.5)",
    minDmg: 1,
    maxDmg: 2,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },

  PISTOL: {
    name: "Pistola",
    label: "Pistola (frente 3x3)",
    minDmg: 1,
    maxDmg: 4,
    range: 3,
    isMelee: false,
    ammoType: "pistol"
  },

  MUSKET: {
    name: "Mosquete",
    label: "Mosquete (frente 5x3)",
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

function getRandomDungeonDimensions(min = 7, max = 50) {
  const width =
    Math.floor(Math.random() * (max - min + 1)) + min;

  let height =
    Math.floor(Math.random() * (max - min + 1)) + min;

  while (height === width) {
    height =
      Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    width,
    height
  };
}

class Dungeon {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    // Generación lazy:
    // solamente las casillas visitadas/consultadas se almacenan.
    this.tiles = new Map();

    // Memoria permanente del mapa.
    this.revealed = new Set();

    // Entidades vivas del piso.
    this.enemies = [];

    // Entrada y salida dentro de las esquinas interiores.
    this.entrance = {
      x: 1,
      y: height - 1
    };

    this.exit = {
      x: width - 2,
      y: 0
    };
  }

  getKey(x, y) {
    return `${x},${y}`;
  }

  isInsideBounds(x, y) {
    return (
      x >= 0 &&
      x < this.width &&
      y >= 0 &&
      y < this.height
    );
  }

  getTile(x, y) {
    if (!this.isInsideBounds(x, y)) {
      return TILE_OUT_OF_BOUNDS;
    }

    return this.tiles.get(this.getKey(x, y));
  }

  setTile(x, y, type) {
    if (!this.isInsideBounds(x, y)) return;

    this.tiles.set(
      this.getKey(x, y),
      type
    );
  }

  hasTile(x, y) {
    return this.tiles.has(
      this.getKey(x, y)
    );
  }

  markRevealed(x, y) {
    if (!this.isInsideBounds(x, y)) return;

    this.revealed.add(
      this.getKey(x, y)
    );
  }

  isRevealed(x, y) {
    return this.revealed.has(
      this.getKey(x, y)
    );
  }
}

class Player {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.direction = 0;

    this.maxHp = 61;
    this.hp = 61;

    // CA inicial solicitada.
    this.ac = 10;

    this.gold = 0;

    this.ammoPistol = 10;
    this.ammoMusket = 4;

    this.equippedWeapon = WEAPONS.SWORD;

    this.mistyStepCharges = 2;
    this.hasUsedLayOnHands = false;
  }

  turnLeft() {
    this.direction =
      (this.direction + 3) % 4;
  }

  turnRight() {
    this.direction =
      (this.direction + 1) % 4;
  }

  getNextForwardPos(steps = 1) {
    const vector =
      DIR_VECTORS[this.direction];

    return {
      x: this.x + vector.x * steps,
      y: this.y + vector.y * steps
    };
  }

  getNextBackwardPos() {
    const vector =
      DIR_VECTORS[this.direction];

    return {
      x: this.x - vector.x,
      y: this.y - vector.y
    };
  }

  moveForward() {
    const next =
      this.getNextForwardPos(1);

    this.x = next.x;
    this.y = next.y;
  }

  moveBackward() {
    const previous =
      this.getNextBackwardPos();

    this.x = previous.x;
    this.y = previous.y;
  }

  cycleWeapon() {
    if (
      this.equippedWeapon ===
      WEAPONS.SWORD
    ) {
      this.equippedWeapon =
        WEAPONS.PISTOL;
    } else if (
      this.equippedWeapon ===
      WEAPONS.PISTOL
    ) {
      this.equippedWeapon =
        WEAPONS.MUSKET;
    } else {
      this.equippedWeapon =
        WEAPONS.SWORD;
    }
  }

  useLayOnHands() {
    if (
      this.hasUsedLayOnHands ||
      this.hp >= this.maxHp
    ) {
      return false;
    }

    this.hp = Math.min(
      this.maxHp,
      this.hp + 6
    );

    this.hasUsedLayOnHands = true;

    return true;
  }
}

class DungeonGenerator {
  constructor(
    dungeon,
    floorNumber = 1
  ) {
    this.dungeon = dungeon;
    this.floorNumber = floorNumber;

    this.tier = Math.min(
      10,
      Math.floor(
        (floorNumber - 1) / 10
      ) + 1
    );

    const area =
      dungeon.width * dungeon.height;

    this.totalEnemies =
      Math.max(
        3,
        Math.floor(area / 20)
      );

    this.populateEnemies();
    this.placeSpecialTiles();
  }

  generateCells(
    originX,
    originY,
    size
  ) {
    const cells = [];

    for (
      let dy = 0;
      dy < size;
      dy++
    ) {
      for (
        let dx = 0;
        dx < size;
        dx++
      ) {
        cells.push({
          x: originX + dx,
          y: originY + dy
        });
      }
    }

    return cells;
  }

  populateEnemies() {
    /*
     * Mega Boss:
     * aparece cada 10 pisos.
     *
     * Su CA:
     * pisos 1-10  = 10
     * pisos 11-20 = 11
     * etc.
     */

    if (
      this.floorNumber % 10 === 0 &&
      this.dungeon.width >= 10 &&
      this.dungeon.height >= 10
    ) {
      let megaBossPlaced = false;

      for (
        let attempts = 0;
        attempts < 1000 &&
        !megaBossPlaced;
        attempts++
      ) {
        const mx =
          Math.floor(
            Math.random() *
              (this.dungeon.width - 6)
          ) + 2;

        const my =
          Math.floor(
            Math.random() *
              (this.dungeon.height - 6)
          ) + 2;

        if (
          Math.hypot(
            mx - this.dungeon.entrance.x,
            my - this.dungeon.entrance.y
          ) <= 6
        ) {
          continue;
        }

        if (
          Math.hypot(
            mx - this.dungeon.exit.x,
            my - this.dungeon.exit.y
          ) <= 4
        ) {
          continue;
        }

        const bossCells =
          this.generateCells(
            mx,
            my,
            4
          );

        this.dungeon.enemies.push({
          id:
            Math.random()
              .toString(36)
              .substring(2, 9),

          x: mx,
          y: my,

          startX: mx,
          startY: my,

          name:
            "MEGA BOSS (4x4)",

          hp: 16,
          maxHp: 16,

          ac:
            10 +
            (this.tier - 1),

          range: 4,

          isMegaBoss: true,
          isBoss: true,

          size: 4,

          cells: bossCells,

          summonedMinions: true
        });

        megaBossPlaced = true;
      }
    }

    let sequenceCounter = 0;

    for (
      let i = 0;
      i < this.totalEnemies;
      i++
    ) {
      const isBoss =
        sequenceCounter === 3 &&
        this.dungeon.width >= 6 &&
        this.dungeon.height >= 6;

      const enemySize =
        isBoss ? 2 : 1;

      let placed = false;

      for (
        let attempts = 0;
        attempts < 800 &&
        !placed;
        attempts++
      ) {
        const rx =
          Math.floor(
            Math.random() *
              (
                this.dungeon.width -
                enemySize -
                2
              )
          ) + 1;

        const ry =
          Math.floor(
            Math.random() *
              (
                this.dungeon.height -
                enemySize -
                2
              )
          ) + 1;

        if (
          Math.hypot(
            rx - this.dungeon.entrance.x,
            ry - this.dungeon.entrance.y
          ) <= 3.5
        ) {
          continue;
        }

        if (
          Math.hypot(
            rx - this.dungeon.exit.x,
            ry - this.dungeon.exit.y
          ) <= 2.5
        ) {
          continue;
        }

        const candidateCells =
          this.generateCells(
            rx,
            ry,
            enemySize
          );

        const collides =
          this.dungeon.enemies.some(
            existing =>
              existing.cells.some(
                c1 =>
                  candidateCells.some(
                    c2 =>
                      c1.x === c2.x &&
                      c1.y === c2.y
                  )
              )
          );

        if (collides) {
          continue;
        }

        if (isBoss) {
          this.dungeon.enemies.push({
            id:
              Math.random()
                .toString(36)
                .substring(2, 9),

            x: rx,
            y: ry,

            startX: rx,
            startY: ry,

            name:
              "Minijefe Intermedio (2x2)",

            hp: 8,
            maxHp: 8,

            /*
             * Minijefe:
             * CA base = 10
             * +7 por cada bloque adicional de 10 pisos.
             */
            ac:
              10 +
              (this.tier - 1) * 7,

            range: 3,

            isMegaBoss: false,
            isBoss: true,

            size: 2,

            cells: candidateCells,

            fearCooldown: 0
          });

          sequenceCounter = 0;
        } else {
          this.dungeon.enemies.push({
            id:
              Math.random()
                .toString(36)
                .substring(2, 9),

            x: rx,
            y: ry,

            startX: rx,
            startY: ry,

            name:
              "Sombra Hostil",

            hp: 2,
            maxHp: 2,

            /*
             * Sombra:
             * CA base = 8
             * +5 por cada bloque adicional de 10 pisos.
             */
            ac:
              8 +
              (this.tier - 1) * 5,

            range: 2,

            isMegaBoss: false,
            isBoss: false,

            size: 1,

            cells: candidateCells,

            fearCooldown: 0,

            commandedByBoss: null,

            summonedByMegaBoss: false
          });

          sequenceCounter++;
        }

        placed = true;
      }
    }
  }

  placeSpecialTiles() {
    /*
     * Las posiciones especiales se reservan desde la generación,
     * pero el resto del mapa continúa utilizando generación lazy.
     */

    const miniBosses =
      this.dungeon.enemies.filter(
        enemy =>
          enemy.isBoss &&
          !enemy.isMegaBoss
      );

    const targetShops =
      Math.floor(
        miniBosses.length / 3
      );

    const placedShopPositions = [];

    for (
      let i = 0;
      i < targetShops &&
      i < miniBosses.length;
      i++
    ) {
      const anchor =
        miniBosses[i];

      let placed = false;

      for (
        let attempts = 0;
        attempts < 300 &&
        !placed;
        attempts++
      ) {
        const ox =
          Math.floor(
            Math.random() * 11
          ) - 5;

        const oy =
          Math.floor(
            Math.random() * 11
          ) - 5;

        if (
          Math.hypot(ox, oy) > 5
        ) {
          continue;
        }

        const sx =
          anchor.startX + ox;

        const sy =
          anchor.startY + oy;

        if (
          !this.dungeon.isInsideBounds(
            sx,
            sy
          )
        ) {
          continue;
        }

        if (
          Math.hypot(
            sx -
              this.dungeon.entrance.x,
            sy -
              this.dungeon.entrance.y
          ) <= 3
        ) {
          continue;
        }

        if (
          Math.hypot(
            sx -
              this.dungeon.exit.x,
            sy -
              this.dungeon.exit.y
          ) <= 2
        ) {
          continue;
        }

        if (
          this.dungeon.enemies.some(
            enemy =>
              enemy.cells.some(
                cell =>
                  cell.x === sx &&
                  cell.y === sy
              )
          )
        ) {
          continue;
        }

        const tooClose =
          placedShopPositions.some(
            position =>
              Math.hypot(
                sx - position.x,
                sy - position.y
              ) < 3
          );

        if (tooClose) {
          continue;
        }

        this.dungeon.setTile(
          sx,
          sy,
          TILE_SHOP
        );

        placedShopPositions.push({
          x: sx,
          y: sy
        });

        placed = true;
      }
    }

    const targetHeals =
      Math.floor(
        this.dungeon.enemies.length / 5
      );

    const placedHealPositions = [];

    for (
      let attempts = 0;
      attempts < 1500 &&
      placedHealPositions.length <
        targetHeals;
      attempts++
    ) {
      const hx =
        Math.floor(
          Math.random() *
            (this.dungeon.width - 2)
        ) + 1;

      const hy =
        Math.floor(
          Math.random() *
            (this.dungeon.height - 2)
        ) + 1;

      if (
        Math.hypot(
          hx -
            this.dungeon.entrance.x,
          hy -
            this.dungeon.entrance.y
        ) <= 3
      ) {
        continue;
      }

      if (
        Math.hypot(
          hx -
            this.dungeon.exit.x,
          hy -
            this.dungeon.exit.y
        ) <= 2
      ) {
        continue;
      }

      if (
        this.dungeon.getTile(hx, hy) ===
        TILE_SHOP
      ) {
        continue;
      }

      if (
        this.dungeon.enemies.some(
          enemy =>
            enemy.cells.some(
              cell =>
                cell.x === hx &&
                cell.y === hy
            )
        )
      ) {
        continue;
      }

      const tooClose =
        placedHealPositions.some(
          position =>
            Math.hypot(
              hx - position.x,
              hy - position.y
            ) < 5
        );

      if (tooClose) {
        continue;
      }

      this.dungeon.setTile(
        hx,
        hy,
        TILE_HEAL_FOUNTAIN
      );

      placedHealPositions.push({
        x: hx,
        y: hy
      });
    }
  }

  ensureTileGenerated(x, y) {
    if (
      !this.dungeon.isInsideBounds(
        x,
        y
      )
    ) {
      return;
    }

    if (
      this.dungeon.hasTile(x, y)
    ) {
      return;
    }

    /*
     * Entrada.
     */
    if (
      x === this.dungeon.entrance.x &&
      y === this.dungeon.entrance.y
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_ENTRANCE
      );
      return;
    }

    /*
     * Salida.
     */
    if (
      x === this.dungeon.exit.x &&
      y === this.dungeon.exit.y
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_EXIT
      );
      return;
    }

    /*
     * Casilla inicial libre frente a la entrada.
     */
    if (
      x === this.dungeon.entrance.x &&
      y ===
        this.dungeon.entrance.y - 1
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_FLOOR
      );
      return;
    }

    /*
     * Casilla libre frente a la salida.
     */
    if (
      x === this.dungeon.exit.x &&
      y ===
        this.dungeon.exit.y + 1
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_FLOOR
      );
      return;
    }

    /*
     * Muro perimetral.
     */
    if (
      x === 0 ||
      x === this.dungeon.width - 1 ||
      y === 0 ||
      y === this.dungeon.height - 1
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_WALL
      );
      return;
    }

    /*
     * Nunca generar un muro debajo de una criatura.
     */
    if (
      this.dungeon.enemies.some(
        enemy =>
          enemy.cells.some(
            cell =>
              cell.x === x &&
              cell.y === y
          )
      )
    ) {
      this.dungeon.setTile(
        x,
        y,
        TILE_FLOOR
      );
      return;
    }

    /*
     * Generación lazy:
     * 20% muro / 80% suelo.
     */
    const isWall =
      Math.random() < 0.20;

    this.dungeon.setTile(
      x,
      y,
      isWall
        ? TILE_WALL
        : TILE_FLOOR
    );
  }
}

class CameraTransformer {
  static screenToWorld(
    screenX,
    screenY,
    player
  ) {
    const lateralOffset =
      screenX -
      CAMERA_CONFIG.playerScreenX;

    const forwardOffset =
      -(
        screenY -
        CAMERA_CONFIG.playerScreenY
      );

    let worldX = player.x;
    let worldY = player.y;

    switch (player.direction) {
      case 0:
        worldX += lateralOffset;
        worldY -= forwardOffset;
        break;

      case 1:
        worldX += forwardOffset;
        worldY += lateralOffset;
        break;

      case 2:
        worldX -= lateralOffset;
        worldY += forwardOffset;
        break;

      case 3:
        worldX -= forwardOffset;
        worldY -= lateralOffset;
        break;
    }

    return {
      x: worldX,
      y: worldY
    };
  }
}
class VisibilitySystem {
  /*
   * FOV en coordenadas de pantalla.
   *
   * Una casilla que todavía no existe no se considera
   * automáticamente suelo: primero debe ser generada.
   */
  static hasLineOfSight(
    screenX0,
    screenY0,
    screenX1,
    screenY1,
    dungeon,
    player,
    generator
  ) {
    let x0 = screenX0;
    let y0 = screenY0;

    const x1 = screenX1;
    const y1 = screenY1;

    const dx =
      Math.abs(x1 - x0);

    const dy =
      Math.abs(y1 - y0);

    const sx =
      x0 < x1 ? 1 : -1;

    const sy =
      y0 < y1 ? 1 : -1;

    let err = dx - dy;

    const maxSteps =
      dx + dy + 2;

    let steps = 0;

    while (true) {
      steps++;

      if (steps > maxSteps) {
        return false;
      }

      if (
        x0 === x1 &&
        y0 === y1
      ) {
        return true;
      }

      if (
        x0 !== screenX0 ||
        y0 !== screenY0
      ) {
        const worldPos =
          CameraTransformer.screenToWorld(
            x0,
            y0,
            player
          );

        if (
          !dungeon.isInsideBounds(
            worldPos.x,
            worldPos.y
          )
        ) {
          return false;
        }

        if (
          generator &&
          !dungeon.hasTile(
            worldPos.x,
            worldPos.y
          )
        ) {
          generator.ensureTileGenerated(
            worldPos.x,
            worldPos.y
          );
        }

        if (
          dungeon.getTile(
            worldPos.x,
            worldPos.y
          ) === TILE_WALL
        ) {
          return false;
        }
      }

      const e2 =
        2 * err;

      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }

      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  static hasWorldLineOfSight(
    x0,
    y0,
    x1,
    y1,
    dungeon,
    generator
  ) {
    let curX = x0;
    let curY = y0;

    const dx =
      Math.abs(x1 - curX);

    const dy =
      Math.abs(y1 - curY);

    const sx =
      curX < x1 ? 1 : -1;

    const sy =
      curY < y1 ? 1 : -1;

    let err = dx - dy;

    const maxSteps =
      dx + dy + 2;

    let steps = 0;

    while (true) {
      steps++;

      if (steps > maxSteps) {
        return false;
      }

      if (
        curX === x1 &&
        curY === y1
      ) {
        return true;
      }

      /*
       * Toda casilla intermedia debe existir.
       * Si no existe, se genera antes de decidir
       * si bloquea la visión.
       */
      if (
        curX !== x0 ||
        curY !== y0
      ) {
        if (
          !dungeon.isInsideBounds(
            curX,
            curY
          )
        ) {
          return false;
        }

        if (
          generator &&
          !dungeon.hasTile(
            curX,
            curY
          )
        ) {
          generator.ensureTileGenerated(
            curX,
            curY
          );
        }

        if (
          dungeon.getTile(
            curX,
            curY
          ) === TILE_WALL
        ) {
          return false;
        }
      }

      const e2 =
        2 * err;

      if (e2 > -dy) {
        err -= dy;
        curX += sx;
      }

      if (e2 < dx) {
        err += dx;
        curY += sy;
      }
    }
  }
}

class Renderer {
  constructor(
    canvas,
    dungeon,
    player,
    generator
  ) {
    this.canvas = canvas;
    this.ctx =
      canvas.getContext("2d");

    this.dungeon = dungeon;
    this.player = player;
    this.generator = generator;

    this.offscreenCanvas =
      document.createElement(
        "canvas"
      );

    this.offscreenCanvas.width =
      canvas.width;

    this.offscreenCanvas.height =
      canvas.height;

    this.offCtx =
      this.offscreenCanvas.getContext(
        "2d"
      );

    this.currentAngle =
      player.direction * 90;

    this.targetAngle =
      player.direction * 90;

    this.isAnimating = false;
  }

  setDungeon(
    dungeon,
    generator
  ) {
    this.dungeon = dungeon;
    this.generator = generator;
  }

  animateTurn(
    deltaQuarterTurns
  ) {
    this.targetAngle +=
      deltaQuarterTurns * 90;

    if (!this.isAnimating) {
      this.isAnimating = true;
      this.stepAnimation();
    }
  }

  stepAnimation() {
    const diff =
      this.targetAngle -
      this.currentAngle;

    if (
      Math.abs(diff) < 0.5
    ) {
      this.currentAngle =
        this.targetAngle;

      this.isAnimating = false;

      this.draw();

      return;
    }

    this.currentAngle +=
      diff * 0.28;

    this.drawWithRotation(
      this.currentAngle -
        this.player.direction * 90
    );

    requestAnimationFrame(
      () => this.stepAnimation()
    );
  }

  draw() {
    if (this.isAnimating) {
      return;
    }

    this.drawBase(
      this.ctx
    );
  }

  drawWithRotation(
    angleOffsetDeg
  ) {
    const {
      ctx,
      canvas
    } = this;

    const {
      tileSize,
      playerScreenX,
      playerScreenY
    } = CAMERA_CONFIG;

    const pivotX =
      playerScreenX *
        tileSize +
      tileSize / 2;

    const pivotY =
      playerScreenY *
        tileSize +
      tileSize / 2;

    this.drawBase(
      this.offCtx
    );

    ctx.fillStyle =
      "#000000";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.save();

    ctx.translate(
      pivotX,
      pivotY
    );

    ctx.rotate(
      (angleOffsetDeg *
        Math.PI) /
        180
    );

    ctx.translate(
      -pivotX,
      -pivotY
    );

    ctx.drawImage(
      this.offscreenCanvas,
      0,
      0
    );

    ctx.restore();
  }

  drawBase(targetCtx) {
    const {
      canvas
    } = this;

    const {
      cols,
      rows,
      tileSize,
      playerScreenX,
      playerScreenY
    } = CAMERA_CONFIG;

    targetCtx.fillStyle =
      "#000000";

    targetCtx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const enemiesRemain =
      this.dungeon.enemies.some(
        enemy =>
          enemy.hp > 0
      );

    /*
     * Primero generamos el área visible.
     * Esto también hace que FOV no vea a través
     * de casillas inexistentes.
     */
    for (
      let sy = 0;
      sy < rows;
      sy++
    ) {
      for (
        let sx = 0;
        sx < cols;
        sx++
      ) {
        const worldCoord =
          CameraTransformer.screenToWorld(
            sx,
            sy,
            this.player
          );

        if (
          this.dungeon.isInsideBounds(
            worldCoord.x,
            worldCoord.y
          )
        ) {
          this.generator.ensureTileGenerated(
            worldCoord.x,
            worldCoord.y
          );
        }
      }
    }

    for (
      let sy = 0;
      sy < rows;
      sy++
    ) {
      for (
        let sx = 0;
        sx < cols;
        sx++
      ) {
        const worldCoord =
          CameraTransformer.screenToWorld(
            sx,
            sy,
            this.player
          );

        const tileType =
          this.dungeon.getTile(
            worldCoord.x,
            worldCoord.y
          );

        const px =
          sx * tileSize;

        const py =
          sy * tileSize;

        const inLineOfSight =
          VisibilitySystem.hasLineOfSight(
            playerScreenX,
            playerScreenY,
            sx,
            sy,
            this.dungeon,
            this.player,
            this.generator
          );

        if (inLineOfSight) {
          this.dungeon.markRevealed(
            worldCoord.x,
            worldCoord.y
          );
        }

        const wasEverRevealed =
          this.dungeon.isRevealed(
            worldCoord.x,
            worldCoord.y
          );

        /*
         * Niebla permanente.
         */
        if (
          !inLineOfSight &&
          !wasEverRevealed
        ) {
          continue;
        }

        if (
          tileType === TILE_WALL
        ) {
          targetCtx.fillStyle =
            inLineOfSight
              ? "#ffffff"
              : "#444444";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );
        }

        else if (
          tileType === TILE_ENTRANCE
        ) {
          targetCtx.fillStyle =
            inLineOfSight
              ? "#00e676"
              : "#00552b";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );
        }

        else if (
          tileType === TILE_EXIT
        ) {
          targetCtx.fillStyle =
            enemiesRemain
              ? (
                  inLineOfSight
                    ? "#b71c1c"
                    : "#4a0000"
                )
              : (
                  inLineOfSight
                    ? "#ffb300"
                    : "#664700"
                );

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );

          if (
            inLineOfSight &&
            enemiesRemain
          ) {
            targetCtx.strokeStyle =
              "#ffffff";

            targetCtx.lineWidth =
              1.5;

            targetCtx.strokeRect(
              px + 4,
              py + 4,
              tileSize - 8,
              tileSize - 8
            );
          }
        }

        else if (
          tileType ===
          TILE_HEAL_FOUNTAIN
        ) {
          targetCtx.fillStyle =
            inLineOfSight
              ? "#062817"
              : "#02120a";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );

          if (inLineOfSight) {
            targetCtx.fillStyle =
              "#00e676";

            targetCtx.font =
              "bold 20px monospace";

            targetCtx.textAlign =
              "center";

            targetCtx.textBaseline =
              "middle";

            targetCtx.fillText(
              "+",
              px +
                tileSize / 2,
              py +
                tileSize / 2
            );
          }
        }

        else if (
          tileType === TILE_SHOP
        ) {
          targetCtx.fillStyle =
            inLineOfSight
              ? "#2b2204"
              : "#141002";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );

          if (inLineOfSight) {
            targetCtx.fillStyle =
              "#ffd700";

            targetCtx.font =
              "bold 18px monospace";

            targetCtx.textAlign =
              "center";

            targetCtx.textBaseline =
              "middle";

            targetCtx.fillText(
              "T",
              px +
                tileSize / 2,
              py +
                tileSize / 2
            );
          }
        }

        else if (
          tileType === TILE_FLOOR
        ) {
          targetCtx.fillStyle =
            "#000000";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );
        }

        else if (
          tileType ===
          TILE_OUT_OF_BOUNDS
        ) {
          targetCtx.fillStyle =
            "#111111";

          targetCtx.fillRect(
            px,
            py,
            tileSize,
            tileSize
          );
        }

        targetCtx.strokeStyle =
          inLineOfSight
            ? "#2e2e34"
            : "#141416";

        targetCtx.lineWidth = 1;

        targetCtx.strokeRect(
          px,
          py,
          tileSize,
          tileSize
        );
      }
    }

    /*
     * Enemigos:
     * solamente aparecen cuando están
     * dentro de la visión activa.
     */
    this.dungeon.enemies.forEach(
      enemy => {
        if (
          enemy.hp <= 0 ||
          !enemy.cells
        ) {
          return;
        }

        enemy.cells.forEach(
          cell => {
            for (
              let sy = 0;
              sy < rows;
              sy++
            ) {
              for (
                let sx = 0;
                sx < cols;
                sx++
              ) {
                const wPos =
                  CameraTransformer.screenToWorld(
                    sx,
                    sy,
                    this.player
                  );

                if (
                  wPos.x !== cell.x ||
                  wPos.y !== cell.y
                ) {
                  continue;
                }

                const visible =
                  VisibilitySystem.hasLineOfSight(
                    playerScreenX,
                    playerScreenY,
                    sx,
                    sy,
                    this.dungeon,
                    this.player,
                    this.generator
                  );

                if (!visible) {
                  continue;
                }

                const px =
                  sx * tileSize;

                const py =
                  sy * tileSize;

                if (
                  enemy.isMegaBoss
                ) {
                  targetCtx.fillStyle =
                    "#800020";

                  targetCtx.fillRect(
                    px + 1,
                    py + 1,
                    tileSize - 2,
                    tileSize - 2
                  );

                  targetCtx.strokeStyle =
                    "#ffd700";

                  targetCtx.lineWidth =
                    2;

                  targetCtx.strokeRect(
                    px + 1,
                    py + 1,
                    tileSize - 2,
                    tileSize - 2
                  );
                }

                else if (
                  enemy.isBoss
                ) {
                  targetCtx.fillStyle =
                    "#cc0029";

                  targetCtx.fillRect(
                    px + 2,
                    py + 2,
                    tileSize - 4,
                    tileSize - 4
                  );

                  targetCtx.strokeStyle =
                    "#ffffff";

                  targetCtx.lineWidth =
                    1.5;

                  targetCtx.strokeRect(
                    px + 2,
                    py + 2,
                    tileSize - 4,
                    tileSize - 4
                  );
                }

                else {
                  const cx =
                    px +
                    tileSize / 2;

                  const cy =
                    py +
                    tileSize / 2;

                  targetCtx.fillStyle =
                    "#ff3333";

                  targetCtx.beginPath();

                  targetCtx.arc(
                    cx,
                    cy,
                    7,
                    0,
                    Math.PI * 2
                  );

                  targetCtx.fill();
                }
              }
            }
          }
        );
      }
    );

    /*
     * Lior siempre permanece fija.
     */
    const liorPx =
      playerScreenX *
        tileSize +
      tileSize / 2;

    const liorPy =
      playerScreenY *
        tileSize +
      tileSize / 2;

    targetCtx.fillStyle =
      this.player.hp > 0
        ? "#00b0ff"
        : "#555555";

    targetCtx.beginPath();

    targetCtx.arc(
      liorPx,
      liorPy,
      tileSize * 0.35,
      0,
      Math.PI * 2
    );

    targetCtx.fill();

    if (
      this.player.hp > 0
    ) {
      targetCtx.strokeStyle =
        "#ffffff";

      targetCtx.lineWidth =
        2.5;

      targetCtx.beginPath();

      targetCtx.moveTo(
        liorPx,
        liorPy
      );

      targetCtx.lineTo(
        liorPx,
        liorPy -
          tileSize * 0.65
      );

      targetCtx.stroke();
    }
  }
}

class CombatSystem {
  static getMinDistToPlayer(
    player,
    enemy
  ) {
    if (
      !enemy.cells ||
      enemy.cells.length === 0
    ) {
      return 999;
    }

    let minDist =
      Infinity;

    for (
      const cell of enemy.cells
    ) {
      minDist =
        Math.min(
          minDist,
          Math.hypot(
            cell.x - player.x,
            cell.y - player.y
          )
        );
    }

    return minDist;
  }

  static canEnemySeePlayer(
    player,
    dungeon,
    enemy,
    generator
  ) {
    if (
      !enemy.cells ||
      enemy.cells.length === 0
    ) {
      return false;
    }

    return enemy.cells.some(
      cell =>
        VisibilitySystem.hasWorldLineOfSight(
          cell.x,
          cell.y,
          player.x,
          player.y,
          dungeon,
          generator
        )
    );
  }

  static isCellInWeaponRange(
    player,
    targetX,
    targetY,
    weapon
  ) {
    const dx =
      targetX - player.x;

    const dy =
      targetY - player.y;

    if (
      weapon.isMelee
    ) {
      return (
        Math.hypot(dx, dy) <=
        weapon.range
      );
    }

    let forward = 0;
    let lateral = 0;

    switch (
      player.direction
    ) {
      case 0:
        forward = -dy;
        lateral = dx;
        break;

      case 1:
        forward = dx;
        lateral = dy;
        break;

      case 2:
        forward = dy;
        lateral = -dx;
        break;

      case 3:
        forward = -dx;
        lateral = -dy;
        break;
    }

    return (
      forward >= 1 &&
      forward <= weapon.range &&
      Math.abs(lateral) <= 1
    );
  }

  static executeAttack(game) {
    const {
      player,
      dungeon
    } = game;

    if (
      player.hp <= 0
    ) {
      return;
    }

    const weapon =
      player.equippedWeapon;

    const hitBonus =
      game.hitBonus;

    const dmgBonus =
      game.dmgBonus;

    /*
     * Munición.
     */
    if (
      weapon.ammoType ===
      "pistol"
    ) {
      if (
        player.ammoPistol <= 0
      ) {
        game.log(
          "¡Sin balas de Pistola! Cambia de arma."
        );
        return;
      }

      player.ammoPistol--;

      sounds.playShot(false);
    }

    else if (
      weapon.ammoType ===
      "musket"
    ) {
      if (
        player.ammoMusket <= 0
      ) {
        game.log(
          "¡Sin balas de Mosquete! Cambia de arma."
        );
        return;
      }

      player.ammoMusket--;

      sounds.playShot(true);
    }

    else {
      sounds.playSword();
    }

    /*
     * ESPADA:
     * área circular de 1.5 casillas.
     */
    if (
      weapon.isMelee
    ) {
      const targets =
        dungeon.enemies.filter(
          enemy =>
            enemy.hp > 0 &&
            enemy.cells &&
            enemy.cells.some(
              cell =>
                Math.hypot(
                  cell.x - player.x,
                  cell.y - player.y
                ) <= 1.5
            )
        );

      if (
        targets.length === 0
      ) {
        game.log(
          "Blandes tu espada en círculo, pero no hay enemigos al alcance."
        );
      }

      else {
        game.log(
          `¡Giro de espada! Afecta a ${targets.length} criatura(s).`
        );

        for (
          const target of targets
        ) {
          const d20 =
            rollDie(20);

          const total =
            d20 + hitBonus;

          if (
            d20 === 20 ||
            total >= target.ac
          ) {
            const damage =
              rollDie(2) +
              dmgBonus;

            target.hp -= damage;

            game.log(
              `Impacto [${total} vs CA ${target.ac}]: ${damage} daño a ${target.name}. (HP ${Math.max(0, target.hp)})`
            );
          }

          else {
            game.log(
              `La espada rebota en ${target.name} [${total} vs CA ${target.ac}].`
            );
          }
        }
      }
    }

    /*
     * ARMAS A DISTANCIA.
     */
    else {
      let target = null;
      let nearest = Infinity;

      for (
        const enemy of dungeon.enemies
      ) {
        if (
          enemy.hp <= 0
        ) {
          continue;
        }

        for (
          const cell of
          enemy.cells || []
        ) {
          if (
            !CombatSystem.isCellInWeaponRange(
              player,
              cell.x,
              cell.y,
              weapon
            )
          ) {
            continue;
          }

          if (
            !VisibilitySystem.hasWorldLineOfSight(
              player.x,
              player.y,
              cell.x,
              cell.y,
              dungeon,
              game.generator
            )
          ) {
            continue;
          }

          const distance =
            Math.hypot(
              cell.x -
                player.x,
              cell.y -
                player.y
            );

          if (
            distance < nearest
          ) {
            nearest =
              distance;

            target =
              enemy;
          }
        }
      }

      if (!target) {
        game.log(
          `Disparas tu ${weapon.name}... pero no hay un objetivo visible en el cono.`
        );
      }

      else {
        const d20 =
          rollDie(20);

        const total =
          d20 + hitBonus;

        if (
          d20 === 20 ||
          total >= target.ac
        ) {
          const damage =
            (
              weapon ===
              WEAPONS.PISTOL
                ? rollDie(4)
                : rollDie(6)
            ) + dmgBonus;

          target.hp -= damage;

          game.log(
            `¡Impacto [${total} vs CA ${target.ac}]! ${damage} daño a ${target.name}. (HP ${Math.max(0, target.hp)})`
          );
        }

        else {
          game.log(
            `El disparo rebotó [${total} vs CA ${target.ac}] contra ${target.name}.`
          );
        }
      }
    }

    /*
     * Ataque = acción de Lior.
     * Por tanto, después de resolver el ataque,
     * actúan los enemigos.
     */
    game.resolveDeaths();
    game.processEnemiesTurn();

    game.updateHUD();
    game.renderer.draw();
  }
}
class GameController {
  constructor() {
    this.floor = 1;

    this.canvas =
      document.getElementById(
        "viewport"
      );

    this.shopModal =
      document.getElementById(
        "shop-modal"
      );

    this.isShopOpen = false;

    /*
     * Un turno solamente aumenta cuando
     * una acción real de Lior lo consume.
     *
     * Girar, curarse y Misty Step NO
     * llegan aquí.
     */
    this.turnNumber = 0;

    /*
     * Contador de gracia del Mega Boss.
     *
     * boss.id -> cantidad de turnos
     * completos sin esbirros.
     */
    this.megaBossGraceTurns =
      new Map();

    this.initDungeonFloor();

    this.bindEvents();
    this.bindShopEvents();
  }

  get tier() {
    return Math.min(
      10,
      Math.floor(
        (this.floor - 1) / 10
      ) + 1
    );
  }

  /*
   * Lior:
   *
   * Piso 1-10  = CA 10
   * Piso 11-20 = CA 11
   * Piso 21-30 = CA 12
   */
  get playerAC() {
    return (
      10 +
      (this.tier - 1)
    );
  }

  /*
   * Bono de impacto de Lior.
   */
  get hitBonus() {
    return this.tier;
  }

  /*
   * Bono de daño existente.
   */
  get dmgBonus() {
    return Math.min(
      20,
      1 +
        Math.floor(
          ((this.floor - 1) * 19) /
            99
        )
    );
  }

  /*
   * CA de enemigos.
   *
   * Mega Boss:
   * +1 cada 10 pisos.
   *
   * Minijefe:
   * +7 cada 10 pisos.
   *
   * Sombra:
   * +5 cada 10 pisos.
   */
  getEnemyAC(type) {
    const block =
      this.tier - 1;

    if (
      type === "mega"
    ) {
      return 10 + block;
    }

    if (
      type === "mini"
    ) {
      return 10 + block * 7;
    }

    return 8 + block * 5;
  }

  initDungeonFloor() {
    const {
      width,
      height
    } =
      getRandomDungeonDimensions(
        7,
        50
      );

    this.dungeon =
      new Dungeon(
        width,
        height
      );

    this.generator =
      new DungeonGenerator(
        this.dungeon,
        this.floor
      );

    this.turnNumber = 0;

    this.megaBossGraceTurns.clear();

    if (!this.player) {
      this.player =
        new Player(
          this.dungeon.entrance.x,
          this.dungeon.entrance.y
        );
    }

    else {
      this.player.x =
        this.dungeon.entrance.x;

      this.player.y =
        this.dungeon.entrance.y;

      this.player.hasUsedLayOnHands =
        false;

      this.player.mistyStepCharges =
        2;
    }

    /*
     * Cada piso comienza mirando
     * hacia el Norte.
     */
    this.player.direction = 0;

    this.player.ac =
      this.playerAC;

    if (!this.renderer) {
      this.renderer =
        new Renderer(
          this.canvas,
          this.dungeon,
          this.player,
          this.generator
        );
    }

    else {
      this.renderer.player =
        this.player;

      this.renderer.currentAngle =
        0;

      this.renderer.targetAngle =
        0;

      this.renderer.isAnimating =
        false;

      this.renderer.setDungeon(
        this.dungeon,
        this.generator
      );
    }

    this.updateHUD();

    const megaBossPresent =
      this.dungeon.enemies.some(
        enemy =>
          enemy.isMegaBoss
      );

    const bossCount =
      this.dungeon.enemies.filter(
        enemy =>
          enemy.isBoss &&
          !enemy.isMegaBoss
      ).length;

    let desc =
      `Piso ${this.floor} (Tier ${this.tier}): ${width}x${height}. ` +
      `CA Lior: ${this.player.ac}, ` +
      `Impacto: +${this.hitBonus}, ` +
      `Daño: +${this.dmgBonus}.`;

    if (
      megaBossPresent
    ) {
      desc +=
        " (¡MEGA BOSS 4x4!)";
    }

    if (
      bossCount > 0
    ) {
      desc +=
        ` [${bossCount} Minijefes]`;
    }

    this.log(desc);

    this.renderer.draw();
  }

  log(message) {
    const logBox =
      document.getElementById(
        "log-entries"
      );

    if (!logBox) return;

    const entry =
      document.createElement(
        "div"
      );

    entry.textContent =
      `> ${message}`;

    logBox.appendChild(entry);

    const container =
      document.getElementById(
        "log-container"
      );

    if (container) {
      container.scrollTop =
        container.scrollHeight;
    }
  }

  /*
   * Cantidad real de enemigos vivos.
   */
  getActiveEnemyCount() {
    return this.dungeon.enemies.filter(
      enemy =>
        enemy.hp > 0
    ).length;
  }

  updateHUD() {
    document.getElementById(
      "hud-floor"
    ).textContent =
      this.floor;

    document.getElementById(
      "hud-dir"
    ).textContent =
      CARDINALS[
        this.player.direction
      ];

    document.getElementById(
      "hud-hp"
    ).textContent =
      this.player.hp;

    document.getElementById(
      "hud-gold"
    ).textContent =
      this.player.gold;

    document.getElementById(
      "hud-ammo"
    ).textContent =
      `P:${this.player.ammoPistol} | M:${this.player.ammoMusket}`;

    document.getElementById(
      "hud-weapon"
    ).textContent =
      this.player.equippedWeapon.name;

    document.getElementById(
      "misty-charges"
    ).textContent =
      this.player.mistyStepCharges;

    const doorEl =
      document.getElementById(
        "hud-door"
      );

    const remaining =
      this.getActiveEnemyCount();

    if (
      remaining > 0
    ) {
      doorEl.textContent =
        `BLOQUEADA (${remaining})`;

      doorEl.className =
        "door-locked";
    }

    else {
      doorEl.textContent =
        "ABIERTA";

      doorEl.className =
        "door-open";
    }

    const mistyBtn =
      document.getElementById(
        "btn-b"
      );

    mistyBtn.disabled =
      this.player.mistyStepCharges <=
        0 ||
      this.player.hp <= 0;

    const layBtn =
      document.getElementById(
        "btn-c"
      );

    layBtn.disabled =
      this.player.hasUsedLayOnHands ||
      this.player.hp <= 0;

    const goldDisplay =
      document.getElementById(
        "shop-gold-display"
      );

    if (goldDisplay) {
      goldDisplay.textContent =
        this.player.gold;
    }
  }

  openShop() {
    this.isShopOpen = true;

    this.shopModal.classList.remove(
      "hidden"
    );

    this.updateHUD();

    sounds.playCoin();

    this.log(
      "Entraste a la tienda del Mercader de Sombras."
    );
  }

  closeShop() {
    this.isShopOpen = false;

    this.shopModal.classList.add(
      "hidden"
    );

    this.renderer.draw();
  }

  bindShopEvents() {
    document
      .getElementById(
        "buy-pistol-ammo"
      )
      .addEventListener(
        "click",
        () => {
          if (
            this.player.gold >= 1
          ) {
            this.player.gold -= 1;
            this.player.ammoPistol += 4;

            sounds.playCoin();

            this.log(
              "Compraste 4 balas de Pistola por 1 PO."
            );

            this.updateHUD();
          }

          else {
            this.log(
              "Oro insuficiente."
            );
          }
        }
      );

    document
      .getElementById(
        "buy-musket-ammo"
      )
      .addEventListener(
        "click",
        () => {
          if (
            this.player.gold >= 1
          ) {
            this.player.gold -= 1;
            this.player.ammoMusket += 2;

            sounds.playCoin();

            this.log(
              "Compraste 2 balas de Mosquete por 1 PO."
            );

            this.updateHUD();
          }

          else {
            this.log(
              "Oro insuficiente."
            );
          }
        }
      );

    document
      .getElementById(
        "buy-potion"
      )
      .addEventListener(
        "click",
        () => {
          if (
            this.player.gold >= 2
          ) {
            if (
              this.player.hp >=
              this.player.maxHp
            ) {
              this.log(
                "Tu salud ya está al máximo."
              );

              return;
            }

            this.player.gold -= 2;

            const heal =
              rollDie(8) + 5;

            this.player.hp =
              Math.min(
                this.player.maxHp,
                this.player.hp + heal
              );

            sounds.playHeal();

            this.log(
              `Poción bebida: +${heal} HP restaurados.`
            );

            this.updateHUD();
          }

          else {
            this.log(
              "Oro insuficiente."
            );
          }
        }
      );

    document
      .getElementById(
        "close-shop"
      )
      .addEventListener(
        "click",
        () => {
          this.closeShop();
        }
      );
  }

  /*
   * Determina si una coordenada pertenece
   * al borde exterior indestructible.
   */
  isPerimeterWall(x, y) {
    return (
      x === 0 ||
      x === this.dungeon.width - 1 ||
      y === 0 ||
      y === this.dungeon.height - 1
    );
  }

  /*
   * Comprueba ocupación de criaturas.
   */
  isOccupiedByEnemy(
    x,
    y,
    ignoreEnemy = null
  ) {
    return this.dungeon.enemies.some(
      enemy =>
        enemy !== ignoreEnemy &&
        enemy.hp > 0 &&
        (enemy.cells || []).some(
          cell =>
            cell.x === x &&
            cell.y === y
        )
    );
  }

  /*
   * Casilla que una criatura puede ocupar.
   */
  isFreeDestination(
    x,
    y,
    ignoreEnemy = null
  ) {
    if (
      !this.dungeon.isInsideBounds(
        x,
        y
      )
    ) {
      return false;
    }

    this.generator.ensureTileGenerated(
      x,
      y
    );

    const tile =
      this.dungeon.getTile(
        x,
        y
      );

    return (
      tile !== TILE_WALL &&
      tile !== TILE_OUT_OF_BOUNDS &&
      !this.isOccupiedByEnemy(
        x,
        y,
        ignoreEnemy
      )
    );
  }

  /*
   * MISTY STEP
   *
   * Es una acción de gracia.
   * No mueve a los enemigos.
   *
   * Recorre como máximo 8 casillas
   * hacia delante.
   *
   * Si encuentra muro interior:
   * atraviesa el muro y se detiene
   * en la primera casilla libre que
   * encuentre después.
   *
   * Si encuentra el perímetro:
   * Lior muere.
   */
  castMistyStep() {
    if (
      this.isShopOpen ||
      this.player.mistyStepCharges <= 0 ||
      this.player.hp <= 0
    ) {
      return;
    }

    const dir =
      DIR_VECTORS[
        this.player.direction
      ];

    let wallEncountered = false;
    let destination = null;
    let lastFree = null;

    this.log(
      "Invocas Paso Brumoso..."
    );

    for (
      let step = 1;
      step <= 8;
      step++
    ) {
      const x =
        this.player.x +
        dir.x * step;

      const y =
        this.player.y +
        dir.y * step;

      /*
       * Si sale de los límites significa
       * que está intentando atravesar
       * el muro exterior.
       */
      if (
        !this.dungeon.isInsideBounds(
          x,
          y
        )
      ) {
        this.player.mistyStepCharges--;

        this.player.hp = 0;

        sounds.playMisty();
        sounds.playDeath();

        this.log(
          "¡Paso Brumoso intenta atravesar el muro perimetral! Lior muere."
        );

        this.updateHUD();
        this.renderer.draw();

        return;
      }

      this.generator.ensureTileGenerated(
        x,
        y
      );

      const tile =
        this.dungeon.getTile(
          x,
          y
        );

      /*
       * Muro.
       */
      if (
        tile === TILE_WALL
      ) {
        /*
         * El perímetro no se puede
         * atravesar.
         */
        if (
          this.isPerimeterWall(
            x,
            y
          )
        ) {
          this.player.mistyStepCharges--;

          this.player.hp = 0;

          sounds.playMisty();
          sounds.playDeath();

          this.log(
            "¡El muro perimetral es infranqueable! Lior muere al intentar atravesarlo."
          );

          this.updateHUD();
          this.renderer.draw();

          return;
        }

        /*
         * Es un muro interior.
         */
        wallEncountered = true;

        continue;
      }

      /*
       * La casilla está libre.
       */
      if (
        !this.isOccupiedByEnemy(
          x,
          y
        )
      ) {
        /*
         * Si ya atravesamos un muro,
         * ESTA es la primera casilla libre
         * posterior al muro.
         */
        if (
          wallEncountered
        ) {
          destination = {
            x,
            y
          };

          break;
        }

        /*
         * Si todavía no encontramos muro,
         * guardamos la última casilla libre.
         *
         * Esto permite el desplazamiento
         * normal hacia adelante dentro
         * del máximo de 8 casillas.
         */
        lastFree = {
          x,
          y
        };
      }
    }

    /*
     * Si encontramos muro, solamente
     * se permite el destino posterior.
     */
    const finalDestination =
      wallEncountered
        ? destination
        : lastFree;

    if (
      !finalDestination
    ) {
      this.log(
        "Paso Brumoso no encontró una casilla de destino válida."
      );

      return;
    }

    this.player.mistyStepCharges--;

    this.player.x =
      finalDestination.x;

    this.player.y =
      finalDestination.y;

    sounds.playMisty();

    this.log(
      `Paso Brumoso: apareces en (${this.player.x}, ${this.player.y}).`
    );

    /*
     * Curación/fuente/tienda pueden
     * activarse al llegar.
     *
     * No consume turno enemigo.
     */
    this.handleTileInteractions();

    this.updateHUD();

    this.renderer.draw();
  }

  /*
   * Manos Curativas es acción de gracia.
   */
  useLayOnHands() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    if (
      this.player.useLayOnHands()
    ) {
      sounds.playHeal();

      this.log(
        "Manos Curativas: +6 HP."
      );

      this.updateHUD();
      this.renderer.draw();
    }

    else {
      this.log(
        "Manos Curativas ya fue usado en este piso o Lior ya está al máximo."
      );
    }
  }

  /*
   * Cambiar arma no consume turno.
   */
  cycleWeapon() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    this.player.cycleWeapon();

    this.log(
      `Equipada: ${this.player.equippedWeapon.label}`
    );

    this.updateHUD();
  }

  /*
   * Girar tampoco consume turno.
   */
  turnLeft() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    this.player.turnLeft();

    sounds.playStep();

    this.log(
      `Giras a la izquierda. Miras al ${CARDINALS[this.player.direction]}.`
    );

    this.updateHUD();

    this.renderer.animateTurn(-1);
  }

  turnRight() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    this.player.turnRight();

    sounds.playStep();

    this.log(
      `Giras a la derecha. Miras al ${CARDINALS[this.player.direction]}.`
    );

    this.updateHUD();

    this.renderer.animateTurn(1);
  }

  /*
   * Enemigos cercanos a otro enemigo.
   */
  getEnemyNeighbors(
    enemy,
    radius = 2
  ) {
    return this.dungeon.enemies.filter(
      other => {
        if (
          other === enemy ||
          other.hp <= 0 ||
          !other.cells
        ) {
          return false;
        }

        return (
          CombatSystem.getMinDistToPlayer(
            {
              x: enemy.x,
              y: enemy.y
            },
            other
          ) <= radius
        );
      }
    );
  }

  /*
   * Sombras próximas a un Minijefe.
   */
  getAdjacentShadows(
    enemy,
    radius = 1.1
  ) {
    return this.dungeon.enemies.filter(
      other => {
        if (
          other === enemy ||
          other.hp <= 0 ||
          other.isBoss ||
          other.isMegaBoss
        ) {
          return false;
        }

        return (
          Math.hypot(
            other.x - enemy.x,
            other.y - enemy.y
          ) <= radius
        );
      }
    );
  }

  /*
   * Comprueba si una criatura puede
   * mover todas sus celdas.
   */
  canEnemyMoveTo(
    enemy,
    dx,
    dy
  ) {
    const candidateCells =
      enemy.cells.map(
        cell => ({
          x: cell.x + dx,
          y: cell.y + dy
        })
      );

    /*
     * Primero verificamos límites,
     * muros y Lior.
     */
    for (
      const cell of candidateCells
    ) {
      if (
        !this.dungeon.isInsideBounds(
          cell.x,
          cell.y
        )
      ) {
        return false;
      }

      this.generator.ensureTileGenerated(
        cell.x,
        cell.y
      );

      if (
        this.dungeon.getTile(
          cell.x,
          cell.y
        ) === TILE_WALL
      ) {
        return false;
      }

      if (
        cell.x === this.player.x &&
        cell.y === this.player.y
      ) {
        return false;
      }
    }

    /*
     * Una criatura nunca puede
     * quedar encima de otra.
     */
    for (
      const other of this.dungeon.enemies
    ) {
      if (
        other === enemy ||
        other.hp <= 0
      ) {
        continue;
      }

      if (
        (other.cells || []).some(
          otherCell =>
            candidateCells.some(
              candidate =>
                candidate.x ===
                  otherCell.x &&
                candidate.y ===
                  otherCell.y
            )
        )
      ) {
        return false;
      }
    }

    return true;
  }

  moveEnemy(
    enemy,
    dx,
    dy
  ) {
    if (
      !this.canEnemyMoveTo(
        enemy,
        dx,
        dy
      )
    ) {
      return false;
    }

    enemy.x += dx;
    enemy.y += dy;

    enemy.cells =
      enemy.cells.map(
        cell => ({
          x:
            cell.x + dx,
          y:
            cell.y + dy
        })
      );

    return true;
  }

  /*
   * Elige movimiento de:
   *
   * flee     = alejarse
   * approach = acercarse
   * patrol   = aleatorio
   */
  chooseMovement(
    enemy,
    mode
  ) {
    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 }
    ];

    const px =
      this.player.x;

    const py =
      this.player.y;

    if (
      mode === "flee"
    ) {
      dirs.sort(
        (a, b) => {
          const da =
            Math.hypot(
              enemy.x +
                a.dx -
                px,
              enemy.y +
                a.dy -
                py
            );

          const db =
            Math.hypot(
              enemy.x +
                b.dx -
                px,
              enemy.y +
                b.dy -
                py
            );

          return db - da;
        }
      );
    }

    else if (
      mode === "approach"
    ) {
      dirs.sort(
        (a, b) => {
          const da =
            Math.hypot(
              enemy.x +
                a.dx -
                px,
              enemy.y +
                a.dy -
                py
            );

          const db =
            Math.hypot(
              enemy.x +
                b.dx -
                px,
              enemy.y +
                b.dy -
                py
            );

          return da - db;
        }
      );
    }

    else {
      /*
       * Patrulla verdaderamente aleatoria.
       */
      for (
        let i =
          dirs.length - 1;
        i > 0;
        i--
      ) {
        const j =
          Math.floor(
            Math.random() *
              (i + 1)
          );

        [
          dirs[i],
          dirs[j]
        ] = [
          dirs[j],
          dirs[i]
        ];
      }
    }

    for (
      const dir of dirs
    ) {
      if (
        this.moveEnemy(
          enemy,
          dir.dx,
          dir.dy
        )
      ) {
        return true;
      }
    }

    return false;
  }

  enemyAttack(
    enemy,
    ranged = false
  ) {
    const d20 =
      rollDie(20);

    const totalAtk =
      d20 + this.hitBonus;

    if (
      d20 !== 20 &&
      totalAtk < this.player.ac
    ) {
      this.log(
        `${enemy.name} falla [${totalAtk} vs CA ${this.player.ac}].`
      );

      return;
    }

    let baseDamage;

    if (
      enemy.isMegaBoss
    ) {
      baseDamage =
        ranged
          ? rollDie(4)
          : rollDie(6) + 2;
    }

    else if (
      enemy.isBoss
    ) {
      baseDamage =
        ranged
          ? rollDie(3)
          : rollDie(4) + 1;
    }

    else {
      baseDamage =
        rollDie(2);
    }

    const damage =
      baseDamage +
      this.dmgBonus;

    this.player.hp =
      Math.max(
        0,
        this.player.hp -
          damage
      );

    sounds.playHurt();

    this.log(
      `${enemy.name} ${ranged ? "a distancia" : "c/c"}: [${totalAtk} vs CA ${this.player.ac}] ¡${damage} daño!`
    );
  }
    /*
   * IA DE SOMBRAS
   *
   * Fuera de detección:
   *     patrulla.
   *
   * Ve a Lior a <= 2 y está sola:
   *     huye.
   *
   * Ve a Lior a <= 2 y tiene aliados:
   *     carga contra Lior.
   *
   * Pánico:
   *     huye durante exactamente
   *     dos acciones de Lior.
   */
  processShadowAI(enemy) {
    const distance =
      CombatSystem.getMinDistToPlayer(
        this.player,
        enemy
      );

    const sees =
      CombatSystem.canEnemySeePlayer(
        this.player,
        this.dungeon,
        enemy,
        this.generator
      );

    /*
     * Pánico tiene prioridad.
     *
     * Importante:
     * pánico NO significa muerte.
     */
    if (
      enemy.fearCooldown > 0
    ) {
      this.chooseMovement(
        enemy,
        "flee"
      );

      enemy.fearCooldown--;

      return;
    }

    /*
     * Fuera del rango de detección
     * o sin línea de visión:
     * patrulla.
     */
    if (
      !sees ||
      distance > 2
    ) {
      this.chooseMovement(
        enemy,
        "patrol"
      );

      return;
    }

    /*
     * Detectó a Lior.
     *
     * Buscamos aliados a 2 casillas
     * o menos.
     */
    const allies =
      this.getEnemyNeighbors(
        enemy,
        2
      ).filter(
        other =>
          !other.isMegaBoss
      );

    /*
     * Si tiene aliados:
     * pierde el miedo y ataca.
     */
    if (
      allies.length > 0
    ) {
      if (
        distance <= 1.5
      ) {
        this.enemyAttack(
          enemy,
          false
        );
      }

      else {
        this.chooseMovement(
          enemy,
          "approach"
        );
      }

      return;
    }

    /*
     * Sombra sola:
     * huye de Lior.
     */
    this.chooseMovement(
      enemy,
      "flee"
    );
  }

  /*
   * IA DEL MINIBOSS.
   *
   * Detección a <= 3.
   *
   * Cuando ve a Lior:
   * avanza.
   *
   * Sombras a <= 1:
   * se convierten en parte del asalto.
   */
  processMiniBossAI(enemy) {
    const distance =
      CombatSystem.getMinDistToPlayer(
        this.player,
        enemy
      );

    const sees =
      CombatSystem.canEnemySeePlayer(
        this.player,
        this.dungeon,
        enemy,
        this.generator
      );

    /*
     * Fuera de detección:
     * también patrulla.
     */
    if (
      !sees ||
      distance > 3
    ) {
      this.chooseMovement(
        enemy,
        "patrol"
      );

      return;
    }

    /*
     * Reclutar sombras próximas.
     */
    const escort =
      this.getAdjacentShadows(
        enemy,
        1.1
      );

    for (
      const shadow of escort
    ) {
      shadow.commandedByBoss =
        enemy.id;
    }

    if (
      distance <= 1.5
    ) {
      this.enemyAttack(
        enemy,
        false
      );
    }

    else {
      this.chooseMovement(
        enemy,
        "approach"
      );
    }
  }

  /*
   * IA DEL MEGA BOSS.
   */
  processMegaBossAI(enemy) {
    const distance =
      CombatSystem.getMinDistToPlayer(
        this.player,
        enemy
      );

    const sees =
      CombatSystem.canEnemySeePlayer(
        this.player,
        this.dungeon,
        enemy,
        this.generator
      );

    if (
      sees &&
      distance <= 4
    ) {
      if (
        distance <= 1.5
      ) {
        this.enemyAttack(
          enemy,
          false
        );
      }

      else {
        this.chooseMovement(
          enemy,
          "approach"
        );
      }
    }

    else {
      /*
       * Incluso el Mega Boss
       * permanece dinámico cuando
       * Lior está fuera de su detección.
       */
      this.chooseMovement(
        enemy,
        "patrol"
      );
    }
  }

  /*
   * Sombras reclutadas por un Minijefe.
   */
  processCommandedShadowAI(
    enemy
  ) {
    const boss =
      this.dungeon.enemies.find(
        candidate =>
          candidate.id ===
            enemy.commandedByBoss &&
          candidate.hp > 0
      );

    /*
     * Si el líder murió:
     * la sombra vuelve a su IA normal.
     *
     * El pánico se maneja en
     * resolveDeaths().
     */
    if (!boss) {
      enemy.commandedByBoss =
        null;

      return this.processShadowAI(
        enemy
      );
    }

    const distance =
      CombatSystem.getMinDistToPlayer(
        this.player,
        enemy
      );

    /*
     * Las sombras del séquito
     * obedecen mientras el Minijefe
     * esté activo y haya iniciado
     * el asalto.
     */
    if (
      distance <= 1.5
    ) {
      this.enemyAttack(
        enemy,
        false
      );
    }

    else {
      this.chooseMovement(
        enemy,
        "approach"
      );
    }
  }

  processEnemy(enemy) {
    if (
      enemy.hp <= 0
    ) {
      return;
    }

    if (
      enemy.isMegaBoss
    ) {
      return this.processMegaBossAI(
        enemy
      );
    }

    if (
      enemy.isBoss
    ) {
      return this.processMiniBossAI(
        enemy
      );
    }

    if (
      enemy.commandedByBoss
    ) {
      return this.processCommandedShadowAI(
        enemy
      );
    }

    return this.processShadowAI(
      enemy
    );
  }

  /*
   * RESOLUCIÓN DE MUERTES.
   *
   * Minijefe muerto:
   *     sombras cercanas -> pánico 2 turnos.
   *
   * Mega Boss muerto:
   *     sus esbirros desaparecen
   *     con él.
   */
  resolveDeaths() {
    const dead =
      this.dungeon.enemies.filter(
        enemy =>
          enemy.hp <= 0
      );

    if (
      dead.length === 0
    ) {
      return;
    }

    const deadMegaBosses =
      dead.filter(
        enemy =>
          enemy.isMegaBoss
      );

    const deadMiniBosses =
      dead.filter(
        enemy =>
          enemy.isBoss &&
          !enemy.isMegaBoss
      );

    const deadIds =
      new Set(
        dead.map(
          enemy =>
            enemy.id
        )
      );

    /*
     * PÁNICO DEL MINIBOSS.
     */
    for (
      const boss of
      deadMiniBosses
    ) {
      for (
        const shadow of
        this.dungeon.enemies
      ) {
        if (
          shadow.isBoss ||
          shadow.isMegaBoss ||
          shadow.hp <= 0
        ) {
          continue;
        }

        const distance =
          Math.hypot(
            shadow.x -
              boss.x,
            shadow.y -
              boss.y
          );

        if (
          distance <= 2.2
        ) {
          shadow.fearCooldown =
            2;

          shadow.commandedByBoss =
            null;

          this.log(
            `${shadow.name} entra en pánico durante 2 acciones de Lior.`
          );
        }
      }
    }

    /*
     * MUERTE DEL MEGA BOSS.
     *
     * Los esbirros invocados por él
     * mueren/desaparecen junto con él.
     */
    for (
      const mega of
      deadMegaBosses
    ) {
      const followers =
        this.dungeon.enemies.filter(
          enemy =>
            !enemy.isMegaBoss &&
            !enemy.isBoss &&
            enemy.hp > 0 &&
            (
              enemy.summonedByMegaBoss &&
              (
                enemy.commandedByBoss ===
                mega.id
              )
            )
        );

      for (
        const follower of
        followers
      ) {
        follower.hp = 0;

        deadIds.add(
          follower.id
        );

        this.log(
          `${follower.name} desaparece con el Mega Boss.`
        );
      }
    }

    /*
     * Botín.
     *
     * Los esbirros eliminados
     * por el Mega Boss no generan
     * botín adicional.
     */
    for (
      const enemy of dead
    ) {
      const goldDrop =
        enemy.isMegaBoss
          ? 10
          : (
              enemy.isBoss
                ? rollDie(3)
                : (
                    Math.random() < 0.5
                      ? 1
                      : 0
                  )
            );

      this.player.gold +=
        goldDrop;

      this.log(
        `¡${enemy.name} eliminado! Botín: +${goldDrop} PO.`
      );
    }

    /*
     * Eliminamos definitivamente
     * las criaturas muertas.
     */
    this.dungeon.enemies =
      this.dungeon.enemies.filter(
        enemy =>
          !deadIds.has(
            enemy.id
          )
      );
  }

  /*
   * OLEADAS DEL MEGA BOSS.
   *
   * Condiciones:
   *
   * 1. Mega Boss vivo.
   * 2. No quedan esbirros.
   * 3. Pasa un turno completo
   *    de gracia.
   * 4. Después de ese turno,
   *    tira 1d6.
   */
  handleMegaBossWaves() {
    const bosses =
      this.dungeon.enemies.filter(
        enemy =>
          enemy.isMegaBoss &&
          enemy.hp > 0
      );

    if (
      bosses.length === 0
    ) {
      return;
    }

    for (
      const boss of bosses
    ) {
      const hasMinions =
        this.dungeon.enemies.some(
          enemy =>
            enemy.hp > 0 &&
            !enemy.isMegaBoss &&
            !enemy.isBoss &&
            enemy.summonedByMegaBoss &&
            enemy.commandedByBoss ===
              boss.id
        );

      if (
        hasMinions
      ) {
        this.megaBossGraceTurns.set(
          boss.id,
          0
        );

        continue;
      }

      const grace =
        (
          this.megaBossGraceTurns.get(
            boss.id
          ) || 0
        ) + 1;

      this.megaBossGraceTurns.set(
        boss.id,
        grace
      );

      /*
       * Un turno completo de gracia.
       *
       * Se invoca cuando ya pasó
       * más de uno.
       */
      if (
        grace <= 1
      ) {
        continue;
      }

      const count =
        rollDie(6);

      let summoned = 0;

      for (
        let attempt = 0;
        attempt < 1200 &&
        summoned < count;
        attempt++
      ) {
        const dx =
          Math.floor(
            Math.random() * 11
          ) - 5;

        const dy =
          Math.floor(
            Math.random() * 11
          ) - 5;

        if (
          dx === 0 &&
          dy === 0
        ) {
          continue;
        }

        const x =
          boss.x + dx;

        const y =
          boss.y + dy;

        if (
          !this.dungeon.isInsideBounds(
            x,
            y
          )
        ) {
          continue;
        }

        if (
          Math.hypot(
            x - boss.x,
            y - boss.y
          ) > 5.5
        ) {
          continue;
        }

        if (
          !this.isFreeDestination(
            x,
            y
          )
        ) {
          continue;
        }

        if (
          Math.hypot(
            x -
              this.player.x,
            y -
              this.player.y
          ) <= 1.5
        ) {
          continue;
        }

        const shadow = {
          id:
            Math.random()
              .toString(36)
              .substring(2, 9),

          x,
          y,

          startX: x,
          startY: y,

          name:
            "Sombra Invocada",

          hp: 2,
          maxHp: 2,

          ac:
            this.getEnemyAC(
              "shadow"
            ),

          range: 2,

          isMegaBoss: false,
          isBoss: false,

          size: 1,

          cells: [
            {
              x,
              y
            }
          ],

          commandedByBoss:
            boss.id,

          fearCooldown: 0,

          summonedByMegaBoss:
            true
        };

        this.dungeon.enemies.push(
          shadow
        );

        summoned++;
      }

      this.megaBossGraceTurns.set(
        boss.id,
        0
      );

      this.log(
        `¡El Mega Boss lanza 1d6 y convoca ${summoned}/${count} sombras!`
      );
    }
  }

  /*
   * TURNO COMPLETO DE ENEMIGOS.
   *
   * Esta función solamente se llama
   * después de acciones reales de Lior.
   */
  processEnemiesTurn() {
    if (
      this.player.hp <= 0
    ) {
      return;
    }

    this.turnNumber++;

    /*
     * Snapshot para evitar problemas
     * si una criatura es eliminada
     * durante el procesamiento.
     */
    const snapshot =
      [
        ...this.dungeon.enemies
      ];

    for (
      const enemy of snapshot
    ) {
      if (
        this.player.hp <= 0
      ) {
        break;
      }

      if (
        !this.dungeon.enemies.includes(
          enemy
        )
      ) {
        continue;
      }

      if (
        enemy.hp <= 0
      ) {
        continue;
      }

      try {
        this.processEnemy(
          enemy
        );
      }

      catch (error) {
        console.error(
          "Error procesando enemigo:",
          enemy,
          error
        );
      }
    }

    /*
     * Primero resolver muertes.
     */
    this.resolveDeaths();

    /*
     * Después comprobar si el Mega Boss
     * puede iniciar una oleada.
     */
    this.handleMegaBossWaves();

    /*
     * Seguridad por si una invocación
     * genera alguna entidad inválida.
     */
    this.resolveDeaths();

    if (
      this.player.hp <= 0
    ) {
      sounds.playDeath();

      this.log(
        "¡Lior ha caído en combate! Fin de la partida."
      );
    }

    this.updateHUD();
    this.renderer.draw();
  }

  /*
   * MOVIMIENTO HACIA ADELANTE.
   *
   * Consume turno solamente si realmente
   * consigue desplazarse.
   */
  moveForward() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    const next =
      this.player.getNextForwardPos(
        1
      );

    if (
      !this.dungeon.isInsideBounds(
        next.x,
        next.y
      )
    ) {
      this.log(
        "El muro exterior te detiene."
      );

      return;
    }

    this.generator.ensureTileGenerated(
      next.x,
      next.y
    );

    if (
      this.dungeon.getTile(
        next.x,
        next.y
      ) === TILE_WALL
    ) {
      this.log(
        "Un muro blanco bloquea el camino."
      );

      return;
    }

    if (
      this.isOccupiedByEnemy(
        next.x,
        next.y
      )
    ) {
      this.log(
        "¡Un enemigo bloquea el paso! Ataca con espada o arma."
      );

      return;
    }

    this.player.moveForward();

    sounds.playStep();

    /*
     * Interacciones de casilla no
     * ejecutan la IA por sí mismas.
     */
    const changedFloor =
      this.handleTileInteractions();

    /*
     * Movimiento = acción.
     */
    if (
      !changedFloor &&
      this.player.hp > 0
    ) {
      this.processEnemiesTurn();
    }
  }

  /*
   * MOVIMIENTO HACIA ATRÁS.
   */
  moveBackward() {
    if (
      this.isShopOpen ||
      this.player.hp <= 0
    ) {
      return;
    }

    const previous =
      this.player.getNextBackwardPos();

    if (
      !this.dungeon.isInsideBounds(
        previous.x,
        previous.y
      )
    ) {
      this.log(
        "Un muro exterior detiene tu retroceso."
      );

      return;
    }

    this.generator.ensureTileGenerated(
      previous.x,
      previous.y
    );

    if (
      this.dungeon.getTile(
        previous.x,
        previous.y
      ) === TILE_WALL
    ) {
      this.log(
        "Un muro a tu espalda te impide retroceder."
      );

      return;
    }

    if (
      this.isOccupiedByEnemy(
        previous.x,
        previous.y
      )
    ) {
      this.log(
        "Un enemigo te bloquea el paso por la espalda."
      );

      return;
    }

    this.player.moveBackward();

    sounds.playStep();

    this.log(
      `Retrocedes un paso mirando al ${CARDINALS[this.player.direction]}.`
    );

    const changedFloor =
      this.handleTileInteractions();

    if (
      !changedFloor &&
      this.player.hp > 0
    ) {
      this.processEnemiesTurn();
    }
  }

  /*
   * Interacciones de casilla.
   */
  handleTileInteractions() {
    const tile =
      this.dungeon.getTile(
        this.player.x,
        this.player.y
      );

    /*
     * FUENTE DE CURACIÓN.
     *
     * 1d6 HP.
     *
     * Desaparece después de utilizarse.
     */
    if (
      tile === TILE_HEAL_FOUNTAIN
    ) {
      const heal =
        rollDie(6);

      this.player.hp =
        Math.min(
          this.player.maxHp,
          this.player.hp + heal
        );

      sounds.playHeal();

      this.log(
        `Santuario de vida: +${heal} HP restaurados.`
      );

      this.dungeon.setTile(
        this.player.x,
        this.player.y,
        TILE_FLOOR
      );
    }

    /*
     * TIENDA.
     */
    if (
      tile === TILE_SHOP
    ) {
      this.openShop();
    }

    this.updateHUD();

    /*
     * SALIDA.
     */
    if (
      this.player.x ===
        this.dungeon.exit.x &&
      this.player.y ===
        this.dungeon.exit.y
    ) {
      const remaining =
        this.getActiveEnemyCount();

      if (
        remaining > 0
      ) {
        this.log(
          `¡La puerta está sellada! Debes eliminar a las ${remaining} criaturas restantes.`
        );
      }

      else {
        sounds.playCoin();

        this.log(
          "¡Calabozo purificado! Descendiendo..."
        );

        this.floor++;

        setTimeout(
          () => {
            this.initDungeonFloor();
          },
          700
        );

        return true;
      }
    }

    this.renderer.draw();

    return false;
  }

  bindEvents() {
    /*
     * Controles táctiles.
     */
    document
      .getElementById(
        "btn-forward"
      )
      .addEventListener(
        "click",
        () =>
          this.moveForward()
      );

    document
      .getElementById(
        "btn-left"
      )
      .addEventListener(
        "click",
        () =>
          this.turnLeft()
      );

    document
      .getElementById(
        "btn-right"
      )
      .addEventListener(
        "click",
        () =>
          this.turnRight()
      );

    document
      .getElementById(
        "btn-backward"
      )
      .addEventListener(
        "click",
        () =>
          this.moveBackward()
      );

    document
      .getElementById(
        "btn-d"
      )
      .addEventListener(
        "click",
        () =>
          this.cycleWeapon()
      );

    document
      .getElementById(
        "btn-c"
      )
      .addEventListener(
        "click",
        () =>
          this.useLayOnHands()
      );

    document
      .getElementById(
        "btn-b"
      )
      .addEventListener(
        "click",
        () =>
          this.castMistyStep()
      );

    document
      .getElementById(
        "btn-a"
      )
      .addEventListener(
        "click",
        () => {
          if (
            !this.isShopOpen
          ) {
            CombatSystem.executeAttack(
              this
            );
          }
        }
      );

    /*
     * Controles de teclado.
     */
    window.addEventListener(
      "keydown",
      event => {
        if (
          this.isShopOpen &&
          event.key !== "Escape"
        ) {
          return;
        }

        switch (
          event.key
        ) {
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
            CombatSystem.executeAttack(
              this
            );
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

          case "Escape":
            if (
              this.isShopOpen
            ) {
              this.closeShop();
            }
            break;
        }
      }
    );
  }
}

/*
 * INICIALIZADOR DEL SPLASH
 * CON LOGO NEKOPIN GAMES
 */
window.addEventListener(
  "DOMContentLoaded",
  () => {
    const splashScreen =
      document.getElementById(
        "splash-screen"
      );

    let gameStarted = false;

    function startGame() {
      if (gameStarted) {
        return;
      }

      gameStarted = true;

      splashScreen.classList.add(
        "hidden"
      );

      setTimeout(
        () => {
          splashScreen.style.display =
            "none";
        },
        850
      );

      new GameController();
    }

    /*
     * Desbloqueo de Web Audio
     * para navegadores móviles.
     */
    const unlockAudio = () => {
      sounds.init();

      document.removeEventListener(
        "touchstart",
        unlockAudio
      );

      document.removeEventListener(
        "click",
        unlockAudio
      );
    };

    document.addEventListener(
      "touchstart",
      unlockAudio,
      {
        passive: true
      }
    );

    document.addEventListener(
      "click",
      unlockAudio,
      {
        passive: true
      }
    );

    setTimeout(
      () => {
        sounds.playLogoJingle();
      },
      400
    );

    setTimeout(
      () => {
        startGame();
      },
      3300
    );

    splashScreen.addEventListener(
      "click",
      startGame
    );
  }
);