import { socket } from "../app.js";

export default function renderEmailNotificationBigScreen({ outfitId }) {
  const app = document.getElementById("app");

  const outfitImages = {
    1: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...1.png",
    2: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...2.png",
    3: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...3.png"
  };

  const selectedImage = outfitImages[outfitId] || "img/outfit-final.jpg";

  app.innerHTML = `
    <section id="emailnotification_big" style="display: block">
      <div class="contenedor-final">
        <h2 class="titulo-final">¡Felicidades fashionista!</h2>
        <p class="subtitulo-final">Elegiste la opción ${outfitId}</p>
        <div class="outfit-final">
          <img src="${selectedImage}" alt="Outfit final recomendado" />
        </div>
        <div class="aviso-correo">
          <img src="img/logo-gmail.png" alt="Logo Gmail" class="icono-correo" />
          <p><strong>Revisa tu correo</strong> para ver tu atuendo personalizado y los enlaces para comprar prendas similares</p>
        </div>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
