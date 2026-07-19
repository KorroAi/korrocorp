import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korromarket — Premium tools for AI developers.",
  description:
    "A curated marketplace of exceptional AI AI tools. One-time purchase. No subscriptions. Coming soon.",
  openGraph: {
    title: "Korromarket — Premium tools for AI developers.",
    description:
      "A curated marketplace of exceptional AI AI tools. One-time purchase. Coming soon.",
    siteName: "Korrocorp",
    type: "website",
  },
};

export default function KorromarketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
