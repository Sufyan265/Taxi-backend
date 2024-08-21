const express = require('express');
const { calculateFare } = require('../controllers/calculateFare');
const { storePassengerInfo } = require('../controllers/passengerInfo');
const { suggestions } = require('../controllers/suggestions');

const router = express.Router();

router.post('/calculate-fare', calculateFare);
router.post('/passenger', storePassengerInfo);
router.post('/suggestions', suggestions);


module.exports = router;
