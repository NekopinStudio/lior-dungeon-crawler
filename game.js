/**
 * CONSTANTES DE MAPA Y VECTORES CARDINALES
 */
const CARDINALS = ["Norte", "Este", "Sur", "Oeste"];

const DIR_VECTORS = [
  { x: 0, y: -1 }, // Norte
  { x: 1, y: 0 },  // Este
  { x: 0, y: 1 },  // Sur
  { x: -1, y: 0 }  // Oeste
];

const TILE_OUT_OF_BOUNDS = -1;
const TILE_FLOOR = 0;
const TILE_WALL = 1;
const TILE_ENTRANCE = 2;
const TILE_EXIT = 3;
const TILE_HEAL_FOUNTAIN = 4;
const TILE_SHOP = 5;

// El tamaño de celda de 42px se mantiene intacto
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
    label: "Espada larga (c/c)",
    bonus: 8,
    dieCount: 1,
    dieSides: 8,
    flatDmg: 5,
    range: 1.5,
    ammoType: null
  },
  PISTOL: {
    name: "Pistola",
    label: "Pistola pacto (r3)",
    bonus: 9,
    dieCount: 1,
    dieSides: 10,
    flatDmg: 6,
    range: 3.5,
    ammoType: "pistol"
  },
  MUSKET: {
    name: "Mosquete",
    label: "Mosquete pacto (r5)",
    bonus: 9,
    dieCount: 1,
    dieSides: 12,
    flatDmg: 6,
    range: 5.5,
    ammoType: "musket"
  }
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getRandomDungeonDimensions(min = 10, max = 70) {
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
    this.maxHp = 48;
    this.hp = 48;
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

  // Posición directamente a espaldas de Lior
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
  constructor(dungeon) {
    this.dungeon = dungeon;

    const area = dungeon.width * dungeon.height;
    const totalEnemies = Math.max(1, Math.floor(area / 100));

    const hasBoss = totalEnemies >= 4;
    this.targetBosses = hasBoss ? 1 : 0;
    this.targetBasics = totalEnemies - this.targetBosses;

    const fromBoss = Math.max(0, this.targetBosses - 1);
    const netBasics = this.targetBasics - (this.targetBosses * 3);
    const fromBasics = netBasics >= 1 ? Math.floor(netBasics / 3) : 0;
    this.maxHealFountains = fromBoss + fromBasics;

    this.populateEnemies();
    this.placeSpecialTilesNearBosses();
  }

  populateEnemies() {
    let placedBasics = 0;
    let placedBosses = 0;

    for (let attempts = 0; attempts < 4000; attempts++) {
      if (placedBasics >= this.targetBasics && placedBosses >= this.targetBosses) break;

      const rx = Math.floor(Math.random() * (this.dungeon.width - 3)) + 1;
      const ry = Math.floor(Math.random() * (this.dungeon.height - 3)) + 1;

      if (Math.hypot(rx - this.dungeon.entrance.x, ry - this.dungeon.entrance.y) <= 4.0) continue;
      if (Math.hypot(rx - this.dungeon.exit.x, ry - this.dungeon.exit.y) <= 2.5) continue;

      const isBoss = (placedBosses < this.targetBosses && placedBasics >= 3);

      if (isBoss) {
        const bossCells = [
          { x: rx, y: ry },
          { x: rx + 1, y: ry },
          { x: rx, y: ry + 1 },
          { x: rx + 1, y: ry + 1 }
        ];

        const collides = this.dungeon.enemies.some(e =>
          e.cells.some(c1 => bossCells.some(c2 => c1.x === c2.x && c1.y === c2.y))
        );
        if (collides) continue;

        this.dungeon.enemies.push({
          x: rx, y: ry,
          name: "Jefe Titánico (2x2)",
          hp: 48, maxHp: 48,
          ac: 14,
          isBoss: true,
          size: 2,
          cells: bossCells
        });
        placedBosses++;
      } else if (placedBasics < this.targetBasics) {
        const collides = this.dungeon.enemies.some(e =>
          e.cells.some(c => c.x === rx && c.y === ry)
        );
        if (collides) continue;

        this.dungeon.enemies.push({
          x: rx, y: ry,
          name: "Sombra Hostil",
          hp: 16, maxHp: 16,
          ac: 12,
          isBoss: false,
          size: 1,
          cells: [{ x: rx, y: ry }]
        });
        placedBasics++;
      }
    }
  }

  placeSpecialTilesNearBosses() {
    const boss = this.dungeon.enemies.find(e => e.isBoss);
    const anchorX = boss ? boss.x : Math.floor(this.dungeon.width / 2);
    const anchorY = boss ? boss.y : Math.floor(this.dungeon.height / 2);

    let shopPlaced = false;
    for (let i = 0; i < 150 && !shopPlaced; i++) {
      const sx = anchorX + Math.floor(Math.random() * 11) - 5;
      const sy = anchorY + Math.floor(Math.random() * 11) - 5;
      if (!this.dungeon.isInsideBounds(sx, sy)) continue;
      if (Math.hypot(sx - anchorX, sy - anchorY) > 5) continue;
      if (Math.hypot(sx - this.dungeon.entrance.x, sy - this.dungeon.entrance.y) <= 4) continue;
      if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === sx && c.y === sy))) continue;

      this.dungeon.setTile(sx, sy, TILE_SHOP);
      shopPlaced = true;
    }

    let placedHeals = 0;
    for (let i = 0; i < 200 && placedHeals < this.maxHealFountains; i++) {
      const hx = anchorX + Math.floor(Math.random() * 11) - 5;
      const hy = anchorY + Math.floor(Math.random() * 11) - 5;
      if (!this.dungeon.isInsideBounds(hx, hy)) continue;
      if (Math.hypot(hx - anchorX, hy - anchorY) > 5) continue;
      if (Math.hypot(hx - this.dungeon.entrance.x, hy - this.dungeon.entrance.y) <= 4) continue;
      if (this.dungeon.getTile(hx, hy) === TILE_SHOP) continue;
      if (this.dungeon.enemies.some(e => e.cells.some(c => c.x === hx && c.y === hy))) continue;

      this.dungeon.setTile(hx, hy, TILE_HEAL_FOUNTAIN);
      placedHeals++;
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
}

