// app1/screens/thanks_big_screen.js

export default function renderThanksBigScreen() {
  const app = document.getElementById("app");

  // Inyecta CSS solo una vez
  if (!document.getElementById("thanksbig-css")) {
    const style = document.createElement("style");
    style.id = "thanksbig-css";
    style.innerHTML = `
      body, #app {
        background: #181818 url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/fondos/stars.png');
        background-size: cover;
        min-height: 100vh;
        margin: 0;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      }
      .gracias-container {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 46px;
      }
      .logo-bershka {
        display: block;
        width: 160px;
        margin: 0 auto 24px auto;
      }
      .titulo-gracias {
        color: #FF8540;
        font-size: 2.1rem;
        font-weight: 800;
        text-align: center;
        margin: 0 0 18px 0;
      }
      .mensaje-final {
        color: #fff;
        font-size: 1.25rem;
        font-weight: 400;
        margin-bottom: 22px;
        text-align: center;
        line-height: 1.23;
        margin-top: 0;
        max-width: 340px;
      }
      .imagen-final {
        display: block;
        width: 240px;
        max-width: 78vw;
        margin: 20px auto 0 auto;
        filter: drop-shadow(0 6px 16px rgba(0,0,0,0.2));
      }
      @media (max-width: 600px) {
        .logo-bershka { width: 110px; }
        .titulo-gracias { font-size: 1.25rem; }
        .mensaje-final { font-size: 1.08rem; }
        .imagen-final { width: 180px; }
      }
    `;
    document.head.appendChild(style);
  }

  app.innerHTML = `
    <section id="thanks_big_screen" style="display: block">
      <div class="gracias-container">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png" alt="Logo Bershka" class="logo-bershka" />
        <h2 class="titulo-gracias">¡Gracias por participar!</h2>
        <p class="mensaje-final">Tu estilo habla por ti. ¡Nos vemos en la próxima experiencia fashionista!</p>
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/splash//splash1.png" alt="Gracias" class="imagen-final" />
      </div>
    </section>
  `;
}
