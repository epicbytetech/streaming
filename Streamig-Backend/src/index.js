import connectDB from "./db/database.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: './.env', // Ensure this path is correct
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Application Error:", error);
      throw error;
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  });




/*
import express from "express"
import connectDB from "./db";
const app = express()
 (async ()=>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error", (error)=>{
        console.log("ERRR:", error);
        throw error
      })

      app.listen(process.env.PORT , ()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
      })
    }
    catch(err){
      console.log("ERROR:",err);
    }
  })
  ()
 */
