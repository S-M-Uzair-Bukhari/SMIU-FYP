const functions = require('../functions/admin');
const validation = require('../functions/validation');
const send = require('../functions/sendOTP');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminSignup = async (req, res) => {
    try {
        const validate = await validation.validateAdmin(req);
        if(validate){
            return res.status(400).json({msg: 'Email is already taken!'});
        }else{
            console.log('Signing Admin...')
            let admin = await functions.adminSignUp(req);
            let refreshToken = jwt.sign({
                email: admin.email
            }, process.env.SECRET_KEY, {expiresIn: '3 days'});

            req.body.identifier = admin.email;
            await functions.updateToken(req, refreshToken);

            let token = jwt.sign({
                email: admin.email
            }, process.env.SECRET_KEY, {expiresIn: '2 hours'});
            
            const userData = {
                name: "Admin",
                email: admin.email,
                OTP: admin.OTP
            } ;
            return res.status(200).json({msg: 'Admin is Signed Up:', 
                data: userData
            });
        };
    } catch (error) {
        console.log('Admin Not Signed Up');
        console.error({ msg: 'error while signing Admin', error });
        res.status(400).json({msg: 'Having errors While Signing Up Admin:', error})   
    }
};

const adminLogin = async (req, res) => {
    try {
        const validateAdmin = await validation.validateAdmin(req);
        if(!validateAdmin){
            return res.status(400).json({msg: "Email is invalid or Admin not Found"});
        };
        console.log('Loging in Admin....');
        let admin = await functions.getAdmin(req);
        let verify = await validation.verifyPassword(req.body.password, admin.password);
        if(!verify){
            return res.status(400).json({msg: "Incorrect Password!"});
        };
        let login = await functions.loginOTP(req);
        console.log("[Generated OTP for login]:", login);
        let refreshToken = jwt.sign({
            email: admin.email
        }, process.env.SECRET_KEY, {expiresIn: '3 days'});

        req.body.identifier = admin.email;
        await functions.updateToken(req, refreshToken);

        let token = jwt.sign({
            _id: admin._id,
            email: admin.email
        }, process.env.SECRET_KEY, {expiresIn: '2 hours'});
        
        const userData = {
            name: "Admin",
            email: login.email,
            OTP: login.OTP
        };

        return res.status(200).json({msg: 'Admin is Logging In:', 
            data: userData
        });
    } catch (error) {
        console.log('Admin Not Loging In');
        console.error({ msg: 'error while Loging In Admin', error });
        res.status(400).json({msg: 'Having errors While Loging In Admin:', error})   
    }
};


const verifyOTP = async (req, res) => {
    try {
        let admin = await functions.verifyOTP(req);
        console.log("[Verified Admin:]", admin);
        if(!admin){
            return res.status(400).json({msg: "Invalid OTP or Email"});
        };
        admin.OTP = null;
        await admin.save();

        let refreshToken = jwt.sign({
            email: admin.email
        }, process.env.SECRET_KEY, {expiresIn: '3 days'});

        req.body.identifier = admin.email;
        await functions.updateToken(req, refreshToken);

        let token = jwt.sign({
            _id: admin._id,
            email: admin.email
        }, process.env.SECRET_KEY, {expiresIn: '2 hours'});

        return res.status(200).json({msg: 'Admin is Logging In:', 
            data:{
                id: admin._id,
                email: admin.email

            }, accessToken: token, refreshToken
        });

    } catch (error) {
            console.log('Admin Not Loging In');
            console.error({ msg: 'error while running OTP verification', error });
            res.status(400).json({msg: 'Having errors While verifying OTP:', error})   
    }
};

const updateAdminEmail = async (req, res) => {
    try {
        let admin = await functions.updateEmail(req);
        return res.status(200).json({msg: 'Email is Successfully Updated:', data: {
            email: admin.email
        }});
    } catch (error) {
        console.log('Admin Email is not updated');
        console.error({ msg: 'error while updating Admin Email', error });
        res.status(400).json({msg: 'Having errors while updating Admin Email:', error})  
    }
};


const updateAdminPassword = async (req, res) => {
    try {
        let admin = await functions.updatePassword(req);
        return res.status(200).json({msg: 'Password is Successfully Updated'});
    } catch (error) {
        console.log('Admin Password is not updated');
        console.error({ msg: 'error while updating Admin Password', error });
        res.status(400).json({msg: 'Having errors while updating Admin Password:', error})  
    }
};

module.exports = {
    adminSignup,
    adminLogin,
    verifyOTP,
    updateAdminEmail,
    updateAdminPassword
};