export default function renderQuestionScreen(question) {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "question_screen";
  section.style.display = "block";

  section.innerHTML = `
    <div class="contenedor-pregunta">
      <div class="titulo">
        <h2 id="responsive-logo">Pregunta</h2>
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaLogo.png" width="30px" alt="Logo" />
      </div>
      <div class="imagen-pregunta">
        <img id="imagen-pregunta" src="ruta-imagen-pregunta.jpg" alt="Imagen relacionada a la pregunta">
      </div>
      <p class="texto-pregunta" id="texto-pregunta">
        ${question.text}
      </p>
      <div class="barra-progreso">
        <div id="barra-progreso-interna"></div>
      </div>
      <div class="opciones-respuesta" id="contenedor-opciones">
        <!-- Opciones se llenan dinámicamente -->
      </div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // Renderizar visualmente las opciones (solo para mostrar, no seleccionar)
  const contenedorOpciones = document.getElementById("contenedor-opciones");

  question.options.forEach((opcionText) => {
    const opcion = document.createElement("div");
    opcion.classList.add("opcion", "solo-visual");
    opcion.innerText = opcionText;
    contenedorOpciones.appendChild(opcion);
  });
}
