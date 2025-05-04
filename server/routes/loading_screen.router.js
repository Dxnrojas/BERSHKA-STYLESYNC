const express = require("express");
const router = express.Router();
const { handleShowLoadingScreen } = require("../controllers/loading_screen.controller");

router.post("/show-loading", handleShowLoadingScreen);

module.exports = router;
