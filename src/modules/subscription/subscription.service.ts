import { UnauthorizedError } from "../../middlewares/error";
import { prisma } from "../../utils/db";

export const subscriptionStatusService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscription: true,
    },
  });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return {
    tier: user.subscription || "BASIC",
  };
};
