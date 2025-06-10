const express = require('express');
const router = express.Router();
const { generateOutfitsController } = require('../controllers/outfit.controller');

router.post('/generate', generateOutfitsController);

module.exports = router;
