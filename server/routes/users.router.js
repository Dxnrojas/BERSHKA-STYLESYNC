const express = require("express");
const router = express.Router();

const {
  createUserController,
  getAllUsersController,
} = require("../controllers/users.controller");

router.post("/register-user", createUserController);
router.get("/users", getAllUsersController);

module.exports = router;
