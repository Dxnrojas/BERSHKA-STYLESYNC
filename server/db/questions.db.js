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
  },
];

// ✅ Estado compartido: respuestas por usuario
let respuestasUsuarios = {}; // { userId: [res1, res2, ..., res8] }

// 🔸 Obtener una pregunta por su ID
const getQuestionById = (id) => questions.find(q => q.id === id);

// 🔸 Total de preguntas
const getTotalQuestions = () => questions.length;

// 🔸 Guardar una respuesta para un usuario
const addUserResponse = (userId, respuesta) => {
  if (!respuestasUsuarios[userId]) {
    respuestasUsuarios[userId] = [];
  }
  respuestasUsuarios[userId].push(respuesta);
};

// 🔸 Obtener todas las respuestas de un usuario
const getUserResponses = (userId) => {
  return respuestasUsuarios[userId] || [];
};

// 🔸 Limpiar respuestas de un usuario (si reinicia)
const clearUserResponses = (userId) => {
  respuestasUsuarios[userId] = [];
};

module.exports = {
  getQuestionById,
  getTotalQuestions,
  addUserResponse,
  getUserResponses,
  clearUserResponses,
};
