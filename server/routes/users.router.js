const express = require("express");
const router = express.Router();
const {
  createUserController,
  getUsers,
} = require("../controllers/users.controller");

// GET /api/users → Get all users
router.get("/", getUsers);

// POST /api/users → Register new user
router.post("/", createUserController);

module.exports = router;
