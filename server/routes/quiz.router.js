const express = require("express");
const router = express.Router();

const {
  getCurrentQuestionController,
  submitAnswerController,
} = require("../controllers/quiz.controller");

// Ruta GET para obtener la pregunta actual
router.get("/current-question", getCurrentQuestionController);

// Ruta POST para enviar la respuesta del usuario
router.post("/submit-answer", submitAnswerController);

module.exports = router;
