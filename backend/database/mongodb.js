import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define DB_URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Conecting to Database Successfully in ${NODE_ENV} Mode`);
  } catch (error) {
    console.log(`Can not Connecting to Database: ${error}`);
    process.exit(1);
  }
};

export default connectToDatabase;
