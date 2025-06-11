export default function renderEsperaFormularioScreen() {

  const style = document.createElement("style");
style.textContent = `body, html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #1b1b1b;
  color: white;
}

#esperafomulario_screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contenedor-momento {
  text-align: center;
  padding: 10rem 20px;
  position: relative;
}

.titulo-momento {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.resaltado {
  color: #ff914d;
  font-weight: 700;
}

.texto-momento {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.5;
  margin-bottom: 30px;
}

.imagen-momento img {
  width: 180px; 
}

.logo-superior {
  position: absolute;
  top: 20px;
  right: 20px;
}

.logo-superior img {
  width: 100px; 
}
`;
document.head.appendChild(style);

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
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/splash//splash1.png" width="150px" />
        </div>
  
        <div class="logo-superior">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png" width="150px" />
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(screen);
  }
  