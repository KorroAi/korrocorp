"use client";

import { useEffect, useRef, useState } from "react";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function KorromarketPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#636E72] selection:bg-[#3b82f6]/15 selection:text-[#2D3436]">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#fafaf9]/75 backdrop-blur-xl border-b border-[#e8e8e4]/60">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-[family-name:var(--font-display)] text-base font-bold text-[#2D3436] hover:text-[#3b82f6] transition-colors duration-300">
            Korrocorp
          </a>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b82f6]/[0.07] border border-[#3b82f6]/[0.15]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3b82f6]" />
            </span>
            <span className="text-[#3b82f6] text-xs font-semibold tracking-wide">Coming soon</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent blur-3xl pointer-events-none hidden sm:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#3b82f6]/[0.03] to-transparent blur-3xl pointer-events-none hidden sm:block" />

        <div className="max-w-5xl mx-auto text-center relative">
          <FadeUp>
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-[#d4d4d0]" />
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.25em] uppercase text-[#636E72] font-semibold">
                Korrocorp Marketplace
              </p>
              <div className="w-10 h-px bg-[#d4d4d0]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] leading-[0.9] mb-4">
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Korromarket
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={200}>
            <p className="text-xl sm:text-2xl text-[#636E72] mt-6 max-w-2xl mx-auto leading-relaxed font-[350]">
              Curated tools. <span className="text-[#2D3436] font-semibold">Pay once. Own forever.</span>
            </p>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="inline-flex items-center gap-2.5 mt-8 px-4 py-1.5 rounded-full bg-[#3b82f6]/[0.07] border border-[#3b82f6]/[0.15]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
              </span>
              <span className="text-[#3b82f6] text-sm font-semibold tracking-wide">First products launching soon</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Catalog preview */}
      <section className="py-20 px-8 border-t border-[#e8e8e4]/60">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <div className="w-1.5 h-5 rounded-full bg-[#3b82f6]" />
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[#636E72] font-semibold">Catalog</p>
              <div className="w-1.5 h-5 rounded-full bg-[#3b82f6]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#2D3436] tracking-[-0.03em] mb-4">
              Products announced soon.
            </h2>
            <p className="text-base text-[#636E72] leading-relaxed max-w-lg mx-auto">
              We're preparing the first wave of tools. Each one built to solve a real problem, polished to the point where you'd pay for it. Then sold once, forever.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="py-20 px-8 border-t border-[#e8e8e4]/60">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { value: "1×", title: "Pay once", desc: "Buy a tool. It's yours. No expiration. No subscription. No credits." },
              { value: "∞", title: "No limits", desc: "No usage caps. No rate limiting. No seat counting. Run it everywhere." },
              { value: "2yr", title: "Updates included", desc: "Every patch, every improvement, every performance gain. Free for 2+ years." },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={i * 100}>
                <div className="text-center group">
                  <div className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[#3b82f6] mb-3 tracking-[-0.03em] group-hover:scale-110 transition-transform duration-300">{p.value}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#2D3436] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#636E72] leading-relaxed max-w-[220px] mx-auto">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-8 border-t border-[#e8e8e4]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-8 text-sm text-[#636E72]">
            <a href="/" className="font-[family-name:var(--font-display)] text-lg font-bold text-[#2D3436] hover:text-[#3b82f6] transition-colors">Korrocorp</a>
            <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D3436] transition-colors">GitHub</a>
            <a href="mailto:contact.korro@gmail.com" className="hover:text-[#2D3436] transition-colors">Contact</a>
            <a href="https://discord.gg/korro" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D3436] transition-colors">Discord</a>
          </div>
          <span className="text-sm text-[#b0b0a8]">Curated tools. One payment. No regrets.</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
