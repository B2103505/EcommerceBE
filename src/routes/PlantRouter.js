const express = require("express");
const router = express.Router();
const PlantController = require('../controllers/PlantController');

const { AuthMiddleWare, AuthSelfMiddleWare } = require("../MiddleWare/AuthMiddleWare");

router.post('/create', PlantController.createPlantController);
router.put('/update/:id', AuthMiddleWare, PlantController.UpdatePlantController);
router.get('/detail/:id', PlantController.DetailPlantController);
router.delete('/delete/:id', AuthMiddleWare, PlantController.DeletePlantController);
router.get('/getAllPlant', PlantController.GetAllPlantController);

module.exports = router