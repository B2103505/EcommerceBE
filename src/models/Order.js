const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Order_Delivery_Date: { type: Date },
    Order_Fee: { type: Number },
    Order_Total_Amount: { type: Number },
    Order_Status_Id: { type: Schema.Types.ObjectId, ref: 'OrderStatus', required: true },
    Cart_Id: { type: Schema.Types.ObjectId, ref: 'Cart' },
    Payment_Method_Id: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    Payment_Status_Id: { type: Schema.Types.ObjectId, ref: 'PaymentStatus', required: true },
    Address_Id: { type: Schema.Types.ObjectId, ref: 'Address' },
    User_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

orderSchema.index({ createdAt: 1 });           // Tìm đơn theo ngày (thống kê theo thời gian)
orderSchema.index({ Payment_Status_Id: 1 });  // Lọc theo trạng thái thanh toán
orderSchema.index({ Payment_Method_Id: 1 });  // Lọc theo phương thức thanh toán

module.exports = mongoose.model('Order', orderSchema);