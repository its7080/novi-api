const nodemailer= require("nodemailer");
const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user:'arbinpaul5@gmail.com',
            pass:'uzee eqsb cdfv xrmu'
        }
    }
);
module.exports= transporter;
