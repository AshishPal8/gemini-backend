import { stripeProductId } from "../../utils";
import { stripe } from "../../utils/stripe";

export const subscribeProService = async (userId: number) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: stripeProductId!,
        quantity: 1,
      },
    ],
    success_url: "https://gemini.ashishpro.com/success",
    cancel_url: `https://gemini.ashishpro.com/cancel`,
    metadata: {
      userId: String(userId),
    },
  });

  return session.url;
};
