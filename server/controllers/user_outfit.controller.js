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

    // 3. Emitimos el evento Socket.IO a ambas apps para mostrar el outfit seleccionado
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

    // 4. Enviamos el correo al usuario con la info del outfit
    try {
      // Armamos la lista de prendas con links de compra
      const items = Array.isArray(selectedOutfit.items) ? selectedOutfit.items : [];
      const outfitItemsHtml = items.map(
        (item) => `<li><a href="${item.purchase_url}" target="_blank">${item.name}</a></li>`
      ).join("");
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:24px;">
          <h2>¡Hola ${user.name || "fashionista"}! 👗✨</h2>
          <p>¡Aquí está tu outfit personalizado generado por IA con Bershka StyleSync!</p>
          <img src="${collageImageUrl}" alt="Outfit" style="max-width:100%;border-radius:12px;box-shadow:0 2px 8px #eee;margin:16px 0;">
          <h3>Prendas incluidas:</h3>
          <ul style="padding-left:20px;font-size:16px;">
            ${outfitItemsHtml}
          </ul>
          <p style="margin-top:24px;color:#C43670;"><strong>¡Gracias por usar Bershka StyleSync!</strong></p>
        </div>
      `;

      await sendOutfitEmail({
        to: user.email,
        subject: "Tu outfit personalizado de Bershka StyleSync",
        html,
      });
      console.log(`📧 Email enviado correctamente a ${user.email}`);
    } catch (emailErr) {
      console.error("❌ Error enviando el email:", emailErr);
      // No interrumpimos el flujo: solo logueamos el error
    }

    // 5. Respuesta a frontend
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
