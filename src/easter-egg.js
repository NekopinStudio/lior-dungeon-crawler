class PourcoonEasterEgg {
  constructor(game) {
    this.game = game;
    this.lastInputAt = performance.now();
    this.active = false;
    this.pointers = new Set();
    this.keys = new Set();
    this.image = new Image();
    this.image.src = "Assets/Effects/EasterEgg/pourcoon-dance.png";
    this.image.decode().catch(() => {});
    this.canvas = document.createElement("canvas");
    this.canvas.className = "pourcoon-easter-egg";
    this.canvas.hidden = true;
    this.canvas.setAttribute("aria-label", "Un Pourcoon baila en el suelo de la cueva");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.wakeLock = null;
    this.wakeLockPending = false;

    const input = event => {
      if (window.gameController !== game) return;
      this.lastInputAt = performance.now();
      if (event.type === "keydown") this.keys.add(event.code);
      if (event.type === "keyup") this.keys.delete(event.code);
      if (event.type === "pointerdown") this.pointers.add(event.pointerId);
      if (event.type === "pointerup" || event.type === "pointercancel") this.pointers.delete(event.pointerId);
      if (event.type === "pointerdown" || event.type === "keydown") this.keepScreenAwake();
      if (this.active) {
        if (event.cancelable) event.preventDefault();
        event.stopImmediatePropagation();
        this.endDance();
      }
    };
    for (const type of ["pointerdown", "pointerup", "pointercancel", "pointermove", "keydown", "keyup", "wheel"]) {
      window.addEventListener(type, input, { capture: true, passive: false });
    }
    const reset = () => {
      this.lastInputAt = performance.now();
      this.pointers.clear();
      this.keys.clear();
      if (document.hidden || !document.hasFocus()) {
        if (this.active) this.finish();
        this.wakeLock?.release().catch(() => {});
      } else this.keepScreenAwake();
    };
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("focus", reset);
    this.timer = setInterval(() => this.checkIdle(), 500);
  }

  async keepScreenAwake() {
    if (this.wakeLock || this.wakeLockPending || document.hidden || !document.hasFocus() || !navigator.wakeLock) return;
    this.wakeLockPending = true;
    try {
      const lock = await navigator.wakeLock.request("screen");
      this.wakeLock = lock;
      lock.addEventListener("release", () => {
        if (this.wakeLock === lock) this.wakeLock = null;
      });
    } catch {
      // Browsers can decline the screen lock according to device settings.
    } finally {
      this.wakeLockPending = false;
    }
  }

  noteGamepadActivity() {
    this.lastInputAt = performance.now();
    this.keepScreenAwake();
    if (this.active) this.endDance();
  }

  checkIdle() {
    const game = this.game;
    if (window.gameController !== game) {
      clearInterval(this.timer);
      this.finish();
      return;
    }
    if (document.hidden || !document.hasFocus()) {
      this.lastInputAt = performance.now();
      return;
    }
    if (this.active) return;
    const busy = this.pointers.size > 0 || this.keys.size > 0 || game.isGameplayBlocked()
      || game.tutorial?.isActive || game.renderer?.bossPresentation
      || game.keyboardSpellAim || game.isAiming || game.isAnimatingTurn
      || game.inMerchantFloor || game.isGameOverTriggered;
    if (busy) {
      this.lastInputAt = performance.now();
      return;
    }
    if (performance.now() - this.lastInputAt >= 60000 && this.image.complete && this.image.naturalWidth) {
      this.start();
    }
  }

  start() {
    const game = this.game;
    this.active = true;
    this.startedAt = performance.now();
    this.returnStartedAt = null;
    this.pointers.clear();
    game.touchController?.cancelAllGestures();
    game.stopDpadHold?.();
    this.snapshot = document.createElement("canvas");
    this.snapshot.width = game.canvas.width;
    this.snapshot.height = game.canvas.height;
    this.snapshot.getContext("2d").drawImage(game.canvas, 0, 0);
    this.ground = document.createElement("canvas");
    this.ground.width = 960;
    this.ground.height = 540;
    const ctx = this.ground.getContext("2d");
    const theme = game.renderer.getTerrainTheme();
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 5; x++) {
        game.renderer.drawEnhancedFloorCell(ctx, theme, game.player.x + x, game.player.y + y,
          x * 200, y * 200, 200, true, performance.now());
      }
    }
    this.canvas.hidden = false;
    this.keepScreenAwake();
    const animate = now => {
      if (!this.active) return;
      this.render(now);
      if (this.active) this.raf = requestAnimationFrame(animate);
    };
    this.raf = requestAnimationFrame(animate);
  }

  endDance() {
    if (this.active && this.returnStartedAt === null) this.returnStartedAt = performance.now();
  }

  finish() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.active = false;
    this.canvas.hidden = true;
    this.lastInputAt = performance.now();
    this.snapshot = null;
    this.ground = null;
    this.game.renderer?.draw();
  }

  render(now) {
    const elapsed = now - this.startedAt;
    const entranceMs = 1200;
    const landingMs = 1000;
    const danceMs = 20000;
    const returnMs = 1000;
    if (elapsed >= entranceMs + landingMs + danceMs && this.returnStartedAt === null) {
      this.game.achievements?.recordEvent("secret");
      this.returnStartedAt = now;
    }
    const returning = this.returnStartedAt !== null;
    const returnProgress = returning ? Math.min(1, (now - this.returnStartedAt) / returnMs) : 0;
    if (returnProgress >= 1) {
      this.finish();
      return;
    }
    const width = Math.max(1, Math.round(innerWidth));
    const height = Math.max(1, Math.round(innerHeight));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    const ctx = this.ctx;
    const ease = value => value * value * (3 - 2 * value);
    const zoom = returning ? this.returnZoom * (1 - ease(returnProgress))
      : ease(Math.min(1, elapsed / entranceMs));
    if (!returning) this.returnZoom = zoom;
    ctx.fillStyle = "#101018";
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;
    const cover = Math.max(width / this.snapshot.width, height / this.snapshot.height);
    const scale = cover * (1 + zoom * 3);
    ctx.globalAlpha = 1 - zoom;
    ctx.drawImage(this.snapshot, (width - this.snapshot.width * scale) / 2,
      (height - this.snapshot.height * scale) / 2, this.snapshot.width * scale, this.snapshot.height * scale);
    ctx.globalAlpha = zoom;
    const groundScale = Math.max(width / 960, height / 540) * (1.05 + zoom * .2);
    ctx.drawImage(this.ground, (width - 960 * groundScale) / 2, (height - 540 * groundScale) / 2,
      960 * groundScale, 540 * groundScale);
    const vignette = ctx.createRadialGradient(width / 2, height * .55, height * .12,
      width / 2, height * .55, Math.max(width, height) * .65);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,.8)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
    if (elapsed >= entranceMs) {
      const time = elapsed - entranceMs;
      const frame = time < landingMs ? Math.min(3, Math.floor(time / 250))
        : 4 + Math.floor((time - landingMs) / 120) % 12;
      const cellWidth = this.image.naturalWidth / 4;
      const cellHeight = this.image.naturalHeight / 4;
      const size = Math.min(width * .65, height * .68, 480);
      const falling = time < 250 ? (1 - time / 250) ** 2 * (height + size) : 0;
      ctx.globalAlpha = returning ? 1 - ease(returnProgress) : 1;
      ctx.fillStyle = "rgba(0,0,0,.32)";
      ctx.beginPath();
      ctx.ellipse(width / 2, height * .79, size * .28, size * .065, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.drawImage(this.image, (frame % 4) * cellWidth, Math.floor(frame / 4) * cellHeight,
        cellWidth, cellHeight, (width - size) / 2, height * .8 - size - falling, size, size);
    }
    ctx.globalAlpha = 1;
  }
}
