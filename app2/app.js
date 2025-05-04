// ✅ app2/app.js actualizado

import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";
import renderStartBtnScreen from "./screens/startbtn_screen.js";

// 👉 WebSocket (con ruta personalizada)
import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// 👉 Evento: mostrar splash screen luego del QR
socket.on("next-screen", () => {
  clearApp();
  renderSplashScreen();
});

// 👉 Evento: mostrar pantalla de formulario
socket.on("show-form-screens", () => {
  clearApp();
  renderRegisterScreen();
});

// 👉 Evento: mostrar botón para iniciar el juego
socket.on("show-instruction-screens", () => {
  clearApp();
  renderStartBtnScreen();
});

// ✅ Evento FINAL: mostrar pantalla de selección de respuesta (juego)
socket.on("start-game", async () => {
  console.log("✅ Evento 'start-game' recibido en app2");

  try {
    const module = await import("./screens/answerselect_screen.js");
    clearApp();
    module.default();
  } catch (error) {
    console.error("❌ Error al cargar answerselect_screen.js:", error);
  }
});

// 🧪 OPCIONAL: Log de todos los eventos recibidos (debugging)
/*
socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app2:", event, args);
});
*/

// 👉 Función para hacer fetch al backend
async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

export { makeRequest, socket };
