const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const result = await OrderService.createOrder(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await OrderService.getOrdersByUser(userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const result = await OrderService.getAllOrders();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await OrderService.getOrderById(orderId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { statusId } = req.body;
        const result = await OrderService.updateOrderStatus(orderId, statusId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await OrderService.deleteOrder(orderId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: 'ERR', message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
