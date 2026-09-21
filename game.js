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
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playStep() {
    this.init();
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
    const bufferSize = this.ctx.sampleRate * (isMusket ? 0.25 : 0.16);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

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

/**
 * CONSTANTES DE MAPA Y VECTORES
 */
const CARDINALS = ["Norte (▲)", "Este (▶)", "Sur (▼)", "Oeste (◀)"];

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

/**
 * CONFIGURACIÓN DE ARMAS
 */
const WEAPONS = {
  SWORD: {
    name: "Espada",
    label: "Espada (área c/c 1.5)",
    bonus: 8,
    minDmg: 1,
    maxDmg: 2,
    range: 1.5,
    isMelee: true,
    ammoType: null
  },
  PISTOL: {
    name: "Pistola",
    label: "Pistola (frente 3x3)",
    bonus: 9,
    minDmg: 1,
    maxDmg: 4,
    range: 3,
    isMelee: false,
    ammoType: "pistol"
  },
  MUSKET: {
    name: "Mosquete",
    label: "Mosquete (frente 5x3)",
    bonus: 9,
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

function getRandomDungeonDimensions(min = 5, max = 50) {
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
    return this.tiles.get(this.getKey(x, y));
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
    this.ac = 16;
    this.gold = 0;

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

    const area = dungeon.width * dungeon.height;
    this.totalEnemies = Math.max(3, Math.floor(area / 10));

    this.populateEnemies();
    this.placeSpecialTiles();
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

        this.dungeon.enemies.push({
          x: mx, y: my,
          startX: mx, startY: my,
          name: "MEGA BOSS (4x4)",
          hp: 16, maxHp: 16,
          ac: 16,
          isMegaBoss: true,
          isBoss: true,
          size: 4,
          cells: bossCells
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

        if (isBoss) {
          this.dungeon.enemies.push({
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: "Minijefe Intermedio (2x2)",
            hp: 8, maxHp: 8,
            ac: 14,
            isMegaBoss: false,
            isBoss: true,
            size: 2,
            cells: candidateCells
          });
          sequenceCounter = 0;
        } else {
          this.dungeon.enemies.push({
            x: rx, y: ry,
            startX: rx, startY: ry,
            name: "Sombra Hostil",
            hp: 2, maxHp: 2,
            ac: 12,
            isMegaBoss: false,
            isBoss: false,
            size: 1,
            cells: candidateCells
          });
          sequenceCounter++;
        }
        placed = true;
      }
    }
  }

  placeSpecialTiles() {
    const miniBosses = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss);
    const targetShops = Math.floor(miniBosses.length / 3);
    const placedShopPositions = [];

    for (let i = 0; i < targetShops && i < miniBosses.length; i++) {
      const anchor = miniBosses[i];
      let placed = false;

      for (let attempts = 0; attempts < 300 && !placed; attempts++) {
        const ox = Math.floor(Math.random() * 11) - 5;
        const oy = Math.floor(Math.random() * 11) - 5;
        if (Math.hypot(ox, oy) > 5.0) continue;

        const sx = anchor.startX + ox;
        const sy = anchor.startY + oy;

        if (!this.dungeon.isInsideBounds(sx, sy)) continue;
        if (Math.hypot(sx - this.dungeon.entrance.x, sy - this.dungeon.entrance.y) <= 3) continue;
        if (Math.hypot(sx - this.dungeon.exit.x, sy - this.dungeon.exit.y) <= 2) continue;
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
      if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === hx && c.y === hy))) continue;

      const tooClose = placedHealPositions.some(p => Math.hypot(hx - p.x, hy - p.y) < 5.0);
      if (tooClose) continue;

      this.dungeon.setTile(hx, hy, TILE_HEAL_FOUNTAIN);
      placedHealPositions.push({ x: hx, y: hy });
    }
  }

  ensureTileGenerated(x, y) {
    if (!this.dungeon.isInsideBounds(x, y)) return;
    if (this.dungeon.hasTile(x, y)) return;

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

    const distToEntrance = Math.hypot(x - this.dungeon.entrance.x, y - this.dungeon.entrance.y);
    const distToExit = Math.hypot(x - this.dungeon.exit.x, y - this.dungeon.exit.y);

    if (distToEntrance <= 2.2 || distToExit <= 2.2) {
      this.dungeon.setTile(x, y, TILE_FLOOR);
      return;
    }

    if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === x && c.y === y))) {
      this.dungeon.setTile(x, y, TILE_FLOOR);
      return;
    }

    const isWall = Math.random() < 0.20;
    this.dungeon.setTile(x, y, isWall ? TILE_WALL : TILE_FLOOR);
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
}

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

    while (true) {
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

    while (true) {
      if (curX === x1 && curY === y1) return true;
      if ((curX !== x0 || curY !== y0) && dungeon.getTile(curX, curY) === TILE_WALL) {
        return false;
      }
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; curX += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }
}

