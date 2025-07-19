const Plant = require('../models/Plant');
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService');


const createPlantService = (NewPlant) => {
    return new Promise(async (resolve, reject) => {

        const { Plant_Name, Plant_Scientific_Name, Plant_Leaf_Shape, Plant_Leaf_Color, Plant_Growth_Form, Plant_Size,
            Plant_Context, Plant_Light, Plant_Foliage_Density, Plant_Other_Name, Plant_Description, Plant_Quantity,
            Plant_Status, Plant_Price, Plant_Images, Category_Ids, Discount_Ids } = NewPlant;

        try {
            const checkPlant = await Plant.findOne({
                Plant_Name: Plant_Name
            })

            if (checkPlant !== null) {
                resolve({
                    status: 'OK',
                    message: 'This plant is already!!!'
                })
            }

            const createPlant = await Plant.create({
                Plant_Name, Plant_Scientific_Name, Plant_Leaf_Shape, Plant_Leaf_Color, Plant_Growth_Form, Plant_Size,
                Plant_Context, Plant_Light, Plant_Foliage_Density, Plant_Other_Name, Plant_Description, Plant_Quantity,
                Plant_Status, Plant_Price, Plant_Images, Category_Id
            })

            if (createPlant) {
                resolve({
                    status: 'OK',
                    message: 'create success',
                    data: createPlant
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const UpdatePlantService = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkPlant = await Plant.findOne({ _id: id })

            if (checkPlant === null) {
                resolve({
                    status: 'OK',
                    message: 'Plant is not exist',
                })
            }

            const updatePlant = await Plant.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'update plant success',
                data: updatePlant
            })
        } catch (e) {
            reject(e);
        }
    })
}

const DetailPlantService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const plant = await Plant.findOne({ _id: id })
                .populate('Category_Ids', 'Category_Name')
                .populate('Discount_Ids');

            if (!plant) {
                return resolve({
                    status: 'ERR',
                    message: 'Plant not found',
                    data: null
                });
            }

            resolve({
                status: 'OK',
                message: 'success',
                data: plant
            })
        } catch (e) {
            reject(e);
        }
    })
}

const DeletePlantService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkPlant = await Plant.findOne({ _id: id })

            if (checkPlant === null) {
                return resolve({
                    status: 'OK',
                    message: 'Plant is not exist',
                })
            }

            await Plant.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete plant success',
            })
        } catch (e) {
            reject(e);
        }
    })
}

const GetAllPlantService = (limit, page, sortOrder, sortField, filterKey, filterValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = {};
            const sort = {};

            // Tạo filter nếu có
            if (filterKey && filterValue) {
                query[filterKey] = { $regex: filterValue, $options: 'i' };
            }

            // Tạo sort nếu có
            if (sortField && sortOrder) {
                sort[sortField] = sortOrder === 'asc' ? 1 : -1;
            }

            const totalPlant = await Plant.countDocuments(query);
            const allPlant = await Plant.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort(sort);

            resolve({
                status: 'OK',
                message: 'Get All Plant success',
                data: allPlant,
                total: totalPlant,
                pageCurr: page,
                totalPage: Math.ceil(totalPlant / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    createPlantService, UpdatePlantService,
    DetailPlantService, DeletePlantService,
    GetAllPlantService
}