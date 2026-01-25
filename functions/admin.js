const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');

const adminSignUp = async (req, sessionKey) => {
    const newAdmin = new adminModel(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    newAdmin.password = hash;
    newAdmin.sessionKey = sessionKey;
    const otp = Math.floor(1000 +
        Math.random()*9000).toString();
    newAdmin.OTP = otp;    
    let admin = await newAdmin.save();
    return admin;
};

const updateToken = async (req, refreshToken) => {
    let admin = await adminModel.findOneAndUpdate({email: req.body.email}, {$set: {sessionKey: refreshToken} })
    return admin;
};

const verifyOTP = async (req) => {
    const { email, otp } = req.body;
    // console.log(email, otp);
    let admin = await adminModel.findOne({email: email, OTP:otp});
    return admin;
};

const loginOTP = async (req) =>{
    let admin = await adminModel.findOne({email: req.body.email});
    const otp = Math.floor(1000 +
        Math.random()* 9000).toString();
        admin.OTP = otp; 
    let result = await admin.save();
    return result;
};

const getAdmin = async (req) => {
    let admin = await adminModel.findOne({email: req.body.email});
    return admin; 
};

const updateEmail = async (req) => {
    const id = req.body.id;
    let admin = await adminModel.findByIdAndUpdate(id, {$set: {email: req.body.email} }, {new:true});
    return admin;
};

const updatePassword = async (req) => {
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    let admin = await adminModel.findOneAndUpdate(email, { $set:{password: hash} });
    return admin;
};


module.exports = {
    adminSignUp,
    updateToken,
    verifyOTP,
    loginOTP,
    getAdmin,
    updateEmail,
    updatePassword
};
