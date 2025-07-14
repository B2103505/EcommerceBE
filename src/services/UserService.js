const User = require('../models/User');
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService');


const createUserService = (NewUser) => {
    return new Promise(async (resolve, reject) => {

        const { User_Email, User_Password, User_PhoneNumber, User_Fullname, User_Avatar, Role_Id, access_token, refresh_token } = NewUser;
        // console.log(NewUser);
        try {
            const checkUser = await User.findOne({
                User_Email: User_Email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'This email is already!!!'
                })
            }
            const hash = bcrypt.hashSync(User_Password, 10)
            const createUser = await User.create({
                User_Email,
                User_Password: hash,
                User_PhoneNumber,
                User_Fullname,
                User_Avatar: User_Avatar || null,
                Role_Id: Role_Id || '686d164e833c9c6a3a7729ec',
                access_token: access_token || null,
                refresh_token: refresh_token || null
            })
            // console.log(createUser);
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'create success',
                    data: createUser
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const LoginUserService = (LoginUser) => {
    return new Promise(async (resolve, reject) => {

        const { User_Email, User_Password } = LoginUser;
        // console.log(NewUser);
        try {
            const checkUser = await User.findOne({
                User_Email: User_Email
            })

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'This email is not exist !!!'
                })
            }

            const comparePW = bcrypt.compareSync(User_Password, checkUser.User_Password)

            if (!comparePW) {
                resolve({
                    status: 'ERR',
                    message: 'The password or email is incorrect !!!'
                })
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
                Role_Id: checkUser.Role_Id
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                Role_Id: checkUser.Role_Id
            })

            // console.log('check token', access_token)

            resolve({
                status: 'OK',
                message: 'login success',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e);
        }
    })
}

const UpdateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUser = await User.findOne({ _id: id })
            // console.log('check user', checkUser)

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'User is not exist',
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'update user success',
                data: updateUser
            })
        } catch (e) {
            reject(e);
        }
    })
}

const DeleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleted = await User.findByIdAndDelete(id);
            if (!deleted) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found or already deleted'
                });
            }

            resolve({
                status: 'OK',
                message: 'Delete user success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const GetAllUserService = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().limit(limit).skip((page - 1) * limit).populate('Role_Id', 'Role_Name');
            const totalUser = await User.countDocuments()

            resolve({
                status: 'OK',
                message: 'Get All user success',
                data: allUser,
                total: totalUser,
                pageCurr: page,
                totalPage: Math.ceil(totalUser / limit)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const GetDetailUserUserService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({ _id: id })
            // console.log('check user', checkUser)

            if (user === null) {
                return resolve({
                    status: 'OK',
                    message: 'User is not exist',
                })
            }

            resolve({
                status: 'OK',
                message: 'success',
                data: user
            })
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createUserService, LoginUserService,
    UpdateUserService, DeleteUserService,
    GetAllUserService, GetDetailUserUserService,

}