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

    // ✅ NUEVO: Usuario seleccionó un outfit
    socket.on("outfit-selected", ({ outfitId }) => {
      console.log(`👗 Outfit seleccionado por ${socket.id}: Opción ${outfitId}`);

      // Aquí podrías guardar outfitId si lo necesitas

      // Emitimos las pantallas finales
      io.emit("show-email-screen");       // app2
      io.emit("show-email-big-screen");   // app1
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
