const Category = require('../models/Category');
const Plant = require("../models/Plant");
const mongoose = require('mongoose');

const createCategoryService = async ({ Category_Name, Category_Image, Category_Status }) => {
    // Kiểm tra trùng tên
    const existingCategory = await Category.findOne({ Category_Name: { $regex: new RegExp(`^${Category_Name}$`, 'i') } });
    if (existingCategory) {
        throw new Error('Tên danh mục đã tồn tại');
    }

    const newCategory = new Category({ Category_Name, Category_Image, Category_Status });
    return await newCategory.save();
};

const updateCategoryService = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCategoryService = async (categoryId) => {
    try {
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

        // Bước 1: Gỡ categoryId khỏi tất cả các cây có liên kết
        await Plant.updateMany(
            { Category_Ids: categoryObjectId },
            { $pull: { Category_Ids: categoryObjectId } }
        );

        // Bước 2: Xóa danh mục
        const deleted = await Category.findByIdAndDelete(categoryObjectId);
        if (!deleted) {
            return { status: "ERROR", message: "Không tìm thấy danh mục!" };
        }

        return { status: "OK", message: "Xóa thành công!" };
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        return { status: "ERROR", message: "Lỗi server khi xóa danh mục!" };
    }
};


const getAllCategoryService = async () => {
    return await Category.find().sort({ createdAt: -1 });
};

const getDetailCategoryService = async (id) => {
    return await Category.findById(id);
};

module.exports = {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getAllCategoryService,
    getDetailCategoryService
};
