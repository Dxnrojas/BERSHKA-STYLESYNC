import { makeRequest } from "../app.js";

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

  document.getElementById("form-registro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const talla = document.getElementById("talla").value;

    const user = { name: nombre, email, size: talla };

    try {
      // 🔁 Usa la nueva ruta con prefijo /api/users
      const response = await makeRequest("/api/users/register-user", "POST", user);

      if (response?.user) {
        alert("✅ Usuario creado con éxito");
        localStorage.setItem("userId", email);
      } else {
        alert("⚠️ Algo salió mal al guardar el usuario");
      }
    } catch (error) {
      console.error("❌ Error al enviar datos:", error);
      alert("❌ No se pudo conectar con el servidor");
    }
  });
}
