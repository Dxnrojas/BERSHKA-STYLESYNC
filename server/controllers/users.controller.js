const { createUserInDB, getAllUsers } = require("../db/users.db");
const { emitEvent } = require("../services/socket.service");

// 🟢 Controlador para registrar un nuevo usuario
const createUserController = async (req, res) => {
  const { name, email, size } = req.body;

  if (!name || !email || !size) {
    return res.status(400).json({ error: "Faltan datos del usuario" });
  }

  const user = {
    name,
    email,
    size,
    created_at: new Date().toISOString(),
  };

  const result = await createUserInDB(user);

  // Emitimos evento para mostrar instrucciones
  emitEvent("show-instruction-screens");

  res.send({ message: "Usuario guardado con éxito", user });
};

// 🟢 Obtener todos los usuarios
const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};

module.exports = {
  createUserController,
  getUsers,
};
