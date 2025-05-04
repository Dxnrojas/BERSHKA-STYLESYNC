document.addEventListener("DOMContentLoaded", function () {
  const btnComenzar = document.getElementById("btn-comenzar");
  const splash = document.getElementById("splash-inicial");
  const registro = document.getElementById("registro");

  btnComenzar.addEventListener("click", function () {
    splash.style.display = "none";       // Oculta la splash
    registro.style.display = "block";    // Muestra el registro
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-registro");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const talla = document.getElementById("talla").value.trim();

    // Crear objeto con los datos
    const datosUsuario = {
      nombre: nombre,
      email: email,
      talla: talla
    };

    // Mostrar en consola
    console.log("Datos del usuario:", datosUsuario);
  });
});