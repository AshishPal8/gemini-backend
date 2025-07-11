import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
});

export const sendOtpSchema = z.object({
  phone: z.string().min(10).max(15),
});

export const verifyOtpSchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().length(6),
});

export const signinSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
});
export const changePasswordSchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().length(6),
  oldPassword: z.string(),
  newPassword: z.string().min(6),
});

export type signupInput = z.infer<typeof signupSchema>;
export type sendOtpInput = z.infer<typeof sendOtpSchema>;
export type verifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;
