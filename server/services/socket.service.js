// 🔧 socket.service.js
let io;

const { getQuestionById } = require("../db/questions.db.js");

const initSocketInstance = (httpServer) => {
  const { Server } = require("socket.io");
  io = new Server(httpServer, {
    path: "/real-time",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    // ✅ Jugador responde una opción del quiz
    socket.on("respuestaSeleccionada", (respuesta) => {
      console.log(`✅ ${socket.id} respondió:`, respuesta);
      // Aquí podrías guardar la respuesta en la DB si lo deseas
    });

    // ✅ Solicita la siguiente pregunta
    socket.on("pedir-siguiente-pregunta", (numeroPregunta) => {
      const siguientePregunta = getQuestionById(numeroPregunta);

      if (siguientePregunta) {
        io.emit("siguiente-pregunta", {
          question: siguientePregunta,
          preguntaActual: numeroPregunta,
        });
      } else {
        io.emit("juego-terminado");
      }
    });

    // ✅ Usuario seleccionó un outfit
    socket.on("outfit-selected", ({ outfitId }) => {
      console.log(`👗 Outfit seleccionado por ${socket.id}: Opción ${outfitId}`);

      // Puedes guardar aquí outfitId si lo necesitas...

      // Emitimos las pantallas finales con el ID del outfit
      io.emit("show-email-screen", { outfitId });        // 👉 App2
      io.emit("show-email-big-screen", { outfitId });    // 👉 App1
    });
  });
};

// ✅ Emitir eventos desde controladores (REST)
const emitEvent = (eventName, data) => {
  if (!io) throw new Error("Socket.io instance is not initialized");
  io.emit(eventName, data);
};

module.exports = {
  initSocketInstance,
  emitEvent,
};
