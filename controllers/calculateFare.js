const { getDistance } = require('../services/distanceService');

const calculateFare = async (req, res) => {
    const { origin, destination, passengers, luggage, pickupDate, pickupTime, returnPickupDate, returnPickupTime, tripType } = req.body;

    // Basic validation
    if (!origin || !destination || !passengers || !luggage || !pickupDate || !pickupTime || !tripType) {
        return res.status(400).json({
            message: "Please provide origin, destination, passengers, luggage, pickupDate, pickupTime, and tripType."
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
        const standardFare = calculateFareForCarType(30, 1.8, 40);

        // First Class Car Fare
        const firstClassFare = calculateFareForCarType(40, 1.9, 50);

        // People Carrier Car Fare
        const peopleCarrierFare = calculateFareForCarType(35, 1.9, 55);

        // Mini Van Fare
        const miniVanFare = calculateFareForCarType(45, 2.6, 70);

        res.json({
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
            tripType,
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