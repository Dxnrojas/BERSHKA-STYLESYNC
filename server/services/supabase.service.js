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

/**
 * Sube una imagen base64 a Supabase Storage en el bucket 'collages' y retorna la URL pública.
 * @param {string} base64 - La imagen en base64
 * @param {string} filename - Nombre de archivo (ejemplo: user123_outfit1.png)
 * @param {string} [folder='collages'] - Carpeta dentro del bucket collages (opcional)
 * @returns {Promise<string>} URL pública de la imagen subida
 */
async function uploadBase64ToSupabase(base64, filename, folder = '') {
  // Decodifica el base64
  const buffer = Buffer.from(base64, 'base64');
  // Construye el path: si quieres subcarpetas puedes agregarlas en folder
  const filePath = folder ? `${folder}/${filename}` : filename;

  // Sube la imagen al bucket 'collages'
  const { data, error } = await supabase.storage
    .from('collages')
    .upload(filePath, buffer, {
      contentType: 'image/png',
      upsert: true, // Sobre-escribe si ya existe
    });

  if (error) {
    console.error('❌ Error uploading image to Supabase Storage:', error.message);
    throw new Error('Error uploading image to Supabase Storage: ' + error.message);
  }

  // Obtén la URL pública
  const { data: publicUrlData } = supabase.storage
    .from('collages')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

module.exports = {
  supabase,
  getProductsByStyle,
  uploadBase64ToSupabase,
};
