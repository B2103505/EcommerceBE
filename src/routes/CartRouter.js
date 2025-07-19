const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/add', CartController.addToCartController);
router.get('/:userId', CartController.getCartByUserIdController);
router.put('/update', CartController.updateCartItemController);
router.delete('/delete/:cartItemId', CartController.deleteCartItemController);
router.delete('/clear/:userId', CartController.clearCartController);

module.exports = router;
