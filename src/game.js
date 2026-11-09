class GameController {
  constructor(options = {}) {
    window.gameController = this;
    const query = new URLSearchParams(location.search);
    this.devMode = location.hostname === "127.0.0.1" && ["8417", "8418"].includes(location.port) && query.has("dev");
    const devValue = (key, fallback, min, max) => {
      const value = query.get(key);
      return value !== null && /^\d+$/.test(value) ? Math.min(max, Math.max(min, Number(value))) : fallback;
    };
    this.devFloor = this.devMode ? devValue("floor", 100, 1, 100) : 1;
    this.devGold = devValue("gold", 100, 0, 999999);
    this.devAmmo = devValue("ammo", 30, 0, 999);
    this.devUpgrades = Object.fromEntries(["sword", "pistol", "musket", "blunderbuss"].map(id => [id, devValue(id, 0, 0, 3)]));
    this.floor = this.devFloor;
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
    this.pendingNarrativeIntro = !this.devMode && !existingSave && !!options.playNarrativeIntro;
    this.preloader = new ResourcePreloader(this);
    this.narrativeIntro = new NarrativeIntroController(this);
    this.endingCinematic = new EndingCinematicController(this);
    this.tutorial = new TutorialController(this);
    this.stats = new RunStats();
    this.isAutoWalking = false;

    if (existingSave) {
      this.loadSavedGame(existingSave, { silent: true });
      this.hasPendingResumePrompt = true;
    } else {
      this.initDungeonFloor(false);
    }
    this.touchController = new TouchGestureController(this, document.getElementById("game-container"));
    this.bindEvents();
    this.initShopEvents();
    this.initSaveResumeEvents();
    this.initDeviceDetection();
    this.initOrientationNotice();
    this.achievements = new AchievementController(this);
    this.easterEgg = new PourcoonEasterEgg(this);
    this.development = new LocalDevelopmentBridge(this);
    this.startGamepadLoop();
    window.__lior = this;

    if (existingSave) {
      this.preloader.start();
      this.openResumeModal(existingSave, "boot");
    } else if (this.pendingNarrativeIntro) {
      this.startNewGameIntro();
    } else {
      this.preloader.start();
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.tutorial.startIfEligible();
    }
  }

  get tier() {
    return getTierForFloor(this.floor);
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
    if (this.descentTransitionActive || this.isIntroActive() || this.inMerchantFloor || !this.dungeon) return;
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
      || this.easterEgg?.active
      || this.descentTransitionActive
      || !!this.renderer?.pendingBossPresentation
      || (this.renderer?.getAnimationRemaining() ?? 0) > 0
      || this.isAutoWalking
      || this.isPausedForDialog
      || this.isShopOpen()
      || this.isResumeModalOpen()
      || this.isIntroActive()
      || (this.endingCinematic && this.endingCinematic.isActive)
      || this.tutorial?.isHelpModalOpen()
      || this.tutorial?.isInstructionOpen()
      || this.renderer?.isPortraitBlocked
      || performance.now() < this.shopClosingCooldown
      || !this.player
      || this.player.hp <= 0
    );
  }

  /**
   * Guarda automáticamente el punto de control del piso en localStorage al entrar a cada piso
   * (situando siempre a Lior en la entrada del piso actual mirando al Norte) y permite actualizar
   * el inventario/compras realizadas en la tienda para el próximo piso.
   */
  buildPlayerSavePayload(overrideX = null, overrideY = null, overrideFloor = this.floor) {
    const targetFloor = Math.max(1, Math.min(100, Math.floor(Number(overrideFloor) || this.floor || 1)));
    const targetMaxHp = calculateLiorMaxHP(targetFloor);
    const savedHp = Math.max(1, Math.min(targetMaxHp, Math.floor(this.player.hp)));

    return {
      x: Number.isInteger(overrideX) ? overrideX : (this.dungeon?.entrance?.x ?? this.player.x),
      y: Number.isInteger(overrideY) ? overrideY : (this.dungeon?.entrance?.y ?? this.player.y),
      direction: 0,
      maxHp: targetMaxHp,
      hp: savedHp,
      ac: calculateLiorAC(targetFloor),
      maxExtraHp: calculateMaxExtraHP(targetMaxHp),
      extraHp: Math.min(calculateMaxExtraHP(targetMaxHp), this.player.extraHp || 0),
      maxShieldSegments: MAX_SHIELD_SEGMENTS,
      shieldSegments: Math.max(0, Math.min(MAX_SHIELD_SEGMENTS, Math.floor(this.player.shieldSegments || 0))),
      stunned: false,
      gold: Math.max(0, Math.floor(this.player.gold || 0)),
      kills: Math.max(0, Math.floor(this.player.kills || 0)),
      minionKillsSincePotion: Math.max(0, Math.floor(this.player.minionKillsSincePotion || 0)),
      ammoPistol: Math.max(0, Math.floor(this.player.ammoPistol || 0)),
      ammoMusket: Math.max(0, Math.floor(this.player.ammoMusket || 0)),
      ammoBlunderbuss: Math.max(0, Math.floor(this.player.ammoBlunderbuss || 0)),
      unlockedWeapons: [...this.player.unlockedWeapons],
      equippedWeaponId: this.player.equippedWeapon?.id || WEAPONS.SWORD.id,
      weaponUpgrades: { ...this.player.weaponUpgrades },
      hasShortcutMap: this.player.hasShortcutMap === true,
      highestMegaBossTierDefeated: Math.max(0, Math.floor(this.player.highestMegaBossTierDefeated || 0)),
      mistyStepMaxCharges: this.player.mistyStepMaxCharges || 2,
      mistyStepCharges: this.player.mistyStepCharges,
      mistyStepRechargeMax: this.player.mistyStepRechargeMax || 20,
      mistyStepActionCounter: this.player.mistyStepActionCounter,
      blastMaxCharges: this.player.blastMaxCharges || 10,
      blastCurrentCharges: Math.max(0, Math.min(this.player.blastMaxCharges || 10, Math.floor(this.player.blastCurrentCharges ?? 10))),
      blessedAmmoCharges: Math.max(0, Math.floor(this.player.blessedAmmoCharges || 0)),
      antimagicCritLock: false,
      hasRetrievedQuestItem: !!this.player.hasRetrievedQuestItem,
      actionTurnCount: 0
    };
  }

  saveFloorCheckpoint() {
    if (this.devMode || this.tutorial?.isActive) return;
    if (this.isVictory || this.isGameOverTriggered) return false;
    if (!this.player || this.player.hp <= 0 || !this.dungeon) return false;

    if (this.inMerchantFloor || this.dungeon?.isMerchantRoom) {
      return this.savePlayerProgressCheckpoint();
    }

    const startX = Number.isInteger(this.dungeon.entrance?.x) ? this.dungeon.entrance.x : this.player.x;
    const startY = Number.isInteger(this.dungeon.entrance?.y) ? this.dungeon.entrance.y : this.player.y;

    const payload = {
      version: 1,
      savedAt: Date.now(),
      floor: this.floor,
      inMerchantFloor: false,
      player: this.buildPlayerSavePayload(startX, startY, this.floor),
      stats: {
        ...(this.stats || new RunStats()),
        killsByName: { ...(this.stats?.killsByName || {}) }
      },
      dungeon: {
        width: this.dungeon.width,
        height: this.dungeon.height,
        isMerchantRoom: false,
        isBossRoom: !!this.dungeon.isBossRoom,
        turnCount: 0,
        entrance: { ...this.dungeon.entrance },
        exit: { ...this.dungeon.exit },
        tiles: [...this.dungeon.tiles.entries()],
        revealed: [...this.dungeon.revealed],
        chests: [...this.dungeon.chests],
        npcs: (this.dungeon.npcs || []).map(n => ({
          ...n,
          isFleeing: false,
          fleeDirection: n.fleeDirection ? { ...n.fleeDirection } : { dx: 1, dy: 0 }
        })),
        pickups: (this.dungeon.pickups || []).map(p => ({ ...p })),
        enemies: (this.dungeon.enemies || []).map(e => {
          const sx = Number.isInteger(e.startX) ? e.startX : e.x;
          const sy = Number.isInteger(e.startY) ? e.startY : e.y;
          const size = Math.max(1, Math.floor(e.size || 1));
          const resetCells = [];
          for (let dy = 0; dy < size; dy++) {
            for (let dx = 0; dx < size; dx++) {
              resetCells.push({ x: sx + dx, y: sy + dy });
            }
          }
          return {
            ...e,
            x: sx,
            y: sy,
            startX: sx,
            startY: sy,
            hp: e.maxHp || e.hp,
            cells: resetCells,
            state: "patrol",
            patrolDir: 1,
            patrolDirY: 1,
            patrolRadius: e.patrolRadius || MINION_PATROL_RADIUS,
            stunned: false,
            fearCooldown: 0,
            attackCooldown: 0,
            lastAttackTurn: null,
            anim: null,
            introPresented: false,
            roarPlayed: false
          };
        })
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

  /**
   * Actualiza en localStorage el progreso del jugador (oro, armas desbloqueadas, mejoras,
   * munición, pociones, pólvora maldita y estadísticas). Si Lior está en la sala del Mercader
   * (tras haber limpiado el piso actual), el guardado apunta directamente al inicio del siguiente
   * piso (floor + 1) para que al recargar conserve todo lo comprado y empiece en el nuevo piso.
   */
  savePlayerProgressCheckpoint(options = {}) {
    if (this.devMode || this.tutorial?.isActive) return;
    if (this.isVictory || this.isGameOverTriggered) return false;
    if (!this.player || this.player.hp <= 0) return false;

    const existing = this.readSavedGame();
    const isMerchant = !!(this.inMerchantFloor || this.dungeon?.isMerchantRoom);
    const normalDestination = Math.min(100, this.floor + 1);
    const pendingShortcut = isMerchant && this.player.hasShortcutMap && shortcutDestination(this.floor) > normalDestination;
    const targetFloor = options.targetFloor ?? (isMerchant
      ? (pendingShortcut ? shortcutDestination(this.floor) : normalDestination)
      : Math.max(1, Math.min(100, this.floor)));

    const keepExistingDungeon = !isMerchant && !options?.forceNewFloorDungeon && existing && existing.floor === targetFloor && existing.dungeon;
    const entranceX = keepExistingDungeon ? existing.dungeon?.entrance?.x : null;
    const entranceY = keepExistingDungeon ? existing.dungeon?.entrance?.y : null;

    const payload = {
      version: 1,
      savedAt: Date.now(),
      floor: targetFloor,
      inMerchantFloor: false,
      player: { ...this.buildPlayerSavePayload(entranceX, entranceY, targetFloor),
        ...(pendingShortcut ? this.getShortcutResources(this.floor) : {}),
        hasShortcutMap: this.player.hasShortcutMap && !pendingShortcut },
      stats: {
        ...(this.stats || new RunStats()),
        goldCollected: (this.stats?.goldCollected || 0) + (pendingShortcut ? shortcutGoldReward(this.floor) : 0),
        killsByName: { ...(this.stats?.killsByName || {}) }
      },
      dungeon: keepExistingDungeon ? existing.dungeon : null
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
    if (this.devMode || this.tutorial?.isActive) return;
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
    if (this.devMode || this.tutorial?.isActive) return;
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

  loadSavedGame(saveData = null, options = {}) {
    const data = saveData || this.readSavedGame();
    if (!data || !data.player || !(Number(data.player.hp) > 0)) return false;

    const silent = !!options?.silent;
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

    let generatedNewDungeonForFloor = false;
    if (
      data.dungeon
      && Number.isInteger(data.dungeon.width)
      && Number.isInteger(data.dungeon.height)
      && Array.isArray(data.dungeon.tiles)
    ) {
      this.dungeon = new Dungeon(data.dungeon.width, data.dungeon.height);
      this.dungeon.isMerchantRoom = false;
      this.dungeon.isBossRoom = !!data.dungeon.isBossRoom;
      this.dungeon.turnCount = 0;
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
      this.dungeon.enemies = (data.dungeon.enemies || []).map(e => {
        if (e.spriteSrc === "Assets/Enemy/4x4/2. tarrasque.jpg") e = { ...e, name: "Caudillo ogro" };
        const sx = Number.isInteger(e.startX) ? e.startX : e.x;
        const sy = Number.isInteger(e.startY) ? e.startY : e.y;
        const restored = {
          ...e,
          x: sx,
          y: sy,
          startX: sx,
          startY: sy,
          hp: e.maxHp || e.hp,
          cells: (e.cells || []).map(c => ({ ...c })),
          state: "patrol",
          patrolDir: 1,
          patrolDirY: 1,
          patrolRadius: e.patrolRadius || MINION_PATROL_RADIUS,
          stunned: false,
          fearCooldown: 0,
          anim: null,
          introPresented: false,
          roarPlayed: false
        };
        CombatSystem.syncEnemyCells(restored);
        restored.attackCooldown = 0;
        restored.lastAttackTurn = null;
        return restored;
      });
      this.generator = {
        dungeon: this.dungeon,
        floorNumber: this.floor,
        tier: this.tier
      };
    } else {
      generatedNewDungeonForFloor = true;
      const { width, height } = getRandomDungeonDimensions(10, 30, this.floor);
      this.dungeon = new Dungeon(width, height);
      this.dungeon.isMerchantRoom = false;
      this.generator = new DungeonGenerator(this.dungeon, this.floor);
    }

    // Al recargar o reanudar desde guardado, Lior siempre aparece al inicio del piso (entrance) mirando al Norte (0)
    const startX = Number.isInteger(this.dungeon.entrance?.x)
      ? this.dungeon.entrance.x
      : (Number.isInteger(data.player.x) ? data.player.x : 1);
    const startY = Number.isInteger(this.dungeon.entrance?.y)
      ? this.dungeon.entrance.y
      : (Number.isInteger(data.player.y) ? data.player.y : 1);
    this.player = new Player(startX, startY);
    this.player.direction = 0;
    this.player.maxHp = calculateLiorMaxHP(this.floor);
    const savedMaxHp = Number(data.player.maxHp) || this.player.maxHp;
    const savedCurrentHp = Number(data.player.hp);
    this.player.hp = Number.isFinite(savedCurrentHp)
      ? Math.max(1, Math.min(this.player.maxHp, Math.round(savedCurrentHp / Math.max(1, savedMaxHp) * this.player.maxHp)))
      : this.player.maxHp;
    this.player.ac = this.playerAC;
    this.player.maxExtraHp = calculateMaxExtraHP(this.player.maxHp);
    this.player.extraHp = Math.max(0, Math.min(this.player.maxExtraHp, Number(data.player.extraHp) || 0));
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

    this.player.hasShortcutMap = data.player.hasShortcutMap === true;
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
    this.player.mistyStepActionCounter = 0;
    this.player.blastMaxCharges = Math.max(1, Math.floor(Number(data.player.blastMaxCharges) || 10));
    this.player.blastCurrentCharges = Math.max(0, Math.min(this.player.blastMaxCharges, Math.floor(Number(data.player.blastCurrentCharges ?? 10))));
    this.player.blessedAmmoCharges = Math.max(0, Math.floor(Number(data.player.blessedAmmoCharges || 0)));
    this.player.antimagicCritLock = false;
    this.player.hasRetrievedQuestItem = !!data.player.hasRetrievedQuestItem;
    this.player.actionTurnCount = 0;
    if (this.dungeon) {
      this.dungeon.lastProcessedPlayerAction = 0;
    }

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

    if (generatedNewDungeonForFloor) {
      this.saveFloorCheckpoint();
    }

    if (!silent) {
      this.closeResumeModal();
      this.updateHUD();
      this.updateButtonLabels();
      this.updateMenuSaveStatus();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
      this.showFloorBanner(this.floor, "Partida reanudada.");
      this.log(`💾 Partida reanudada en el Piso ${this.floor}.`);
      this.renderer.draw();
    } else {
      this.updateHUD();
      this.updateButtonLabels();
      this.updateMenuSaveStatus();
      this.renderer.draw();
    }
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

    this.resumeModalSelection = 0;
    this.updateButtonLabels?.();
    this.resumeModal.classList.remove("hidden");
    this.updateResumeModalSelection(true);
    return true;
  }

  getResumeModalButtons() {
    return [
      document.getElementById("btn-resume-saved-game"),
      document.getElementById("btn-discard-saved-game")
    ].filter(Boolean);
  }

  updateResumeModalSelection(focusElement = true) {
    const buttons = this.getResumeModalButtons();
    if (buttons.length === 0) return;
    this.resumeModalSelection = (((this.resumeModalSelection ?? 0) % buttons.length) + buttons.length) % buttons.length;
    buttons.forEach((btn, idx) => {
      const selected = idx === this.resumeModalSelection;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-selected", String(selected));
      if (selected && focusElement) {
        try { btn.focus({ preventScroll: true }); } catch {}
      }
    });
  }

  moveResumeModalSelection(delta = 1) {
    const buttons = this.getResumeModalButtons();
    if (buttons.length === 0) return;
    this.resumeModalSelection = (((this.resumeModalSelection ?? 0) + delta) % buttons.length + buttons.length) % buttons.length;
    this.updateResumeModalSelection(true);
  }

  activateSelectedResumeModalOption() {
    const buttons = this.getResumeModalButtons();
    const target = buttons[this.resumeModalSelection ?? 0] || buttons[0];
    if (target) target.click();
    else this.resumeFromSavedGame();
  }

  closeResumeModal() {
    if (!this.resumeModal) return;
    const wasOpen = !this.resumeModal.classList.contains("hidden");
    this.resumeModal.classList.add("hidden");
    this.resumeModalMode = null;
    if (wasOpen) {
      this.shopClosingCooldown = performance.now() + 220;
      this.restoreGameplayFocus();
    }
  }

  suspendGame() {
    if (this.isVictory || !this.player || this.player.hp <= 0) return false;
    if (this.inMerchantFloor || this.dungeon?.isMerchantRoom) {
      this.savePlayerProgressCheckpoint();
    } else if (!this.hasSavedGame()) {
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
    const resumed = this.loadSavedGame();
    if (resumed && this.floor === 1 && !LIOR_PAGE_FLOW.introSeen) {
      this.startNewGameIntro();
    }
    return resumed;
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
      resumeBtn.addEventListener("pointerenter", () => {
        this.resumeModalSelection = 0;
        this.updateResumeModalSelection(false);
      });
      resumeBtn.addEventListener("focus", () => {
        this.resumeModalSelection = 0;
        this.updateResumeModalSelection(false);
      });
    }
    if (discardBtn) {
      discardBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startFreshNewGame();
      });
      discardBtn.addEventListener("pointerenter", () => {
        this.resumeModalSelection = 1;
        this.updateResumeModalSelection(false);
      });
      discardBtn.addEventListener("focus", () => {
        this.resumeModalSelection = 1;
        this.updateResumeModalSelection(false);
      });
    }
  }

  startNewGameIntro() {
    this.pendingNarrativeIntro = false;
    if (LIOR_PAGE_FLOW.introSeen) {
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
      this.tutorial?.startIfEligible();
      this.renderer?.draw();
      return;
    }
    LIOR_PAGE_FLOW.introSeen = true;
    if (!this.narrativeIntro) {
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
      this.tutorial?.startIfEligible(true);
      return;
    }
    sounds.playMusic("intro");
    this.narrativeIntro.start(() => {
      this.saveFloorCheckpoint();
      this.syncBiomeMusic();
      this.triggerFloorInitialPresentation();
      this.tutorial?.startIfEligible(true);
      if (!this.tutorial?.isActive) this.showFloorBanner(this.floor, "El descenso.");
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
    if ((dir != null || canceled) && this.tutorial?.allowsStep(3) === false) return;
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
    if (dirOrObj != null && this.tutorial?.allowsStep(4) === false) return;
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

  restoreGameplayFocus() {
    const active = document.activeElement;
    if (active && active !== document.body && active !== this.canvas && typeof active.blur === "function") {
      try { active.blur(); } catch {}
    }
    if (this.canvas) {
      if (!this.canvas.hasAttribute("tabindex")) this.canvas.setAttribute("tabindex", "-1");
      try { this.canvas.focus({ preventScroll: true }); } catch {}
    }
  }

  hasConnectedGamepad() {
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      for (let i = 0; i < pads.length; i++) {
        if (pads[i] && pads[i].connected !== false) return pads[i];
      }
    } catch {}
    return null;
  }

  /**
   * Determina qué modalidad de tutorial corresponde al jugador (Sección 2):
   * - Si el dispositivo activo es táctil ("touch"), devuelve "touch".
   * - En computadora, si el dispositivo activo es "gamepad" (o hay un mando conectado y el jugador
   *   no ha cambiado explícitamente a teclado durante la partida), el mando de Xbox tiene prioridad sobre teclado.
   */
  getEffectiveTutorialDevice() {
    if (this.controlDevice === "touch") return "touch";
    if (this.controlDevice === "gamepad") return "gamepad";
    if (this.hasConnectedGamepad() && !this.userExplicitlyUsedKeyboard) {
      return "gamepad";
    }
    return "keyboard";
  }

  initDeviceDetection() {
    this.userExplicitlyUsedKeyboard = false;
    const initialPad = this.hasConnectedGamepad();
    if (initialPad && this.controlDevice !== "touch") {
      this.gamepadMapping = initialPad.mapping || "standard";
      this.controlDevice = "gamepad";
    }
    this.setControlDevice(this.controlDevice, true);

    window.addEventListener("keydown", (e) => {
      if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;
      this.lastKeyboardInputAt = performance.now();
      this.userExplicitlyUsedKeyboard = true;
      this.setControlDevice("keyboard");
    });
    window.addEventListener("touchstart", () => {
      this.setControlDevice("touch");
    }, { passive: true });
    window.addEventListener("gamepadconnected", (event) => {
      this.gamepadMapping = event.gamepad?.mapping || "standard";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
      this.userExplicitlyUsedKeyboard = false;
      this.setControlDevice("gamepad", true);
    });
    window.addEventListener("gamepaddisconnected", () => {
      const remainingPad = this.hasConnectedGamepad();
      if (remainingPad) {
        this.gamepadMapping = remainingPad.mapping || "standard";
        return;
      }
      this.gamepadMapping = "standard";
      this.lastGamepadButtons = [];
      this.lastGamepadAxes = { x: 0, y: 0 };
      this.setControlDevice(this.getPreferredControlDevice(), true);
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
      hudBtn.title = active ? "Salir de pantalla completa" : "Pantalla completa";
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

  setControlDevice(device, forceUpdate = false) {
    if (device === "gamepad") {
      this.userExplicitlyUsedKeyboard = false;
    }
    const changed = this.controlDevice !== device;
    this.controlDevice = device;
    document.body.classList.toggle("pad-hidden", device !== "touch");
    document.body.classList.toggle("is-gamepad", device === "gamepad");
    document.body.setAttribute("data-control-device", device);
    if (!changed && !forceUpdate) return;
    this.updateControlLegend();
    this.updateButtonLabels();
    this.tutorial?.renderDeviceManual();
  }

  updateControlLegend() {
    // Sección 1: Interfaz limpia sin paneles laterales permanentes de comandos (#pc-legend permanece oculto).
    const legend = document.getElementById("pc-legend");
    if (legend) {
      legend.innerHTML = "";
      legend.classList.add("hidden");
    }
  }

  updateButtonLabels() {
    const capC = document.getElementById("caption-c");
    if (capC) {
      const level = calculateEldritchBlastLevel(this.floor || 1);
      capC.textContent = `E. BLAST ${level}`;
    }

    // Mantener etiquetas limpias sin combinaciones de teclas ni botones de mando fuera de los tutoriales (Sección 1)
    const menuBtn = document.getElementById("btn-tutorial-help");
    if (menuBtn) menuBtn.title = "Abrir Menú del Juego";
    const blastBadge = document.getElementById("hud-blast-badge");
    if (blastBadge) blastBadge.title = "Eldritch Blast";
    const mistyBadge = document.getElementById("hud-misty-badge");
    if (mistyBadge) mistyBadge.title = "Misty Step (Paso Brumoso)";
    const weaponPanel = document.getElementById("hud-weapon-panel");
    if (weaponPanel) weaponPanel.title = "Arma equipada";

    const dialogPrompt = document.querySelector("#merchant-dialog-modal .dialog-prompt");
    if (dialogPrompt) dialogPrompt.textContent = "▼ Continuar";

    const closeShopBtn = document.getElementById("close-shop");
    if (closeShopBtn) closeShopBtn.textContent = "CERRAR TIENDA";

    const skipIntroBtn = document.getElementById("btn-skip-intro");
    if (skipIntroBtn) skipIntroBtn.textContent = "OMITIR INTRO ⏭";
    const skipEndingBtn = document.getElementById("btn-skip-ending");
    if (skipEndingBtn) skipEndingBtn.textContent = "OMITIR ⏭";
    const deathRestartBtn = document.getElementById("btn-restart-game");
    if (deathRestartBtn) deathRestartBtn.textContent = TEXT.death.btn;
    const victoryRestartBtn = document.getElementById("btn-victory-restart");
    if (victoryRestartBtn) victoryRestartBtn.textContent = "REINICIAR VIAJE";

    this.tutorial?.renderDeviceManual();
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
      if (this.devMode) {
        this.player.gold = this.devGold;
        this.player.weaponUpgrades = { ...this.devUpgrades };
        for (const weapon of Object.values(WEAPONS)) {
          this.player.unlockedWeapons.add(weapon.id);
          if (weapon.ammoProperty) this.player[weapon.ammoProperty] = this.devAmmo;
        }
      }
    } else {
      this.player.x = startX;
      this.player.y = startY;
      this.player.direction = 0;
      this.player.mistyStepMaxCharges = 2;
      if (!isMerchantTransition && !this.preserveShortcutResources) {
        this.player.mistyStepCharges = 2;
        this.player.mistyStepActionCounter = 0;
      }
      this.player.mistyStepRechargeMax = 20;
      this.player.actionTurnCount = 0;
    }

    const preserveShortcutResources = this.preserveShortcutResources;
    this.preserveShortcutResources = false;
    this.player.maxHp = calculateLiorMaxHP(this.floor);
    // Aumenta la capacidad, sin curar heridas automáticamente.
    this.player.hp = this.devMode && !isMerchantTransition && !preserveShortcutResources ? this.player.maxHp : Math.min(this.player.hp, this.player.maxHp);
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
    if (!this.isIntroActive() && !this.hasPendingResumePrompt) {
      if (isMerchantTransition) {
        this.savePlayerProgressCheckpoint();
      } else {
        this.saveFloorCheckpoint();
      }
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
    this.achievements?.observe();
    if (this.tutorial?.isActive) this.tutorial.skipTutorial();
    this.clearSavedGame();
    this.hasPendingResumePrompt = false;
    this.closeResumeModal();
    this.isGameOverTriggered = false;
    sounds.stopGameOverAudio();
    sounds.resetBossRoarTracking();
    this.floor = this.devFloor;
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

    this.updateButtonLabels();
    this.setShopView("supplies", false);
    this.updateShopHUD();
    this.shopModal.classList.remove("hidden");
    this.updateShopSelection(true);
    this.syncBiomeMusic();
  }

  setShopView(view, focusTab = false) {
    if (!SHOP_VIEWS.includes(view)) return;
    this.activeShopView = view;
    document.querySelectorAll("[data-shop-view]").forEach(tab => {
      const selected = tab.dataset.shopView === view;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      if (selected && focusTab) {
        try { tab.focus({ preventScroll: true }); } catch {}
      }
    });
    document.querySelectorAll("[data-shop-panel]").forEach(panel => {
      panel.classList.toggle("hidden", panel.dataset.shopPanel !== view);
    });
    this.shopSelection = 0;
    this.updateShopSelection(!focusTab);
  }

  closeShop() {
    if (!this.shopModal) return;
    const wasOpen = !this.shopModal.classList.contains("hidden");
    this.shopModal.classList.add("hidden");
    if (typeof this.stopDpadHold === "function") this.stopDpadHold();
    this.touchController?.cancelAllGestures();
    if (wasOpen) {
      this.savePlayerProgressCheckpoint();
      this.shopClosingCooldown = performance.now() + 260;
      this.restoreGameplayFocus();
      this.syncBiomeMusic();
    }
  }

  getShopSelectableItems() {
    const activePanel = this.shopModal?.querySelector(`[data-shop-panel="${this.activeShopView}"]`);
    const items = [...(activePanel?.querySelectorAll(".shop-item:not(.hidden)") || [])];
    const closeBtn = document.getElementById("close-shop");
    if (closeBtn && !closeBtn.classList.contains("hidden")) {
      items.push(closeBtn);
    }
    return items;
  }

  updateShopSelection(scrollIntoView = false) {
    const items = this.getShopSelectableItems();
    if (items.length === 0) return;
    this.shopSelection = ((this.shopSelection % items.length) + items.length) % items.length;
    const upgrade = items[this.shopSelection].dataset.upgradeFor;
    if (upgrade) this.showWeaponUpgradeDescription(upgrade);
    items.forEach((item, index) => {
      const selected = index === this.shopSelection;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-selected", String(selected));
      if (selected && scrollIntoView && typeof item.scrollIntoView === "function") {
        try { item.scrollIntoView({ block: "nearest" }); } catch {}
      }
    });
  }

  moveShopSelection(delta) {
    this.shopSelection += delta;
    this.updateShopSelection(true);
  }

  purchaseSelectedShopItem() {
    const items = this.getShopSelectableItems();
    if (items.length === 0) return;
    const item = items[this.shopSelection];
    if (!item) return;
    if (item.id === "close-shop" || item.classList.contains("close-shop-btn")) {
      this.closeShop();
      return;
    }
    const btn = item.querySelector("button");
    if (btn && !btn.disabled) {
      btn.click();
    } else if (btn && btn.disabled) {
      this.log("No cumples los requisitos o no tienes suficiente oro para esta opción.");
    }
  }

  getShortcutResources(floor) {
    return { gold: this.player.gold + shortcutGoldReward(floor) };
  }

  buyShortcutMap() {
    const destination = shortcutDestination(this.floor);
    if (!this.isShopOpen() || !this.inMerchantFloor || this.player.hasShortcutMap ||
        this.player.gold < SHORTCUT_MAP_PRICE || destination <= this.floor + 1) return;
    this.player.gold -= SHORTCUT_MAP_PRICE;
    this.player.hasShortcutMap = true;
    this.savePlayerProgressCheckpoint();
    this.updateHUD();
    this.updateShopHUD();
    this.log("Atajo comprado. Al salir de la tienda bajarás al piso " + destination + ".");
  }

  updateShopHUD() {
    const buyMap = document.getElementById("buy-shortcut-map");
    const mapInfo = document.getElementById("shortcut-map-info");
    const destination = shortcutDestination(this.floor);
    const skipped = Math.max(0, destination - this.floor - 1);
    if (buyMap) {
      buyMap.textContent = this.player.hasShortcutMap ? "Atajo comprado" : "Comprar · 10 PO";
      buyMap.disabled = this.player.hasShortcutMap || this.player.gold < SHORTCUT_MAP_PRICE ||
        !this.inMerchantFloor || skipped === 0;
    }
    if (mapInfo) {
      mapInfo.textContent = skipped === 0 ? "El jefe está en el siguiente piso. Aquí no se vende un atajo."
        : (this.player.hasShortcutMap ? "Al salir irás" : "Al comprarlo, al salir irás") +
          " al piso " + destination + ". Pisos omitidos: " + skipped + ". Recibirás " + shortcutGoldReward(this.floor) + " PO." +
          (destination % 10 === 0 ? " El destino es un jefe 4×4." : "");
    }
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
    if (potionLabel) potionLabel.textContent = `Poción Roja (cura ${rollPotionHealing(this.floor)} HP ≈25%)`;

    const blessedBtn = document.getElementById("buy-blessed-ammo");
    const blessedLabel = document.getElementById("blessed-shop-label");
    const blessedPrice = calculateBlessedAmmoPrice(this.floor);
    const curBlessed = this.player.blessedAmmoCharges || 0;
    if (blessedLabel) {
      blessedLabel.textContent = curBlessed > 0
        ? `Pólvora Maldita (+1d6 🔮 · ${curBlessed} disp.)`
        : "Pólvora Maldita (+1d6 🔮 ×5 disp.)";
    }
    if (blessedBtn) {
      blessedBtn.textContent = curBlessed >= 15 ? "MÁX" : `${blessedPrice} PO`;
      blessedBtn.disabled = curBlessed >= 15 || this.player.gold < blessedPrice;
    }

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
    this.savePlayerProgressCheckpoint();
    return true;
  }

  describeWeaponUpgrade(weaponId, level) {
    const descriptions = {
      sword: ["1d4 · Sin munición", "2d4 · Mayor daño cuerpo a cuerpo", "3d4 · Potencia sin consumir munición", "4d4 · Máximo daño cuerpo a cuerpo"],
      pistol: ["1d6 · Ataque preciso", "2d6 · Incrementa el daño normal", "2d6 normal + 1d6 verdadero: ignora la armadura aunque falle el golpe normal", "2d6 normal + 2d6 verdadero: especialmente útil contra armaduras"],
      musket: ["1d8 · Alcance 5, ancho 3", "2d8 · Más daño a distancia", "3d8 · Penetra hasta 2 objetivos en la línea del enemigo más cercano", "4d8 · Penetra todos los enemigos en esa misma línea"],
      blunderbuss: ["1d8 · Ataque ancho a corta distancia", "2d8 · Más daño de dispersión", "3d8 · Empuja 1 casilla y provoca crítico al chocar con una pared", "4d8 · Empuja 2 casillas y mantiene el crítico contra pared"]
    };
    return (descriptions[weaponId] || [])[Math.max(0, Math.min(3, level))] || "";
  }

  showWeaponUpgradeDescription(weaponId) {
    if (!this.shopModal) return;
    const level = Math.max(0, Math.min(3, this.player.weaponUpgrades[weaponId] || 0));
    let panel = this.shopModal.querySelector("#shop-upgrade-description");
    if (!panel) return;
    const weapon = Object.values(WEAPONS).find(w => w.id === weaponId);
    const current = this.describeWeaponUpgrade(weaponId, level);
    const next = level < 3 ? this.describeWeaponUpgrade(weaponId, level + 1) : "Nivel máximo alcanzado";
    panel.textContent = `${weapon?.name || weaponId} — Actual: ${current}. ${level < 3 ? `Siguiente mejora: ${next}.` : next}`;
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
    const weapon = Object.values(WEAPONS).find(item => item.id === weaponId);
    const before = this.describeWeaponUpgrade(weaponId, level).split(" · ")[0].split(":")[0];
    const after = this.describeWeaponUpgrade(weaponId, level + 1).split(" · ")[0].split(":")[0];
    const message = `${weapon.name}: el daño subió de ${before} a ${after}.`;
    const panel = this.shopModal.querySelector("#shop-upgrade-description");
    if (panel) panel.textContent = message;
    this.log(message);
    sounds.playPickup();
    this.updateShopHUD();
    this.updateHUD();
    this.savePlayerProgressCheckpoint();
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
    document.getElementById("buy-shortcut-map")?.addEventListener("click", () => this.buyShortcutMap());
    const btnClose = document.getElementById("close-shop");
    if (btnClose) btnClose.addEventListener("click", () => this.closeShop());

    this.shopModal?.querySelectorAll("[data-shop-view]").forEach(tab => {
      tab.addEventListener("click", () => this.setShopView(tab.dataset.shopView));
    });
    this.shopModal?.querySelectorAll("[data-upgrade-for]").forEach(item => {
      item.querySelector("button")?.addEventListener("click", () => this.purchaseWeaponUpgrade(item.dataset.upgradeFor));
      item.addEventListener("click", event => { if (!event.target.closest("button")) this.showWeaponUpgradeDescription(item.dataset.upgradeFor); });
      // En PC, el panel se actualiza al pasar el cursor, sin necesidad de clicar.
      item.addEventListener("pointerenter", () => this.showWeaponUpgradeDescription(item.dataset.upgradeFor));
      // Conserva navegación por teclado/mando y selección por toque en móvil.
      item.addEventListener("focusin", () => this.showWeaponUpgradeDescription(item.dataset.upgradeFor));
    });

    if (this.dialogModal) {
      this.dialogModal.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dismissMerchantDialog();
      });
    }

    const syncItemSelection = (targetEl) => {
      const items = this.getShopSelectableItems();
      const idx = items.indexOf(targetEl);
      if (idx !== -1) {
        this.shopSelection = idx;
        this.updateShopSelection(false);
      }
    };
    this.shopModal?.querySelectorAll(".shop-item").forEach((item) => {
      item.addEventListener("pointerenter", () => syncItemSelection(item));
      item.addEventListener("focusin", () => syncItemSelection(item));
      item.addEventListener("click", event => {
        if (event.target.closest("button")) return;
        syncItemSelection(item);
      });
    });
    if (btnClose) {
      btnClose.addEventListener("pointerenter", () => syncItemSelection(btnClose));
      btnClose.addEventListener("focus", () => syncItemSelection(btnClose));
    }

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
          this.savePlayerProgressCheckpoint();
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
          this.savePlayerProgressCheckpoint();
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
          this.savePlayerProgressCheckpoint();
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
            this.savePlayerProgressCheckpoint();
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

    const buyBlessedBtn = document.getElementById("buy-blessed-ammo");
    if (buyBlessedBtn) {
      buyBlessedBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.purchaseBlessedAmmo();
      });
    }
  }

  purchaseBlessedAmmo() {
    if (!this.player) return false;
    const cur = this.player.blessedAmmoCharges || 0;
    const price = calculateBlessedAmmoPrice(this.floor);
    if (cur >= 15 || this.player.gold < price) {
      this.updateShopHUD();
      return false;
    }
    this.player.gold -= price;
    this.player.blessedAmmoCharges = Math.min(15, cur + 5);
    sounds.playPickup();
    this.renderer?.showFloatingNumber(this.player.x, this.player.y, `+5 🔮 MALDICIÓN`, "shield");
    this.log(TEXT.logs.boughtBlessedAmmo(price, this.player.blessedAmmoCharges));
    this.updateHUD();
    this.updateShopHUD();
    this.savePlayerProgressCheckpoint();
    return true;
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
    this.achievements?.observe();
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
      elVitals.textContent = `${Math.round((this.player.hp / maxHpCap) * 100)}% · 🛡${this.player.shieldSegments}/${this.player.maxShieldSegments}`;
    }
    if (elVitals) {
      const conditions = [
        ["blindness", "CIEGO", this.player.blindTurns],
        ["curse", "MALDITO", this.player.cursedHealing ? true : null],
        ["poison", "VENENO", this.player.poisonTurns]
      ];
      for (const [icon, label, duration] of conditions) {
        if (!duration) continue;
        const badge = document.createElement("img");
        badge.src = `Assets/UI/StatusIcons/${icon}.png`;
        badge.alt = "";
        badge.width = badge.height = 18;
        badge.style.verticalAlign = "middle";
        badge.style.imageRendering = "pixelated";
        elVitals.append(" · ", badge, ` ${label}${typeof duration === "number" ? ` ${duration}` : ""}`);
      }
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
    if (elWeapon) {
      const blessedSuffix = (!weapon.isMelee && (this.player.blessedAmmoCharges || 0) > 0)
        ? ` 🔮${this.player.blessedAmmoCharges}`
        : "";
      elWeapon.textContent = `${this.player.equippedWeapon.name}${blessedSuffix}`;
    }
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
    this.dungeon.enemies.push(createMinion(this.floor, spot.x, spot.y, MINION_VISION_RANGE, true));
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

      this.updateButtonLabels();
      this.deathScreen.classList.remove("hidden");
      this.deathScreen.classList.add("visible");
      if (btn) {
        btn.classList.add("is-selected");
        try { btn.focus({ preventScroll: true }); } catch {}
      }
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
    this.renderer.playInteraction();
    this.renderer.showVisualEffect("bluechest", this.player.x, this.player.y, 700);
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

    this.achievements?.observe();
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

    this.updateButtonLabels();
    if (this.victoryScreen) {
      this.victoryScreen.classList.remove("hidden");
      this.victoryScreen.classList.add("visible");
      const vBtn = document.getElementById("btn-victory-restart");
      if (vBtn) {
        vBtn.classList.add("is-selected");
        try { vBtn.focus({ preventScroll: true }); } catch {}
      }
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

  castMistyStep(maxSteps = 8, directionOverride = null, prepared = false) {
    if (this.tutorial?.allowsStep(4) === false) return;
    if (this.isGameplayBlocked()) return;

    if (this.consumeStunnedTurn()) return;
    this.showWeaponRange = false;
    if (this.player.mistyStepCharges <= 0) return;

    const destination = this.getMistyStepDestination(directionOverride, maxSteps);
    if (destination.blocked || destination.canceled || (this.tutorial?.isActive && destination.dangerous)) return;
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
    if (!this.tutorial?.isActive) this.player.mistyStepCharges--;
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
    const departure = { x: this.player.x, y: this.player.y };
    this.player.x = destination.x;
    this.player.y = destination.y;
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.renderer.commitCameraFacing();
    const transferTime = this.renderer.playMistyStep(departure, prepared) ?? (prepared ? 1 : 2) * MISTY_FRAME_MS;
    this.renderer.showVisualEffect("mistdeparture", departure.x, departure.y, transferTime);
    this.renderer.showVisualEffect("mistarrival", this.player.x, this.player.y, 260, 0, 0, transferTime);
    this.tutorial?.onPlayerAction("misty_step");
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

  castEldritchBlast(prepared = false) {
    if (this.tutorial?.allowsStep(3) === false) return;
    if (this.isGameplayBlocked()) return;

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
    if (!this.tutorial?.isActive) this.player.blastCurrentCharges = 0;
    this.player.advanceAction({ skipBlastCharge: true });
    if (this.stats) this.stats.eldritchBlastCasts++;
    this.renderer.commitCameraFacing();
    const rayCount = calculateEldritchBlastRayCount(this.floor);
    const damageByRay = splitDamageAcrossRays(calculateEldritchBlastDamage(this.floor), rayCount);
    this.renderer.playEldritchBlastAnimation(beamReach, prepared);

    if (hitEnemy) {
      if (this.stats) this.stats.eldritchBlastHits++;
      Renderer.orientEnemyTowardsPlayer(hitEnemy, this.player);
      let blastDamage = 0;
      const isIronGolem = !!(hitEnemy.isMegaBoss && hitEnemy.originTier === 3);
      damageByRay.forEach(rayDamage => {
        const effRayDamage = isIronGolem ? Math.ceil(rayDamage * 1.5) : rayDamage;
        blastDamage += CombatSystem.applyDamageToEnemy(this, hitEnemy, effRayDamage, false);
      });
      if (blastDamage > 0) this.renderer.showFloatingNumber(hitEnemy.x, hitEnemy.y, `-${blastDamage} HP`, "damage");
      if (hitEnemy.hp > 0) this.renderer.playEnemyAnim(hitEnemy, "hurt");
      this.log(TEXT.logs.blastFired(hitEnemy.name, blastDamage, rayCount));
      this.tutorial?.onPlayerAction("eldritch_blast");
      CombatSystem.applyPanic(this, CombatSystem.processDeaths(this, [hitEnemy]));
    } else {
      this.log(TEXT.logs.blastWhiff);
    }

    this.processEnemiesTurn();
    this.updateHUD();
    this.renderer.draw();
  }

  cycleWeapon(showToast = true) {
    if (this.tutorial?.allowsStep(5) === false) return;
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

  handleMinotaurCharge(enemy, detectsLior, distance) {
    const player = this.player;
    const dungeon = this.dungeon;
    const free = cell => dungeon.isInsideBounds(cell.x, cell.y)
      && dungeon.getTile(cell.x, cell.y) !== TILE_WALL
      && !dungeon.enemies.some(other => other !== enemy && other.hp > 0
        && other.cells?.some(point => point.x === cell.x && point.y === cell.y));
    if (!enemy.chargeDirection) {
      if (!detectsLior || distance <= 1 || enemy.attackCooldown > 0) return false;
      const direction = DIR_VECTORS.find(({ x, y }) => {
        const edge = enemy.cells.every(cell => (player.x - cell.x) * x + (player.y - cell.y) * y > 0);
        const aligned = enemy.cells.some(cell => x ? cell.y === player.y : cell.x === player.x);
        return edge && aligned && enemy.cells.every(cell => free({ x: cell.x + x, y: cell.y + y }));
      });
      if (!direction) return false;
      enemy.chargeDirection = direction;
      this.renderer.playEnemyAnim(enemy, "taunt");
      this.renderer.showVisualEffect("danger", enemy.x, enemy.y, 550);
      this.log("¡El Minotauro baja los cuernos y se prepara para embestir!");
      return true;
    }

    const { x: dx, y: dy } = enemy.chargeDirection;
    enemy.chargeDirection = null;
    const fromX = enemy.x;
    const fromY = enemy.y;
    let collided = false;
    for (let i = 0; i < 5; i++) {
      const next = enemy.cells.map(cell => ({ x: cell.x + dx, y: cell.y + dy }));
      if (!next.every(free)) {
        collided = true;
        break;
      }
      if (next.some(cell => cell.x === player.x && cell.y === player.y)) {
        const attack = CombatSystem.resolveD20Attack(enemy, player, calculateEnemyAttackBonus(this.floor));
        if (attack?.hit) {
          const [dice, sides, bonus] = getEnemyDamageProfile(enemy);
          const damage = CombatSystem.rollDamageDice(dice, sides) + bonus;
          CombatSystem.applyDamageToPlayer(this, player, attack.critical ? Math.ceil(damage * 1.5) : damage);
          if (player.hp > 0) CombatSystem.displacePlayer(this, dx, dy, 2);
          this.log("¡El Minotauro acierta la embestida!");
          collided = true;
        } else {
          this.log("El Minotauro falla la embestida.");
          collided = !!attack?.fumble;
        }
        break;
      }
      enemy.x += dx;
      enemy.y += dy;
      enemy.cells = next;
    }
    const duration = 500;
    const now = performance.now();
    enemy.moveInterp = { fromX, fromY, startedAt: now, duration, until: now + duration };
    this.renderer.playEnemyAnim(enemy, "move");
    this.renderer.enemySequenceUntil = Math.max(this.renderer.enemySequenceUntil || 0, now + duration);
    this.renderer.keepAnimating(duration);
    enemy.lastAttackTurn = dungeon.turnCount;
    enemy.attackCooldown = 2;
    if (collided) {
      enemy.stunned = true;
      this.renderer.showVisualEffect("status-stun-apply", enemy.x, enemy.y, 550, 0, 0, duration);
      this.log("El Minotauro queda aturdido un turno por el choque.");
    }
    return true;
  }

  processEnemiesTurn() {
    if (this.tutorial?.isActive) return;
    if (this.player.hp <= 0 || this.isVictory || this.inMerchantFloor) return;

    // Garantizar que el contador global de turnos avance exclusivamente una vez por acción válida de Lior
    if (!this.player.actionTurnCount || this.player.actionTurnCount <= (this.dungeon.lastProcessedPlayerAction || 0)) {
      if (this.dungeon.lastProcessedPlayerAction === this.player.actionTurnCount && this.player.actionTurnCount > 0) {
        return;
      }
      this.player.actionTurnCount = (this.dungeon.turnCount || 0) + 1;
    }
    this.dungeon.lastProcessedPlayerAction = this.player.actionTurnCount;
    this.dungeon.turnCount++;

    // Estados: cada acción válida cuenta como un turno; no se aplican efectos fuera de combate.
    if (this.player.blindTurns > 0) this.player.blindTurns--;
    if (this.player.poisonTurns > 0) {
      this.player.poisonTurns--;
      CombatSystem.applyTrueDamageToPlayer(this, this.player, 2, "☠️");
      this.log("☠️ Veneno: -2 HP.");
      if (this.player.hp <= 0) { this.triggerGameOver(); return; }
    }
    const enemySnapshot = [...this.dungeon.enemies];
    // Alerta: solo enemigos en el área visible de la cámara al iniciarse la acción.
    const combatants = enemySnapshot.filter(e => e.hp > 0 && (e.fearCooldown || 0) <= 0
      && CombatSystem.getMinDistToPlayer(this.player, e) <= CombatSystem.getEnemyAttackRange(e)
      && CombatSystem.canEnemySeePlayer(this.player, this.dungeon, e));
    if (combatants.length >= 3) {
      let alerted = 0;
      for (const e of enemySnapshot) {
        if (combatants.includes(e) || e.hp <= 0 || (e.fearCooldown || 0) > 0) continue;
        const pos = CameraTransformer.worldToScreen(e.x, e.y, this.player);
        if (pos.screenX < 0 || pos.screenY < 0 || pos.screenX >= CAMERA_CONFIG.cols || pos.screenY >= CAMERA_CONFIG.rows) continue;
        if (!(e.alertTurns > 0)) this.renderer?.showVisualEffect("alert", e.x, e.y, 400);
        e.alertTurns = Math.max(e.alertTurns || 0, 4);
        alerted++;
      }
      if (alerted) this.log(`📣 ¡El combate alerta a ${alerted} enemigos visibles!`);
    }
    let tookDamage = false;

    enemySnapshot.forEach(enemy => {
      if (this.player.hp <= 0) return;
      if (!this.dungeon.enemies.includes(enemy)) return;
      CombatSystem.syncEnemyCells(enemy);
      if (CombatSystem.isUndead(enemy)) enemy.fearCooldown = 0;
      if (enemy.anim?.state === "reassemble") return;
      if (!enemy.cells || enemy.cells.length === 0) return;

      if (enemy.isMegaBoss && !enemy.phaseTwoTriggered && enemy.hp <= enemy.maxHp / 2) {
        enemy.phaseTwoTriggered = true;
        enemy.attackCooldown = Math.max(enemy.attackCooldown || 0, 1);
        this.log(`⚠ ¡${enemy.name} entra en FASE II!`);
        this.renderer?.showVisualEffect("radiant", enemy.x, enemy.y, 750);
        this.renderer?.playEnemyAnim?.(enemy, "taunt");
        this.renderer?.keepAnimating?.(750);
      }
      const attackRange = CombatSystem.getEnemyAttackRange(enemy);
      const attackCadence = enemy.isMegaBoss && enemy.phaseTwoTriggered
        ? Math.max(2, CombatSystem.getEnemyAttackCadence(enemy) - 1)
        : CombatSystem.getEnemyAttackCadence(enemy);
      if ((enemy.attackCooldown || 0) > 0) {
        enemy.attackCooldown = Math.max(0, enemy.attackCooldown - 1);
      }

      if (enemy.stunned) {
        enemy.stunned = false;
        this.renderer.showVisualEffect("status-stun-persist", enemy.x, enemy.y, 450);
        this.log(TEXT.logs.stunned(enemy.name));
        return;
      }

      // Regeneración de Trol (Mini-Jefe Tier 2): recupera +2 HP al inicio de su turno si está herido
      if (enemy.isBoss && !enemy.isMegaBoss && enemy.originTier === 2 && enemy.hp > 0 && enemy.hp < enemy.maxHp) {
        const healAmt = Math.min(2, enemy.maxHp - enemy.hp);
        enemy.hp += healAmt;
        this.renderer?.showFloatingNumber?.(enemy.x, enemy.y, `+${healAmt} HP`, "healing");
      }

      // Inmersión Sísmica del Gusano Púrpura (Tier 7, cada 8 turnos): reubicación e invocación sin daño fuera de cadencia
      if (enemy.isMegaBoss && enemy.originTier === 7 && this.dungeon.turnCount > 0 && this.dungeon.turnCount % 8 === 0) {
        const burrowSpots = [
          { x: 1, y: 2 }, { x: 10, y: 2 }, { x: 1, y: 10 },
          { x: 10, y: 10 }, { x: 6, y: 2 }, { x: 6, y: 9 }
        ].filter(spot => {
          if (spot.x === enemy.x && spot.y === enemy.y) return false;
          for (let dy = 0; dy < 4; dy++) {
            for (let dx = 0; dx < 4; dx++) {
              const cx = spot.x + dx;
              const cy = spot.y + dy;
              if (!this.dungeon.isInsideBounds(cx, cy) || this.dungeon.getTile(cx, cy) === TILE_WALL) return false;
              if (cx === this.player.x && cy === this.player.y) return false;
              if (this.dungeon.enemies.some(o => o !== enemy && o.hp > 0 && o.cells?.some(c => c.x === cx && c.y === cy))) return false;
            }
          }
          return true;
        });
        if (burrowSpots.length > 0) {
          const nextSpot = burrowSpots[Math.floor(Math.random() * burrowSpots.length)];
          enemy.x = nextSpot.x;
          enemy.y = nextSpot.y;
          CombatSystem.syncEnemyCells(enemy);
          this.renderer?.playEnemyAnim?.(enemy, "move");
          this.summonBossRoomMinion();
          this.log("🪱 ¡El Gusano Púrpura se sumerge bajo tierra y emerge en otra esquina!");
        }
      }

      const distToPlayer = CombatSystem.getMinDistToPlayer(this.player, enemy);
      const hasLOS = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);
      const effectiveVisionRange = enemy.name === "Minotauro" ? 5 : (enemy.visionRange || (enemy.isBoss ? 3 : MINION_VISION_RANGE));
      const detectsLior = hasLOS && distToPlayer <= effectiveVisionRange;
      if (enemy.name === "Minotauro") {
        const hpBeforeCharge = this.player.hp;
        if (this.handleMinotaurCharge(enemy, detectsLior, distToPlayer)) {
          if (this.player.hp < hpBeforeCharge) tookDamage = true;
          return;
        }
      }

      const hasAllyNearby = CombatSystem.hasNearbyAlly(this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS);
      const hasAlertedAllyNearby = CombatSystem.hasAlertedNearbyAlly(this.player, this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS) || (enemy.alertTurns || 0) > 0;
      if (enemy.alertTurns > 0) enemy.alertTurns--;

      if (!enemy.isBoss) {
        // Si un aliado entra dentro del radio de 3 casillas mientras el enemigo 1x1 está asustado, el pánico termina de inmediato
        if ((enemy.fearCooldown || 0) > 0 && hasAllyNearby) {
          enemy.fearCooldown = 0;
        }

        // Evaluación cuando no está en pánico activo (sin reiniciar el contador si ya está asustado)
        if ((enemy.fearCooldown || 0) <= 0) {
          if (detectsLior) {
            if (!hasAllyNearby && CombatSystem.startEnemyFear(enemy)) {
              this.renderer?.showVisualEffect("panic", enemy.x, enemy.y, 420);
            } else {
              enemy.state = "chase";
            }
          } else if (hasAlertedAllyNearby || enemy.committedToCombat || (enemy.fearEpisodes || 0) >= 3) {
            enemy.state = "chase";
          } else {
            enemy.state = "patrol";
          }
        } else {
          enemy.state = "panic";
        }
      } else {
        enemy.state = (detectsLior || hasAlertedAllyNearby) ? "chase" : "patrol";
      }

      const isFleeing = !enemy.isBoss && (enemy.fearCooldown || 0) > 0;
      const isCadenceReady = (enemy.attackCooldown || 0) <= 0
        && (enemy.lastAttackTurn === null
            || enemy.lastAttackTurn === undefined
            || (this.dungeon.turnCount - enemy.lastAttackTurn) >= attackCadence);

      if (enemy.isMegaBoss) {
        if (isCadenceReady && !enemy.bossAttackReady) this.renderer?.showVisualEffect("danger", enemy.x, enemy.y, 420);
        enemy.bossAttackReady = isCadenceReady;
      }

      const inAttackPosition = enemy.ranged
        ? CombatSystem.canRangedEnemyFire(this.dungeon, this.player, enemy.x, enemy.y)
        : hasLOS && distToPlayer <= attackRange;
      const canAttack = inAttackPosition && !isFleeing && isCadenceReady;

      Renderer.recordEnemyRelativePlayerX(enemy, this.player);

      if (canAttack) {
        enemy.state = "attack";
        enemy.committedToCombat = true;
        enemy.lastAttackTurn = this.dungeon.turnCount;
        enemy.attackCooldown = attackCadence;
        if (enemy.isMegaBoss) {
          enemy.bossAttackReady = false;
        }

        Renderer.orientEnemyTowardsPlayer(enemy, this.player);
        const attack = CombatSystem.resolveD20Attack(
          enemy,
          this.player,
          calculateEnemyAttackBonus(this.floor)
        );
        if (!attack) return;

        this.renderer.playEnemyAnim(enemy, "attack");
        const isRanged = enemy.isBoss || !!enemy.ranged;
        if (isRanged) {
          this.renderer.fireEnemyProjectile(enemy, attack.hit);
        }

        if (attack.fumble) {
          enemy.stunned = true;
          this.log(TEXT.logs.criticalMiss(enemy.name));
          return;
        }

        if (attack.hit) {
          const enemyKey = this.renderer.getEnemyArtKey(enemy);
          if (!isRanged) this.renderer.showVisualEffect(ENEMY_MELEE_ART[enemyKey] || "claw", this.player.x, this.player.y);
          const [damageDice, damageSides, flatBonus] = getEnemyDamageProfile(enemy);
          const baseDamage = CombatSystem.rollDamageDice(damageDice, damageSides) + flatBonus;
          const totalDmg = attack.critical ? Math.ceil(baseDamage * 1.5) : baseDamage;
          const hadShieldBeforeHit = (this.player.shieldSegments || 0) > 0;
          const dmgRes = CombatSystem.applyDamageToPlayer(this, this.player, totalDmg);
          const extraEffect = enemy.isMegaBoss
            ? CombatSystem.applyMegaBossOnHitEffects(
                this,
                enemy,
                attack,
                dmgRes,
                distToPlayer,
                hadShieldBeforeHit
              )
            : CombatSystem.applyMiniBossOnHitEffects(
                this,
                enemy,
                distToPlayer,
                hadShieldBeforeHit
              );
          if (enemy.name === "Zombi" && dmgRes.totalDamage > 0 && Math.random() < .25) {
            this.player.poisonTurns = 3;
            this.log("☠️ ¡Mordida infectada! Veneno durante 3 acciones.");
          }
          if (enemy.name === "Beholder" && Math.random() < .30) {
            this.player.blindTurns = 3;
            this.log("👁 ¡Ceguera! Solo puedes ver las nueve casillas inmediatas.");
          }
          if ((enemy.name === "Diablillo" || enemy.name === "Balor") && Math.random() < .25) {
            this.player.cursedHealing = true;
            this.log("🔮 ¡Maldición! La siguiente curación tendrá la mitad de efecto.");
          }
          enemy.movedLastTurn = false;
          if (dmgRes.totalDamage > 0 || this.player.hp <= 0) {
            tookDamage = true;
          }
          this.log(TEXT.logs.enemyHit(
            enemy.name,
            attack.total,
            this.player.ac,
            dmgRes.totalDamage,
            dmgRes.mitigatedDamage,
            this.player.shieldSegments,
            extraEffect
          ));
        }
        return;
      }

      let mode = "patrol";
      if (isFleeing) {
        mode = "flee";
      } else if (enemy.isBoss) {
        if (detectsLior || hasAlertedAllyNearby) {
          mode = "chase";
        }
      } else if (detectsLior || hasAlertedAllyNearby || enemy.committedToCombat || (enemy.fearEpisodes || 0) >= 3) {
        mode = enemy.ranged ? "shoot-position" : "chase";
      }

      let directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];

      if (enemy.isMegaBoss) {
        const isTarrasque = enemy.originTier === 2;
        const isFastMover = enemy.originTier === 7
          || (enemy.originTier === 10 && (enemy.solarPhase2Triggered || enemy.hp <= enemy.maxHp / 2));
        const moveCadence = isTarrasque ? 2 : (isFastMover ? 3 : 4);
        if (this.dungeon.turnCount % moveCadence !== 0) {
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
      } else if (mode === "shoot-position") {
        if (inAttackPosition) return;
        const next = CombatSystem.findRangedStep(this.dungeon, this.player, enemy, directions);
        directions = next ? [next] : [];
      } else if (mode === "chase") {
        directions.sort((a, b) => {
          const dA = Math.hypot((enemy.x + a.dx) - this.player.x, (enemy.y + a.dy) - this.player.y);
          const dB = Math.hypot((enemy.x + b.dx) - this.player.x, (enemy.y + b.dy) - this.player.y);
          return dA - dB;
        });
      } else if (!enemy.isBoss) {
        // Patrullaje coherente de zona para enemigos 1x1: desplazamiento horizontal izquierda/derecha
        // alrededor de su posición inicial (startX ± patrolRadius), con respaldo vertical si el eje X está bloqueado.
        const anchorX = Number.isInteger(enemy.startX) ? enemy.startX : enemy.x;
        const anchorY = Number.isInteger(enemy.startY) ? enemy.startY : enemy.y;
        const patrolRadius = enemy.patrolRadius || MINION_PATROL_RADIUS;
        let pDirX = (enemy.patrolDir === -1 || enemy.patrolDir === 1) ? enemy.patrolDir : 1;
        if (Math.abs((enemy.x + pDirX) - anchorX) > patrolRadius) {
          pDirX = -pDirX;
          enemy.patrolDir = pDirX;
        }
        let pDirY = (enemy.patrolDirY === -1 || enemy.patrolDirY === 1) ? enemy.patrolDirY : 1;
        if (Math.abs((enemy.y + pDirY) - anchorY) > patrolRadius) {
          pDirY = -pDirY;
          enemy.patrolDirY = pDirY;
        }
        directions = [
          { dx: pDirX, dy: 0, isPatrolX: true },
          { dx: -pDirX, dy: 0, isPatrolX: true, reversedX: true },
          { dx: 0, dy: pDirY, isPatrolY: true },
          { dx: 0, dy: -pDirY, isPatrolY: true, reversedY: true }
        ];
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
          const prevX = enemy.x;
          const prevY = enemy.y;
          enemy.x += dir.dx;
          enemy.y += dir.dy;
          enemy.cells = candidateCells;
          enemy.movedLastTurn = true;
          if (mode === "patrol" && !enemy.isBoss) {
            if (dir.isPatrolX) enemy.patrolDir = dir.dx;
            if (dir.isPatrolY) enemy.patrolDirY = dir.dy;
          }
          const moveNow = performance.now();
          const hasWalk = this.renderer?.getEquippedEnemyAtlas(enemy) || ENEMY_WALK_RENEWED[this.renderer?.getEnemyArtKey(enemy)];
          const moveDuration = hasWalk ? ENEMY_STEP_MS : ENEMY_LEGACY_STEP_MS;
          enemy.moveInterp = { fromX: prevX, fromY: prevY, startedAt: moveNow, duration: moveDuration, until: moveNow + moveDuration };
          if (dir.dx !== 0) {
            enemy.lastMoveDx = dir.dx;
            enemy.facingLeft = dir.dx < 0;
            enemy.flipX = enemy.facingLeft;
            enemy.facing = enemy.facingLeft ? "left" : "right";
          }
          CombatSystem.syncEnemyCells(enemy);
          Renderer.recordEnemyRelativePlayerX(enemy, this.player);
          this.renderer?.playEnemyAnim?.(enemy, "move");
          this.renderer?.keepAnimating?.(120);
          break;
        }
      }

      if ((enemy.fearCooldown || 0) > 0) {
        enemy.fearCooldown = Math.max(0, enemy.fearCooldown - 1);
        const nowHasAlly = CombatSystem.hasNearbyAlly(this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS);
        if (nowHasAlly) {
          enemy.fearCooldown = 0;
        }
        if (enemy.fearCooldown === 0) {
          const distNow = CombatSystem.getMinDistToPlayer(this.player, enemy);
          const losNow = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);
          const stillSeesLior = losNow && distNow <= effectiveVisionRange;
          const alertedAllyNow = CombatSystem.hasAlertedNearbyAlly(this.player, this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS);
          if (!stillSeesLior) {
            enemy.state = alertedAllyNow ? "chase" : "patrol";
          } else {
            enemy.state = nowHasAlly ? "chase" : "panic";
          }
        }
      }
    });

    // Comprobación final tras el movimiento de todos los enemigos: si un aliado entró en el radio de 3 casillas
    // de un enemigo 1x1 asustado durante este mismo turno, su estado de pánico termina inmediatamente.
    this.dungeon.enemies.forEach(enemy => {
      if (enemy.isBoss || (enemy.fearCooldown || 0) <= 0) return;
      if (CombatSystem.hasNearbyAlly(this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS)) {
        enemy.fearCooldown = 0;
        const distNow = CombatSystem.getMinDistToPlayer(this.player, enemy);
        const losNow = CombatSystem.canEnemySeePlayer(this.player, this.dungeon, enemy);
        const effVis = enemy.visionRange || MINION_VISION_RANGE;
        const alertedNow = CombatSystem.hasAlertedNearbyAlly(this.player, this.dungeon, enemy, ENEMY_ALLY_DETECTION_RADIUS);
        enemy.state = ((losNow && distNow <= effVis) || alertedNow) ? "chase" : "patrol";
      }
    });

    if (tookDamage) {
      if (this.player.hp > 0) sounds.playHurt();
      this.renderer.playHurt(this.player.hp <= 0);
    }

    const activeMegaBoss = this.dungeon.isBossRoom
      ? this.dungeon.enemies.find(e => e.isMegaBoss && e.hp > 0)
      : null;
    if (this.player.hp > 0 && activeMegaBoss) {
      const summonCadence = activeMegaBoss.originTier === 9 ? 4 : 6;
      if (this.dungeon.turnCount % summonCadence === 0) {
        this.summonBossRoomMinion();
        if (activeMegaBoss.originTier === 10 && (activeMegaBoss.solarPhase2Triggered || activeMegaBoss.hp <= activeMegaBoss.maxHp / 2)) {
          this.summonBossRoomMinion();
        }
      }
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
    const prevPlayerX = this.player.x;
    const prevPlayerY = this.player.y;
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.player.x = nextX;
    this.player.y = nextY;
    const stepNow = performance.now();
    setPlayerStep(this.player, prevPlayerX, prevPlayerY, stepNow);
    this.renderer?.keepAnimating?.(110);
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

    const prevBackX = this.player.x;
    const prevBackY = this.player.y;
    this.player.advanceAction();
    this.dungeon.enemies.forEach(e => Renderer.recordEnemyRelativePlayerX(e, this.player));
    this.player.moveBackward();
    const backNow = performance.now();
    setPlayerStep(this.player, prevBackX, prevBackY, backNow);
    this.renderer?.keepAnimating?.(110);
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
    this.renderer.playInteraction();
    const chestBonusGold = 1 + Math.floor((this.tier - 1) / 5);
    this.addGold(chestBonusGold, this.player.x, this.player.y);

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
      const bunnyGold = 5 + Math.floor(this.tier / 2);
      this.addGold(bunnyGold, this.player.x, this.player.y);
      sounds.playCoin();
      this.log(TEXT.logs.bunnyCaught);
      this.updateHUD();
      return true;
    }
    return false;
  }

  async showDescentTransition() {
    if (this.descentTransitionActive) return;
    const panel = document.getElementById("descent-transition");
    if (!panel) {
      this.initDungeonFloor(false);
      return;
    }
    this.descentTransitionActive = true;
    const floor = this.floor;
    const boss = ENEMY_ROSTER.megaBoss[Math.min(9, Math.ceil(floor / 10) - 1)];
    const accent = ["#dcaf71","#cf9165","#adbacb","#61b6ae","#99b7ff","#bb87ec","#a66cc6","#ed775a","#d74b58","#f5d47d"];
    panel.style.setProperty("--descent-accent", accent[boss.tier - 1]);
    panel.querySelector(".descent-floor").textContent = "Piso " + floor;
    panel.querySelector(".descent-boss").textContent = (floor % 10 === 0 ? "En el umbral · " : "Más adelante · ") + boss.name;
    const canvas = panel.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bossAtlas = ENEMY_DIRECTIONAL_ATLASES[boss.src];
    const portrait = bossAtlas ? this.renderer.loadTerrainTexture(bossAtlas) : null;
    const drawBoss = () => {
      if (!portrait?.naturalWidth || !this.descentTransitionActive || this.floor !== floor) return;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(portrait, 0, 0, 128, 128, 0, 0, canvas.width, canvas.height);
    };
    if (portrait?.complete) drawBoss();
    else portrait?.addEventListener("load", drawBoss, { once: true });

    panel.hidden = false;
    const loadingStarted = performance.now();
    let floorReady = false;
    try {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      this.initDungeonFloor(false);
      const theme = this.renderer.ensureThemeLoaded(Math.min(2, Math.floor((floor - 1) / 34)));
      const images = [portrait, theme?.floorAtlas, theme?.wallAtlas, theme?.wallOverlayAtlas,
        ...this.dungeon.enemies.flatMap(enemy => {
          const key = this.renderer.getEnemyArtKey(enemy);
          return [enemy.spriteSrc, ENEMY_DIRECTIONAL_ATLASES[enemy.spriteSrc], ENEMY_ACTION_ATLASES[key]?.src,
            ENEMY_WALK_RENEWED[key], this.renderer.getEquippedEnemyAtlas(enemy), this.renderer.getEnemyAttackMotion(enemy), this.renderer.getEnemyWalkMotion(enemy)].filter(Boolean).map(src => this.renderer.loadTerrainTexture(src));
        })].filter(Boolean);
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, Math.max(0, 3500 - (performance.now() - loadingStarted)))),
        Promise.race([
          Promise.allSettled([...new Set(images)].map(image => image.decode?.())),
          new Promise(resolve => setTimeout(resolve, 8500))
        ])
      ]);
      await Promise.all(this.dungeon.enemies.filter(enemy => enemy.isMegaBoss)
        .map(enemy => this.renderer.prepareBossPresentation(enemy)));
      floorReady = true;
    } finally {
      panel.hidden = true;
      this.descentTransitionActive = false;
      if (floorReady) {
        this.entryPreviewUntil = performance.now() + 1500;
        this.triggerFloorInitialPresentation();
      }
      this.renderer.draw();
    }
  }

  handleTileInteractions() {
    if (this.tutorial?.isActive || this.descentTransitionActive) return;
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
        this.renderer.showVisualEffect("portal", this.player.x, this.player.y, 500);

        if (this.dungeon.isMerchantRoom && !this.inMerchantFloor) return;
        if (this.inMerchantFloor) {
          const destination = shortcutDestination(this.floor);
          const usingMap = this.player.hasShortcutMap && destination > this.floor + 1;
          if (usingMap) {
            const reward = shortcutGoldReward(this.floor);
            Object.assign(this.player, this.getShortcutResources(this.floor));
            if (this.stats) this.stats.goldCollected += reward;
            this.preserveShortcutResources = true;
            this.log(`Atajo: +${reward} PO.`);
          }
          this.floor = usingMap ? destination : this.floor + 1;
          if (usingMap) {
            this.player.hasShortcutMap = false;
            this.log(`Mapa usado. Destino: piso ${this.floor}.`);
          }
                this.inMerchantFloor = false;
          this.savePlayerProgressCheckpoint({ forceNewFloorDungeon: true, targetFloor: this.floor });
          this.showDescentTransition();
        } else {
          this.inMerchantFloor = true;
          this.savePlayerProgressCheckpoint({ forceNewFloorDungeon: true });
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
      // 1. Cinemática final (Piso 100)
      if (this.endingCinematic && this.endingCinematic.isActive) {
        if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen();
          e.preventDefault();
        } else if (e.key === "b" || e.key === "B") {
          if (!e.repeat) sounds.toggleMusicMute();
          e.preventDefault();
        } else if (e.key === "Escape") {
          this.endingCinematic.finish(true);
          e.preventDefault();
        } else if (["Enter", " ", "ArrowRight", "d", "D", "k", "K"].includes(e.key)) {
          if (!e.repeat) this.endingCinematic.advanceOrReveal();
          e.preventDefault();
        }
        return;
      }

      // 2. Pantalla de Victoria (Piso 100)
      if (this.isVictory) {
        if (["Enter", " ", "k", "K", "Escape"].includes(e.key)) {
          if (!e.repeat) this.resetGame();
          e.preventDefault();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen(true);
          e.preventDefault();
        }
        return;
      }

      // 3. Pantalla de Muerte / Derrota
      if (this.isGameOverTriggered || (this.deathScreen && !this.deathScreen.classList.contains("hidden"))) {
        if (["Enter", " ", "k", "K", "Escape", "r", "R"].includes(e.key)) {
          if (!e.repeat && this.deathScreen && !this.deathScreen.classList.contains("hidden")) {
            this.resetGame();
          }
          e.preventDefault();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen(true);
          e.preventDefault();
        }
        return;
      }

      // 4. Introducción narrativa
      if (this.isIntroActive()) {
        if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen();
          e.preventDefault();
        } else if (e.key === "b" || e.key === "B") {
          if (!e.repeat) sounds.toggleMusicMute();
          e.preventDefault();
        } else if (e.key === "Escape") {
          this.narrativeIntro.finish(true);
          e.preventDefault();
        } else if (["Enter", " ", "ArrowRight", "d", "D", "k", "K"].includes(e.key)) {
          if (!e.repeat) this.narrativeIntro.advanceOrReveal();
          e.preventDefault();
        }
        return;
      }

      // 5. Modal de Partida Guardada / Suspendida
      if (this.isResumeModalOpen()) {
        if (["ArrowLeft", "ArrowUp", "a", "A", "w", "W"].includes(e.key)) {
          if (!e.repeat) this.moveResumeModalSelection(-1);
          e.preventDefault();
        } else if (["ArrowRight", "ArrowDown", "d", "D", "s", "S", "Tab"].includes(e.key)) {
          if (!e.repeat) this.moveResumeModalSelection(1);
          e.preventDefault();
        } else if (["Enter", " ", "k", "K"].includes(e.key)) {
          if (!e.repeat) this.activateSelectedResumeModalOption();
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

      if (this.tutorial?.isInstructionOpen() && !this.tutorial.isHelpModalOpen()) {
        if (["Enter", " "].includes(e.key) && !e.target.closest("button")) {
          e.preventDefault();
          if (!e.repeat) this.tutorial.closeInstruction();
        }
        return;
      }

      // 7. Menú del Juego / Pausa (#tutorial-help-modal)
      if (this.tutorial?.isHelpModalOpen()) {
        if (["ArrowLeft", "ArrowUp", "a", "A", "w", "W"].includes(e.key)) {
          if (!e.repeat) this.tutorial.moveHelpMenuSelection(-1);
          e.preventDefault();
        } else if (["ArrowRight", "ArrowDown", "d", "D", "s", "S", "Tab"].includes(e.key)) {
          if (!e.repeat) this.tutorial.moveHelpMenuSelection(1);
          e.preventDefault();
        } else if (["Enter", " ", "k", "K"].includes(e.key)) {
          if (!e.repeat) this.tutorial.activateSelectedHelpMenuButton();
          e.preventDefault();
        } else if (["Escape", "m", "M", "Backspace"].includes(e.key)) {
          if (!e.repeat) this.tutorial.closeHelpModal();
          e.preventDefault();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.repeat) this.toggleFullscreen(true);
          e.preventDefault();
        } else if (e.key === "b" || e.key === "B") {
          if (!e.repeat) sounds.toggleMusicMute();
          e.preventDefault();
        }
        return;
      }

      // 8. Tienda del Mercader (#shop-modal)
      // En la tienda, Escape conserva su función relacionada con salir de pantalla completa;
      // para salir de la tienda con teclado se selecciona la opción visible "CERRAR TIENDA" y se confirma con Enter.
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
          case "a":
          case "A":
          case "d":
          case "D":
            if (!e.repeat) {
              const step = e.key === "ArrowLeft" ? -1 : 1;
              const nextView = SHOP_VIEWS[(SHOP_VIEWS.indexOf(this.activeShopView) + step + SHOP_VIEWS.length) % SHOP_VIEWS.length];
              this.setShopView(nextView, false);
            }
            e.preventDefault();
            break;
          case "Enter":
          case " ":
          case "k":
          case "K":
            if (!e.repeat) {
              const focusedTab = e.target?.closest?.("[data-shop-view]");
              if (focusedTab) focusedTab.click();
              else this.purchaseSelectedShopItem();
            }
            e.preventDefault();
            break;
          case "f":
          case "F":
            if (!e.repeat) this.toggleFullscreen(true);
            e.preventDefault();
            break;
          case "Escape":
            if (!e.repeat && this.isFullscreenActive()) {
              this.toggleFullscreen(true);
            }
            break;
        }
        return;
      }

      // 9. Diálogo del Mercader / Lior (#merchant-dialog-modal)
      if (this.isPausedForDialog) {
        if (["Enter", " ", "Escape", "k", "K", "e", "E"].includes(e.key)) {
          if (!e.repeat) {
            this.shopClosingCooldown = performance.now() + 180;
            this.dismissMerchantDialog();
          }
          e.preventDefault();
        }
        return;
      }

      // Guard contra pulsaciones residuales justo al cerrar un menú o tienda
      if (performance.now() < this.shopClosingCooldown) {
        e.preventDefault();
        return;
      }

      if (this.keyboardSpellAim) {
        const direction = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3 }[e.key];
        if (direction != null) {
          if (this.keyboardSpellAim === "j") this.setEldritchBlastPreview(direction);
          else this.setMistyStepPreview(direction);
          e.preventDefault();
          return;
        }
        if (e.key === "Escape") {
          this.finishKeyboardSpellAim(false);
          e.preventDefault();
          return;
        }
        if (["j", "l"].includes(e.key.toLowerCase())) return;
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
          if (!e.repeat) this.beginKeyboardSpellAim("l");
          break;
        case "j":
        case "J":
          if (!e.repeat) this.beginKeyboardSpellAim("j");
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
          if (this.isFullscreenActive()) {
            if (!e.repeat) this.toggleFullscreen(true);
          } else if (this.tutorial?.isActive) {
            if (!e.repeat) this.tutorial.skipTutorial();
          } else {
            if (!e.repeat) this.tutorial?.openHelpModal();
          }
          break;
      }
    });
    window.addEventListener("keyup", e => {
      if (this.keyboardSpellAim && e.key.toLowerCase() === this.keyboardSpellAim) this.finishKeyboardSpellAim(true);
    });
    window.addEventListener("blur", () => this.finishKeyboardSpellAim(false));
  }

  beginKeyboardSpellAim(key) {
    if (this.tutorial?.allowsStep(key === "j" ? 3 : 4) === false) return;
    if (this.isGameplayBlocked()) return;
    this.keyboardSpellAim = key;
    if (key === "j") this.setEldritchBlastPreview(this.player.direction);
    else this.setMistyStepPreview(this.player.direction);
  }

  finishKeyboardSpellAim(cast) {
    const key = this.keyboardSpellAim;
    if (!key) return;
    this.keyboardSpellAim = null;
    const destination = this.mistyStepPreview;
    const prepared = key === "j" ? this.player.isBlastReady()
      : !!destination && !destination.blocked && !destination.canceled;
    if (key === "j") this.setEldritchBlastPreview(null);
    else this.setMistyStepPreview(null);
    if (!cast) return;
    if (key === "j") this.castEldritchBlast(prepared);
    else this.castMistyStep(destination?.steps || 8, destination?.dirVec || null, prepared);
  }

  startGamepadLoop() {
    this.lastGamepadAxes = { x: 0, y: 0 };
    this.lastGamepadButtons = [];

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      let gp = null;
      for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && gamepads[i].connected !== false) { gp = gamepads[i]; break; }
      }

      if (gp) {
        const mapping = gp.mapping || "standard";
        if (mapping !== this.gamepadMapping) {
          this.gamepadMapping = mapping;
          if (this.controlDevice === "gamepad") this.updateButtonLabels();
        }
        // Zona muerta de 0.35 para navegación y movimiento, y 0.45 para cambio automático de dispositivo
        // (evita que un leve drift del stick cambie las indicaciones constantemente mientras se usa el teclado)
        const threshold = 0.35;
        const switchThreshold = 0.45;
        const rawAxisX = gp.axes[0] || 0;
        const rawAxisY = gp.axes[1] || 0;
        const axisX = Math.abs(rawAxisX) >= threshold ? Math.sign(rawAxisX) : 0;
        const axisY = Math.abs(rawAxisY) >= threshold ? Math.sign(rawAxisY) : 0;
        const strongAxisActivity = Math.abs(rawAxisX) >= switchThreshold || Math.abs(rawAxisY) >= switchThreshold;
        const btnStates = gp.buttons.map(button => !!button?.pressed);
        if (gp.axes.some(axis => Math.abs(axis) >= threshold) || btnStates.some(Boolean)) {
          this.easterEgg?.noteGamepadActivity();
        }
        if (strongAxisActivity || btnStates.some(Boolean)) {
          this.userExplicitlyUsedKeyboard = false;
          if (this.controlDevice !== "gamepad") {
            this.setControlDevice("gamepad");
          }
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
        const pressedA = pressedThisFrame(gamepadActions.attack.index);
        const pressedB = pressedThisFrame(gamepadActions.mist.index);
        const pressedX = pressedThisFrame(gamepadActions.blast.index);
        const pressedY = pressedThisFrame(gamepadActions.weapon.index);
        const pressedLB = pressedThisFrame(4);
        const pressedRB = pressedThisFrame(5);
        const pressedView = pressedThisFrame(8);
        const pressedStart = pressedThisFrame(9);

        if (this.easterEgg?.active) {
          // Input dismisses the scene before control returns to gameplay.
        } else if (this.endingCinematic && this.endingCinematic.isActive) {
          if (pressedA || movedX) this.endingCinematic.advanceOrReveal();
          if (pressedB || pressedStart) this.endingCinematic.finish(true);
        } else if (this.isVictory) {
          if (pressedA || pressedStart) this.resetGame();
        } else if (this.isGameOverTriggered || (this.deathScreen && !this.deathScreen.classList.contains("hidden"))) {
          if ((pressedA || pressedStart) && this.deathScreen && !this.deathScreen.classList.contains("hidden")) {
            this.resetGame();
          }
        } else if (this.isIntroActive()) {
          if (pressedA || (movedX && inputX > 0)) this.narrativeIntro.advanceOrReveal();
          if (pressedB || pressedStart) this.narrativeIntro.finish(true);
        } else if (this.isResumeModalOpen()) {
          if (movedX || movedY) this.moveResumeModalSelection((inputX < 0 || inputY < 0) ? -1 : 1);
          if (pressedA || pressedStart) this.activateSelectedResumeModalOption();
          if (pressedB && this.resumeModalMode === "suspend") this.resumeFromSavedGame();
        } else if (this.tutorial?.isHelpModalOpen()) {
          if (movedX || movedY) this.tutorial.moveHelpMenuSelection((inputX < 0 || inputY < 0) ? -1 : 1);
          if (pressedA) this.tutorial.activateSelectedHelpMenuButton();
          if (pressedB || pressedStart) this.tutorial.closeHelpModal();
        } else if (this.tutorial?.isInstructionOpen()) {
          if (pressedA) this.tutorial.closeInstruction();
          if (pressedB) this.tutorial.skipTutorial();
        } else if (this.isShopOpen()) {
          if (movedY) this.moveShopSelection(inputY < 0 ? -1 : 1);
          if (movedX || pressedLB || pressedRB) {
            this.setShopView(SHOP_VIEWS[(SHOP_VIEWS.indexOf(this.activeShopView) + 1) % SHOP_VIEWS.length], false);
          }
          if (pressedA) this.purchaseSelectedShopItem();
          if (pressedB || pressedStart) this.closeShop();
        } else if (this.isPausedForDialog) {
          if (pressedA || pressedB || pressedStart) {
            this.shopClosingCooldown = performance.now() + 180;
            this.dismissMerchantDialog();
          }
        } else if (performance.now() < this.shopClosingCooldown) {
          // Cooldown breve tras cerrar menús para evitar disparos o pasos accidentales
        } else if (pressedStart) {
          this.tutorial?.openHelpModal();
        } else if (this.isAnimatingTurn) {
          // Espera a que terminen los proyectiles en vuelo
        } else if (this.player.stunned && (movedY || movedX
          || pressedA
          || pressedB
          || pressedX
          || pressedY
          || pressedLB
          || pressedRB)) {
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

          if (pressedA) CombatSystem.executeAttack(this);
          if (pressedB) this.castMistyStep(8);
          if (pressedX) this.castEldritchBlast();
          if (pressedY || pressedLB || pressedRB) this.cycleWeapon();
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

    splashScreen.classList.remove("show");
    splashScreen.classList.add("fade-out");
    setTimeout(() => {
      splashScreen.hidden = true;
      splashScreen.style.display = "none";
      requestAnimationFrame(() => {
        new GameController({ playNarrativeIntro: true });
      });
    }, SPLASH_FADE_MS);
  }

  sounds.preloadMidiTrack("intro");
  sounds.playLogoJingle();
  requestAnimationFrame(() => splashLogo?.classList.add("show"));
  stayTimer = setTimeout(startGame, SPLASH_FADE_MS + SPLASH_STAY_MS);

  splashScreen.addEventListener("click", () => startGame(true));
  splashScreen.addEventListener("touchstart", () => startGame(true), { passive: true });
  window.addEventListener("keydown", (e) => {
    if (["Enter", " ", "Escape", "k", "K"].includes(e.key)) {
      startGame(true);
    }
  }, { once: true });
});