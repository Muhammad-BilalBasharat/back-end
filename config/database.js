import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


//Database connection
const Database = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB");    
    } catch (error) {
      console.error("Failed connecting to MongoDB:", error);
    }
  };
  export default Database;