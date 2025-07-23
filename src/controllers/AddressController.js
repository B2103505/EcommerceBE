const Address = require('../models/Address');

const createOrUpdateAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const userId = req.body.User_Id;

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu thông tin User_Id',
            });
        }

        // Kiểm tra địa chỉ đã tồn tại chưa
        const existingAddress = await Address.findOne({ User_Id: userId });

        if (existingAddress) {
            // Nếu có thì cập nhật
            const updatedAddress = await Address.findOneAndUpdate(
                { User_Id: userId },
                addressData,
                { new: true }
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Cập nhật địa chỉ thành công!',
                data: updatedAddress,
            });
        } else {
            // Nếu chưa có thì tạo mới
            const newAddress = await Address.create({
                ...addressData,
                Address_Type: 'HOME',
                User_Id: userId,
            });

            return res.status(201).json({
                status: 'OK',
                message: 'Tạo địa chỉ thành công!',
                data: newAddress,
            });
        }
    } catch (err) {
        console.error('Lỗi lưu địa chỉ:', err);
        return res.status(500).json({
            status: 'ERR',
            message: err.message || 'Lỗi khi xử lý địa chỉ',
        });
    }
};

const getAddressByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu User_Id',
            });
        }

        const address = await Address.findOne({ User_Id: userId });

        if (!address) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Không tìm thấy địa chỉ',
            });
        }

        return res.status(200).json({
            status: 'OK',
            data: address,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'ERR',
            message: err.message,
        });
    }
};

module.exports = {
    createOrUpdateAddress, getAddressByUserId,

};
