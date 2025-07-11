import { Request } from "express";

interface AuthUser {
  id: number;
  phone: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
