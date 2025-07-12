import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "./error";
import { prisma } from "../utils/db";

export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.user?.id);
  if (!userId) {
    throw new UnauthorizedError("Unauthorized");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }

  if (user.subscription === "PRO") return next();

  const now = new Date();
  const last = user.lastUsedAt ?? new Date(0);

  const isSameDay = now.toDateString() === last.toDateString();

  if (!isSameDay) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        dailyUsageCount: 1,
        lastUsedAt: now,
      },
    });
    return next();
  }

  const dailyLimit = 2;

  if (user.dailyUsageCount >= dailyLimit) {
    return res
      .status(400)
      .json({ message: "Daily limit reached. Upgrade to Pro." });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      dailyUsageCount: { increment: 1 },
    },
  });

  next();
};
