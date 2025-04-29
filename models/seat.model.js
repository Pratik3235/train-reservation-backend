const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: Number,
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

const seatModel = mongoose.model("Seat", seatSchema);

module.exports = seatModel;