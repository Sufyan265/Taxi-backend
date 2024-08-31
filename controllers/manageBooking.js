const Passenger = require('../models/Passenger');

const manageBooking = async (req, res) => {
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
                message: "Booking not found With this Email or Rafrance Number."
            });
        }

        success = true;
        res.json({
            success,
            message: "Booking retrieved successfully.",
            bookingData: booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { manageBooking };