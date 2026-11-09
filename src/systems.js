class CombatSystem {
  static isUndead(enemy) {
    return enemy.name === "Esqueleto" || enemy.name === "Zombi";
  }

  static startEnemyFear(enemy) {
    if (CombatSystem.isUndead(enemy)) return false;
    if (enemy.isBoss || enemy.committedToCombat || enemy.fearCooldown > 0 || (enemy.fearEpisodes || 0) >= 3) return false;
    enemy.fearEpisodes = (enemy.fearEpisodes || 0) + 1;
    enemy.fearCooldown = ENEMY_FLEE_DURATION_TURNS;
    enemy.state = "panic";
    return true;
  }

  static canRangedEnemyFire(dungeon, player, x, y, shooter = null) {
    const dx = Math.abs(player.x - x), dy = Math.abs(player.y - y);
    if (dx + dy !== 2 || (dx && dy)) return false;
    const mx = (player.x + x) / 2, my = (player.y + y) / 2;
    return !CombatSystem.findBlockingCell(dungeon, x, y, player.x, player.y)
      && !dungeon.enemies.some(other => other !== shooter && other.hp > 0 && other.cells?.some(c => c.x === mx && c.y === my));
  }

  static findRangedStep(dungeon, player, enemy, directions) {
    const occupied = new Set(dungeon.enemies.filter(other => other !== enemy && other.hp > 0)
      .flatMap(other => (other.cells || []).map(cell => dungeon.getKey(cell.x, cell.y))));
    const queue = [{ x: enemy.x, y: enemy.y, first: null }];
    const visited = new Set([dungeon.getKey(enemy.x, enemy.y)]);
    for (let index = 0; index < queue.length; index++) {
      const node = queue[index];
      if (node.first && CombatSystem.canRangedEnemyFire(dungeon, player, node.x, node.y, enemy)) return node.first;
      for (const direction of directions) {
        const x = node.x + direction.dx, y = node.y + direction.dy;
        const key = dungeon.getKey(x, y);
        if (!dungeon.isInsideBounds(x, y) || dungeon.getTile(x, y) === TILE_WALL ||
            (x === player.x && y === player.y) || occupied.has(key) || visited.has(key)) continue;
        visited.add(key);
        queue.push({ x, y, first: node.first || direction });
      }
    }
    return null;
  }

  static getEnemyAttackRange(enemy) {
    const size = Math.max(1, Math.floor(enemy?.size || 1));
    if (size >= 2 || enemy?.isBoss || enemy?.isMegaBoss || enemy?.ranged) return 2;
    return 1;
  }

  static getEnemyAttackCadence(enemy) {
    const size = Math.max(1, Math.floor(enemy?.size || 1));
    if (size >= 4 || enemy?.isMegaBoss) return 4;
    if (size === 2 || enemy?.isBoss) return 2;
    return 1;
  }

  static syncEnemyCells(enemy) {
    if (!enemy) return [];
    const size = Math.max(1, Math.floor(enemy.size || 1));
    if (!Array.isArray(enemy.cells) || enemy.cells.length !== size * size ||
        enemy.cells[0]?.x !== enemy.x || enemy.cells[0]?.y !== enemy.y) {
      const cells = [];
      for (let dy = 0; dy < size; dy++) {
        for (let dx = 0; dx < size; dx++) {
          cells.push({ x: enemy.x + dx, y: enemy.y + dy });
        }
      }
      enemy.cells = cells;
    }
    enemy.attackRange = CombatSystem.getEnemyAttackRange(enemy);
    enemy.attackCadence = CombatSystem.getEnemyAttackCadence(enemy);
    return enemy.cells;
  }

  static getEnemyBlockBounds(enemy) {
    const cells = CombatSystem.syncEnemyCells(enemy);
    if (!cells || cells.length === 0) {
      const x = enemy?.x ?? 0;
      const y = enemy?.y ?? 0;
      const s = Math.max(1, enemy?.size || 1);
      return { minX: x, maxX: x + s - 1, minY: y, maxY: y + s - 1 };
    }
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (c.x < minX) minX = c.x;
      if (c.x > maxX) maxX = c.x;
      if (c.y < minY) minY = c.y;
      if (c.y > maxY) maxY = c.y;
    }
    return { minX, maxX, minY, maxY };
  }

  static getMinDistToPlayer(player, enemy) {
    if (!player || !enemy) return 999;
    const { minX, maxX, minY, maxY } = CombatSystem.getEnemyBlockBounds(enemy);
    const dx = Math.max(0, minX - player.x, player.x - maxX);
    const dy = Math.max(0, minY - player.y, player.y - maxY);
    return Math.hypot(dx, dy);
  }

  static getMinDistBetweenEnemies(enemyA, enemyB) {
    if (!enemyA || !enemyB) return 999;
    const a = CombatSystem.getEnemyBlockBounds(enemyA);
    const b = CombatSystem.getEnemyBlockBounds(enemyB);
    const dx = Math.max(0, a.minX - b.maxX, b.minX - a.maxX);
    const dy = Math.max(0, a.minY - b.maxY, b.minY - a.maxY);
    return Math.hypot(dx, dy);
  }

  static hasNearbyAlly(dungeon, enemy, radius = ENEMY_ALLY_DETECTION_RADIUS) {
    if (!dungeon?.enemies || !enemy) return false;
    return dungeon.enemies.some(other =>
      other !== enemy
      && (other.hp === undefined || other.hp > 0)
      && !other.stunned
      && (other.fearCooldown || 0) <= 0
      && CombatSystem.getMinDistBetweenEnemies(enemy, other) <= radius
    );
  }

  static hasAlertedNearbyAlly(player, dungeon, enemy, radius = ENEMY_ALLY_DETECTION_RADIUS) {
    if (!player || !dungeon?.enemies || !enemy) return false;
    return dungeon.enemies.some(other => {
      if (other === enemy || (other.hp !== undefined && other.hp <= 0)) return false;
      if ((other.fearCooldown || 0) > 0 || other.stunned) return false;
      if (CombatSystem.getMinDistBetweenEnemies(enemy, other) > radius) return false;
      const distOtherToPlayer = CombatSystem.getMinDistToPlayer(player, other);
      return distOtherToPlayer <= (other.visionRange || MINION_VISION_RANGE)
        && CombatSystem.canEnemySeePlayer(player, dungeon, other);
    });
  }

  static canEnemySeePlayer(player, dungeon, enemy) {
    const cells = CombatSystem.syncEnemyCells(enemy);
    if (!cells || cells.length === 0) return false;
    return cells.some(cell =>
      VisibilitySystem.hasWorldLineOfSight(cell.x, cell.y, player.x, player.y, dungeon)
    );
  }

  static canEnemySeeEnemy(dungeon, observer, target) {
    if (!dungeon || !observer || !target) return false;
    const observerCells = CombatSystem.syncEnemyCells(observer);
    const targetCells = CombatSystem.syncEnemyCells(target);
    if (!observerCells?.length || !targetCells?.length) return false;
    return observerCells.some(oc =>
      targetCells.some(tc => VisibilitySystem.hasWorldLineOfSight(oc.x, oc.y, tc.x, tc.y, dungeon))
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

    const clearCandidates = candidates.filter(c => !c.blocker);
    if (clearCandidates.length > 0) {
      const musketLevel = weapon.id === "musket" ? (player.weaponUpgrades?.musket || 0) : 0;
      if (weapon.id === "musket" && musketLevel >= 2) {
        const maxTargets = musketLevel >= 3 ? Infinity : 2;
        const primary = clearCandidates[0];
        const basis = CameraTransformer.getBasis(player.direction);
        const primaryLat = (primary.cell.x - player.x) * basis.right.x + (primary.cell.y - player.y) * basis.right.y;
        const lineCandidates = clearCandidates
          .filter(cand => {
            const candLat = (cand.cell.x - player.x) * basis.right.x + (cand.cell.y - player.y) * basis.right.y;
            return candLat === primaryLat;
          })
          .sort((a, b) => {
            const fwdA = (a.cell.x - player.x) * basis.forward.x + (a.cell.y - player.y) * basis.forward.y;
            const fwdB = (b.cell.x - player.x) * basis.forward.x + (b.cell.y - player.y) * basis.forward.y;
            return fwdA - fwdB;
          });
        const uniqueTargets = [];
        let lastCell = primary.cell;
        for (const cand of lineCandidates) {
          if (!uniqueTargets.includes(cand.enemy)) {
            uniqueTargets.push(cand.enemy);
            lastCell = cand.cell;
            if (uniqueTargets.length >= maxTargets) break;
          }
        }
        return { targets: uniqueTargets, impact: lastCell, area: null, hitWall: false };
      }
      return { targets: [clearCandidates[0].enemy], impact: clearCandidates[0].cell, area: null, hitWall: false };
    }
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
      // Cada segmento de escudo activo bloquea el 100% del impacto recibido:
      effectiveDamage = 0;
      mitigatedDamage = rawDamage;
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
        ? (totalDamage > 0 ? `-${totalDamage} HP (🛡-${mitigatedDamage})` : `🛡 BLOQUEADO (-${mitigatedDamage})`)
        : `-${totalDamage} HP`;
      const floatType = (shieldConsumed > 0 && totalDamage === 0) ? "shield" : "damage";
      game?.renderer?.showFloatingNumber(player.x, player.y, floatLabel, floatType);
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
    if (damage > 0) {
      target.committedToCombat = true;
      target.fearCooldown = 0;
    }
    if (!target.isBoss && target.name === "Zombi" && target.hp === 0 && !target.lastStandUsed) {
      target.lastStandUsed = true;
      if (Math.random() < 0.20) {
        target.hp = 1;
        game?.log?.("🧟 ¡El Zombi resiste el golpe mortal con 1 HP!");
        game?.renderer?.showVisualEffect("toxin", target.x, target.y, 550);
      }
    }
    if (!target.isBoss && target.name === "Esqueleto" && target.hp === 0 && !target.reassemblyUsed) {
      target.reassemblyUsed = true;
      if (Math.random() < 0.50) {
        target.hp = Math.max(1, Math.ceil(target.maxHp / 2));
        game.log("💀 El Esqueleto se desarma y vuelve a levantarse con la mitad de su vida.");
        game.renderer?.playEnemyAnim(target, "reassemble");
      }
    }
    if (
      target.isMegaBoss
      && target.originTier === 10
      && target.hp > 0
      && target.hp <= target.maxHp / 2
      && !target.solarPhase2Triggered
    ) {
      target.solarPhase2Triggered = true;
      game?.renderer?.triggerRoarVisualEffect?.(target.x + 1.5, target.y + 1.5, true);
      game?.log?.("☀️ ¡SUPERNOVA SOLAR! El Dragón Solar entra en Fase II.");
    }
    if (animate && target.hp > 0 && target.anim?.state !== "reassemble") game.renderer?.playEnemyAnim(target, "hurt");
    return damage;
  }

  static applyTrueDamageToPlayer(game, player, trueDamage, icon = "🔥") {
    const dmg = Math.max(0, Math.floor(trueDamage));
    if (!player || dmg <= 0 || player.hp <= 0) return 0;
    const actual = Math.min(player.hp, dmg);
    player.hp = Math.max(0, player.hp - actual);
    if (actual > 0) {
      if (game?.stats) {
        game.stats.totalDamageTaken += actual;
      }
      game?.renderer?.showFloatingNumber?.(player.x, player.y, `-${actual} HP ${icon}`, "damage");
      if (player.hp <= 0) {
        game?.clearSavedGame?.();
      } else {
        game?.syncBiomeMusic?.();
      }
      game?.updateHUD?.();
    }
    return actual;
  }

  static consumeExtraShieldSegments(game, player, extraCount = 1) {
    if (!player || (player.shieldSegments || 0) <= 0 || extraCount <= 0) return 0;
    const consumed = Math.min(player.shieldSegments, Math.floor(extraCount));
    player.shieldSegments = Math.max(0, player.shieldSegments - consumed);
    if (consumed > 0) {
      if (game?.stats) {
        game.stats.shieldSegmentsConsumed += consumed;
      }
      game?.updateHUD?.();
    }
    return consumed;
  }

  static displacePlayer(game, dx, dy, maxSteps = 1) {
    const stepX = Math.sign(dx);
    const stepY = Math.sign(dy);
    if ((stepX === 0 && stepY === 0) || !game?.player || !game?.dungeon) {
      return { moved: false, stepsMoved: 0, hitWall: false };
    }
    const { dungeon, player } = game;
    if (dungeon.turnCount > 0 && dungeon.lastDisplacementTurn === dungeon.turnCount) {
      return { moved: false, stepsMoved: 0, hitWall: false };
    }
    let curX = player.x;
    let curY = player.y;
    let stepsMoved = 0;
    let hitWall = false;

    for (let step = 1; step <= maxSteps; step++) {
      const nextX = curX + stepX;
      const nextY = curY + stepY;

      if (!dungeon.isInsideBounds(nextX, nextY)) {
        hitWall = true;
        break;
      }

      const tile = dungeon.getTile(nextX, nextY);
      const lockedExit = tile === TILE_EXIT && dungeon.enemies.some(e => e.hp > 0);
      if (tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS || lockedExit) {
        hitWall = true;
        break;
      }

      const occupiedByEnemy = dungeon.enemies.some(e => e.hp > 0 && e.cells?.some(c => c.x === nextX && c.y === nextY));
      const occupiedByMerchant = game.isMerchantAt?.(nextX, nextY);
      if (occupiedByEnemy || occupiedByMerchant) {
        break;
      }

      curX = nextX;
      curY = nextY;
      stepsMoved++;
    }

    if (stepsMoved > 0) {
      if (dungeon.turnCount > 0) {
        dungeon.lastDisplacementTurn = dungeon.turnCount;
      }
      player.x = curX;
      player.y = curY;
      dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, player));
      game.renderer?.commitCameraFacing?.();
    }

    return { moved: stepsMoved > 0, stepsMoved, hitWall };
  }

  static applyMegaBossOnHitEffects(game, enemy, attack, dmgRes, distToPlayer, hadShieldBeforeHit) {
    if (!enemy || !enemy.isMegaBoss || !game?.player || game.player.hp <= 0) return "";
    const player = game.player;
    const tier = enemy.originTier || 1;
    const centerX = enemy.x + (enemy.size - 1) / 2;
    const centerY = enemy.y + (enemy.size - 1) / 2;

    switch (tier) {
      case 1: {
        // Roc: empuja a Lior hasta 2 casillas hacia atrás (1 si el golpe fue absorbido por escudo);
        // solo inflige +2 DMG contra muro si el impacto no fue absorbido por un segmento de escudo.
        const pushDx = Math.sign(player.x - centerX);
        const pushDy = Math.sign(player.y - centerY);
        const pushSteps = hadShieldBeforeHit ? 1 : 2;
        const pushRes = CombatSystem.displacePlayer(game, pushDx, pushDy, pushSteps);
        if (pushRes.hitWall && !hadShieldBeforeHit) {
          CombatSystem.applyTrueDamageToPlayer(game, player, 2, "🌪");
          return "🌪 ¡Estampado contra el muro (-2 HP)!";
        }
        return pushRes.moved ? `🌪 ¡Vendaval te empuja ${pushRes.stepsMoved} ${pushRes.stepsMoved === 1 ? "casilla" : "casillas"}!` : "";
      }
      case 2: {
        // Tarrasca: a corta distancia (<= 2 casillas) destruye +1 segmento de escudo adicional
        if (distToPlayer <= 2 && player.shieldSegments > 0) {
          const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
          if (extra > 0) return "🦷 ¡Fauces colosales destruyen +1🛡 extra!";
        }
        return "";
      }
      case 4: {
        // Kraken: atrae a Lior hasta 2 casillas hacia sus tentáculos y retrasa Misty Step en 4 acciones
        const pullDx = Math.sign(centerX - player.x);
        const pullDy = Math.sign(centerY - player.y);
        const pullRes = CombatSystem.displacePlayer(game, pullDx, pullDy, 2);
        player.mistyStepActionCounter = Math.max(0, (player.mistyStepActionCounter || 0) - 4);
        return pullRes.moved
          ? "🐙 ¡Tentáculos te arrastran y retrasan Bruma (-4 acc.)!"
          : "🐙 ¡Tentáculos retrasan la recarga de Bruma (-4 acc.)!";
      }
      case 5: {
        // Gigante de tormenta: sobrecarga el escudo (-1🛡 extra) o 35% de aturdir si no tenías escudo
        if (hadShieldBeforeHit) {
          const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
          if (extra > 0) return "⚡ ¡Relámpago sobrecarga tu escudo (-1🛡 extra)!";
        } else if (attack?.critical || Math.random() < 0.35) {
          player.stunned = true;
          return "⚡ ¡El relámpago te aturde por 1 turno!";
        }
        return "";
      }
      case 6: {
        // Beholder: drena hasta 3 cargas de Eldritch Blast y bloquea críticos en el próximo ataque
        const before = player.blastCurrentCharges || 0;
        player.blastCurrentCharges = Math.max(0, before - 3);
        player.antimagicCritLock = true;
        game.updateHUD?.();
        return "👁 ¡Mirada Antimagia drena EB y anula tu próximo crítico!";
      }
      case 8: {
        // Balor: atrae 1 casilla con su látigo e inflige +2 de daño de fuego verdadero (+4 en Furia <=30% HP)
        const pullDx = Math.sign(centerX - player.x);
        const pullDy = Math.sign(centerY - player.y);
        CombatSystem.displacePlayer(game, pullDx, pullDy, 1);
        const fireDmg = enemy.hp <= Math.floor(enemy.maxHp * 0.30) ? 4 : 2;
        CombatSystem.applyTrueDamageToPlayer(game, player, fireDmg, "🔥");
        return `🔥 ¡Látigo abisal te atrae (+${fireDmg} DMG de fuego verdadero)!`;
      }
      case 9: {
        // Dragón rojo ancestral: funde +1 segmento de escudo extra y quema 1 bala al azar
        const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
        const ammoPools = ["ammoPistol", "ammoMusket", "ammoBlunderbuss"].filter(k => (player[k] || 0) > 0);
        let burnedAmmo = false;
        if (ammoPools.length > 0) {
          const chosen = ammoPools[Math.floor(Math.random() * ammoPools.length)];
          player[chosen] = Math.max(0, player[chosen] - 1);
          player.ensureEquippedWeaponAvailable?.();
          burnedAmmo = true;
        }
        game.updateHUD?.();
        if (extra > 0 && burnedAmmo) return "🔥 ¡Aliento funde +1🛡 extra y quema 1 bala!";
        if (extra > 0) return "🔥 ¡Aliento calcinante funde +1🛡 extra!";
        if (burnedAmmo) return "🔥 ¡Aliento calcinante incinera 1 bala!";
        return "";
      }
      case 10: {
        // Dragón solar: Fase 1 empuja 1 casilla y rompe +1🛡 extra; Fase 2 (<=50% HP) empuja 1 casilla y mete +4 DMG radiante verdadero
        const pushDx = Math.sign(player.x - centerX);
        const pushDy = Math.sign(player.y - centerY);
        CombatSystem.displacePlayer(game, pushDx, pushDy, 1);
        const inPhase2 = enemy.solarPhase2Triggered || enemy.hp <= enemy.maxHp / 2;
        if (inPhase2) {
          CombatSystem.applyTrueDamageToPlayer(game, player, 4, "☀️");
          return "☀️ ¡Supernova Solar inflige +4 DMG radiante verdadero!";
        }
        const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
        return extra > 0 ? "☀️ ¡Fulgor solar rompe +1🛡 extra!" : "☀️ ¡Onda solar te empuja hacia atrás!";
      }
      default:
        return "";
    }
  }

  static isWallCollisionForEnemyBlock(dungeon, cells) {
    if (!dungeon || !cells || cells.length === 0) return false;
    return cells.some(c => {
      if (!dungeon.isInsideBounds(c.x, c.y)) return true;
      const tile = dungeon.getTile(c.x, c.y);
      const lockedExit = tile === TILE_EXIT && dungeon.enemies.some(enemy => enemy.hp > 0);
      return tile === TILE_WALL || tile === TILE_OUT_OF_BOUNDS || lockedExit;
    });
  }

  static getBlunderbussPushOptions(player) {
    const level = Math.max(0, Math.min(3, player.weaponUpgrades?.blunderbuss || 0));
    return { steps: level >= 3 ? 2 : level === 2 ? 1 : 0, wallCrit: level >= 1 };
  }

  static applyBlunderbussKnockback(game, target, maxPushSteps = 0, canWallCrit = false, preview = false) {
    if (!target || target.hp <= 0 || !game?.player || !game?.dungeon) {
      return { moved: false, stepsMoved: 0, hitWall: false };
    }

    const { dungeon, player } = game;
    const size = Math.max(1, Math.floor(target.size || 1));
    const centerX = target.x + (size - 1) / 2;
    const centerY = target.y + (size - 1) / 2;
    let dx = Math.sign(centerX - player.x);
    let dy = Math.sign(centerY - player.y);
    if (dx === 0 && dy === 0) {
      const dirVec = DIR_VECTORS[((player.direction % 4) + 4) % 4] || DIR_VECTORS[0];
      dx = dirVec.x;
      dy = dirVec.y;
    }
    if (dx === 0 && dy === 0) return { moved: false, stepsMoved: 0, hitWall: false };

    CombatSystem.syncEnemyCells(target);
    let curX = target.x;
    let curY = target.y;
    let curCells = target.cells.map(c => ({ x: c.x, y: c.y }));
    let stepsMoved = 0;
    let hitWall = false;

    if (maxPushSteps <= 0) {
      if (canWallCrit) {
        const nextCells = curCells.map(c => ({ x: c.x + dx, y: c.y + dy }));
        hitWall = CombatSystem.isWallCollisionForEnemyBlock(dungeon, nextCells);
      }
      return { moved: false, stepsMoved: 0, hitWall };
    }

    for (let step = 1; step <= maxPushSteps; step++) {
      const nextCells = curCells.map(c => ({ x: c.x + dx, y: c.y + dy }));

      if (CombatSystem.isWallCollisionForEnemyBlock(dungeon, nextCells)) {
        hitWall = true;
        break;
      }

      if (nextCells.some(c => c.x === player.x && c.y === player.y)) {
        break;
      }

      const occupied = dungeon.enemies.some(enemy => enemy !== target && enemy.hp > 0
        && enemy.cells?.some(cell => nextCells.some(nc => nc.x === cell.x && nc.y === cell.y)));
      if (occupied || nextCells.some(nc => game.isMerchantAt?.(nc.x, nc.y))) {
        break;
      }

      curX += dx;
      curY += dy;
      curCells = nextCells;
      stepsMoved++;
    }

    if (stepsMoved > 0 && !preview) {
      target.x = curX;
      target.y = curY;
      target.cells = curCells;
      CombatSystem.syncEnemyCells(target);
    }

    return { moved: stepsMoved > 0, stepsMoved, hitWall: canWallCrit && hitWall, x: curX, y: curY };
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

  static applyMiniBossOnHitEffects(game, enemy, distToPlayer, hadShieldBeforeHit) {
    if (!enemy || !enemy.isBoss || enemy.isMegaBoss || !game?.player || game.player.hp <= 0) return "";
    const player = game.player;
    const tier = enemy.originTier || 1;
    const centerX = enemy.x + (enemy.size - 1) / 2;
    const centerY = enemy.y + (enemy.size - 1) / 2;

    switch (tier) {
      case 1: {
        // Ogro: Garrotazo que empuja 1 casilla
        const pushRes = CombatSystem.displacePlayer(game, Math.sign(player.x - centerX), Math.sign(player.y - centerY), 1);
        return pushRes.moved ? "🪵 ¡Garrotazo te empuja 1 casilla!" : "";
      }
      case 4: {
        // Osobúho: 30% de romper +1 segmento de escudo adicional
        if (distToPlayer <= 2 && player.shieldSegments > 0 && Math.random() < 0.30) {
          const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
          if (extra > 0) return "🦉 ¡Abrazo feroz rompe +1🛡 extra!";
        }
        return "";
      }
      case 6: {
        // Basilisco: 25% de aturdir si golpeas sin escudo
        if (!hadShieldBeforeHit && Math.random() < 0.25) {
          player.stunned = true;
          return "🐍 ¡Mirada petrificante te aturde 1 turno!";
        }
        return "";
      }
      case 7: {
        // Quimera: +1 DMG de fuego verdadero
        CombatSystem.applyTrueDamageToPlayer(game, player, 1, "🔥");
        return "🔥 ¡Aliento de Quimera (+1 DMG)!";
      }
      case 9: {
        // Gigante de las colinas: rompe +1 escudo extra y empuja 1 casilla
        const extra = CombatSystem.consumeExtraShieldSegments(game, player, 1);
        CombatSystem.displacePlayer(game, Math.sign(player.x - centerX), Math.sign(player.y - centerY), 1);
        return extra > 0 ? "🪨 ¡Aplastamiento rompe +1🛡 extra!" : "🪨 ¡Golpe colosal te hace retroceder!";
      }
      case 10: {
        // Dragón joven: +2 DMG de fuego verdadero
        CombatSystem.applyTrueDamageToPlayer(game, player, 2, "🔥");
        return "🔥 ¡Fuego dracónico (+2 DMG verdadero)!";
      }
      default:
        return "";
    }
  }

  static rollAttack(game, target, weapon = game.player.equippedWeapon, consumeBlessing = false) {
    if (target && game?.player) {
      target.committedToCombat = true;
      target.fearCooldown = 0;
      Renderer.orientEnemyTowardsPlayer(target, game.player);
    }
    const result = CombatSystem.resolveD20Attack(game.player, target, game.hitBonus);
    if (!result) return false;
    if (result.fumble) {
      game.log(TEXT.logs.criticalMiss("Lior"));
      game.player.stunned = true;
      return true;
    }

    const critBlockedByAntimagic = !!game.player.antimagicCritLock;
    if (critBlockedByAntimagic) {
      game.player.antimagicCritLock = false;
    }

    const dmgBreakdown = CombatSystem.rollWeaponDamageBreakdown(game.player, weapon);
    if (consumeBlessing && !weapon.isMelee && (game.player.blessedAmmoCharges || 0) > 0) {
      const blessedRoll = rollDie(6);
      dmgBreakdown.trueDamage += blessedRoll;
      dmgBreakdown.totalDamage += blessedRoll;
    }
    const isIronGolem = !!(target.isMegaBoss && target.originTier === 3);
    const isBulette = !!(target.isBoss && !target.isMegaBoss && target.originTier === 8);

    if (!result.hit) {
      if (dmgBreakdown.trueDamage > 0) {
        const effectiveTrue = isIronGolem
          ? Math.ceil(dmgBreakdown.trueDamage * 1.5)
          : dmgBreakdown.trueDamage;
        const damage = CombatSystem.applyDamageToEnemy(game, target, effectiveTrue);
        if (game?.stats && weapon.id === "pistol") {
          game.stats.pistolHits++;
        }
        if (damage > 0) {
          game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage", false);
          if (weapon.id === "pistol") game.renderer?.showVisualEffect("pistol", target.x, target.y, 420, 0, 3);
        }
        game.log(TEXT.logs.attackHit(result.total, target.ac, damage, target.name, target.hp));
        return false;
      }
      game.log(TEXT.logs.attackDefended(result.total, target.ac, target.name));
      return false;
    }

    let knockbackResult = null;
    if (weapon.id === "blunderbuss") {
      const push = CombatSystem.getBlunderbussPushOptions(game.player);
      knockbackResult = CombatSystem.applyBlunderbussKnockback(game, target, push.steps, push.wallCrit);
      if (knockbackResult?.hitWall) game?.renderer?.showVisualEffect("blunderbuss", target.x, target.y, 450, 0, 3);
    }

    const isCriticalHit = !critBlockedByAntimagic
      && !!(result.critical || (weapon.id === "blunderbuss" && knockbackResult?.hitWall));
    let rolledDamage;
    if (isIronGolem) {
      // Blindaje Forjado (Gólem de hierro): mitiga -2 de daño físico convencional (mín. 1)
      // pero recibe +50% de daño verdadero perforante.
      const critNormal = isCriticalHit
        ? Math.ceil(dmgBreakdown.normalDamage * 1.5)
        : dmgBreakdown.normalDamage;
      const mitigatedNormal = critNormal > 0 ? Math.max(1, critNormal - 2) : 0;
      const critTrue = isCriticalHit
        ? Math.ceil(dmgBreakdown.trueDamage * 1.5)
        : dmgBreakdown.trueDamage;
      const boostedTrue = Math.ceil(critTrue * 1.5);
      rolledDamage = mitigatedNormal + boostedTrue;
    } else if (isBulette) {
      // Coraza Terrestre (Bulette 2x2): mitiga -1 de daño físico convencional (mín. 1)
      const critNormal = isCriticalHit
        ? Math.ceil(dmgBreakdown.normalDamage * 1.5)
        : dmgBreakdown.normalDamage;
      const mitigatedNormal = critNormal > 0 ? Math.max(1, critNormal - 1) : 0;
      const critTrue = isCriticalHit
        ? Math.ceil(dmgBreakdown.trueDamage * 1.5)
        : dmgBreakdown.trueDamage;
      rolledDamage = mitigatedNormal + critTrue;
    } else {
      const baseDamage = dmgBreakdown.totalDamage;
      rolledDamage = isCriticalHit ? Math.ceil(baseDamage * 1.5) : baseDamage;
    }
    const damage = CombatSystem.applyDamageToEnemy(game, target, rolledDamage);
    if (game?.stats) {
      if (weapon.isMelee) game.stats.swordHits++;
      else if (weapon.id === "pistol") game.stats.pistolHits++;
      else if (weapon.id === "musket") game.stats.musketHits++;
      else if (weapon.id === "blunderbuss") game.stats.blunderbussHits++;
    }
    if (damage > 0) {
      game.renderer?.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage", isCriticalHit);
      if (weapon.isMelee) game.renderer?.showVisualEffect(isCriticalHit ? "swordcrit" : "swordhit", target.x, target.y, 300);
      if (weapon.id === "musket") game.renderer?.showVisualEffect("musket", target.x, target.y, 320, 0, 3, 180);
      if (weapon.id === "pistol" && dmgBreakdown.trueDamage > 0) game.renderer?.showVisualEffect("pistol", target.x, target.y, 420, 0, 3);
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
        const tier = getTierForFloor(game.floor || 1);
        const dropChance = enemy.isMegaBoss ? 1 : (enemy.isBoss ? 0.55 : 0.30);
        if (enemy.isMegaBoss || Math.random() < dropChance) {
          const goldDrop = enemy.isMegaBoss
            ? (10 + tier * 2)
            : (enemy.isBoss
                ? (rollDie(3) + Math.floor(tier / 2))
                : (rollDie(2) + Math.floor((tier - 1) / 4)));
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
    return dead.filter(enemy => enemy.isBoss || enemy.isMegaBoss || (enemy.size || 1) >= 2);
  }

  static applyPanic(game, deadLargeEnemies) {
    if (!deadLargeEnemies || deadLargeEnemies.length === 0 || !game?.dungeon?.enemies) return;
    let anyPanicked = false;
    deadLargeEnemies.forEach(fallenBoss => {
      game.dungeon.enemies.forEach(other => {
        if (other.isBoss || other.isMegaBoss || (other.size || 1) !== 1) return;
        if (other.hp !== undefined && other.hp <= 0) return;
        const perceptionRange = Math.max(ENEMY_ALLY_DETECTION_RADIUS, other.visionRange || MINION_VISION_RANGE);
        const distToFallen = CombatSystem.getMinDistBetweenEnemies(other, fallenBoss);
        const witnessedDeath = distToFallen <= perceptionRange
          && CombatSystem.canEnemySeeEnemy(game.dungeon, other, fallenBoss);
        if (!witnessedDeath) return;

        // Si tiene otro aliado activo dentro de su radio de 3 casillas, el pánico se cancela o no se activa
        if (CombatSystem.hasNearbyAlly(game.dungeon, other, ENEMY_ALLY_DETECTION_RADIUS)) {
          other.fearCooldown = 0;
          return;
        }
        if (CombatSystem.startEnemyFear(other)) anyPanicked = true;
      });
    });
    if (anyPanicked) {
      game.log(TEXT.logs.panic);
    }
  }

  static executeAttack(game) {
    if ((game.renderer?.getAnimationRemaining() ?? 0) > 0) return;
    const { player, dungeon } = game;
    if (game.easterEgg?.active || game.renderer?.pendingBossPresentation || game.tutorial?.allowsStep(2) === false || game.isVictory || !player || player.hp <= 0 || game.isPausedForDialog || game.isShopOpen() || game.isIntroActive() || game.tutorial?.isHelpModalOpen() || game.renderer?.isPortraitBlocked) {
      if (player && player.hp <= 0) game.log(TEXT.logs.deadPlayer);
      return;
    }
    // Asegurar que la orientación del personaje sea siempre una de las 4 direcciones cardinales (0..3)
    player.direction = ((player.direction % 4) + 4) % 4;

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
      if (!game.tutorial?.isActive) player[weapon.ammoProperty]--;
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
        if (shot.hitWall) game.renderer?.showVisualEffect("wall", shot.impact.x, shot.impact.y, 350, 0, 0, 180);
        game.log(shot.hitWall ? TEXT.logs.wallImpact(weapon.name) : TEXT.logs.shotWhiff(weapon.name));
      }
    }

    const hasBlessingForThisShot = !weapon.isMelee && (player.blessedAmmoCharges || 0) > 0;
    if (hasBlessingForThisShot) {
      player.blessedAmmoCharges = Math.max(0, player.blessedAmmoCharges - 1);
    }

    if (game.tutorial?.isActive) {
      for (const target of targets) {
        const damage = CombatSystem.applyDamageToEnemy(game, target, 5, false);
        game.renderer.showFloatingNumber(target.x, target.y, `-${damage} HP`, "damage");
        game.renderer.playEnemyAnim(target, "hurt");
      }
      if (targets.length) game.tutorial.onPlayerAction(weapon.id === "pistol" ? "pistol_hit" : "attack");
      game.updateHUD();
      game.renderer.draw();
      return;
    }

    let playerFumbled = false;
    for (const target of targets) {
      if (CombatSystem.rollAttack(game, target, weapon, hasBlessingForThisShot)) {
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
  { id: 1, panorama: true, crop: {x:0,y:0,w:903,h:407}, duration: 4400, text: "La Dama del Dolor esperaba a Lior en el umbral del abismo." },
  { id: 2, crop: {x:905,y:0,w:407,h:407}, duration: 4200, text: "DAMA DEL DOLOR: «Desciende al calabozo y recupera lo que guardan en sus profundidades»." },
  { id: 3, crop: {x:336,y:410,w:497,h:266}, duration: 4200, text: "Lior aceptó el encargo. Su patrona se guardó un pequeño detalle." },
  { id: 4, crop: {x:270,y:912,w:679,h:287}, duration: 4400, text: "La puerta se abrió. Lior dio el primer paso hacia el fondo." }
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
      const equipped = renderer.getEquippedEnemyAtlas(enemy);
      if (equipped) renderer.loadTerrainTexture(equipped);
      const attackMotion = renderer.getEnemyAttackMotion(enemy);
      if (attackMotion) renderer.loadTerrainTexture(attackMotion);
      const walkMotion = renderer.getEnemyWalkMotion(enemy);
      if (walkMotion) renderer.loadTerrainTexture(walkMotion);
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
    panorama: true,
    crop: { x: 0, y: 772, w: 1312, h: 427 },
    duration: 5200,
    text: "La luz del crepúsculo baña el horizonte. La misión ha concluido con un absurdo triunfo."
  }
];

function drawCinematicArt(ctx, image, width, height, progress, alpha) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * (1 + 0.025 * progress);
  const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
  const shade = ctx.createLinearGradient(0, height * 0.45, 0, height);
  shade.addColorStop(0, "rgba(5, 5, 12, 0)");
  shade.addColorStop(1, "rgba(5, 5, 12, .85)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

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

    const endingCandidates = ["Assets/Cinematic/Ruinas góticas y diálogo de Lior.png"];
    let candidateIdx = 0;
    this.cinematicArt = new Image();
    this.cinematicArt.src = "Assets/Cinematic/outro.jpg";
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
    if (panel.panorama && this.cinematicArt.complete && this.cinematicArt.naturalWidth > 0) {
      drawCinematicArt(targetCtx, this.cinematicArt, this.canvas.width, this.canvas.height, progress, alpha);
      return;
    }
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

    this.cinematicArt = new Image();
    this.cinematicArt.src = "Assets/Cinematic/intro.jpg";
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
    this.sheetImage.src = "Assets/Cinematic/Descenso de Lior al Abismo.png";

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
    const panel = NARRATIVE_PANELS[index];

    if (this.textEl && !this.isWaitingForCritical) {
      this.textEl.textContent = panel.text;
    }
    this.updateProgressDots();
    sounds.playMusic("intro");
  }

  showFinalConfirmation() {
    this.isWaitingForConfirmation = true;
    this.confirmationReadyAt = performance.now();
    this.updateProgressDots();
    if (this.textEl) {
      this.textEl.innerHTML = `<strong>«El descenso comienza. Cuando estés listo, continúa.»</strong>`;
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
    if (panel.panorama && this.cinematicArt.complete && this.cinematicArt.naturalWidth > 0) {
      drawCinematicArt(targetCtx, this.cinematicArt, this.canvas.width, this.canvas.height, progress, alpha);
      return;
    }
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
/**
 * MANUALES UNIFICADOS Y TUTORIAL POR MODALIDAD DE DISPOSITIVO (Secciones 2 y 3):
 * - "touch":    Teléfono móvil / Pantalla táctil
 * - "keyboard": Computadora con teclado y ratón
 * - "gamepad":  Computadora con mando de Xbox (prioritario si hay mando conectado/activo)
 * Ambos tutoriales (el inicial de partida nueva y el accesible desde el menú) comparten
 * exactamente la misma fuente de datos (CONTROL_MANUALS) y documentan únicamente controles reales.
 */
const CONTROL_MANUALS = {
  touch: {
    deviceTitle: "📱 CONTROLES TÁCTILES (TELÉFONO MÓVIL)",
    buttonLabel: "🎓 Tutorial: Pantalla Táctil",
    steps: [
      {
        title: "1. Moverse y Mirar (Lado Izquierdo — Deslizar)",
        shortTitle: "Paso 1: Moverse (Deslizar en Lado Izquierdo)",
        desc: "Desliza el dedo hacia cualquier dirección en la mitad izquierda de la pantalla para mover a Lior en las 8 direcciones (N, S, E, O y diagonales).",
        progress: "Objetivo: Desliza en el lado izquierdo para mover a Lior."
      },
      {
        title: "2. Ataque Básico (Lado Derecho — Un Toque)",
        shortTitle: "Paso 2: Ataque Básico (Toque en Lado Derecho)",
        desc: "Toca una vez (tap) la mitad derecha de la pantalla para atacar o disparar inmediatamente con el arma equipada hacia donde mira Lior.",
        progress: "Objetivo: Toca una vez en el lado derecho para atacar."
      },
      {
        title: "3. Eldritch Blast (Lado Derecho — Mantener y Soltar)",
        shortTitle: "Paso 3: Eldritch Blast (Mantener en Lado Derecho)",
        desc: "Mantén presionado el lado derecho para desplegar el haz guía violeta, apunta y suelta para disparar. Lleva el marcador sobre Lior para cancelar.",
        progress: "Objetivo: Mantén presionado el lado derecho, apunta y suelta."
      },
      {
        title: "4. Misty Step / Bruma (Lado Izquierdo — Mantener y Soltar)",
        shortTitle: "Paso 4: Misty Step (Mantener en Lado Izquierdo)",
        desc: "Mantén presionado el lado izquierdo para apuntar en las 8 direcciones hasta a 8 casillas y suelta para teletransportarte. Coloca el marcador sobre Lior para cancelar.",
        progress: "Objetivo: Mantén presionado el lado izquierdo, apunta y suelta."
      },
      {
        title: "5. Cambiar Arma (Ambas Zonas a la Vez)",
        shortTitle: "Paso 5: Cambio de Arma (Ambas Zonas a la Vez)",
        desc: "Presiona la mitad izquierda y la mitad derecha de la pantalla al mismo tiempo para alternar entre tu Espada y tus armas de fuego con munición.",
        progress: "Objetivo: Presiona ambas zonas de la pantalla al mismo tiempo."
      },
      {
        title: "6. Interacción, Tienda y Menú",
        shortTitle: "Interacción y Menú",
        desc: "Camina sobre cofres, monedas, pociones o la puerta de salida para interactuar; acércate al Mercader para abrir la tienda y toca el botón ☰ MENÚ para pausar o consultar el manual de controles.",
        progress: ""
      }
    ]
  },
  keyboard: {
    deviceTitle: "⌨️ CONTROLES DE COMPUTADORA (TECLADO)",
    buttonLabel: "🎓 Tutorial: Teclado",
    steps: [
      {
        title: "1. Movimiento Cardinal y Diagonal (WASD / Flechas / QEZC)",
        shortTitle: "Paso 1: Movimiento (WASD / Flechas / QEZC)",
        desc: "Usa W, A, S, D o las Flechas (↑ ← ↓ →) para moverte y orientar a Lior en las 4 direcciones cardinales, y Q, E, Z, C para pasos diagonales.",
        progress: "Objetivo: Pulsa WASD, Flechas o QEZC para mover a Lior (o Enter para continuar)."
      },
      {
        title: "2. Ataque Básico y Apuntado Automático (K / Espacio / Enter)",
        shortTitle: "Paso 2: Ataque Básico (K / Espacio / Enter)",
        desc: "Pulsa K, Espacio o Enter para atacar con la Espada o disparar tu arma de fuego hacia la dirección cardinal a la que mira Lior.",
        progress: "Objetivo: Pulsa K, Espacio o Enter para atacar."
      },
      {
        title: "3. Habilidad Arcana: Eldritch Blast (Tecla J)",
        shortTitle: "Paso 3: Eldritch Blast (Tecla J)",
        desc: "Cuando el indicador EB esté cargado (10/10), pulsa J para liberar un rayo arcano en línea recta hacia donde mira Lior.",
        progress: "Objetivo: Pulsa J para lanzar Eldritch Blast."
      },
      {
        title: "4. Habilidad Arcana: Misty Step / Bruma (Tecla L)",
        shortTitle: "Paso 4: Misty Step (Tecla L)",
        desc: "Pulsa L para teletransportarte a través de enemigos o peligros en la dirección cardinal actual de Lior (hasta 8 casillas).",
        progress: "Objetivo: Pulsa L para ejecutar Misty Step."
      },
      {
        title: "5. Cambiar Arma Equipada (Tecla I)",
        shortTitle: "Paso 5: Cambiar Arma (Tecla I)",
        desc: "Pulsa I para alternar entre las armas desbloqueadas que tengan munición disponible (Espada, Pistola, Mosquete y Trabuco).",
        progress: "Objetivo: Pulsa I para cambiar de arma."
      },
      {
        title: "6. Menús, Tienda y Pantalla Completa (M / F / B / Esc)",
        shortTitle: "Menús, Tienda y Pantalla Completa",
        desc: "Pulsa M para abrir o cerrar el Menú del Juego; en los menús y en la tienda usa WASD o Flechas para elegir opción (incluido CERRAR TIENDA) y Enter para confirmar. F alterna pantalla completa, Esc sale de pantalla completa y B silencia la música.",
        progress: ""
      }
    ]
  },
  gamepad: {
    deviceTitle: "🎮 CONTROLES DE MANDO DE XBOX",
    buttonLabel: "🎓 Tutorial: Mando Xbox",
    steps: [
      {
        title: "1. Movimiento y Orientación (D-Pad / Stick Izquierdo)",
        shortTitle: "Paso 1: Movimiento (D-Pad / Stick Izquierdo)",
        desc: "Usa la Cruceta (D-Pad) o el Stick Izquierdo (LS) para mover y orientar a Lior en las 4 direcciones cardinales o en diagonal (inclinando el stick en diagonal).",
        progress: "Objetivo: Mueve el D-Pad o el Stick Izquierdo (o pulsa A para continuar)."
      },
      {
        title: "2. Ataque Básico y Confirmar (Botón A)",
        shortTitle: "Paso 2: Ataque Básico (Botón A)",
        desc: "Pulsa el botón A para atacar con tu arma equipada hacia donde mira Lior, y para confirmar o comprar opciones dentro de cualquier menú o tienda.",
        progress: "Objetivo: Pulsa el botón A para atacar."
      },
      {
        title: "3. Habilidad Arcana: Eldritch Blast (Botón X)",
        shortTitle: "Paso 3: Eldritch Blast (Botón X)",
        desc: "Cuando el indicador EB esté cargado (10/10), pulsa el botón X para disparar un rayo arcano en la dirección cardinal en la que mira Lior.",
        progress: "Objetivo: Pulsa el botón X para lanzar Eldritch Blast."
      },
      {
        title: "4. Misty Step / Bruma y Cancelar (Botón B)",
        shortTitle: "Paso 4: Misty Step (Botón B)",
        desc: "En combate, pulsa el botón B para teletransportarte con Misty Step hacia adelante. Dentro de menús, tienda o diálogos, el botón B sirve para cancelar o retroceder.",
        progress: "Objetivo: Pulsa el botón B para ejecutar Misty Step."
      },
      {
        title: "5. Cambiar Arma Equipada (Botón Y / LB / RB)",
        shortTitle: "Paso 5: Cambiar Arma (Botón Y / LB / RB)",
        desc: "Pulsa el botón Y (o los botones superiores LB / RB) para alternar entre tu Espada y tus armas de fuego con munición disponible.",
        progress: "Objetivo: Pulsa Y, LB o RB para cambiar de arma."
      },
      {
        title: "6. Menú del Juego y Tienda (☰ Menu / A / B)",
        shortTitle: "Menús y Tienda",
        desc: "Pulsa ☰ Menu (Start) para abrir el Menú de Pausa. En la tienda usa D-Pad/Stick para desplazarte hasta cualquier objeto o hasta CERRAR TIENDA, LB/RB para cambiar de pestaña, A para confirmar y B para salir.",
        progress: ""
      }
    ]
  }
};

// Estas banderas se reinician al recargar la página, no al reintentar una partida.
const LIOR_PAGE_FLOW = { introSeen: false, tutorialSeen: false };

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
    this.manualGridEl = document.getElementById("tutorial-manual-grid");

    this.isActive = false;
    this.step = 1;
    this.practiceTarget = null;
    this.tempGrantedWeapon = null;
    this.renderedDevice = null;

    this.bindEvents();
    this.renderDeviceManual();
    document.getElementById("btn-tutorial-practice").addEventListener("click", () => this.closeInstruction());
  }

  allowsStep(step) {
    return !this.isActive || (this.step >= step && !this.isInstructionOpen());
  }

  isInstructionOpen() {
    return this.isActive && !this.overlay.classList.contains("hidden");
  }

  closeInstruction() {
    this.overlay.classList.add("hidden");
    document.activeElement?.blur();
  }

  static isCompletedInStorage() {
    try {
      return LIOR_PAGE_FLOW.tutorialSeen;
    } catch {
      return false;
    }
  }

  static markCompletedInStorage() {
    try {
      LIOR_PAGE_FLOW.tutorialSeen = true;
    } catch {}
  }

  getActiveManualKey() {
    const dev = this.game?.getEffectiveTutorialDevice?.() || this.game?.controlDevice || "keyboard";
    if (dev === "gamepad") return "gamepad";
    if (dev === "touch") return "touch";
    return "keyboard";
  }

  getActiveManual() {
    return CONTROL_MANUALS[this.getActiveManualKey()] || CONTROL_MANUALS.keyboard;
  }

  /**
   * Renderiza en el contenedor del menú (#tutorial-manual-grid) ÚNICAMENTE el manual correspondiente
   * al dispositivo activo (Teléfono táctil, Teclado o Mando de Xbox), nunca los tres a la vez.
   */
  renderDeviceManual() {
    const manualKey = this.getActiveManualKey();
    const manual = CONTROL_MANUALS[manualKey] || CONTROL_MANUALS.keyboard;
    this.renderedDevice = manualKey;

    const restartBtn = document.getElementById("btn-tutorial-restart");
    if (restartBtn) {
      restartBtn.classList.toggle("hidden", this.game.devMode);
      restartBtn.textContent = manual.buttonLabel;
    }

    if (this.manualGridEl) {
      this.manualGridEl.setAttribute("data-manual-device", manualKey);
      this.manualGridEl.innerHTML = manual.steps.map(item => `
        <div class="tutorial-help-item">
          <strong>${item.title}</strong>
          <p>${item.desc}</p>
        </div>
      `).join("");
    }

    if (this.isActive) {
      this.refreshCurrentStepUI();
    }
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
    const allMenuBtns = this.helpModal?.querySelectorAll(".game-menu-quick-actions .tutorial-btn") || [];
    allMenuBtns.forEach((btn, idx) => {
      btn.addEventListener("pointerenter", () => {
        this.menuSelection = idx;
        this.updateHelpMenuSelection(false);
      });
      btn.addEventListener("focus", () => {
        this.menuSelection = idx;
        this.updateHelpMenuSelection(false);
      });
    });
  }

  getHelpMenuButtons() {
    if (!this.helpModal) return [];
    return [...this.helpModal.querySelectorAll(".game-menu-quick-actions .tutorial-btn:not(.hidden)")];
  }

  updateHelpMenuSelection(focusElement = true) {
    const buttons = this.getHelpMenuButtons();
    if (buttons.length === 0) return;
    this.menuSelection = (((this.menuSelection ?? 0) % buttons.length) + buttons.length) % buttons.length;
    buttons.forEach((btn, idx) => {
      const selected = idx === this.menuSelection;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-selected", String(selected));
      if (selected && focusElement) {
        try { btn.focus({ preventScroll: true }); } catch {}
      }
    });
  }

  moveHelpMenuSelection(delta) {
    const achievements = document.getElementById("menu-achievements");
    if (document.activeElement === achievements && !achievements.classList.contains("hidden")) {
      achievements.scrollBy({ top: delta * 120 });
      return;
    }
    const buttons = this.getHelpMenuButtons();
    if (buttons.length === 0) return;
    this.menuSelection = (((this.menuSelection ?? 0) + delta) % buttons.length + buttons.length) % buttons.length;
    this.updateHelpMenuSelection(true);
  }

  activateSelectedHelpMenuButton() {
    const buttons = this.getHelpMenuButtons();
    const target = buttons[this.menuSelection ?? 0] || buttons[0];
    if (target) target.click();
  }

  openHelpModal() {
    if (!this.helpModal) return;
    this.game.touchController?.cancelAllGestures();
    this.game.updateMenuSaveStatus?.();
    this.renderDeviceManual();
    this.game.updateButtonLabels?.();
    this.menuSelection = 0;
    document.getElementById("menu-achievements").classList.add("hidden");
    document.getElementById("tutorial-manual-grid").classList.remove("hidden");
    this.game.achievements?.observe(false);
    this.game.achievements?.updateButton();
    this.helpModal.classList.remove("hidden");
    this.updateHelpMenuSelection(true);
  }

  closeHelpModal() {
    if (!this.helpModal) return;
    const wasOpen = !this.helpModal.classList.contains("hidden");
    this.helpModal.classList.add("hidden");
    if (wasOpen) {
      this.game.shopClosingCooldown = performance.now() + 220;
      this.game.restoreGameplayFocus?.();
    }
  }

  isHelpModalOpen() {
    return !!(this.helpModal && !this.helpModal.classList.contains("hidden"));
  }

  /**
   * Al iniciar una partida nueva (Piso 1), presenta automáticamente el tutorial correspondiente
   * al dispositivo detectado (Móvil táctil, Computadora con teclado o Computadora con mando Xbox).
   */
  startIfEligible(forceOnNewGame = false) {
    if (this.game.devMode || this.game.floor !== 1 || this.game.inMerchantFloor) return;
    if (TutorialController.isCompletedInStorage()) return;
    this.start(true);
  }

  start(force = false) {
    if (this.isActive || this.game.devMode || this.game.inMerchantFloor) return;
    if (!force && TutorialController.isCompletedInStorage()) return;
    LIOR_PAGE_FLOW.tutorialSeen = true; // Se mostró; tampoco reaparece si Lior muere durante el tutorial.
    this.isActive = true;
    const game = this.game;
    this.campaign = { floor: game.floor, player: game.player, dungeon: game.dungeon, generator: game.generator, stats: game.stats };
    game.floor = 0;
    game.dungeon = new Dungeon(9, 9);
    for (let i = 0; i < 9; i++) {
      game.dungeon.setTile(i, 0, TILE_WALL);
      game.dungeon.setTile(i, 8, TILE_WALL);
      game.dungeon.setTile(0, i, TILE_WALL);
      game.dungeon.setTile(8, i, TILE_WALL);
    }
    game.player = new Player(4, 6);
    game.stats = new RunStats();
    game.renderer.player = game.player;
    game.renderer.setDungeon(game.dungeon, game.generator);
    game.updateHUD();
    const fb = document.getElementById("floor-banner");
    if (fb) fb.classList.add("hidden");
    this.step = 1;
    this.cleanupTempWeapon();
    this.renderDeviceManual();
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

  getGestureSVG(step, manualKey = this.getActiveManualKey()) {
    if (manualKey === "gamepad") {
      const labels = ["D-PAD / LS", "BOTÓN A", "BOTÓN X", "BOTÓN B", "Y / LB / RB"];
      const colors = ["#38bdf8", "#34d399", "#60a5fa", "#f87171", "#fbbf24"];
      const idx = Math.max(0, Math.min(4, step - 1));
      return `<svg viewBox="0 0 90 46"><rect x="4" y="4" width="82" height="38" rx="6" fill="rgba(15,23,42,0.85)" stroke="${colors[idx]}" stroke-width="1.8"/><text x="45" y="19" fill="#94a3b8" font-size="6.2" text-anchor="middle">MANDO XBOX</text><text x="45" y="33" fill="${colors[idx]}" font-size="8.5" font-weight="bold" text-anchor="middle">${labels[idx]}</text></svg>`;
    }
    if (manualKey === "keyboard") {
      const labels = ["WASD / ↑↓←→", "K / ESPACIO", "TECLA J", "TECLA L", "TECLA I"];
      const colors = ["#ffd970", "#f87171", "#c084fc", "#38bdf8", "#7cf59a"];
      const idx = Math.max(0, Math.min(4, step - 1));
      return `<svg viewBox="0 0 90 46"><rect x="4" y="4" width="82" height="38" rx="4" fill="rgba(15,23,42,0.85)" stroke="${colors[idx]}" stroke-width="1.8"/><text x="45" y="19" fill="#94a3b8" font-size="6.2" text-anchor="middle">TECLADO PC</text><text x="45" y="33" fill="${colors[idx]}" font-size="8.2" font-weight="bold" text-anchor="middle">${labels[idx]}</text></svg>`;
    }
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
    const isTouch = this.getActiveManualKey() === "touch";
    if (this.leftZone) this.leftZone.classList.toggle("hidden", !(isTouch && leftVisible));
    if (this.rightZone) this.rightZone.classList.toggle("hidden", !(isTouch && rightVisible));
  }

  refreshCurrentStepUI() {
    if (!this.isActive) return;
    const manualKey = this.getActiveManualKey();
    const manual = CONTROL_MANUALS[manualKey] || CONTROL_MANUALS.keyboard;
    const stepData = manual.steps[this.step - 1];
    if (!stepData) return;

    if (this.diagramEl) this.diagramEl.innerHTML = this.getGestureSVG(this.step, manualKey);
    const modeLabel = manualKey === "gamepad" ? "MANDO XBOX" : (manualKey === "touch" ? "TÁCTIL" : "TECLADO");
    if (this.badgeEl) this.badgeEl.textContent = `PISO 0 · ${modeLabel} · PASO ${this.step}/5`;
    if (this.titleEl) this.titleEl.textContent = stepData.shortTitle;
    if (this.descEl) this.descEl.textContent = stepData.desc;
    if (this.progressEl) this.progressEl.textContent = [
      "Cambia de casilla para avanzar.",
      "Golpea al blanco situado junto a Lior.",
      "Apunta al blanco y acierta con el hechizo.",
      "Elige una casilla libre y teletranspórtate.",
      "Equipa la pistola y acierta un disparo al blanco."
    ][this.step - 1];

    if (this.step === 1) this.setZoneHighlights(true, false);
    else if (this.step === 2 || this.step === 3) this.setZoneHighlights(false, true);
    else if (this.step === 4) this.setZoneHighlights(true, false);
    else if (this.step === 5) this.setZoneHighlights(true, true);
  }

  setupStep(stepNumber) {
    this.step = stepNumber;
    this.cleanupTempWeapon();

    if (stepNumber < 1 || stepNumber > 5) {
      this.completeTutorial();
      return;
    }

    const { game } = this;
    const player = game.player;
    const dummyDistance = { 2: 1, 3: 2, 5: 2 }[stepNumber];
    game.dungeon.enemies = [];
    if (dummyDistance) {
      player.x = 4;
      player.y = 6;
      player.moveInterp = null;
      player.direction = 0;
      game.renderer.commitCameraFacing();
      const dummy = createMinion(1, 4, 6 - dummyDistance);
      dummy.name = "Blanco de práctica";
      dummy.hp = dummy.maxHp = 9999;
      game.dungeon.enemies.push(dummy);
    }
    if (stepNumber === 5) {
      player.unlockedWeapons.add(WEAPONS.PISTOL.id);
      player.ammoPistol = 6;
    }
    this.overlay.classList.remove("hidden");
    document.getElementById("btn-tutorial-practice").focus();
    game.updateHUD();

    this.refreshCurrentStepUI();
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

  advanceStepOrComplete() {
    if (!this.isActive) return;
    if (this.step < 5) {
      this.setupStep(this.step + 1);
    } else {
      this.completeTutorial();
    }
  }

  onPlayerAction(actionType) {
    if (!this.isActive || this.nextStepTimer) return;
    const expected = ["move", "attack", "eldritch_blast", "misty_step", "pistol_hit"];
    if (actionType !== expected[this.step - 1]) return;
    const remaining = this.game.renderer.getAnimationRemaining() || 0;
    this.nextStepTimer = setTimeout(() => {
      this.nextStepTimer = null;
      this.advanceStepOrComplete();
    }, Math.max(650, remaining + 200));
  }

  leavePractice() {
    if (!this.campaign) return;
    clearTimeout(this.nextStepTimer);
    this.nextStepTimer = null;
    const game = this.game;
    Object.assign(game, this.campaign);
    this.campaign = null;
    game.renderer.player = game.player;
    game.renderer.setDungeon(game.dungeon, game.generator);
    game.updateButtonLabels();
    game.updateHUD();
    game.saveFloorCheckpoint();
    game.showFloorBanner(game.floor);
  }

  skipTutorial() {
    this.cleanupTempWeapon();
    this.isActive = false;
    this.leavePractice();
    this.practiceTarget = null;
    this.setZoneHighlights(false, false);
    if (this.overlay) this.overlay.classList.add("hidden");
    TutorialController.markCompletedInStorage();
    this.game.log("Tutorial cerrado. Puedes consultarlo en ☰ MENÚ cuando quieras.");
    this.game.renderer?.draw();
  }

  completeTutorial() {
    this.cleanupTempWeapon();
    this.isActive = false;
    this.leavePractice();
    this.practiceTarget = null;
    this.setZoneHighlights(false, false);
    if (this.overlay) this.overlay.classList.add("hidden");
    TutorialController.markCompletedInStorage();
    sounds.playCoin();
    this.game.achievements?.recordEvent("tutorial");
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
    if (this.game.tutorial?.isInstructionOpen() || this.game.isIntroActive() || (this.game.endingCinematic && this.game.endingCinematic.isActive) || this.game.isShopOpen() || this.game.isPausedForDialog || this.game.tutorial?.isHelpModalOpen() || this.game.isResumeModalOpen?.()) return;
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
        this.game.castEldritchBlast(true);
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
          this.game.castMistyStep(targetSteps, dirVec, true);
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

function setPlayerStep(player, fromX, fromY, now) {
  const previous = player.moveInterp;
  if (previous && now < previous.until) {
    const remaining = 1 - Math.max(0, (now - previous.startedAt) / previous.duration);
    fromX += (previous.fromX - fromX) * remaining ** 2;
    fromY += (previous.fromY - fromY) * remaining ** 2;
  }
  const duration = PLAYER_STEP_MS;
  player.moveInterp = { fromX, fromY, startedAt: now, duration, until: now + duration };
}

