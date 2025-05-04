const { emitEvent } = require("../services/socket.service");

const handleChangeScreenEvent = (req, res) => {
  emitEvent("show-splashscreen"); // Evento que será recibido por app2
  res.send({ message: "Splashscreen triggered on app2" });
};

module.exports = {
  handleChangeScreenEvent,
};
