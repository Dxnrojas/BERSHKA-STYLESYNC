import renderSplashScreen from "./screens/splash_screen.js";

const socket = io("/", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

// ✅ Escuchar el evento correcto emitido desde el backend
socket.on("show-splashscreen", () => {
  clearApp();
  renderSplashScreen();
});

// (Opcional: exportar socket si lo necesitas en otros archivos)
export { socket };
