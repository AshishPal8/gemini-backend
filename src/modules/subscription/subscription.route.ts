import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { subscriptionStatusController } from "./subscription.controller";

const router = Router();

router.post("/status", authMiddleware, subscriptionStatusController);

export default router;
