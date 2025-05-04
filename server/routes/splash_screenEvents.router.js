const express = require("express");
const router = express.Router();

const {
  handleComenzar,
} = require("../controllers/splash_screen.controller");

router.post("/comenzar", handleComenzar);

module.exports = router;
