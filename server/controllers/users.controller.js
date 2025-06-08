const { supabase } = require("../services/supabase.service");
const { emitEvent } = require("../services/socket.service");

// 🟢 Controlador para registrar un nuevo usuario
const createUserController = async (req, res) => {
  const { name, email, size } = req.body;

  if (!name || !email || !size) {
    return res.status(400).json({ error: "Faltan datos del usuario" });
  }

  // Creamos el nuevo usuario en Supabase
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, size }])
    .select();

  if (error) {
    console.error("❌ Error al insertar usuario en Supabase:", error.message);
    return res.status(500).json({ error: "No se pudo crear el usuario" });
  }

  const user = data[0];

  // ✅ Log de confirmación
  console.log("✅ Nuevo usuario registrado:");
  console.table([user]);

  // Emitimos evento para mostrar instrucciones
  emitEvent("show-instruction-screens");

  res.send({ message: "Usuario guardado con éxito", user });
};

// 🟢 Obtener todos los usuarios (si lo necesitas para debug o dashboard)
const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("❌ Error al obtener usuarios:", error.message);
    return res.status(500).json({ error: "No se pudieron obtener los usuarios" });
  }

  res.send(data);
};

module.exports = {
  createUserController,
  getUsers,
};
