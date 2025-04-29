const seatModel = require("../models/seat.model");

const seatInitialization = async (req, res) => {
    try {
        await seatModel.deleteMany(); // clear previous seats if any
  
        const seats = [];
        for (let i = 1; i <= 80; i++) {
            seats.push({ seatNumber: i, isBooked: false });
        }
  
        await seatModel.insertMany(seats);
        res.status(201).json({ message: "80 seats initialized successfully" });
    } catch (err) {
        res.status(500).json({ error: "Initialization failed" });
    }
};

const fetchAllSeats = async (req, res) => {
    try {
      
        const seats = await seatModel.find();
        res.status(200).json({ msg: "fetching seats", seats });
    } catch (err) {
        console.error('Error fetching seats:', err);
        res.status(500).send('Server Error');
    }
};

module.exports = { seatInitialization, fetchAllSeats };