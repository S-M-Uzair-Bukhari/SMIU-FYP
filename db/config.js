const mongoose = require('mongoose');
require('dotenv').config();

// console.log('mongo URL',process.env.MONGO_URI)
const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);            
        console.log('MongoDb is Successfully Connected!');
        
    } catch (error) {
        console.log('MongoDb is Not Connected!');
    }
};


module.exports = connectDB;