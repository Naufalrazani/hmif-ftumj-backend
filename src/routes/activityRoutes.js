import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.route("/").get(getAllActivities).post(protect, createActivity);

router
  .route("/:id")
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

export default router;
