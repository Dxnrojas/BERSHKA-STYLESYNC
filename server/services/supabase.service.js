// server/services/supabase.service.js 
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

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
    console.error('❌ Error querying Supabase [clothes]:', error);
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
  const buffer = Buffer.from(base64, 'base64');
  const filePath = folder ? `${folder}/${filename}` : filename;

  const { data, error } = await supabase.storage
    .from('collages')
    .upload(filePath, buffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (error) {
    console.error('❌ Error uploading image to Supabase Storage:', error.message);
    throw new Error('Error uploading image to Supabase Storage: ' + error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('collages')
    .getPublicUrl(filePath);

  // Compatibilidad: algunos SDKs antiguos devuelven {publicURL} y otros {publicUrl}
  const url = publicUrlData?.publicUrl || publicUrlData?.publicURL;
  if (!url) {
    throw new Error('No se pudo obtener la URL pública del archivo subido.');
  }

  return url;
}

/**
 * Guarda el outfit seleccionado por el usuario en la tabla user_outfits.
 * @param {string} userId - UUID del usuario.
 * @param {object} selectedOutfit - Objeto JSON del outfit seleccionado.
 * @param {string} collageImageUrl - URL del collage generado por IA.
 * @param {string} mainStyle - Estilo dominante del usuario.
 * @returns {Promise<object>} - Registro insertado.
 */
async function saveUserOutfit(userId, selectedOutfit, collageImageUrl, mainStyle) {
  // Verifica campos obligatorios antes de insertar
  if (!userId || !selectedOutfit || !collageImageUrl || !mainStyle) {
    throw new Error('Faltan campos obligatorios para guardar el user_outfit');
  }

  const { data, error } = await supabase
    .from('user_outfits')
    .insert([{
      user_id: userId,
      selected_outfit: selectedOutfit,
      collage_image_url: collageImageUrl,
      main_style: mainStyle,
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Error guardando user_outfit:', error);
    throw error;
  }
  return data;
}

module.exports = {
  supabase,
  getProductsByStyle,
  uploadBase64ToSupabase,
  saveUserOutfit,
};
