const express = require("express");
const router = express.Router();
const { selectOutfitController } = require("../controllers/user_outfit.controller");

// Esta ruta es la que usará el frontend para guardar el outfit seleccionado
router.post("/select", selectOutfitController);

module.exports = router;
