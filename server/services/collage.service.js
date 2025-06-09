// server/services/collage.service.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Ruta donde guardar los collages
const collageDir = path.join(__dirname, '../../public/collages');
if (!fs.existsSync(collageDir)) {
  fs.mkdirSync(collageDir, { recursive: true });
}

/**
 * Descarga una imagen desde una URL y la retorna como buffer.
 */
async function downloadImageToBuffer(url) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(res.data, 'binary');
}

/**
 * Genera un collage horizontal con las imágenes dadas.
 * Devuelve la URL pública al collage.
 */
async function generateOutfitCollage(imageUrls, collageName) {
  // Filtra URLs válidas
  const validUrls = (imageUrls || []).filter(
    (url) => typeof url === "string" && url.startsWith("http")
  );

  // Si no hay imágenes válidas, retorna un placeholder
  if (!validUrls.length) {
    return "https://placehold.co/400x500/png";
  }

  // Descarga todas las imágenes a buffers
  let images = [];
  for (const url of validUrls) {
    try {
      const buf = await downloadImageToBuffer(url);
      images.push(buf);
    } catch (e) {
      // Si falla alguna, la ignora (podrías hacer log)
    }
  }
  if (!images.length) return "https://placehold.co/400x500/png";

  // Usa la altura de la primera imagen, escala las demás
  let base = await sharp(images[0]).resize({ height: 500 }).toBuffer();
  let resizedImgs = [base];
  for (let i = 1; i < images.length; i++) {
    const resized = await sharp(images[i]).resize({ height: 500 }).toBuffer();
    resizedImgs.push(resized);
  }

  // Junta las imágenes horizontalmente
  const collageBuffer = await sharp({
    create: {
      width: resizedImgs.length * 400,
      height: 500,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    }
  })
    .composite(
      resizedImgs.map((img, idx) => ({
        input: img,
        left: idx * 400,
        top: 0
      }))
    )
    .png()
    .toBuffer();

  // Guarda el collage en /public/collages
  const collagePath = path.join(collageDir, collageName);
  fs.writeFileSync(collagePath, collageBuffer);

  // Retorna la ruta pública (ajusta según tu ruta en Express)
  return `/public/collages/${collageName}`;
}

module.exports = { generateOutfitCollage };
