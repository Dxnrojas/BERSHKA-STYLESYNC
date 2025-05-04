const express = require("express");
const router = express.Router();
const {
  createUserController,
  getUsers,
} = require("../controllers/users.controller");

router.get("/users", getUsers);
router.post("/register-user", createUserController);

module.exports = router;
