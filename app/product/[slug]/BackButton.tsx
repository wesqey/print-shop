"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mono"
      style={{
        fontSize: 12,
        color: "var(--muted)",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      ← ARCHIVE
    </button>
  );
}