// 🔧 socket.service.js
let io;

const { getQuestionById, getTotalQuestions } = require("../db/questions.db.js");

const initSocketInstance = (httpServer) => {
  const { Server } = require("socket.io");
  io = new Server(httpServer, {
    path: "/real-time",
    cors: {
      origin: "*",
    },
  });

  // Manejo de conexión de cada cliente
  io.on("connection", (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    // ✅ Escuchar respuesta del jugador
    socket.on("respuestaSeleccionada", (respuesta) => {
      console.log(`✅ ${socket.id} respondió:`, respuesta);
      // Aquí puedes guardar las respuestas si deseas
    });

    // ✅ Escuchar solicitud para avanzar a la siguiente pregunta
    socket.on("pedir-siguiente-pregunta", (numeroPregunta) => {
      const siguientePregunta = getQuestionById(numeroPregunta);

      if (siguientePregunta) {
        // ✅ Emitir a todos (App1 y App2)
        io.emit("siguiente-pregunta", {
          question: siguientePregunta,
          preguntaActual: numeroPregunta,
        });
      } else {
        // ✅ Fin del juego: notificar a todos
        io.emit("juego-terminado");
      }
    });
  });
};

// ✅ Emitir eventos globales (como start-game desde REST API)
const emitEvent = (eventName, data) => {
  if (!io) throw new Error("Socket.io instance is not initialized");
  io.emit(eventName, data);
};

module.exports = {
  initSocketInstance,
  emitEvent,
};
