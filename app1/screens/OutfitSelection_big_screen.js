// app1/screens/OutfitSelection_big_screen.js

export default function renderOutfitSelectionBigScreen({ outfits, main_style }) {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.className = "OutfitSelection_big_screen";
  section.style.display = "block";
  section.innerHTML = `
    <h1>Elige tu outfit favorito</h1>
    <p>¿Cuál de estos 3 looks te representa más? <br>La selección se enviará por correo al finalizar.</p>
    <div class="outfit-list">
      ${outfits.map((outfit, idx) => `
        <div class="outfit-opcion" data-opcion="${idx + 1}">
          <img src="${outfit.collage_image_url}" alt="Outfit sugerido ${idx + 1}" class="imagen-outfit" />
          <ul class="outfit-items">
            ${outfit.items.map(item => `
              <li>
                <a href="${item.purchase_url}" target="_blank">${item.name}</a>
              </li>
            `).join("")}
          </ul>
          <span class="outfit-label">Opción ${idx + 1}</span>
        </div>
      `).join("")}
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // Si quieres que App1 escuche clicks para debugging, puedes descomentar esto:
  // document.querySelectorAll(".outfit-opcion").forEach((opcion) => {
  //   opcion.addEventListener("click", () => {
  //     const seleccion = opcion.getAttribute("data-opcion");
  //     console.log("Opción seleccionada en app1:", seleccion);
  //   });
  // });
}
