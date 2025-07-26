const express = require("express");
const VNPayController = require('../controllers/VNPayController');
const { VNPay, ignoreLogger, ProductCode, Vnplocale, dateFormat } = require('vnpay');
const router = express.Router();
require('dotenv').config();
const Order = require('../models/Order');

router.post('/create_payment_url', async (req, res) => {

    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    let amount = order.Order_Total_Amount;
    amount = amount / 100;
    const normalizedAmount = Math.round(Number(amount));

    const vnpay = new VNPay({
        tmnCode: process.env.VNP_TMNCODE,
        secureSecret: process.env.VNP_HASHSECRET,
        vnpayHost: 'https://sandbox.vnpayment.vn',
        queryDrAndRefundHost: 'https://sandbox.vnpayment.vn',
        testMode: true,
        hashAlgorithm: 'SHA512',
        loggerFn: ignoreLogger,
    })

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: normalizedAmount * 100,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: orderId.toString(),
        vnp_OrderInfo: `thanh toán đơn hàng ${orderId}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://localhost:3001/api/vnpay/vnpay-return',
        vnp_Locale: 'vn',
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
    })
    return res.status(200).json(vnpayResponse);
});

router.get('/vnpay-return', async (req, res) => {
    const query = req.query;
    if (query.vnp_ResponseCode === '00') {
        await Order.findByIdAndUpdate(query.vnp_TxnRef, {
            Payment_Status_Id: '687a33cd4f5380644ac977e8' //đã thanh toán
        });
        res.redirect(`http://localhost:3000/order-success?orderId=${query.vnp_TxnRef}`);
    } else {
        await Order.findByIdAndUpdate(orderId, {
            Payment_Status_Id: '687a33ce4f5380644ac977ee' //thanh toán thất bại
        });
        res.redirect(`http://localhost:3000/order-failed?orderId=${query.vnp_TxnRef}`);
    }
});

module.exports = router
