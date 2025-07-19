const cartService = require('../services/CartService');

const addToCartController = async (req, res) => {
    try {
        const result = await cartService.addToCartService(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

const getCartByUserIdController = async (req, res) => {
    try {
        const result = await cartService.getCartByUserIdService(req.params.userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

const updateCartItemController = async (req, res) => {
    try {
        const result = await cartService.updateCartItemService(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

const deleteCartItemController = async (req, res) => {
    try {
        const result = await cartService.deleteCartItemService(req.params.cartItemId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

const clearCartController = async (req, res) => {
    try {
        const result = await cartService.clearCartService(req.params.userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

module.exports = {
    addToCartController,
    getCartByUserIdController,
    updateCartItemController,
    deleteCartItemController,
    clearCartController
};
