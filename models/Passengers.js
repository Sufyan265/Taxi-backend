const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    },
    instructionsForDriver: {
        type: String
    }
});

module.exports = mongoose.model('Passenger', passengerSchema);