import { makeRequest } from "../app.js";

export default function renderStartBtnScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "startbtn_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="instrucciones-container">
      <img 
        src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." 
        alt="Icono Bershka" 
        class="icono-blanco"
      />
      <p class="mensaje">Presione el <strong>botón</strong> para continuar</p>
      <div class="boton-container">
        <button class="btn-juego" id="btn-iniciar-juego">
          <img 
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/trebol.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvdHJlYm9sLnBuZyIsImlhdCI6MTc0NjQxMzY3MywiZXhwIjoxNzc3OTQ5NjczfQ.b0M__KuW9fLytMLGRfPJiufuNtBniGfh46c6ktwpmlo" 
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
