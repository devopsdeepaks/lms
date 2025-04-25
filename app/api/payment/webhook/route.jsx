import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

  let data;
  let eventType;

  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    data = event.data;
    eventType = event.type;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }

  try {
    if (eventType === 'checkout.session.completed') {
      const session = data.object;
      const customerId = session.customer;
      const customerEmail = session.customer_details?.email;

      if (customerId && customerEmail) {
        await db.update(USER_TABLE)
          .set({ isMember: true, customerId })
          .where(eq(USER_TABLE.email, customerEmail));
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handling error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
