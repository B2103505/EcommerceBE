const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Lấy danh sách đánh giá theo Plant_Id
router.get('/plant/:plantId', ReviewController.getReviewsByPlant);

// Lấy đánh giá của người dùng cho một sản phẩm
router.get('/user/:userId/plant/:plantId', ReviewController.getUserReviewForPlant);

// Thêm hoặc cập nhật đánh giá
router.post('/', ReviewController.createOrUpdateReview);

// Xoá đánh giá (nếu cần)
router.delete('/:reviewId', ReviewController.deleteReview);

module.exports = router;
