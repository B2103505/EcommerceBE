const {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getAllCategoryService,
    getDetailCategoryService
} = require('../services/CategoryService');

const CreateCategoryController = async (req, res) => {
    try {
        const newCategory = await createCategoryService(req.body);
        res.status(201).json({ status: 'OK', message: 'Tạo danh mục thành công', data: newCategory });
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const UpdateCategoryController = async (req, res) => {
    try {
        const updatedCategory = await updateCategoryService(req.params.id, req.body);
        res.status(200).json({ status: 'OK', message: 'Cập nhật thành công', data: updatedCategory });
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const DeleteCategoryController = async (req, res) => {
    const categoryId = req.params.id;
    
    const result = await deleteCategoryService(categoryId);
    if (result.status === "OK") {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
};

const GetAllCategoryController = async (req, res) => {
    try {
        const categories = await getAllCategoryService();
        res.status(200).json({ status: 'OK', data: categories });
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

const DetailCategoryController = async (req, res) => {
    try {
        const category = await getDetailCategoryService(req.params.id);
        res.status(200).json({ status: 'OK', data: category });
    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

module.exports = {
    CreateCategoryController,
    UpdateCategoryController,
    DeleteCategoryController,
    GetAllCategoryController,
    DetailCategoryController,
};
