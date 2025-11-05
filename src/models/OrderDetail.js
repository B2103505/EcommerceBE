const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
  Order_Id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  Plant_Id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  Order_Detail_Quantity: { type: Number, required: true, min: 1 },
  Order_Item_Price: { type: Number, required: true, min: 0 },
  Discount_Id: { type: Schema.Types.ObjectId, ref: 'Discount' },
}, { timestamps: true });

orderDetailSchema.index({ createdAt: 1 });    // Thống kê theo ngày bán
orderDetailSchema.index({ Order_Id: 1 });     // Join nhanh Order <-> OrderDetail
orderDetailSchema.index({ Plant_Id: 1 });     // Thống kê theo sản phẩm

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
