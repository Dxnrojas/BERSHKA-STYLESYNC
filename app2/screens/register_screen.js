export default function renderRegisterScreen() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <section id="register_screen">
        <div class="registro-container">
          <img
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaLogoLightMode.png?token=..."
            alt="Icono Bershka"
            class="icono-blanco"
          />
          <h2>BERSHKA</h2>
          <p class="subtexto">Ingresa tus datos para <strong>comenzar</strong></p>
          <form id="form-registro">
            <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
            <input type="email" id="email" name="email" placeholder="E-mail" required />
            <input type="text" id="talla" name="talla" placeholder="Talla" required />
            <button type="submit" id="btn-siguiente" class="btn-azul">Siguiente</button>
          </form>
        </div>
      </section>
    `;
  }
  