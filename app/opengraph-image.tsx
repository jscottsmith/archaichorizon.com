import { ImageResponse } from "next/og";
import Logo from "./components/Logo";

export const runtime = "edge";

export const alt = "Archaic Horizon - Electronic Music Label";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export function OGImage() {
  return (
    <div
      style={{
        background: `radial-gradient(circle at center center, #f2ebc7 0%, #9dd1fc 50%, #6d78a1)`,
        backgroundColor: "#fcfaa7",
        backgroundSize: "200% 200%",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
      }}
    >
      <Logo style={{ color: "#111" }} width={500} />
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(<OGImage />, {
    ...size,
  });
}
