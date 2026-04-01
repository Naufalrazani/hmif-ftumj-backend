import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadToCloudinary = (folderName) => {
  return async (req, res, next) => {
    if (!req.file) return next();

    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const fileData = `data:${req.file.mimetype};base64,${fileBase64}`;

      console.log("Sedang mengunggah ke Cloudinary...");

      const uploadResponse = await cloudinary.uploader.upload(fileData, {
        folder: `HMIF_UMJ/${folderName}`,
        resource_type: "auto",
      });

      req.body.image_url = uploadResponse.secure_url;

      next();
    } catch (error) {
      console.error("Cloudinary Error Detail:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal upload gambar",
        detail: error.message,
      });
    }
  };
};

export default upload;
