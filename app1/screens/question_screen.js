export default function renderQuestionScreen() {
    const app = document.getElementById("app");
  
    // ✅ Ejemplo de pregunta (esto debería venir del backend o questions.db.js)
    const pregunta = {
      text: "¿Cómo describirías tu estilo personal?",
      opciones: [
        "Deportivo - Athleisure",
        "Streetwear - Urban fashion",
        "Elegante - Original",
        "Minimalista - Bohemio"
      ],
      imagen: "ruta-imagen-pregunta.jpg"
    };
  
    const section = document.createElement("section");
    section.id = "question_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <div class="contenedor-pregunta">
        <div class="titulo">
          <h2 id="responsive-logo">Pregunta #1</h2>
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaLogo.png" width="30px" alt="Logo" />
        </div>
        <div class="imagen-pregunta">
          <img id="imagen-pregunta" src="${pregunta.imagen}" alt="Imagen relacionada a la pregunta">
        </div>
        <p class="texto-pregunta" id="texto-pregunta">
          ${pregunta.text}
        </p>
        <div class="barra-progreso">
          <div id="barra-progreso-interna"></div>
        </div>
        <div class="opciones-respuesta" id="contenedor-opciones">
          <!-- Las opciones se insertan dinámicamente -->
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  
    // ✅ Renderizamos las opciones (solo visualmente, no seleccionables)
    const contenedorOpciones = document.getElementById("contenedor-opciones");
  
    pregunta.opciones.forEach((opcionText) => {
      const opcion = document.createElement("div");
      opcion.classList.add("opcion", "solo-visual"); // puedes usar esta clase para que no se vea como botón
      opcion.innerText = opcionText;
      contenedorOpciones.appendChild(opcion);
    });
  }
  