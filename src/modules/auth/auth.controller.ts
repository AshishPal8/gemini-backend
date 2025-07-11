import { NextFunction, Request, Response } from "express";
import {
  changePasswordSchema,
  sendOtpSchema,
  signinSchema,
  signupSchema,
  verifyOtpSchema,
} from "./auth.schema";
import {
  changePasswordService,
  sendOtpService,
  signinService,
  signupService,
  verifyOtpService,
} from "./auth.service";
import { UnauthorizedError } from "../../middlewares/error";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = signupSchema.parse(req.body);
    const result = await signupService(parsedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const sendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = sendOtpSchema.parse(req.body);
    const result = await sendOtpService(parsedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = verifyOtpSchema.parse(req.body);

    const result = await verifyOtpService(parsedData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = signinSchema.parse(req.body);
    const result = await signinService(parsedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = sendOtpSchema.parse(req.body);
    const result = await sendOtpService(parsedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedData = changePasswordSchema.parse(req.body);

    const result = await changePasswordService(parsedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
