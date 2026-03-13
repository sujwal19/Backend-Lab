import express from "express";
import { uploadFiles } from "./multer/multipleLocal.js";
import { MultipleLocal } from "./models/multipleLocal.js";
import getDataUrl from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { MultipleCloud } from "./models/MultipleCloud.js";
import uploadMultipleCloud from "./multer/multipleCloud.js";

const router = express.Router();

router.post("/local", uploadFiles, async (req, res) => {
  try {
    const files = req.files;
    const imagePaths = files.map((image) => image.path);

    await MultipleLocal.create({
      image: imagePaths,
    });

    res.json({
      success: true,
      message: "Pics Uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/cloud", uploadMultipleCloud, async (req, res) => {
  try {
    const files = req.files;

    const imageUploadPromises = files.map(async (file) => {
      const fileBuffer = getDataUrl(file);
      const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

      return {
        url: result.secure_url,
        id: result.public_id,
      };
    });

    const uploadedImages = await Promise.all(imageUploadPromises);

    await MultipleCloud.create({
      image: uploadedImages,
    });

    res.json({
      success: true,
      message: "Pics Uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/local/all", async (req, res) => {
  const images = await MultipleLocal.find();
  res.json(images);
});

router.post("/cloud/all", async (req, res) => {
  const images = await MultipleCloud.find();
  res.json(images);
});

export default router;
