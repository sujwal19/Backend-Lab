import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import singleUpload from "./singleUpload.js";
import multipleUploads from "./multipleUploads.js";
import cloudinary from "cloudinary";
import cors from "cors";
import "colors";
dotenv.config();
const app = express();
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "mini-marketplace",
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/uploads", express.static("uploads"));
app.use("/uploadsmultiple", express.static("uploadsmultiple"));

app.use("/api/single", singleUpload);
app.use("/api/multiple", multipleUploads);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
