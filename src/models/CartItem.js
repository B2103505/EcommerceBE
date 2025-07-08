const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  Cart_Id: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  Plant_Id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  Cart_Item_Quantity: { type: Number, required: true },
  Cart_Item_Price: { type: Number, required: true },
});

module.exports = mongoose.model('CartItem', cartItemSchema);
