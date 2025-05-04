const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUserInDB,
} = require("../db/users.db");

router.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

router.post("/users", async (req, res) => {
  const { id, name } = req.body;
  const newUser = await createUserInDB({ id, name });
  res.send(newUser);
});

module.exports = router;