/**
 * RENDERER CON ANIMACIÓN DE GIRO SUAVE (PANEO)
 */
class Renderer {
  constructor(canvas, dungeon, player, generator) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dungeon = dungeon;
    this.player = player;
    this.generator = generator;

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
      this.stepAnimation();
    }
  }

  stepAnimation() {
    const diff = this.targetAngle - this.currentAngle;
    if (Math.abs(diff) < 0.5) {
      this.currentAngle = this.targetAngle;
      this.isAnimating = false;
      this.draw();
      return;
    }

    this.currentAngle += diff * 0.28;
    this.drawWithRotation(this.currentAngle - this.player.direction * 90);
    requestAnimationFrame(() => this.stepAnimation());
  }

  draw() {
    if (this.isAnimating) return;
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

    const enemiesRemain = this.dungeon.enemies.length > 0;

    for (let sy = 0; sy < rows; sy++) {
      for (let sx = 0; sx < cols; sx++) {
        const worldCoord = CameraTransformer.screenToWorld(sx, sy, this.player);
        this.generator.ensureTileGenerated(worldCoord.x, worldCoord.y);

        const tileType = this.dungeon.getTile(worldCoord.x, worldCoord.y);
        const px = sx * tileSize;
        const py = sy * tileSize;

        const inLineOfSight = VisibilitySystem.hasLineOfSight(
          playerScreenX, playerScreenY, sx, sy, this.dungeon, this.player
        );

        if (inLineOfSight) this.dungeon.markRevealed(worldCoord.x, worldCoord.y);
        const wasEverRevealed = this.dungeon.isRevealed(worldCoord.x, worldCoord.y);

        if (!inLineOfSight && !wasEverRevealed) continue;

        if (tileType === TILE_WALL) {
          targetCtx.fillStyle = inLineOfSight ? "#ffffff" : "#444444";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_ENTRANCE) {
          targetCtx.fillStyle = inLineOfSight ? "#00e676" : "#00552b";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_EXIT) {
          targetCtx.fillStyle = enemiesRemain ? (inLineOfSight ? "#b71c1c" : "#4a0000") : (inLineOfSight ? "#ffb300" : "#664700");
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
          targetCtx.fillStyle = "#000000";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_OUT_OF_BOUNDS) {
          targetCtx.fillStyle = "#111111";
          targetCtx.fillRect(px, py, tileSize, tileSize);
        }

        targetCtx.strokeStyle = inLineOfSight ? "#2e2e34" : "#141416";
        targetCtx.lineWidth = 1;
        targetCtx.strokeRect(px, py, tileSize, tileSize);
      }
    }

    this.dungeon.enemies.forEach(enemy => {
      enemy.cells.forEach(cell => {
        for (let sy = 0; sy < rows; sy++) {
          for (let sx = 0; sx < cols; sx++) {
            const wPos = CameraTransformer.screenToWorld(sx, sy, this.player);
            if (wPos.x === cell.x && wPos.y === cell.y) {
              const visible = VisibilitySystem.hasLineOfSight(
                playerScreenX, playerScreenY, sx, sy, this.dungeon, this.player
              );
              if (visible) {
                const px = sx * tileSize;
                const py = sy * tileSize;

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
                  targetCtx.fillStyle = "#ff3333";
                  targetCtx.beginPath();
                  targetCtx.arc(cx, cy, 7, 0, Math.PI * 2);
                  targetCtx.fill();
                }
              }
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
      game.log("Lior ha caído. No puedes atacar.");
      return;
    }

    const weapon = player.equippedWeapon;

    if (weapon.ammoType === "pistol") {
      if (player.ammoPistol <= 0) {
        game.log("¡Sin balas de Pistola! Cambia de arma.");
        return;
      }
      player.ammoPistol--;
      sounds.playShot(false);
    } else if (weapon.ammoType === "musket") {
      if (player.ammoMusket <= 0) {
        game.log("¡Sin balas de Mosquete! Cambia de arma.");
        return;
      }
      player.ammoMusket--;
      sounds.playShot(true);
    } else {
      sounds.playSword();
    }

    if (weapon.isMelee) {
      const targetsHit = [];

      dungeon.enemies.forEach(enemy => {
        const inArea = enemy.cells.some(cell => {
          const dist = Math.hypot(cell.x - player.x, cell.y - player.y);
          return dist <= weapon.range && VisibilitySystem.hasWorldLineOfSight(player.x, player.y, cell.x, cell.y, dungeon);
        });

        if (inArea) {
          targetsHit.push(enemy);
        }
      });

      if (targetsHit.length === 0) {
        game.log("Blandes tu espada en círculo, pero no hay enemigos al alcance.");
        game.updateHUD();
        return;
      }

      game.log(`¡Giro de espada! Afecta a ${targetsHit.length} criatura(s) a la redonda.`);

      targetsHit.forEach(target => {
        const d20 = rollDie(20);
        const attackTotal = d20 + weapon.bonus;

        if (d20 === 20 || attackTotal >= target.ac) {
          const dmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1)) + weapon.minDmg;
          target.hp -= dmg;
          game.log(`> Impactas a ${target.name} por ${dmg} de daño. (HP: ${Math.max(0, target.hp)})`);
        } else {
          game.log(`> Tu golpe se desvía en la armadura de ${target.name}.`);
        }
      });

      for (let i = dungeon.enemies.length - 1; i >= 0; i--) {
        const enemy = dungeon.enemies[i];
        if (enemy.hp <= 0) {
          sounds.playCoin();
          let goldDrop = enemy.isMegaBoss ? 10 : (enemy.isBoss ? rollDie(3) : (Math.random() < 0.5 ? 1 : 0));
          player.gold += goldDrop;
          game.log(`¡${enemy.name} abatido! Botín: +${goldDrop} PO.`);
          dungeon.enemies.splice(i, 1);
        }
      }

      targetsHit.filter(t => t.hp > 0).forEach(survivor => {
        CombatSystem.enemyCounterAttack(game, survivor, 1.0);
      });

      game.updateHUD();
      game.renderer.draw();
      return;
    }

    let target = null;
    let targetIndex = -1;
    let minDist = 999;

    dungeon.enemies.forEach((enemy, idx) => {
      enemy.cells.forEach(cell => {
        if (CombatSystem.isCellInWeaponRange(player, cell.x, cell.y, weapon)) {
          if (VisibilitySystem.hasWorldLineOfSight(player.x, player.y, cell.x, cell.y, dungeon)) {
            const dist = Math.hypot(cell.x - player.x, cell.y - player.y);
            if (dist < minDist) {
              minDist = dist;
              target = enemy;
              targetIndex = idx;
            }
          }
        }
      });
    });

    if (!target) {
      game.log(`Disparas tu ${weapon.name}... pero la bala se pierde sin impactar.`);
      game.updateHUD();
      return;
    }

    const d20 = rollDie(20);
    const attackTotal = d20 + weapon.bonus;
    game.log(`${weapon.name}: [d20(${d20}) + ${weapon.bonus} = ${attackTotal}] vs CA ${target.ac}`);

    if (d20 === 20 || attackTotal >= target.ac) {
      const dmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1)) + weapon.minDmg;
      target.hp -= dmg;
      game.log(`¡Impacto certero! Causas ${dmg} de daño a ${target.name}. (HP: ${Math.max(0, target.hp)})`);

      if (target.hp <= 0) {
        sounds.playCoin();
        let goldDrop = target.isMegaBoss ? 10 : (target.isBoss ? rollDie(3) : (Math.random() < 0.5 ? 1 : 0));
        player.gold += goldDrop;
        game.log(`¡${target.name} eliminado! Botín: +${goldDrop} PO.`);
        dungeon.enemies.splice(targetIndex, 1);
        game.updateHUD();
        game.renderer.draw();
        return;
      }
    } else {
      game.log("El proyectil rebota sin penetrar.");
    }

    CombatSystem.enemyCounterAttack(game, target, minDist);
    game.updateHUD();
    game.renderer.draw();
  }

  static enemyCounterAttack(game, enemy, dist) {
    const { player } = game;
    const eD20 = rollDie(20);

    if (dist <= 1.5) {
      const atkBonus = enemy.isMegaBoss ? 6 : (enemy.isBoss ? 5 : 3);
      const totalAtk = eD20 + atkBonus;
      game.log(`${enemy.name} c/c: [d20(${eD20}) + ${atkBonus} = ${totalAtk}] vs CA ${player.ac}`);
      if (totalAtk >= player.ac) {
        sounds.playHurt();
        const dmg = enemy.isMegaBoss ? (rollDie(6) + 2) : (enemy.isBoss ? rollDie(4) + 1 : rollDie(2));
        player.hp = Math.max(0, player.hp - dmg);
        game.log(`¡Recibes ${dmg} de daño!`);
      } else {
        game.log("Bloqueas el golpe con tu broquel.");
      }
    } else if ((enemy.isMegaBoss && dist <= 3.5) || (enemy.isBoss && dist <= 2.5) || (!enemy.isBoss && dist <= 3.5)) {
      const atkBonus = enemy.isMegaBoss ? 5 : (enemy.isBoss ? 4 : 2);
      const totalAtk = eD20 + atkBonus;
      game.log(`${enemy.name} proyectil: [d20(${eD20}) + ${atkBonus} = ${totalAtk}] vs CA ${player.ac}`);
      if (totalAtk >= player.ac) {
        sounds.playHurt();
        const dmg = enemy.isMegaBoss ? rollDie(4) : rollDie(2);
        player.hp = Math.max(0, player.hp - dmg);
        game.log(`¡Proyectil hostil impacta! -${dmg} HP.`);
      } else {
        game.log("El proyectil se estrella en la pared.");
      }
    }

    if (player.hp <= 0) {
      sounds.playDeath();
      game.log("¡Lior ha caído en combate! Fin de la partida.");
    }
  }
}

