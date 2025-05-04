// 🔹 PASO 1: Importar dependencias
const express = require("express");
const path = require("path");
const { createServer } = require("http");

// 🔹 PASO 2: Importar routers
const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");
const splashScreenRouter = require("./server/routes/splash_screenEvents.router");

// 🔹 PASO 3: Importar servicio de sockets
const { initSocketInstance } = require("./server/services/socket.service");

// 🔹 PASO 4: Crear la app y el servidor HTTP
const app = express();
const httpServer = createServer(app);
const PORT = 5050;

// 🔹 PASO 5: Middlewares
app.use(express.json());

// 🔹 PASO 6: Servir archivos estáticos
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// 🔹 PASO 7: Rutas REST
app.use("/", usersRouter);             // 👉 POST /register-user y GET /users
app.use("/", qrScreenRouter);          // 👉 POST /change-screen
app.use("/", splashScreenRouter);      // 👉 POST /comenzar

// 🔹 PASO 8: Inicializar sockets
initSocketInstance(httpServer);

// 🔹 PASO 9: Iniciar servidor
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
