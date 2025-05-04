const {
    getCurrentQuestion,
    getNextQuestion,
    addResponse,
    getAllResponses,
  } = require("../db/questions.db");
  
  const { emitEvent } = require("../services/socket.service");
  
  // 🟢 Devuelve la pregunta actual (usado al cargar o reiniciar el juego)
  const getCurrentQuestionController = (req, res) => {
    const question = getCurrentQuestion();
    res.json(question);
  };
  
  // 🟢 Recibe una respuesta, la guarda y avanza a la siguiente pregunta
  const submitAnswerController = (req, res) => {
    const { answer } = req.body;
  
    if (!answer) {
      return res.status(400).json({ error: "Respuesta no recibida" });
    }
  
    addResponse(answer);
  
    const nextQuestion = getNextQuestion();
  
    if (nextQuestion) {
      emitEvent("next-question", nextQuestion); // lo escuchan app1 y app2
      res.json({ message: "Respuesta guardada. Mostrando siguiente pregunta." });
    } else {
      emitEvent("quiz-finished");
      res.json({ message: "Cuestionario finalizado." });
    }
  };
  
  module.exports = {
    getCurrentQuestionController,
    submitAnswerController,
  };
  