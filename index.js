const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const seatRoute = require("./routes/seatInit.route");
const bookingRoute = require("./routes/booking.route");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes );        
app.use("/api/seat", seatRoute);     
app.use("/api/booking", bookingRoute);

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => console.log("Server running on port 8000"));
