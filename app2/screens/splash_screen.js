import { makeRequest } from "../app.js";

export default function renderSplashScreen() {
  const app = document.getElementById("app");

  const splashSection = document.createElement("section");
  splashSection.id = "splash-inicial";
  splashSection.style.display = "block";

  splashSection.innerHTML = `
    <div class="splash-container">
      <img src="img/logo-bershka.png"https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSyncDarkMode.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jRGFya01vZGUucG5nIiwiaWF0IjoxNzQ2NDEzMTAyLCJleHAiOjE3Nzc5NDkxMDJ9.RDx5YoQLVxu_N2NmQWRmp453jxCMGa471r5L18_dozY" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/splash/splash.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJzcGxhc2gvc3BsYXNoLnBuZyIsImlhdCI6MTc0NjQxMjk5MywiZXhwIjoxOTA0MDkyOTkzfQ.rSAj5RyyQu-y0GKpdTmPpuEywHafhsSU3j4XYR2txwA" />
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
