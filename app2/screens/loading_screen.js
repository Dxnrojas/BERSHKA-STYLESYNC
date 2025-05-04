export default function renderLoadingScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "loading_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="carga-container">
      <div class="juego-header">
        <img
          src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png"
          alt="Logo Bershka"
          class="logo-header"
        />
      </div>
      <div class="spinner"></div>
      <img src="img/foto-modelo-generado.jpg" alt="Modelo generado" class="modelo-img" />
      <h2 class="carga-titulo">Generando tu atuendo con IA...</h2>
      <p class="carga-subtitulo">
        Por favor, espera mientras creamos<br />
        la mejor <strong>combinación</strong> para ti.
      </p>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // ⏱️ Después de 15 segundos, cambia a la pantalla de selección de outfit
  setTimeout(() => {
    import("./outfitselection_screen.js")
      .then((module) => {
        const data = {}; // Puedes incluir datos si se requieren
        module.default(data);
      })
      .catch((err) =>
        console.error("❌ Error al cargar outfitselection_screen.js:", err)
      );
  }, 15000);
}
