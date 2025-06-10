const { getClothesByStyle } = require('../services/clothes.service');
const { getOutfitSuggestionsFromAI } = require('../services/openai.service');

async function generateOutfitsController(req, res) {
  try {
    const { main_style } = req.body;
    if (!main_style) {
      return res.status(400).json({ success: false, error: 'main_style is required' });
    }
    const clothes = await getClothesByStyle(main_style);
    const outfits = await getOutfitSuggestionsFromAI(main_style, clothes);
    res.json({ success: true, outfits });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { generateOutfitsController };
