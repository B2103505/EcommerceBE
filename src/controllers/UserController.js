const UserService = require('../services/UserService')

const createUserController = async (req,res) => {
    try {
        console.log(req.body);
        const res = await UserService.createUserService()
        return res.status(200).json(res)
    }catch(e){
        res.status(400).json({
            message: e
        });
    }

}

module.exports = {
    createUserController,
}