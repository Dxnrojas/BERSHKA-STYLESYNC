import { makeRequest } from "../app.js";

export default function renderAnswerSelectScreen(question) {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "anserselected_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="juego-container">
      <div class="juego-header">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png" class="logo-header" />
      </div>
      <div class="juego-card">
        <img src="img/foto-modelos.jpg" class="card-imagen" />
        <h2 class="card-pregunta">${question.text}</h2>
      </div>
      <div class="juego-opciones" id="opciones-container">
        <!-- Botones se agregan dinámicamente -->
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  const contenedor = document.getElementById("opciones-container");

  question.options.forEach((optionText) => {
    const button = document.createElement("button");
    button.classList.add("opcion");
    button.innerText = optionText;

    button.addEventListener("click", async () => {
      try {
        await makeRequest("/quiz/submit-answer", "POST", { answer: optionText });
        // No se hace nada más, el backend emitirá "next-question" y la pantalla cambiará sola
      } catch (error) {
        console.error("❌ Error al enviar respuesta:", error);
      }
    });

    contenedor.appendChild(button);
  });
}