class Renderer {
  constructor(canvas, dungeon, player, generator) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dungeon = dungeon;
    this.player = player;
    this.generator = generator;
  }

  setDungeon(dungeon, generator) {
    this.dungeon = dungeon;
    this.generator = generator;
  }

  draw() {
    const { ctx, canvas } = this;
    const { cols, rows, tileSize, playerScreenX, playerScreenY } = CAMERA_CONFIG;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
          ctx.fillStyle = inLineOfSight ? "#ffffff" : "#444444";
          ctx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_ENTRANCE) {
          ctx.fillStyle = inLineOfSight ? "#00e676" : "#00552b";
          ctx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_EXIT) {
          ctx.fillStyle = inLineOfSight ? "#ffb300" : "#664700";
          ctx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_HEAL_FOUNTAIN) {
          ctx.fillStyle = inLineOfSight ? "#062817" : "#02120a";
          ctx.fillRect(px, py, tileSize, tileSize);
          if (inLineOfSight) {
            ctx.fillStyle = "#00e676";
            ctx.font = "bold 20px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("+", px + tileSize / 2, py + tileSize / 2);
          }
        } else if (tileType === TILE_SHOP) {
          ctx.fillStyle = inLineOfSight ? "#2b2204" : "#141002";
          ctx.fillRect(px, py, tileSize, tileSize);
          if (inLineOfSight) {
            ctx.fillStyle = "#ffd700";
            ctx.font = "bold 18px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("T", px + tileSize / 2, py + tileSize / 2);
          }
        } else if (tileType === TILE_FLOOR) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(px, py, tileSize, tileSize);
        } else if (tileType === TILE_OUT_OF_BOUNDS) {
          ctx.fillStyle = "#111111";
          ctx.fillRect(px, py, tileSize, tileSize);
        }

        ctx.strokeStyle = inLineOfSight ? "#2e2e34" : "#141416";
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, tileSize, tileSize);
      }
    }

    // Dibujado de enemigos
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

                if (enemy.isBoss) {
                  ctx.fillStyle = "#cc0029";
                  ctx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
                  ctx.strokeStyle = "#ffffff";
                  ctx.lineWidth = 1.5;
                  ctx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
                } else {
                  const cx = px + tileSize / 2;
                  const cy = py + tileSize / 2;
                  ctx.fillStyle = "#ff3333";
                  ctx.beginPath();
                  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          }
        }
      });
    });

    // Render de Lior
    const liorPx = playerScreenX * tileSize + tileSize / 2;
    const liorPy = playerScreenY * tileSize + tileSize / 2;

    ctx.fillStyle = this.player.hp > 0 ? "#00b0ff" : "#555555";
    ctx.beginPath();
    ctx.arc(liorPx, liorPy, tileSize * 0.35, 0, Math.PI * 2);
    ctx.fill();

    if (this.player.hp > 0) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(liorPx, liorPy);
      ctx.lineTo(liorPx, liorPy - tileSize * 0.65);
      ctx.stroke();
    }
  }
}

