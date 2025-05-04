const { emitEvent } = require("../services/socket.service");

// 🔹 Esta función se ejecuta cuando el usuario presiona el botón en la pantalla QR (app1)
const handleChangeScreenEvent = (req, res) => {
  // 🔸 Emitimos el evento "next-screen" a todos los clientes conectados (app2 debe escucharlo)
  emitEvent("next-screen");

  // 🔸 Respondemos al cliente que hizo la petición
  res.send({ message: "Cambio de pantalla exitoso (splash + espera)" });
};

module.exports = {
  handleChangeScreenEvent,
};

