import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'./.env',});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { authRouter } from './src/routes/authRouter.route.js';
import { userRouter } from './src/routes/user.router.js';




const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials:true}))


const port = process.env.PORT || 4001;

//        here we are connecting to MongoDB Database

connectDB()
    .then(()=>{
        app.on('error',()=>{
            console.log("error after connection ",error.message);
        })
    })
    .catch((error)=>{
        console.log("MongoDB connection failed ",error.message);
    })
  


//       Api Endpoints 

app.get('/',(req,res)=>{          //   root end point 
    res.send("hello ghost");
});

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log("server is listening at port",port);
})