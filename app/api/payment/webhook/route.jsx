import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let data;
  let eventType;

  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

  if (webhookSecret) {
    // Get the raw body as text
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
      data = event.data;
      eventType = event.type;
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
  } else {
    // Webhook signing is recommended, but if the secret is not configured,
    // retrieve the event data directly from the request body.
    const body = await req.json();
    data = body.data;
    eventType = body.type;
  }

  try {
    switch (eventType) {
      case 'checkout.session.completed':
        const session = data.object;
        const customerId = session.customer;
        const customerEmail = session.customer_details.email;

        if (!customerId) {
          console.error('No customer ID found in checkout session');
          return NextResponse.json(
            { error: 'No customer ID found' },
            { status: 400 }
          );
        }

        console.log('Updating user with customer ID:', customerId);
        await db.update(USER_TABLE)
          .set({
            isMember: true,
            customerId: customerId,
          })
          .where(eq(USER_TABLE.email, customerEmail));
        break;

      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;

      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ result: 'success' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}