import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/articleController.js";
import validateRequest, { articleSchema } from "../middlewares/validator.js";
import upload, { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllArticles)
  .post(
    protect,
    upload.single("image"),
    uploadToCloudinary("articles"),
    validateRequest(articleSchema),
    createArticle,
  );

router
  .route("/:id")
  .put(
    protect,
    upload.single("image"),
    uploadToCloudinary("articles"),
    validateRequest(articleSchema),
    updateArticle,
  )
  .delete(protect, deleteArticle);

export default router;
