const express= require("express");
const router= express.Router();
const userController= require('../controller/userController');
router.post("/verify-user",userController.sendOtpForSignup);
router.post("/verify-otp", userController.checkOtpAndSignUp);
router.post("/login",userController.login);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password',userController.resetPassword);
module.exports= router;          