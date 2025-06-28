const User = require('../models/User');

const createUserService = (NewUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, phoneNumber, fullName, avatar, role } = NewUser;
        // console.log(NewUser);
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'This email is already!!!'
                })
            }
            const createUser = await User.create({
                email,
                password,
                phoneNumber,
                fullName,
                avatar,
                role
            })
            console.log(createUser);
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

module.exports = {
    createUserService,
}