import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Korrocorp",
  description:
    "We build polished, complete software. Design systems, agent runtimes, developer tools. Real products, shipped.",
  openGraph: {
    title: "Korrocorp",
    description:
      "We build polished, complete software. Design systems, agent runtimes. Real products, shipped.",
    siteName: "Korrocorp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased grain-overlay`}
    >
      <head>
        <link rel="shortcut icon" href="/k-logo.ico" type="image/x-icon" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-body">
        {children}
      </body>
    </html>
  );
}
