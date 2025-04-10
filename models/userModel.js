const mongoose= require('mongoose');
const userSchema = new mongoose.Schema(
    
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true,

            },
            confirmPassword:{
                type:String,
                required:false,

            },
            otp: String,
            otpExpires: Date, 
            isVerified:{
                type: Boolean,
                default:false
            },
        }
    
);
module.exports= mongoose.model("user",userSchema);