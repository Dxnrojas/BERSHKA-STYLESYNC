const { supabase, getProductsByStyle, uploadBase64ToSupabase } = require("../services/supabase.service");
const { generateOutfitsWithPrompt, generateOutfitCollage } = require("../services/openai.service");

// 1. Determina el main_style y lo guarda
const determineUserStyle = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Falta userId" });

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
    // No cortamos aquí, el estilo igual puede devolverse
  }

  res.json({
    message: "Estilo calculado y guardado",
    style: chosenStyle,
  });
};

// 2. Genera los outfits con OpenAI y productos de Supabase
const generateUserOutfits = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Falta userId" });

  // Leer el main_style del usuario
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("main_style")
    .eq("id", userId)
    .single();

  if (userError || !user || !user.main_style) {
    return res.status(400).json({ error: "No se encontró el main_style para el usuario" });
  }
  const mainStyle = user.main_style;

  // Traer productos filtrados por estilo
  let products;
  try {
    products = await getProductsByStyle(mainStyle);
    if (!products || products.length < 4) {
      return res.status(400).json({ error: "No hay suficientes productos para generar outfits." });
    }
  } catch (e) {
    return res.status(500).json({ error: "Error consultando productos", details: e.message });
  }

  // Generar los outfits en JSON
  let outfits;
  try {
    outfits = await generateOutfitsWithPrompt(mainStyle, products);
  } catch (e) {
    return res.status(500).json({ error: "Error generando outfits con AI", details: e.message });
  }

  // Por cada outfit: genera collage y sube a Storage
  for (let i = 0; i < outfits.length; i++) {
    try {
      const base64 = await generateOutfitCollage(outfits[i].items);
      if (base64) {
        // Filename único: userId_outfit1.png, etc.
        const filename = `${userId}_outfit${i + 1}.png`;
        const publicUrl = await uploadBase64ToSupabase(base64, filename, '');
        outfits[i].collage_image_url = publicUrl;
      } else {
        outfits[i].collage_image_url = "";
      }
    } catch (err) {
      console.error(`Error generando o subiendo collage del outfit ${i + 1}:`, err.message);
      outfits[i].collage_image_url = "";
    }
  }

  res.json({ main_style: mainStyle, outfits });
};

module.exports = {
  determineUserStyle,
  generateUserOutfits,
};
