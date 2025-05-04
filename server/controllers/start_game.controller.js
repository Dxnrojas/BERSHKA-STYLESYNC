const { getAllUsers } = require("../db/users.db");
const { getQuestionById } = require("../db/questions.db");
const { emitEvent } = require("../services/socket.service");

let juegoEnCurso = false;

const handleStartGame = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (juegoEnCurso) {
      return res.status(400).json({ error: "Ya hay un juego en curso." });
    }

    if (users.length === 0) {
      return res.status(400).json({ error: "No hay usuarios registrados aún." });
    }

    if (users.length > 1) {
      return res.status(400).json({ error: "Solo se permite un jugador a la vez." });
    }

    const currentQuestion = getQuestionById(1);
    juegoEnCurso = true;

    emitEvent("start-game", currentQuestion);
    res.status(200).json({ message: "Juego iniciado correctamente" });
  } catch (error) {
    console.error("❌ Error al iniciar el juego:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = { handleStartGame };
