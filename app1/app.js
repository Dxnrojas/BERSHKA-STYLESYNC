import renderQRScreen from "./screens/qr_screen.js";
import renderEsperaFormularioScreen from "./screens/esperafomulario_screen.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };

switch (route.path) {
  case "/":
    clearScripts();
    renderQRScreen(route.data);
    break;
  default:
    document.getElementById("app").innerHTML = `<h1>404 - Not Found</h1>`;
}

// 🔸 Escuchar el mismo evento que app2
socket.on("next-screen", () => {
  clearScripts();
  renderEsperaFormularioScreen();
});

function navigateTo(path, data) {
  route = { path, data };
}

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

export { navigateTo, socket, makeRequest };
