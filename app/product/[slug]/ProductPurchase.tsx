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
    <div>
      <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
        SIZE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {SIZES.map((s) => (
          <label
            key={s.key}
            className="mono"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 14px",
              border: `1px solid ${size === s.key ? "var(--accent)" : "var(--line)"}`,
              cursor: "pointer",
              fontSize: 13,
              color: size === s.key ? "var(--fg)" : "var(--muted)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="radio"
                name="size"
                value={s.key}
                checked={size === s.key}
                onChange={() => setSize(s.key)}
                style={{ accentColor: "var(--accent)" }}
              />
              {s.label}
            </span>
            <span>${(s.priceCents / 100).toFixed(2)}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleBuy}
        disabled={loading}
        className="mono"
        style={{
          width: "100%",
          padding: "16px 24px",
          fontSize: 13,
          letterSpacing: "0.08em",
          background: "var(--fg)",
          color: "var(--bg)",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "REDIRECTING…" : `ORDER — $${(selected.priceCents / 100).toFixed(2)}`}
      </button>
    </div>
  );
}
