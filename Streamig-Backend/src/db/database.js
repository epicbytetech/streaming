import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async()=>{
  try{
   const conncetionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   //console.log(conncetionInstance);
  console.log(`\n MongoDB connected  !! DB Host :${conncetionInstance.connection.host}`); 
  }catch(err){
    console.log("MongoDB connection error:",err);
    process.exit(1)
  }
}

export default connectDB 
