
import jwt from 'jsonwebtoken'


const userAuth = async(req,res,next)=>{
    try{
        
        const {token} = req.cookies;
        if(!token){
            return res.status(400)
                .json({
                    success:false,
                    message:'Unauthorised User',
                })
        }

        const decodedToken = jwt.verify(token,process.env.SECRETKEY);
        
        if(decodedToken?.id){
            req.body.userId= decodedToken.id;
        }else{
            return res.status(400)
                .json({
                    success:false,
                    message:"Unauthorised user",
                })
        }
        next();

    }catch(error){
        return res.status(400)
            .json({
                success:false,
                message:`Invalid cookie ${error.message}`,
            })
    }
}

export {userAuth};