import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId } = await req.json();

    console.log("👉 Received customerId:", customerId);

    if (!customerId) {
      console.error("❌ Missing customerId in request.");
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.HOST_URL || "http://localhost:3000/",
    });

    console.log("✅ Billing Portal Session:", session);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Portal Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
