import { makeRequest } from "../app.js";

export default function renderSplashScreen() {
  const app = document.getElementById("app");

  const splashSection = document.createElement("section");
  splashSection.id = "splash-inicial";
  splashSection.style.display = "block";

  splashSection.innerHTML = `
    <div class="splash-container">
      <img src="..." class="logo" />
      <img src="..." class="personajes" />
      <h1>¡Únete a nosotros y descubre tu estilo perfecto!</h1>
      <button id="btn-comenzar" class="btn-naranja">Comenzar</button>
    </div>
  `;

  app.appendChild(splashSection);

  document.getElementById("btn-comenzar").addEventListener("click", async () => {
    await makeRequest("/comenzar", "POST");
  });
}
