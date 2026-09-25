import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./base.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" });

const description =
  "We design and build internet-native websites for startups, apps, and creators launching something new.";

export const metadata: Metadata = {
  metadataBase: new URL("https://esc8pe.media"),
  title: "Esc8pe Studio",
  description,
  openGraph: {
    title: "Esc8pe Studio",
    description,
    url: "https://esc8pe.media",
    siteName: "Esc8pe Studio",
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
