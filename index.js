const express = require("express");
const path = require("path");
const { createServer } = require("http");

// Routers
const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");
const splashScreenRouter = require("./server/routes/splash_screenEvents.router");
const startGameRouter = require("./server/routes/start_game.router"); // ✅ NUEVO

// Socket service
const { initSocketInstance } = require("./server/services/socket.service");

// Express app setup
const app = express();
const httpServer = createServer(app);
const PORT = 5050;

app.use(express.json());

// Static files for app1 and app2
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// REST routes
app.use("/", usersRouter);
app.use("/", qrScreenRouter);
app.use("/", splashScreenRouter);
app.use("/", startGameRouter); // ✅ NUEVO

// Init WebSocket
initSocketInstance(httpServer);

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
