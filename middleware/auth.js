const jwt = require('jsonwebtoken');
const cloudinaryModule = require("cloudinary");
const cloudinary = cloudinaryModule.v2;
const CloudinaryStorage = require("multer-storage-cloudinary");
const multer = require('multer');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// const userStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now()+ "-" + file.originalname);
//     }
// });

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinaryModule,
  params: {
    folder: "backend/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1024, height: 1024, crop: "limit" }],
  },
});

const upload = multer({storage: userStorage});

const verifyUser = ( req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify( bearerToken, process.env.SECRET_KEY, async(err, authData) => {
            if(err){
                return res.status(400).json({msg: 'Invalid Token'});
            } else {
                req.user = authData;
                next();
            }
        })
    } else {
        return res.status(500).json({msg: "Token Not Found"});
    }
};


const verifyAdmin = ( req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify( bearerToken, process.env.SECRET_KEY, async(err, authData) => {
            if (err) {
                return res.status(400).json({msg: 'Invalid Token'});
            } else {
                req.user = authData;
                next();
            }
        })  
    } else {
        return res.status(500).json({msg: "Token Not Found"});

    }
};


module.exports = { 
    upload,
    verifyUser,
    verifyAdmin
};