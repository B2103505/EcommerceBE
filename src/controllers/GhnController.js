const { getShippingFeeService, getAvailableServicesService } = require('../services/GhnService');

const getShippingFee = async (req, res) => {
    const { service_id, from_district_id, to_district_id, to_ward_code, weight } = req.body;

    if (!service_id || !from_district_id || !to_district_id || !to_ward_code || !weight) {
        return res.status(400).json({
            status: 'ERR',
            message: 'Missing required fields'
        });
    }

    try {
        const response = await getShippingFeeService({
            service_id,
            from_district_id,
            to_district_id,
            to_ward_code,
            weight
        });

        res.status(200).json(response);
    } catch (error) {
        console.log('err', error)
        res.status(500).json(error);
    }
};

const getAvailableServices = async (req, res) => {
    let { from_district, to_district } = req.body;

    if (!from_district || !to_district) {
        return res.status(400).json({
            status: 'ERR',
            message: 'Missing from_district or to_district'
        });
    }

    try {
        from_district = Number(from_district);
        to_district = Number(to_district);
        const result = await getAvailableServicesService({ from_district, to_district });

        res.status(200).json(result);
    } catch (error) {
        console.error('err', error);
        res.status(500).json(error);
    }
};

module.exports = {
    getShippingFee, getAvailableServices
};
