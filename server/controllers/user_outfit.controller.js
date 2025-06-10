const { saveUserOutfit, supabase } = require("../services/supabase.service");

// POST /api/user-outfits/select
const selectOutfitController = async (req, res) => {
  try {
    const { userId, selectedOutfit, collageImageUrl, mainStyle } = req.body;
    if (!userId || !selectedOutfit || !collageImageUrl || !mainStyle) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Guarda el outfit seleccionado
    const savedOutfit = await saveUserOutfit(
      userId,
      selectedOutfit,
      collageImageUrl,
      mainStyle
    );

    // Recupera el email del usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (userError || !user?.email) {
      return res.status(404).json({ error: "No se encontró el email del usuario" });
    }

    // Puedes llamar aquí la función para enviar email (lo hacemos en la siguiente fase)

    res.json({ message: "Outfit guardado correctamente", outfit: savedOutfit, user });
  } catch (err) {
    console.error("❌ Error en selectOutfitController:", err);
    res.status(500).json({ error: "Error guardando outfit" });
  }
};

module.exports = {
  selectOutfitController,
};
