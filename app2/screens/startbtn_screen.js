// app2/screens/startbtn_screen.js
import { makeRequest, socket } from "../app.js";

export default function renderStartBtnScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="startbtn_screen">
      <h2>¿Estás listo?</h2>
      <button id="btn-comenzar">Comenzar</button>
    </section>
  `;

  document.getElementById("btn-comenzar").addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await makeRequest("/api/start/start-game", "POST", { userId });

      if (response?.message) {
        console.log("✅ Juego iniciado");
        // Esperamos que App2 escuche el evento `start-game` y reaccione
      } else {
        alert("⚠️ No se pudo iniciar el juego.");
      }
    } catch (error) {
      console.error("❌ Error al iniciar el juego:", error);
      alert("❌ Error del servidor al iniciar el juego.");
    }
  });
}
