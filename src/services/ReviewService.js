const Review = require('../models/Review');
const Plant = require('../models/Plant')

const getReviewsByPlant = async (plantId) => {
    return await Review.find({ Plant_Id: plantId })
        .populate('User_Id', 'User_Fullname User_Avatar')
        .sort({ createdAt: -1 });
};

const getUserReviewForPlant = async (userId, plantId) => {
    return await Review.findOne({ User_Id: userId, Plant_Id: plantId });
};

const createOrUpdateReview = async (data) => {
    const {
        User_Id, Plant_Id, Review_Rate, Review_Comment, Review_Images
    } = data;

    let review = await Review.findOne({ User_Id: User_Id, Plant_Id: Plant_Id });

    if (review) {
        review.Review_Rate = Review_Rate;
        review.Review_Comment = Review_Comment;
        review.Review_Images = Review_Images || [];
        await review.save();
    } else {
        review = new Review({
            User_Id: User_Id,
            Plant_Id: Plant_Id,
            Review_Rate: Review_Rate,
            Review_Comment: Review_Comment,
            Review_Images: Review_Images || []
        });
        await review.save();
    }

    // Tính toán lại rating (dùng aggregate sẽ tối ưu hơn nếu dữ liệu lớn)
    const reviews = await Review.find({ Plant_Id: Plant_Id });
    const ratingCount = reviews.length;
    const totalRating = reviews.reduce((sum, r) => sum + r.Review_Rate, 0);
    const averageRating = parseFloat((totalRating / ratingCount).toFixed(1));

    // Cập nhật lại rating cho plant
    await Plant.findByIdAndUpdate(Plant_Id, {
        Plant_averageRating: averageRating,
        Plant_ratingCount: ratingCount
    });

    return review;
};


module.exports = {
    getReviewsByPlant,
    getUserReviewForPlant,
    createOrUpdateReview,   
};
