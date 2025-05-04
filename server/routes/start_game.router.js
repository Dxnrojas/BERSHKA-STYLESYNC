const express = require("express");
const router = express.Router();
const { handleStartGame } = require("../controllers/start_game.controller");

router.post("/start-game", handleStartGame);

module.exports = router;
