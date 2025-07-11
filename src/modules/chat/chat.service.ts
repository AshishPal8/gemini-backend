import { BadRequestError, NotFoundError } from "../../middlewares/error";
import cache from "../../utils/cache";
import { prisma } from "../../utils/db";
import { getGeminiReply } from "../../utils/gemini";
import { createChatRoomInput, sendMessageInput } from "./chat.schema";

export const createChatroomService = async (
  userId: number,
  data: createChatRoomInput
) => {
  const { name } = data;
  const chatroom = await prisma.chatroom.create({
    data: {
      userId,
      name,
    },
  });

  if (!chatroom) {
    throw new NotFoundError("Chatroom not found");
  }

  cache.del(`chatrooms:${userId}`);

  return chatroom;
};

export const getAllChatroomsService = async (userId: number) => {
  const cacheKey = `chatrooms:${userId}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const chatrooms = await prisma.chatroom.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!chatrooms) {
    return [];
  }

  cache.set(cacheKey, chatrooms);
  return chatrooms;
};

export const getChatroomByIdService = async (
  userId: number,
  chatroomId: number
) => {
  const chatroom = await prisma.chatroom.findFirst({
    where: {
      id: chatroomId,
      userId,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  if (!chatroom) {
    throw new Error("Chatroom not found");
  }

  return chatroom;
};

export const sendMessageService = async (
  userId: number,
  chatroomId: number,
  data: sendMessageInput
) => {
  const { content } = data;

  const chatroom = await prisma.chatroom.findFirst({
    where: { id: chatroomId, userId },
  });

  if (!chatroom) {
    throw new NotFoundError("Chatroom not found");
  }

  await prisma.message.create({
    data: {
      chatroomId,
      role: "user",
      content,
    },
  });

  const messages = await prisma.message.findMany({
    where: { chatroomId },
    orderBy: { createdAt: "asc" },
    select: {
      role: true,
      content: true,
    },
  });

  const geminiReply = await getGeminiReply(messages);

  const geminiMessage = await prisma.message.create({
    data: {
      chatroomId,
      role: "model",
      content: geminiReply,
    },
  });

  return geminiMessage;
};
