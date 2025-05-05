import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";
import renderStartBtnScreen from "./screens/startbtn_screen.js";
import renderAnswerSelectScreen from "./screens/answerselect_screen.js";

import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// 🧭 Control de pantallas
socket.on("next-screen", () => {
  clearApp();
  renderSplashScreen();
});

socket.on("show-form-screens", () => {
  clearApp();
  renderRegisterScreen();
});

socket.on("show-instruction-screens", () => {
  clearApp();
  renderStartBtnScreen();
});

socket.on("start-game", (question) => {
  const totalPreguntas = 8;
  const preguntaActual = 1;
  clearApp();
  renderAnswerSelectScreen(question, socket, totalPreguntas, preguntaActual);
});

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

// 🆕 Pantalla de selección final de outfit
socket.on("show-outfit-selection", async () => {
  const module = await import("./screens/outfitselection_screen.js");
  clearApp();
  module.default();
});

// 🆕 Pantalla de notificación por email
socket.on("show-email-screen", async (data) => {
  const module = await import("./screens/emailnotification_screen.js");
  clearApp();
  module.default(data);
});

// 🆕 Pantalla de agradecimiento
socket.on("show-thanks-screens", async () => {
  const module = await import("./screens/thanks_screen.js");
  clearApp();
  module.default();
});

// 🐞 Debug log
socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app2:", event, args);
});

// 🔁 Función para peticiones HTTP
export async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export { socket };
