import { NextFunction, Request, Response } from "express";
import { stripWebhookService } from "./webhook.service";

export const stripeWebhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sig = req.headers["stripe-signature"];
    const rawBody = req.body;

    const result = await stripWebhookService(rawBody, sig);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
