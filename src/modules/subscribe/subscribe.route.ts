import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { subscribeProController } from "./subscribe.controller";

const router = Router();

router.post("/pro", authMiddleware, subscribeProController);

export default router;
