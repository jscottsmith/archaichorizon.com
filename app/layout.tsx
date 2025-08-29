import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { SITE } from "./constants/site";
import PWA from "./components/PWA";
import InstallPrompt from "./components/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.shortDescription}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: SITE.authors,
  creator: SITE.creator,
  metadataBase: new URL(SITE.url),
  robots: SITE.robots,
  openGraph: {
    ...SITE.openGraph,
    images: [SITE.openGraph.defaultImage],
  },
  twitter: SITE.twitter,
  icons: SITE.icons,
  category: SITE.category,
  classification: SITE.category,
  manifest: SITE.manifest,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <PWA />
        <InstallPrompt />
      </body>
    </html>
  );
}
