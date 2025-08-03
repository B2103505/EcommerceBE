const reviewService = require('../services/ReviewService');
const OrderService = require('../services/OrderService')

const getReviewsByPlant = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByPlant(req.params.plantId);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserReviewForPlant = async (req, res) => {
    try {
        const review = await reviewService.getUserReviewForPlant(req.params.userId, req.params.plantId);
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createOrUpdateReview = async (req, res) => {
    try {
        const { User_Id, Plant_Id, Review_Rate, Review_Comment, Review_Images } = req.body;

        // Kiểm tra đã mua chưa
        const hasPurchased = await OrderService.hasPurchased(User_Id, Plant_Id);

        if (!hasPurchased) {
            return res.status(403).json({
                status: 'ERROR',
                message: 'Bạn chưa mua sản phẩm này nên không thể đánh giá.'
            });
        }

        // Tạo/Cập nhật đánh giá
        const review = await reviewService.createOrUpdateReview({ User_Id, Plant_Id, Review_Rate, Review_Comment, Review_Images });

        return res.status(200).json({
            status: 'OK',
            message: 'Đánh giá đã được ghi nhận.',
            data: review
        });

    } catch (error) {
        console.error('[createReview] Error:', error);
        return res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
};


// reviewController.js
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) return res.status(404).json({ message: 'Không tìm thấy đánh giá.' });

        // Cập nhật lại rating cho cây
        const reviews = await Review.find({ Plant_Id: review.Plant_Id });
        const ratingCount = reviews.length;
        const totalRating = reviews.reduce((sum, r) => sum + r.Review_Rate, 0);
        const averageRating = ratingCount > 0 ? parseFloat((totalRating / ratingCount).toFixed(1)) : 0;

        await Plant.findByIdAndUpdate(review.Plant_Id, {
            Plant_averageRating: averageRating,
            Plant_ratingCount: ratingCount
        });

        return res.status(200).json({ message: 'Xoá đánh giá thành công.' });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi xoá đánh giá.', error });
    }
};


module.exports = {
    deleteReview, createOrUpdateReview, getReviewsByPlant, getUserReviewForPlant
}
