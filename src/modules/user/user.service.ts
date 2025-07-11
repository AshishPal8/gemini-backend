import { NotFoundError } from "../../middlewares/error";
import { prisma } from "../../utils/db";

export const getUserService = async (userId: number) => {
  const user = prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};
