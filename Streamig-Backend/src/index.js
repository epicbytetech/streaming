import connectDB from "./db/database.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: './.env', 
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
