// Prodigi print fulfillment — creates a real print order via their API.
//
// SETUP REQUIRED BEFORE THIS WORKS:
// 1. Create a Prodigi account at prodigi.com, grab your Sandbox API key
//    first (Settings > Integrations > API) — test with Sandbox before
//    ever touching Live, since Live orders actually print and ship.
// 2. Fill in SIZE_TO_SKU below with the real C-type SKUs for your sizes.
//    Find these in your Prodigi dashboard's product catalogue (search
//    "C-type" / chromogenic prints) — sizes/SKUs vary by exact finish
//    (lustre/gloss/metallic) so pick one and copy its SKU per size.
// 3. Run scripts/upload-originals.mjs to host your full-resolution
//    originals on Vercel Blob and generate lib/originals-map.json —
//    that's what this file reads image URLs from below.

import originalsMap from "./originals-map.json";

const PRODIGI_API_BASE = process.env.PRODIGI_SANDBOX === "true"
  ? "https://api.sandbox.prodigi.com/v4.0"
  : "https://api.prodigi.com/v4.0";

// Fill these in with your five real SKUs from Prodigi's dashboard.
export const SIZE_TO_SKU: Record<string, string> = {
  "4x6": "GLOBAL-PHO-4X6-PRO",
  "8x12": "GLOBAL-PHO-8X12-PRO",
  "12x18": "GLOBAL-PHO-12X18-PRO",
  "16x24": "GLOBAL-PHO-16X24-PRO",
  "20x30": "GLOBAL-PHO-20X30-PRO",
};

// Finish is set via an order-item attribute, not the SKU — verify the
// exact attribute key + value Prodigi expects for these SKUs by running:
//   curl -H "X-API-Key: YOUR_KEY" https://api.sandbox.prodigi.com/v4.0/products/GLOBAL-PHO-4X6-PRO
// and checking the returned attribute schema before trusting this value.
const PRINT_ATTRIBUTES = { finish: "lustre" };

type Address = {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string; // 2-letter ISO code, e.g. "US"
  email?: string;
};

export async function createProdigiOrder({
  sizeKey,
  imageFile,
  shipTo,
  merchantOrderId,
}: {
  sizeKey: string;
  imageFile: string; // filename in your full-res originals store
  shipTo: Address;
  merchantOrderId: string; // your own order id (e.g. Stripe session id) for tracking
}) {
  const sku = SIZE_TO_SKU[sizeKey];
  if (!sku) throw new Error(`No Prodigi SKU configured for size "${sizeKey}"`);

  const assetUrl = (originalsMap as Record<string, string>)[imageFile];
  if (!assetUrl) {
    throw new Error(
      `No hosted original found for "${imageFile}" in lib/originals-map.json — run scripts/upload-originals.mjs`
    );
  }

  const payload = {
    merchantReference: merchantOrderId,
    shippingMethod: "Standard",
    recipient: {
      name: shipTo.name,
      email: shipTo.email,
      address: {
        line1: shipTo.line1,
        line2: shipTo.line2 || undefined,
        postalOrZipCode: shipTo.postalCode,
        countryCode: shipTo.country,
        townOrCity: shipTo.city,
        stateOrCounty: shipTo.state || undefined,
      },
    },
    items: [
      {
        sku,
        copies: 1,
        sizing: "fillPrintArea",
        attributes: PRINT_ATTRIBUTES,
        assets: [{ printArea: "default", url: assetUrl }],
      },
    ],
  };

  const res = await fetch(`${PRODIGI_API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.PRODIGI_API_KEY!,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Prodigi order failed: ${data.statusText || res.status} — ${JSON.stringify(data)}`);
  }

  return data;
}
