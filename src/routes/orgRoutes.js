import express from "express";
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

router.route("/departments").get(getAllDepartments).post(createDepartment);

router.route("/departments/:id").put(updateDepartment).delete(deleteDepartment);

router.route("/members").get(getAllMembers).post(createMember);

router.route("/members/:id").put(updateMember).delete(deleteMember);

export default router;
