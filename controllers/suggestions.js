const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.HERE_API_KEY;

const suggestions = async (req, res) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete`, {
            params: {
                q: encodeURIComponent(query),
                in: 'countryCode:GBR',
                limit: 10,
                apiKey: apiKey
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
};

module.exports = { suggestions };