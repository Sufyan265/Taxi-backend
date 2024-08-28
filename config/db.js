const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;