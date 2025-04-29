const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const seatBookingLogic = require("../controllers/booking.controller");
const bookingRoute = express.Router();

bookingRoute.post("/book", authMiddleware , seatBookingLogic );

module.exports = bookingRoute;
