const express = require('express');
const router = express.Router();
const statsCtrl = require('../controllers/statsController');
// const requireAdmin = require('../middlewares/requireAdmin');

// Tổng quan: doanh thu, số đơn, sản phẩm bán...
router.get('/summary', statsCtrl.getSummary);

// Doanh thu theo thời gian
router.get('/revenue-series', statsCtrl.getRevenueSeries);

// Phân bổ trạng thái đơn hàng
router.get('/order-status', statsCtrl.getOrderStatusBreakdown);

// Phân bổ theo phương thức thanh toán
router.get('/payment-methods', statsCtrl.getPaymentMethods);

// Top sản phẩm bán chạy
router.get('/top-plants', statsCtrl.getTopPlants);

// Sản phẩm sắp hết hàng
router.get('/low-stock', statsCtrl.getLowStock);

//Top plant chi tiết
router.get('/top-plant-detail', statsCtrl.getTopPlantDetail);

module.exports = router;
