const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const AuthMiddleWare = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    // Kiểm tra header hợp lệ
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authorization header missing or invalid'
        });
    }

    const token = bearerToken.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {

        if (err) {
            return res.status(400).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }

        if (user?.Role_Id === '686d164d833c9c6a3a7729e6') {
            return next()
        } else {
            return res.status(400).json({
                message: 'Access denied. Admin only',
                status: 'ERR'
            })
        }
    })
}

const AuthSelfMiddleWare = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    // Kiểm tra header hợp lệ
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authorization header missing or invalid'
        });
    }

    const token = bearerToken.split(' ')[1]
    const User_Id = req.params.id
    // console.log('user', User_Id)
    // console.log('token', token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        // console.log('err', err)
        if (err) {
            return res.status(400).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }

        if (
            user?.Role_Id === '686d164d833c9c6a3a7729e6' ||
            String(user?.id) === String(User_Id)
        ) {
            return next()
        } else {
            return res.status(400).json({
                message: 'Access denied. Admin only',
                status: 'ERR'
            })
        }
    })
}

module.exports = {
    AuthMiddleWare, AuthSelfMiddleWare,

}