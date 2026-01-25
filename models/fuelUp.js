const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feulUpSchema = new Schema({
    userId:{
      type: Schema.Types.ObjectId,
      ref:'User',
      require: true  
    },
    name:{
        type: String,
        require: true  
    },
    location:{
        type: {
            type:String,
            enum:['Point'],
            require: true
        },
        coordinates:{
            type: [Number],
            require: true
        }
    },
    date:{
        type: String,
        require: true
    },
    tripDistance:{
        type: Number,
        require: true
    },
    vehicleId:{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        require: true,
    },
    fuelType:{
        type: Schema.Types.ObjectId,
        ref: 'FuelType',
        require: true,
    },
    liters:{
        type: Number,
        require: true
    },
    amount:{
        type: Number,
        require: true
    }

}, { timestamps: true });

feulUpSchema.index({ coordinates: '2dsphere'});


const fuelUpModel = mongoose.model('Fuelup', feulUpSchema);
module.exports = fuelUpModel;