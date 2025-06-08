import { makeRequest, socket } from "../app.js";

export default function renderRegisterScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="register_screen">
      <div class="registro-container">
        <h2>BERSHKA</h2>
        <p class="subtexto">Ingresa tus datos para <strong>comenzar</strong></p>
        <form id="form-registro">
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
          <input type="email" id="email" name="email" placeholder="E-mail" required />
          <select id="talla" name="talla" required>
            <option value="">Selecciona tu talla</option>
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
