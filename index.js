const express = require("express");
const path = require("path");
const { createServer } = require("http");

// Routers existentes
const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");
const splashScreenRouter = require("./server/routes/splash_screenEvents.router");
const startGameRouter = require("./server/routes/start_game.router");
const quizRouter = require("./server/routes/quiz.router");
const loadingScreenRouter = require("./server/routes/loading_screen.router");

// 🆕 Nuevo router para pantalla de outfit
const outfitScreenRouter = require("./server/routes/outfit_screen.router");

const { initSocketInstance } = require("./server/services/socket.service");

const app = express();
const httpServer = createServer(app);
const PORT = 5050;

// Middleware para JSON
app.use(express.json());

// Rutas estáticas para frontend
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// Rutas de API
app.use("/", usersRouter);
app.use("/", qrScreenRouter);
app.use("/", splashScreenRouter);
app.use("/", startGameRouter);
app.use("/quiz", quizRouter);
app.use("/", loadingScreenRouter);

// 🆕 Nueva ruta de outfit
app.use("/", outfitScreenRouter);

// Inicializar sockets
initSocketInstance(httpServer);

// Iniciar servidor
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
