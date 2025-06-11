const { saveUserOutfit, supabase } = require("../services/supabase.service");
const { emitEvent } = require("../services/socket.service");
const { sendOutfitEmail } = require("../services/email.service");

// POST /api/user-outfits/select
const selectOutfitController = async (req, res) => {
  try {
    const { userId, selectedOutfit, collageImageUrl, mainStyle } = req.body;
    if (!userId || !selectedOutfit || !collageImageUrl || !mainStyle) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // 1. Guarda el outfit seleccionado en Supabase
    const savedOutfit = await saveUserOutfit(
      userId,
      selectedOutfit,
      collageImageUrl,
      mainStyle
    );

    // 2. Recupera el email y el nombre del usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (userError || !user?.email) {
      return res.status(404).json({ error: "No se encontró el email del usuario" });
    }

    // 3. Validación robusta del outfit
    if (
      !selectedOutfit.items ||
      !Array.isArray(selectedOutfit.items) ||
      selectedOutfit.items.length === 0
    ) {
      return res.status(400).json({ error: "El outfit seleccionado no tiene prendas válidas." });
    }

    // 4. Emitimos el evento Socket.IO a ambas apps para mostrar el outfit seleccionado
    emitEvent("show-email-screen", {
      userId,
      selectedOutfit: {
        ...selectedOutfit,
        collage_image_url: collageImageUrl,
        main_style: mainStyle
      }
    });
    emitEvent("show-email-big-screen", {
      userId,
      selectedOutfit: {
        ...selectedOutfit,
        collage_image_url: collageImageUrl,
        main_style: mainStyle
      }
    });

    // 5. Enviamos el correo al usuario con la info del outfit
    try {
      await sendOutfitEmail({
        to: user.email,
        userName: user.name,
        mainStyle,              // <-- Incluido para el asunto/HTML
        collageImageUrl,
        items: selectedOutfit.items
      });
      console.log(`📧 Email enviado correctamente a ${user.email}`);
    } catch (emailErr) {
      console.error("❌ Error enviando el email:", emailErr);
      // No interrumpimos el flujo
    }

    // 6. Respuesta a frontend
    res.json({
      message: "Outfit guardado y email enviado correctamente",
      outfit: savedOutfit,
      user
    });
  } catch (err) {
    console.error("❌ Error en selectOutfitController:", err);
    res.status(500).json({ error: "Error guardando outfit o enviando email" });
  }
};

module.exports = {
  selectOutfitController,
};
