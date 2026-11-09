const LIOR_ACHIEVEMENTS = [
  { id: "tutorial", title: "Preparada para el descenso", description: "Completa los cinco pasos del tutorial.", goal: 1 },
  { id: "first_kill", title: "Primer combate", description: "Derrota a un enemigo.", metric: "killsTotal", goal: 1 },
  { id: "hunter", title: "Entre las sombras", description: "Derrota a 25 enemigos en un mismo descenso.", metric: "killsTotal", goal: 25 },
  { id: "veteran", title: "Que venga el siguiente", description: "Derrota a 100 enemigos en un mismo descenso.", metric: "killsTotal", goal: 100 },
  { id: "floor10", title: "El primer umbral", description: "Llega al piso 10.", metric: "floor", goal: 10 },
  { id: "floor50", title: "A medio camino del abismo", description: "Llega al piso 50.", metric: "floor", goal: 50 },
  { id: "floor100", title: "Ante el Dragón solar", description: "Llega al piso 100.", metric: "floor", goal: 100 },
  { id: "miniboss", title: "Rival de altura", description: "Derrota a un minijefe.", metric: "killsMiniBosses", goal: 1 },
  { id: "megaboss", title: "Cazadora de colosos", description: "Derrota a un jefe 4×4.", metric: "killsMegaBosses", goal: 1 },
  { id: "sword", title: "Filo probado", description: "Acierta 10 ataques de espada en un mismo descenso.", metric: "swordHits", goal: 10 },
  { id: "pistol", title: "Pulso firme", description: "Acierta un disparo de pistola.", metric: "pistolHits", goal: 1 },
  { id: "musket", title: "Desde la distancia", description: "Acierta un disparo de mosquete.", metric: "musketHits", goal: 1 },
  { id: "blunderbuss", title: "Paso despejado", description: "Acierta un disparo de trabuco.", metric: "blunderbussHits", goal: 1 },
  { id: "blast", title: "Poder del otro lado", description: "Acierta con Eldritch Blast.", metric: "eldritchBlastHits", goal: 1 },
  { id: "mist", title: "Entre la bruma", description: "Usa Misty Step en el calabozo.", metric: "mistyStepUses", goal: 1 },
  { id: "gold", title: "Una pequeña fortuna", description: "Consigue 100 PO en un mismo descenso.", metric: "goldCollected", goal: 100 },
  { id: "dragon", title: "El sol también cae", description: "Derrota al Dragón solar.", metric: "solarDragonDefeated", goal: 1 },
  { id: "secret", title: "El ritmo del abismo", description: "Contempla el baile completo del Pourcoon.", goal: 1, secret: true }
];

class AchievementController {
  constructor(game) {
    this.game = game;
    this.storageKey = "lior_achievements_v1";
    this.records = {};
    this.storageAvailable = true;
    this.mergeStoredRecords();
    this.observe(false);
    document.getElementById("btn-menu-achievements").addEventListener("click", () => this.togglePanel());
    window.addEventListener("storage", event => {
      if (event.key !== this.storageKey) return;
      this.mergeStoredRecords();
      this.render();
    });
  }

