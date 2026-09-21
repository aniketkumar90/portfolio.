import mongoose from "mongoose";
import { seedInitialDatabase } from "../utils/seedData.js";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
    
    // Connection event listeners
    mongoose.connection.on("connected", () => {
      console.log(`[MongoDB] Connection established.`);
    });

    mongoose.connection.on("error", (err) => {
      console.error(`[MongoDB Error] Connection issue: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn(`[MongoDB Warning] Connection lost. Reconnecting...`);
    });

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`[MongoDB] Connected successfully to "${conn.connection.name}" at host: ${conn.connection.host}`);

    // Auto-seed initial data if collections are empty
    await seedInitialDatabase();
    
    return conn;
  } catch (error) {
    console.error(`[MongoDB Critical] Initial connection failed: ${error.message}`);
    console.warn(`[MongoDB Warning] Running with offline fallback support.`);
  }
};

export default connectDB;
