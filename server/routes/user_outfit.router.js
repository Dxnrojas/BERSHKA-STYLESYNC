const express = require("express");
const router = express.Router();
const { selectOutfitController } = require("../controllers/user_outfit.controller");

router.post("/select", selectOutfitController);

module.exports = router;
