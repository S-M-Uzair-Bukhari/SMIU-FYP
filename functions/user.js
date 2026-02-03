const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const signUp = async (req, sessionKey) => {
    console.log("[User Function Signup]:", req.user._id);
    const newUser = new userModel(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    newUser.createdBy = req.user._id;
    newUser.password = hash;
    newUser.sessionKey = sessionKey;
    let result = await newUser.save();
    return result;
};

const updateToken = async (req, refreshToken) => {
    let user = await userModel.findOneAndUpdate({email: req.body.email}, {$set: {sessionKey: refreshToken} });
    return user;
};

const verifyOTP = async (req) =>{
    const { email, otp} = req.body;
    console.log(email,otp);
    let user = await userModel.findOne({email:email, OTP:otp});
    return user;
};

const OTPStatus = async (email) => {
    let user = await userModel.findOneAndUpdate({email: email}, {$set: {OTPVerified: true}});
    return user;
};

const setOTPtoNull = async(email) => {
    const user = await userModel.findOne({email: email});    
    
    if(user){
        const cutOffTime = new Date(Date.now() - 1 * 60 * 1000);
        if(!user.OTPVerified && user.createdAt < cutOffTime){
            user.OTP = null;
            await user.save();
        };
    };
    return user;
};

setInterval(setOTPtoNull, 20 * 1000);


const sendOTPAgain = async (req) => {
    const email = req.body.email;
    let user = await userModel.findOne({email: email});
    const otp = Math.floor(1000 +
        Math.random()* 9000).toString();
        user.OTP = otp; 
    let result = await user.save();
    return result;
};

const getUser = async (req) => {
    let user = await userModel.findOne({email: req.body.email});
    return user;
};

const getProfile = async (req) => {
    let result = await userModel.findById(req.query.id);
    console.log("Function/ User:", result);
    return result;  
};

const otpPassword = async (req) =>{
    let user = await userModel.findOne({email: req.body.email});
    const otp = Math.floor(1000 +
        Math.random()* 9000).toString();
        user.OTP = otp; 
    let result = await user.save();
    return result;
};

const forgetPassword = async (otp ,currerntPassword) => {

    let newPassword = await userModel.findOneAndUpdate({OTP: otp}, {$set: {password: currerntPassword}} );
    return newPassword;
    
};

const updateImage = async (req) => {
    const userId = req.user._id;
    let user = await userModel.findByIdAndUpdate(userId, 
        { $set: {
            image: req.file.filename
        }},
        { new: true });
        return user;
};

const updatePassword = async (req) => {
    const userEmail = req.body.email;
    const newPassword = req.body.password;
    const hash = await bcrypt.hash(newPassword, 10);
    let updatedPassword = await userModel.findOneAndUpdate({email: userEmail}, {$set:{password: hash}}, {new: true} );
    return updatedPassword;
}; 

const updateUser = async (id, updatedData) => {
    let user = await userModel.findByIdAndUpdate(id, 
        { $set: updatedData },
        { new: true});
    return user;
};

const deleteUnverfiedUsers = async () => {
    const cutOffTime = new Date(Date.now() - 5 * 60 * 1000);
    await userModel.deleteMany({OTPVerified: false, createdAt: { $lt: cutOffTime}});
};

setInterval(deleteUnverfiedUsers, 1 * 60 * 1000);

const getAllUsers = async (req) => {
    const {userId} = req.query;

    const filter = {};
    if(userId) filter.userId = userId;
    const allUsers = await userModel.find(filter).select('-password -sessionKey -__v');
    return allUsers;
};

module.exports = {
    signUp,
    updateToken,
    verifyOTP,
    OTPStatus,
    otpPassword,
    forgetPassword,
    updatePassword,
    getUser,
    updateImage,
    getProfile,
    updateUser,
    getAllUsers,
    sendOTPAgain
};