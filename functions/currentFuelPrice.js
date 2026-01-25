const fuelPriceModel = require('../models/currentFuelPrice');

const createFuelPrice = async (req) =>{
    const newFuelPrice = new fuelPriceModel(req.body);
    let result = await newFuelPrice.save();
    return result;
};

const getFuelPrice = async (req) => {
    let getFuelPrices = await fuelPriceModel.find();
    return getFuelPrices;
};

const updateFuelPrice = async (id, updatedData) => {
    let result = await fuelPriceModel.findByIdAndUpdate(id, 
        { $set: updatedData }, 
        { new: true });
    return result;
};

const deleteFuelPrice = async (req) => {
    const id = req.body.id;
    let result = await fuelPriceModel.findByIdAndDelete(id, { new: true });
    return result;
};

module.exports = {
    createFuelPrice,
    getFuelPrice,
    updateFuelPrice,
    deleteFuelPrice
};