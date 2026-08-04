// Edit this file to add prints, change prices, or take something off sale.
// Prices are in cents (USD). Set your own margin on top of what Prodigi charges you per size.

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
  imageFile: string; // filename in /public/images — must match exactly, including spaces/punctuation
};

export const PRODUCTS: Product[] = [
  { slug: "11-0", title: "11-0", description: "", imageFile: "11-0.jpg" },
  { slug: "absinthe-leaves", title: "Absinthe Leaves", description: "", imageFile: "Absinthe Leaves.jpg" },
  { slug: "across-the-street-from-wicker-park", title: "Across the Street From 'Wicker Park'", description: "", imageFile: "Across the Street From 'Wicker Park'.jpg" },
  { slug: "after-the-show", title: "After The Show", description: "", imageFile: "After The Show.jpg" },
  { slug: "als-lamp-and-chair", title: "Al's Lamp and Chair", description: "", imageFile: "Al's Lamp and Chair.jpg" },
  { slug: "boy-building-computer", title: "Boy Building Computer", description: "", imageFile: "Boy Building Computer.jpg" },
  { slug: "daughter-mother", title: "Daughter & Mother", description: "", imageFile: "Daughter & Mother.jpg" },
  { slug: "dd", title: "DD", description: "", imageFile: "DD.jpg" },
  { slug: "early-onset-dimentia", title: "Early Onset Dimentia", description: "", imageFile: "Early Onset Dimentia.jpg" },
  { slug: "edzo", title: "Edzo", description: "", imageFile: "Edzo.jpg" },
  { slug: "ep", title: "EP", description: "", imageFile: "EP.jpg" },
  { slug: "feller", title: "Feller", description: "", imageFile: "Feller.jpg" },
  { slug: "friend", title: "Friend", description: "", imageFile: "Friend.jpg" },
  { slug: "gaming-cafe", title: "Gaming Cafe", description: "", imageFile: "Gaming Cafe.jpg" },
  { slug: "green-white", title: "Green & White", description: "", imageFile: "Green & White.jpg" },
  { slug: "hank-and-his-omega", title: "Hank and his Omega", description: "", imageFile: "Hank and his Omega.jpg" },
  { slug: "hazel", title: "Hazel", description: "", imageFile: "Hazel.jpg" },
  { slug: "highway-in-the-middle-of-the-country", title: "Highway in the middle of the country", description: "", imageFile: "Highway in the middle of the country.jpg" },
  { slug: "i-have-your-shirt", title: "I Have Your Shirt", description: "", imageFile: "I Have Your Shirt.jpg" },
  { slug: "npc", title: "NPC", description: "", imageFile: "NPC.jpg" },
  { slug: "person-not-allowed-in-onsen", title: "Person Not Allowed in Onsen", description: "", imageFile: "Person Not Allowed in Onsen.jpg" },
  { slug: "redbull-and-10-wagyu", title: "Redbull and $10 Wagyu", description: "", imageFile: "Redbull and $10 Wagyu.jpg" },
  { slug: "self-portrait-1", title: "Self Portrait 1", description: "", imageFile: "Self Portrait 1.jpg" },
  { slug: "self-portrait", title: "Self Portrait", description: "", imageFile: "Self Portrait.jpg" },
  { slug: "sudafed", title: "Sudafed", description: "", imageFile: "Sudafed.jpg" },
  { slug: "toilets", title: "Toilets", description: "", imageFile: "Toilets.jpg" },
  { slug: "tricycle", title: "Tricycle", description: "", imageFile: "Tricycle.jpg" },
  { slug: "untitled-1", title: "Untitled 1", description: "", imageFile: "Untitled 1.jpg" },
  { slug: "untitled", title: "Untitled", description: "", imageFile: "Untitled.jpg" },
  { slug: "urgent-care", title: "Urgent Care", description: "", imageFile: "Urgent Care.jpg" },
  { slug: "wicker-park", title: "Wicker Park", description: "", imageFile: "Wicker Park.jpg" },
  { slug: "wires-and-wooden-pole", title: "Wires and Wooden Pole", description: "", imageFile: "Wires and Wooden Pole.jpg" },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSize(key: string) {
  return SIZES.find((s) => s.key === key);
}