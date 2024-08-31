// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     origin: {
//         type: String,
//         required: true
//     },
//     destination: {
//         type: String,
//         required: true
//     },
//     distanceKm: {
//         type: Number,
//         required: true
//     },
//     distanceMiles: {
//         type: Number,
//         required: true
//     },
//     duration: {
//         type: String,
//         required: true
//     },
//     passengers: {
//         type: Number,
//         required: true
//     },
//     luggage: {
//         type: Number,
//         required: true
//     },
//     pickupDate: {
//         type: Date,
//         required: true
//     },
//     pickupTime: {
//         type: String,
//         required: true
//     },
//     returnPickupDate: {
//         type: Date,
//         required: false
//     },
//     returnPickupTime: {
//         type: String,
//         required: false
//     },
//     standardFare: {
//         type: Number,
//         required: true
//     },
//     firstClassFare: {
//         type: Number,
//         required: true
//     },
//     peopleCarrierFare: {
//         type: Number,
//         required: true
//     },
//     miniVanFare: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;