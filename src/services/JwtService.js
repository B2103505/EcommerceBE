const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '15m' })

    return access_token;
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '30d' })

    return refresh_token;
}

const RefreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
            // console.log('err', decoded)
            if (err || !decoded) {
                return resolve({
                    status: 'ERR',
                    message: 'Invalid or expired refresh token',
                });
            }

            const { id, Role_Id } = decoded;

            const newAccessToken = await generalAccessToken({ id, Role_Id });

            return resolve({
                status: 'OK',
                message: 'Refresh success',
                access_token: newAccessToken,
            });
        });
    });
};

module.exports = {
    generalAccessToken, generalRefreshToken,
    RefreshTokenJwtService,
}