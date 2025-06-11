// app2/screens/emailnotification_screen.js
import { socket } from "../app.js";

export default function renderEmailNotificationScreen({ selectedOutfit }) {
  const app = document.getElementById("app");

  // Inyecta CSS solo una vez
  if (!document.getElementById("emailnoti-app2-css")) {
    const style = document.createElement("style");
    style.id = "emailnoti-app2-css";
    style.innerHTML = `
      body, #app {
        background: #181818 url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/fondos/stars.png');
        background-size: cover;
        min-height: 100vh;
        margin: 0;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      }
      .contenedor-final {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 38px;
      }
      .logo-bershka {
        display: block;
        width: 170px;
        margin-bottom: 16px;
      }
      .titulo-final {
        color: #FF8540;
        font-size: 2.0rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 13px;
        letter-spacing: 0.5px;
        margin-top: 0;
      }
      .subtitulo-final {
        color: #fff;
        font-size: 1.25rem;
        margin-bottom: 21px;
        font-weight: 400;
        text-align: center;
      }
      .outfit-collage {
        width: 240px;
        max-width: 92vw;
        display: block;
        margin: 0 auto 18px auto;
      }
      .outfit-items {
        color: #fff;
        font-size: 1.07rem;
        list-style: none;
        padding: 0;
        margin: 7px 0 0 0;
        text-align: center;
      }
      .outfit-items li a {
        color: #fff;
        text-decoration: underline dotted #FF8540 1.3px;
        font-weight: 400;
        transition: color 0.2s;
      }
      .outfit-items li a:hover {
        color: #FF8540;
      }
      .mensaje-correo {
        margin-top: 30px;
        background: #e5e5e5;
        color: #181818;
        border-radius: 18px;
        font-size: 1.12rem;
        padding: 18px 14px 8px 14px;
        max-width: 94vw;
        text-align: center;
        font-weight: 500;
      }
      .mensaje-correo strong { font-weight: 700; }
      @media (max-width: 600px) {
        .logo-bershka { width: 120px; }
        .outfit-collage { width: 68vw; }
        .titulo-final { font-size: 1.2rem;}
        .mensaje-correo { font-size: 0.97rem; }
      }
    `;
    document.head.appendChild(style);
  }

  // Verifica si hay datos
  if (!selectedOutfit) {
    app.innerHTML = `<p>Error: No se encontró información del outfit seleccionado.</p>`;
    return;
  }

  app.innerHTML = `
    <section id="emailnotification_screen" style="display: block">
      <div class="contenedor-final">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png" alt="Logo Bershka" class="logo-bershka" />
        <h2 class="titulo-final">¡Felicidades fashionista!</h2>
        <div class="subtitulo-final">
          Esta es tu opción ideal, revisa tu correo para comprar tu outfit
        </div>
        <img src="${selectedOutfit.collage_image_url}" alt="Outfit final recomendado" class="outfit-collage" />
        <div class="mensaje-correo">
          <strong>Revisa tu correo</strong> para ver tu atuendo personalizado<br>
          y los enlaces para comprar prendas similares
        </div>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
