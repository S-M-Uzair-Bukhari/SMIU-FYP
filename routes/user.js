const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');
const fuelUpControllers = require('../controllers/fuelUp');
const userFeedbackControllers = require('../controllers/feedback');
const currentFuelPriceControllers = require('../controllers/currentFuelPrice');
const rideControllers = require('../controllers/ride');
const vehicleControllers = require('../controllers/vehicle');
const vehicleFuelInfo = require("../controllers/vehicleFuelInfo");
const middleware = require('../middleware/auth');

// User Routes
router.post('/login', controllers.login);
router.get('/userProfile', middleware.verifyUser, controllers.getProfile);
router.post('/updateImage', middleware.verifyUser, middleware.upload.single('image'), controllers.updateImage);
router.post('/updateUser', middleware.verifyUser, middleware.upload.single('image'),controllers.updateUser);
router.post('/forgetPassword', controllers.forgetPassword);
router.post('/updatePassword', controllers.updatePassword);

// Vehicle Routes
router.get('/getVehicles', middleware.verifyUser, vehicleControllers.getVehicles);
router.get('/getVehicleProfile', middleware.verifyUser, vehicleControllers.getvehicleProfile);
router.get('/vehicleInfo', middleware.verifyUser, vehicleFuelInfo.vehicleInfoController);

// Ride Routes
router.post('/rideStatus', middleware.verifyUser, rideControllers.rideStatus);
router.get('/getRide', middleware.verifyUser, rideControllers.getRide);
router.get('/getAllRides', middleware.verifyUser, rideControllers.getAllRides); 

// Fuel Up Routes
router.get('/getAllFuelUps', middleware.verifyUser, fuelUpControllers.getAllFuelUpsByUser);
router.get('/getFuelUp', middleware.verifyUser, fuelUpControllers.getFuelUp);
router.post('/createFuelUp', middleware.verifyUser, fuelUpControllers.createFuelUp);
router.post('/updateFuelUp', middleware.verifyUser, fuelUpControllers.updateFuelUp);

// CUrrent Fuel Price Routes
router.get('/getFuelPrices', middleware.verifyUser, currentFuelPriceControllers.getFuelPrice);

// Feedback route
router.post('/addFeedback', middleware.verifyUser, userFeedbackControllers.addFeedback);

module.exports = router;

