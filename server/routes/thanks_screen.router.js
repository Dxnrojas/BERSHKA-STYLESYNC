const express = require("express");
const router = express.Router();
const { showThanksScreens } = require("../controllers/thanks_screen.controller");

router.post("/mostrar-gracias", showThanksScreens);

module.exports = router;
