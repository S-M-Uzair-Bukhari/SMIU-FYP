const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
const userControllers = require('../controllers/user');
const vehicleControllers = require('../controllers/vehicle');
const rideControllers = require('../controllers/ride');
const vehicleFuelInfo = require("../controllers/vehicleFuelInfo");
const currentFuelPriceCntrollers = require('../controllers/currentFuelPrice');
const fuelUpControllers = require('../controllers/fuelUp');
const middleware = require('../middleware/auth');


// Admin Routes
router.post('/adminSignup', adminControllers.adminSignup);
router.post('/adminLogin', adminControllers.adminLogin);
router.post('/verifyOTP', adminControllers.verifyOTP);
router.post('/updateEmail', middleware.verifyAdmin, adminControllers.updateAdminEmail);
router.post('/updatePassword', middleware.verifyAdmin, adminControllers.updateAdminPassword);

// User Routes;
router.post('/user/signup', middleware.verifyAdmin, userControllers.signUp); 
router.get('/user/getAllUsers', middleware.verifyAdmin, userControllers.AllUsers);

// Vehicle Routes
router.post('/vehicle/createVehicle', middleware.verifyAdmin, vehicleControllers.newVehicle);
router.post('/vehicle/assignVehicle', middleware.verifyAdmin, vehicleControllers.assignVehicleToDriver);
router.post('/vehicle/updateImage', middleware.verifyAdmin, middleware.upload.single('images'), vehicleControllers.updateImage);
router.post('/vehicle/updateVehicle', middleware.verifyAdmin, vehicleControllers.updateVehicle);
router.post('/vehicle/deleteVehicle', middleware.verifyAdmin, vehicleControllers.deleteVehicle);
router.get('/vehicle/allVehicles', middleware.verifyAdmin, vehicleControllers.allVehicles);
router.get('/vehicle/getVehicleProfile', middleware.verifyAdmin, vehicleControllers.getvehicleProfile);
router.get('/vehicle/vehicleInfo', middleware.verifyAdmin,vehicleFuelInfo.vehicleInfoController);

// Ride Routes
router.post('/ride/createRide', middleware.verifyUser, rideControllers.createRide);
router.post('/ride/assignRide', middleware.verifyUser, rideControllers.assignRide);
router.post('/ride/rideStatus', middleware.verifyUser, rideControllers.rideStatus);
router.get('/ride/getRide', middleware.verifyUser, rideControllers.getRide);
router.get('/ride/getAllRides', middleware.verifyUser, rideControllers.getAllRidesAdminController);

// Fuel Prices Routes
router.post('/fuelPrice/createFuelPrice', middleware.verifyAdmin, currentFuelPriceCntrollers.createFuelPrice);
router.get('/fuelPrice/getFuelPrices', middleware.verifyAdmin, currentFuelPriceCntrollers.getFuelPrice);
router.post('/fuelPrice/updateFuelPrice', middleware.verifyAdmin, currentFuelPriceCntrollers.updateFuelPrice);
router.post('/fuelPrice/deleteFuelPrice', middleware.verifyAdmin, currentFuelPriceCntrollers.deleteFuelPrice);

// FuelUp Routes
router.get('/getFuelUp', middleware.verifyAdmin, fuelUpControllers.getFuelUp);
router.get('/getAllFuelUps', middleware.verifyAdmin, fuelUpControllers.getAllFuelUps);

module.exports = router;