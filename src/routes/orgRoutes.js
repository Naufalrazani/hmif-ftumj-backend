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
import validateRequest, {
  memberSchema,
  departmentSchema,
} from "../middlewares/validator.js";
import upload, { uploadToCloudinary } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/departments")
  .get(getAllDepartments)
  .post(
    protect,
    upload.single("image"),
    uploadToCloudinary("departments"),
    validateRequest(departmentSchema),
    createDepartment,
  );

router
  .route("/departments/:id")
  .put(
    protect,
    upload.single("image"),
    uploadToCloudinary("departments"),
    validateRequest(departmentSchema),
    updateDepartment,
  )
  .delete(protect, deleteDepartment);

router
  .route("/members")
  .get(getAllMembers)
  .post(
    protect,
    upload.single("image"),
    uploadToCloudinary("members"),
    validateRequest(memberSchema),
    createMember,
  );

router
  .route("/members/:id")
  .put(
    protect,
    upload.single("image"),
    uploadToCloudinary("members"),
    validateRequest(memberSchema),
    updateMember,
  )
  .delete(protect, deleteMember);

export default router;
