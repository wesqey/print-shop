# Print Shop

Storefront: gallery → product page with size picker → Stripe Checkout →
order automatically submitted to Prodigi for C-type print fulfillment
and shipping. No manual order entry required.

## How it works

1. Customer buys a print + size via Stripe Checkout.
2. On payment, the webhook (`app/api/webhook/route.ts`) calls
   `createProdigiOrder()` (`lib/prodigi.ts`), which submits the order
   to Prodigi's API — image, size/SKU, and shipping address.
3. Prodigi prints (C-type, chromogenic — continuous-tone, no dot
   pattern) and ships directly to the customer.
4. You get a confirmation email either way. If the Prodigi API call
   fails for any reason, you instead get an "ACTION NEEDED" email
   with the full order details so you can place it manually as a
   fallback — nothing silently gets lost.

## Setup

### 1. Stripe & email
Same as before — Stripe secret key + webhook secret, and a
[Resend](https://resend.com) key for order emails.

### 2. Prodigi
1. Create an account at [prodigi.com](https://www.prodigi.com) — this
   gives you both a Sandbox key (safe testing, nothing actually
   prints/ships) and a Live key.
2. Dashboard → Settings → Integrations → API → copy your Sandbox
   `X-API-Key` into `PRODIGI_API_KEY`, and set `PRODIGI_SANDBOX=true`
   while testing.
3. In the dashboard's product catalogue, search for **C-type** (aka
   chromogenic / silver halide) prints, pick a finish (lustre, gloss,
   or metallic), and find the SKU for each of your five sizes.
   Paste them into `SIZE_TO_SKU` in `lib/prodigi.ts`, replacing the
   `REPLACE_WITH_REAL_SKU_*` placeholders. Note: 4×6 and 8×12 may not
   exist as standard SKUs in every product line — verify all five
   sizes actually exist for C-type before going live, and swap in a
   close alternative for any that don't.
4. Test a full order end-to-end in Sandbox before switching
   `PRODIGI_SANDBOX=false` and using your Live key.

### 3. Hosting your full-resolution originals (Vercel Blob)
Prodigi downloads the print file from a URL you give it — it doesn't
accept direct uploads. So your **full-res masters** (not the
compressed previews in `public/images`) need to live somewhere with a
fetchable URL. This project uses Vercel Blob since you're deploying
on Vercel anyway — same dashboard, no separate cloud account.

1. Vercel dashboard → your project → **Storage** tab → **Create
   Database** → **Blob**. Once created, Vercel automatically adds
   `BLOB_READ_WRITE_TOKEN` to your project's environment variables.
2. For local use (so the upload script can run from your machine),
   copy that same token into `.env.local`.
3. `npm install` (pulls in `@vercel/blob`)
4. Run:
   ```
   node scripts/upload-originals.mjs "/path/to/your/full-res/originals"
   ```
   Filenames in that folder must exactly match the `imageFile` values
   in `lib/products.ts` — same name, just the real full-resolution
   file instead of the compressed web preview.
5. This uploads everything and writes `lib/originals-map.json`,
   mapping each filename to its hosted URL. `lib/prodigi.ts` reads
   from this file when submitting an order — no manual URL-building,
   no guessing.
6. Re-run any time you add or replace an original; it just
   re-uploads and rewrites the map.

Note: this uploads as **public** (anyone with the exact URL could
view/download a given file), since Prodigi's API needs a directly
fetchable URL. The URLs aren't discoverable/listed anywhere though —
only Prodigi (and you) ever see them.

### 4. Everything else
Same as before: add images to `public/images/`, catalog entries to
`lib/products.ts`, `npm run dev` to preview, deploy to Vercel, point
a Stripe webhook at `/api/webhook`.

## Adding a new print

Copy a block in `PRODUCTS` in `lib/products.ts` (slug, title,
description, imageFile — the web preview filename), add the matching
web preview to `public/images/`, and upload the full-res original to
your originals bucket under the same filename.
