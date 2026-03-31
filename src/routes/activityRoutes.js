import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import validateRequest, { activitySchema } from "../middlewares/validator.js";

const router = express.Router();

router
  .route("/")
  .get(getAllActivities)
  .post(protect, validateRequest(activitySchema), createActivity);

router
  .route("/:id")
  .put(protect, validateRequest(activitySchema), updateActivity)
  .delete(protect, deleteActivity);

export default router;
