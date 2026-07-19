import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Korro Lens — Analyse IA de videosurveillance",
  description:
    "Transformez vos cameras de surveillance en systeme intelligent. Analyse post-evenement, conformite RGPD, 100% local. 799 EUR — licence perpetuelle.",
  openGraph: {
    title: "Korro Lens — Analyse IA de videosurveillance",
    description:
      "Transformez vos cameras de surveillance en systeme intelligent. 799 EUR, 100% local, conforme RGPD.",
    siteName: "Korrocorp",
    type: "website",
  },
};

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function CableIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L20 4" /><path d="M10 4l-6 6" /><path d="M14 20l6-6" />
    </svg>
  );
}

function ClickIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L12 6" /><path d="M12 18L12 22" /><path d="M4.93 4.93L7.76 7.76" /><path d="M16.24 16.24L19.07 19.07" /><path d="M2 12H6" /><path d="M18 12H22" /><path d="M4.93 19.07L7.76 16.24" /><path d="M16.24 7.76L19.07 4.93" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function KorroLensPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white">
            Korrocorp
          </a>
          <div className="flex items-center gap-4">
            <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#58a6ff]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#58a6ff]/8 via-[#bc8cff]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/20 text-[#58a6ff] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#58a6ff] animate-pulse" />
            Nouveau : Korro Lens
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Korro Lens{" "}
            <span className="bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent">
              L&apos;intelligence
            </span>
            <br />
            que vos cameras attendaient
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un logiciel. <strong className="text-white">799 EUR</strong>. Vos cameras deviennent intelligentes.
            Analysez des heures de videos en quelques minutes, sans cloud, sans abonnement force.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#58a6ff] to-[#4688d8] hover:from-[#4688d8] hover:to-[#58a6ff] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#58a6ff]/25 hover:shadow-[#58a6ff]/40 active:scale-[0.98] cursor-pointer"
              >
                Acheter maintenant <ArrowRightIcon />
              </button>
            </form>
            <a
              href="#comment-ca-marche"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Comment ca marche <ChevronDownIcon />
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Licence perpetuelle. Paiement unique. Essai gratuit de 7 jours.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Pourquoi Korro Lens ?
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Trois raisons qui font la difference.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[#58a6ff]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#58a6ff]/10 flex items-center justify-center text-[#58a6ff] mb-5 group-hover:scale-110 transition-transform">
                <SearchIcon />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-3">
                Analyse post-evenement
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Importez vos videos et recevez un rapport detaille en minutes. Detection de mouvements,
                reconnaissance d&apos;objets, suivi de personnes. Tout ce que vos cameras ont capture, analyse.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[#bc8cff]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#bc8cff]/10 flex items-center justify-center text-[#bc8cff] mb-5 group-hover:scale-110 transition-transform">
                <ShieldIcon />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-3">
                Conformite RGPD
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Aucune donnee ne quitte votre machine. Pas de cloud, pas d&apos;API externe, pas de transfert.
                Vos videos restent vos videos. Concu pour les entreprises soucieuses de leur conformite.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-[#58a6ff]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#58a6ff]/10 flex items-center justify-center text-[#58a6ff] mb-5 group-hover:scale-110 transition-transform">
                <ServerIcon />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-3">
                100% local
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Korro Lens tourne entierement sur votre machine. Pas besoin de connexion Internet
                apres activation. Performances optimales, latence zero, confidentialite absolue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="comment-ca-marche" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Comment ca marche
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Trois etapes. Aucune competence technique requise.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#58a6ff]/20 to-[#58a6ff]/5 border border-[#58a6ff]/20 flex items-center justify-center text-[#58a6ff] mx-auto mb-5 group-hover:scale-110 transition-transform">
                <CableIcon />
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#58a6ff]/20 text-[#58a6ff] text-xs font-bold mb-3">
                1
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-2">
                Branchez vos cameras
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connectez vos cameras existantes ou importez vos fichiers video. Korro Lens prend en charge
                la plupart des formats : MP4, AVI, H.264, H.265.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bc8cff]/20 to-[#bc8cff]/5 border border-[#bc8cff]/20 flex items-center justify-center text-[#bc8cff] mx-auto mb-5 group-hover:scale-110 transition-transform">
                <ClickIcon />
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#bc8cff]/20 text-[#bc8cff] text-xs font-bold mb-3">
                2
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-2">
                Cliquez Analyser
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Selectionnez la plage horaire, choisissez le type d&apos;analyse souhaite, et laissez
                l&apos;IA travailler. Aucun reglage complexe.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#58a6ff]/20 to-[#58a6ff]/5 border border-[#58a6ff]/20 flex items-center justify-center text-[#58a6ff] mx-auto mb-5 group-hover:scale-110 transition-transform">
                <ReportIcon />
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#58a6ff]/20 text-[#58a6ff] text-xs font-bold mb-3">
                3
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-2">
                Lisez le rapport
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Recevez un rapport clair avec horodatages, captures d&apos;ecran des moments cles,
                et resume des evenements detectes. Exportable en PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
            Tarification simple
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto">
            Pas de surprise. Un prix, une licence, a vie.
          </p>
          <div className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#58a6ff]/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="relative">
              <div className="text-sm font-medium text-[#58a6ff] uppercase tracking-wider mb-3">
                Licence perpetuelle
              </div>
              <div className="font-[family-name:var(--font-display)] text-6xl font-bold text-white mb-2">
                799 EUR
              </div>
              <p className="text-gray-400 mb-8">Paiement unique. Aucun abonnement obligatoire.</p>
              <ul className="space-y-3 text-left max-w-sm mx-auto mb-8">
                {[
                  "Licence a vie pour un poste",
                  "Toutes les fonctionnalites d'analyse",
                  "Mises a jour mineures incluses",
                  "Support par email prioritaire",
                  "Essai gratuit de 7 jours",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-0.5 text-[#58a6ff] shrink-0"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/api/checkout"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#58a6ff] to-[#4688d8] hover:from-[#4688d8] hover:to-[#58a6ff] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#58a6ff]/25 hover:shadow-[#58a6ff]/40 active:scale-[0.98]"
              >
                Acheter maintenant <ArrowRightIcon />
              </a>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/[0.03] border border-white/5 rounded-xl">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Maintenance optionnelle</strong> : 49 EUR/mois pour les
              mises a jour majeures, le support telephonique et les nouvelles fonctionnalites.
              Resiliable a tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Questions frequentes
          </h2>
          <p className="text-gray-400 text-center mb-14">
            Tout ce que vous devez savoir avant de vous lancer.
          </p>
          <div className="space-y-4">
            {[
              {
                q: "Korro Lens est il conforme au RGPD ?",
                a: "Absolument. Korro Lens fonctionne entierement en local sur votre machine. Aucune donnee video n'est transmise a un serveur tiers, aucun cloud n'est utilise. Vous restez le seul proprietaire de vos donnees, ce qui rend la solution conforme au RGPD par conception.",
              },
              {
                q: "Quels types de cameras sont compatibles ?",
                a: "Korro Lens est compatible avec la plupart des cameras IP du marche (Hikvision, Dahua, Axis, Reolink, etc.) via les protocoles RTSP et ONVIF. Vous pouvez egalement importer des fichiers video depuis des cameras non-IP ou des enregistreurs (DVR/NVR).",
              },
              {
                q: "Y a t il une periode d'essai ?",
                a: "Oui, nous proposons un essai gratuit de 7 jours, sans engagement et sans carte bancaire. Telechargez Korro Lens, testez toutes les fonctionnalites, et decidez ensuite si le produit correspond a vos besoins.",
              },
              {
                q: "Comment fonctionne le support technique ?",
                a: "Le support par email est inclus avec votre licence. Nous repondons en moins de 24h ouvrees. L'abonnement de maintenance optionnel (49 EUR/mois) inclut le support telephonique prioritaire et les mises a jour majeures.",
              },
            ].map((faq) => (
              <details key={faq.q} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-white/[0.07] transition-colors list-none">
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform shrink-0">
                    <ChevronDownIcon />
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
            Pret a passer au niveau superieur ?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Rejoignez les entreprises qui font confiance a Korro Lens pour leur analyse video.
          </p>
          <form action="/api/checkout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#58a6ff] to-[#4688d8] hover:from-[#4688d8] hover:to-[#58a6ff] text-white font-semibold px-10 py-4 rounded-xl transition-all shadow-lg shadow-[#58a6ff]/25 hover:shadow-[#58a6ff]/40 active:scale-[0.98] text-lg cursor-pointer"
            >
              Acheter maintenant — 799 EUR <ArrowRightIcon />
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            Essai gratuit de 7 jours. Sans engagement.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span className="font-[family-name:var(--font-display)] font-bold text-xl text-white">Korrocorp</span>
          <div className="flex items-center gap-4">
            <a href="mailto:contact.korro@gmail.com" className="hover:text-gray-300 transition-colors">contact.korro@gmail.com</a>
            <span className="text-gray-600">|</span>
            <span>Built by AI. Shipped by KORRO.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
