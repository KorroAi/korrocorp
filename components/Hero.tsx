"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

interface Props {
  repoCount: number;
  followerCount: number;
}

export default function Hero({ repoCount, followerCount }: Props) {
  return (
    <section className="relative min-h-[90dvh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F0] via-[#FFFDF7] to-[#F0F7FF]" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal/5 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />

      <div className="max-w-4xl mx-auto px-6 w-full text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full mb-8 font-[family-name:var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> AI company. No compromises.
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-bold text-ink leading-[1.02] tracking-[-0.04em]">
            Korrocorp
          </h1>
          <p className="mt-6 text-lg sm:text-2xl text-body leading-relaxed max-w-2xl mx-auto">
            We ship real software. Production ready. No exceptions.
          </p>
          <p className="mt-3 text-sm text-body/50 italic">Everything we build is complete, documented, and yours to use.</p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href="/research" className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-hover transition-all active:scale-[0.97] shadow-[0_4px_20px_-4px_rgba(255,107,53,0.4)]">
              Try Korroresearch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/korromarket" className="group inline-flex items-center gap-2 bg-[#3b82f6] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#2563eb] transition-all active:scale-[0.97] shadow-[0_4px_20px_-4px_rgba(59,130,246,0.4)]">
              Korromarket
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink font-semibold px-7 py-3.5 rounded-full border-2 border-ink/15 hover:border-ink/40 transition-all active:scale-[0.97] hover:bg-ink/[0.02]">
              github.com/KorroAi
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-6 sm:gap-10 justify-center">
            {[
              { value: repoCount || "...", label: "Projects shipped" },
              { value: followerCount || "...", label: "Watching us build" },
              { value: "100%", label: "Completion rate" },
            ].map((s) => (
              <motion.div key={s.label} whileHover={{ scale: 1.05 }} className="transition-all">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-ink tabular-nums">{s.value}</span>
                <p className="text-sm text-body mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
