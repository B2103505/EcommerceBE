const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const RoleController = require('../controllers/RoleController');
const { AuthMiddleWare, AuthSelfMiddleWare } = require("../MiddleWare/AuthMiddleWare");

router.post('/init-roles', RoleController.CreateRolesController);

router.post('/sign-up', UserController.createUserController);
router.post('/sign-in', UserController.LoginUserController);
router.post('/log-out', UserController.LogoutUserController);
router.put('/update-user/:id', UserController.UpdateUserController);
router.delete('/delete-user/:id', AuthMiddleWare, UserController.DeleteUserController);
router.get('/getAll', AuthMiddleWare, UserController.GetAllUserController);
router.get('/get-detail/:id', AuthSelfMiddleWare, UserController.GetDetailUserController);
router.post('/refresh-token', UserController.RefreshTokenUserController);

module.exports = router