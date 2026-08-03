import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

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

    // This is the ticket you punch into ROES / Richard's order form.
    const orderTicket = `
New print order — ready for Richard Photo Lab

Print:      ${meta.title}
Image file: ${meta.imageFile}
Size:       ${meta.sizeLabel}
Order #:    ${session.id}

Ship to:
${session.shipping_details?.name ?? ""}
${addr?.line1 ?? ""} ${addr?.line2 ?? ""}
${addr?.city ?? ""}, ${addr?.state ?? ""} ${addr?.postal_code ?? ""}
${addr?.country ?? ""}

Customer email: ${session.customer_details?.email ?? ""}
`.trim();

    await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM!,
      to: process.env.ORDER_EMAIL_TO!,
      subject: `New order: ${meta.title} (${meta.sizeLabel})`,
      text: orderTicket,
    });
  }

  return NextResponse.json({ received: true });
}
