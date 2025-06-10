import { socket } from "../app.js";

export default function renderEmailNotificationBigScreen({ selectedOutfit }) {
  const app = document.getElementById("app");

  if (!selectedOutfit) {
    app.innerHTML = `<p style="color:red;">No se pudo cargar el outfit seleccionado.</p>`;
    return;
  }

  app.innerHTML = `
    <section id="emailnotification_big" style="display: block">
      <div class="contenedor-final">
        <h2 class="titulo-final">¡Felicidades fashionista!</h2>
        <p class="subtitulo-final">Este fue el outfit elegido por el usuario</p>
        <div class="outfit-final">
          <img src="${selectedOutfit.collage_image_url}" alt="Outfit final recomendado" class="outfit-collage" />
        </div>
        <ul class="outfit-items">
          ${selectedOutfit.items.map(item => `
            <li>
              <a href="${item.purchase_url}" target="_blank">${item.name}</a>
            </li>
          `).join("")}
        </ul>
        <div class="aviso-correo">
          <img src="img/logo-gmail.png" alt="Logo Gmail" class="icono-correo" />
          <p><strong>Revisa tu correo</strong> para ver el look y los enlaces de compra.</p>
        </div>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