class GameController {
  constructor() {
    this.floor = 1;
    this.canvas = document.getElementById("viewport");
    this.shopModal = document.getElementById("shop-modal");
    this.isShopOpen = false;

    this.initDungeonFloor();
    this.bindEvents();
    this.bindShopEvents();
  }

  initDungeonFloor() {
    const { width, height } = getRandomDungeonDimensions(5, 50);
    this.dungeon = new Dungeon(width, height);
    this.generator = new DungeonGenerator(this.dungeon, this.floor);

    if (!this.player) {
      this.player = new Player(this.dungeon.entrance.x, this.dungeon.entrance.y);
    } else {
      this.player.x = this.dungeon.entrance.x;
      this.player.y = this.dungeon.entrance.y;
      this.player.hasUsedLayOnHands = false;
      this.player.mistyStepCharges = 2;
    }

    if (!this.renderer) {
      this.renderer = new Renderer(this.canvas, this.dungeon, this.player, this.generator);
    } else {
      this.renderer.player = this.player;
      this.renderer.setDungeon(this.dungeon, this.generator);
    }

    this.updateHUD();

    const megaBossPresent = this.dungeon.enemies.some(e => e.isMegaBoss);
    const bossCount = this.dungeon.enemies.filter(e => e.isBoss && !e.isMegaBoss).length;
    let desc = `Piso ${this.floor}: ${width}x${height}. Enemigos: ${this.dungeon.enemies.length}`;
    if (megaBossPresent) desc += " (¡MEGA BOSS 4x4!)";
    if (bossCount > 0) desc += ` [${bossCount} Minijefes 2x2]`;

    this.log(desc);
    this.renderer.draw();
  }

