import bcrypt from "bcryptjs";
import mongoose from "mongoose";  
import { Schema } from "mongoose"; 

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verifyOtp:{
        type:String,
        default:''
    },
    verifyOtpExpiredAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:''
    },
    resetOtpExpiredAt:{
        type:Number,
        default:0
    }
},{});

//         these two methods are very useful , they are doing the same things
//               like hashing the password 

// userSchema.pre("save",async(next)=>{
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10);
//         next();
//     }else{
//         next();
//     }
// })

// userSchema.methods.setPassword = async(password)=>{
//     this.password = await bcrypt.hash(password,10);
// }



export const User =mongoose.models.User || mongoose.model("User",userSchema);