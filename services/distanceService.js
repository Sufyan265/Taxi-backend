const axios = require('axios');

const getDistance = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_API_KEY;  // Store your API key in the .env file
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.rows[0].elements[0].status === "OK") {
            const distanceKm = data.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
            const distanceMiles = distanceKm * 0.621371; // Convert kilometers to miles
            const duration = data.rows[0].elements[0].duration.text; // Get the duration text

            return {
                distanceKm,
                distanceMiles,
                duration
            };
        } else {
            throw new Error('Could not calculate distance.');
        }
    } catch (error) {
        throw new Error(`Error fetching distance: ${error.message}`);
    }
};

module.exports = { getDistance };