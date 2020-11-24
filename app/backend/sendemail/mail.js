const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

require('dotenv').config();

const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("erro");
            return cb(err, null);
        }
        console.log('noterro');
        return cb(null, data);
    });
}

module.exports = sendMail;
