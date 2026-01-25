const vehicleFuelInfoFunction = require('../functions/vehicleFuelInfo');

const vehicleInfoController = async (req, res) => {
    try {
        // console.log("Vehicle Id Controller:",req.body);
        const result = await vehicleFuelInfoFunction.vehicleInfo(req);
        return res.status(200).json({msg: "Vehicle Info: ", data: result});
    } catch (error) {
        console.log('Can not get Vehicle Info:');
        console.error('Having these errors:', error);
        return res.status(400).json({msg: 'Can not Get Vehicle Info', error});
    }
};

module.exports = {
    vehicleInfoController
};