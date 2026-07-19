import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Onklaud5Page() {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">
                Fusion Model Pipeline
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl font-bold text-ink mt-4 tracking-[-0.02em] leading-[1.08]">
                Pipelines beat models.
              </h1>
              <p className="text-lg text-body mt-6 leading-relaxed max-w-lg">
                Onklaud 5 orchestrates three AI models through a structured council. 57% of tasks resolved at $0. Immune memory that learns. Quality gate that blocks broken code. All for cents per hour.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://github.com/KorroAi/onklaud-5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-all">
                  View on GitHub
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a href="#quickstart" className="inline-flex items-center gap-2 border border-border text-ink px-6 py-3 rounded-full font-semibold text-sm hover:bg-surface transition-all">
                  Get started
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)]">
              <img src="/onklaud5.png" alt="Onklaud 5 Pipeline Architecture" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12">
          {[
            ["57%", "tasks at $0"],
            ["100%", "syntax pass"],
            ["67%", "context reduction"],
            ["97%", "tests passed"],
            ["$0.01", "per hour"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-accent">{v}</div>
              <div className="text-xs text-body mt-1 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 bg-bg">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">The architecture</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink mt-4 tracking-[-0.02em]">Not a model. A pipeline.</h2>
          <p className="text-lg text-body mt-6 leading-relaxed">
            Single AI coding assistants have one brain doing everything — generating code AND reviewing it. Same blind spots. Same biases. Same mistakes. Onklaud 5 applies ensemble learning to code generation: three independent AIs from different providers, structured through a 6-stage council where nothing ships below a 10/10 quality threshold.
          </p>
          <div className="mt-8 p-6 rounded-xl bg-[#0d1117] border border-[#30363d] font-[family-name:var(--font-mono)] text-sm text-[#c9d1d9] leading-relaxed">
            Ponytail Ladder → GLM 5.2 Pre Design → Kimi K2.7 Code → Dual Review → GLM Arbitration → Gate 10/10 → Verify
          </div>
        </div>
      </section>

      {/* The 6 stages */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">How it works</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink mt-4 tracking-[-0.02em]">The 6 stage council</h2>
          <div className="mt-10 space-y-6">
            {[
              { step: "Step 0", title: "Ponytail Ladder", cost: "$0 · <100ms", desc: "Before any API call, checks if stdlib, native functions, or existing deps can solve the task. 57% of ALL tasks stop here. Zero tokens. Zero hallucination risk." },
              { step: "Step 1", title: "GLM 5.2 Pre Design", cost: "Touchpoint 1", desc: "GLM sketches the architecture BEFORE Kimi writes code. Identifies files to touch, risks, alternatives, and whether the task can be simplified. Prevents expensive architectural mistakes." },
              { step: "Step 2", title: "Kimi K2.7 Code Generation", cost: "Primary engine", desc: "Generates the implementation based on the validated architecture. Only runs if Ponytail returned empty. Kimi K2.7 Code by Moonshot AI, HumanEval 99.0." },
              { step: "Step 3", title: "Dual Review", cost: "Touchpoint 2", desc: "Kimi AND GLM independently review the generated code. Different architectures. Different blind spots. Scores are averaged. Neither model sees the other's review before producing its own." },
              { step: "Step 4", title: "GLM 5.2 Arbitration", cost: "Touchpoint 3", desc: "GLM synthesizes the final answer incorporating all critiques. Every issue raised by either reviewer must be addressed. No critique is silently dropped." },
              { step: "Step 5", title: "Quality Gate 10/10 + Verify", cost: "$0 · Offline", desc: "Automated quality scoring across 7 dimensions: Error Handling, Type Safety, Edge Cases, Failure Modes, DRY, Dead Code, Clarity. Output below 10/10 is blocked." },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 p-5 rounded-xl bg-bg border border-border/50 hover:border-accent/20 transition-colors">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center font-[family-name:var(--font-mono)] text-xs text-accent font-bold">{s.step.split(" ")[1]}</div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">{s.title}</h3>
                    <span className="font-[family-name:var(--font-mono)] text-xs text-accent">{s.cost}</span>
                  </div>
                  <p className="text-body mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 cost saving layers */}
      <section className="py-20 bg-bg">
        <div className="max-w-5xl mx-auto px-6">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Cost efficiency</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink mt-4 tracking-[-0.02em]">4 layers. All $0. All offline.</h2>
          <p className="text-lg text-body mt-4">These don't use AI models. They run offline at zero cost — and they're what makes Onklaud 5 radically cheaper than single model approaches.</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Ponytail Ladder", sub: "57% tasks intercepted", desc: "stdlib → native → dep → shortest. Pattern matching against 50+ Python, 20+ JS, 15+ HTML/CSS patterns. Word level matching, no embeddings, deterministic." },
              { title: "Immune Memory", sub: "19 patterns, 50% detection", desc: "Stores every council failure. Scans future tasks BEFORE code generation. Flags matching categories. Grows smarter with every use." },
              { title: "Headroom", sub: "67% context compression", desc: "Prevents saturation in 50+ message sessions. Compresses instructions while maintaining semantic equivalence. Keeps the pipeline coherent when single models fall apart." },
              { title: "Quality Gate", sub: "10/10 threshold", desc: "7 dimensions scored offline. Error Handling, Type Safety, Edge Cases, Failure Modes (3x weight), DRY, Dead Code, Clarity. Below threshold? Blocked." },
            ].map((l) => (
              <div key={l.title} className="p-6 rounded-xl bg-surface border border-border/50">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">{l.title}</h3>
                <p className="font-[family-name:var(--font-mono)] text-xs text-accent mt-1">{l.sub}</p>
                <p className="text-body mt-3 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 models */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">The engines</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink mt-4 tracking-[-0.02em]">3 AI models. Interchangeable.</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Kimi K2.7", org: "Moonshot AI", role: "Code generation + review", stats: "HumanEval 99.0 · $0.95/M input · 262K context", via: "OpenRouter" },
              { name: "GLM 5.2", org: "Z.AI / Tsinghua", role: "Architecture + arbitration", stats: "BenchLM 100.0 · $1.40/M input · 1M context · Open weights", via: "OpenRouter" },
              { name: "DeepSeek V4 Pro", org: "DeepSeek", role: "Lightweight tasks", stats: "Direct API · ~$0.14/M input · 128K context", via: "Direct API" },
            ].map((m) => (
              <div key={m.name} className="p-6 rounded-xl bg-bg border border-border/50 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">{m.name}</h3>
                <p className="text-xs text-body mt-1">{m.org}</p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{m.role}</div>
                <p className="text-xs text-body mt-4 leading-relaxed">{m.stats}</p>
                <p className="text-xs text-body/60 mt-2">{m.via}</p>
              </div>
            ))}
          </div>
          <p className="text-body mt-6 text-center">Prefer Anthropic Claude? Ollama with Llama 3? Swap any model in. The pipeline, verification, and quality gate stay intact.</p>
        </div>
      </section>

      {/* Quick start */}
      <section id="quickstart" className="py-20 bg-bg">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Install</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink mt-4 tracking-[-0.02em]">30 seconds to running.</h2>
          <p className="text-lg text-body mt-4">You need ONE API key (OpenRouter). That's it. Everything else is optional.</p>
          <div className="mt-8 p-6 rounded-xl bg-[#0d1117] border border-[#30363d] font-[family-name:var(--font-mono)] text-sm text-[#c9d1d9] leading-relaxed overflow-x-auto">
            <div><span className="text-[#58a6ff]">$</span> git clone https://github.com/KorroAi/onklaud-5.git</div>
            <div><span className="text-[#58a6ff]">$</span> cd onklaud-5</div>
            <div><span className="text-[#58a6ff]">$</span> cp .env.example .env</div>
            <div className="text-[#8b949e]"># Add your OpenRouter key to .env</div>
            <div><span className="text-[#58a6ff]">$</span> python test_pipeline.py</div>
            <div className="text-[#3fb950] mt-2">RESULTS: 30/31 passed (0 failed, 1 warnings)</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink tracking-[-0.02em]">Ready to try it?</h2>
          <p className="text-lg text-body mt-4">Open source. Research paper included. Demo video in the repo. BSL license, converts to MIT in 2030.</p>
          <div className="flex justify-center gap-4 mt-8">
            <a href="https://github.com/KorroAi/onklaud-5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-all">
              View on GitHub
            </a>
            <a href="https://github.com/KorroAi/onklaud-5/blob/master/ONKLAUD_5_RESEARCH_PAPER.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border text-ink px-6 py-3 rounded-full font-semibold text-sm hover:bg-surface transition-all">
              Read the paper
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
