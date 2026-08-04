import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createProdigiOrder } from "@/lib/prodigi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;
    const addr = session.shipping_details?.address;

    try {
      // Automatically place the print order with Prodigi — no manual entry.
      await createProdigiOrder({
        sizeKey: meta.size,
        imageFile: meta.imageFile,
        merchantOrderId: session.id,
        shipTo: {
          name: session.shipping_details?.name || session.customer_details?.name || "",
          email: session.customer_details?.email || undefined,
          line1: addr?.line1 || "",
          line2: addr?.line2,
          city: addr?.city || "",
          state: addr?.state,
          postalCode: addr?.postal_code || "",
          country: addr?.country || "US",
        },
      });

      // Confirmation copy for your own records — no action needed on your end.
      await resend.emails.send({
        from: process.env.ORDER_EMAIL_FROM!,
        to: process.env.ORDER_EMAIL_TO!,
        subject: `Order placed with Prodigi: ${meta.title} (${meta.sizeLabel})`,
        text: `Order #${session.id} was automatically submitted to Prodigi for printing and shipping.\n\nPrint: ${meta.title}\nSize: ${meta.sizeLabel}\nShip to: ${session.shipping_details?.name}, ${addr?.line1}, ${addr?.city}, ${addr?.state} ${addr?.postal_code}`,
      });
    } catch (err: any) {
      // If Prodigi fails for any reason, don't fail silently — email yourself
      // the full order details so you can place it manually as a fallback.
      await resend.emails.send({
        from: process.env.ORDER_EMAIL_FROM!,
        to: process.env.ORDER_EMAIL_TO!,
        subject: `⚠️ ACTION NEEDED — Prodigi order failed: ${meta.title}`,
        text: `Automatic order submission failed: ${err.message}\n\nPlace this order manually:\n\nPrint: ${meta.title}\nImage file: ${meta.imageFile}\nSize: ${meta.sizeLabel}\nOrder #: ${session.id}\n\nShip to:\n${session.shipping_details?.name}\n${addr?.line1} ${addr?.line2 || ""}\n${addr?.city}, ${addr?.state} ${addr?.postal_code}\n${addr?.country}\n\nCustomer email: ${session.customer_details?.email}`,
      });
    }
  }

  return NextResponse.json({ received: true });
}
