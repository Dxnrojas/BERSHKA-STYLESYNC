// app1/screens/OutfitSelection_big_screen.js
const ICONOS = [
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
  "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png"
];

export default function renderOutfitSelectionBigScreen({ outfits, main_style }) {
  const app = document.getElementById("app");

  // Inyecta CSS solo una vez
  if (!document.getElementById("outfit-big-css")) {
    const style = document.createElement("style");
    style.id = "outfit-big-css";
    style.innerHTML = `
      body, #app {
        background: #181818 url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/fondos/stars.png');
        background-size: cover;
        min-height: 100vh;
        margin: 0;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      }
      .OutfitSelection_big_screen {
        width: 100vw;
        min-height: 100vh;
        padding: 36px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .OutfitSelection_big_screen h1 {
        color: #FF8540;
        font-size: 2.6rem;
        font-weight: bold;
        margin-bottom: 8px;
        letter-spacing: 1px;
        text-align: center;
      }
      .OutfitSelection_big_screen p {
        color: #fff;
        font-size: 1.38rem;
        margin-bottom: 35px;
        text-align: center;
        font-weight: 400;
        max-width: 700px;
      }
      .outfit-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 32px;
        margin-top: 24px;
      }
      .outfit-opcion {
        background: #262626;
        border-radius: 24px;
        width: 360px;
        min-height: 530px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 2px 22px 0 rgba(0,0,0,0.13);
        border: 2.5px solid transparent;
        padding: 16px 8px 18px 8px;
        position: relative;
        transition: box-shadow 0.17s, border 0.17s;
      }
      .outfit-opcion:hover {
        border: 2.5px solid #FF8540;
        box-shadow: 0 7px 22px 0 rgba(255,133,64,0.13);
      }
      .imagen-outfit {
        width: 270px;
        max-width: 95%;
        margin: 0 auto 0 auto;
        display: block;
        border-radius: 0;
        background: none;
      }
      .outfit-items {
        color: #fff;
        font-size: 1rem;
        list-style: none;
        padding: 0;
        margin: 24px 0 12px 0;
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
      .outfit-label {
        display: none; /* Ocultamos la etiqueta de opción si no la quieres */
      }
      .icono-opcion {
        width: 48px;
        height: 48px;
        margin: 12px auto 0 auto;
        display: block;
        filter: drop-shadow(0 2px 6px #2227);
      }
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement("section");
  section.className = "OutfitSelection_big_screen";
  section.style.display = "block";
  section.innerHTML = `
    <h1>¡Felicidades fashionista!</h1>
    <p>Selecciona la opción que mas te guste en tu celular</p>
    <div class="outfit-list">
      ${outfits.slice(0,3).map((outfit, idx) => `
        <div class="outfit-opcion" data-opcion="${idx + 1}">
          <img src="${outfit.collage_image_url}" alt="Outfit sugerido ${idx + 1}" class="imagen-outfit" />
          <img src="${ICONOS[idx]}" class="icono-opcion" alt="icono-${idx+1}" />
        </div>
      `).join("")}
    </div>
  `;
  app.innerHTML = "";
  app.appendChild(section);
}
