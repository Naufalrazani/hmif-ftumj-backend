import express from "express";
import {
  createSubscriber,
  getAllSubscribers,
  updateSubscriberStatus,
  deleteSubscriber,
} from "../controllers/subscriberController.js";
import { protect } from "../middlewares/authMiddleware.js";
import validateRequest, { subscriberSchema } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", validateRequest(subscriberSchema), createSubscriber);

router.get("/", protect, getAllSubscribers);
router.patch(
  "/:id",
  protect,
  validateRequest(subscriberSchema),
  updateSubscriberStatus,
);
router.delete("/:id", protect, deleteSubscriber);

export default router;
