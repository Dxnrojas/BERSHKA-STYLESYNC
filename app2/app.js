// ✅ app2/app.js actualizado

import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";
import renderStartBtnScreen from "./screens/startbtn_screen.js";

// 👉 WebSocket
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

// ✅ Evento: iniciar juego con la primera pregunta
socket.on("start-game", async (question) => {
  console.log("✅ Evento 'start-game' recibido en app2 con pregunta:", question);

  try {
    const module = await import("./screens/answerselect_screen.js");
    clearApp();
    module.default(question); // Pasamos la pregunta como argumento
  } catch (error) {
    console.error("❌ Error al cargar answerselect_screen.js:", error);
  }
});

// ✅ Evento: siguiente pregunta enviada desde el servidor
socket.on("next-question", async (question) => {
  try {
    const module = await import("./screens/answerselect_screen.js");
    clearApp();
    module.default(question);
  } catch (error) {
    console.error("❌ Error al mostrar siguiente pregunta:", error);
  }
});

// ✅ Evento: finalización del cuestionario
socket.on("quiz-finished", () => {
  clearApp();
  document.getElementById("app").innerHTML = `
    <section style="text-align: center; padding: 3rem;">
      <h1>¡Gracias por jugar! 🎉</h1>
      <p>Tu estilo está siendo analizado para recomendarte el mejor outfit.</p>
    </section>
  `;
});

// 👉 Función para hacer fetch al backend
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

export { makeRequest, socket };
