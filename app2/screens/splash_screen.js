import { makeRequest } from "../app.js";

export default function renderSplashScreen() {
  const app = document.getElementById("app");

  const splashSection = document.createElement("section");
  splashSection.id = "splash-inicial";
  splashSection.style.display = "block";

  splashSection.innerHTML = `
    <div class="splash-container">
      <img src="img/logo-bershka.png" class="logo" />
      <img src="img/personajes.png" class="personajes" />
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
