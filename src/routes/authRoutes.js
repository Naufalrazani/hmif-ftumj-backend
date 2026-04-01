import express from "express";
import { login } from "../controllers/authController.js";
import validateRequest, { loginSchema } from "../middlewares/validator.js";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), login);

export default router;
