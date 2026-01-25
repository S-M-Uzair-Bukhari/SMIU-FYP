const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vehicleSchema = new Schema({
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    vehicleType:{
        type: String,
        required: true
    },
    vehicleYear:{
        type: Number,
        required: true
    },
    vehicleMake:{
        type: String,
        required: true
    },
    vehicleModel:{
        type: String,
        required: true
    },
    vehicleIdentificaionNumber:{
        type: String,
        required: true
    },
    fuelType:{
        type: Schema.Types.ObjectId,
        ref:'FuelType',
        required: true
    },
    fuelAvg:{
        type: Number,
        required: true
    },
    // isSelected:{
    //     type: Boolean,
    // },
    images:{
        type: String,
    },
    imagePath:{
        type: String,
    }
}, {timestamps:true});

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = vehicleModel;