import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId } = await req.json();

    if (!customerId) {
      console.error("Missing customerId in request.");
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.HOST_URL,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal session error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
