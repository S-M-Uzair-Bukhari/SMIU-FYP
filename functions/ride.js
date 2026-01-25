const rideModel = require('../models/ride');

const createRide = async (req) => {
    const ride = new rideModel(req.body);
    ride.createdTby = req.user._id;
    let result = await ride.save();
    return result;
};

const rideStatus = async (id, status) => {
    let ride = await rideModel.findByIdAndUpdate(id, { status: status }, { new: true });
    return ride;
};

const assignRideToUser = async (req) => {
     const { rideId, userId } = req.body;

     console.log('Ride ID:', rideId, 'User ID:', userId);
    let ride = await rideModel.findByIdAndUpdate(rideId, { assignedTo: userId }, { new: true });
    return ride;
};

const getRide = async (req) => {
    const {rideId} = req.query;
    let ride = await rideModel.findById(rideId);
    return ride;
};

const getAllRides = async (req) => {
    const userId = req.user._id;
    const { status } = req.query;
    const filter = {};
    if(status) filter.status = status;
    let ride = await rideModel.find(filter);
    return ride;
};

const getAllRidesAdmin = async (req) => {
    const { status } = req.query;
    const filter = {};

    if(!status) filter.status = status;
    let ride = await rideModel.find(filter);
    return ride;
};

module.exports = {
    createRide,
    rideStatus,
    assignRideToUser,
    getRide,
    getAllRides,
    getAllRidesAdmin
};
