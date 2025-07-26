const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Address = require('../models/Address');

const createOrder = async (orderData) => {
    const {
        User_Id,
        Address_Id,
        Payment_Method_Id,
        Order_Details,
        Order_Total,
        Address_Fullname,
        Address_Phone,
        Address_Detail_Address,
        Address_Type,
        Address_Province_Id,
        Address_Province_Name,
        Address_District_Id,
        Address_District_Name,
        Address_WardCode,
        Address_WardName,
        Order_Fee,
        Order_Delivery_Date,
    } = orderData;

    if (!Order_Details || Order_Details.length === 0) {
        throw new Error('Không có sản phẩm nào trong đơn hàng');
    }

    let finalAddressId = Address_Id;

    // Nếu có Address_Id ⇒ cập nhật
    if (Address_Id) {
        await Address.findByIdAndUpdate(Address_Id, {
            ...(Address_Fullname && { Address_Fullname }),
            ...(Address_Phone && { Address_Phone }),
            ...(Address_Detail_Address && { Address_Detail_Address }),
        });
    } else {
        // Nếu không có Address_Id ⇒ tạo mới
        const newAddress = await Address.create({
            User_Id,
            Address_Type: Address_Type || 'SHIPPING',
            Address_Province_Id,
            Address_Province_Name,
            Address_District_Id,
            Address_District_Name,
            Address_WardCode,
            Address_WardName,
            Address_Detail_Address,
            Address_Fullname,
            Address_Phone,
            Created_At: new Date()
        });
        finalAddressId = newAddress._id;
    }

    // Tạo đơn hàng
    const order = await Order.create({
        User_Id,
        Address_Id: finalAddressId,
        Payment_Method_Id,
        Order_Total_Amount: Order_Total,
        Order_Status_Id: '687a33cb4f5380644ac977ca', // Chờ xác nhận
        Payment_Status_Id: '687a33cc4f5380644ac977d9', // COD
        Created_At: new Date(),
        Order_Fee,
        Order_Delivery_Date: Order_Delivery_Date,
    });

    // Tạo chi tiết đơn hàng
    const details = await Promise.all(Order_Details.map(async item => {
        return await OrderDetail.create({
            Order_Id: order._id,
            Plant_Id: item.Plant_Id,
            Order_Detail_Quantity: item.Order_Detail_Quantity,
            Order_Item_Price: item.Order_Item_Price,
            Discount_Id: item.Discount_Id || null
        });
    }));

    if (!Address_Id) {
        await Address.findByIdAndUpdate(finalAddressId, {
            Order_Id: order._id
        });
    }

    return {
        status: 'OK',
        message: 'Tạo đơn hàng thành công',
        data: { order, details }
    };
};

const getOrdersByUser = async (userId) => {
    const orders = await Order.find({ User_Id: userId })
        .populate('Order_Status_Id')
        .populate('Payment_Status_Id')
        .populate('Payment_Method_Id')
        .populate('Address_Id')
        .sort({ Created_At: -1 });

    return {
        status: 'OK',
        data: orders
    };
};

const getAllOrders = async (req) => {
    try {
        const query = {};
        const {
            Order_Status_Id,
            Payment_Method_Id,
            Payment_Status_Id
        } = req.query;

        if (Order_Status_Id) query.Order_Status_Id = Order_Status_Id;
        if (Payment_Method_Id) query.Payment_Method_Id = Payment_Method_Id;
        if (Payment_Status_Id) query.Payment_Status_Id = Payment_Status_Id;

        const orders = await Order.find(query)
            .populate('User_Id')
            .populate('Order_Status_Id')
            .populate('Payment_Method_Id')
            .populate('Payment_Status_Id')
            .sort({ createdAt: -1 });

        return { status: 'OK', data: orders };
    } catch (error) {
        console.log('OrderService getAllOrders error:', error);
        throw new Error(error.message);
    }
};

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate('Order_Status_Id')
        .populate('Payment_Status_Id')
        .populate('Payment_Method_Id')
        .populate('Address_Id')
        .populate('User_Id');

    const details = await OrderDetail.find({ Order_Id: orderId })
        .populate('Plant_Id');

    return {
        status: 'OK',
        data: { order, details }
    };
};

const updateOrderStatus = async (orderId, statusId) => {
    const order = await Order.findByIdAndUpdate(
        orderId,
        { Order_Status_Id: statusId },
        { new: true }
    );

    return {
        status: 'OK',
        message: 'Cập nhật trạng thái thành công',
        data: order
    };
};

const updateOrder = async (orderId, updateFields) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        updateFields,
        { new: true }
    );

    return {
        status: 'OK',
        message: 'Cập nhật đơn hàng thành công',
        data: updatedOrder
    };
};


const deleteOrder = async (orderId) => {
    await OrderDetail.deleteMany({ Order_Id: orderId });
    await Order.findByIdAndDelete(orderId);

    return {
        status: 'OK',
        message: 'Đã xoá đơn hàng và chi tiết đơn hàng'
    };
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateOrder,
    deleteOrder
};
