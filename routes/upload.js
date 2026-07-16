import express from "express";
import fs from "fs/promises";
import upload from "../middleware/upload.js";
import cloudinary from "../utils/cloudnary.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const tempPath = req.file?.path;

    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded",
        });
      }

      const result = await cloudinary.uploader.upload(tempPath);

      res.json({
        imageUrl: result.secure_url,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Upload failed",
      });
    } finally {
      if (tempPath) {
        try {
          await fs.unlink(tempPath);
        } catch (cleanupError) {
          console.error("Failed to delete temporary file:", cleanupError);
        }
      }
    }
  }
);

router.post("/multiple", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path);

          return result.secure_url;
        } finally {
          try {
            await fs.unlink(file.path);
          } catch (cleanupError) {
            console.error("Failed to delete temporary file:", cleanupError);
          }
        }
      })
    );

    res.json({
      imageUrls,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
});

export default router;
