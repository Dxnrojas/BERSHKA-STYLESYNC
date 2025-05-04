const express = require("express");
const router = express.Router();
const { showOutfitScreen } = require("../controllers/outfit_screen.controller");

router.post("/mostrar-outfit", showOutfitScreen);

module.exports = router;
