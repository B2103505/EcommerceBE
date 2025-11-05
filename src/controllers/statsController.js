const statsService = require('../services/statsService');
const PlantService = require('../services/PlantService');

const getSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // mặc định: lấy tháng hiện tại
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const end = endDate ? new Date(endDate) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const summary = await statsService.getOrderSummary(start, end);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRevenueSeries = async (req, res) => {
    try {
        const { from, to } = req.query;
        const data = await statsService.getRevenueSeries(from, to);
        // console.log('getRevenueSeries', data)
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderStatusBreakdown = async (req, res) => {
    try {
        const data = await statsService.getOrderStatusBreakdown();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPaymentMethods = async (req, res) => {
    try {
        const data = await statsService.getPaymentMethods();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTopPlants = async (req, res) => {
    try {
        const { limit, from, to } = req.query;
        const data = await statsService.getTopPlants(limit, from, to);
        // console.log('plant', data)
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLowStock = async (req, res) => {
    try {
        const data = await statsService.getLowStock();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTopPlantDetail = async (req, res) => {
    try {
        const { limit = 5, from, to } = req.query;

        // 1. Lấy top plant (chỉ _id, totalSold, totalRevenue)
        const topPlants = await statsService.getTopPlants(limit, from, to);

        if (!topPlants || topPlants.length === 0) {
            return res.status(200).json([]);
        }

        // 2. Lấy chi tiết từng plant
        const detailedPlantsPromises = topPlants.map(async (tp) => {
            const response = await PlantService.DetailPlantService(tp._id);
            if (response.status === 'OK') {
                return {
                    ...tp,
                    ...response.data._doc // toàn bộ thông tin plant
                };
            }
            return tp; // fallback nếu plant không tìm thấy
        });

        const detailedPlants = await Promise.all(detailedPlantsPromises);

        res.status(200).json(detailedPlants);

    } catch (err) {
        console.error('❌ Error in getTopPlantDetail:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSummary,
    getRevenueSeries,
    getOrderStatusBreakdown,
    getPaymentMethods,
    getTopPlants,
    getLowStock,
    getTopPlantDetail
};
