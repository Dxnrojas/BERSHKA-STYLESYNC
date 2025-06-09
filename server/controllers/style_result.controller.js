const { supabase } = require("../services/supabase.service");

// 🔍 Determinar estilo dominante por frecuencia + desempate
const determineUserStyle = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Falta userId" });
  }

  const { data: answers, error } = await supabase
    .from("answers")
    .select("style_tag")
    .eq("user_id", userId);

  if (error || !answers || answers.length === 0) {
    console.error("❌ Error al obtener respuestas:", error?.message);
    return res.status(500).json({ error: "No se pudo determinar el estilo" });
  }

  const styleCounts = {};
  answers.forEach(({ style_tag }) => {
    styleCounts[style_tag] = (styleCounts[style_tag] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(styleCounts));
  const topStyles = Object.entries(styleCounts)
    .filter(([_, count]) => count === maxCount)
    .map(([style]) => style);

  // 🎲 Desempate aleatorio entre los más frecuentes
  const chosenStyle =
    topStyles[Math.floor(Math.random() * topStyles.length)];

  // 💾 Guardar estilo en la tabla users
  const { error: updateError } = await supabase
    .from("users")
    .update({ main_style: chosenStyle })
    .eq("id", userId);

  if (updateError) {
    console.error("⚠️ No se pudo guardar el estilo en users:", updateError.message);
  }

  res.json({
    message: "Estilo calculado y guardado",
    style: chosenStyle,
  });
};

module.exports = { determineUserStyle };
