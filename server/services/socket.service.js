// 🔧 socket.service.js
let io;

const { getQuestionById } = require("../db/questions.db.js");

const initSocketInstance = (httpServer) => {
  const { Server } = require("socket.io");
  io = new Server(httpServer, {
    path: "/real-time",
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.id}`);

    // Eventos de quiz
    socket.on("respuestaSeleccionada", (respuesta) => {
      console.log(`✅ ${socket.id} respondió:`, respuesta);
    });

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

    // Evento gracias participación (fin de flujo)
    socket.on("gracias-participacion", () => {
      console.log("🙏 Evento de gracias recibido. Mostrando pantallas finales.");

      io.emit("show-thanks-screens");

      // 🔁 Reinicio sincronizado después de 5s
      setTimeout(() => {
        io.emit("reset-to-qr-screen");
      }, 5000);
    });
  });
};

// Permite emitir eventos desde cualquier controlador/backend
const emitEvent = (eventName, data) => {
  if (!io) throw new Error("Socket.io instance is not initialized");
  io.emit(eventName, data);
};

module.exports = {
  initSocketInstance,
  emitEvent,
};
