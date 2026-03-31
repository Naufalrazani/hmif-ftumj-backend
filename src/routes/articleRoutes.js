import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.route("/").get(getAllArticles).post(protect, createArticle);

router.route("/:id").put(protect, updateArticle).delete(protect, deleteArticle);

export default router;
