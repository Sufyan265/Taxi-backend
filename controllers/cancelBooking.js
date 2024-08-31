const Passenger = require('../models/Passenger');

const cancelBooking = async (req, res) => {
    let success = false;
    const { email, referenceNumber } = req.query;

    // Basic validation
    if (!email || !referenceNumber) {
        return res.status(400).json({
            success,
            message: "Please provide both email and reference number."
        });
    }

    try {
        const booking = await Passenger.findOne({ email, referenceNumber });

        if (!booking) {
            return res.status(404).json({
                success,
                message: "Booking not found with this email or reference number."
            });
        }

        const currentTime = new Date();
        const pickupTime = new Date(booking.pickupDate);
        pickupTime.setHours(parseInt(booking.pickupTime.split(':')[0]));
        pickupTime.setMinutes(parseInt(booking.pickupTime.split(':')[1]));

        const timeDifference = pickupTime - currentTime;
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference < 12) {
            return res.status(400).json({
                success,
                message: "Booking can only be canceled at least 12 hours before the scheduled pickup time."
            });
        }

        await Passenger.findOneAndDelete({ email, referenceNumber });

        success = true;
        res.json({
            success,
            message: "Booking canceled successfully."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { cancelBooking };