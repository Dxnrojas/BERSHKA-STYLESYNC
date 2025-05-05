export default function renderLoadingBigScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "loading_big_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="contenedor-cargando">
      <div class="icono-carga">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/cargando/cargando.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJjYXJnYW5kby9jYXJnYW5kby5wbmciLCJpYXQiOjE3NDY0MTM4NTIsImV4cCI6MTc3Nzk0OTg1Mn0.PrXjUby9RQQzduCc4MB6ITwJp5IVEFgKq9xE0FwRbFg" alt="Cargando" />
      </div>
      <h2>Generando tu atuendo con IA...</h2>
      <p class="texto-cargando">
        Por favor, espera mientras creamos la mejor <strong>combinación</strong> para ti.
      </p>
      <div class="imagen-cargando">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/cargando/cargando.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJjYXJnYW5kby9jYXJnYW5kby5wbmciLCJpYXQiOjE3NDY0MTM4NTIsImV4cCI6MTc3Nzk0OTg1Mn0.PrXjUby9RQQzduCc4MB6ITwJp5IVEFgKq9xE0FwRbFg" alt="Modelo esperando atuendo generado por IA" />
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
