const { BookingController } = require("../../controllers");
const express = require("express");
const router = express.Router();

router.post("/", BookingController.createBooking);

router.post("/payments", BookingController.makePayment);

module.exports = router;
