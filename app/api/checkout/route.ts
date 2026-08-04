import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct, getSize } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { slug, size } = await req.json();

  const product = getProduct(slug);
  const sizeInfo = getSize(size);
  if (!product || !sizeInfo) {
    return NextResponse.json({ error: "Invalid product or size" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: sizeInfo.priceCents,
          product_data: {
            name: `${product.title} — ${sizeInfo.label}`,
          },
        },
        quantity: 1,
      },
    ],
    // Required so you have an address to hand to Richard for shipping
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    // Carries the info the webhook needs to build the order ticket
    metadata: {
      slug: product.slug,
      imageFile: product.imageFile,
      title: product.title,
      size: sizeInfo.key,
      sizeLabel: sizeInfo.label,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`,
  });

  return NextResponse.json({ url: session.url });
}
