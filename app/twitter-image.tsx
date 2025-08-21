import { ImageResponse } from "next/og";
import { OGImage } from "./opengraph-image";

export const runtime = "edge";

export const alt = "Archaic Horizon - Electronic Music Label";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(<OGImage />, {
    ...size,
  });
}
