const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        require: true
    },
    name:{
        type: String,
        require: true,
    },
    feedback:{
        type: String,
        require: true,
    }
},{ timestamps: true });

const feedbackModel = mongoose.model('Feedback', feedbackSchema);
module.exports = feedbackModel;