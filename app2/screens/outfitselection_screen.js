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
  
          <!-- Mensajes -->
          <h2 class="titulo-felicidades">¡Felicidades fashionista!</h2>
          <p class="subtitulo-instruccion">
            Selecciona la opción que más te guste<br />
            en tu celular
          </p>
  
          <!-- Opciones -->
          <div class="opciones-grid">
            <button class="opcion-card" data-id="1">
              <img
                src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/trebol.png"
                alt="Opción 1"
                class="icono-opcion"
              />
            </button>
            <button class="opcion-card" data-id="2">
              <img
                src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/bolitas.png"
                alt="Opción 2"
                class="icono-opcion"
              />
            </button>
            <button class="opcion-card" data-id="3">
              <img
                src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/polygon.png"
                alt="Opción 3"
                class="icono-opcion"
              />
            </button>
          </div>
        </div>
      </section>
    `;
  
    // 🎯 Lógica para capturar selección del usuario
    document.querySelectorAll(".opcion-card").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedOption = button.getAttribute("data-id");
        console.log("✅ Opción seleccionada por el usuario:", selectedOption);
  
        // Aquí puedes enviar la selección al backend o vía socket:
        // socket.emit("outfit-selected", selectedOption);
  
        // Opcional: feedback visual o pasar a pantalla siguiente
        button.classList.add("seleccionada");
      });
    });
  }
  