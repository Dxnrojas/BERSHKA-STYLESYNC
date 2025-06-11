import { makeRequest, socket } from "../app.js";

export default function renderRegisterScreen() {
  const app = document.getElementById("app");

  if (!document.getElementById("bershka-register-styles")) {
  const style = document.createElement("style");
  style.id = "bershka-register-styles";
  style.textContent= ` body {
      background: #161616 !important;
    }
    #register_screen {
      background: #161616;
      min-height: 100vh;
      padding: 0;
    }
    .registro-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 36px 18px 8px 18px;
      background: #161616;
    }
    .bershka-logo-register {
      display: block;
      width: 80px;
      margin: 32px auto 18px auto;
      filter: brightness(1.8) grayscale(1);
    }
    .registro-container h2 {
      color: #fff;
      font-family: 'Montserrat', 'Inter', Arial, sans-serif;
      font-weight: 800;
      font-size: 2.2rem;
      letter-spacing: 2px;
      margin-bottom: 10px;
      margin-top: 0;
      text-align: center;
    }
    .subtexto {
      color: #fff;
      font-size: 1.18rem;
      text-align: center;
      margin-bottom: 38px;
      font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      font-weight: 400;
    }
    .subtexto strong {
      font-weight: 700;
      color: #fff;
    }
    #form-registro {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-bottom: 34px;
    }
    #form-registro input,
    #form-registro select {
      width: 100%;
      padding: 20px 18px;
      border-radius: 16px;
      border: none;
      background: #222;
      color: #eee;
      font-size: 1.12rem;
      font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      margin-bottom: 0;
      box-shadow: none;
      outline: none;
      transition: border 0.18s;
    }
    #form-registro input:focus,
    #form-registro select:focus {
      border: 2px solid #2B34BA;
    }
    .btn-azul {
      background: #232DCB;
      color: #fff;
      font-size: 1.25rem;
      font-weight: 700;
      border: none;
      border-radius: 38px;
      width: 100%;
      max-width: 480px;
      padding: 18px 0;
      margin: 28px auto 0 auto;
      cursor: pointer;
      box-shadow: 0 6px 22px #2930b241;
      transition: background 0.17s;
      font-family: 'Montserrat', 'Inter', Arial, sans-serif;
      display: block;
      text-align: center;
    }
    .btn-azul:hover,
    .btn-azul:focus {
      background: #1119AA;
    }
    .legal-text {
      color: #fff;
      font-size: 0.89rem;
      opacity: 0.88;
      margin-top: 34px;
      text-align: left;
      width: 100%;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.4;
      font-family: 'Inter', 'Montserrat', Arial, sans-serif;
    }
    .legal-text .bold {
      font-weight: 700;
      color: #fff;
    }
    
    
    @media (min-width: 430px) {
      .registro-container {
        padding-top: 48px;
      }
      .bershka-logo-register {
        width: 92px;
      }
      #form-registro input,
      #form-registro select {
        font-size: 1.17rem;
      }
      .btn-azul {
        font-size: 1.27rem;
      }
      .legal-text {
        font-size: 1.01rem;
      }
    }
  `;
  document.head.appendChild(style);
}

  app.innerHTML = `
     <section id="register_screen">
    <div class="registro-container">
      <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaLogoLightMode.png" alt="Logo Bershka" class="bershka-logo-register"/>
      <h2>BERSHKA</h2>
      <p class="subtexto">Ingresa tus datos para <strong>comenzar</strong></p>
      <form id="form-registro">
        <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
        <input type="email" id="email" name="email" placeholder="E-mail" required />
        <select id="talla" name="talla" required>
          <option value="">Talla</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
        </select>
        <button type="submit" id="btn-siguiente" class="btn-azul">Siguiente</button>
      </form>
      <p class="legal-text">
        Confirmo que he leído y acepto la <span class="bold">política de privacidad</span> y el <span class="bold">tratamiento de mis datos personales</span> de acuerdo con los términos establecidos.
      </p>
    </div>
  </section>
  `;

  const form = document.getElementById("form-registro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const size = document.getElementById("talla").value;

    if (!name || !email || !size) {
      alert("Por favor completa todos los campos");
      return;
    }

    const user = { name, email, size };

    try {
      const response = await makeRequest("/api/users", "POST", user);

      if (response?.user?.id) {
        // ✅ Guardar userId en localStorage
        localStorage.setItem("userId", response.user.id);

        // ✅ Confirmación visual
        alert("✅ Registro exitoso. ¡Comienza tu experiencia!");

        // ✅ Notificar al servidor que puede avanzar
        socket.emit("usuario-registrado", { userId: response.user.id });

        // ⚠️ Si quieres avanzar de inmediato desde aquí sin esperar socket,
        // podrías usar: renderStartBtnScreen();
      } else {
        alert("❌ Hubo un problema al guardar tu información.");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      alert("⚠️ No pudimos registrarte. Intenta de nuevo.");
    }
  });
}
