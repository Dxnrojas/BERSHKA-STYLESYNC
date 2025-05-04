import { socket } from "../app.js"; // Asegúrate de que esto esté disponible

export default function renderOutfitSelectionScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="outfitselection_screen" style="display: block">
      <div class="seleccion-container">
        <!-- Header -->
        <div class="juego-header">
          <img
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png"
            alt="Logo Bershka"
            class="logo-header"
          />
        </div>

        <h2 class="titulo-felicidades">¡Felicidades fashionista!</h2>
        <p class="subtitulo-instruccion">Selecciona la opción que más te guste<br />en tu celular</p>

        <div class="opciones-grid">
          ${[1, 2, 3].map(
            (i) => `
            <button class="opcion-card" data-id="${i}">
              <img src="img/icono${i}.svg" alt="Opción ${i}" class="icono-opcion" />
            </button>`
          ).join("")}
        </div>
      </div>
    </section>
  `;

  // Lógica de selección
  document.querySelectorAll(".opcion-card").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedOption = button.getAttribute("data-id");
      console.log("✅ Opción seleccionada:", selectedOption);

      // 🔥 Emitir al backend
      socket.emit("outfit-selected", { outfitId: selectedOption });
    });
  });
}
