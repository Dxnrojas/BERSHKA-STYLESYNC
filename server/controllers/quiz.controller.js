// server/controllers/quiz.controller.js
const { supabase } = require("../services/supabase.service");
const { getQuestionById, getTotalQuestions } = require("../db/questions.db");
const { emitEvent } = require("../services/socket.service");

// 🔗 Mapear respuestas a estilos
const getStyleTag = (questionId, answer) => {
  const styleMap = {
    1: {
      "Deportivo - Athleisure": "Deportivo",
      "Streetwear - Urban fashion": "Streetwear",
      "Elegante - Original": "Elegante",
      "Minimalista - Bohemio": "Minimalista",
    },
    2: {
      "Jeans": "Streetwear",
      "Vestidos": "Elegante",
      "Sudaderas (pantalón)": "Deportivo",
      "Blazers": "Minimalista",
    },
    3: {
      "Neutros": "Minimalista",
      "Vibrantes": "Streetwear",
      "Pasteles": "Elegante",
      "Oscuros": "Deportivo",
    },
    4: {
      "Deporte": "Deportivo",
      "Salidas nocturnas": "Streetwear",
      "Trabajo": "Elegante",
      "Universidad": "Minimalista",
    },
    5: {
      "Bolsos grandes": "Minimalista",
      "Gorras": "Streetwear",
      "Joyería fina": "Elegante",
      "No uso casi accesorios": "Deportivo",
    },
    6: {
      "Estampado de rayas": "Minimalista",
      "Colores nude": "Elegante",
      "Colores neón": "Streetwear",
      "No uso casi estampados": "Deportivo",
    },
    7: {
      "Zapatos": "Deportivo",
      "Camisas estampadas": "Streetwear",
      "Chaquetas": "Minimalista",
      "Blazers": "Elegante",
    },
    8: {
      "Billie Eilish": "Streetwear",
      "Princess Diana": "Elegante",
      "David Beckham": "Deportivo",
      "Harry Styles": "Minimalista",
    }
  };

  return styleMap[questionId]?.[answer] || "Desconocido";
};

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

// 🟢 Recibe y guarda la respuesta en Supabase
const submitAnswerController = async (req, res) => {
  const { answer, userId, preguntaActual } = req.body;

  if (!answer || !userId || !preguntaActual) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const style_tag = getStyleTag(Number(preguntaActual), answer);

  // Guardar en Supabase
  const { error: insertError } = await supabase
    .from("answers")
    .insert({
      user_id: userId,
      question_id: preguntaActual,
      answer,
      style_tag,
    });

  if (insertError) {
    console.error("❌ Error al guardar respuesta:", insertError.message);
    return res.status(500).json({ error: "No se pudo guardar la respuesta" });
  }

  // Obtener cuántas preguntas ya respondió el usuario
  const { data: respuestas, error: fetchError } = await supabase
    .from("answers")
    .select("question_id")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("❌ Error al consultar respuestas:", fetchError.message);
    return res.status(500).json({ error: "No se pudo verificar el progreso" });
  }

  const totalRespondidas = respuestas.length;
  const totalPreguntas = getTotalQuestions();

  console.log(`🧍 Usuario: ${userId}`);
  console.log(`📝 Respuesta: ${answer} → estilo: ${style_tag}`);
  console.log(`📊 Respuestas: ${totalRespondidas}/${totalPreguntas}`);

  if (totalRespondidas >= totalPreguntas) {
    console.log(`🎉 Usuario ${userId} completó el quiz`);
    emitEvent("juego-terminado", { userId });
    return res.json({ message: "Quiz completado correctamente" });
  }

  const siguientePregunta = getQuestionById(Number(preguntaActual) + 1);

  if (!siguientePregunta) {
    emitEvent("juego-terminado", { userId });
    return res.status(404).json({ error: "No hay más preguntas" });
  }

  emitEvent("siguiente-pregunta", {
    question: siguientePregunta,
    preguntaActual: Number(preguntaActual) + 1,
    userId,
  });

  res.json({
    message: "Respuesta guardada, siguiente pregunta enviada",
    nextQuestion: siguientePregunta,
  });
};

module.exports = {
  getCurrentQuestionController,
  submitAnswerController,
};
