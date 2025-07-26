const VNPayService = require('../services/VNPayService')
const { createVNPayPaymentUrl } = require("../services/VNPayService");

const getVNPayUrl = (req, res) => {
    const ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress;

    const { amount, bankCode, orderDescription, orderType, language } = req.body;

    try {
        const paymentUrl = createVNPayPaymentUrl({
            amount,
            bankCode,
            orderDescription,
            orderType,
            language,
            ipAddr,
        });

        res.status(200).json({ url: paymentUrl });
    } catch (error) {
        console.error('createPaymentUrl error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const vnpayReturn = (req, res) => {
    const vnpParams = req.query;
    const secureHash = vnpParams['vnp_SecureHash'];

    // Xóa vnp_SecureHash và vnp_SecureHashType khỏi object để kiểm tra chữ ký
    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    // Sort theo key alphabet
    const sortedParams = {};
    Object.keys(vnpParams).sort().forEach(key => {
        sortedParams[key] = vnpParams[key];
    });

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
    const calculatedHash = hmac.update(signData).digest('hex');

    // Debug nếu cần
    console.log('SIGNDATA2:', signData);
    console.log('Received Hash2:', secureHash);
    console.log('Calculated Hash2:', calculatedHash);

    const isValid = secureHash === calculatedHash;
    const vnp_ResponseCode = req.query.vnp_ResponseCode;
    const isSuccess = vnp_ResponseCode === '00';

    if (!isValid) {
        return res.redirect(`http://localhost:3000/payment-result?success=false&reason=invalid-signature`);
    }

    // Nếu hợp lệ, redirect về frontend
    return res.redirect(`http://localhost:3000/payment-result?success=${isSuccess}`);
};

module.exports = {
    vnpayReturn, getVNPayUrl
}
