import { NextFunction, Request, Response } from "express";
import { sendOtpSchema, signupSchema, verifyOtpSchema } from "./auth.schema";
import {
  sendOtpService,
  signupService,
  verifyOtpService,
} from "./auth.service";

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
