const OrderStatus = require('../models/OrderStatus');
const PaymentMethod = require('../models/PaymentMethod');
const PaymentStatus = require('../models/PaymentStatus');

const initDefaultValues = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const created = {};

            // 1. OrderStatus
            const orderStatuses = ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'];
            created.orderStatuses = [];
            for (const status of orderStatuses) {
                const exists = await OrderStatus.findOne({ Order_Status_Name: status });
                if (!exists) {
                    created.orderStatuses.push(await OrderStatus.create({ Order_Status_Name: status }));
                } else {
                    created.orderStatuses.push(exists);
                }
            }

            // 2. PaymentMethod
            const paymentMethods = [
                'Thanh toán khi nhận hàng (COD)',
                'Chuyển khoản ngân hàng',
                'Thẻ tín dụng/Ghi nợ',
                'Ví điện tử (Momo, ZaloPay...)'
            ];
            created.paymentMethods = [];
            for (const method of paymentMethods) {
                const exists = await PaymentMethod.findOne({ Payment_Method_Name: method });
                if (!exists) {
                    created.paymentMethods.push(await PaymentMethod.create({ Payment_Method_Name: method }));
                } else {
                    created.paymentMethods.push(exists);
                }
            }

            // 3. PaymentStatus
            const paymentStatuses = ['Chưa thanh toán', 'Đã thanh toán', 'Đang xử lý', 'Thanh toán thất bại'];
            created.paymentStatuses = [];
            for (const status of paymentStatuses) {
                const exists = await PaymentStatus.findOne({ Payment_Status_Name: status });
                if (!exists) {
                    created.paymentStatuses.push(await PaymentStatus.create({ Payment_Status_Name: status }));
                } else {
                    created.paymentStatuses.push(exists);
                }
            }

            resolve({
                status: 'OK',
                message: 'Initialized default data successfully',
                data: created
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllOrderStatuses = async () => {
    const data = await OrderStatus.find({});
    return { status: 'OK', data };
};

const getAllPaymentMethods = async () => {
    const data = await PaymentMethod.find({});
    return { status: 'OK', data };
};

const getAllPaymentStatuses = async () => {
    const data = await PaymentStatus.find({});
    return { status: 'OK', data };
};

module.exports = {
    initDefaultValues, getAllOrderStatuses,
    getAllPaymentMethods, getAllPaymentStatuses,

};
