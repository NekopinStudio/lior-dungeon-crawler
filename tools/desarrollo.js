const devForm = document.getElementById("settings");
const devStatus = document.getElementById("connection");
const devFeedback = document.getElementById("feedback");
const devButtons = ["apply", "refill", "shop"].map(id => document.getElementById(id));
const devOrigin = "http://127.0.0.1:8417";
let devSession = sessionStorage.getItem("lior_development_session");
if (!devSession) {
  devSession = crypto.randomUUID();
  sessionStorage.setItem("lior_development_session", devSession);
}
const devChannel = new BroadcastChannel("lior-development-" + devSession);
let devLastReply = 0;
let devRequestId = null;
let devPendingTimer;

function devValues() {
  return {
    gold: Number(devForm.elements.gold.value), ammo: Number(devForm.elements.ammo.value),
    upgrades: Object.fromEntries(["sword","pistol","musket","blunderbuss"].map(id => [id, Number(devForm.elements[id].value)]))
  };
}

function devSend(type) {
  if (!devForm.reportValidity()) return;
  devRequestId = crypto.randomUUID();
  devChannel.postMessage({ type, requestId: devRequestId, values: devValues() });
  devFeedback.textContent = "Esperando respuesta de la partida…";
  clearTimeout(devPendingTimer);
  devPendingTimer = setTimeout(() => {
    devFeedback.textContent = "La partida no respondió. Mantén abierta su pestaña y comprueba que Abrir-Lior.cmd siga ejecutándose.";
    devRequestId = null;
  }, 4000);
}

devChannel.onmessage = event => {
  const message = event.data;
  if (message?.type !== "status" || !message.state) return;
  devLastReply = Date.now();
  const state = message.state;
  devStatus.textContent = `Conectado · Piso ${state.floor}${state.merchant ? " · Tienda" : ""} · Vida ${state.hp}/${state.maxHp} · ${state.gold} PO · Munición ${state.ammo.join(" / ")} · Blast ${state.blast} · Misty ${state.mist}`;
  for (const button of devButtons) button.disabled = false;
  if (message.requestId && message.requestId === devRequestId) {
    clearTimeout(devPendingTimer);
    devRequestId = null;
    devFeedback.textContent = message.error || "Cambio aplicado en la partida de prueba.";
  }
};

devForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!devForm.reportValidity()) return;
  const query = new URLSearchParams(new FormData(devForm));
  query.set("dev", "1");
  query.set("session", devSession);
  const gameWindow = window.open(devOrigin + "/index.html?" + query, "lior-test-" + devSession);
  devFeedback.textContent = gameWindow ? "Abriendo el piso. La conexión aparecerá cuando termine el arranque." : "Permite abrir la pestaña de prueba en tu navegador y vuelve a pulsar el botón.";
});

for (const type of ["apply", "refill", "shop"]) document.getElementById(type).addEventListener("click", () => devSend(type));
setInterval(() => {
  devChannel.postMessage({type:"ping"});
  if (Date.now() - devLastReply > 6000) {
    for (const button of devButtons) button.disabled = true;
    if (devLastReply) devStatus.textContent = "Sin respuesta reciente de la partida. Comprueba que su pestaña siga abierta.";
  }
}, 1500);
