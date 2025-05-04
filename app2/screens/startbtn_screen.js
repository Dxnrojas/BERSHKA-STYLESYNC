export default function renderStartBtnScreen() {
    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.id = "startbtn_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <div class="instrucciones-container">
        <img src="https://..." alt="Icono Bershka" class="icono-blanco" />
        <p class="mensaje">Presione el <strong>botón</strong> para continuar</p>
        <div class="boton-container">
          <button class="btn-juego" id="btn-iniciar-juego">
            <img src="https://..." alt="Botón juego" />
          </button>
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  