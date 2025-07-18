const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/DiscountController');

router.post('/create', DiscountController.createDiscountController);
router.get('/getAll', DiscountController.getAllDiscountsController);
router.put('/update/:id', DiscountController.updateDiscountController);
router.delete('/delete/:id', DiscountController.deleteDiscountController);
router.get('/valid', DiscountController.getValidDiscountsController);

module.exports = router;
