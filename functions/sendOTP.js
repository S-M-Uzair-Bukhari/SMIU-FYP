const { text } = require('body-parser');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path');
const fs = require("fs");
const { promisify } = require('util');
const load = require('../functions/loadTemplate');
require('dotenv').config();

const readFile = promisify(fs.readFile);

let emailHandlebars;

const loadHandlebars = async () => {
    try {
        const module = await import('nodemailer-express-handlebars');
        emailHandlebars = module.default;
    } catch (err) {
        console.error('Failed to load nodemailer-express-handlebars:', err);
        throw err;
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.appEmail,
        pass: process.env.appPassword
    }
});

const sendOTP = async (userData) => {
    try {
        let mailOptions = {
            from: process.env,
            to: userData.email,
            subject: "Your OTP Code",
            // text: `Your OTP CODE is ${userData.otp}`
            html: `<h2> Your OTP Code: <strong>${userData.OTP}</strong></h2>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email Sent :", info.response);
        return true
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    };
};

const subscriptionEmail = async (userData) => {
    await load.SubscriptionTemplate();

    console.log("Subscription userData:", userData);

    if (!handlebars) {
        console.error('Handlebars is not loaded.');
        return;
    };

    const source = await readFile('./views/layouts/main.hbs', 'utf-8');
    const template = handlebars.compile(source);

    const htmlToSend = template({
        username: userData.name
    });


    const mailOptionsUser = {
        from: process.env.appEmail,
        to: userData.email,
        subject: "Subscription Succefully",
        template:'Subscription',
        html: htmlToSend,
        attachments:[
            {
              filename: 'facebook.png',
              path: path.resolve(__dirname,'..', 'images', 'facebook.png'),
              cid: 'facebook@yourapp.com'
          },
          {
            filename: 'instagram.png',
            path: path.resolve(__dirname,'..', 'images', 'instagram.png'),
            cid: 'instagram@yourapp.com'
        },
        {
            filename: 'twitter.png',
            path: path.resolve(__dirname,'..', 'images', 'twitter.png'),
            cid: 'twitter@yourapp.com'
        },
        ]

    };

        transporter.sendMail(mailOptionsUser, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('Email is Sent: '+ info.response);
    });
};

const cancelsubscription = async (userData) => {
    await load.cancelSubscriptionTemplate();
    console.log("Cancel User's Data:", userData);

    if (!handlebars) {
        console.error('Handlebars is not loaded.');
        return;
    };

    const source = await readFile('./views/layouts/main.hbs', 'utf-8');
    const template = handlebars.compile(source);

    const htmlToSend = template({
        username: userData.name
    });

    const mailOptionsUser = {
        from: process.env.appEmail,
        to: userData.email,
        subject: "Subscription Cancelled",
        template:'Cancel',
        html: htmlToSend,
        attachments:[
            {
              filename: 'facebook.png',
              path: path.resolve(__dirname,'..', 'images', 'facebook.png'),
              cid: 'facebook@yourapp.com'
          },
          {
            filename: 'instagram.png',
            path: path.resolve(__dirname,'..', 'images', 'instagram.png'),
            cid: 'instagram@yourapp.com'
        },
        {
            filename: 'twitter.png',
            path: path.resolve(__dirname,'..', 'images', 'twitter.png'),
            cid: 'twitter@yourapp.com'
        },
        ]

    };

    transporter.sendMail(mailOptionsUser, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('OTP Sent: '+ info.response);
    });
};

const renewSubscription = async (userData) => {
    await load.renewSubscriptionTemplate();
    console.log("Renew User's Data:", userData);

    if (!handlebars) {
        console.error('Handlebars is not loaded.');
        return;
    };

    const source = await readFile('./views/layouts/main.hbs', 'utf-8');
    const template = handlebars.compile(source);

    const htmlToSend = template({
        username: userData.name
    });

    const mailOptionsUser = {
        from: process.env.appEmail,
        to: userData.email,
        subject: "Subscription Renewd",
        template:'Renew',
        html: htmlToSend,
        attachments:[
            {
              filename: 'facebook.png',
              path: path.resolve(__dirname,'..', 'images', 'facebook.png'),
              cid: 'facebook@yourapp.com'
          },
          {
            filename: 'instagram.png',
            path: path.resolve(__dirname,'..', 'images', 'instagram.png'),
            cid: 'instagram@yourapp.com'
        },
        {
            filename: 'twitter.png',
            path: path.resolve(__dirname,'..', 'images', 'twitter.png'),
            cid: 'twitter@yourapp.com'
        },
        ]

    };

    transporter.sendMail(mailOptionsUser, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('OTP Sent: '+ info.response);
    });
};

const failedPaymentEmail = async (userData) => {
    await load.failedPaymentTemplate();
    console.log("Renew User's Data:", userData);

    if (!handlebars) {
        console.error('Handlebars is not loaded.');
        return;
    };

    const source = await readFile('./views/layouts/main.hbs', 'utf-8');
    const template = handlebars.compile(source);

    const htmlToSend = template({
        username: userData.name
    });

    const mailOptionsUser = {
        from: process.env.appEmail,
        to: userData.email,
        subject: "Subscription Payment Failed",
        template:'Failed',
        html: htmlToSend,
        attachments:[
            {
              filename: 'facebook.png',
              path: path.resolve(__dirname,'..', 'images', 'facebook.png'),
              cid: 'facebook@yourapp.com'
          },
          {
            filename: 'instagram.png',
            path: path.resolve(__dirname,'..', 'images', 'instagram.png'),
            cid: 'instagram@yourapp.com'
        },
        {
            filename: 'twitter.png',
            path: path.resolve(__dirname,'..', 'images', 'twitter.png'),
            cid: 'twitter@yourapp.com'
        },
        ]

    };

    transporter.sendMail(mailOptionsUser, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('OTP Sent: '+ info.response);
    });
};

const initializeOTP = async () => {
    await loadHandlebars();
    return sendOTP; 
};

const initializeSubscription = async () => {
    await loadHandlebars();
    return subscriptionEmail; 
};

const initializeCancel = async () => {
    await loadHandlebars();
    return cancelsubscription; 
};

const initializeRenew = async () => {
    await loadHandlebars();
    return renewSubscription; 
};

const initializeFailed = async () => {
    await loadHandlebars();
    return failedPaymentEmail; 
};


module.exports = {
    initializeOTP,
    initializeSubscription,
    initializeCancel,
    initializeRenew,
    initializeFailed
};
