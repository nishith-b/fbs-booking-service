const { InfoController } = require("../../controllers");
const express = require("express");
const router = express.Router();
const bookingRoutes = require("./booking");

router.use("/bookings", bookingRoutes);

router.get("/info", InfoController.info);

module.exports = router;
