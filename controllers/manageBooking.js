const Passenger = require('../models/Passenger');

const manageBooking = async (req, res) => {
    let success = false;
    const { email, referenceNumber } = req.body;

    // Basic validation
    if (!email || !referenceNumber) {
        return res.status(400).json({
            success,
            message: "Please provide both email and reference number."
        });
    }

    try {
        const bookings = await Passenger.find({ email });

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                success,
                message: "No bookings found with this email."
            });
        }

        const booking = bookings.find(b => b.referenceNumber === referenceNumber);

        if (!booking) {
            return res.status(404).json({
                success,
                message: "No booking found with this reference number."
            });
        }

        success = true;
        res.json({
            success,
            message: "Bookings retrieved successfully.",
            bookingsData: bookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { manageBooking };