// 🔹 PASO 1: Importar dependencias
const express = require("express");
const path = require("path");
const { createServer } = require("http");

// 🔹 PASO 2: Importar routers
const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");

// 🔹 PASO 3: Importar servicio de sockets
const { initSocketInstance } = require("./server/services/socket.service");

// 🔹 PASO 4: Crear la app y el servidor HTTP
const app = express();
const httpServer = createServer(app);
const PORT = 5050;

// 🔹 PASO 5: Middlewares
app.use(express.json());

// Servir archivos estáticos de app1 y app2
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// 🔹 PASO 6: Rutas (REST)
app.use("/", usersRouter);
app.use("/", qrScreenRouter);

// 🔹 PASO 7: Inicializar los sockets
initSocketInstance(httpServer);

// 🔹 PASO 8: Iniciar el servidor
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
