const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const RoleController = require('../controllers/RoleController');
const { AuthMiddleWare } = require("../MiddleWare/AuthMiddleWare");

router.post('/init-roles', RoleController.CreateRolesController);

router.post('/sign-up', UserController.createUserController);
router.post('/sign-in', UserController.LoginUserController);
router.put('/update-user/:id', UserController.UpdateUserController);
router.delete('/delete-user/:id', AuthMiddleWare, UserController.DeleteUserController);
router.get('/getAll', AuthMiddleWare, UserController.GetAllUserController);
router.get('/get-detail/:id', UserController.GetDetailUserController);

module.exports = router