import { makeRequest } from "../app.js";

let respuestasUsuario = [];
let juegoFinalizado = false;

export default function renderAnswerSelectScreen(question, socket, totalPreguntas, preguntaActual) {
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
        <button class="opcion" id="btn-0"><img src="icono1.png" /></button>
        <button class="opcion" id="btn-1"><img src="icono2.png" /></button>
        <button class="opcion" id="btn-2"><img src="icono3.png" /></button>
        <button class="opcion" id="btn-3"><img src="icono4.png" /></button>
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  const botones = document.querySelectorAll(".opcion");

  botones.forEach((boton, index) => {
    boton.onclick = () => {
      if (juegoFinalizado) return;

      const respuesta = {
        preguntaId: question.id,
        pregunta: question.text,
        respuesta: question.options[index]
      };

      respuestasUsuario.push(respuesta);
      console.log(`✅ Seleccionaste: ${respuesta.respuesta}`);
      socket.emit("respuestaSeleccionada", respuesta);

      if (preguntaActual < totalPreguntas) {
        socket.emit("pedir-siguiente-pregunta", preguntaActual + 1);
      } else {
        juegoFinalizado = true;
        console.log("🎉 Respuestas completas:", respuestasUsuario);
        socket.emit("juego-terminado"); // 🔥 Aquí se dispara el cambio automático
      }
    };
  });
}
