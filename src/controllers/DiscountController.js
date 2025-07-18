const DiscountService = require('../services/DiscountService');
const Discount = require('../models/Discount');

const createDiscountController = async (req, res) => {
    try {
        const result = await DiscountService.createDiscount(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const getAllDiscountsController = async (req, res) => {
    try {
        const result = await DiscountService.getAllDiscounts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const updateDiscountController = async (req, res) => {
    try {
        const result = await DiscountService.updateDiscount(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const deleteDiscountController = async (req, res) => {
    try {
        const result = await DiscountService.deleteDiscount(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const getValidDiscountsController = async (req, res) => {
    try {
        const now = new Date();

        const discounts = await Discount.find({
            $or: [
                {
                    Discount_Start_Date: { $lte: now },
                    Discount_End_Date: { $gte: now },
                },
                {
                    Discount_Start_Date: { $exists: false },
                    Discount_End_Date: { $exists: false },
                },
            ],
        });

        res.status(200).json({ status: "OK", data: discounts });
    } catch (error) {
        console.error("❌ Lỗi khi getValidDiscountsController:", error);
        res.status(500).json({ status: "ERROR", message: error.message });
    }
};


module.exports = {
    createDiscountController, getAllDiscountsController,
    updateDiscountController, deleteDiscountController,
    getValidDiscountsController,
};
