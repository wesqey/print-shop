import { getProduct, PRODUCTS } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductPurchase from "./ProductPurchase";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();
  const index = PRODUCTS.findIndex((p) => p.slug === product.slug);

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px 120px" }}>
      <Link href="/" className="mono" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>
        ← ARCHIVE
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 56,
          marginTop: 32,
        }}
      >
        <div
          style={{
            aspectRatio: "4/5",
            background: "var(--bg-raised)",
            border: "1px solid var(--line)",
            overflow: "hidden",
          }}
        >
          <img
            src={`/images/${product.imageFile}`}
            alt={product.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ paddingTop: 8 }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
            PL. {String(index + 1).padStart(2, "0")}
          </div>
          <h1 style={{ fontSize: 34, fontStyle: "italic", fontWeight: 500, margin: "0 0 20px" }}>
            {product.title}
          </h1>
          <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 40, fontSize: 17 }}>
            {product.description}
          </p>
          <ProductPurchase slug={product.slug} />
        </div>
      </div>
    </main>
  );
}
