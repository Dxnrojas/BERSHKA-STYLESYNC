export default function renderOutfitSelectionBigScreen() {
    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.className = "OutfitSelection_big_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <!-- Opción 1 -->
      <div class="outfit-opcion" data-opcion="1">
        <img src="img/outfit1.jpg" alt="Outfit sugerido 1" class="imagen-outfit" />
        <img src="img/icono1.svg" alt="Ícono opción 1" class="icono-outfit" />
      </div>
  
      <!-- Opción 2 -->
      <div class="outfit-opcion" data-opcion="2">
        <img src="img/outfit2.jpg" alt="Outfit sugerido 2" class="imagen-outfit" />
        <img src="img/icono2.svg" alt="Ícono opción 2" class="icono-outfit" />
      </div>
  
      <!-- Opción 3 -->
      <div class="outfit-opcion" data-opcion="3">
        <img src="img/outfit3.jpg" alt="Outfit sugerido 3" class="imagen-outfit" />
        <img src="img/icono3.svg" alt="Ícono opción 3" class="icono-outfit" />
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  
    // Si deseas manejar clics desde app1, puedes descomentar esto:
    // document.querySelectorAll(".outfit-opcion").forEach((opcion) => {
    //   opcion.addEventListener("click", () => {
    //     const seleccion = opcion.getAttribute("data-opcion");
    //     console.log("Opción seleccionada en app1:", seleccion);
    //     // Aquí podrías emitir un socket o actualizar visualmente algo
    //   });
    // });
  }
  