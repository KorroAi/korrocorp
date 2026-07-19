import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement confirme — Korro Lens",
  description: "Votre paiement a ete confirme. Votre licence Korro Lens vous sera envoyee par email.",
};

function CheckCircleIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function KorroLensSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/20 flex items-center justify-center text-[#58a6ff] mb-6">
        <CheckCircleIcon />
      </div>

      <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
        Paiement confirme !
      </h1>

      <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
        Votre cle de licence vous sera envoyee par email dans les minutes qui
        suivent. Telechargez Korro Lens ci-dessous et activez le avec votre
        cle.
      </p>

      <a
        href="/downloads/korro-lens-setup.exe"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#58a6ff] to-[#4688d8] hover:from-[#4688d8] hover:to-[#58a6ff] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#58a6ff]/25 hover:shadow-[#58a6ff]/40 active:scale-[0.98]"
      >
        <DownloadIcon />
        Telecharger Korro Lens
      </a>

      <p className="mt-6 text-sm text-gray-500">
        Windows 10/11 — Version 1.0
      </p>

      <div className="mt-12">
        <a
          href="/korro-lens"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Retour a la page produit
        </a>
      </div>

      {/* Footer */}
      <div className="mt-auto py-8">
        <span className="text-sm text-gray-600">
          Korrocorp — Built by AI. Shipped by KORRO.
        </span>
      </div>
    </div>
  );
}
