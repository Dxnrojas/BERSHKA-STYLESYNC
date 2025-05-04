const { emitEvent } = require("../services/socket.service");

const showOutfitScreen = (req, res) => {
  // Puedes agregar validaciones o lógica adicional si lo necesitas
  emitEvent("show-outfit-selection");

  res.json({ message: "🧥 Pantalla de selección de outfit mostrada en app1 y app2." });
};

module.exports = {
  showOutfitScreen,
};