class CombatSystem {
  static executeAttack(game) {
    const { player, dungeon } = game;

    // BLOQUEO POR MUERTE: no se puede atacar si Lior murió
    if (player.hp <= 0) {
      game.log("Lior ha caído. Reinicia para volver a intentarlo.");
      return;
    }

    const weapon = player.equippedWeapon;

    if (weapon.ammoType === "pistol" && player.ammoPistol <= 0) {
      game.log("¡Sin balas de Pistola! Cambia de arma.");
      return;
    }
    if (weapon.ammoType === "musket" && player.ammoMusket <= 0) {
      game.log("¡Sin balas de Mosquete! Cambia de arma.");
      return;
    }

    let target = null;
    let targetIndex = -1;
    let minDist = 999;

    dungeon.enemies.forEach((enemy, idx) => {
      enemy.cells.forEach(cell => {
        const dist = Math.hypot(cell.x - player.x, cell.y - player.y);
        if (dist <= weapon.range) {
          for (let sy = 0; sy < CAMERA_CONFIG.rows; sy++) {
            for (let sx = 0; sx < CAMERA_CONFIG.cols; sx++) {
              const wPos = CameraTransformer.screenToWorld(sx, sy, player);
              if (wPos.x === cell.x && wPos.y === cell.y) {
                if (VisibilitySystem.hasLineOfSight(
                  CAMERA_CONFIG.playerScreenX, CAMERA_CONFIG.playerScreenY, sx, sy, dungeon, player
                )) {
                  if (dist < minDist) {
                    minDist = dist;
                    target = enemy;
                    targetIndex = idx;
                  }
                }
              }
            }
          }
        }
      });
    });

    if (!target) {
      game.log(`Sin objetivos en rango (${weapon.range}) de tu ${weapon.name}.`);
      return;
    }

    if (weapon.ammoType === "pistol") player.ammoPistol--;
    if (weapon.ammoType === "musket") player.ammoMusket--;

    const d20 = rollDie(20);
    const attackTotal = d20 + weapon.bonus;
    game.log(`${weapon.name}: [d20(${d20}) + ${weapon.bonus} = ${attackTotal}] vs CA ${target.ac}`);

    if (d20 === 20 || attackTotal >= target.ac) {
      let dmg = weapon.flatDmg;
      for (let i = 0; i < weapon.dieCount; i++) dmg += rollDie(weapon.dieSides);
      target.hp -= dmg;
      game.log(`¡Impacto! Causas ${dmg} de daño. (HP: ${Math.max(0, target.hp)})`);

      if (target.hp <= 0) {
        let goldDrop = target.isBoss ? rollDie(3) : (Math.random() < 0.5 ? 1 : 0);
        player.gold += goldDrop;
        game.log(`¡${target.name} abatido! Botín: +${goldDrop} PO.`);
        dungeon.enemies.splice(targetIndex, 1);
        game.updateHUD();
        game.renderer.draw();
        return;
      }
    } else {
      game.log("El ataque falló.");
    }

    CombatSystem.enemyCounterAttack(game, target, minDist);
    game.updateHUD();
    game.renderer.draw();
  }

