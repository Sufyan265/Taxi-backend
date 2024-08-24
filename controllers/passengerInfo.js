// const Passenger = require('../models/Passengers');

// const storePassengerInfo = async (req, res) => {
//     const {
//         name,
//         email,
//         mobileNumber,
//         postCode,
//         instructionsForDriver,
//         address
//     } = req.body;

//     // Basic validation
//     if (!name || !email || !mobileNumber || !postCode || !address) {
//         return res.status(400).json({
//             message: "Please provide all required fields."
//         });
//     }

//     try {
//         const newPassenger = new Passenger({
//             name,
//             email,
//             mobileNumber,
//             postCode,
//             instructionsForDriver,
//             address
//         });

//         const savedPassenger = await newPassenger.save();

//         res.json({
//             message: "Passenger information saved successfully.",
//             passenger: savedPassenger
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { storePassengerInfo };