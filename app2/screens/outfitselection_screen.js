// app2/screens/outfitselection_screen.js

import { socket } from "../app.js"; // Asegúrate de que esté bien importado

export default function renderOutfitSelectionScreen({ outfits, main_style, userId }) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="outfitselection_screen" style="display: block">
      <div class="seleccion-container">
        <!-- Header -->
        <div class="juego-header">
          <img
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png"
            alt="Logo Bershka"
            class="logo-header"
          />
        </div>

        <h2 class="titulo-felicidades">¡Felicidades fashionista!</h2>
        <p class="subtitulo-instruccion">
          Selecciona el outfit que más te guste<br />y recíbelo en tu correo
        </p>

        <div class="opciones-grid">
          ${outfits.map((outfit, idx) => `
            <button class="opcion-card" data-idx="${idx}">
              <img src="${outfit.collage_image_url}" alt="Outfit ${idx + 1}" class="imagen-outfit" />
              <ul class="outfit-items">
                ${outfit.items.map(item => `
                  <li>
                    <a href="${item.purchase_url}" target="_blank">${item.name}</a>
                  </li>
                `).join("")}
              </ul>
              <span class="outfit-label">Opción ${idx + 1}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  // Lógica de selección
  document.querySelectorAll(".opcion-card").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedIndex = button.getAttribute("data-idx");
      // Emitir selección al backend con el userId y el índice del outfit
      socket.emit("outfit-selected", { userId, outfitIndex: Number(selectedIndex) });

      // Feedback visual
      app.innerHTML = `
        <section class="outfit-gracias">
          <h2 class="titulo-felicidades">¡Gracias por participar!</h2>
          <p class="subtitulo-instruccion">Tu look favorito será enviado a tu correo pronto.<br>¡Estate pendiente!</p>
        </section>
      `;
    });
  });
}
