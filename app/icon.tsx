import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: a gilded diamond mark on warm ink. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0908",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            background: "rgba(200,162,74,0.4)",
            border: "2px solid #C8A24A",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
