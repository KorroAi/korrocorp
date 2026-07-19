"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

interface Props {
  repo: GitHubRepo;
}

export default function FeaturedProject({ repo }: Props) {
  return (
    <section className="py-20 sm:py-28 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Featured project</span>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] border border-border/50">
              {repo.name === "solana-agent-mcp" ? (
                <img src="/solana-agent-mcp.png" alt="Solana Agent MCP" className="w-full h-auto rounded-2xl" />
              ) : repo.name === "korroresearch" ? (
                <img src="/korroresearch.png" alt="KORRO Research" className="w-full h-auto rounded-2xl" />
              ) : repo.name === "onklaud-5" ? (
                <img src="/onklaud5.png" alt="Onklaud 5 Pipeline" className="w-full h-auto rounded-2xl" />
              ) : repo.name === "korrodesign" ? (
                <img src="/korrodesign.png" alt="KorroDesign" className="w-full h-auto" />
              ) : (
                <div className="bg-[#0d1117]">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                    <span className="ml-3 font-[family-name:var(--font-mono)] text-xs text-white/40">KorroAi/{repo.name}</span>
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center aspect-[4/3]">
                    <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white capitalize">{repo.name}</span>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-[family-name:var(--font-mono)]">
                        {repo.language || "Code"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-[family-name:var(--font-mono)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {repo.stargazers_count}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col gap-5">
              <div className="flex items-center gap-3 text-sm text-body">
                <span className="inline-flex items-center gap-1.5 font-medium">Featured</span>
                <span>|</span><span>{repo.language || "Code"}</span><span>|</span><span>2026</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink tracking-[-0.02em] capitalize">{repo.name}</h2>
              <p className="text-lg text-body leading-relaxed">{repo.description || "A KORRO open source project."}</p>
              {repo.name === "korroresearch" ? (
                <p className="text-body leading-relaxed">From blank page to venue-compliant PDF in 60 seconds. Nine formats, eight verification engines, zero hallucinations. Every claim verified, every citation real, every page professionally typeset.</p>
              ) : repo.name === "solana-agent-mcp" ? (
                <p className="text-body leading-relaxed">MCP server giving AI agents full read/write access to Solana. Check balances, send SOL, swap via Jupiter, scan pump.fun, trade memecoins. Zero API keys. AGPL-3.0.</p>
              ) : repo.name === "onklaud-5" ? (
                <p className="text-body leading-relaxed">A multi-model fusion pipeline that matches Fable 5 at 1/100th the cost. Two independent models review every line of code. 57% of tasks resolved at $0. Immune memory that learns from every failure. Fully open source.</p>
              ) : (
                <p className="text-body leading-relaxed">Built with production grade engineering. Open source, MIT licensed, ready to clone and run.</p>
              )}
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4 transition-all mt-1">View project <ArrowIcon /></a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
