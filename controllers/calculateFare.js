const Booking = require('../models/Booking');
const { getDistance } = require('../services/distanceService');

const calculateFare = async (req, res) => {
    const { origin, destination, passengers, luggage, pickupDate, pickupTime, returnPickupDate, returnPickupTime } = req.body;

    // Basic validation
    if (!origin || !destination || !passengers || !luggage || !pickupDate || !pickupTime) {
        return res.status(400).json({
            message: "Please provide origin, destination, passengers, luggage, pickupDate, and pickupTime."
        });
    }

    try {
        const { distanceKm, distanceMiles, duration } = await getDistance(origin, destination);  // Get the distance from Google API

        // Fare calculation logic for different car types
        const calculateFareForCarType = (baseFare, pricePerMile, minimumFare) => {
            // If distance is more than 50 miles, set base fare to 0
            if (distanceMiles > 50) {
                baseFare = 0;
            }
            let fare = baseFare + (distanceMiles * pricePerMile);
            return fare < minimumFare ? minimumFare : fare;
        };

        // Standard Car Fare
        const standardFare = calculateFareForCarType(50, 1.8, 40);

        // First Class Car Fare
        const firstClassFare = calculateFareForCarType(60, 1.9, 50);

        // People Carrier Car Fare
        const peopleCarrierFare = calculateFareForCarType(50, 1.9, 55);

        // Mini Van Fare
        const miniVanFare = calculateFareForCarType(80, 2.6, 70);

        const newBooking = new Booking({
            origin,
            destination,
            distance: distanceKm,  // Add the distance field
            distanceKm,
            distanceMiles,
            duration,
            passengers,
            luggage,
            pickupDate,
            pickupTime,
            returnPickupDate,
            returnPickupTime,
            standardFare,
            firstClassFare,
            peopleCarrierFare,
            miniVanFare,
        });

        const savedBooking = await newBooking.save();

        res.json({
            booking: savedBooking,
            fares: {
                standardFare,
                firstClassFare,
                peopleCarrierFare,
                miniVanFare
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { calculateFare };