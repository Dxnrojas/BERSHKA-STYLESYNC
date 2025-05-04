export default function renderAnswerSelectScreen() {
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
          <h2 class="card-pregunta">Pregunta 1</h2>
        </div>
        <div class="juego-opciones" id="opciones-container">
          <button class="opcion"><img src="icono1.png" /></button>
          <button class="opcion"><img src="icono2.png" /></button>
          <button class="opcion"><img src="icono3.png" /></button>
          <button class="opcion"><img src="icono4.png" /></button>
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  