const { emitEvent } = require("../services/socket.service");

const showThanksScreens = (req, res) => {
  console.log("🙏 Enviando evento para mostrar pantallas de agradecimiento");
  emitEvent("show-thanks-screens"); // Este evento lo escuchan app1 y app2
  res.json({ message: "Evento de pantallas de agradecimiento emitido" });
};

module.exports = { showThanksScreens };
