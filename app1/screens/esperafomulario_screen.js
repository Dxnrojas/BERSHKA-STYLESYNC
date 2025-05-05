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
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." />
        </div>
  
        <div class="logo-superior">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/..." />
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(screen);
  }
  