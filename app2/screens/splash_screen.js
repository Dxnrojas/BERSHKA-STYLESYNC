import { makeRequest } from "../app.js";

export default function renderSplashScreen() {
  const app = document.getElementById("app");

  const splashSection = document.createElement("section");
  splashSection.id = "splash-inicial";
  splashSection.style.display = "block";

  if (!document.getElementById("bershka-splash-styles")) {
  const style = document.createElement("style");
  style.id = "bershka-splash-styles";
  style.textContent = `
 body {
      background: #FCFBF7;
    }
    .splash-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 8px 0 8px;
      background: #FCFBF7;
    }
    .splash-logo {
      margin-top: 30px;
      margin-bottom: 16px;
      width: 128px;
      max-width: 65vw;
      filter: grayscale(0) contrast(1.3);
      display: block;
    }
    .splash-characters {
      margin-bottom: 36px;
      width: 195px;
      max-width: 90vw;
      display: block;
      filter: grayscale(1) contrast(1.08);
    }
    .splash-container h1 {
      text-align: center;
      font-size: 1.45rem;
      font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      color: #222;
      font-weight: 700;
      margin-bottom: 35px;
      line-height: 1.2;
    }
    .btn-naranja {
      background: #FF8139;
      color: #181818;
      border: none;
      border-radius: 32px;
      font-weight: 700;
      font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      font-size: 1.13rem;
      padding: 16px 0;
      width: 90vw;
      max-width: 340px;
      margin-bottom: 12px;
      margin-top: 10px;
      box-shadow: 0 4px 16px #fbcfc2b0;
      cursor: pointer;
      transition: background 0.18s;
    }
    .btn-naranja:hover,
    .btn-naranja:focus {
      background: #F86207;
      color: #fff;
    }
    @media (min-width: 430px) {
      .splash-container {
        min-height: 96vh;
        padding-top: 30px;
      }
      .splash-logo {
        width: 136px;
      }
      .splash-characters {
        width: 210px;
      }
    }
  `;
  document.head.appendChild(style);

}
  splashSection.innerHTML = `
  
    <div class="splash-container">
    <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSyncDarkMode.png" 
         alt="Logo Bershka Style Sync" class="splash-logo" />
    <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/splash//splash.png"
         alt="Splash personajes" class="splash-characters" />
    <h1>¡Únete a nosotros y descubre tu estilo perfecto!</h1>
    <button id="btn-comenzar" class="btn-naranja">Comenzar</button>
  </div>
  `;

  app.innerHTML = ""; // 🔁 Limpia cualquier contenido anterior
  app.appendChild(splashSection);

  document.getElementById("btn-comenzar").addEventListener("click", async () => {
    try {
      const res = await makeRequest("/api/splash/comenzar", "POST");
      console.log("✅ Evento 'comenzar' enviado:", res);
    } catch (error) {
      console.error("❌ Error al enviar evento de comenzar:", error);
    }
  });
}
