// Edit this file to add prints, change prices, or take something off sale.
// Prices are in cents (USD). Set your own margin on top of what Richard charges you per size.

export type SizeKey = "4x6" | "8x12" | "12x18" | "16x24" | "20x30";

export const SIZES: { key: SizeKey; label: string; priceCents: number }[] = [
  { key: "4x6", label: '4 × 6"', priceCents: 1500 },
  { key: "8x12", label: '8 × 12"', priceCents: 3500 },
  { key: "12x18", label: '12 × 18"', priceCents: 6500 },
  { key: "16x24", label: '16 × 24"', priceCents: 11000 },
  { key: "20x30", label: '20 × 30"', priceCents: 16500 },
];

export type Product = {
  slug: string;
  title: string;
  description: string;
  imageFile: string; // filename in /public/images, also what you send to Richard
};

export const PRODUCTS: Product[] = [
  {
    slug: "example-print-1",
    title: "Untitled No. 1",
    description: "Add your own description here.",
    imageFile: "example-print-1.jpg",
  },
  // Add more prints here — copy the block above.
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSize(key: string) {
  return SIZES.find((s) => s.key === key);
}
