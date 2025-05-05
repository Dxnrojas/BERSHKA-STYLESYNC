import { makeRequest, socket } from "../app.js";

export default function renderAnswerSelectScreen(question, _, totalPreguntas, preguntaActual) {
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
  let hasAnswered = false;

  botones.forEach((boton, index) => {
    boton.addEventListener("click", async () => {
      if (hasAnswered) return;
      hasAnswered = true;

      const answer = question.options[index];

      try {
        const res = await makeRequest("/api/quiz/submit-answer", "POST", {
          answer,
          userId,
          preguntaActual,
        });

        console.log("📤 Respuesta enviada:", answer);
        console.log("📥 Respuesta del backend:", res.message);

        // Si el servidor no está enviando la siguiente pregunta, forzamos el evento:
        if (res.nextQuestion) {
          socket.emit("respuesta-recibida", { preguntaActual }); // Emitir si necesario
        }
      } catch (err) {
        console.error("❌ Error al enviar respuesta:", err);
      }
    });
  });
}
