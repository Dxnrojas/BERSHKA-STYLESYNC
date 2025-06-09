const express = require("express");
const router = express.Router();

const { determineUserStyle } = require("../controllers/style_result.controller");

// POST /api/style/result
router.post("/result", determineUserStyle);

module.exports = router;
