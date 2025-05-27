const { InfoController } = require("../../controllers");

const express = require("express");
const router = express.Router();

router.get("/info", InfoController.info);

module.exports = router;