  mergeStoredRecords() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey) || "null");
      if (data?.version !== 1 || !data.records || typeof data.records !== "object") return;
      for (const achievement of LIOR_ACHIEVEMENTS) {
        const key = achievement.metric || achievement.id;
        const value = data.records[key];
        if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
          this.records[key] = Math.max(this.records[key] || 0, Math.floor(value));
        }
      }
    } catch {
      this.storageAvailable = false;
    }
  }

  progress(achievement) {
    return Math.min(achievement.goal, this.records[achievement.metric || achievement.id] || 0);
  }

  observe(notify = true) {
    const game = this.game;
    if (game.devMode || !game.player || game.tutorial?.isActive) return;
    const before = new Set(LIOR_ACHIEVEMENTS.filter(item => this.progress(item) >= item.goal).map(item => item.id));
    const previous = JSON.stringify(this.records);
    this.mergeStoredRecords();
    for (const achievement of LIOR_ACHIEVEMENTS) {
      if (!achievement.metric) continue;
      const value = achievement.metric === "floor" ? game.floor : game.stats?.[achievement.metric];
      const amount = Number(value);
      if (Number.isFinite(amount) && amount >= 0) {
        this.records[achievement.metric] = Math.max(this.records[achievement.metric] || 0, Math.floor(amount));
      }
    }
    if (JSON.stringify(this.records) !== previous) this.persist();
    this.updateButton();
    if (notify) this.announceNew(before);
  }

  recordEvent(id) {
    if (this.game.devMode || !LIOR_ACHIEVEMENTS.some(item => item.id === id && !item.metric)) return;
    const before = new Set(LIOR_ACHIEVEMENTS.filter(item => this.progress(item) >= item.goal).map(item => item.id));
    this.mergeStoredRecords();
    this.records[id] = 1;
    this.persist();
    this.updateButton();
    this.announceNew(before);
  }

  persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({ version: 1, records: this.records }));
      this.storageAvailable = true;
    } catch {
      this.storageAvailable = false;
    }
  }

  announceNew(before) {
    const unlocked = LIOR_ACHIEVEMENTS.filter(item => this.progress(item) >= item.goal && !before.has(item.id));
    if (!unlocked.length) return;
    const toast = document.getElementById("achievement-toast");
    toast.textContent = "✦ Logro desbloqueado · " + unlocked.map(item => item.title).join(" · ");
    toast.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { toast.hidden = true; }, 5500);
    if (!document.getElementById("menu-achievements").classList.contains("hidden")) this.render();
  }

  updateButton() {
    const button = document.getElementById("btn-menu-achievements");
    const completed = LIOR_ACHIEVEMENTS.filter(item => this.progress(item) >= item.goal).length;
    const opened = !document.getElementById("menu-achievements").classList.contains("hidden");
    button.textContent = opened ? "⌨ Ver controles" : `✦ Logros · ${completed}/${LIOR_ACHIEVEMENTS.length}`;
    button.setAttribute("aria-expanded", String(opened));
  }

  togglePanel() {
    const panel = document.getElementById("menu-achievements");
    const opened = panel.classList.contains("hidden");
    panel.classList.toggle("hidden", !opened);
    document.getElementById("tutorial-manual-grid").classList.toggle("hidden", opened);
    this.observe(false);
    this.render();
    this.updateButton();
    if (opened) panel.focus({ preventScroll: true });
  }

  render() {
    const list = document.getElementById("achievement-list");
    list.replaceChildren();
    let completed = 0;
    for (const achievement of LIOR_ACHIEVEMENTS) {
      const value = this.progress(achievement);
      const unlocked = value >= achievement.goal;
      if (unlocked) completed++;
      const hidden = achievement.secret && !unlocked;
      const item = document.createElement("li");
      item.className = "achievement-item" + (unlocked ? " is-unlocked" : "");
      const title = document.createElement("strong");
      title.textContent = (unlocked ? "✦ " : "◇ ") + (hidden ? "Logro secreto" : achievement.title);
      const description = document.createElement("p");
      description.textContent = hidden ? "Hay una sorpresa escondida en el calabozo." : achievement.description;
      const status = document.createElement("span");
      status.className = "achievement-status";
      status.textContent = unlocked ? "Desbloqueado" : hidden ? "Por descubrir" : `${value} / ${achievement.goal}`;
      item.append(title, description, status);
      if (!hidden) {
        const progress = document.createElement("progress");
        progress.max = achievement.goal;
        progress.value = value;
        progress.setAttribute("aria-label", achievement.title);
        item.appendChild(progress);
      }
      list.appendChild(item);
    }
    document.getElementById("achievement-summary").textContent =
      `${completed} de ${LIOR_ACHIEVEMENTS.length} desbloqueados. ` +
      (this.storageAvailable ? "Se conservan entre partidas en este navegador." : "El navegador no permite guardar los logros. El progreso durará esta sesión.");
    this.updateButton();
  }
}
