import { NextFunction, Request, Response } from "express";
import { subscriptionStatusService } from "./subscription.service";

export const subscriptionStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const status = await subscriptionStatusService(userId);
    return res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};
