import { NextFunction, Request, Response } from "express";
import { subscribeProService } from "./subscribe.service";

export const subscribeProController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const url = await subscribeProService(userId);
    res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};
