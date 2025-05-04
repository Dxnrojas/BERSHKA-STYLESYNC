export default function renderLoadingBigScreen() {
    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.id = "pantalla-cargando-ia";
    section.style.display = "block"; // Mostrar directamente
  
    section.innerHTML = `
      <div class="contenedor-cargando">
        <!-- Ícono de carga animado -->
        <div class="icono-carga">
          <img src="img/spinner.gif" alt="Cargando" />
        </div>
  
        <!-- Mensaje principal -->
        <h2>Generando tu atuendo con IA...</h2>
  
        <!-- Subtítulo explicativo -->
        <p class="texto-cargando">
          Por favor, espera mientras creamos la mejor <strong>combinación</strong> para ti.
        </p>
  
        <!-- Imagen decorativa -->
        <div class="imagen-cargando">
          <img src="img/modelo-esperando.jpg" alt="Modelo esperando atuendo generado por IA" />
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  