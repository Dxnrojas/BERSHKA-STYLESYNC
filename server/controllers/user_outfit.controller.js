const { saveUserOutfit, supabase } = require("../services/supabase.service");
const { emitEvent } = require("../services/socket.service"); // 👈 Necesario para emitir el evento

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

    // Recupera el email del usuario (por si quieres enviar correo después)
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (userError || !user?.email) {
      return res.status(404).json({ error: "No se encontró el email del usuario" });
    }

    // --- 🔥 Aquí emitimos el evento Socket.IO a ambas apps ---
    // Para App2 (móvil):
    emitEvent("show-email-screen", {
      userId,
      selectedOutfit: {
        ...selectedOutfit,
        collage_image_url: collageImageUrl,
        main_style: mainStyle
      }
    });
    // Para App1 (pantalla grande):
    emitEvent("show-email-big-screen", {
      userId,
      selectedOutfit: {
        ...selectedOutfit,
        collage_image_url: collageImageUrl,
        main_style: mainStyle
      }
    });

    // --- Listo para email después ---

    res.json({
      message: "Outfit guardado correctamente",
      outfit: savedOutfit,
      user
    });
  } catch (err) {
    console.error("❌ Error en selectOutfitController:", err);
    res.status(500).json({ error: "Error guardando outfit" });
  }
};

module.exports = {
  selectOutfitController,
};
