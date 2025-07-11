import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../middlewares/error";
import {
  createChatroomService,
  getAllChatroomsService,
  getChatroomByIdService,
  sendMessageService,
} from "./chat.service";
import { createChatRoomSchema, sendMessageSchema } from "./chat.schema";

export const createChatroomController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    const userId = Number(user?.id);
    if (!userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    const parsedData = createChatRoomSchema.parse(req.body);

    const chatroom = await createChatroomService(userId, parsedData);
    res.status(201).json({ message: "Chatroom created", chatroom });
  } catch (error) {
    next(error);
  }
};

export const getAllChatroomsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    const chatrooms = await getAllChatroomsService(userId);
    res.status(200).json({ chatrooms });
  } catch (error) {
    next(error);
  }
};

export const getChatroomByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const chatroomId = Number(req.params.id);

    const chatroom = await getChatroomByIdService(userId, chatroomId);
    res.status(200).json({ chatroom });
  } catch (error) {
    next(error);
  }
};

export const sendMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.user?.id);
    const chatroomId = Number(req.params.id);

    const parsedData = sendMessageSchema.parse(req.body);

    const result = await sendMessageService(userId, chatroomId, parsedData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
