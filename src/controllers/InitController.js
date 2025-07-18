const InitService = require('../services/InitService');

const initDefaultDataController = async (req, res) => {
    try {
        console.log('Init default data');
        const response = await InitService.initDefaultValues();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 'ERR',
            message: 'Server error when initializing data',
            error: error.message
        });
    }
};

const getAllOrderStatusesController = async (req, res) => {
    try {
        const response = await InitService.getAllOrderStatuses();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const getAllPaymentMethodsController = async (req, res) => {
    try {
        const response = await InitService.getAllPaymentMethods();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const getAllPaymentStatusesController = async (req, res) => {
    try {
        const response = await InitService.getAllPaymentStatuses();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

module.exports = {
    initDefaultDataController, getAllOrderStatusesController,
    getAllPaymentMethodsController, getAllPaymentStatusesController,

};
