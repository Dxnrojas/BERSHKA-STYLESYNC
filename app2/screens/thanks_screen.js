export default function renderThanksScreen() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
      <section id="thanks_screen" style="display: block">
        <div class="gracias-container">
          <h2 class="titulo-gracias">¡Gracias por participar!</h2>
          <p class="mensaje-gracias">Tu estilo es único y ahora lo sabes 😉</p>
          <img src="img/icono-corazon.png" alt="Icono corazón" class="icono-corazon" />
        </div>
      </section>
    `;
  }
  