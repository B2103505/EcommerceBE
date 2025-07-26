const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Tạo đơn hàng
router.post('/', OrderController.createOrder);

// Lấy đơn hàng của người dùng
router.get('/user/:userId', OrderController.getOrdersByUser);

// Lấy tất cả đơn hàng (admin)
router.get('/', OrderController.getAllOrders);

// Lấy chi tiết đơn hàng
router.get('/:orderId', OrderController.getOrderById);

// Cập nhật trạng thái đơn hàng
router.put('/:orderId/status', OrderController.updateOrderStatus);

// Cập nhật toàn bộ thông tin đơn hàng (admin)
router.put('/:orderId', OrderController.updateOrder);

// Xoá đơn hàng
router.delete('/:orderId', OrderController.deleteOrder);

module.exports = router;
