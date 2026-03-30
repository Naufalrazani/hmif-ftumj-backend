import express from "express";
import {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.route("/").get(getAllActivities).post(createActivity);

router.route("/:id").put(updateActivity).delete(deleteActivity);

export default router;
