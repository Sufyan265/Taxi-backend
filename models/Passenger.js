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
    address: {
        type: String,
        required: true
    },
    instructionsForDriver: {
        type: String
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distanceKm: {
        type: Number,
        required: true
    },
    distanceMiles: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    luggage: {
        type: Number,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    returnPickupDate: {
        type: Date,
        required: false
    },
    returnPickupTime: {
        type: String,
        required: false
    },
    fare: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    referenceNumber: {
        type: String,
        required: true
    },
    flightNo: {
        type: String,
        required: true
    },
    tripType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bookings', passengerSchema);