import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import validateRequest, { activitySchema } from "../middlewares/validator.js";
import upload, { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllActivities)
  .post(
    protect,
    upload.single("image"),
    uploadToCloudinary("activities"),
    validateRequest(activitySchema),
    createActivity,
  );

router
  .route("/:id")
  .put(
    protect,
    upload.single("image"),
    uploadToCloudinary("activities"),
    validateRequest(activitySchema),
    updateActivity,
  )
  .delete(protect, deleteActivity);

export default router;
