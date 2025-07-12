import { BadRequestError } from "../../middlewares/error";
import { stripeWebhookSecret } from "../../utils";
import { prisma } from "../../utils/db";
import { stripe } from "../../utils/stripe";

export const stripWebhookService = async (
  rawBody: any,
  sig?: string | string[] | undefined
) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, stripeWebhookSecret!);
  } catch (error) {
    throw new BadRequestError("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = Number(session.metadata?.userId);

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { subscription: "PRO" },
      });

      console.log("User upgraded to PRO:", userId);
    }
  }

  return {
    message: "Received",
  };
};
