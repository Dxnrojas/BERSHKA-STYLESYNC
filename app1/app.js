// ✅ app1/app.js actualizado
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

socket.on("show-form-screens", async () => {
  const module = await import("./screens/esperafomulario_screen.js");
  clearScripts();
  module.default();
});

socket.on("show-instruction-screens", async () => {
  const module = await import("./screens/instructions_screen.js"); // ✅ corregido
  clearScripts();
  module.default();
});

// 👉 Peticiones al servidor
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
