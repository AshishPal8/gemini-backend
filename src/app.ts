import express from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/error";

import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";

dotenv.config();

export const app = express();

app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(globalErrorHandler);
