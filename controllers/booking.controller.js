const seatModel = require("../models/seat.model");
const userModel = require("../models/user.model");

const seatBookingLogic = async (req, res) => {
    const { count } = req.body;
    if (count < 1 || count > 7) return res.status(400).send("Invalid seat count");

    try {
        const allSeats = await seatModel.find().sort({ seatNumber: 1 });

        const rowMap = Array.from({ length: 12 }, () => []);

        allSeats.forEach(seat => {
            const row = seat.seatNumber <= 77 ? Math.floor((seat.seatNumber - 1) / 7) : 11;
            rowMap[row].push(seat);
        });


        for (let row of rowMap) {
            let block = [];
            for (let seat of row) {
                if (!seat.isBooked) {
                    block.push(seat);
                    if (block.length === count) return await bookSeats(block, req.user.id, res);
                } else {
                    block = [];
                }
            }
        }

        const unbookedSeats = allSeats.filter(s => !s.isBooked);

        if (unbookedSeats.length < count) {
            return res.status(400).send("Not enough seats available");
        }

        const sortedSeats = unbookedSeats.sort((a, b) => a.seatNumber - b.seatNumber);

        let bestGroup = [];
        let minRange = Infinity;

        for (let i = 0; i <= sortedSeats.length - count; i++) {
            const group = sortedSeats.slice(i, i + count);
            const range = group[count - 1].seatNumber - group[0].seatNumber;

            const areConsecutive = group.every((seat, index) => {
                if (index === 0) return true;
                return seat.seatNumber === group[index - 1].seatNumber + 1;
            });

           
            if (areConsecutive && range < minRange) {
                minRange = range;
                bestGroup = group;
            }
        }

        if (bestGroup.length) {
            return await bookSeats(bestGroup, req.user.id, res);
        } else {
            return res.status(500).send("Failed to find suitable seats");
        }

    } catch (err) {
        console.error("Booking logic error:", err);
        res.status(500).send("Booking failed");
    }
};

async function bookSeats(seats, userId, res) {
    const seatIds = seats.map(s => s._id);
    const seatNumbers = seats.map(s => s.seatNumber);

    await seatModel.updateMany(
        { _id: { $in: seatIds } },
        { $set: { isBooked: true, bookedBy: userId } }
    );

    await userModel.findByIdAndUpdate(userId, {
        $push: { bookings: { $each: seatNumbers } }
    });

    res.status(200).json({ message: "Seats booked", seats: seatNumbers });
}

module.exports = seatBookingLogic;