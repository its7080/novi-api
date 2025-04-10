const nodemailer = require("nodemailer");
const transporter = require("./configMail");

function thanksForSignUpMail(to, sub, htmlcontent) {
    return transporter.sendMail({  
        to: to,
        subject: sub,
        html: htmlcontent
    });
}         

module.exports = thanksForSignUpMail;
  