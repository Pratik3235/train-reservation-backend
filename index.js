const express = require("express");
require("dotenv").config();
var cors = require("cors");
const connectToDB = require("./config/db.mongo");
const UserRouter = require("./routes/user.route");
const TicketBookingRouter = require("./routes/ticketBooking.route");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000


app.use("/users", UserRouter);
app.use("/bookTicket", TicketBookingRouter)


app.use((req, res) => {
    res.status(404).json({msg:"Request Not Found"})
})

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server Started at ${PORT}`);
});