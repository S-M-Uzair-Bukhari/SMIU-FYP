const functions = require('../functions/user');
const validation = require('../functions/validation');
const jwt = require('jsonwebtoken');
// const sendOTP = require('../functions/sendOTP');
require('dotenv').config();
const initialize = require('../functions/sendOTP')


const signUp = async (req, res) => {
    try {
        const validate = await validation.validateEmail(req, res);
        if (validate) {
            return res.status(400).json({ msg: 'Email is Taken' });
        } else {
            console.log('Signing Up user');
            console.log('Phone:', req.body.phNumber);
            let user = await functions.signUp(req);
            let refreshToken = jwt.sign({
                name: user.firstName + user.lastName,
                email: user.email
            }, process.env.SECRET_KEY, { expiresIn: '3 days' });

            req.body.identifier = user.email;
            await functions.updateToken(req, refreshToken);
            let token = jwt.sign({
                _id: user._id,
                name: user.firstName + user.lastName,
                email: user.email
            }, process.env.SECRET_KEY, { expiresIn: '2 days' });

            return res.status(200).json({
                msg: "user is Successfully Registered",
                data: {
                    _id: user._id,
                    email: user.email
                }

            });
        }
    } catch (error) {
        console.log('User Not Signed Up');
        console.error({ msg: 'error while signing user', error });
        res.status(400).json({ msg: 'Having errors While Signing Up:', error })
    }
};

const login = async (req, res) => {
    try {
        let validateUser = await validation.validateEmail(req);
        if (!validateUser) {
            return res.status(400).json({ msg: 'Email is invalid User do Not Exist' });
        };
        console.log('Logging User In');
        let user = await functions.getUser(req);
        const verify = await validation.verifyPassword(req.body.password, user.password);
        if (!verify) {
            return res.status(403).json({ msg: 'Please provide correct Password' });
        }
        let refreshToken = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '3 days' });

        req.body.identifier = user.email;
        await functions.updateToken(req, refreshToken);
        let token = jwt.sign({
            _id: user._id,
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '2 days' });
        return res.status(200).json({
            msg: "user is Successfully Loggedin",
            data: {
                id: user._id,
                email: user.email,
                name: user.firstName + user.lastName,
                imagePath: user.image ? user.image : null
            }, acessToken: token, refreshToken

        });
    } catch (error) {
        console.log('User Not Signed Up');
        console.error({ msg: 'error while signing user', error });
        res.status(400).json({ msg: 'Having errors While Logging In:', error })
    }
};

const getProfile = async (req, res) => {
    try {
        console.log("Controller/userId:", req.query.id);
        let user = await functions.getProfile(req);
        console.log("controler/ User:", user);
        return res.status(200).json({
            msg: "User's Profile:", data: {
                id: user._id,
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email,
                phone: user.phNumber,
                subscription: user.subscription,
                ImagePath: user.imagePath
            }
        });
    } catch (error) {
        console.log('Can not get User Profile');
        console.error({ msg: 'error while getting User Profile', error });
        res.status(400).json({ msg: 'Having errors While getting User Profile:', error })
    }
};

const forgetPassword = async (req, res) => {
    try {
        console.log(req.body.email);
        email = req.body.email;
        const validate = await validation.validateEmail(req);
        if (validate) {
            let user = await functions.otpPassword(req);
            const { OTP } = user;

            const userData = { email, OTP }; 

            return res.status(200).json({ msg: "OTP is Sent. Check Your Email" });

        } else {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
    } catch (error) {
        console.log('Password is Not updated');
        console.error({ msg: 'error while calling the Forget Password', error });
        res.status(400).json({ msg: 'Having errors:', error })
    }
};

const updatePassword = async (req, res) => {
    try {
        let user = await functions.updatePassword(req);
        let refreshToken = jwt.sign({
            // name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '3 days' });

        req.body.identifier = user.email;
        await functions.updateToken(req, refreshToken);
        let token = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '2 days' });
        return res.status(200).json({
            msg: "user is Successfully Loggedin",
            data: {
                id: user._id,
                name: user.firstName + user.lastName,
                email: user.email,
            }, acessToken: token, refreshToken

        });
    } catch (error) {
        console.log('Users Password is not updated');
        console.error({ msg: 'error while updating password', error });
        res.status(400).json({ msg: 'Having errors While Updating Password:', error })
    }
};

const updateImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'Please Upload an Image' });
        }
        
        const user = await functions.updateImage(req);
        return res.status(200).json({
            msg: "Image is Successfully Uploaded:",
            data: {
                _id: user._id,
                name: user.firstName +" "+user.lastName,
                email: user.email,
                imagePath: user.image
            }
        });
    } catch (error) {
        console.log('Users Image is not updated');
        console.error({ msg: 'error while updating Image', error });
        res.status(400).json({ msg: 'Having errors While Updating Image:', error })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.user._id;
        const updatedData = req.body;
        console.log('[IMAGE]', req.file)
        if(req.file){
            updatedData.image = req.file.url;
        }
        let user = await functions.updateUser(id, updatedData);
        return res.status(200).json({
            msg: 'User Profile is Successfully Updated:', data: {
                _id: user._id,
                name: user.firstName + user.lastName,
                email: user.email,
                phNumber: user.phNumber,
                imagePath: user.image
            }
        });
    } catch (error) {
        console.log('Users Profile is not updated');
        console.error({ msg: 'error while updating User Profile', error });
        res.status(400).json({ msg: 'Having errors While Updating User Profile:', error })
    }
};

const AllUsers = async (req, res) => {
    try {
        const users = await functions.getAllUsers(req);
        return res.status(200).json({msg: "All User's Data:", data: users});
    } catch (error) {
        console.log('Can Not get All Users');
        console.error({ msg: "error while Getting All User's", error });
        res.status(400).json({ msg: "Having errors While Getting All User's:", error })
    }
};

module.exports = {
    signUp,
    login,
    getProfile,
    updateImage,
    forgetPassword,
    updatePassword,
    updateUser,
    AllUsers,
};