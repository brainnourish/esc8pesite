import type { Metadata, Viewport } from "next";
import { site } from "./site.config";
// Self-hosted so the page has no render-blocking request to Google.
import "@fontsource-variable/archivo";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Escape Reality",
  description: site.description,
  openGraph: {
    title: "Escape Reality",
    description: site.description,
    url: site.url,
    siteName: "Escape Reality",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escape Reality",
    description: site.description,
    images: ["/og.png"],
  },
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
