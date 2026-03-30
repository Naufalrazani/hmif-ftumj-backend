import express from "express";
import {
  getAllArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.route("/").get(getAllArticles).post(createArticle);

router.route("/:id").put(updateArticle).delete(deleteArticle);

export default router;
