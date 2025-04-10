const nodemailer = require('nodemailer');
const transporter = require('./configMail');
function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });
} 
module.exports = sendMail;