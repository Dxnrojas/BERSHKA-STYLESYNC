// app1/screens/email_notification_big_screen.js
import { socket } from "../app.js";

export default function renderEmailNotificationBigScreen({ selectedOutfit }) {
  const app = document.getElementById("app");

  // Inyecta el CSS sólo una vez
  if (!document.getElementById("emailnoti-big-css")) {
    const style = document.createElement("style");
    style.id = "emailnoti-big-css";
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
        justify-content: flex-start;
        padding-top: 42px;
      }
      .titulo-final {
        color: #FF8540;
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 10px;
        letter-spacing: 1px;
        text-align: center;
      }
      .subtitulo-final {
        color: #fff;
        font-size: 1.4rem;
        margin-bottom: 22px;
        text-align: center;
        font-weight: 400;
      }
      .outfit-final {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }
      .outfit-collage {
        width: 320px;
        max-width: 96vw;
        margin: 0 0 0 0;
        background: none;
        border-radius: 0;
        box-shadow: none;
        display: block;
      }
      .outfit-items {
        color: #fff;
        font-size: 1.13rem;
        list-style: none;
        padding: 0;
        margin: 24px 0 0 0;
        text-align: center;
      }
      .outfit-items li a {
        color: #fff;
        text-decoration: underline dotted #FF8540 1.5px;
        font-weight: 400;
        transition: color 0.2s;
      }
      .outfit-items li a:hover {
        color: #FF8540;
      }
      .aviso-correo {
        margin-top: 36px;
        padding: 20px 36px;
        border-radius: 32px;
        background: #e5e5e5;
        color: #181818;
        display: flex;
        align-items: center;
        font-size: 1.15rem;
        font-weight: 400;
        box-shadow: 0 2px 12px 0 rgba(30,30,30,0.08);
        max-width: 740px;
        text-align: center;
        gap: 18px;
      }
      .aviso-correo strong {
        font-weight: 700;
      }
      .icono-correo {
        width: 34px;
        height: 34px;
        margin-right: 10px;
      }
      @media (max-width: 900px) {
        .outfit-collage { width: 220px; }
        .aviso-correo { font-size: 0.95rem; padding: 14px 8px;}
      }
    `;
    document.head.appendChild(style);
  }

  if (!selectedOutfit) {
    app.innerHTML = `<p style="color:red;">No se pudo cargar el outfit seleccionado.</p>`;
    return;
  }

  app.innerHTML = `
    <section id="emailnotification_big" style="display: block">
      <div class="contenedor-final">
        <h2 class="titulo-final">¡Felicidades fashionista!</h2>
        <p class="subtitulo-final">
          Esta es tu opción ideal, revisa tu correo para comprar tu outfit
        </p>
        <div class="outfit-final">
          <img src="${selectedOutfit.collage_image_url}" alt="Outfit final recomendado" class="outfit-collage" />
        </div>
        <div class="aviso-correo">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos/bershkaLogoLightMode.png" alt="Logo Bershka" class="icono-correo" />
          <span>
            <strong>Revisa tu correo</strong> para ver tu atuendo personalizado y los enlaces para comprar prendas similares
          </span>
        </div>
      </div>
    </section>
  `;

  setTimeout(() => {
    socket.emit("gracias-participacion");
  }, 10000);
}
