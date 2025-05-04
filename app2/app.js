// ✅ app2/app.js actualizado

import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";
import renderStartBtnScreen from "./screens/startbtn_screen.js";
import renderAnswerSelectScreen from "./screens/answerselect_screen.js";

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
socket.on("start-game", (question) => {
  const totalPreguntas = 8;     // 🔢 Ajusta si tu juego tiene más o menos
  const preguntaActual = 1;     // 🎯 Primera pregunta
  clearApp();
  renderAnswerSelectScreen(question, socket, totalPreguntas, preguntaActual);
});

// ✅ Evento: recibir siguiente pregunta
socket.on("siguiente-pregunta", ({ question, preguntaActual }) => {
  const totalPreguntas = 8;
  clearApp();
  renderAnswerSelectScreen(question, socket, totalPreguntas, preguntaActual);
});

socket.on("juego-terminado", async () => {
  const module = await import("./screens/loading_screen.js");
  clearApp();
  module.default();
});


socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app:", event, args);
});



// 👉 Función para hacer fetch al backend (puedes usarla donde necesites)
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
