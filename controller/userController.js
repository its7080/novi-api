const bcrypt = require('bcryptjs');
const otpGen = require('otp-generator');
const sendMail = require('../emails/sendMail');
const User = require('../models/userModel');
const thanksForSignUpMail= require("../emails/thanksForSignUpMail");
const thanks=require("../emails/tanksMailHtml");
exports.sendOtpForSignup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password must match"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const otp = otpGen.generate(6, {
            digits: true,
            alphabets: false
        });

        const hashedPassword = await bcrypt.hash(password, 12);

        
        const userData = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 600000, 
            isVerified: false
        };

        await User.findOneAndUpdate(
            { email },
            userData,
            { upsert: true, new: true }
        );

        await sendMail(
            email,
            "Your OTP Verification Code",
            `Your OTP is: <strong>${otp}</strong><br>Valid for 10 minutes.`
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error during OTP sending"
        });
    }
};
exports.checkOtpAndSignUp = async (req, res) => {
    const { email, otp } = req.body; // Make sure email is passed along with otp
    try {
        const user = await User.findOne({
            email: email,
            otp: otp,
            otpExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid mail or expired OTP !!"
            });
        }
        // Mark the user as verified
        user.isVerified = true;
        await user.save();
      await thanksForSignUpMail(email,"Sign-Up sucessful !!",thanks);
        res.status(201).json({
            success: true,
            message: "Sign-up successful"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.login=async(req,res)=>{
    const{email,password} = req.body;
    try{
       const user= await User.findOne({
        email:email,
       });
       if(!user){
        res.status(401).json({
            sucess:false,
            message:"User not found"
        });
       }
       const isMatched= await bcrypt.compare(password,user.password);
       if(!isMatched){
        res.status(401).json({
            sucess:false,
            message:"Invalid password"
        });
       } 
       res.status(201).json({
        sucess:true,
        message:"login sucessful"
    });
    }
    catch(err){ 
       return res.status(401).json({
        sucess:false,
        message:err.message
    });
    }
}    
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

     
        const otp = otpGen.generate(6, {
            digits: true,
            alphabets: false
        });
        user.otp = otp;
        user.otpExpires = Date.now() + 600000; // 10 minutes
        await user.save();
        await sendMail(
            email,
            "Password Reset OTP",
            `Your password reset OTP is: <strong>${otp}</strong><br>Valid for 10 minutes.`
        );

        res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error sending password reset OTP"
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match"
            });
        }
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error resetting password"
        });
    }
};