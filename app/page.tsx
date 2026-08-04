import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="header-bar">
        <h1>My Print Shop</h1>
        <p>fine art prints &middot; shipped right to your door!</p>
      </div>

      <div className="content">
        <p style={{ fontSize: 13, color: "#556", marginTop: 0 }}>
          Welcome! Browse the gallery below and click a photo to order a print in the size of
          your choice. <span className="badge">SECURE CHECKOUT</span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 18,
          }}
        >
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
              <div className="panel">
                <div
                  style={{
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    border: "1px solid #cdd9e4",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={`/images/${p.imageFile}`}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ fontSize: 13, fontWeight: "bold", color: "#2a5ba8" }}>
                  {p.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-note">&copy; {new Date().getFullYear()} My Print Shop — all rights reserved</div>
    </div>
  );
}
