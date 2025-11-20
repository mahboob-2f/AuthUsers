import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'./.env',});
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials:true}))


const port = process.env.PORT || 4001;
  
app.get('/',(req,res)=>{
    res.send("hello ghost");
});

app.listen(port,()=>{
    console.log("server is listening at port",port);
})