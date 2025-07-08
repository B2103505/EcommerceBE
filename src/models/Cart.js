const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  User_Id: { type: Schema.Types.ObjectId, ref: 'User' },
    Cart_Total_Amount: { type: Number, default: 0 },
  });
  
module.exports = mongoose.model('Cart', cartSchema);
  