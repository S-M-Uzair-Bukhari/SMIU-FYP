const fuelUpModel = require('../models/fuelUp');


const createfuelUp = async (req) => {
    const fuelUp = new fuelUpModel(req.body);
    let result = await fuelUp.save();
    return result;
};

const getfuelUps = async (req) => {
    const { userId } = req.query;
    const filter = {};
    if(userId) filter.userId = userId;
    if(vehicleId) filter.vehicleId = vehicleId;
    let fuelUp = await fuelUpModel.find(filter).populate({
        path:'vehicleId',
        select: 'vehicleMake vehicleModel vehicleIdentificaionNumber',
    }).populate({
        path: 'fuelType',
        select: '_id name fuelPrice color'
    });
    return fuelUp;
};

const getfuelUpsByUser = async (req) => {
    const { userId } = req.user._id;
    let fuelUp = await fuelUpModel.find(userId).populate({
        path:'vehicleId',
        select: 'vehicleMake vehicleModel vehicleIdentificaionNumber',
    }).populate({
        path: 'fuelType',
        select: '_id name fuelPrice color'
    });
    return fuelUp;
};

const getfuelUp = async (req) => {
    const { fuelUpId } = req.query;

    let fuelUp = await fuelUpModel.findById(fuelUpId).populate({
        path:'vehicleId',
        select: 'vehicleMake vehicleModel vehicleIdentificaionNumber',
    }).populate({
        path: 'fuelType',
        select: '_id name fuelPrice color'
    });
    return fuelUp;
};

const updateFuelUp = async (id, updatedData) =>{
    let fuelUp = await fuelUpModel.findByIdAndUpdate(
        id, 
        {$set: updatedData }, 
        {new: true});
    return fuelUp;
};

const deletefuelUp = async (req) => {
    const id = req.body.id;
    let fuelUp = await fuelUpModel.findByIdAndDelete(id, {new:true});
    return fuelUp;
};

module.exports = {
    createfuelUp,
    getfuelUp,
    getfuelUps,
    getfuelUpsByUser,
    updateFuelUp,
    deletefuelUp
};