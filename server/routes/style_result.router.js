const express = require('express');
const router = express.Router();
const {
  determineUserStyle,
  generateUserOutfits,
} = require('../controllers/style_result.controller');

router.post('/determine-style', determineUserStyle); // POST con { userId }
router.post('/generate-outfits', generateUserOutfits); // POST con { userId }

module.exports = router;
