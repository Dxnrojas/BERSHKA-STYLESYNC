import { socket } from "../app.js";

export default function renderEmailNotificationScreen({ outfitId }) {
  const app = document.getElementById("app");

  const outfitImages = {
    1: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...1.png",
    2: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...2.png",
    3: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/...3.png"
  };

  const selectedImage = outfitImages[outfitId] || "img/outfit-final.jpg";

  app.innerHTML = `
    <section id="emailnotification_screen" style="display: block">
      <div class="contenedor-final">
        <h2 class="titulo-final">¡Felicidades fashionista!</h2>
        <p class="subtitulo-final">Elegiste la opción ${outfitId}</p>
        <img src="${selectedImage}" alt="Outfit final recomendado" />
        <p class="mensaje-correo">Revisa tu correo para más detalles y sugerencias personalizadas.</p>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
