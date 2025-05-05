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

  // ⏱️ Después de 15 segundos, cambia a la pantalla de selección de outfit
  setTimeout(() => {
    import("./OutfitSelection_big_screen.js")
      .then((module) => {
        const data = {}; // Puedes pasar datos si los necesitas
        module.default(data);
      })
      .catch((err) =>
        console.error("❌ Error al cargar OutfitSelection_big_screen.js:", err)
      );
  }, 15000);
}
