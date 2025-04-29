const express = require("express");
const { seatInitialization, fetchAllSeats } = require("../controllers/seat.controller");
const seatModel = require("../models/seat.model");


const seatRoute = express.Router();

seatRoute.post("/init", seatInitialization);

seatRoute.get('/all', fetchAllSeats);

module.exports = seatRoute;
