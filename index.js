const express = require("express");
const path = require("path");
const { createServer } = require("http");

// Routers
const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");
const splashScreenRouter = require("./server/routes/splash_screenEvents.router");
const startGameRouter = require("./server/routes/start_game.router");
const quizRouter = require("./server/routes/quiz.router");
const loadingScreenRouter = require("./server/routes/loading_screen.router");
const outfitScreenRouter = require("./server/routes/outfit_screen.router");
const thanksScreenRouter = require("./server/routes/thanks_screen.router");

const { initSocketInstance } = require("./server/services/socket.service");

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());

// Static Frontend
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// API Routes
app.use("/api/users", usersRouter);
app.use("/api/qr", qrScreenRouter);
app.use("/api/splash", splashScreenRouter);
app.use("/api/start", startGameRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/loading", loadingScreenRouter);
app.use("/api/outfit", outfitScreenRouter);
app.use("/api/thanks", thanksScreenRouter);

// WebSocket Initialization
initSocketInstance(httpServer);

// Server Start
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
