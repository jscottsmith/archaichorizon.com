import { ImageResponse } from "next/og";
import { IA } from "@/app/constants/ia";
import { getIdentifierByCatNo } from "@/app/constants/releaseMap";
import { getOriginalCoverArt, addCoverArtUrls } from "@/app/utils/files";
import { LogoAbbreviated } from "@/app/components/Logo";

export const runtime = "nodejs";

// Load Google Font function from Vercel guide
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ catNo: string }> }
) {
  const { catNo } = await params;

  try {
    // Map catalog number to the correct identifier
    const identifier = getIdentifierByCatNo(catNo);

    if (!identifier) {
      throw new Error(`Catalog number '${catNo}' not found`);
    }

    // Fetch metadata directly from Internet Archive
    const metadataUrl = `${IA.metadata.baseUrl}/${identifier}`;
    const response = await fetch(metadataUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.status}`);
    }

    const release = await response.json();
    const { metadata } = release;

    // Use helper functions to get cover art
    const originalCoverArt = getOriginalCoverArt(release.files, catNo);
    const coverArtWithUrls = addCoverArtUrls(originalCoverArt, identifier);
    const coverArtUrl = coverArtWithUrls[0]?.url || "";

    // Format artist name (handle array or string)
    const artistName = Array.isArray(metadata.creator)
      ? metadata.creator[0]
      : metadata.creator;

    // Format album title
    const albumTitle = metadata.title;

    // Load Geist fonts with different weights
    const geistFont300 = await loadGoogleFont(
      "Geist:wght@300",
      `${artistName} ${albumTitle}`
    );
    const geistFont400 = await loadGoogleFont(
      "Geist:wght@400",
      `${artistName} ${albumTitle}`
    );

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "100px 40px",
            position: "relative",
            overflow: "hidden",
            background: "#666",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {/* Blurred background image */}
          {coverArtUrl && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                paddingTop: "100%",
                aspectRatio: "1 / 1",
                backgroundImage: `url(${coverArtUrl})`,
                backgroundSize: "125% 125%",
                backgroundPosition: "-12.5% -12.5%",
                filter: "blur(150px) brightness(0.4) saturate(1.8)",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Cover Art */}
            {coverArtUrl && (
              <div
                style={{
                  width: "350px",
                  height: "350px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  //   border: "2px solid rgba(255, 255, 255, 0.1)",
                  flexShrink: 0,
                  backgroundImage: `url(${coverArtUrl})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "0 0",
                }}
              />
            )}

            {/* Text Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: "72px",
                  fontWeight: 300,
                  lineHeight: 1,
                  fontFamily: "Geist",
                  textWrap: "balance",
                }}
              >
                {artistName}
              </div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  fontFamily: "Geist",
                  textWrap: "balance",
                }}
              >
                {albumTitle}
              </div>
            </div>
          </div>
          {/* Header */}
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              padding: "40px",
            }}
          >
            <LogoAbbreviated
              style={{
                width: 73,
                height: 35,
              }}
            />
            <div
              style={{
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: "0.7em",
                textTransform: "uppercase",
                fontFamily: "Geist",
              }}
            >
              Archaic Horizon
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: geistFont300,
            style: "normal",
            weight: 300,
          },
          {
            name: "Geist",
            data: geistFont400,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch {
    return new Response("Error generating image", { status: 500 });
  }
}
