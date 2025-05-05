export default function renderOutfitSelectionBigScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.className = "OutfitSelection_big_screen";
  section.style.display = "block";

  section.innerHTML = `
    <!-- Opción 1 -->
    <div class="outfit-opcion" data-opcion="1">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/...

    <!-- Opción 2 -->
    <div class="outfit-opcion" data-opcion="2">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." alt="Ícono opción 2" class="icono-outfit" />
    </div>

    <!-- Opción 3 -->
    <div class="outfit-opcion" data-opcion="3">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." alt="Outfit sugerido 3" class="imagen-outfit" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." alt="Ícono opción 3" class="icono-outfit" />
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // Si deseas manejar clics desde app1, puedes descomentar esto:
  // document.querySelectorAll(".outfit-opcion").forEach((opcion) => {
  //   opcion.addEventListener("click", () => {
  //     const seleccion = opcion.getAttribute("data-opcion");
  //     console.log("Opción seleccionada en app1:", seleccion);
  //   });
  // });
}
