import express, { json } from "express";
import cors from "cors";
import dbConnect from "./libs/dbConnector";
import { config } from "dotenv";

config();
const app = express();
const PORT = process.env.PORT || 4000;

// things which is needed to use
app.use(json());
app.use(cors());

// function used from server and database connection
const startServerWithDbConnection = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Database connection fail error.");
    process.exit(1);
  }
};

startServerWithDbConnection();
