const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sessionKey:{
        type: String,
    },
    OTP:{
        type: Number,
    }
});

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;
