import renderSplashScreen from "./screens/splash_screen.js";

const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// ✅ Cambiado: ahora escucha el evento correcto que emite el backend
socket.on("next-screen", () => {
  clearApp();
  renderSplashScreen();
});

export { socket };
