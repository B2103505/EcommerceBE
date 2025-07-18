const Discount = require('../models/Discount');
const Plant = require('../models/Plant');
const mongoose = require('mongoose');

const createDiscount = async (data) => {
    const created = await Discount.create(data);
    return { status: 'OK', message: 'Tạo thành công', data: created };
};

const getAllDiscounts = async () => {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    return { status: 'OK', data: discounts };
};

const updateDiscount = async (id, data) => {
    const updated = await Discount.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
        return { status: 'ERROR', message: 'Không tìm thấy discount' };
    }
    return { status: 'OK', message: 'Cập nhật thành công', data: updated };
};

const deleteDiscount = async (id) => {
    const discountId = new mongoose.Types.ObjectId(id); // ✅ dùng 'new'

    // Gỡ discount khỏi tất cả các cây liên kết
    await Plant.updateMany(
        { Discount_Ids: discountId },
        { $pull: { Discount_Ids: discountId } }
    );

    const deleted = await Discount.findByIdAndDelete(discountId);
    if (!deleted) {
        return { status: 'ERROR', message: 'Không tìm thấy discount để xóa' };
    }

    return { status: 'OK', message: 'Xóa thành công' };
};

module.exports = {
    createDiscount,
    getAllDiscounts,
    updateDiscount,
    deleteDiscount
};
