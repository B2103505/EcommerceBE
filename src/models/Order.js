const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    deliveryDate: { type: Date },
    fee: { type: Number },
    totalAmount: { type: Number },
    status: { type: Schema.Types.ObjectId, ref: 'OrderStatus' },

    paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    paymentStatus: { type: Schema.Types.ObjectId, ref: 'PaymentStatus', required: true },

    // Thêm thông tin địa chỉ giao hàng
    shippingAddress: {
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        detailAddress: { type: String, required: true }
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);