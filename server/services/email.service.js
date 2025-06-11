// server/services/email.service.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// Configuración del transporter para Brevo
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // STARTTLS, puerto 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

/**
 * Genera el HTML bonito para el correo con la imagen y los links de compra
 * @param {Object} params
 * @param {string} params.userName
 * @param {string} params.mainStyle
 * @param {string} params.collageImageUrl
 * @param {Object} params.outfit
 * @returns {string} HTML del correo
 */
function getOutfitEmailHtml({ userName, mainStyle, collageImageUrl, outfit }) {
  const itemsArr = Array.isArray(outfit.items) ? outfit.items : [];
  return `
    <div style="font-family: Arial, sans-serif; background: #fff5fa; padding: 24px;">
      <h2 style="color:#c43670">¡Hola, ${userName || 'fashionista'}!</h2>
      <p>Te compartimos tu outfit personalizado <b>estilo ${mainStyle || 'único'}</b> generado con IA por Bershka StyleSync:</p>
      <div style="margin: 24px 0;">
        <img src="${collageImageUrl}" alt="Outfit" style="max-width: 380px; border-radius: 12px; box-shadow: 0 2px 10px #ffc3e8;">
      </div>
      <h3 style="color:#c43670">Prendas del outfit:</h3>
      <ul style="font-size: 16px; color: #333;">
        ${
          itemsArr.length > 0
            ? itemsArr.map(
                item => `<li>
                    <b>${item.name}</b><br>
                    <a href="${item.purchase_url}" target="_blank" style="color:#5c93c9;text-decoration:underline;">Comprar aquí</a>
                  </li>`
              ).join("")
            : "<li>No hay prendas listadas.</li>"
        }
      </ul>
      <p style="margin-top:32px; font-size:15px; color:#6d6d6d;">
        Gracias por jugar con Bershka StyleSync.<br>
        ¡Que tu look hable por ti!<br>
        <span style="color:#f283af; font-weight:bold;">Bershka StyleSync</span>
      </p>
    </div>
  `;
}

/**
 * Envía un correo con el outfit personalizado usando Brevo.
 * @param {Object} params
 * @param {string} params.to - Email destinatario
 * @param {string} params.userName - Nombre del usuario
 * @param {string} params.mainStyle - Estilo principal
 * @param {string} params.collageImageUrl - URL de la imagen del collage del outfit
 * @param {Object} params.outfit - Objeto outfit (debe tener 'items')
 */
async function sendOutfitEmail({ to, userName, mainStyle, collageImageUrl, outfit }) {
  if (!to || !collageImageUrl || !outfit || !Array.isArray(outfit.items) || outfit.items.length === 0) {
    throw new Error(`Faltan datos obligatorios para el correo:
      - to: ${to}
      - collageImageUrl: ${collageImageUrl}
      - outfit: ${JSON.stringify(outfit)}
      - outfit.items: ${JSON.stringify(outfit.items)}
    `);
  }

  const subject = `👗 Tu outfit Bershka StyleSync (${mainStyle || 'personalizado'})`;
  const html = getOutfitEmailHtml({ userName, mainStyle, collageImageUrl, outfit });

  const mailOptions = {
    from: `"Bershka StyleSync" <${process.env.BREVO_SMTP_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    throw error;
  }
}

module.exports = {
  sendOutfitEmail,
  getOutfitEmailHtml, // Por si lo quieres para debug
};
