const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    phNumber:{
        type: Number,
        require: true
    },
    image:{
        type: String
    },
    imagePath:{
        type: String
    },
    sessionKey:{
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;