const express = require("express");
const router = express.Router();

const {
  handleChangeScreenEvent,
} = require("../controllers/qr_screen.controller");

router.post("/change-screen", handleChangeScreenEvent);

module.exports = router;
