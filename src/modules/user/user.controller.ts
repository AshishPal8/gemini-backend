import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../middlewares/error";
import { getUserService } from "./user.service";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
      throw new NotFoundError("Unauthorized");
    }

    const user = await getUserService(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
