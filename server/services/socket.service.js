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

    // 🧠 Evento: Jugador responde una opción del quiz
    socket.on("respuestaSeleccionada", (respuesta) => {
      console.log(`✅ ${socket.id} respondió:`, respuesta);
    });

    // 🔄 Evento: Jugador pide siguiente pregunta
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

    // 👗 Evento: Usuario selecciona un outfit
    socket.on("outfit-selected", ({ outfitId }) => {
      console.log(`👗 Outfit seleccionado por ${socket.id}: Opción ${outfitId}`);

      // Emitimos pantallas de notificación del outfit
      io.emit("show-email-screen", { outfitId });        // App2 (móvil)
      io.emit("show-email-big-screen", { outfitId });    // App1 (pantalla grande)
    });

    // 🎉 Evento: Final de la experiencia → mostrar pantallas de agradecimiento
    socket.on("gracias-participacion", () => {
      console.log("🙏 Evento 'gracias-participacion' recibido. Mostrando pantallas de agradecimiento.");
      io.emit("show-thanks-screens"); // Se escucha tanto en App1 como App2
    });
  });
};

// 🛰️ Permitir emitir eventos desde controladores REST
const emitEvent = (eventName, data) => {
  if (!io) throw new Error("Socket.io instance is not initialized");
  io.emit(eventName, data);
};

module.exports = {
  initSocketInstance,
  emitEvent,
};
