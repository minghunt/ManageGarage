import mongoose from "mongoose";
import { DB_OPTIONS } from "../config/config.js";
import { CONNECTION_STRING } from "../config/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, DB_OPTIONS);

    console.log("MongoDB connected, ", CONNECTION_STRING);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);

    process.exit(1);
  }
};
