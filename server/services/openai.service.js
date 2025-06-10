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
      // Si aún así falla, tira el error más claro posible
      throw new Error('OpenAI JSON parse failed: ' + e.message + ' | Output: ' + cleaned.slice(0, 300));
    }
  } else {
    // Si no hay ningún array en el texto, error
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

  // Debug opcional (puedes comentar la línea después de probar)
  // console.log("Respuesta raw de OpenAI:", res.choices[0].message.content);

  // Usa el parser ultra robusto aquí:
  return superRobustJsonArrayParse(res.choices[0].message.content);
}

module.exports = { generateOutfitsWithPrompt };
