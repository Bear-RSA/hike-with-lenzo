import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site.config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Guided hikes in Cape Town`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Guided hikes in Cape Town`,
    description: site.description,
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
    images: [{ url: site.logo, width: 1200, height: 1200, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: [site.logo] },
};

export const viewport: Viewport = {
  themeColor: "#32364F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
