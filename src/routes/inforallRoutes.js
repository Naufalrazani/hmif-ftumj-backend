import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllInfo,
  createInfo,
  updateInfo,
  deleteInfo,
} from "../controllers/inforallController.js";
import validateRequest, { inforallSchema } from "../middlewares/validator.js";
import upload, { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllInfo)
  .post(
    protect,
    upload.single("image"),
    uploadToCloudinary("inforall"),
    validateRequest(inforallSchema),
    createInfo,
  );

router
  .route("/:id")
  .put(
    protect,
    upload.single("image"),
    uploadToCloudinary("inforall"),
    validateRequest(inforallSchema),
    updateInfo,
  )
  .delete(protect, deleteInfo);

export default router;
