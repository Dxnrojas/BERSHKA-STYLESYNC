// server/services/socket.service.js
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

    // === Eventos de quiz ===
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

    // === Permite manejar selección de outfit también por sockets (opcional) ===
    // Si SOLO usas HTTP para guardar la selección, puedes omitir esto.
    socket.on("outfit-selected", ({ userId, selectedOutfit, collageImageUrl, mainStyle }) => {
      // Este evento es útil si quieres hacer algo adicional, 
      // pero tu flujo principal lo hace por POST. Aquí solo loguea.
      console.log(`👗 Outfit seleccionado vía socket por userId=${userId}`);
      // Si algún día necesitas emitir, podrías emitir show-email-screen desde aquí
      // Pero por ahora, lo hace el controller después de guardar en DB.
    });

    // Evento gracias participación (fin de flujo)
    socket.on("gracias-participacion", () => {
      console.log("🙏 Evento de gracias recibido. Mostrando pantallas finales.");
      io.emit("show-thanks-screens");
      setTimeout(() => {
        io.emit("reset-to-qr-screen");
      }, 5000);
    });

    // === Puedes escuchar manualmente los eventos de email para debug (opcional) ===
    // socket.on("show-email-screen", (data) => {
    //   io.emit("show-email-screen", data);
    // });
    // socket.on("show-email-big-screen", (data) => {
    //   io.emit("show-email-big-screen", data);
    // });
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
