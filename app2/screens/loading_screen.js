// app2/screens/loading_screen.js

export default function renderLoadingScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "loading_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="carga-container">
      <div class="juego-header">
        <img
          src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..."
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

  // ❌ NO pongas setTimeout ni importes la siguiente pantalla aquí
}
