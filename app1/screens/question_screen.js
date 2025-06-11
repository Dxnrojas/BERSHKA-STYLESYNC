export default function renderQuestionScreen(question) {
  // 1️⃣ Agregamos las imágenes por pregunta
  const bannerImages = [
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta1.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta2.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta3.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta4.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta5.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta6.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta7.jpg",
    "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/imgpreguntas//pregunta8.jpg"
  ];

  const style = document.createElement("style");
  style.textContent = `body, html {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #1b1b1b;
  color: white;
  height: 100%;
  width: 100%;
}


#question_screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}


.contenedor-pregunta {
  max-width: 800px;
  width: 100%;
  text-align: center;
  position: relative;
  margin-left: 16rem;
  margin-top: 2rem;
}


.titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}


.titulo h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}


.titulo img {
  width: 30px;
  opacity: 0.3;
}


.imagen-pregunta img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}


.texto-pregunta {
  font-size: 1.2rem;
  margin: 10px 0 20px 0;
}


.barra-progreso {
  width: 100%;
  height: 6px;
  background-color: #444;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 30px;
}


#barra-progreso-interna {
  width: 60%; /* Modifica este valor dinámicamente según el avance */
  height: 100%;
  background-color: #ff914d;
  transition: width 0.3s ease-in-out;
}


.opciones-respuesta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}


.opcion {
  background-color: #2b2b2b;
  border-radius: 12px;
  padding: 15px 20px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}


.opcion:hover {
  background-color: #333;
}


.opcion img {
  width: 24px;
  height: 24px;
}

`;
  document.head.appendChild(style);

  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "question_screen";
  section.style.display = "block";

  // 2️⃣ Obtener imagen según ID de la pregunta (asumiendo que el ID empieza en 1)
  const imagenURL = bannerImages[question.id - 1] || bannerImages[0]; // fallback

  section.innerHTML = `
    <div class="contenedor-pregunta">
      <div class="titulo">
        <h2 id="responsive-logo">Pregunta</h2>
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaLogoLightMode.png" width="30px" alt="Logo" />
      </div>
      <div class="imagen-pregunta">
        <img id="imagen-pregunta" src="${imagenURL}" alt="Imagen relacionada a la pregunta">
      </div>
      <p class="texto-pregunta" id="texto-pregunta">
        ${question.text}
      </p>
      <div class="barra-progreso">
        <div id="barra-progreso-interna"></div>
      </div>
      <div class="opciones-respuesta" id="contenedor-opciones"></div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // 3️⃣ Agregar opciones con íconos
  const contenedorOpciones = document.getElementById("contenedor-opciones");

  question.options.forEach((opcionText, index) => {
    const opcion = document.createElement("div");
    opcion.classList.add("opcion", "solo-visual");

    const icono = document.createElement("img");
    icono.src = question.iconUrls[index]; // icono por opción
    icono.alt = "icono opción";

    const texto = document.createElement("span");
    texto.innerText = opcionText;

    opcion.appendChild(icono);
    opcion.appendChild(texto);
    contenedorOpciones.appendChild(opcion);
  });
}