  log(message) {
    const logBox = document.getElementById("log-entries");
    const entry = document.createElement("div");
    entry.textContent = `> ${message}`;
    logBox.appendChild(entry);
    document.getElementById("log-container").scrollTop = 99999;
  }

  updateHUD() {
    document.getElementById("hud-floor").textContent = this.floor;
    document.getElementById("hud-dir").textContent = CARDINALS[this.player.direction];
    document.getElementById("hud-hp").textContent = this.player.hp;
    document.getElementById("hud-gold").textContent = this.player.gold;
    document.getElementById("hud-ammo").textContent = `P:${this.player.ammoPistol} | M:${this.player.ammoMusket}`;
    document.getElementById("hud-weapon").textContent = this.player.equippedWeapon.name;
    document.getElementById("misty-charges").textContent = this.player.mistyStepCharges;

    const doorEl = document.getElementById("hud-door");
    const enemiesRemain = this.dungeon.enemies.length > 0;
    if (enemiesRemain) {
      doorEl.textContent = `BLOQUEADA (${this.dungeon.enemies.length})`;
      doorEl.className = "door-locked";
    } else {
      doorEl.textContent = "ABIERTA";
      doorEl.className = "door-open";
    }

    const mistyBtn = document.getElementById("btn-b");
    mistyBtn.disabled = this.player.mistyStepCharges <= 0 || this.player.hp <= 0;

    const layBtn = document.getElementById("btn-c");
    layBtn.disabled = this.player.hasUsedLayOnHands || this.player.hp <= 0;

    document.getElementById("shop-gold-display").textContent = this.player.gold;
  }

