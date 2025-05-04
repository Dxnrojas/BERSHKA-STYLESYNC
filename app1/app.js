// ✅ app1/app.js

import renderQRScreen from "./screens/qr_screen.js";

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// 👉 Mostrar QR de inicio al cargar
clearScripts();
renderQRScreen();

// 👉 WebSocket
import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

// 👉 Evento: mostrar pantalla de espera para formulario (tras splash en app2)
socket.on("show-form-screens", async () => {
  const module = await import("./screens/esperafomulario_screen.js");
  clearScripts();
  module.default();
});

// 👉 Evento: mostrar instrucciones (tras registro exitoso)
socket.on("show-instruction-screens", async () => {
  const module = await import("./screens/instructions_screen.js");
  clearScripts();
  module.default();
});

// 👉 Evento: iniciar el juego → cargar primera pregunta
socket.on("start-game", async (question) => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question); // ✅ pasamos la pregunta
});

// ✅ Evento: siguiente pregunta dinámica desde App2
socket.on("siguiente-pregunta", async ({ question }) => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question); // ✅ actualiza con la nueva pregunta
});

// ✅ Evento: fin del juego → carga pantalla de espera con IA (loading)
socket.on("juego-terminado", async () => {
  const module = await import("./screens/loading_big_screen.js");
  clearScripts();
  module.default();
});


socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app:", event, args);
});


// 👉 Función reutilizable para peticiones al backend
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
