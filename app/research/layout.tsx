import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korroresearch — AI Paper Generator & Reviewer",
  description:
    "Generate, verify, and improve research papers with 8 AI verification engines. Peer review simulation, citation checking, and submission readiness scoring. 9 formats supported.",
  openGraph: {
    title: "Korroresearch — AI Paper Generator & Reviewer",
    description:
      "Generate, verify, and improve research papers with 8 AI verification engines. Peer review, citations, readiness scoring.",
    siteName: "Korrocorp",
    type: "website",
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
