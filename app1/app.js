// ✅ app1/app.js

import renderQRScreen from "./screens/qr_screen.js";

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// 👉 Mostrar QR de inicio
clearScripts();
renderQRScreen();

// 👉 WebSocket
import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

// 👉 Evento: mostrar pantalla de espera para el formulario (tras splash en app2)
socket.on("show-form-screens", async () => {
  const module = await import("./screens/esperafomulario_screen.js");
  clearScripts();
  module.default();
});

// 👉 Evento: mostrar pantalla de instrucciones (tras registro en app2)
socket.on("show-instruction-screens", async () => {
  const module = await import("./screens/instructions_screen.js");
  clearScripts();
  module.default();
});

// ✅ NUEVO: Evento para mostrar la pantalla de preguntas al iniciar el juego
socket.on("start-game", async () => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default();
});

// 👉 Función reutilizable para hacer peticiones al backend
async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  return await response.json();
}

export { makeRequest };
