import { Router } from "express";
import { stripeWebhookController } from "./webhook.controller";

const router = Router();

router.post("/stripe", stripeWebhookController);

export default router;
