const express = require("express");
const router = express.Router();
const { selectOutfitController } = require("../controllers/user_outfit.controller");

// 🟢 POST /api/user-outfits/select
// Esta ruta recibe el outfit seleccionado por el usuario (desde App2)
// Guarda en Supabase y dispara eventos + correo
router.post("/select", selectOutfitController);

module.exports = router;
