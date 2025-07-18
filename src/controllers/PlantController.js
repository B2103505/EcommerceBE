const PlantService = require('../services/PlantService')

const createPlantController = async (req, res) => {
    try {
        const { Plant_Name, Plant_Scientific_Name, Plant_Leaf_Shape, Plant_Leaf_Color, Plant_Growth_Form, Plant_Size,
            Plant_Context, Plant_Light, Plant_Foliage_Density, Plant_Other_Name, Plant_Description, Plant_Quantity,
            Plant_Status, Plant_Price, Plant_Images, Category_Ids, Discount_Ids } = req.body;

        if (!Plant_Name || !Plant_Price || !Plant_Quantity || !Plant_Description) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'The input is required!!!'
            })
        }
        const response = await PlantService.createPlantService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in createPlantController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const UpdatePlantController = async (req, res) => {
    try {
        const Plant_Id = req.params.id
        const data = req.body

        if (!Plant_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Plant_Id not found!!!'
            })
        }

        const response = await PlantService.UpdatePlantService(Plant_Id, data)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in UpdatePlantController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const DetailPlantController = async (req, res) => {
    try {
        const Plant_Id = req.params.id
        // const token = req.headers

        if (!Plant_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Plant_Id not found!!!'
            })
        }

        const response = await PlantService.DetailPlantService(Plant_Id)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in DetailPlantController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const DeletePlantController = async (req, res) => {
    try {
        const Plant_Id = req.params.id
        // const token = req.headers

        if (!Plant_Id) {
            return res.status(200).json({
                errCode: 101,
                status: 'ERR',
                message: 'Plant_Id not found!!!'
            })
        }

        const response = await PlantService.DeletePlantService(Plant_Id)
        return res.status(200).json(response)
    } catch (e) {
        console.error('❌ Error in DeletePlantController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}

const GetAllPlantController = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 8,
            sortField,
            sortOrder,
            filterKey,
            filterValue
        } = req.query;

        const response = await PlantService.GetAllPlantService(
            Number(limit),
            Number(page),
            sortOrder,
            sortField,
            filterKey,
            filterValue
        );

        return res.status(200).json(response);

    } catch (e) {
        console.error('❌ Error in GetAllPlantController:', e);
        res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong',
            stack: e.stack
        });
    }
}


module.exports = {
    createPlantController, UpdatePlantController,
    DetailPlantController, DeletePlantController,
    GetAllPlantController
}