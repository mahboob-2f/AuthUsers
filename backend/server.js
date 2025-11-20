import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'./.env',});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './src/db/index.js';




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
  



app.get('/',(req,res)=>{
    res.send("hello ghost");
});

app.listen(port,()=>{
    console.log("server is listening at port",port);
})