export default function renderEsperaFormularioScreen() {
    const app = document.getElementById("app");
  
    const screen = document.createElement("section");
    screen.id = "esperafomulario_screen";
    screen.style.display = "block";
    screen.innerHTML = `
      <div class="contenedor-momento">
        <h2 class="titulo-momento">
          Tu momento fashion: <span class="resaltado">¡Llénalo y Enciéndelo!</span>
        </h2>
  
        <p class="texto-momento">
          ¡Deja de stalkear outfits y empieza a vivirlos! Tu yo fashionista te está esperando...
          ¡al otro lado de este formulario! No lo hagas esperar
        </p>
  
        <div class="imagen-momento">
          <img src="ruta-imagen-corazon.png" alt="Ilustración corazón motivacional" />
        </div>
  
        <div class="logo-superior">
          <img src="ruta-logo-blanco.png" alt="Logo Bershka Style Sync" />
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(screen);
  }
  