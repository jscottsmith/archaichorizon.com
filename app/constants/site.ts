// Site metadata and configuration constants

export const SITE = {
  name: "Archaic Horizon",
  description:
    "Electronic music label and collection featuring experimental and ambient sounds",
  shortDescription: "Electronic music label and collection",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  creator: "@archaichorizon",
  email: "archaichorizon@gmail.com",
  keywords: [
    "electronic music",
    "ambient",
    "experimental",
    "music label",
    "archaic horizon",
    "net label",
  ],
  authors: [{ name: "Archaic Horizon" }],
  category: "music",
  language: "en",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    siteName: "Archaic Horizon",
    defaultImage: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Archaic Horizon - Electronic Music Label",
    },
  },
  twitter: {
    card: "summary_large_image" as const,
    site: "@archaichorizon",
    creator: "@archaichorizon",
    images: {
      url: "/twitter-image",
      width: 1200,
      height: 630,
      alt: "Archaic Horizon - Electronic Music Label",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
