import express from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/error";

import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import chatRoutes from "./modules/chat/chat.route";
import subscribeRoutes from "./modules/subscribe/subscribe.route";
import webHookRoutes from "./modules/webhook/webhook.route";
import subscriptionRoutes from "./modules/subscription/subscription.route";

dotenv.config();

export const app = express();

app.use("/webhook", express.raw({ type: "application/json" }), webHookRoutes);

app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/chatroom", chatRoutes);
app.use("/subscribe", subscribeRoutes);
app.use("/subscription", subscriptionRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(globalErrorHandler);
