import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductPurchase from "./ProductPurchase";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="page-shell">
      <div className="header-bar">
        <h1>My Print Shop</h1>
        <p>fine art prints &middot; shipped right to your door!</p>
      </div>

      <div className="content">
        <Link href="/" style={{ fontSize: 12 }}>
          &laquo; Back to gallery
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 24,
            marginTop: 16,
          }}
        >
          <div className="panel">
            <img
              src={`/images/${product.imageFile}`}
              alt={product.title}
              style={{ width: "100%", display: "block", borderRadius: 3 }}
            />
          </div>

          <div className="panel">
            <h2 style={{ margin: "0 0 6px", fontSize: 20, color: "#2a5ba8" }}>{product.title}</h2>
            <p style={{ fontSize: 13, color: "#556", lineHeight: 1.5 }}>{product.description}</p>
            <ProductPurchase slug={product.slug} />
          </div>
        </div>
      </div>

      <div className="footer-note">&copy; {new Date().getFullYear()} My Print Shop — all rights reserved</div>
    </div>
  );
}
