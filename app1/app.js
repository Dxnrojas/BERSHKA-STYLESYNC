import renderQRScreen from "./screens/qr_screen.js";

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// 🟢 Pantalla inicial: QR
clearScripts();
renderQRScreen();

// 🔌 Conexión Socket.IO
import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

// 🧠 Eventos desde el backend
socket.on("show-form-screens", async () => {
  const module = await import("./screens/esperafomulario_screen.js");
  clearScripts();
  module.default();
});

socket.on("show-instruction-screens", async () => {
  const module = await import("./screens/instructions_screen.js");
  clearScripts();
  module.default();
});

socket.on("start-game", async (question) => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question);
});

socket.on("siguiente-pregunta", async ({ question }) => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question);
});

socket.on("juego-terminado", async () => {
  const module = await import("./screens/loading_big_screen.js");
  clearScripts();
  module.default();
});

// 🆕 Mostrar pantalla de selección de outfit en app1
socket.on("show-outfit-selection", async () => {
  const module = await import("./screens/OutfitSelection_big_screen.js");
  clearScripts();
  module.default();
});

// 🆕 Mostrar pantalla final de notificación en app1 (CORREGIDO)
socket.on("show-email-big-screen", async (data) => {
  const module = await import("./screens/emailnotification_big.js");
  clearScripts();
  module.default(data); // 👈 Aquí se pasa el { outfitId }
});


// Debug log
socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app1:", event, args);
});

// 🔁 Función para peticiones HTTP
export async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return await response.json();
}
