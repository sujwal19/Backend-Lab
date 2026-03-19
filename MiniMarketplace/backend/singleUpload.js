import express from "express";
import { uploadFile } from "./multer/singleLocal.js";
import { SingleLocal } from "./models/singleLocal.js";
import uploadFileCloud from "./multer/singleCloud.js";
import getDataUrl from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { SingleCloud } from "./models/SingleCloud.js";

const router = express.Router();

router.post("/local", uploadFile, async (req, res) => {
  try {
    const file = req.file;
    await SingleLocal.create({
      image: file?.path,
    });

    res.json({
      success: true,
      message: "Pic Uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/cloud", uploadFileCloud, async (req, res) => {
  try {
    const file = req.file;
    const fileBuffer = getDataUrl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);

    await SingleCloud.create({
      image: {
        url: cloud.secure_url,
        id: cloud.public_id,
      },
    });

    res.json({
      success: true,
      message: "Pic Uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/local/all", async (req, res) => {
  const images = await SingleLocal.find();
  res.json(images);
});

router.get("/cloud/all", async (req, res) => {
  const images = await SingleCloud.find();
  res.json(images);
});

export default router;
