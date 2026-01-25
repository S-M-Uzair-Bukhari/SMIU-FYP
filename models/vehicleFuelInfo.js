const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleFuelInfoSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicleId:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    statistics:{
            weekly:{
                type: String,
            },
            monthly:{
                type: String
            },
            YTD:{
                type: String
            },
            VsPrevious:{
                type: String
            }

        },
    information:{
        noOfFuelUps:{
            type: Number
        },
        amountSpent:{
            type: Number,
        },
        litersOfFuel:{
            type: Number,
        },
        kmDriven:{
            type: Number
        },
        liters100km:{
            type: String
        },
        MPG:{
            type: String
        }
    }
});


const vehicleFuelInfoModel = mongoose.model('vehicleFuelInformation', vehicleFuelInfoSchema);
module.exports = vehicleFuelInfoModel;