const Role = require('../models/Role');

const createDefaultRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const defaultRoles = ['Admin', 'Employee', 'Customer'];
            console.log('check 2')
            const createdRoles = [];

            for (const roleName of defaultRoles) {
                // Check if role already exists
                const exists = await Role.findOne({ Role_Name: roleName });

                if (!exists) {
                    const newRole = await Role.create({ Role_Name: roleName });
                    createdRoles.push(newRole);
                } else {
                    createdRoles.push(exists);
                }
            }
            console.log('check 3')
            resolve({
                status: 'OK',
                message: 'Roles init success',
                data: createdRoles
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createDefaultRoles
};
