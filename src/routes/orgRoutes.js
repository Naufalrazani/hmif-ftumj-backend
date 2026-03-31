import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router
  .route("/departments")
  .get(getAllDepartments)
  .post(protect, createDepartment);

router
  .route("/departments/:id")
  .put(protect, updateDepartment)
  .delete(protect, deleteDepartment);

router.route("/members").get(getAllMembers).post(protect, createMember);

router
  .route("/members/:id")
  .put(protect, updateMember)
  .delete(protect, deleteMember);

export default router;
