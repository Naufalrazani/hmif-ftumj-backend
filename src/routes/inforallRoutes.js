import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllInfo,
  createInfo,
  updateInfo,
  deleteInfo,
} from "../controllers/inforallController.js";

const router = express.Router();

router.route("/").get(getAllInfo).post(protect, createInfo);

router.route("/:id").put(protect, updateInfo).delete(protect, deleteInfo);

export default router;
