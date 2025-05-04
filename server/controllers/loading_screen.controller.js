const { emitEvent } = require("../services/socket.service");

const handleShowLoadingScreen = (req, res) => {
  console.log("🔥 Activando pantalla de carga");
  emitEvent("juego-terminado");
  res.send({ message: "Pantalla de carga activada" });
};

module.exports = {
  handleShowLoadingScreen,
};
