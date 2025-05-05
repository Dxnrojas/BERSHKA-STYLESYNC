const {
  getQuestionById,
  getTotalQuestions,
  addUserResponse,
  getUserResponses,
} = require("../db/questions.db");

const { emitEvent } = require("../services/socket.service");

// 🟢 Devuelve una pregunta específica por ID
const getCurrentQuestionController = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Falta el ID de la pregunta" });
  }

  const question = getQuestionById(Number(id));

  if (!question) {
    return res.status(404).json({ error: "Pregunta no encontrada" });
  }

  res.json(question);
};

// 🟢 Recibe la respuesta, la guarda, verifica progreso y emite el evento correspondiente
const submitAnswerController = (req, res) => {
  const { answer, userId, preguntaActual } = req.body;

  if (!answer || !userId || !preguntaActual) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  addUserResponse(userId, answer);
  const respuestas = getUserResponses(userId);
  const totalPreguntas = getTotalQuestions();

  console.log(`🧍 Usuario: ${userId}`);
  console.log(`📝 Respuesta recibida: ${answer}`);
  console.log(`📊 Total respuestas hasta ahora: ${respuestas.length}`);
  console.table(respuestas);

  if (respuestas.length === totalPreguntas) {
    console.log(`🎉 Usuario ${userId} completó el quiz con ${respuestas.length} respuestas`);
    emitEvent("juego-terminado");
    return res.json({ message: "Quiz completado correctamente" });
  }

  const siguientePregunta = getQuestionById(Number(preguntaActual) + 1);

  if (!siguientePregunta) {
    emitEvent("juego-terminado");
    return res.status(404).json({ error: "No hay más preguntas" });
  }

  emitEvent("siguiente-pregunta", {
    question: siguientePregunta,
    preguntaActual: Number(preguntaActual) + 1,
  });

  res.json({ message: "Respuesta registrada, siguiente pregunta enviada" });
};

module.exports = {
  getCurrentQuestionController,
  submitAnswerController,
};