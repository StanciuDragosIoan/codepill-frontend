import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from "stripe";
 
type Data = {
  msg?: string,
  error?: string,
  session?: Stripe.Checkout.Session
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // CREATE checkout session
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: { name: "Coffee" },
              unit_amount: 200,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fail`,
      });

      return res.status(200).json({ msg: "Checkout session created", session });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: "Unknown error" });
    }
  }

  // GET session info
  if (req.method === "GET") {
    const { session_id } = req.query;
    if (typeof session_id !== "string") {
      return res.status(400).json({ error: "Missing session_id" });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      return res.status(200).json({ session });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: "Failed to fetch session" });
    }
  }

  // If method not allowed
  res.setHeader("Allow", ["POST", "GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
