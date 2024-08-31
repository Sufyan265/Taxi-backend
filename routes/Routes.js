const express = require('express');
const { calculateFare } = require('../controllers/calculateFare');
const { storePassengerInfo } = require('../controllers/PassengerOrder');
const { suggestions } = require('../controllers/suggestions');
const { manageBooking } = require('../controllers/manageBooking');
const { cancelBooking } = require('../controllers/cancelBooking');

const router = express.Router();

router.post('/calculate-fare', calculateFare);
router.post('/passenger', storePassengerInfo); 
router.post('/suggestions', suggestions);
router.get('/manageBooking', manageBooking);
router.get('/cancelBooking', cancelBooking);

module.exports = router;