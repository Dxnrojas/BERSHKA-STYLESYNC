const { createUserInDB } = require("../db/users.db");
const { emitEvent } = require("../services/socket.service");

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

  // 👉 Emitimos evento para mostrar instrucciones en app1 y app2
  emitEvent("show-instruction-screens");

  res.send({ message: "Usuario guardado", user });
};

module.exports = {
  createUserController,
};