  openShop() {
    this.isShopOpen = true;
    this.shopModal.classList.remove("hidden");
    this.updateHUD();
    sounds.playCoin();
    this.log("Entraste a la tienda del Mercader de Sombras.");
  }

  closeShop() {
    this.isShopOpen = false;
    this.shopModal.classList.add("hidden");
    this.renderer.draw();
  }

  bindShopEvents() {
    document.getElementById("buy-pistol-ammo").addEventListener("click", () => {
      if (this.player.gold >= 1) {
        this.player.gold -= 1;
        this.player.ammoPistol += 4;
        sounds.playCoin();
        this.log("Compraste 4 balas de Pistola por 1 PO.");
        this.updateHUD();
      } else {
        this.log("Oro insuficiente.");
      }
    });

    document.getElementById("buy-musket-ammo").addEventListener("click", () => {
      if (this.player.gold >= 1) {
        this.player.gold -= 1;
        this.player.ammoMusket += 2;
        sounds.playCoin();
        this.log("Compraste 2 balas de Mosquete por 1 PO.");
        this.updateHUD();
      } else {
        this.log("Oro insuficiente.");
      }
    });

    document.getElementById("buy-potion").addEventListener("click", () => {
      if (this.player.gold >= 2) {
        if (this.player.hp >= this.player.maxHp) {
          this.log("Tu salud ya está al máximo.");
          return;
        }
        this.player.gold -= 2;
        sounds.playHeal();
        const heal = rollDie(8) + 5;
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
        this.log(`Poción bebida: +${heal} HP restaurados.`);
        this.updateHUD();
      } else {
        this.log("Oro insuficiente.");
      }
    });

    document.getElementById("close-shop").addEventListener("click", () => {
      this.closeShop();
    });
  }

  castMistyStep() {
    if (this.isShopOpen || this.player.mistyStepCharges <= 0 || this.player.hp <= 0) return;

    sounds.playMisty();
    this.log("Invocas Paso Brumoso...");
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
        this.log("¡Caíste al abismo exterior!");
        this.player.hp = 0;
        sounds.playDeath();
        this.updateHUD();
        this.renderer.draw();
        return;
      }

