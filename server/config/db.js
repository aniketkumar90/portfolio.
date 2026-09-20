import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Connection failed: ${error.message}. Running in fallback mode.`);
  }
};
