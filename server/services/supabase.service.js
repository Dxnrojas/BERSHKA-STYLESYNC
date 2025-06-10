// server/services/supabase.service.js 
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load .env vars

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Usa la anon/public key aquí para operaciones normales

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials are missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Obtiene todos los productos del estilo y categorías seleccionadas
 * @param {string} mainStyle - Ej: "Streetwear"
 * @returns {Promise<Array>} Lista de productos filtrados
 */
async function getProductsByStyle(mainStyle) {
  const { data, error } = await supabase
    .from('clothes')
    .select('*')
    .eq('style_tag', mainStyle)
    .in('category', ['top', 'bottom', 'accessory', 'dress']);

  if (error) {
    console.error('Error querying Supabase [clothes]:', error);
    throw error;
  }
  return data;
}

module.exports = {
  supabase,
  getProductsByStyle,
  // Puedes agregar aquí más funciones reutilizables: getUserById, saveOutfit, etc.
};
