// Load environment variables first
require("dotenv").config();

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
const styleResultRouter = require("./server/routes/style_result.router");

// 👇 NUEVO: ruta para guardar outfits seleccionados
const userOutfitRouter = require("./server/routes/user_outfit.router");

const { initSocketInstance } = require("./server/services/socket.service");

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());

// Static Frontend (App1 = pantalla pública, App2 = móvil)
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));
// Si tienes carpeta img dentro de app1/app2, sirve las imágenes también
app.use("/app1/img", express.static(path.join(__dirname, "app1", "img")));
app.use("/app2/img", express.static(path.join(__dirname, "app2", "img")));

// API Routes
app.use("/api/users", usersRouter);
app.use("/api/qr", qrScreenRouter);
app.use("/api/splash", splashScreenRouter);
app.use("/api/start", startGameRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/loading", loadingScreenRouter);
app.use("/api/outfit", outfitScreenRouter);
app.use("/api/thanks", thanksScreenRouter);
app.use("/api/style-result", styleResultRouter);
// 👇 Agrega la nueva ruta aquí
app.use("/api/user-outfits", userOutfitRouter);

// Default Route (opcional, útil para debug)
app.get("/", (req, res) => {
  res.send("Bershka StyleSync backend running 🚀");
});

// 404 Handler (opcional, para API)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// WebSocket Initialization (Socket.IO)
initSocketInstance(httpServer);

// Server Start
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
