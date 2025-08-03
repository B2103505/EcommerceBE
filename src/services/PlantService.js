const Plant = require('../models/Plant');
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const Category = require('../models/Category');


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
                Plant_Status, Plant_Price, Plant_Images, Category_Ids
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

            // Tạo filter
            if (filterKey && filterValue) {
                if (filterKey === 'Category_Ids') {
                    const matchedCategories = await Category.find({
                        Category_Name: { $regex: filterValue, $options: 'i' }
                    });

                    const matchedCategoryIds = matchedCategories.map(c => c._id);

                    query[filterKey] = { $in: matchedCategoryIds };
                } else if (filterKey === 'Plant_Status') {
                    query[filterKey] = { $regex: filterValue, $options: 'i' };
                } else {
                    query[filterKey] = { $regex: filterValue, $options: 'i' };
                }
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

const PlantsByCateService = async (categoryId, page, limit) => {
    const skip = (page - 1) * limit;

    const total = await Plant.countDocuments({ Category_Ids: categoryId });
    const plants = await Plant.find({ Category_Ids: categoryId })
        .skip(skip)
        .limit(Number(limit))
        .populate('Category_Ids');

    return {
        plants,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit)
    };
};

const SearchAdvancedPlantService = async (limit, page, sortOrder, sortField, filters) => {
    const query = {};

    // Tạo điều kiện tìm kiếm linh hoạt từ filters
    for (const key in filters) {
        const value = filters[key];

        if (Array.isArray(value)) {
            query[key] = { $in: value };
        } else if (typeof value === 'string' && value.trim() !== '') {
            query[key] = { $regex: value, $options: 'i' };
        }
    }

    const total = await Plant.countDocuments(query);

    const plants = await Plant.find(query)
        .sort(sortField ? { [sortField]: sortOrder === 'desc' ? -1 : 1 } : {})
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        total,
        plants,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
    };
};


module.exports = {
    createPlantService, UpdatePlantService,
    DetailPlantService, DeletePlantService,
    GetAllPlantService, PlantsByCateService, 
    SearchAdvancedPlantService
}