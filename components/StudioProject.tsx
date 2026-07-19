"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function StudioProject() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-[#FFF5F0] to-[#FDF8F5] border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Design tool</span>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col gap-5 lg:order-2">
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink tracking-[-0.02em]">Korro Studio</h2>
              <p className="text-lg text-body leading-relaxed">A design system that kills AI slop. Taste guardian built in. The design copilot that makes your interfaces impossible to ignore.</p>
              <p className="text-body leading-relaxed">7 phase design process. ESLint plugin with 14 AST level rules. No more purple gradients and default drop shadows.</p>
              <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4 transition-all mt-1">View project <ArrowIcon /></a>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] border border-border/50 lg:order-1">
              <img src="/korro-studio.png" alt="Korro Studio" className="w-full aspect-[4/3] object-cover outline-1 outline-black/[0.06]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
