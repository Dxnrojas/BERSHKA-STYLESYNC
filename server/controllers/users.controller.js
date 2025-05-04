const { createUserInDB, getAllUsers } = require("../db/users.db");

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
  res.send(result);
};

const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};

module.exports = {
  createUserController,
  getAllUsersController,
};
