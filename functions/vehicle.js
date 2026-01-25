const vehicleModel = require('../models/vehicleProfile');
const userModel = require('../models/user');


const vehicle = async (req) =>{ 
    const newVehicle = new vehicleModel(req.body);
    newVehicle.createdBy = req.user._id;
    let result = await newVehicle.save();
    return result
};

const assignVehicle = async (req) => {
    const {vehicleId, userId} = req.body;

    const selecedtVehicle = await vehicleModel.findByIdAndUpdate(
        { _id: vehicleId },
        { $set: { assignedTo: userId }},
        { new: true }
    );
    return selecedtVehicle;

};

const updateImage = async (req) => {
    let vehicle = await vehicleModel.findByIdAndUpdate({_id: req.body.id},
        { $set: {
            images: req.file.fieldname,
            imagePath: req.file.path,
        }},
    { new: true });
    return vehicle;
};

const getVehicles = async (req) => {
    const userId = req.user._id;
    let vehicle = await vehicleModel.find({assignedTo: userId}) 
    return vehicle;
};

const vehicleProfile = async (req) => {  
    let vehicle = await vehicleModel.findById({ _id: req.query.vehicleId},
        {}).populate({
            path:'fuelType',
            select: 'name fuelPrice color'
        });
    return vehicle;
};

const updateVehicle = async (id, updatedData) => {
    let vehicle = await vehicleModel.findByIdAndUpdate({_id: id},{$set: updatedData},{new:true})
    return vehicle;
};

const deleteVehicle = async (req) => {
    const {vehicleId} = req.body;
    let vehicle = await vehicleModel.findByIdAndDelete(vehicleId);

    return vehicle;
};

const getAllVehicles = async (req) => {
    const allVehicles = await vehicleModel.find();
    return allVehicles
};

module.exports = {
    vehicle,
    assignVehicle,
    updateImage,
    // updateIdinUser,
    // profileCheck,
    getVehicles,
    vehicleProfile,
    updateVehicle,
    deleteVehicle,
    getAllVehicles
};