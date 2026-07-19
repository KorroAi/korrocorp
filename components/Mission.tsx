"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const EXAMPLES = [
  { name: "Onklaud 5", desc: "Multi-model verification pipeline. Two independent models review every line of code. 57% of tasks resolved at zero cost." },
  { name: "Oddly", desc: "Claude Code skill that scans SEC filings for odd-lot tender offers. Finds stock buybacks where anyone holding 99 shares or fewer gets priority — institutions are excluded by federal regulation." },
  { name: "Mue X", desc: "The universal agent runtime. One backbone that gives any AI model memory, context, and the ability to execute." },
];

export default function Mission() {
  return (
    <section id="projects" className="py-20 sm:py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.06)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">What we believe</span>
          <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-medium leading-relaxed mt-6">
            We don't do half finished work. Everything we release is complete, tested, and ready to run on your machine.
          </p>
          <p className="mt-6 text-white/40 text-lg leading-relaxed max-w-xl mx-auto">
            Three products. Each one built from scratch by AI agents. Each one solving a real problem. No filler. No abandoned repos. Just working code.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {EXAMPLES.map((ex, i) => (
            <motion.div key={ex.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/[0.07] hover:border-white/20 transition-all">
              <span className="font-[family-name:var(--font-mono)] text-xs text-accent/70">0{i + 1}</span>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mt-2">{ex.name}</h3>
              <p className="text-sm text-white/50 leading-relaxed mt-2">{ex.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mt-10 flex items-center justify-center gap-4">
          <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all active:scale-[0.97]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Watch us build
          </a>
        </motion.div>
      </div>
    </section>
  );
}
