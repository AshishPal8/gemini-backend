import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/db";
import { sendOtpInput, signupInput, verifyOtpInput } from "./auth.schema";
import { BadRequestError } from "../../middlewares/error";
import { jwtSecret } from "../../utils";

export const signupService = async (data: signupInput) => {
  const { name, phone, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { phone } });
  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      password: hashedPassword,
    },
  });

  return {
    message: "User created. Verify with OTP.",
    userId: user.id,
  };
};

export const sendOtpService = async (data: sendOtpInput) => {
  const { phone } = data;

  const existingUser = await prisma.user.findUnique({ where: { phone } });
  if (!existingUser) {
    throw new BadRequestError("User not exists");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.update({
    where: { phone },
    data: {
      otp,
      otpExpiresAt,
    },
  });

  return {
    message: "OTP is sent to you mobile number. Verify your OTP.",
    userId: user.id,
    otp,
  };
};

export const verifyOtpService = async (data: verifyOtpInput) => {
  const { phone, otp } = data;

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user || user.otp !== otp) {
    throw new BadRequestError("Invalid OTP or phone number");
  }

  if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
    throw new BadRequestError("OTP expired");
  }

  await prisma.user.update({
    where: { phone },
    data: {
      isVerified: true,
      otp: null,
      otpExpiresAt: null,
    },
  });

  const token = jwt.sign({ userId: user.id, phone: user.phone }, jwtSecret!, {
    expiresIn: "7d",
  });

  return {
    message: "OTP verified",
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
    },
  };
};
