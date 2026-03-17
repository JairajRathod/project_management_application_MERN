import mongoose from "mongoose";

async function dbConnect() {
  const mongodbServerName =
    process.env.DATABASE_URL ||
    "mongodb://localhost:27017/proman-manager-web-app";
  try {
    await mongoose.connect(mongodbServerName);
    console.log("Database is connected successfully");
  } catch (error) {
    console.log(`Error during connecting the database: ${error}`);
  }
}

export default dbConnect;
