// server/services/clothes.service.js
const { supabase } = require('./supabase.service');

/**
 * Obtiene todas las prendas del estilo indicado desde Supabase.
 * @param {string} main_style - El estilo principal ("Streetwear", "Minimalista", etc.)
 * @returns {Promise<Array>} Lista de prendas con ese style_tag.
 */
async function getClothesByStyle(main_style) {
  const { data, error } = await supabase
    .from('clothes')
    .select('*')
    .eq('style_tag', main_style);

  if (error) {
    console.error('❌ Error al consultar ropa en Supabase:', error);
    throw new Error(error.message || 'Supabase query failed');
  }
  return data;
}

module.exports = { getClothesByStyle };
