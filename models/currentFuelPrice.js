const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const currentFuelPriceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    fuelPrice:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true
    }
}, { timestamps: true});


const fuelPriceModel = mongoose.model('FuelType', currentFuelPriceSchema);
module.exports = fuelPriceModel;

