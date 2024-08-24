const Passenger = require('../models/Passenger');

// Function to generate a unique 6-digit reference number
const generateReferenceNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const storePassengerInfo = async (req, res) => {
    const {
        name,
        email,
        mobileNumber,
        postCode,
        address,
        instructionsForDriver,
        origin,
        destination,
        distanceKm,
        distanceMiles,
        duration,
        passengers,
        luggage,
        pickupDate,
        pickupTime,
        returnPickupDate,
        returnPickupTime,
        fare,
        paymentMethod,
        vehicleType
    } = req.body;

    // Basic validation
    if (!name || !email || !mobileNumber || !postCode || !address || !origin || !destination || !distanceKm || !distanceMiles || !duration || !passengers || !luggage || !pickupDate || !pickupTime || !fare || !paymentMethod || !vehicleType) {
        return res.status(400).json({
            message: "Please provide all required fields."
        });
    }

    try {
        const referenceNumber = generateReferenceNumber();

        const newPassenger = new Passenger({
            name,
            email,
            mobileNumber,
            postCode,
            address,
            instructionsForDriver,
            origin,
            destination,
            distanceKm,
            distanceMiles,
            duration,
            passengers,
            luggage,
            pickupDate,
            pickupTime,
            returnPickupDate,
            returnPickupTime,
            fare,
            paymentMethod,
            vehicleType,
            referenceNumber
        });

        const savedPassenger = await newPassenger.save();

        res.json({
            message: "Passenger information saved successfully.",
            passenger: savedPassenger
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { storePassengerInfo };