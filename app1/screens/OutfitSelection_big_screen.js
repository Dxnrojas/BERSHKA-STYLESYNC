export default function renderOutfitSelectionBigScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.className = "OutfitSelection_big_screen";
  section.style.display = "block";

  section.innerHTML = `
    <!-- Opción 1 -->
    <div class="outfit-opcion" data-opcion="1">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkby5wbmciLCJpYXQiOjE3NDYzOTkwOTgsImV4cCI6MTkwNDA3OTA5OH0.Pv-zIwFWPBumvl19d62PKm70RUP7NMsvYFAK05sv1T8" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/trebol.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvdHJlYm9sLnBuZyIsImlhdCI6MTc0NjQxMzk2MSwiZXhwIjoxNzc3OTQ5OTYxfQ.r1ayZMo2geOqRj_1MuyOEp9gbKGzxMdlbNf7JS0TMh4" alt="Ícono opción 1" class="icono-outfit" />
    </div>

    <!-- Opción 2 -->
    <div class="outfit-opcion" data-opcion="2">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkbzIucG5nIiwiaWF0IjoxNzQ2NDAwMjg2LCJleHAiOjE5MDQwODAyODZ9.MzX0g_Eto0tYIbTmeVKcmwVAoIU6qr-S7tsgKn24XfQ" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/bolitas.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvYm9saXRhcy5wbmciLCJpYXQiOjE3NDY0MTM5ODQsImV4cCI6MTc3Nzk0OTk4NH0.9h01yQvG7ON9CmHz8hy_AnW4AJuj5ZYmigvqAzxzhzQ" alt="Ícono opción 2" class="icono-outfit" />
    </div>

    <!-- Opción 3 -->
    <div class="outfit-opcion" data-opcion="3">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado3png.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkbzNwbmcucG5nIiwiaWF0IjoxNzQ2NDAwNTczLCJleHAiOjE5MDQwODA1NzN9.waKVAO7hXpVSKOY74VzSTyP2gZeKZ0ZZ6BPytg7suJk" alt="Outfit sugerido 3" class="imagen-outfit" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/polygon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvcG9seWdvbi5wbmciLCJpYXQiOjE3NDY0MTQwMTEsImV4cCI6MTc3Nzk1MDAxMX0.r748MsnI9ueVaS1lMcdlPy5BJWA42YXbkd2Zeqb34gc" alt="Ícono opción 3" class="icono-outfit" />
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
