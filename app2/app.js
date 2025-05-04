import renderSplashScreen from "./screens/splash_screen.js";
import renderRegisterScreen from "./screens/register_screen.js";

const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// 👉 Escucha evento para mostrar splash screen (después del QR)
socket.on("next-screen", () => {
  clearApp();
  renderSplashScreen();
});

// 👉 Escucha evento para mostrar pantalla de formulario (después de comenzar)
socket.on("show-form-screens", () => {
  clearApp();
  renderRegisterScreen();
});

// 👉 Función para hacer fetch a endpoints del servidor
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

export { makeRequest };
