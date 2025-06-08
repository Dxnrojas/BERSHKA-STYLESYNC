// ✅ FILE: server/controllers/start_game.controller.js
const { getQuestionById } = require("../db/questions.db");
const { emitEvent } = require("../services/socket.service");

let juegoEnCurso = false;

const handleStartGame = async (req, res) => {
  try {
    const { userId } = req.body;

    if (juegoEnCurso) {
      return res.status(400).json({ error: "Ya hay un juego en curso." });
    }

    if (!userId) {
      return res.status(400).json({ error: "Falta userId para iniciar el juego." });
    }

    const currentQuestion = getQuestionById(1);
    juegoEnCurso = true;

    emitEvent("start-game", { question: currentQuestion, userId });

    res.status(200).json({ message: "Juego iniciado correctamente" });
  } catch (error) {
    console.error("❌ Error al iniciar el juego:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = { handleStartGame };
