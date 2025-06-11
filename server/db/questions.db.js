// server/db/questions.db.js
const { supabase } = require("../services/supabase.service");

const questions = [
  {
    id: 1,
    text: "¿Cómo describirías tu estilo personal?",
    options: [
      "Deportivo - Athleisure",
      "Streetwear - Urban fashion",
      "Elegante - Original",
      "Minimalista - Bohemio"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 2,
    text: "¿Qué tipo de prendas usas con más frecuencia?",
    options: [
      "Jeans",
      "Vestidos",
      "Sudaderas (pantalón)",
      "Blazers"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 3,
    text: "¿Qué colores predominan en tu guardarropa?",
    options: [
      "Neutros",
      "Vibrantes",
      "Pasteles",
      "Oscuros"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 4,
    text: "¿Para qué ocasiones sueles comprar ropa nueva?",
    options: [
      "Deporte",
      "Salidas nocturnas",
      "Trabajo",
      "Universidad"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 5,
    text: "¿Qué accesorios incluyes normalmente en tus looks?",
    options: [
      "Bolsos grandes",
      "Gorras",
      "Joyería fina",
      "No uso casi accesorios"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 6,
    text: "¿Hay algún color o estampado que evites por completo?",
    options: [
      "Estampado de rayas",
      "Colores nude",
      "Colores neón",
      "No uso casi estampados"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 7,
    text: "¿Qué prenda te cuesta más combinar?",
    options: [
      "Zapatos",
      "Camisas estampadas",
      "Chaquetas",
      "Blazers"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
  {
    id: 8,
    text: "Si tuvieras que elegir un ícono de moda (o influencer) que admire tu estilo, ¿quién sería?",
    options: [
      "Billie Eilish",
      "Princess Diana",
      "David Beckham",
      "Harry Styles"
    ],
    iconUrls: [
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png",
      "https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png"
    ]
  },
];

// 🔸 Obtener una pregunta por su ID
const getQuestionById = (id) => questions.find(q => q.id === id);

// 🔸 Total de preguntas
const getTotalQuestions = () => questions.length;

// 🔸 Eliminar respuestas de un usuario (si reinicia o vuelve a jugar)
const clearUserResponses = async (userId) => {
  const { error } = await supabase
    .from("answers")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("❌ Error al borrar respuestas:", error.message);
  }
};

module.exports = {
  questions,
  getQuestionById,
  getTotalQuestions,
  clearUserResponses, // ✅ útil si el juego se reinicia
};
