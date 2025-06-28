const UserService = require('../services/UserService')

const createUserController = async (req, res) => {
    try {
        const { email, password, phoneNumber, fullName, avatar } = req.body;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = regex.test(email);
        // console.log('check email', isCheckEmail);
        if (!email || !password || !phoneNumber || !fullName || !avatar) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'The input is required!!!'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                errCode: 102,
                status: 'ERR',
                message: 'The input email not valid!!!'
            })
        }
        // console.log(req.body);
        const response = await UserService.createUserService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in createUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }


}

module.exports = {
    createUserController,
}