      this.generator.ensureTileGenerated(cx, cy);
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
      this.log("Apareces al otro lado del muro.");
    } else {
      const freeStep = this.player.getNextForwardPos(3);
      if (this.dungeon.isInsideBounds(freeStep.x, freeStep.y) && this.dungeon.getTile(freeStep.x, freeStep.y) === TILE_FLOOR) {
        this.player.x = freeStep.x;
        this.player.y = freeStep.y;
        this.log("Avanzas 3 casillas entre la bruma.");
      } else {
        this.log("No se encontró destino despejado.");
      }
    }

    this.updateHUD();
    this.renderer.draw();
  }

  useLayOnHands() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    if (this.player.useLayOnHands()) {
      sounds.playHeal();
      this.log("Manos Curativas: +6 HP.");
      this.updateHUD();
    } else {
      this.log("Manos Curativas ya fue usado en este piso.");
    }
  }

  cycleWeapon() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.cycleWeapon();
    sounds.playStep();
    this.log(`Equipada: ${this.player.equippedWeapon.label}`);
    this.updateHUD();
  }

  turnLeft() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.turnLeft();
    sounds.playStep();
    this.log(`Giras a la izquierda. Miras al ${CARDINALS[this.player.direction]}.`);
    this.updateHUD();
    this.renderer.animateTurn(-1);
  }

  turnRight() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.turnRight();
    sounds.playStep();
    this.log(`Giras a la derecha. Miras al ${CARDINALS[this.player.direction]}.`);
    this.updateHUD();
    this.renderer.animateTurn(1);
  }

  stepEnemies() {
    this.dungeon.enemies.forEach(enemy => {
      const directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];

      directions.sort(() => Math.random() - 0.5);

      for (const dir of directions) {
        const candidateCells = enemy.cells.map(c => ({ x: c.x + dir.dx, y: c.y + dir.dy }));

        const isValid = candidateCells.every(c => {
          if (!this.dungeon.isInsideBounds(c.x, c.y)) return false;
          this.generator.ensureTileGenerated(c.x, c.y);
          if (this.dungeon.getTile(c.x, c.y) === TILE_WALL) return false;
          if (c.x === this.player.x && c.y === this.player.y) return false;
          return true;
        });

        if (!isValid) continue;

        const collidesWithOther = this.dungeon.enemies.some(other => {
          if (other === enemy) return false;
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
  }

  moveForward() {
    if (this.isShopOpen || this.player.hp <= 0) return;

    const next = this.player.getNextForwardPos(1);

    if (!this.dungeon.isInsideBounds(next.x, next.y)) {
      this.log("El muro exterior te detiene.");
      return;
    }

    this.generator.ensureTileGenerated(next.x, next.y);

    if (this.dungeon.getTile(next.x, next.y) === TILE_WALL) {
      this.log("Un muro blanco bloquea el camino.");
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e =>
      e.cells.some(c => c.x === next.x && c.y === next.y)
    );
    if (enemyBlocking) {
      this.log("¡Un enemigo bloquea el paso! Ataca.");
      return;
    }

    this.player.moveForward();
    sounds.playStep();
    this.stepEnemies();
    this.handleTileInteractions();
  }

  moveBackward() {
    if (this.isShopOpen || this.player.hp <= 0) return;

    const prev = this.player.getNextBackwardPos();

    if (!this.dungeon.isInsideBounds(prev.x, prev.y)) {
      this.log("Un muro exterior detiene tu retroceso.");
      return;
    }

    this.generator.ensureTileGenerated(prev.x, prev.y);

    if (this.dungeon.getTile(prev.x, prev.y) === TILE_WALL) {
      this.log("Un muro a tu espalda te impide retroceder.");
      return;
    }

    const enemyBlocking = this.dungeon.enemies.some(e =>
      e.cells.some(c => c.x === prev.x && c.y === prev.y)
    );
    if (enemyBlocking) {
      this.log("Un enemigo te bloquea el paso por la espalda.");
      return;
    }

    this.player.moveBackward();
    sounds.playStep();
    this.log(`Retrocedes un paso mirando al ${CARDINALS[this.player.direction]}.`);
    this.stepEnemies();
    this.handleTileInteractions();
  }

  handleTileInteractions() {
    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_HEAL_FOUNTAIN) {
      const heal = rollDie(6);
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
      sounds.playHeal();
      this.log(`Santuario de vida: +${heal} HP restaurados.`);
      this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    }

    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_SHOP) {
      this.openShop();
    }

    this.updateHUD();

    if (this.player.x === this.dungeon.exit.x && this.player.y === this.dungeon.exit.y) {
      if (this.dungeon.enemies.length > 0) {
        this.log(`¡La puerta está sellada! Debes eliminar a las ${this.dungeon.enemies.length} criaturas restantes.`);
      } else {
        sounds.playCoin();
        this.log("¡Calabozo purificado! Descendiendo...");
        this.floor++;
        setTimeout(() => this.initDungeonFloor(), 700);
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

    window.addEventListener("keydown", (e) => {
      if (this.isShopOpen && e.key !== "Escape") return;

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
        case "Escape":
          if (this.isShopOpen) this.closeShop();
          break;
      }
    });
  }
}

// CONTROLADOR DE INICIO CON ENLACE DE DRIVE Y AUDIO HABILITADO
window.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const startBtn = document.getElementById("btn-start-game");
  const introContainer = document.getElementById("intro-container");
  const introVideo = document.getElementById("intro-video");
  const skipBtn = document.getElementById("skip-intro-btn");

  let gameInitialized = false;

  function launchGame() {
    if (gameInitialized) return;
    gameInitialized = true;

    introContainer.classList.add("fade-out");

    setTimeout(() => {
      introVideo.pause();
      introVideo.src = "";
      introContainer.style.display = "none";
    }, 550);

    new GameController();
  }

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");

    introContainer.classList.remove("hidden");
    introVideo.muted = false;
    introVideo.volume = 1.0;

    sounds.init();

    introVideo.play().catch(err => {
      console.warn("Reproducción adaptada:", err);
      introVideo.muted = true;
      introVideo.play();
    });

    introVideo.addEventListener("ended", launchGame);
    setTimeout(launchGame, 10200);
  });

  skipBtn.addEventListener("click", launchGame);
});