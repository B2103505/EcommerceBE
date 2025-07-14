const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUserController = async (req, res) => {
    try {
        const { User_Email, User_Password, User_PhoneNumber, User_Fullname, User_Avatar } = req.body;
        // console.log('req body', req.body)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = regex.test(User_Email);
        // console.log('check email', isCheckEmail);
        if (!User_Email || !User_Password || !User_PhoneNumber || !User_Fullname) {
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
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newResponse)
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
        const { page, limit } = req.query
        const response = await UserService.GetAllUserService(Number(limit) || 8, Number(page) || 1)
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

const RefreshTokenUserController = async (req, res) => {
    // console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'This token require!!!'
            })
        }
        const response = await JwtService.RefreshTokenJwtService(token)
        return res.status(200).json(response)

        // const bearerToken = req.headers.authorization;
        // // Kiểm tra header hợp lệ
        // if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        //     return res.status(401).json({
        //         status: 'ERR',
        //         message: 'Authorization header missing or invalid'
        //     });
        // }

        // const token = bearerToken.split(' ')[1]
        // if (!token) {
        //     return res.status(200).json({
        //         errCode: 101,
        //         status: 'ERR',
        //         message: 'This token require!!!'
        //     })
        // }

        // const response = await JwtService.RefreshTokenJwtService(token)
        // return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in RefreshTokenUserController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const LogoutUserController = async (req, res) => {
    // console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully',
        })

    } catch (e) {
        console.error('❌ Error in LogoutUserController:', e);
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
    RefreshTokenUserController, LogoutUserController
}