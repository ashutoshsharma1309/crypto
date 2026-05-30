import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Destiny Protocol — the inheritance layer for digital wealth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 90% at 50% 120%, rgba(200,162,74,0.22), #0A0908 55%)",
          padding: "72px",
          color: "#ECE6DC",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: "rgba(200,162,74,0.35)",
              border: "2px solid #C8A24A",
              transform: "rotate(45deg)",
            }}
          />
          Destiny Protocol
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              lineHeight: 1.05,
              maxWidth: 920,
              letterSpacing: -1,
            }}
          >
            <span style={{ marginRight: 18 }}>The</span>
            <span style={{ color: "#E3BE63", marginRight: 18 }}>
              inheritance layer
            </span>
            <span>for digital wealth.</span>
          </div>
          <div style={{ fontSize: 28, color: "#A79E90", maxWidth: 820 }}>
            Non-custodial, encrypted, automatic — so your legacy outlasts you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#6F685D",
          }}
        >
          destinypro.io · Ethereum · BNB Chain · IPFS · LayerZero
        </div>
      </div>
    ),
    { ...size }
  );
}
