import { Router } from "express";
import {
  sendOtpController,
  signupController,
  verifyOtpController,
} from "./auth.controller";

const router = Router();

router.post("/signup", signupController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);

export default router;
