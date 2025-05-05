import { makeRequest } from "../app.js";

export default function renderStartBtnScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "startbtn_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="instrucciones-container">
      <img 
        src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png" 
        alt="Icono Bershka" 
        class="icono-blanco"
      />
      <p class="mensaje">Presione el <strong>botón</strong> para continuar</p>
      <div class="boton-container">
        <button class="btn-juego" id="btn-iniciar-juego">
          <img 
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/botonjuego.png" 
            alt="Botón juego"
          />
        </button>
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // 🟢 Al hacer clic en el botón, se intenta iniciar el juego
  document.getElementById("btn-iniciar-juego").addEventListener("click", async () => {
    try {
      // ✅ RUTA ACTUALIZADA SEGÚN TU API
      const response = await makeRequest("/api/start/start-game", "POST");

      if (response?.message) {
        console.log("✅ Juego iniciado correctamente");
        // El servidor emitirá el evento "start-game"
      } else {
        alert(response?.error || "❌ Ocurrió un error al iniciar el juego");
      }
    } catch (error) {
      console.error("❌ Error al iniciar el juego:", error);
      alert("❌ Error al conectar con el servidor");
    }
  });
}
