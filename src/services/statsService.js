const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Plant = require('../models/Plant');
const User = require('../models/User');
const OrderStatus = require('../models/OrderStatus');
const PaymentMethod = require('../models/PaymentMethod');

// 1. Tổng quan: doanh thu, đơn hàng, sản phẩm
const getOrderSummary = async (start, end) => {
    const totalRevenueAgg = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, totalRevenue: { $sum: "$Order_Total_Amount" }, totalOrders: { $sum: 1 } } }
    ]);

    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;
    const totalOrders = totalRevenueAgg[0]?.totalOrders || 0;

    const totalUsers = await Order.distinct("User_Id", { createdAt: { $gte: start, $lte: end } }).then(r => r.length);

    const totalPlants = await Plant.countDocuments();
    const totalSoldAgg = await OrderDetail.aggregate([{ $group: { _id: null, totalSold: { $sum: "$Order_Detail_Quantity" } } }]);
    const totalSold = totalSoldAgg[0]?.totalSold || 0;

    return { totalRevenue, totalOrders, totalUsers, totalPlants, totalSold };
};

// 2. Doanh thu theo ngày
const getRevenueSeries = async (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    end.setHours(23, 59, 59, 999);
    // console.log({ from, to, start, end });

    return await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: "$Order_Total_Amount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);
};

// 3. Phân bổ trạng thái đơn hàng
const getOrderStatusBreakdown = async () => {
    return await Order.aggregate([
        {
            $group: {
                _id: "$Order_Status_Id",
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "orderstatuses",
                localField: "_id",
                foreignField: "_id",
                as: "statusInfo"
            }
        },
        { $unwind: "$statusInfo" },
        { $project: { statusName: "$statusInfo.Order_Status_Name", count: 1 } }
    ]);
};

// 4. Phân bổ phương thức thanh toán
const getPaymentMethods = async () => {
    return await Order.aggregate([
        {
            $group: { _id: "$Payment_Method_Id", count: { $sum: 1 } }
        },
        {
            $lookup: {
                from: "paymentmethods",
                localField: "_id",
                foreignField: "_id",
                as: "methodInfo"
            }
        },
        { $unwind: "$methodInfo" },
        { $project: { methodName: "$methodInfo.Payment_Method_Name", count: 1 } }
    ]);
};

// 5. Top sản phẩm bán chạy
const getTopPlants = async (limit = 5) => {
    return await OrderDetail.aggregate([
        {
            $group: {
                _id: "$Plant_Id",
                totalSold: { $sum: "$Order_Detail_Quantity" },
                totalRevenue: { $sum: { $multiply: ["$Order_Detail_Quantity", "$Order_Item_Price"] } }
            }
        },
        {
            $lookup: {
                from: "plants",
                localField: "_id",
                foreignField: "_id",
                as: "plantInfo"
            }
        },
        { $unwind: "$plantInfo" },
        {
            $project: {
                Plant_Name: "$plantInfo.Plant_Name",
                totalSold: 1,
                totalRevenue: 1
            }
        },
        { $sort: { totalSold: -1 } },
        { $limit: limit }
    ]);
};

// 6. Sản phẩm sắp hết hàng
const getLowStock = async (threshold = 10) => {
    return await Plant.find({ Plant_Quantity: { $lte: threshold } })
        .sort({ Plant_Quantity: 1 })
        .lean();
};

module.exports = {
    getOrderSummary,
    getRevenueSeries,
    getOrderStatusBreakdown,
    getPaymentMethods,
    getTopPlants,
    getLowStock
};
