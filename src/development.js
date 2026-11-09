class LocalDevelopmentBridge {
  constructor(game) {
    this.game = game;
    const session = new URLSearchParams(location.search).get("session");
    if (!game.devMode || !session || !/^[a-zA-Z0-9-]{1,64}$/.test(session) || !window.BroadcastChannel) return;
    this.channel = new BroadcastChannel("lior-development-" + session);
    this.channel.onmessage = event => this.receive(event.data);
    this.sendStatus();
    window.addEventListener("pagehide", () => this.channel.close(), { once: true });
  }

  sendStatus(requestId, error = "") {
    const game = this.game;
    this.channel?.postMessage({
      type: "status", requestId, error,
      state: {
        floor: game.floor, merchant: game.inMerchantFloor,
        hp: game.player.hp, maxHp: game.player.maxHp, gold: game.player.gold,
        ammo: [game.player.ammoPistol, game.player.ammoMusket, game.player.ammoBlunderbuss],
        blast: game.player.blastCurrentCharges, mist: game.player.mistyStepCharges,
        upgrades: { ...game.player.weaponUpgrades }
      }
    });
  }

  receive(message) {
    if (!message || typeof message !== "object") return;
    if (message.type === "ping") {
      this.sendStatus(message.requestId);
      return;
    }
    const game = this.game;
    if (!game.devMode || !["apply", "refill", "shop"].includes(message.type)) return;
    if (game.isGameplayBlocked() || game.isAnimatingTurn || game.renderer?.bossPresentation) {
      this.sendStatus(message.requestId, "Cierra los menús y espera a que termine la animación antes de aplicar cambios.");
      return;
    }
    if (message.type === "apply") {
      const data = message.values;
      const valid = (value, max) => Number.isInteger(value) && value >= 0 && value <= max;
      const weapons = ["sword", "pistol", "musket", "blunderbuss"];
      if (!data || !valid(data.gold, 999999) || !valid(data.ammo, 999) ||
          !data.upgrades || !weapons.every(id => valid(data.upgrades[id], 3))) {
        this.sendStatus(message.requestId, "Revisa los recursos y las mejoras antes de aplicarlos.");
        return;
      }
      game.player.gold = data.gold;
      game.player.ammoPistol = game.player.ammoMusket = game.player.ammoBlunderbuss = data.ammo;
      for (const id of weapons) {
        game.player.unlockedWeapons.add(id);
        game.player.weaponUpgrades[id] = data.upgrades[id];
      }
    } else if (message.type === "refill") {
      game.player.hp = game.player.maxHp;
      game.player.extraHp = 0;
      game.player.mistyStepCharges = game.player.mistyStepMaxCharges;
      game.player.mistyStepActionCounter = 0;
      game.player.blastCurrentCharges = game.player.blastMaxCharges;
    } else if (message.type === "shop") {
      game.initDungeonFloor(true);
    }
    game.updateHUD();
    game.renderer.draw();
    this.sendStatus(message.requestId);
  }
}
