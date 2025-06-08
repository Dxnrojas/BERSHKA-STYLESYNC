import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";
import renderStartBtnScreen from "./screens/startbtn_screen.js";
import renderAnswerSelectScreen from "./screens/answerselect_screen.js";

const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// 🟢 Socket events to switch screens
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
  const userId = localStorage.getItem("userId"); // you can use this if needed
  clearApp();
  renderAnswerSelectScreen(question, socket, 8, 1);
});

socket.on("siguiente-pregunta", ({ question, preguntaActual }) => {
  clearApp();
  renderAnswerSelectScreen(question, socket, 8, preguntaActual);
});

socket.on("juego-terminado", async () => {
  const module = await import("./screens/loading_screen.js");
  clearApp();
  module.default();
});

socket.on("show-outfit-selection", async () => {
  const module = await import("./screens/outfitselection_screen.js");
  clearApp();
  module.default();
});

socket.on("show-email-screen", async (data) => {
  const module = await import("./screens/emailnotification_screen.js");
  clearApp();
  module.default(data);
});

socket.on("show-thanks-screens", async () => {
  const module = await import("./screens/thanks_screen.js");
  clearApp();
  module.default();
});

socket.onAny((event, ...args) => console.log("📥 app2 recibió:", event, args));

// 🔁 Generic request utility
export async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
}

export { socket };
