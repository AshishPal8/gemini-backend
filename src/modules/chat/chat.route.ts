import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { rateLimit } from "../../middlewares/rateLimit";
import {
  createChatroomController,
  getAllChatroomsController,
  getChatroomByIdController,
  sendMessageController,
} from "./chat.controller";

const router = Router();

router.post("/", authMiddleware, createChatroomController);
router.get("/", authMiddleware, getAllChatroomsController);
router.get("/:id", authMiddleware, getChatroomByIdController);
router.post("/:id/message", authMiddleware, rateLimit, sendMessageController);

export default router;
