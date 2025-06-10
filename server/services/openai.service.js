// server/services/openai.service.js
require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Ultra robust parser for OpenAI JSON output (maneja markdown, comentarios, basura, múltiples bloques).
 */
function superRobustJsonArrayParse(content) {
  // Borra code blocks, markdown, y cualquier texto antes del primer [
  let cleaned = content.replace(/```json|```/gi, '').trim();

  // Busca el primer array (aunque venga con explicaciones antes)
  const startIdx = cleaned.indexOf('[');
  const endIdx = cleaned.lastIndexOf(']');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.slice(startIdx, endIdx + 1);
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      throw new Error('OpenAI JSON parse failed: ' + e.message + ' | Output: ' + cleaned.slice(0, 300));
    }
  } else {
    throw new Error('OpenAI JSON parse failed: No array found in output | Output: ' + content.slice(0, 300));
  }
}

/**
 * Llama a OpenAI para generar 3 outfits en JSON usando el estilo y productos filtrados.
 */
async function generateOutfitsWithPrompt(mainStyle, productData) {
  const prompt = `
Create exactly 3 outfits for a user whose main style is "${mainStyle}".
Each outfit must include real products as described below, grouped as either:
  - Dress-based: 1 dress (with pairing_rule "exclusive_dress") + 2 accessories
  - Set-based: 1 top, 1 bottom, 2 accessories
Respect pairing rules like "pair_with:<Item Name>".
Return ONLY a JSON array with 3 outfits, each with:
  - "outfit_type"
  - "items" (with name, image_url, purchase_url)
  - "collage_image_url": leave as "" for now, to be filled after
Only use products from:
${JSON.stringify(productData)}

IMPORTANT: Do NOT use markdown, code blocks, or explanations. Output ONLY a pure JSON array, nothing else.
  `;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  });

  // Usa el parser ultra robusto aquí:
  return superRobustJsonArrayParse(res.choices[0].message.content);
}

/**
 * Llama a OpenAI para generar una imagen collage de un outfit usando los image_url de Supabase como referencia.
 * @param {Array} outfitItems - Array de items (cada uno con image_url y name)
 * @returns {String|null} Imagen generada en base64, o null si falla.
 */
async function generateOutfitCollage(outfitItems) {
  // Prepara imágenes de referencia (public URLs de Supabase)
  const inputImages = outfitItems.map((item) => ({
    type: "input_image",
    image_url: item.image_url,
  }));

  // Arma descripción para el prompt visual
  const description = outfitItems.map((item) => item.name).join(", ");
  const prompt = `Create a clean and stylish fashion collage of the following Bershka items: ${description}. Use a white or transparent background, PNG format, and display all items clearly as if arranged for a lookbook.`;

  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          ...inputImages,
        ],
      },
    ],
    tools: [
      {
        type: "image_generation",
        background: "transparent",
        quality: "high",
      },
    ],
  });

  // Extrae la imagen generada (en base64)
  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  // Retorna el primer resultado (base64)
  return imageData.length > 0 ? imageData[0] : null;
}

module.exports = {
  generateOutfitsWithPrompt,
  generateOutfitCollage,
};
