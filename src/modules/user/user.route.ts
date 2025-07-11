import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getUserController } from "./user.controller";

const router = Router();

router.get("/me", authMiddleware, getUserController);

export default router;
