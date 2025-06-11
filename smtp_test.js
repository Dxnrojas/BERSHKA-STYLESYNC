require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 👈 ¡Esto soluciona el error del certificado!
  }
});

const mailOptions = {
  from: `"Test Bershka" <${process.env.BREVO_SMTP_USER}>`,
  to: process.env.BREVO_SMTP_USER, // te lo mandas a ti misma
  subject: "Prueba SMTP Bershka",
  text: "¡Esto es solo una prueba de conexión SMTP con Nodemailer y Brevo!",
};

async function testSMTP() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email enviado correctamente:", info.messageId);
  } catch (err) {
    console.error("❌ Error al enviar email:", err);
  }
}

testSMTP();
