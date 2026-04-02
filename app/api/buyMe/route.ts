import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const rawBody = await request.arrayBuffer();
  const buf = Buffer.from(rawBody);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { msg: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }
    return NextResponse.json({ msg: "Webhook Error: Unknown" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💰 Payment succeeded!", session.id);
  }

  return NextResponse.json({ msg: "buyMeSuccess" });
}
