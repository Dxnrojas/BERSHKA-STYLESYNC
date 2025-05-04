const { emitEvent } = require("../services/socket.service");

const handleChangeScreenEvent = (req, res) => {
  emitEvent("next-screen");
  res.send({ message: "Splashscreen activada en app2" });
};

module.exports = {
  handleChangeScreenEvent,
};
