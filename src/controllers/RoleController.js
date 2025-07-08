const RoleService = require('../services/RoleService')

const CreateRolesController = async (req, res) => {
    try {
        console.log('check 1')
        const response = await RoleService.createDefaultRoles();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 'ERR',
            message: 'Server error when creating roles',
            error: error.message
        });
    }
};

module.exports = {
    CreateRolesController
};
