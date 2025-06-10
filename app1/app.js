import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
import renderQRScreen from "./screens/qr_screen.js";

const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// Pantalla inicial QR
clearApp();
renderQRScreen();

// Cargar pantallas dinámicamente
const loadScreen = async (screenName, data = null) => {
  const module = await import(`./screens/${screenName}.js`);
  clearApp();
  module.default(data);
};

// 🟢 Corrección aquí: extraemos 'question' del objeto emitido
socket.on("start-game", ({ question }) => loadScreen("question_screen", question));

socket.on("show-form-screens", () => loadScreen("esperafomulario_screen"));
socket.on("show-instruction-screens", () => loadScreen("instructions_screen"));
socket.on("siguiente-pregunta", ({ question }) => loadScreen("question_screen", question));
socket.on("juego-terminado", () => loadScreen("loading_big_screen"));

// 🔴 AQUÍ: Pasa los datos reales a la pantalla de outfits
socket.on("show-outfit-selection", (data) => loadScreen("OutfitSelection_big_screen", data));

socket.on("show-email-big-screen", (data) => loadScreen("emailnotification_big", data));
socket.on("show-thanks-screens", () => loadScreen("thanks_big_screen"));
socket.on("reset-to-qr-screen", () => loadScreen("qr_screen"));

socket.onAny((event, ...args) => console.log("📥 app1 recibió:", event, args));

// 🧠 Utilidad para fetch
export async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return await res.json();
}

export { socket };
