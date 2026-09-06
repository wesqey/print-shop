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
  { slug: "11-0", title: "11-0", description: "42.04496102588328, -87.68470056012883", imageFile: "11-0.jpg" },
  { slug: "absinthe-leaves", title: "Absinthe Leaves", description: "42.04129813683762, -87.6800048214011", imageFile: "Absinthe Leaves.jpg" },
  { slug: "across-the-street-from-wicker-park", title: "Across the Street From 'Wicker Park'", description: "41.911090890897256, -87.6768806452824", imageFile: "Across the Street From 'Wicker Park'.jpg" },
  { slug: "after-the-show", title: "After The Show", description: "", imageFile: "After The Show.jpg" },
  { slug: "als-lamp-and-chair", title: "Al's Lamp and Chair", description: "42.02274730042543, -87.69112784788534", imageFile: "Al's Lamp and Chair.jpg" },
  { slug: "boy-building-computer", title: "Boy Building Computer", description: "42.04496102588328, -87.68470056012883", imageFile: "Boy Building Computer.jpg" },
  { slug: "daughter-mother", title: "Daughter & Mother", description: "41.8928416289724, -87.61475514751457", imageFile: "Daughter & Mother.jpg" },
  { slug: "dd", title: "DD", description: "41.8928416289724, -87.61475514751457", imageFile: "DD.jpg" },
  { slug: "early-onset-dimentia", title: "Early Onset Dimentia", description: "42.04648053477297, -87.68091843701593", imageFile: "Early Onset Dimentia.jpg" },
  { slug: "edzo", title: "Edzo", description: "42.046190774549444, -87.6815443780317", imageFile: "Edzo.jpg" },
  { slug: "ep", title: "EP", description: "", imageFile: "EP.jpg" },
  { slug: "feller", title: "Feller", description: "41.90045729262837, -87.68663980266722", imageFile: "Feller.jpg" },
  { slug: "friend", title: "Friend", description: "42.04496102588328, -87.68470056012883", imageFile: "Friend.jpg" },
  { slug: "gaming-cafe", title: "Gaming Cafe", description: "", imageFile: "Gaming Cafe.jpg" },
  { slug: "green-white", title: "Green & White", description: "", imageFile: "Green & White.jpg" },
  { slug: "hank-and-his-omega", title: "Hank and his Omega", description: "", imageFile: "Hank and his Omega.jpg" },
  { slug: "hazel", title: "Hazel", description: "", imageFile: "Hazel.jpg" },
  { slug: "highway-in-the-middle-of-the-country", title: "Highway in the middle of the country", description: "39.60540583700719, -106.08281792251873", imageFile: "Highway in the middle of the country.jpg" },
  { slug: "i-have-your-shirt", title: "I Have Your Shirt", description: "42.04496102588328, -87.68470056012883", imageFile: "I Have Your Shirt.jpg" },
  { slug: "npc", title: "NPC", description: "35.69015438039614, 139.70379382836313", imageFile: "NPC.jpg" },
  { slug: "person-not-allowed-in-onsen", title: "Person Not Allowed in Onsen", description: "", imageFile: "Person Not Allowed in Onsen.jpg" },
  { slug: "redbull-and-10-wagyu", title: "Redbull and $10 Wagyu", description: "35.03522402939566, 135.73676493422929", imageFile: "Redbull and $10 Wagyu.jpg" },
  { slug: "self-portrait-1", title: "Self Portrait 1", description: "42.04496102588328, -87.68470056012883", imageFile: "Self Portrait 1.jpg" },
  { slug: "self-portrait", title: "Self Portrait", description: "42.04496102588328, -87.68470056012883", imageFile: "Self Portrait.jpg" },
  { slug: "sudafed", title: "Sudafed", description: "41.8928416289724, -87.61475514751457", imageFile: "Sudafed.jpg" },
  { slug: "toilets", title: "Toilets", description: "", imageFile: "Toilets.jpg" },
  { slug: "tricycle", title: "Tricycle", description: "", imageFile: "Tricycle.jpg" },
  { slug: "untitled-1", title: "Untitled 1", description: "", imageFile: "Untitled 1.jpg" },
  { slug: "untitled", title: "Untitled", description: "42.05232880128282, -87.66990069297032", imageFile: "Untitled.jpg" },
  { slug: "urgent-care", title: "Urgent Care", description: "10.267800544942348, -85.80984788231382", imageFile: "Urgent Care.jpg" },
  { slug: "wicker-park", title: "Wicker Park", description: "41.91255489242225, -87.67690686180852", imageFile: "Wicker Park.jpg" },
  { slug: "wires-and-wooden-pole", title: "Wires and Wooden Pole", description: "42.04599846263029, -87.6805484015924", imageFile: "Wires and Wooden Pole.jpg" },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSize(key: string) {
  return SIZES.find((s) => s.key === key);
}