import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env";

if (!DB_URI) {
  throw new Error("MONGO DB_URI is not defined. Please define it in the .env.<development/production>.local file.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI!);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
