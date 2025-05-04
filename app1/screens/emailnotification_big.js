export default function renderEmailNotificationBigScreen() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
      <section id="emailnotification_big" style="display: block">
        <div class="contenedor-final">
          <h2 class="titulo-final">¡Felicidades fashionista!</h2>
          <p class="subtitulo-final">
            Esta es tu opción ideal, revisa tu correo para comprar tu outfit
          </p>
  
          <div class="outfit-final">
            <img src="img/outfit-final.jpg" alt="Outfit final recomendado" />
          </div>
  
          <div class="aviso-correo">
            <img src="img/logo-gmail.png" alt="Logo Gmail" class="icono-correo" />
            <p><strong>Revisa tu correo</strong> para ver tu atuendo personalizado y los enlaces para comprar prendas similares</p>
          </div>
        </div>
      </section>
    `;
  }
  