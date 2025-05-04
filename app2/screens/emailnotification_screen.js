export default function renderEmailNotificationScreen() {
    const app = document.getElementById("app");
  
    app.innerHTML = `
      <section id="emailnotification_screen" style="display: block">
        <div class="final-container">
          <div class="juego-header">
            <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png" class="logo-header" />
          </div>
  
          <h2 class="titulo-felicidades">¡Felicidades fashionista!</h2>
          <p class="subtitulo-instruccion">
            Esta es tu opción ideal, revisa tu correo para comprar tu outfit
          </p>
  
          <div class="outfit-preview">
            <img src="img/outfit-final.png" alt="Outfit generado" class="imagen-outfit" />
          </div>
  
          <div class="tarjeta-gmail">
            <img src="img/gmail-icon.svg" alt="Gmail" class="icono-gmail" />
            <p><strong>Revisa tu correo</strong> para ver tu atuendo personalizado y los enlaces para comprar prendas similares</p>
          </div>
        </div>
      </section>
    `;
  }
  