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
// 3. Your full-resolution ORIGINAL files (not the compressed web
//    previews in public/images) need to be hosted somewhere with a
//    fetchable URL — Prodigi downloads from a URL, it doesn't accept
//    direct uploads. See ORIGINALS_BASE_URL below.

const PRODIGI_API_BASE = process.env.PRODIGI_SANDBOX === "true"
  ? "https://api.sandbox.prodigi.com/v4.0"
  : "https://api.prodigi.com/v4.0";

// Fill these in with real SKUs from your Prodigi dashboard's C-type product catalogue.
export const SIZE_TO_SKU: Record<string, string> = {
  "4x6": "REPLACE_WITH_REAL_SKU_4x6",
  "8x12": "REPLACE_WITH_REAL_SKU_8x12",
  "12x18": "REPLACE_WITH_REAL_SKU_12x18",
  "16x24": "REPLACE_WITH_REAL_SKU_16x24",
  "20x30": "REPLACE_WITH_REAL_SKU_20x30",
};

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

  const originalsBase = process.env.ORIGINALS_BASE_URL;
  if (!originalsBase) throw new Error("ORIGINALS_BASE_URL is not set");

  const assetUrl = `${originalsBase.replace(/\/$/, "")}/${imageFile}`;

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
