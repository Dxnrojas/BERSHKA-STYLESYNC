// ✅ server/controllers/start_game.controller.js

const { getAllUsers } = require("../db/users.db");
const { getQuestionById } = require("../db/questions.db");
const { emitEvent } = require("../services/socket.service");

const handleStartGame = async (req, res) => {
  try {
    const users = await getAllUsers();

    // ✅ Validación 1: debe haber al menos un usuario registrado
    if (users.length === 0) {
      return res.status(400).json({ error: "No hay usuarios registrados aún." });
    }

    // ✅ Validación 2: solo debe haber un jugador a la vez
    if (users.length > 1) {
      return res.status(400).json({ error: "Solo se permite un jugador a la vez." });
    }

    // ✅ Obtener la primera pregunta por ID
    const currentQuestion = getQuestionById(1);

    // ✅ Emitir evento para iniciar el juego con la primera pregunta
    emitEvent("start-game", currentQuestion);

    res.status(200).json({ message: "Juego iniciado correctamente" });
  } catch (error) {
    console.error("❌ Error al intentar iniciar el juego:", error);
    res.status(500).json({ error: "Error del servidor al iniciar el juego" });
  }
};

module.exports = { handleStartGame };
