
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController')

router.post('/create', AddressController.createOrUpdateAddress);
router.get('/get/:userId', AddressController.getAddressByUserId);

module.exports = router;
