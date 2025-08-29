 
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req); // raw request body
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
 

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).json({ msg: `Webhook Error: ${err.message}` });
    }
    return res.status(400).json({ msg: "Webhook Error: Unknown" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💰 Payment succeeded!", session.id);
    // TODO: store payment info in DB or trigger other actions
  }

  res.status(200).json({ msg: "buyMeSuccess" });
}
