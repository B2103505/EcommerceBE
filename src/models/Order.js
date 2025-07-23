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
    Address_Id: { type: Schema.Types.ObjectId, ref: 'Address' }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);