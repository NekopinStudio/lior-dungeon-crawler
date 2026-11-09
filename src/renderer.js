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
    for (const { folder, directions } of [...Object.values(LIOR_ACTION_ATLASES), ...Object.values(LIOR_MOTION)]) {
      for (const direction of directions || ["north", "east", "south", "west"]) {
        this.loadTerrainTexture(`Assets/Lior/${folder}/lior_${folder.toLowerCase()}_${direction}.png`);
      }
    }
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
    this.worldVisualEffects = [];
    this.playerStatusVisuals = new Map();

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
    }, 50);
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
  async prepareBossPresentation(enemy) {
    this.bossPreparations ??= new WeakMap();
    if (this.bossPreparations.has(enemy)) return this.bossPreparations.get(enemy);
    const preparation = (async () => {
      const key = this.getEnemyArtKey(enemy);
      const atlasPaths = [ENEMY_DIRECTIONAL_ATLASES[enemy.spriteSrc], ENEMY_ACTION_ATLASES[key]?.src,
        this.getEnemyAttackMotion(enemy)].filter(Boolean);
      const atlases = [...new Set(atlasPaths)].map(src => this.loadTerrainTexture(src));
      const legacy = this.loadTerrainTexture(enemy.spriteSrc);
      let timeout;
      try {
        await Promise.race([
          Promise.allSettled([legacy, ...atlases].map(image => image.decode?.())),
          new Promise(resolve => { timeout = setTimeout(resolve, 8500); })
        ]);
      } finally {
        clearTimeout(timeout);
      }
      this.getEnemyAnimation(enemy.spriteSrc);
      for (const atlas of atlases) {
        if (!atlas.complete || atlas.naturalHeight !== 128 || atlas.naturalWidth % 384 !== 0) continue;
        for (let x = 0; x < atlas.naturalWidth; x += 128) {
          this.getKeyedSprite(atlas, { x, y: 0, w: 128, h: 128 }, "alpha", { trim: true });
        }
      }
    })();
    this.bossPreparations.set(enemy, preparation);
    return preparation;
  }

  async startLargeEnemyPresentation(enemy, floorNumber = 1) {
    if (!enemy || enemy.introPresented || this.pendingBossPresentation === enemy) return;
    if (!sounds.isBossRoarEligible(enemy, floorNumber, { ignorePlayed: false })) return;
    const dungeon = this.dungeon;
    this.pendingBossPresentation = enemy;
    try {
      await this.prepareBossPresentation(enemy);
      await new Promise(resolve => requestAnimationFrame(resolve));
    } finally {
      if (this.pendingBossPresentation === enemy) this.pendingBossPresentation = null;
    }
    if (this.dungeon !== dungeon || enemy.hp <= 0 || this.game?.floor !== floorNumber) return;
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
      lastFrameAt: now,
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
      // Preserve the pan when a slow frame stalls rendering.
      pres.startedAt += Math.max(0, now - pres.lastFrameAt - 50);
      pres.lastFrameAt = now;
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

  getLiorRow(name, count = 0, atlasName = name) {
    const direction = ["north", "east", "south", "west"][this.getLiorFacing()];
    const motion = LIOR_MOTION[atlasName];
    if (motion?.directions.includes(direction)) {
      const atlas = this.loadTerrainTexture("Assets/Lior/" + motion.folder + "/lior_" + motion.folder.toLowerCase() + "_" + direction + ".png");
      if (atlas.complete && atlas.naturalWidth === 128 * motion.frames && atlas.naturalHeight === 128) {
        return Array.from({ length: motion.frames }, (_, index) => ({
          atlas, motion: true, x: 128 * index, y: 0, w: 128, h: 128
        }));
      }
    }
    const action = LIOR_ACTION_ATLASES[atlasName];
    const animation = action?.folder ?? (name === "IDLE" ? "Idle" : name === "WALK" ? "Walk" : null);
    if (animation && direction) {
      const atlas = this.loadTerrainTexture(`Assets/Lior/${animation}/lior_${animation.toLowerCase()}_${direction}.png`);
      const frameCount = action?.frames ?? (animation === "Idle" ? 4 : 6);
      if (atlas.complete && atlas.naturalWidth === 128 * frameCount && atlas.naturalHeight === 128) {
        return Array.from({ length: count || frameCount }, (_, i) => ({
          atlas, x: 128 * (action && count === 6 ? [0, 1, 2, 2, 3, 3][i] : Math.floor(i * frameCount / (count || frameCount))),
          y: 0, w: 128, h: 128
        }));
      }
    }
    const frames = LIOR_FACING_FRAMES[this.getLiorFacing()]?.[name] ?? LIOR_SPRITES[name];
    if (!frames) return [];
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
      if (this.textureRedrawPending || this.game?.isIntroActive() || this.game?.descentTransitionActive) return;
      this.textureRedrawPending = true;
      requestAnimationFrame(() => {
        this.textureRedrawPending = false;
        if (!this.game?.isIntroActive() && !this.game?.descentTransitionActive) this.draw();
      });
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
        const allGaps = [];
        for (let i = 1; i < rowFrames.length; i++) {
          const prevEnd = rowFrames[i - 1].sheetX1 ?? 0;
          const curStart = rowFrames[i].sheetX0 ?? 0;
          allGaps.push({ index: i, gap: Math.max(1, curStart - prevEnd) });
        }
        // Exigir al menos 2 fotogramas por sección (i >= 2 y i <= rowFrames.length - 2)
        // para que un último fotograma aislado (ej. Fila 0 de 1. kobold.jpg) no mezcle IDLE con WALK.
        const validGaps = allGaps.filter(g => g.index >= 2 && g.index <= rowFrames.length - 2);
        if (validGaps.length === 0) return null;
        const sortedGaps = allGaps.map(g => g.gap).sort((a, b) => a - b);
        const medianGap = sortedGaps[Math.floor(sortedGaps.length / 2)] || 1;
        const maxGapObj = validGaps.reduce((best, cur) => (cur.gap > best.gap ? cur : best), validGaps[0]);
        if (maxGapObj && maxGapObj.gap >= Math.max(90, medianGap * 1.9)) {
          return {
            left: rowFrames.slice(0, maxGapObj.index),
            right: rowFrames.slice(maxGapObj.index)
          };
        }
        return null;
      };

      // Construye un ciclo ping-pong suave (ej. [0, 1, 2] -> [0, 1, 2, 1]) para que las animaciones
      // de respiración, batido de alas, tentáculos y caminata no salten bruscamente del último al primer fotograma.
      const buildPingPongFrames = (frames) => {
        if (!frames || frames.length !== 3) return frames;
        return [frames[0], frames[1], frames[2], frames[1]];
      };

      const rawIdleRow = rows[0];
      const idleSplit = splitRowBySectionGap(rawIdleRow);
      const idle = idleSplit
        ? idleSplit.left
        : (rawIdleRow.length >= 6 ? rawIdleRow.slice(0, 3) : rawIdleRow);
      const idleExtra = idleSplit
        ? idleSplit.right
        : (rawIdleRow.length >= 6 ? rawIdleRow.slice(3) : null);

      let move = idle;
      let taunt = idleExtra || idle;
      let hasDedicatedMove = false;
      let hasDedicatedTaunt = !!(idleExtra && idleExtra.length > 0);
      let attack = idle;
      let hurt = idle;
      let death = idle;

      if (rows.length >= 4) {
        // Hojas de 4 filas (ej. 1. roc.jpg y megajefes 4x4: Fila 0=Idle, Fila 1=Movement/Alas/Tentáculos, Fila 2=Attack+Hurt, Fila 3=Death)
        if (rows[1] && rows[1].length > 0) {
          const row1Split = splitRowBySectionGap(rows[1]);
          move = row1Split ? row1Split.left : rows[1];
          hasDedicatedMove = true;
          if (row1Split && row1Split.right?.length > 0 && !hasDedicatedTaunt) {
            taunt = row1Split.right;
            hasDedicatedTaunt = true;
          }
        }
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
        if (attackSplit) {
          // En hojas de 3 filas con 2 bloques en Fila 1 (ej. 1. ogre.png), la izquierda es WALK/MOVEMENT y la derecha es ATTACK
          if (attackSplit.left && attackSplit.left.length > 0) {
            move = attackSplit.left;
            hasDedicatedMove = true;
          }
          attack = attackSplit.right;
        } else {
          attack = rawAttackRow;
          if (idleExtra && idleExtra.length > 0) {
            // En hojas de 3 filas donde Fila 0 derecha es WALK (ej. 1. kobold.jpg)
            move = idleExtra;
            hasDedicatedMove = true;
          }
        }

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

      const refPool = hasDedicatedMove ? [...idle, ...move] : idle;
      const smoothIdle = buildPingPongFrames(idle);
      const smoothMove = buildPingPongFrames(move);
      const smoothTaunt = buildPingPongFrames(taunt);
      animation = {
        idle: smoothIdle,
        rawIdle: idle,
        move: smoothMove,
        rawMove: move,
        taunt: smoothTaunt,
        hasDedicatedMove,
        hasDedicatedTaunt,
        attack,
        hurt,
        death,
        refWidth: Math.max(...refPool.map(f => f.width)),
        refHeight: Math.max(...refPool.map(f => f.height))
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
    if (!enemy || ["death", "reassemble"].includes(enemy.anim?.state)) return;
    if (state === "move" && enemy.anim && (enemy.anim.state === "attack" || enemy.anim.state === "hurt")) {
      return;
    }
    if (state === "attack" || state === "hurt") {
      this.orientEnemyTowardsPlayer(enemy, this.player);
    }
    const frameMs = ENEMY_ANIM_MS[state] || ENEMY_ANIM_MS.idle;
    enemy.anim = { state, startedAt: performance.now() };
    if (state === "reassemble") {
      const frames = this.getEnemyAnimation(enemy.spriteSrc)?.death.length || 4;
      const duration = frames * 2 * ENEMY_ANIM_MS.death;
      this.enemySequenceUntil = Math.max(this.enemySequenceUntil || 0, performance.now() + duration);
      this.keepAnimating(duration + 50);
      return;
    }
    this.keepAnimating(frameMs * 8);
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

  showVisualEffect(key, x, y, duration = 360, angle = 0, phase = 0, delay = 0) {
    if (!EFFECT_SHEETS[key]?.alpha) return;
    this.worldVisualEffects.push({ key, x, y, duration, angle, phase, startedAt: performance.now() + delay });
    this.keepAnimating(duration + delay);
  }

  drawWorldVisualEffects(targetCtx, now) {
    this.worldVisualEffects = this.worldVisualEffects.filter(effect => now - effect.startedAt < effect.duration);
    const tileSize = CAMERA_CONFIG.tileSize;
    for (const effect of this.worldVisualEffects) {
      if (now < effect.startedAt) continue;
      const sprite = this.getEffectSprite(effect.key, effect.phase);
      if (!sprite) continue;
      const progress = Math.max(0, (now - effect.startedAt) / effect.duration);
      const { screenX, screenY } = CameraTransformer.worldToScreen(effect.x, effect.y, this.player);
      const scale = tileSize * (0.45 + progress * 0.5) / Math.max(sprite.width, sprite.height);
      const w = Math.round(sprite.width * scale), h = Math.round(sprite.height * scale);
      targetCtx.save();
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.globalAlpha = Math.min(1, progress * 10, (1 - progress) * 3);
      targetCtx.translate((screenX + 0.5) * tileSize, (screenY + 0.5) * tileSize);
      targetCtx.rotate(effect.angle);
      targetCtx.drawImage(sprite, -w / 2, -h / 2, w, h);
      targetCtx.restore();
    }
  }

  drawPlayerStatusVisuals(targetCtx, px, py, tileSize, now) {
    const states = {
      poison: this.player.poisonTurns > 0, blindness: this.player.blindTurns > 0,
      curse: !!this.player.cursedHealing, stun: !!this.player.stunned,
      antimagic: !!this.player.antimagicCritLock, blessed: (this.player.blessedAmmoCharges || 0) > 0
    };
    let visible = 0;
    for (const [key, active] of Object.entries(states)) {
      let state = this.playerStatusVisuals.get(key);
      if (!state || state.active !== active) {
        state = { active, changedAt: now, wasActive: !!state?.active };
        this.playerStatusVisuals.set(key, state);
        if (active || state.wasActive) this.keepAnimating(330);
      }
      const age = now - state.changedAt;
      if (!active && age >= 330) continue;
      if (!active && !state.wasActive) continue;
      if (active) state.wasActive = true;
      const phase = active ? (age < 332 ? "apply" : "persist") : "clear";
      const frame = phase === "persist" ? Math.floor(age / 83) % 4 : Math.min(3, Math.floor(age / 83));
      const special = { antimagic: "blind", blessed: "radiant" }[key];
      const sprite = special ? this.getEffectSprite(special, 0) : this.getEffectSprite("status-" + key + "-" + phase, frame);
      if (!sprite) continue;
      const scale = tileSize * 0.40 / Math.max(sprite.width, sprite.height);
      const w = Math.round(sprite.width * scale), h = Math.round(sprite.height * scale);
      targetCtx.save();
      targetCtx.globalAlpha = 0.9;
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(sprite, px + tileSize * (0.14 + visible * 0.22) - w / 2, py - tileSize * 0.58 - h / 2, w, h);
      targetCtx.restore();
      visible++;
    }
  }

  showFloatingNumber(x, y, text, type, isCritical = false) {
    const effect = isCritical ? "critical" : ({ gold: "coin", healing: "heal", shield: text.startsWith("+") ? "shield" : "shieldbreak" })[type];
  if (effect) this.showVisualEffect(effect, x, y);
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
      if (state.state === "reassemble") {
        const frames = animation.death;
        const index = Math.floor((now - state.startedAt) / ENEMY_ANIM_MS.death);
        if (index < frames.length * 2) return frames[Math.min(index, frames.length * 2 - index - 1)];
        enemy.anim = null;
        return animation.idle[0];
      }
      const frames = animation[state.state] || animation.idle;
      const frameMs = ENEMY_ANIM_MS[state.state] || ENEMY_ANIM_MS.idle;
      const index = Math.floor((now - state.startedAt) / frameMs);
      if (index < frames.length) return frames[index];
      if (state.state === "death") return frames[frames.length - 1];
      if (state.state === "attack" && (this.getEquippedEnemyAtlas(enemy) || this.getEnemyAttackMotion(enemy)) && now - state.startedAt < 4 * ENEMY_ANIM_MS.attack) {
        return frames[frames.length - 1];
      }
      enemy.anim = null;
    }
    enemy.animOffset ??= Math.random() * 1000;
    const elapsed = now + enemy.animOffset;

    // Los Mega-Jefes 4x4 (especialmente alados o con tentáculos: Roc, Kraken, Beholder, Gusano, Balor y Dragones)
    // intercalan su fila de MOVEMENT (batir de alas / ondulación de tentáculos) dentro de su ciclo base
    // y la intensifican cuando están cargando su próximo ataque (bossAttackReady).
    if (enemy.isMegaBoss && animation.hasDedicatedMove && animation.move?.length > 0) {
      const isWingedOrTentacled = [1, 4, 6, 7, 8, 9, 10].includes(enemy.originTier || 1);
      const idleLen = Math.max(1, animation.idle.length);
      const moveLen = Math.max(1, animation.move.length);
      const cycleRepeats = (isWingedOrTentacled && enemy.bossAttackReady) ? 1 : 2;
      const totalCycleSteps = idleLen * cycleRepeats + moveLen;
      const stepIndex = Math.floor(elapsed / ENEMY_ANIM_MS.idle) % totalCycleSteps;
      if (stepIndex >= idleLen * cycleRepeats) {
        return animation.move[(stepIndex - idleLen * cycleRepeats) % moveLen];
      }
      return animation.idle[stepIndex % idleLen];
    }

    if (enemy.isBoss && animation.hasDedicatedTaunt && animation.taunt?.length > 0) {
      const idleLen = Math.max(1, animation.idle.length);
      const tauntLen = Math.max(1, animation.taunt.length);
      const totalCycleSteps = idleLen * 4 + tauntLen;
      const stepIndex = Math.floor(elapsed / ENEMY_ANIM_MS.idle) % totalCycleSteps;
      if (stepIndex >= idleLen * 4) {
        return animation.taunt[(stepIndex - idleLen * 4) % tauntLen];
      }
    }

    return animation.idle[Math.floor(elapsed / ENEMY_ANIM_MS.idle) % animation.idle.length];
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
    const art = ENEMY_PROJECTILE_ART[this.getEnemyArtKey(enemy)];
    this.enemyProjectiles.push({ caliber, art, from, to, hit, launchAt, travelMs });
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
        const sprite = this.getEffectSprite(shot.art, 0) || this.getProjectileSprite(shot.caliber, 1);
        if (!drawSprite(sprite, center, size, angle)) {
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
    return this.getKeyedSprite(image, rect, config.alpha ? "alpha" : "magenta", { trim: config.trim });
  }

  getEnemyArtKey(enemy) {
    const src = ENEMY_DIRECTIONAL_ATLASES[enemy.spriteSrc];
    return src?.split("/").pop()?.replace(/\.png$/, "");
  }

  getEquippedEnemyAtlas(enemy) {
    const role = enemy.ranged ? "ranged" : "melee";
    return ENEMY_EQUIPPED[this.getEnemyArtKey(enemy)]?.[role];
  }

  getEnemyAttackMotion(enemy) {
    const role = enemy.isMegaBoss ? "boss" : enemy.ranged ? "ranged" : "melee";
    return ENEMY_MOTION[this.getEnemyArtKey(enemy)]?.[role];
  }

  getEnemyWalkMotion(enemy) {
    const role = enemy.isMegaBoss ? "boss" : enemy.ranged ? "ranged" : "melee";
    return ENEMY_WALK_MOTION[this.getEnemyArtKey(enemy)]?.[role];
  }

  getEnemyRenderMetrics(enemy, animation, drawSize) {
    const wide = enemy.size >= 2 && animation?.refWidth > animation.refHeight * 1.3;
    const scale = animation
      ? Math.min(drawSize * (wide ? 1.14 : 1.04) / animation.refWidth, drawSize * 1.04 / animation.refHeight)
      : 1;
    return { wide, scale, height: animation ? animation.refHeight * scale : drawSize * 1.04 };
  }

  drawEnemyDirectionalPose(targetCtx, enemy, px, py, drawSize, tileSize, animation) {
    const base = ENEMY_DIRECTIONAL_ATLASES[enemy.spriteSrc];
    if (!base) return false;
    const isWarlord = base === OGRE_WARLORD_ATLAS;
    const state = enemy.anim?.state;
    if (state === "reassemble" || (state === "taunt" && enemy.name === "Minotauro")) return false;
    const equipped = state !== "death" ? this.getEquippedEnemyAtlas(enemy) : null;
    const step = enemy.moveInterp;
    const inMotion = !!step && performance.now() < step.until;
    const walking = !equipped && state === "move" ? ENEMY_WALK_RENEWED[this.getEnemyArtKey(enemy)] : null;
    const renewed = ENEMY_ACTION_ATLASES[this.getEnemyArtKey(enemy)];
    const phaseTwo = !!enemy.phaseTwoTriggered && renewed?.category === "phase2";
    const attackMotion = state === "attack" && !phaseTwo ? this.getEnemyAttackMotion(enemy) : null;
    const attackAtlas = attackMotion ? this.loadTerrainTexture(attackMotion) : null;
    const motionReady = attackAtlas?.complete && attackAtlas.naturalWidth === 1536 && attackAtlas.naturalHeight === 128;
    const walkingMotion = inMotion && !phaseTwo && !["attack", "hurt", "death"].includes(state) ? this.getEnemyWalkMotion(enemy) : null;
    const walkAtlas = walkingMotion ? this.loadTerrainTexture(walkingMotion) : null;
    const walkReady = walkAtlas?.complete && walkAtlas.naturalWidth === 2304 && walkAtlas.naturalHeight === 128;
    const useAction = renewed && (phaseTwo
      ? !state || ["idle", "move", "attack", "taunt"].includes(state) || isWarlord
      : renewed.category !== "phase2" && state === "attack");
    if (!motionReady && !walkReady && !equipped && !walking && !isWarlord && !useAction) return false;

    const armedPose = equipped && !useAction && !motionReady && !walkReady;
    const atlas = motionReady ? attackAtlas : walkReady ? walkAtlas : this.loadTerrainTexture(armedPose ? equipped : walking || (useAction ? renewed.src : base));
    const framesPerDirection = walkReady ? 6 : motionReady || armedPose || walking || useAction || isWarlord ? 4 : 1;
    if (!atlas.complete || atlas.naturalWidth !== 384 * framesPerDirection || atlas.naturalHeight !== 128) {
      return false;
    }

    const { minX, maxX } = Renderer.getEnemyHorizontalBounds(enemy);
    const movingPose = walkReady || (armedPose ? inMotion && state !== "hurt" : state === "move" && !!step);
    const moveDx = movingPose ? enemy.x - step.fromX : 0;
    const direction = movingPose
      ? Math.sign(moveDx)
      : this.player.x < minX ? -1 : this.player.x > maxX ? 1 : 0;
    const row = direction < 0 ? 2 : direction > 0 ? 1 : 0;
    const elapsed = enemy.anim ? Math.max(0, performance.now() - enemy.anim.startedAt) : 0;
    const stepProgress = step ? Math.max(0, Math.min(1, (performance.now() - step.startedAt) / step.duration)) : 0;
    let phase = walkReady ? Math.min(5, Math.floor(stepProgress * 6)) : walking ? Math.min(3, Math.floor(stepProgress * 4)) : 0;
    if (armedPose && movingPose) {
      phase = 1 + Math.min(2, Math.floor(3 * stepProgress));
    }
    if (framesPerDirection === 4 && (state === "attack" || (phaseTwo && state === "taunt"))) {
      const frame = Math.min(3, Math.floor(elapsed / ENEMY_ANIM_MS.attack));
      phase = !motionReady && useAction && renewed.category === "minion"
        ? (enemy.ranged ? 2 : 0) + Math.floor(frame / 2)
        : frame;
    }
    // Keep one scale per directional strip, independent of the current frame.
    const strip = Array.from({ length: framesPerDirection }, (_, index) => this.getKeyedSprite(
      atlas, { x: (row * framesPerDirection + index) * 128, y: 0, w: 128, h: 128 }, "alpha", { trim: true }
    ));
    const sprite = strip[phase];
    const referenceHeight = Math.max(...strip.map(frame => frame.height));
    const metrics = this.getEnemyRenderMetrics(enemy, animation, drawSize);
    const scale = metrics.height / referenceHeight;
    const width = Math.round(sprite.width * scale);
    const height = Math.round(sprite.height * scale);
    const centerX = px + drawSize / 2;
    const baseY = metrics.wide ? py + (drawSize - metrics.height) * .55 + metrics.height : py + drawSize;
    const idle = (armedPose || isWarlord) && !inMotion && (!state || state === "idle");
    const bob = idle ? Math.round(Math.sin(performance.now() / 270 + enemy.x * 7 + enemy.y * 3)) : 0;

    targetCtx.save();
    targetCtx.imageSmoothingEnabled = false;
    if (isWarlord && state === "death") targetCtx.globalAlpha *= Math.max(0, 1 - elapsed / 500);
    targetCtx.fillStyle = "rgba(0, 0, 0, 0.38)";
    targetCtx.beginPath();
    targetCtx.ellipse(centerX, baseY, drawSize * 0.32, drawSize * 0.11, 0, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.drawImage(sprite, Math.round(centerX - sprite.footAnchorX * scale),
      Math.round(baseY - height + bob), width, height);
    targetCtx.restore();
    this.drawEnemyStatusAndHealthOverlay(targetCtx, enemy, px, py, drawSize, tileSize, py);
    return true;
  }

  drawEnemySprite(targetCtx, enemy, px, py) {
    if (!enemy.anim && enemy.hp > 0 && !document.hidden && this.game &&
        !this.game.isGameplayBlocked() && !this.enemyIdleRedraw) {
      this.enemyIdleRedraw = setTimeout(() => {
        this.enemyIdleRedraw = null;
        if (!document.hidden && !this.game.isGameplayBlocked()) this.draw();
      }, 120);
    }
    const animation = this.getEnemyAnimation(enemy.spriteSrc);
    const tileSize = CAMERA_CONFIG.tileSize;
    const drawSize = enemy.size * tileSize;

    if (enemy.anim && (enemy.anim.state === "attack" || enemy.anim.state === "hurt")) {
      this.orientEnemyTowardsPlayer(enemy, this.player);
    }

    if (!animation) {
      if (this.drawEnemyDirectionalPose(targetCtx, enemy, px, py, drawSize, tileSize)) return;
      targetCtx.fillStyle = enemy.isBoss ? "#cc0029" : "#ff3333";
      targetCtx.fillRect(px + 2, py + 2, drawSize - 4, drawSize - 4);
      return;
    }

    const sprite = this.getEnemyFrame(enemy, animation, performance.now());
    if (this.drawEnemyDirectionalPose(targetCtx, enemy, px, py, drawSize, tileSize, animation)) return;
    const { wide: isWideBoss, scale } = this.getEnemyRenderMetrics(enemy, animation, drawSize);
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
    const refScaledH = Math.round(animation.refHeight * scale);
    const refTopY = isWideBoss
      ? Math.round(py + (drawSize - refScaledH) * 0.55)
      : Math.round(py + drawSize - refScaledH);
    const headTopY = Math.min(py, drawY, refTopY);
    targetCtx.drawImage(sprite, drawX, drawY, width, height);
    targetCtx.restore();

    this.drawEnemyStatusAndHealthOverlay(targetCtx, enemy, px, py, drawSize, tileSize, headTopY);
  }

  drawEnemyStatusAndHealthOverlay(targetCtx, enemy, px, py, drawSize, tileSize, spriteTopY = py) {
    if (!enemy || enemy.hp <= 0 || enemy.anim?.state === "death") return;
    targetCtx.save();

    const safeHeadY = Math.min(py, spriteTopY ?? py);
    const barH = enemy.isMegaBoss ? 7 : 5;
    const barY = Math.round(safeHeadY - barH - 8);

    // Barra de vida elevada por encima de la cabeza para Mini-Jefes (2x2) y Mega-Jefes (4x4)
    if (enemy.isBoss && enemy.maxHp > 0) {
      const ratio = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
      const barW = Math.max(36, Math.round(drawSize * (enemy.isMegaBoss ? 0.86 : 0.78)));
      const barX = Math.round(px + (drawSize - barW) / 2);

      targetCtx.fillStyle = "rgba(5, 7, 15, 0.88)";
      targetCtx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);

      const isPhase2OrEnrage = (enemy.isMegaBoss && enemy.originTier === 10 && (enemy.solarPhase2Triggered || ratio <= 0.5))
        || (enemy.isMegaBoss && enemy.originTier === 8 && ratio <= 0.30);
      targetCtx.fillStyle = isPhase2OrEnrage
        ? "#fb923c"
        : (enemy.isMegaBoss ? "#e11d48" : "#ef4444");
      targetCtx.fillRect(barX, barY, Math.max(2, Math.round(barW * ratio)), barH);

      targetCtx.strokeStyle = isPhase2OrEnrage ? "#fde047" : "#fca5a5";
      targetCtx.lineWidth = 1;
      targetCtx.strokeRect(barX - 0.5, barY - 0.5, barW + 1, barH + 1);

      if (enemy.isMegaBoss) {
        targetCtx.font = "bold 9px monospace";
        targetCtx.textAlign = "center";
        targetCtx.textBaseline = "bottom";
        targetCtx.lineWidth = 2.5;
        targetCtx.strokeStyle = "#05070f";
        const phaseTag = isPhase2OrEnrage ? " 🔥FASE II" : (enemy.bossAttackReady ? " ⚡" : "");
        const hpLabel = `${enemy.hp}/${enemy.maxHp}${phaseTag}`;
        targetCtx.strokeText(hpLabel, px + drawSize / 2, barY - 2);
        targetCtx.fillStyle = isPhase2OrEnrage ? "#fde047" : "#ffe4e6";
        targetCtx.fillText(hpLabel, px + drawSize / 2, barY - 2);
      }
    }

    // Estados visibles con los recursos gráficos del bestiario.
    const statusBadges = [];
    if (enemy.stunned) {
      statusBadges.push({ ...STUN_STATUS_BADGE_STYLE });
    }
    if ((enemy.fearCooldown || 0) > 0) {
      statusBadges.push({
        effect: "panic",
        tag: `${enemy.fearCooldown}`,
        borderColor: "#38bdf8",
        bgColor: "rgba(6, 16, 30, 0.92)",
        textColor: "#bae6fd"
      });
    }
    if (statusBadges.length > 0) {
      const baseIconPx = Math.max(15, Math.round(tileSize * (enemy.isMegaBoss ? 0.48 : (enemy.isBoss ? 0.44 : 0.40))));
      const baseBottomY = enemy.isBoss
        ? (enemy.isMegaBoss ? barY - 14 : barY - 6)
        : (safeHeadY - 6);
      this.drawStatusBadgesRow(targetCtx, statusBadges, px + drawSize / 2, baseBottomY, baseIconPx);
    }

    targetCtx.restore();
  }

  drawStatusBadgesRow(targetCtx, statusBadges, centerX, baseBottomY, baseIconPx) {
    if (!statusBadges || statusBadges.length === 0) return;
    const nowMs = performance.now();
    const bob = Math.sin(nowMs / 140) * 2.5;
    const pulse = 1 + 0.06 * Math.sin(nowMs / 140);
    const badgeH = Math.round(baseIconPx + 6);
    const badgeGap = 4;
    const badgeWidths = statusBadges.map(b => Math.round(baseIconPx * (b.tag ? 1.75 : 1.35)));
    const totalRowW = badgeWidths.reduce((acc, w) => acc + w, 0) + badgeGap * (statusBadges.length - 1);
    const badgeTopY = Math.round(baseBottomY - badgeH + bob);
    let curX = Math.round(centerX - totalRowW / 2);

    statusBadges.forEach((badge, idx) => {
      const bw = badgeWidths[idx];
      const cx = curX + bw / 2;
      const cy = badgeTopY + badgeH / 2;

      targetCtx.save();
      targetCtx.translate(cx, cy);
      targetCtx.scale(pulse, pulse);

      // Placa gótica unificada de alto contraste para distinguir el estado sobre cualquier bioma o entidad
      targetCtx.fillStyle = badge.bgColor;
      targetCtx.strokeStyle = badge.borderColor;
      targetCtx.lineWidth = 1.8;
      targetCtx.beginPath();
      if (typeof targetCtx.roundRect === "function") {
        targetCtx.roundRect(-bw / 2, -badgeH / 2, bw, badgeH, 5);
      } else {
        targetCtx.rect(-bw / 2, -badgeH / 2, bw, badgeH);
      }
      targetCtx.fill();
      targetCtx.stroke();

      // Icono grande y nítido + contador/etiqueta compacta
      targetCtx.font = `bold ${baseIconPx}px monospace`;
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.lineWidth = 3;
      targetCtx.strokeStyle = "#04060e";
      const iconOffsetX = badge.tag ? -Math.round(bw * 0.14) : 0;
      const icon = this.getEffectSprite(badge.effect, 0);
      if (icon) targetCtx.drawImage(icon, iconOffsetX - baseIconPx / 2, -baseIconPx / 2, baseIconPx, baseIconPx);

      if (badge.tag) {
        const tagFontPx = Math.max(9, Math.round(baseIconPx * 0.56));
        targetCtx.font = `bold ${tagFontPx}px monospace`;
        const tagX = Math.round(bw * 0.24);
        targetCtx.strokeText(badge.tag, tagX, 1);
        targetCtx.fillStyle = badge.textColor;
        targetCtx.fillText(badge.tag, tagX, 1);
      }

      targetCtx.restore();
      curX += bw + badgeGap;
    });
  }

  drawGoldenBunny(targetCtx, bunny, screenX, screenY) {
    if (!this.goldenBunnySheet) {
      this.goldenBunnySheet = this.loadTerrainTexture("Assets/Enemy/Golden-bunny.jpg");
    }
    const fleeing = bunny.isFleeing;
    const idleFrames = BUNNY_SPRITES.bunnyIdleFrames || [BUNNY_SPRITES.bunnyIdle];
    const frame = fleeing
      ? BUNNY_SPRITES.bunnyFlee[Math.floor((performance.now() - bunny.fleeStartedAt) / 120) % BUNNY_SPRITES.bunnyFlee.length]
      : idleFrames[Math.floor(performance.now() / 240) % idleFrames.length];
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
  getLiorIdlePose(now, busy) {
    const eligible = !busy && this.player.hp > 0 && !this.player.stunned &&
      !document.hidden && this.game && !this.game.isGameplayBlocked() &&
      (this.player.moveInterp?.until ?? 0) <= now;
    const signature = this.player.x + "," + this.player.y + "," + this.player.direction;
    if (!eligible || this.idlePlayer !== this.player || this.idlePosition !== signature) {
      clearTimeout(this.idleRedraw);
      this.idleRedraw = null;
      this.idleSince = now;
      this.idlePosition = signature;
      this.idlePlayer = this.player;
    }
    if (!eligible) return null;

    const row = this.getLiorRow("PET_IDLE");
    if (!row[0]?.atlas) return null;
    const elapsed = now - this.idleSince;
    const petTime = elapsed - 5000;
    const petFrameMs = row.length > 4 ? 230 : 650;
    const petting = petTime >= 0;
    const delay = petting ? petFrameMs - petTime % petFrameMs
      : Math.min(480 - elapsed % 480, 5000 - elapsed);
    if (!this.idleRedraw) {
      this.idleRedraw = setTimeout(() => {
        this.idleRedraw = null;
        if (!document.hidden) this.draw();
      }, Math.max(16, delay));
    }
    if (petting) {
      const frame = Math.floor(petTime / petFrameMs);
      if (row.length > 4) {
        const gesture = [3, 4, 5, 4];
        return row[frame === 0 ? 2 : gesture[(frame - 1) % gesture.length]];
      }
      return row[2 + frame % 2];
    }
    return row[Math.floor(elapsed / 480) % 2];
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

    if (actionFrame?.departure) {
      const { x, y } = actionFrame.departure;
      const { screenX, screenY } = CameraTransformer.worldToScreen(x, y, this.player);
      px = screenX * tileSize;
      py = screenY * tileSize;
    }
    let frameRect = actionFrame?.sprite;
    if (!frameRect && this.player.hp > 0 && !this.player.stunned) {
      const misty = this.game?.mistyStepPreview;
      const blast = this.game?.eldritchBlastPreviewDir;
      const preparing = blast != null && this.player.isBlastReady()
        ? "ELDRITCH_BLAST"
        : misty && !misty.canceled && !misty.blocked && this.player.mistyStepCharges > 0
          ? "MISTY_STEP" : null;
      if (preparing) {
        const row = this.getLiorRow(preparing);
        if (row[0]?.atlas) {
          frameRect = row.length > 4 ? row[2 + Math.floor(now / 240) % 2] : row[Math.floor(now / 170) % 2];
          this.keepAnimating(190);
        }
      }
    }
    const idlePose = this.getLiorIdlePose(now, !!frameRect);
    if (!frameRect) {
      const idleRow = this.getLiorRow("IDLE");
      frameRect = this.player.hp <= 0
        ? this.getLiorRow("DEFEAT").at(-1)
        : idlePose || idleRow[Math.floor(now / 450) % idleRow.length];
    }

    const sprite = frameRect.atlas ? null : this.getLiorFrame(frameRect);
    const reference = frameRect.atlas ? null : this.getLiorFrame(frameRect.sheet === "lior2" ? LIOR2_REFERENCE[frameRect.view] : LIOR_SPRITES.IDLE[0]);

    // Sombra bajo los pies de Lior (punto de anclaje estable)
    targetCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
    targetCtx.beginPath();
    targetCtx.ellipse(px + tileSize / 2, py + tileSize - 3, tileSize * 0.3, tileSize * 0.11, 0, 0, Math.PI * 2);
    targetCtx.fill();

    if (frameRect.atlas) {
      const scale = tileSize * 1.32 / 110;
      const x = Math.round(px + tileSize / 2 - 64 * scale);
      const y = Math.round(py + tileSize - 2 - 120 * scale);
      const size = Math.round(128 * scale);
      targetCtx.drawImage(frameRect.atlas, frameRect.x, 0, 128, 128, x, y, size, size);
    } else if (sprite && reference) {
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

    if (actionFrame?.swordTrailFrame != null) {
      const trail = this.loadTerrainTexture("Assets/Effects/Weapons/sword_spin_trail.png");
      if (trail.complete && trail.naturalWidth === 2048 && trail.naturalHeight === 256) {
        const size = Math.round(tileSize * 3);
        targetCtx.save();
        targetCtx.imageSmoothingEnabled = false;
        targetCtx.translate(px + tileSize / 2, py + tileSize / 2);
        targetCtx.rotate(actionFrame.swordTrailRotation || 0);
        targetCtx.drawImage(trail, actionFrame.swordTrailFrame * 256, 0, 256, 256,
          -Math.round(size / 2), -Math.round(size / 2), size, size);
        targetCtx.restore();
      }
    }

    if (this.player.hp > 0) this.drawPlayerStatusVisuals(targetCtx, px, py, tileSize, now);
    if (actionFrame?.effects) this.drawEffects(targetCtx, actionFrame.effects, this.playerAnimation.origin);
  }

  drawActiveMegaBossBanner(targetCtx) {
    if (!this.dungeon || !this.dungeon.enemies) return;
    const boss = this.dungeon.enemies.find(e => e.isMegaBoss && e.hp > 0);
    if (!boss) return;

    const W = this.canvas.width;
    const barW = Math.min(280, Math.max(160, Math.round(W * 0.44)));
    const barH = 9;
    const x = Math.round((W - barW) / 2);
    const y = 10;
    const ratio = Math.max(0, Math.min(1, boss.hp / Math.max(1, boss.maxHp)));
    const isEnraged = (boss.originTier === 10 && (boss.solarPhase2Triggered || ratio <= 0.5))
      || (boss.originTier === 8 && ratio <= 0.30);

    targetCtx.save();
    targetCtx.fillStyle = "rgba(6, 8, 18, 0.88)";
    targetCtx.strokeStyle = isEnraged ? "#fbbf24" : "#9ea6c8";
    targetCtx.lineWidth = 1.5;
    targetCtx.fillRect(x - 8, y - 4, barW + 16, barH + 22);
    targetCtx.strokeRect(x - 8, y - 4, barW + 16, barH + 22);

    targetCtx.fillStyle = "#1a1025";
    targetCtx.fillRect(x, y + 11, barW, barH);

    const grad = targetCtx.createLinearGradient(x, y + 11, x + barW, y + 11);
    if (isEnraged) {
      grad.addColorStop(0, "#f59e0b");
      grad.addColorStop(1, "#ef4444");
    } else {
      grad.addColorStop(0, "#be123c");
      grad.addColorStop(1, "#fb7185");
    }
    targetCtx.fillStyle = grad;
    targetCtx.fillRect(x, y + 11, Math.max(2, Math.round(barW * ratio)), barH);

    targetCtx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    targetCtx.lineWidth = 1;
    targetCtx.strokeRect(x + 0.5, y + 11.5, barW - 1, barH - 1);

    targetCtx.font = "bold 9.5px monospace";
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "top";
    targetCtx.fillStyle = isEnraged ? "#fde047" : "#f8fafc";
    const titleText = `👑 ${boss.name.toUpperCase()} — ${boss.hp}/${boss.maxHp} HP${isEnraged ? " [FURIA]" : ""}`;
    targetCtx.fillText(titleText, W / 2, y - 1);
    targetCtx.restore();
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

    if (this.game.isAiming || this.game.showWeaponRange || this.game.entryPreviewUntil > now) {
      const weapon = this.player.equippedWeapon;
      const point = cell => {
        const { screenX, screenY } = CameraTransformer.worldToScreen(cell.x, cell.y, this.player);
        return [(screenX + 0.5) * tileSize, (screenY + 0.5) * tileSize];
      };
      const circle = (cell, radius) => {
        const [x, y] = point(cell);
        targetCtx.beginPath();
        targetCtx.arc(x, y, tileSize * radius, 0, Math.PI * 2);
        targetCtx.stroke();
      };
      const line = (a, b) => {
        targetCtx.beginPath();
        targetCtx.moveTo(...point(a));
        targetCtx.lineTo(...point(b));
        targetCtx.stroke();
      };
      targetCtx.save();
      targetCtx.lineWidth = Math.max(1, tileSize * 0.035);
      targetCtx.strokeStyle = "rgba(246, 217, 157, .65)";
      if (weapon.isMelee) {
        circle(this.player, 1.12);
        for (const enemy of this.dungeon.enemies) {
          const hit = enemy.cells?.find(c => Math.hypot(c.x - this.player.x, c.y - this.player.y) <= 1.5);
          if (hit) circle(hit, .20);
        }
      } else {
        const shot = CombatSystem.resolveShot(this.player, this.dungeon, weapon);
        if (weapon.id === "blunderbuss") {
          for (const cell of shot.area) circle(cell, .07);
          const push = CombatSystem.getBlunderbussPushOptions(this.player);
          for (const enemy of shot.targets) {
            const result = CombatSystem.applyBlunderbussKnockback(this.game, enemy, push.steps, push.wallCrit, true);
            if (result.moved) {
              const destination = { x: result.x, y: result.y };
              line(enemy, destination);
              circle(destination, .22);
            }
            if (result.hitWall) {
              targetCtx.strokeStyle = "rgba(255, 141, 95, .9)";
              circle(result.moved ? result : enemy, .33);
              targetCtx.strokeStyle = "rgba(246, 217, 157, .65)";
            }
          }
        } else {
          targetCtx.setLineDash([tileSize * .10, tileSize * .14]);
          line(this.player, shot.impact);
          targetCtx.setLineDash([]);
          circle(shot.impact, .15);
          for (const enemy of shot.targets) circle(enemy, .25);
        }
      }
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
    const player = this.player;
    const dungeon = this.dungeon;
    const enemyPositions = dungeon.enemies.map(enemy =>
      `${enemy.x},${enemy.y},${enemy.size},${Number(!!enemy.isBoss)}`
    ).join("|");
    const state = `${W},${H},${dungeon.mapRevision},${player.x},${player.y},${player.direction}:${enemyPositions}`;
    if (this.minimapDungeon === dungeon && this.minimapState === state) return;
    this.minimapDungeon = dungeon;
    this.minimapState = state;

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
    this.idleSince = performance.now();
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
    const now = performance.now();
    const enemyRemaining = Math.max(0, (this.enemySequenceUntil || 0) - now);
    if (!this.playerAnimation || this.playerAnimation.interruptible) return enemyRemaining;
    const { frames, frameDuration, startedAt } = this.playerAnimation;
    return Math.max(enemyRemaining, startedAt + frames.length * frameDuration - now);
  }

  redrawCurrentView() {
    this.draw();
  }

  playRow(rowName, frameDuration, interruptible = false) {
    const frames = this.getLiorRow(rowName);
    const duration = frameDuration * LIOR_SPRITES[rowName].length / frames.length;
    this.playSpriteAnimation(frames.map((sprite, index) => ({
      sprite, swordTrailFrame: rowName === "SWORD_SPIN" ? Math.floor(index * 8 / frames.length) : null
    })), duration, interruptible);
  }

  playSwordSpin() {
    const frames = this.getLiorRow("SWORD_SPIN");
    if (!frames[0]?.atlas) {
      this.playRow("SWORD_SPIN", 130);
      return;
    }
    const rotation = this.getFacingAngle();
    this.playSpriteAnimation(frames.map((sprite, index) => ({
      sprite, swordTrailFrame: index, swordTrailRotation: rotation
    })), 520 / frames.length);
  }

  playInteraction() {
    if (this.getAnimationRemaining() > 0) return;
    const frames = this.getLiorRow("INTERACT");
    if (frames.length) this.playSpriteAnimation(frames.map(sprite => ({ sprite })), 75, true);
  }

  playMistyStep(departure = null, prepared = false) {
    const frames = this.getLiorRow("MISTY_STEP");
    if (!frames[0]?.atlas) {
      this.playRow("MISTY_STEP", MISTY_FRAME_MS);
      return;
    }
    const expanded = frames.length > 4;
    const transferFrame = expanded ? 4 : 2;
    const start = prepared ? transferFrame - 1 : 0;
    const frameMs = expanded ? 90 : MISTY_FRAME_MS;
    const timeline = frames.map((sprite, index) => ({ sprite, departure: index < transferFrame ? departure : null }));
    this.playSpriteAnimation(timeline.slice(start), frameMs);
    return (transferFrame - start) * frameMs;
  }

  playDrinkPotion() {
    this.playRow("HEAL", 130);
  }

  playWalk() {
    const frames = this.getLiorRow("WALK");
    const step = this.player.moveInterp;
    this.playSpriteAnimation(frames.map(sprite => ({ sprite })), (step?.duration ?? PLAYER_STEP_MS) / frames.length, true);
    if (step) this.playerAnimation.startedAt = step.startedAt;
  }

  playHurt(isFatal, minDelay = 0) {
    const start = () => {
      this.damageFlashUntil = performance.now() + 180;
      if (isFatal) this.playRow("DEFEAT", 150);
      else this.playRow("HURT", 70);
    };
    const stepRemaining = (this.player.moveInterp?.until ?? 0) - performance.now();
    const delay = Math.max(minDelay, this.getAnimationRemaining(), stepRemaining);
    if (delay > 0) setTimeout(start, delay);
    else start();
  }

  playEldritchBlastAnimation(beamReach, prepared = false) {
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
    const row = this.getLiorRow("ELDRITCH_BLAST", LIOR_SPRITES.ELDRITCH_BLAST.length);
    const expanded = !!row[0]?.motion;
    const release = expanded ? 4 : 2;
    const frames = row.map((sprite, index) => ({
      sprite,
      effects: sprite.atlas && (index < release || (expanded && index > release + 1)) ? [] : rays.map(ray => ({
        ...ray, phase: sprite.atlas ? (index === release ? 0 : 2) : Math.min(2, index)
      }))
    }));
    this.playSpriteAnimation(prepared && row[0]?.atlas ? frames.slice(release) : frames, expanded ? 85 : 135);
  }

  playRangedAttack(weaponId, shot) {
    const lior = { x: CAMERA_CONFIG.playerScreenX + 0.5, y: CAMERA_CONFIG.playerScreenY + 0.5 };
    const frames = this.getLiorRow("GUN_RECOIL", LIOR_SPRITES.GUN_RECOIL.length, weaponId);
    const directional = Boolean(frames[0]?.atlas);
    const expanded = !!frames[0]?.motion;

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
      const phases = expanded ? [null, null, null, 0, 1, 2] : directional ? [null, null, 0, 1, 2, 2] : [0, 0, 1, 1, 2, 2];
      this.playSpriteAnimation(frames.map((sprite, index) => ({
        sprite,
        effects: phases[index] == null ? [] : [{ type: "area", sheet: "blunderbuss", phase: phases[index], rect, clip, rotation: this.getFacingAngle() }]
      })), 105);
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

    const effectsByFrame = expanded ? [[], [], [], [muzzle], [projectile(0.65)], [impact]] : directional ? [[], [], [muzzle], [projectile(0.65)], [impact], [impact]] : [
      [muzzle],
      [muzzle, projectile(0.3)],
      [projectile(0.55)],
      [projectile(0.85)],
      [impact],
      [impact]
    ];
    this.playSpriteAnimation(frames.map((sprite, index) => ({ sprite, effects: effectsByFrame[index] })), isMusket ? 115 : 95);
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

      let interpOffsetX = 0;
      let interpOffsetY = 0;
      if (enemy.moveInterp && frameNow < enemy.moveInterp.until) {
        const t = Math.max(0, Math.min(1, (frameNow - enemy.moveInterp.startedAt) / enemy.moveInterp.duration));
        const ease = 1 - Math.pow(1 - t, 2);
        interpOffsetX = (enemy.moveInterp.fromX - enemy.x) * (1 - ease) * tileSize;
        interpOffsetY = (enemy.moveInterp.fromY - enemy.y) * (1 - ease) * tileSize;
      }

      this.drawEnemySprite(
        targetCtx,
        enemy,
        minScreenX * tileSize + interpOffsetX,
        minScreenY * tileSize + interpOffsetY
      );
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

    let liorInterpX = 0;
    let liorInterpY = 0;
    if (this.player.moveInterp && frameNow < this.player.moveInterp.until) {
      const t = Math.max(0, Math.min(1, (frameNow - this.player.moveInterp.startedAt) / this.player.moveInterp.duration));
      const ease = 1 - Math.pow(1 - t, 2);
      liorInterpX = (this.player.moveInterp.fromX - this.player.x) * (1 - ease) * tileSize;
      liorInterpY = (this.player.moveInterp.fromY - this.player.y) * (1 - ease) * tileSize;
    }
    const liorCellPx = playerScreenX * tileSize + liorInterpX;
    const liorCellPy = playerScreenY * tileSize + liorInterpY;
    this.drawLiorSprite(targetCtx, liorCellPx, liorCellPy, tileSize);
    this.drawEnemyProjectiles(targetCtx, frameNow);
    this.drawWorldVisualEffects(targetCtx, frameNow);
    if ((this.player.blindTurns || 0) > 0) {
      // Máscara de 3x3 centrada en Lior; no revela el resto del mapa.
      const left = (playerScreenX - 1) * tileSize;
      const top = (playerScreenY - 1) * tileSize;
      targetCtx.fillStyle = "rgba(0,0,0,0.985)";
      targetCtx.fillRect(0, 0, cols * tileSize, Math.max(0, top));
      targetCtx.fillRect(0, top + 3 * tileSize, cols * tileSize, rows * tileSize);
      targetCtx.fillRect(0, top, Math.max(0, left), 3 * tileSize);
      targetCtx.fillRect(left + 3 * tileSize, top, cols * tileSize, 3 * tileSize);
    }
    targetCtx.restore();
    this.drawFloatingNumbers(targetCtx, frameNow);
    this.drawActiveMegaBossBanner(targetCtx);
    this.drawDamageFlash(targetCtx);
  }
}

