# Print Shop

Minimal print storefront: gallery → product page with size picker → Stripe
Checkout → order ticket emailed to you for fulfillment.

## Important: Richard Photo Lab fulfillment

Richard Photo Lab does not publish a developer API for custom websites. They
take orders through their own **ROES** desktop app, or through partner
platforms (Pic-Time, Instaproofs) that have built dedicated integrations.

So this site does **not** submit orders to Richard automatically. Instead,
when a customer pays, the webhook (`app/api/webhook/route.ts`) emails you a
formatted order ticket — image file, size, and shipping address — that you
enter into ROES yourself. It's a couple minutes of data entry per order, not
zero-touch, but it's the closest realistic setup without Richard building you
a custom integration.

Worth asking Richard's team directly whether they offer any bulk/CSV upload
or wholesale ordering option for regular clients — some labs do this
off their public site.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - Stripe secret key + webhook secret (from your Stripe dashboard)
   - A [Resend](https://resend.com) API key (free tier is fine) for sending
     you the order ticket emails — swap for any other email API if you
     prefer
3. Add your images to `public/images/`
4. Add each print to `lib/products.ts` — slug, title, description, image
   filename. Prices per size live in the `SIZES` array at the top of that
   file; edit those to match your margin over what Richard charges you.
5. `npm run dev` to preview locally
6. Deploy to Vercel, then in Stripe's dashboard point a webhook at
   `https://yourdomain.com/api/webhook` listening for
   `checkout.session.completed`

## Adding a new print

Open `lib/products.ts`, copy one block in the `PRODUCTS` array, change the
slug/title/description/imageFile, drop the image in `public/images/`. That's
the whole workflow — no code changes needed elsewhere.
