let users = [];

// 🟢 Obtener todos los usuarios almacenados
const getAllUsers = async () => {
  return users;
};

// 🟢 Crear (guardar) un nuevo usuario en la "base de datos"
const createUserInDB = async (user) => {
  users.push(user);
  return { message: "Usuario guardado con éxito", user };
};

module.exports = {
  getAllUsers,
  createUserInDB,
};
