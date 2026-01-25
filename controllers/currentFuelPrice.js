const functions = require('../functions/currentFuelPrice');

const createFuelPrice = async (req, res) => {
    try {
        let createPrice = await functions.createFuelPrice(req);
        return res.status(200).json({msg: 'Fuel Prices are Created:', data: createPrice});
    } catch (error) {
        console.log('Fuel Prices are not Created successfully:');
        console.error('Having these errors:', error);
        return res.status(400).json({msg: 'Fuel Prices are not Created:', error});
    }
};

const getFuelPrice = async (req, res) => {
    try {
        let getPrice = await functions.getFuelPrice(req);
        return res.status(200).json({msg: "All Fuel Details are Down Below:", data: getPrice});
    } catch (error) {
        console.log('Can not get Fuel Prices successfully:');
        console.error('Having these errors:', error);
        return res.status(400).json({msg: 'Can not get Fuel Prices successfully:', error});
    }
};

const updateFuelPrice = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        let result = await functions.updateFuelPrice(id, updatedData);
        return res.status(200).json({msg: 'Details Are Successfully Updated:', data: result});
    } catch (error) {
        console.log('Fuel Prices are successfully updated:');
        console.error('Having these errors:', error);
        return res.status(400).json({msg: 'Can not update Fuel Prices successfully:', error});
    }
};

const deleteFuelPrice = async (req, res) => {
    try {
        let result = await functions.deleteFuelPrice(req);
        return res.status(200).json({msg: 'Fuel Prices are successfully Deleted:'});
    } catch (error) {
        console.log('Fuel Prices are not successfully Deleted:');
        console.error('Having these errors:', error);
        return res.status(400).json({msg: 'Can not Delete Fuel Prices successfully:', error});
    }
};

module.exports = {
    createFuelPrice,
    getFuelPrice,
    updateFuelPrice,
    deleteFuelPrice
};