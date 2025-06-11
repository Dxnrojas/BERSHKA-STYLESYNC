// app2/screens/outfitselection_screen.js
import { makeRequest, socket } from "../app.js"; 

const ICONOS = [
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png"
];

export default function renderOutfitSelectionScreen({ outfits, main_style, userId }) {
  const app = document.getElementById("app");

  // Inyectar el CSS solo una vez
  if (!document.getElementById("outfitselection-css")) {
    const style = document.createElement("style");
    style.id = "outfitselection-css";
    style.innerHTML = `
      body, #app {
        background: #181818 url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/fondos/stars.png');
        background-size: cover;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }
      .seleccion-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 0 0 24px 0;
        box-sizing: border-box;
      }
      .juego-header {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 10px;
        margin-top: 22px;
        padding-left: 16px;
      }
      .logo-header {
        height: 45px;
        width: auto;
      }
      .titulo-felicidades {
        color: #FF8540;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
        font-size: 1.7rem;
        font-weight: 700;
        margin: 32px 0 10px 0;
        text-align: center;
      }
      .subtitulo-instruccion {
        color: #fff;
        font-size: 1.17rem;
        font-family: 'Inter', Arial, sans-serif;
        font-weight: 400;
        text-align: center;
        margin-bottom: 34px;
      }
      .opciones-grid {
        width: 94vw;
        max-width: 420px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-top: 10px;
      }
      .opcion-card {
        background: #262626;
        border-radius: 28px;
        width: 100%;
        height: 135px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid transparent;
        box-shadow: 0 2px 14px 0 rgba(0,0,0,0.15);
        transition: box-shadow 0.14s, border 0.16s;
        cursor: pointer;
        padding: 0;
        margin: 0;
      }
      .opcion-card:active {
        border: 2.5px solid #FF8540;
        box-shadow: 0 5px 25px 0 rgba(255,133,64,0.14);
      }
      .icono-outfit {
        width: 65px;
        height: 65px;
        object-fit: contain;
        display: block;
        user-select: none;
        pointer-events: none;
      }
      @media (max-width: 480px) {
        .logo-header { height: 38px; }
        .titulo-felicidades { font-size: 1.28rem; }
        .opcion-card { height: 99px; }
        .icono-outfit { width: 49px; height: 49px; }
      }
    `;
    document.head.appendChild(style);
  }

  app.innerHTML = `
    <section id="outfitselection_screen" style="display: block">
      <div class="seleccion-container">
        <!-- Header -->
        <div class="juego-header">
          <img
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png"
            alt="Logo Bershka"
            class="logo-header"
          />
        </div>
        <h2 class="titulo-felicidades">¡Felicidades fashionista!</h2>
        <p class="subtitulo-instruccion">
          Selecciona la opción que mas te guste en tu celular
        </p>
        <div class="opciones-grid">
          ${outfits.slice(0,3).map((outfit, idx) => `
            <button class="opcion-card" data-idx="${idx}">
              <img src="${ICONOS[idx]}" class="icono-outfit" alt="icono-outfit-${idx+1}" />
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  // Lógica de selección
  document.querySelectorAll(".opcion-card").forEach((button) => {
    button.addEventListener("click", async () => {
      const selectedIndex = Number(button.getAttribute("data-idx"));
      const selectedOutfit = outfits[selectedIndex];
      const userIdLS = userId || localStorage.getItem("userId"); 
      const style = main_style || (selectedOutfit && selectedOutfit.main_style) || localStorage.getItem("main_style");
      const collageImageUrl = selectedOutfit.collage_image_url;

      try {
        const response = await makeRequest("/api/user-outfits/select", "POST", {
          userId: userIdLS,
          selectedOutfit,
          collageImageUrl,
          mainStyle: style,
        });

        app.innerHTML = `
          <section class="outfit-gracias">
            <h2 class="titulo-felicidades">¡Gracias por participar!</h2>
            <p class="subtitulo-instruccion">
              Tu look favorito será enviado a tu correo pronto.<br>¡Estate pendiente!
            </p>
          </section>
        `;

      } catch (err) {
        app.innerHTML = `
          <section class="outfit-error">
            <h2>Error</h2>
            <p>No pudimos guardar tu selección. Intenta de nuevo.</p>
          </section>
        `;
      }
    });
  });
}
