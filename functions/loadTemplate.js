const handlebars = require('handlebars');
const fs = require("fs");
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const OTPTemplate = async () => {
    try {
        const otpPartialSource = await readFile('./views/templates/OTP.hbs', 'utf-8');
        const bodyH1Partial = otpPartialSource.match(/{{#\*inline "bodyH1"}}([\s\S]*?){{\/inline}}/)[1].trim();
        const bodyPPartial = otpPartialSource.match(/{{#\*inline "bodyP"}}([\s\S]*?){{\/inline}}/)[1].trim();

        // Register partials
        handlebars.registerPartial('bodyH1', bodyH1Partial);
        handlebars.registerPartial('bodyP', bodyPPartial);


    } catch (error) {
        console.error('Failed to load OTP.hbs partials:', error);
        throw error;
    }
};

const SubscriptionTemplate = async () => {
    try {
        const otpPartialSource = await readFile('./views/templates/Subscription.hbs', 'utf-8');
        const bodyH1Partial = otpPartialSource.match(/{{#\*inline "bodyH1"}}([\s\S]*?){{\/inline}}/)[1].trim();
        const bodyPPartial = otpPartialSource.match(/{{#\*inline "bodyP"}}([\s\S]*?){{\/inline}}/)[1].trim();

        // Register partials
        handlebars.registerPartial('bodyH1', bodyH1Partial);
        handlebars.registerPartial('bodyP', bodyPPartial);


    } catch (error) {
        console.error('Failed to load Subscription.hbs partials:', error);
        throw error;
    }
};

const cancelSubscriptionTemplate = async () => {
    try {
        const otpPartialSource = await readFile('./views/templates/Cancel.hbs', 'utf-8');
        const bodyH1Partial = otpPartialSource.match(/{{#\*inline "bodyH1"}}([\s\S]*?){{\/inline}}/)[1].trim();
        const bodyPPartial = otpPartialSource.match(/{{#\*inline "bodyP"}}([\s\S]*?){{\/inline}}/)[1].trim();

        // Register partials
        handlebars.registerPartial('bodyH1', bodyH1Partial);
        handlebars.registerPartial('bodyP', bodyPPartial);


    } catch (error) {
        console.error('Failed to load Cancel.hbs partials:', error);
        throw error;
    }
};

const renewSubscriptionTemplate = async () => {
    try {
        const otpPartialSource = await readFile('./views/templates/Renew.hbs', 'utf-8');
        const bodyH1Partial = otpPartialSource.match(/{{#\*inline "bodyH1"}}([\s\S]*?){{\/inline}}/)[1].trim();
        const bodyPPartial = otpPartialSource.match(/{{#\*inline "bodyP"}}([\s\S]*?){{\/inline}}/)[1].trim();

        // Register partials
        handlebars.registerPartial('bodyH1', bodyH1Partial);
        handlebars.registerPartial('bodyP', bodyPPartial);


    } catch (error) {
        console.error('Failed to load Cancel.hbs partials:', error);
        throw error;
    }
};

const failedPaymentTemplate = async () => {
    try {
        const otpPartialSource = await readFile('./views/templates/Failed.hbs', 'utf-8');
        const bodyH1Partial = otpPartialSource.match(/{{#\*inline "bodyH1"}}([\s\S]*?){{\/inline}}/)[1].trim();
        const bodyPPartial = otpPartialSource.match(/{{#\*inline "bodyP"}}([\s\S]*?){{\/inline}}/)[1].trim();

        // Register partials
        handlebars.registerPartial('bodyH1', bodyH1Partial);
        handlebars.registerPartial('bodyP', bodyPPartial);


    } catch (error) {
        console.error('Failed to load Cancel.hbs partials:', error);
        throw error;
    }
};

module.exports = {
    OTPTemplate,
    SubscriptionTemplate,
    cancelSubscriptionTemplate,
    renewSubscriptionTemplate,
    failedPaymentTemplate
};