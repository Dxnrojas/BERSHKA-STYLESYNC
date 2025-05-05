import { socket } from "../app.js";

export default function renderEmailNotificationScreen({ outfitId }) {
  const app = document.getElementById("app");

  const outfitImages = {
    1: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkby5wbmciLCJpYXQiOjE3NDYzOTkwOTgsImV4cCI6MTkwNDA3OTA5OH0.Pv-zIwFWPBumvl19d62PKm70RUP7NMsvYFAK05sv1T8",
    2: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkbzIucG5nIiwiaWF0IjoxNzQ2NDAwMjg2LCJleHAiOjE5MDQwODAyODZ9.MzX0g_Eto0tYIbTmeVKcmwVAoIU6qr-S7tsgKn24XfQ",
    3: "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/outfitpredeterminado/outfitPredeterminado3png.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJvdXRmaXRwcmVkZXRlcm1pbmFkby9vdXRmaXRQcmVkZXRlcm1pbmFkbzNwbmcucG5nIiwiaWF0IjoxNzQ2NDAwNTczLCJleHAiOjE5MDQwODA1NzN9.waKVAO7hXpVSKOY74VzSTyP2gZeKZ0ZZ6BPytg7suJk"
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
