export default function renderLoadingBigScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "loading_big_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="contenedor-cargando">
      <div class="icono-carga">
        <img src="ruta-spinner.gif" alt="Cargando" />
      </div>
      <h2>Generando tu atuendo con IA...</h2>
      <p class="texto-cargando">
        Por favor, espera mientras creamos la mejor <strong>combinación</strong> para ti.
      </p>
      <div class="imagen-cargando">
        <img src="ruta-imagen-modelo.jpg" alt="Modelo esperando atuendo generado por IA" />
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);
}
