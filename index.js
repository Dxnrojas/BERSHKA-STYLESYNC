const express = require("express");
const path = require("path");
const { createServer } = require("http");

const usersRouter = require("./server/routes/users.router");
const qrScreenRouter = require("./server/routes/qr_screenEvents.router");
const splashScreenRouter = require("./server/routes/splash_screenEvents.router");

const { initSocketInstance } = require("./server/services/socket.service");

const app = express();
const httpServer = createServer(app);
const PORT = 5050;

app.use(express.json());

app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

app.use("/", usersRouter);
app.use("/", qrScreenRouter);
app.use("/", splashScreenRouter);

initSocketInstance(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
