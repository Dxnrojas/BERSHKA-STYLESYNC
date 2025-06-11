// app2/screens/answerselect_screen.js
import { makeRequest, socket } from "../app.js";

export default function renderAnswerSelectScreen(question, _, totalPreguntas, preguntaActual) {
  const app = document.getElementById("app");

  // Inyecta el CSS (centrado logo + fixes)
  if (!document.getElementById("answerselect-css")) {
    const style = document.createElement("style");
    style.id = "answerselect-css";
    style.innerHTML = `
      body, #app {
        background: #181818 url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/fondos/stars.png');
        background-size: cover;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }
      .juego-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 0 0 0;
        min-height: 100vh;
        box-sizing: border-box;
      }
      .juego-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100vw;
        justify-content: center;
        margin-bottom: 10px;
        gap: 0;
        position: relative;
      }
      .logo-header-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0;
      }
      .logo-header {
        width: 120px;
        margin: 0 auto;
        display: block;
      }
      .menu-btn {
        position: absolute;
        right: 30px;
        top: 16px;
        font-size: 29px;
        color: #fff;
        background: none;
        border: none;
      }
      .juego-card {
        width: 96vw;
        max-width: 500px;
        background: #222;
        border-radius: 26px;
        box-shadow: 0 2px 20px 0 rgba(0,0,0,0.18);
        margin-bottom: 26px;
        padding-bottom: 8px;
      }
      .card-imagen {
        width: 100%;
        border-radius: 26px 26px 0 0;
        object-fit: cover;
        height: 150px;
        display: block;
      }
      .card-pregunta {
        margin: 14px 0 8px 0;
        text-align: center;
        font-size: 1.7rem;
        color: #fff;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
        font-weight: 700;
        letter-spacing: -0.7px;
      }
      .juego-opciones {
        width: 96vw;
        max-width: 500px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 10px;
      }
      .opcion {
        background: #262626;
        border-radius: 24px;
        box-shadow: 0 2px 14px 0 rgba(0,0,0,0.14);
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid transparent;
        transition: box-shadow 0.13s, border 0.14s;
        cursor: pointer;
        padding: 0;
      }
      .opcion:active {
        border: 2px solid #C43670;
        box-shadow: 0 4px 24px 0 rgba(196,54,112,0.19);
      }
      .opcion img {
        width: 66px;
        height: 66px;
        object-fit: contain;
        user-select: none;
        pointer-events: none;
      }
      @media (max-width: 480px) {
        .juego-card, .juego-opciones { max-width: 99vw; }
        .card-imagen { height: 112px; }
      }
    `;
    document.head.appendChild(style);
  }

  // Banner dinámico según la pregunta (usa preguntaActual, indexado desde 1)
  const questionImages = [
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta1.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta2.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta3.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta4.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta5.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta6.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta7.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta8.jpg"
  ];

  // ÍNDICE: preguntaActual debe empezar en 1
  const bannerUrl = questionImages[(preguntaActual - 1) % questionImages.length];

  // Iconos de opciones
  const optionIcons = [
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
  ];

  // Header logo
  const headerLogo = "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png";

  // HTML
  const section = document.createElement("section");
  section.id = "answerselect_screen";
  section.style.display = "block";
  section.innerHTML = `
    <div class="juego-container">
      <div class="juego-header">
        <div class="logo-header-container">
          <img src="${headerLogo}" class="logo-header" />
        </div>
      </div>
      <div class="juego-card">
        <img src="${bannerUrl}" class="card-imagen" />
        <h2 class="card-pregunta">Pregunta ${preguntaActual}</h2>
      </div>
      <div class="juego-opciones" id="opciones-container">
        ${question.options.map((_, i) => `
          <button class="opcion" id="btn-${i}">
            <img src="${optionIcons[i]}" />
          </button>
        `).join("")}
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // Lógica de respuesta
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

        if (res.nextQuestion) {
          socket.emit("respuesta-recibida", { preguntaActual });
        }
      } catch (err) {
        console.error("❌ Error al enviar respuesta:", err);
      }
    });
  });
}
