const { emitEvent } = require("../services/socket.service");

const handleComenzar = (req, res) => {
  emitEvent("show-form-screens"); // Este evento lo escuchan app1 y app2
  res.send({ message: "Mostrando pantallas de formulario" });
};

module.exports = {
  handleComenzar,
};
