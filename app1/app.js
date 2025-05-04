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
socket.on("start-game", async () => {
  const response = await fetch("http://localhost:5050/quiz/current-question");
  const question = await response.json();

  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question); // ✅ pasamos pregunta inicial
});

// ✅ Evento: siguiente pregunta dinámica (enviada desde el servidor)
socket.on("next-question", async (question) => {
  const module = await import("./screens/question_screen.js");
  clearScripts();
  module.default(question); // ✅ cargamos la nueva pregunta
});

// ✅ Evento: fin del cuestionario
socket.on("quiz-finished", () => {
  clearScripts();
  document.getElementById("app").innerHTML = `
    <section style="text-align: center; padding: 3rem;">
      <h1>¡Gracias por participar! 🧡</h1>
      <p>Tu estilo está siendo analizado para darte una recomendación perfecta.</p>
    </section>
  `;
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
