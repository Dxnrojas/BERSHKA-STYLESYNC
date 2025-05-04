// 🔹 Base de datos simulada en memoria
let users = [
    {
      id: 1,
      name: "John Doe",
    },
  ];
  
  // 🔹 Obtener todos los usuarios
  const getAllUsers = async () => {
    return users;
  };
  
  // 🔹 Crear un nuevo usuario
  const createUser = async (user) => {
    users.push(user);
    return user; // opcional: devolver el usuario recién agregado
  };
  
  // 🔹 Exportar las funciones para que se puedan usar en otros archivos
  module.exports = {
    getAllUsers,
    createUser,
  };
  