  static enemyCounterAttack(game, enemy, dist) {
    const { player } = game;
    const eD20 = rollDie(20);

    // 1. Ataque cuerpo a cuerpo (adyacente a 1 casilla de cualquier parte de su cuerpo)
    if (dist <= 1.5) {
      const atkBonus = enemy.isBoss ? 6 : 4;
      const totalAtk = eD20 + atkBonus;
      game.log(`${enemy.name} c/c: [d20(${eD20}) + ${atkBonus} = ${totalAtk}] vs CA ${player.ac}`);
      if (totalAtk >= player.ac) {
        const dmg = rollDie(enemy.isBoss ? 10 : 6) + (enemy.isBoss ? 4 : 2);
        player.hp = Math.max(0, player.hp - dmg);
        game.log(`¡Recibes ${dmg} de daño cuerpo a cuerpo!`);
      } else {
        game.log("Bloqueas el golpe con tu broquel.");
      }
    } 
    // 2. Ataque a distancia: el Jefe cubre 2 casillas extra desde su cuerpo (dist <= 2.5)
    // Los enemigos básicos cubren hasta 3 casillas (dist <= 3.5)
    else if ((enemy.isBoss && dist <= 2.5) || (!enemy.isBoss && dist <= 3.5)) {
      const atkBonus = enemy.isBoss ? 5 : 3;
      const totalAtk = eD20 + atkBonus;
      game.log(`${enemy.name} proyectil: [d20(${eD20}) + ${atkBonus} = ${totalAtk}] vs CA ${player.ac}`);
      if (totalAtk >= player.ac) {
        const dmg = rollDie(enemy.isBoss ? 8 : 4) + (enemy.isBoss ? 3 : 2);
        player.hp = Math.max(0, player.hp - dmg);
        game.log(`¡Impacto de proyectil enemigo! -${dmg} HP.`);
      } else {
        game.log("El proyectil se desvía en la pared.");
      }
    }

    if (player.hp <= 0) {
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
    const { width, height } = getRandomDungeonDimensions(10, 70);
    this.dungeon = new Dungeon(width, height);
    this.generator = new DungeonGenerator(this.dungeon);

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
    const bossText = this.generator.targetBosses > 0 ? " (¡1 Jefe 2x2 acecha!)" : "";
    this.log(`Piso ${this.floor}: ${width}x${height}. Enemigos: ${this.dungeon.enemies.length}${bossText}.`);
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
      this.log("Manos Curativas: +6 HP.");
      this.updateHUD();
    } else {
      this.log("Manos Curativas ya fue usado en este piso.");
    }
  }

  cycleWeapon() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.cycleWeapon();
    this.log(`Equipada: ${this.player.equippedWeapon.label}`);
    this.updateHUD();
  }

  turnLeft() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.turnLeft();
    this.log(`Giras a la izquierda. Miras al ${CARDINALS[this.player.direction]}.`);
    this.updateHUD();
    this.renderer.draw();
  }

  turnRight() {
    if (this.isShopOpen || this.player.hp <= 0) return;
    this.player.turnRight();
    this.log(`Giras a la derecha. Miras al ${CARDINALS[this.player.direction]}.`);
    this.updateHUD();
    this.renderer.draw();
  }

  // Avanzar al frente
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
    this.handleTileInteractions();
  }

  // Retroceder un paso sin girar
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
    this.log(`Retrocedes un paso manteniendo la vista al ${CARDINALS[this.player.direction]}.`);
    this.handleTileInteractions();
  }

  handleTileInteractions() {
    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_HEAL_FOUNTAIN) {
      const heal = rollDie(6);
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
      this.log(`Santuario de vida: +${heal} HP restaurados.`);
      this.dungeon.setTile(this.player.x, this.player.y, TILE_FLOOR);
    }

    if (this.dungeon.getTile(this.player.x, this.player.y) === TILE_SHOP) {
      this.openShop();
    }

    this.updateHUD();

    if (this.player.x === this.dungeon.exit.x && this.player.y === this.dungeon.exit.y) {
      this.log("¡Salida alcanzada! Descendiendo...");
      this.floor++;
      setTimeout(() => this.initDungeonFloor(), 700);
      return;
    }

    this.renderer.draw();
  }

  bindEvents() {
    // Cruceta completa (▲, ◀, ▶, ▼)
    document.getElementById("btn-forward").addEventListener("click", () => this.moveForward());
    document.getElementById("btn-left").addEventListener("click", () => this.turnLeft());
    document.getElementById("btn-right").addEventListener("click", () => this.turnRight());
    document.getElementById("btn-backward").addEventListener("click", () => this.moveBackward());

    // Romboide
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

window.addEventListener("DOMContentLoaded", () => {
  new GameController();
});
