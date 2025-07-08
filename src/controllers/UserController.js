const UserService = require('../services/UserService')

const createUserController = async (req, res) => {
    try {
        const { User_Email, User_Password, User_PhoneNumber, User_Fullname, User_Avatar } = req.body;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = regex.test(User_Email);
        // console.log('check email', isCheckEmail);
        if (!User_Email || !User_Password || !User_PhoneNumber || !User_Fullname || !User_Avatar) {
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

const LoginUserController = async (req, res) => {
    try {
        const { User_Email, User_Password } = req.body;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = regex.test(User_Email);

        if (!User_Email || !User_Password) {
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
        const response = await UserService.LoginUserService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in LoginUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const UpdateUserController = async (req, res) => {
    try {
        const User_Id = req.params.id
        const data = req.body

        if (!User_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Id not found!!!'
            })
        }

        const response = await UserService.UpdateUserService(User_Id, data)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in UpdateUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const DeleteUserController = async (req, res) => {
    try {
        const User_Id = req.params.id
        // const token = req.headers

        if (!User_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Id not found!!!'
            })
        }

        const response = await UserService.DeleteUserService(User_Id)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in DeleteUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const GetAllUserController = async (req, res) => {
    try {
        const response = await UserService.GetAllUserService()
        return res.status(200).json(response)

    } catch (e) {
        console.error('❌ Error in GetAllUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const GetDetailUserController = async (req, res) => {
    try {
        const User_Id = req.params.id
        // const token = req.headers

        if (!User_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Id not found!!!'
            })
        }

        const response = await UserService.GetDetailUserUserService(User_Id)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in DetailUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

module.exports = {
    createUserController, LoginUserController,
    UpdateUserController, DeleteUserController,
    GetAllUserController, GetDetailUserController,

}