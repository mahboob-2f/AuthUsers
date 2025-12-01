
import jwt from 'jsonwebtoken'


const userAuth = async(req,res,next)=>{
    try{
        

    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`Invalid cookie ${error.message}`,
            })
    }
}