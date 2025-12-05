import validator from 'validator';
import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import {transpoter} from '../config/nodemailer.config.js'



export const register = async(req,res)=>{
    //  for registering 
    //    get details from request body
    //      check and validate that details like name, and email
    //     check for the user is already exist or not
    //      database call create user
    //      


    try {
        const {name,email,password}= req.body;
        // console.log(name);
        if(
            [name,email,password].some((field)=> field?.trim()==='')
        ){
            return res.status(500)
                .json({
                    success:false,
                    message:"Required field are missing",
                })
        }
        //   validating email               we can use regular expressions also
        //                          but this validator package is better

        if(!validator.isEmail(email)){
            return res.status(400)
                .json({
                    success:false,
                    message:"Email is not valid"
                })
        }


        //    checking whether user already exists or not

        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.status(409)
                .json({
                    success:false,
                    message:"User already exists.",
                })
        }

        //   hashing the password   => we can use code to manually hashed the password

        const hashedPassword = await bcrypt.hash(password,10);   

        //      creating user and saving in database using create 

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        if(!user){
            return res.status(500)
                .json({
                    success:false,
                    message:"user registration failed ."
                })
        }
        
        const token = jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:process.env.EXPIRYIN});

        const options={
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        }


        res.cookie('token',token,options);      //  token addded to res object


        //  HERE we are sending mail to user that you have Registered

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Welcome to AuthUser ",
            text:`welcome to AuthUser , you have created account in
                AuthUser with email ${email}`,

        }


        await transpoter.sendMail(mailOptions);


        return res.status(200)
                .json({
                    success:true,
                    message:"User created successfully !",
                });
        
        
    } catch (error) {
        console.log("Error while registering the user : ",error.message);
        return res.status(500)
            .json({
                success:false,
                message:`Error while registering the user: ${error.message}`,
            })
    }   

}

export const logIn = async(req,res)=>{
    try{

        const {email,password}= req.body;

        if(
            [email,password].some((field)=> field?.trim()==='')
        ){
            return res.status(400)
                .json({
                    success:false,
                    message:"Invalid user Credentials",
                });
        }

        // validating email
        if(!validator.isEmail(email)){
            return res.status(400)
                .json({
                    success:false,
                    message:"Email is Invalid",
                })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400)
                .json({
                    success:false,
                    message:"Invalid Email",
                })
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400)
                .json({
                    success:false,
                    message:"Invalid Password",
                })
        }

        const token = jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:process.env.EXPIRYIN});

        const options={
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
        }
        res.cookie('token',token,options);    // here we are adding then after adding
        //                                      we will return res object in line 150

        return res.status(200)
            .json({
                success:true,
                message:"User logged in Successfully",
            })



    }catch(error){
        res.status(400)
            .json({
                success:false,
                message:`Something went wrong with login ${error.message}`,
            })
    }
}

export const logOut = async(req,res)=>{
    try{
        const options={
            httpOnly:true,
            secure:true,
            sameSite:"strict",
        }

        res.clearCookie('token',options);

        return res.status(200)
            .json({
                success:true,
                message:"User logged Out successfully",
            })


    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`Something went wrong while logging Out ${error.message}`,
            })
    }
}

//   Send Verification OTP to User's Email

export const sendVerifyOtp= async (req,res)=>{
    try{
        const userId= req.userId;

        const user = await User.findById(userId);
        if(!user){
            return res.status(400)
                .json({
                    success:false,
                    messgae:"User not found",
                })
        }

        if(user.isAccountVerified){
            return res.status(200)
                .json({
                    success:false,
                    message:"user already verified",
                })
        }

        const otp = String(Math.floor((Math.random() * 900000 + 1000000)));

        user.verifyOtp=otp
        user.verifyOtpExpiredAt=Date.now()+ 24*60*60*1000;
        
        await user.save({validateBeforeSave:false});

        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: `"AuthUser" ${user.email}`,
            subject: "Account Verification OTP",
            text:`Your otp is ${otp}. Verify your account with this OTP`,
        }

        await transpoter.sendMail(mailOptions);

        return res.status(200)
            .json({
                success:true,
                message:'OTP send for Email Verification',
            })


    }catch(error){
        res.status(400)
            .json({
                success:false,
                message:`Verification failed ${error.message}`,
            })
    }
}


//    for verification of Email

export const verifyEmail = async(req,res)=>{
    try{
        const {otp}=req.body;
        const userId= req.userId;

        if(
            [userId,otp].some((field)=> field?.trim()==='')
        ){
            return res.status(400)
                .json({
                    success:false,
                    message:"Both the userId and OTP Required",
                })
        }

        const user= await User.findById(userId);

        if(!user){
            return res.status(400)
                .json({
                    success:false,
                    message:"user not found",
                })
        }

        if(user.verifyOtp===''  || user.verifyOtp!== otp){
            return res.status(400)
                .json({
                    success:false,
                    message:"Invalid OTP",
                })
        }

        if(user.verifyOtpExpiredAt < Date.now()){
            return res.status(400)
                .json({
                    success:false,
                    message:"OTP expired",
                })
        }

        user.isAccountVerified=true,
        user.verifyOtp='',
        user.verifyOtpExpiredAt=0

        user.save({validateBefore:false});

        return res.status(200)
            .json({
                success:false,
                message:"Email verified Successfully",
            })


    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`Error while verifying Email ${error.message}`,
            })
    }
}


//      for checking user is authenticated or not

export const isAuthenticated = async(req,res)=>{
    try{
        return res.status(200)
            .json({
                success:true,
                message:"user is Authenticated",
            })

    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`User Authentication failed ${error.message}`,
            })
    }
}


//     send resetPasswordOtp

export const sendResetOtp= async(req,res)=>{
    try{
        const {email}= req.body;
        if(!email){
            return res.status(400)
                .json({
                    success:false,
                    message:"Email Invalid",
                })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400)
                .json({
                    success:false,
                    message:"User not found with this email",
                })
        }

        const otp = String(Math.floor(Math.random()*900000 + 1000000))

        user.resetOtp=otp;
        user.resetOtpExpiredAt=Date.now() + 15*60*1000;

        await user.save({validateBeforeSave:false})

        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `OTP for Resetting Your password is ${otp}`,
        }
        await transpoter.sendMail(mailOptions);

        return res.status(200)
            .json({
                success:false,
                message:"Reset OTP send to User",
            })

    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:"reset OTP  invalid",
            })
    }
}


//   Reset User passwrod

export const resetPassword = async(req,res)=>{
    try{
        const {email,otp,newPassword}= req.body;

        if(
            [email,otp,newPassword].some((field)=> field?.trim()==='')
        ){
            return res.status(400)
                .json({
                    success:false,
                    message:'All are Required to Reset Password',
                })
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(400)
                .json({
                    success:false,
                    message:'User not found with this Email',
                })
        }
        if(user?.resetOtp==='' || user?.resetOtp !== otp){
            return res.status(400)
                .json({
                    success:false,
                    message:'Invalid reset OTP',
                })
        }

        if(user?.resetOtpExpiredAt < Date.now()){
            return res.status(400)
                .json({
                    success:false,
                    message:'Reset OTP expired',
                })
        }

        const hashedPassword= await bcrypt.hash(newPassword,10)

        user.password = hashedPassword;
        user.resetOtp=''
        user.resetOtpExpiredAt=0


        await user.save({validateBeforeSave:false});

        return res.status(200)
            .json({
                success:true,
                message:"Password has changed successfully",
            })

        
    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`Password is not Reset : ${error.message}`,
            })
    }
}