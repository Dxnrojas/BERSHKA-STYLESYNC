const express = require("express");
const router = express.Router();

const {
  getCurrentQuestionController,
  submitAnswerController,
  determineUserStyle,
} = require("../controllers/quiz.controller");

const { supabase } = require("../services/supabase.service");

// Ruta GET para obtener la pregunta actual
router.get("/current-question", getCurrentQuestionController);

// Ruta POST para enviar la respuesta del usuario
router.post("/submit-answer", submitAnswerController);

// 🧠 Nueva ruta para determinar el estilo dominante del usuario
router.post("/result", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Falta el userId" });
  }

  try {
    const style = await determineUserStyle(userId);

    if (!style) {
      return res.status(500).json({ error: "No se pudo determinar el estilo" });
    }

    // ✅ Guardar estilo dominante en Supabase
    const { error: updateError } = await supabase
      .from("users")
      .update({ main_style: style })
      .eq("id", userId);

    if (updateError) {
      console.error("⚠️ No se pudo guardar el estilo del usuario:", updateError.message);
    }

    res.json({ message: "Estilo determinado correctamente", style });
  } catch (err) {
    console.error("❌ Error al determinar estilo:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 👇 ESTA LÍNEA ES CLAVE
module.exports = router;
