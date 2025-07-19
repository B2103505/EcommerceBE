const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Plant = require('../models/Plant');
const mongoose = require('mongoose');

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ User_Id: userId });
    if (!cart) {
        cart = await Cart.create({ User_Id: userId, Cart_Total_Amount: 0 });
    }
    return cart;
};

const addToCartService = async (data) => {
    const { User_Id, Plant_Id, quantity } = data
    const plant = await Plant.findById(Plant_Id);

    if (!plant) throw new Error("Plant not found");

    const cart = await getOrCreateCart(User_Id);

    const price = plant.Plant_Price;

    const existingItem = await CartItem.findOne({ Cart_Id: cart._id, Plant_Id: Plant_Id });

    if (existingItem) {
        existingItem.Cart_Item_Quantity += quantity;
        await existingItem.save();
    } else {
        await CartItem.create({
            Cart_Id: cart._id,
            Plant_Id: Plant_Id,
            Cart_Item_Quantity: quantity,
            Cart_Item_Price: price
        });
    }

    const cartItems = await CartItem.find({ Cart_Id: cart._id });
    const total = cartItems.reduce((sum, item) => sum + item.Cart_Item_Quantity * item.Cart_Item_Price, 0);
    cart.Cart_Total_Amount = total;
    await cart.save();

    return { status: 'OK', message: 'Đã thêm vào giỏ hàng' };
};

const getCartByUserIdService = async (userId) => {
    const cart = await Cart.findOne({ User_Id: userId });

    if (!cart) return { status: 'OK', data: [], total: 0 };

    const items = await CartItem.find({ Cart_Id: cart._id })
        .populate({
            path: 'Plant_Id',
            populate: {
                path: 'Discount_Ids',
                model: 'Discount'
            }
        })

    return { status: 'OK', data: items, total: cart.Cart_Total_Amount };
};


const updateCartItemService = async ({ cartItemId, quantity }) => {
    const item = await CartItem.findById(cartItemId);
    if (!item) throw new Error("Item not found");

    item.Cart_Item_Quantity = quantity;
    await item.save();

    const cart = await Cart.findById(item.Cart_Id);
    const cartItems = await CartItem.find({ Cart_Id: cart._id });
    const total = cartItems.reduce((sum, i) => sum + i.Cart_Item_Quantity * i.Cart_Item_Price, 0);
    cart.Cart_Total_Amount = total;
    await cart.save();

    return { status: 'OK', message: 'Đã cập nhật giỏ hàng' };
};

const deleteCartItemService = async (cartItemId) => {
    const item = await CartItem.findById(cartItemId);
    if (!item) throw new Error("Item not found");

    const cartId = item.Cart_Id;
    await item.deleteOne();

    const cart = await Cart.findById(cartId);
    const items = await CartItem.find({ Cart_Id: cartId });
    const total = items.reduce((sum, i) => sum + i.Cart_Item_Quantity * i.Cart_Item_Price, 0);
    cart.Cart_Total_Amount = total;
    await cart.save();

    return { status: 'OK', message: 'Đã xóa sản phẩm khỏi giỏ hàng' };
};

const clearCartService = async (userId) => {
    const cart = await Cart.findOne({ User_Id: userId });
    if (!cart) return { status: 'OK', message: 'Giỏ hàng trống' };

    await CartItem.deleteMany({ Cart_Id: cart._id });
    cart.Cart_Total_Amount = 0;
    await cart.save();

    return { status: 'OK', message: 'Đã xóa toàn bộ giỏ hàng' };
};

module.exports = {
    addToCartService,
    getCartByUserIdService,
    updateCartItemService,
    deleteCartItemService,
    clearCartService
};
