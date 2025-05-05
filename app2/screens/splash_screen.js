import { makeRequest } from "../app.js";

export default function renderSplashScreen() {
  const app = document.getElementById("app");

  const splashSection = document.createElement("section");
  splashSection.id = "splash-inicial";
  splashSection.style.display = "block";

  splashSection.innerHTML = `
    <div class="splash-container">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jLnBuZyIsImlhdCI6MTc0NjQyMDI3MiwiZXhwIjoxNzc3OTU2MjcyfQ._IeLBbIyk6GtwQbHpfpf3NYs-mKUm_oAr7dQOn5FN-w" alt="Logo Bershka Style Sync" width="150px" />
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/splash/splash.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJzcGxhc2gvc3BsYXNoLnBuZyIsImlhdCI6MTc0NjQyMDMyMSwiZXhwIjoxNzc3OTU2MzIxfQ.1DDngSvimyB_nHcxSMCrBJLOKEPHjL4f7E7hm9b0ndw" alt="Splash Screen" width="150px" />
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
