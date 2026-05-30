import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";

// Editorial display face.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Clean grotesque body face.
const text = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
  weight: ["400", "500", "600"],
});

const url = `https://${site.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} — The inheritance layer for digital wealth`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital inheritance",
    "crypto inheritance",
    "non-custodial",
    "estate planning",
    "blockchain",
    "property registry",
    "Destiny Protocol",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `${site.name} — The inheritance layer for digital wealth`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — The inheritance layer for digital wealth`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="grain antialiased">
        <Loader />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
