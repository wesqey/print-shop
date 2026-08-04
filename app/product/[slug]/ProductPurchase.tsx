"use client";

import { useState } from "react";
import { SIZES } from "@/lib/products";

export default function ProductPurchase({ slug }: { slug: string }) {
  const [size, setSize] = useState(SIZES[1].key);
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, size }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong starting checkout.");
    }
  }

  const selected = SIZES.find((s) => s.key === size)!;

  return (
    <div style={{ marginTop: 14, borderTop: "1px dashed #c3d3e2", paddingTop: 14 }}>
      <label style={{ fontSize: 12, fontWeight: "bold", color: "#556", display: "block", marginBottom: 6 }}>
        Choose a size:
      </label>
      <select
        value={size}
        onChange={(e) => setSize(e.target.value as any)}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: 13,
          border: "1px solid #a9bdd1",
          borderRadius: 4,
          marginBottom: 12,
          background: "#fff",
        }}
      >
        {SIZES.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label} — ${(s.priceCents / 100).toFixed(2)}
          </option>
        ))}
      </select>
      <button onClick={handleBuy} disabled={loading} className="btn-glossy" style={{ width: "100%", border: "none" }}>
        {loading ? "Please wait..." : `Buy Now — $${(selected.priceCents / 100).toFixed(2)}`}
      </button>
    </div>
  );
}
