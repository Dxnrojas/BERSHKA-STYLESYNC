export default function renderThanksBigScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="thanks_big_screen" style="display: block">
      <div class="gracias-container">
        <h2 class="titulo-gracias">¡Gracias por participar!</h2>
        <p class="mensaje-final">Tu estilo habla por ti. ¡Nos vemos en la próxima experiencia fashionista! ✨</p>
        <img src="img/corazon-final.png" alt="Gracias" class="imagen-final" />
      </div>
    </section>
  `;
}
