const jwt = require('jsonwebtoken');
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const path = require('path');
require('dotenv').config();

const s3 = new S3Client({
    region: process.env.s3_Region,
    credentials:{
        secretAccessKey: process.env.s3_Secret_Key,
        accessKeyId: process.env.s3_Access_Key
    }
});

const storage = multerS3({
    s3: s3,
    bucket: process.env.s3_Bucket_Name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  });

  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);
    

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only (jpeg, jpg, png, gif, mp4, mov, png)!');
    }
  }

// const upload = multer({ 
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//       },
// });

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/user");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname);
    }
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