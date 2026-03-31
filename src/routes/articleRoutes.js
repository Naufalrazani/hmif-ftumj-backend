import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import validateRequest, { articleSchema } from "../middlewares/validator.js";
import {
  getAllArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllArticles)
  .post(protect, validateRequest(articleSchema), createArticle);

router
  .route("/:id")
  .put(protect, validateRequest(articleSchema), updateArticle)
  .delete(protect, deleteArticle);

export default router;
