import renderQRScreen from "./screens/qr_screen.js";

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

clearScripts();
renderQRScreen();

import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";
const socket = io("/", { path: "/real-time" });

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

socket.onAny((event, ...args) => {
  console.log("📥 Evento recibido en app1:", event, args);
});

export async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return await response.json();
}
