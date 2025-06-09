require('dotenv').config();
const { OpenAI } = require('openai');
// const { generateOutfitCollage } = require('./collage.service'); // QUÍTALO POR AHORA
const { v4: uuidv4 } = require('uuid');

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Súper parser robusto para el output JSON de OpenAI.
 */
function superRobustJsonArrayParse(content) {
  let cleaned = content.replace(/```json|```/gi, '').trim();
  cleaned = cleaned.replace(/\\n/g, '');
  cleaned = cleaned.replace(/\s+\\n/g, '');

  cleaned = cleaned.replace(/":https:\/\//g, '": "https://');
  cleaned = cleaned.replace(/:https:\/\//g, 'https://');
  cleaned = cleaned.replace(/"(https:[^"]+?)\\?"/g, '"$1"');
  cleaned = cleaned.replace(/"(https:[^"]+?)\s+"/g, '"$1"');
  cleaned = cleaned.replace(/"name":\s*"([^"]*?)\s*"/g, '"name":"$1"');
  cleaned = cleaned.replace(/"image_url":\s*"([^"]*?)\s*"/g, '"image_url":"$1"');
  cleaned = cleaned.replace(/"purchase_url":\s*"([^"]*?)\s*"/g, '"purchase_url":"$1"');

  // Busca todos los objetos de outfit COMPLETOS
  const objects = cleaned.match(/{[\s\S]*?}(?=,?\s*{|\s*])/g);
  if (objects && objects.length >= 1) {
    const validObjects = [];
    for (let obj of objects) {
      try {
        validObjects.push(JSON.parse(obj));
      } catch (e) {}
    }
    if (validObjects.length > 0) return validObjects;
  }

  // Fallback: intenta parsear todo
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      "❌ Could not parse OpenAI output as JSON.\nRAW OUTPUT:\n" + content +
      "\nError:\n" + err.message
    );
  }
}

/**
 * Genera 3 outfits usando OpenAI según main_style y tus prendas disponibles.
 * Los elementos pueden repetirse. NO genera collage.
 * @param {string} main_style
 * @param {Array} clothes
 * @returns {Promise<Array>} Outfits
 */
async function getOutfitSuggestionsFromAI(main_style, clothes) {
  const productData = JSON.stringify(clothes, null, 2);

  const prompt = `
Your mission:

- Create exactly 3 outfits for a user whose main style is "${main_style}".
- Elements CAN repeat across outfits if needed, don't worry about uniqueness.
- Each outfit must be one of these two types:

  1. Dress-based:
     - Exactly 1 dress with the pairing_rule "exclusive_dress".
     - Exactly 2 accessories.

  2. Set-based:
     - Exactly 1 top.
     - Exactly 1 bottom.
     - Exactly 2 accessories.

- If any clothing item has a pairing_rule in the format "pair_with:<Item Name>", you MUST include the paired item in the same outfit.
- For each outfit, include a field for "collage_image_url" (put a placeholder like https://placehold.co/400x500/png).
- Do not put :https:// anywhere. Always start URLs with https:// directly.
- Do NOT add \\n anywhere inside any property.
- Do NOT add extra spaces at the end of any value.
- Only output the JSON array, nothing else. No explanations, no text, no comments.

Return your result as a JSON array with exactly 3 outfit objects. Each object must include:
  - "outfit_type": either "dress-based" or "set-based"
  - "items": an array of clothing items in this outfit. Each item must include:
    - "name": string, the product name
    - "image_url": string, URL of the PNG image
    - "purchase_url": string, URL to buy the item
  - "collage_image_url": string, URL of the combined collage image of all item images in the outfit

Example output:

[
  {
    "outfit_type": "dress-based",
    "items": [
      { "name": "Red Summer Dress", "image_url": "https://...", "purchase_url": "https://..." },
      { "name": "Leather Belt", "image_url": "https://...", "purchase_url": "https://..." },
      { "name": "Gold Hoop Earrings", "image_url": "https://...", "purchase_url": "https://..." }
    ],
    "collage_image_url": "https://placehold.co/400x500/png"
  },
  {
    "outfit_type": "set-based",
    "items": [
      { "name": "White Tank Top", "image_url": "https://...", "purchase_url": "https://..." },
      { "name": "Blue Jeans", "image_url": "https://...", "purchase_url": "https://..." },
      { "name": "Silver Bracelet", "image_url": "https://...", "purchase_url": "https://..." },
      { "name": "Black Sunglasses", "image_url": "https://...", "purchase_url": "https://..." }
    ],
    "collage_image_url": "https://placehold.co/400x500/png"
  },
  {
    "outfit_type": "dress-based",
    "items": [ ... ],
    "collage_image_url": "https://placehold.co/400x500/png"
  }
]

Important notes:
- Only include items that are actually available in the provided product database.
- Do NOT include any explanation, description, greetings, or extra text.
- Do NOT include code blocks or markdown formatting.
- Do NOT use headings, preambles, or say things like “Here is the JSON”.

FINAL RULES:
- Only output the JSON array, nothing else.
- Do not add any text before or after the JSON.
- Do not use code blocks, markdown, or explanations.
- If you understand, just output the required JSON.

Here are the available products (as JSON):
${productData}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: prompt }
    ],
    temperature: 1,
    max_tokens: 2000
  });

  const content = completion.choices[0].message.content;
  let outfits = superRobustJsonArrayParse(content);

  // Siempre devuelve un array (aunque esté vacío)
  if (!Array.isArray(outfits)) outfits = [];
  // Llena con placeholders si vienen menos de 3 para que tu frontend no explote
  while (outfits.length < 3) {
    outfits.push({
      outfit_type: "set-based",
      items: [],
      collage_image_url: "https://placehold.co/400x500/png"
    });
  }

  // ❌ OMITIDO: NO se genera collage real

  return outfits;
}

module.exports = { getOutfitSuggestionsFromAI };
