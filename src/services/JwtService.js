const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '3h' })

    return access_token;
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '30d' })

    return refresh_token;
}

module.exports = {
    generalAccessToken, generalRefreshToken,
}