const express = require('express');
const router = express.Router();
const GhnController = require('../controllers/GhnController');

router.post('/fee', GhnController.getShippingFee);
router.post('/available-services', GhnController.getAvailableServices);

module.exports = router;
