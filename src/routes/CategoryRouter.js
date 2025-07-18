const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

const { AuthMiddleWare, AuthSelfMiddleWare } = require("../MiddleWare/AuthMiddleWare");

router.post('/create', AuthMiddleWare, CategoryController.CreateCategoryController);
router.put('/update/:id', AuthMiddleWare, CategoryController.UpdateCategoryController);
router.delete('/delete/:id', AuthMiddleWare, CategoryController.DeleteCategoryController);
router.get('/getAll', CategoryController.GetAllCategoryController);
router.get('/detail/:id', AuthMiddleWare, CategoryController.DetailCategoryController);

module.exports = router