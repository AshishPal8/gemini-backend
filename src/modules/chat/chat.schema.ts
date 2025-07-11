import { z } from "zod";

export const createChatRoomSchema = z.object({
  name: z.string().min(3),
});
export const sendMessageSchema = z.object({
  content: z.string().min(1),
});

export type createChatRoomInput = z.infer<typeof createChatRoomSchema>;
export type sendMessageInput = z.infer<typeof sendMessageSchema>;
