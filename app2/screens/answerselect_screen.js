import { makeRequest } from "../app.js";

export default function renderAnswerSelectScreen(question, socket, totalPreguntas, preguntaActual) {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "answerselect_screen";
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
        ${question.options.map((_, i) => `<button class="opcion" id="btn-${i}"><img src="icono${i + 1}.png" /></button>`).join("")}
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("❌ No se encontró userId en localStorage.");
    return;
  }

  const botones = document.querySelectorAll(".opcion");

  botones.forEach((boton, index) => {
    boton.onclick = async () => {
      try {
        const answer = question.options[index];

        const response = await makeRequest("/quiz/submit-answer", "POST", {
          answer,
          userId,
          preguntaActual,
        });

        console.log("📤 Respuesta enviada:", answer);
        console.log("📥 Respuesta del backend:", response.message);
      } catch (err) {
        console.error("❌ Error al enviar respuesta:", err);
      }
    };
  });
}
