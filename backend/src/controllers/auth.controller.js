import validator from 'validator';
import { User } from '../models/user.models';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


export const register = async(req,res)=>{
    //  for registering 
    //    get details from request body
    //      check and validate that details like name, and email
    //     check for the user is already exist or not
    //      database call create user
    //      


    try {
        const {name,email,password}= req.body;
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

        if(!validator.isEmail({email})){
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
        
        const token = jwt.sign({id:user._id},process.env.SECRET,{expiresIn:process.env.EXPIRYIN});

        const options={
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        }

        res.status(200)
            .cookie('token',token,options)
            .json({
                success:true,
                message:"User created successfully !",
            });
        
        
    } catch (error) {
        console.log("error while registering the user",error.message);
        return res.status(500)
            .json({
                success:false,
                message:`user is not registered ${error.message}`,
            })
    }   

}