import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  sendOtpController,
  signinController,
  signupController,
  verifyOtpController,
} from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signupController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/signin", signinController);
router.post("/forgot-password", forgotPasswordController);
router.post("/change-password", changePasswordController);

export default router;
