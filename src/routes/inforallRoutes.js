import express from "express";
import {
  getAllInfo,
  createInfo,
  updateInfo,
  deleteInfo,
} from "../controllers/inforallController.js";

const router = express.Router();

router.route("/").get(getAllInfo).post(createInfo);

router.route("/:id").put(updateInfo).delete(deleteInfo);

export default router;
