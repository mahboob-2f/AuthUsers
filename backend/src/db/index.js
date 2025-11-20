import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{

    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log("connection object : ",connectionInstance.connection);
        console.log("MongoDB Connected !!! \n DB host :",connectionInstance.connection.host);


    }catch(error){
        console.log("Connection error : ",error.message);
    }

}

export default connectDB;