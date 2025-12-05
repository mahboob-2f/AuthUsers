import {User} from '../models/user.models.js'

export const getUserData = async(req,res)=>{
    try{
        const userId= req.userId;
        if(!userId){
            return res.status(400)
            .json({
                success:false,
                message:`userId invalid `
            })
        }
        const user= await User.findById(userId);
        if(!user){
            return res.status(400)
            .json({
                success:false,
                message:`User not found `
            })
        }

        return  res.status(200)
            .json({
                success:true,
                userData:{
                    name:user.name,
                    isAccountVerified:user.isAccountVerified
                }
        })



    }catch(error){
        return res.status(400)
            .json({
                success:"false",
                message:`Error while fetching User data ${error.message}`
            })
    }
}