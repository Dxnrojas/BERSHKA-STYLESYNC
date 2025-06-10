// app1/screens/loading_big_screen.js

export default function renderLoadingBigScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "loading_big_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="contenedor-cargando">
      <div class="icono-carga">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." alt="Cargando" />
      </div>
      <h2>Generando tu atuendo con IA...</h2>
      <p class="texto-cargando">
        Por favor, espera mientras creamos la mejor <strong>combinación</strong> para ti.
      </p>
      <div class="imagen-cargando">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/..." alt="Modelo esperando atuendo generado por IA" />
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // ❌ NO pongas setTimeout ni importes la siguiente pantalla aquí
}
