import { socket } from "../app.js";

export default function renderEmailNotificationScreen({ selectedOutfit }) {
  const app = document.getElementById("app");

  // Verifica si hay datos
  if (!selectedOutfit) {
    app.innerHTML = `<p>Error: No se encontró información del outfit seleccionado.</p>`;
    return;
  }

  app.innerHTML = `
    <section id="emailnotification_screen" style="display: block">
      <div class="contenedor-final">
        <h2 class="titulo-final">¡Listo, este es tu outfit!</h2>
        <img src="${selectedOutfit.collage_image_url}" alt="Outfit final recomendado" class="outfit-collage" />
        <ul class="outfit-items">
          ${selectedOutfit.items.map(item => `
            <li>
              <a href="${item.purchase_url}" target="_blank">${item.name}</a>
            </li>
          `).join("")}
        </ul>
        <p class="mensaje-correo">Te lo hemos enviado por correo.<br>¡Que lo disfrutes!</p>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
