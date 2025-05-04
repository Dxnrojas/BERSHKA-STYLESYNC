let users = [];

const getAllUsers = async () => {
  return users;
};

const createUserInDB = async (user) => {
  users.push(user);
  return { message: "Usuario guardado con éxito", user };
};

module.exports = {
  getAllUsers,
  createUserInDB,
};
