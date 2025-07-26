const axios = require('axios');

const getShippingFeeService = ({ service_id, from_district_id, to_district_id, to_ward_code, weight }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
                service_id,
                insurance_value: 0,
                from_district_id,
                to_district_id,
                to_ward_code,
                weight
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'ShopId': process.env.GHN_SHOP_ID,
                    'Token': process.env.GHN_TOKEN
                }
            });

            resolve({
                status: 'OK',
                message: 'Lấy phí vận chuyển thành công',
                data: response.data.data
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Không thể lấy phí vận chuyển',
                error: e.response?.data || e.message
            });
        }
    });
};

const getAvailableServicesService = ({ from_district, to_district }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
          {
            shop_id: Number(process.env.GHN_SHOP_ID),
            from_district,
            to_district
          },
          {
            headers: {
              'Token': process.env.GHN_TOKEN,
              'Content-Type': 'application/json'
            }
          }
        );
  
        resolve({
          status: 'OK',
          message: 'Lấy dịch vụ khả dụng thành công',
          data: response.data.data
        });
      } catch (e) {
        reject({
          status: 'ERR',
          message: 'Không thể lấy dịch vụ khả dụng',
          error: e.response?.data || e.message
        });
      }
    });
  };

module.exports = { getShippingFeeService, getAvailableServicesService };
