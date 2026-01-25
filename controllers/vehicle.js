const functions = require('../functions/vehicle');

const newVehicle = async (req, res) => {
    try {
        const userId = req.body.createdBy;
        // console.log("Id", userId);
        let vehicle = await functions.vehicle(req);

        // console.log('This is Updated User With Vehicle Profiles',user);
        return res.status(200).json({
            msg: "Vehicle Profile is successfuly Created", 
            data: vehicle
        });

    } catch (error) {
        console.log('Having errors while creating Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Creating Vehicle Profile:', error})    
    }
};


const assignVehicleToDriver = async ( req, res ) => {
    try {
        const userId = req.body.userId;
        const vehicleId = req.body.vehicleId;

        const selectedVehicle = await functions.assignVehicle(req);
        return res.status(200).json({
            msg: "Vehicle is successfuly Selected", 
            data: selectedVehicle
        });

        // res.send('SuccessFull!');
    } catch (error) {
        console.log('Having errors while Selecting Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Selecting Vehicle Profile:', error})    
    }
};

const updateImage = async (req, res) => {
    try {
        const { path, fieldname }= req.file;
        // console.log('file path by and fieldName Cloudnary:', path, fieldname);
        if(!req.file){
            return res.status(400).json({ msg: "Please Upload a Valid Image"});
        }
        let updateImage = await functions.updateImage(req);
        let vehicle = await functions.vehicleProfile(req);
        return res.status(200).json({ msg: 'Vehicle Image is Successfully updated', data:vehicle});      
    } catch (error) {
        console.log('Having errors while updating Vehicle Image');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While updating Vehicle Image:', error})  
    }
};

const getVehicles = async (req, res) =>{
    try {
        let vehicleProfile = await functions.getVehicles(req);
        return res.status(200).json({msg: "Your Vehicle Details: ", data: vehicleProfile});
    } catch (error) {
        console.log('Having errors while getting Vehicle');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting Vehicles:', error})    
    }
};

const getvehicleProfile = async (req, res) => {
    try {
        let vehicleProfile = await functions.vehicleProfile(req);
        return res.status(200).json({msg: "Vehilce Profile", data: vehicleProfile});
    } catch (error) {
        console.log('Having errors while getting Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting Vehicle Profile:', error})    
    }
};

const updateVehicle = async (req, res) =>{
    try {
        const id = req.body.id;
        const updatedData = req.body;
        console.log('Vehicle Id', id);
        console.log('Updated Data: ', updatedData);
        let update = await functions.updateVehicle(id, updatedData);
        return res.status(200).json({msg: "Data is Successfuly Updated: ", data: update});
    } catch (error) {
        console.log('Having errors while updating Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Updating Vehicle details:', error})    
    }
};


const deleteVehicle = async (req, res) =>{
    try {
        // console.log("Id:", req.body);
        let vehicle = await functions.deleteVehicle(req);
        return res.status(200).json({msg: 'Vehicle is Successfully Deleted'});
    } catch (error) {
        console.log('Having errors while Deleting Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Deleting Vehicle details:', error}) 
    }
};

const allVehicles = async (req, res) => {
    try {
        const getAllVehicles = await functions.getAllVehicles(req);
        return res.status(200).json({msg: "All Registered vehicles:", data: getAllVehicles});
    } catch (error) {
        console.log('Having errors while Getting All Registered vehicles');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting All Registered vehicles:', error})
    }
}

module.exports = { 
    newVehicle,
    assignVehicleToDriver,
    getVehicles,
    getvehicleProfile,
    updateImage,
    updateVehicle,
    deleteVehicle,
    allVehicles
};