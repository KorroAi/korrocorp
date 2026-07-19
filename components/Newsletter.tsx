"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = inputRef.current?.value?.trim();
    if (!email || !email.includes("@")) return;

    setStatus("loading");

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 sm:py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,53,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }} className="max-w-xl mx-auto text-center">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Stay in the loop</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-[-0.02em] mt-3">The KORRO Dispatch.</h2>
          <p className="mt-3 text-white/50 leading-relaxed">
            New projects, shipping updates, and occasional thoughts. No spam. Just the stuff worth reading.
          </p>

          {status === "ok" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <span className="text-3xl">&#9993;</span>
              <p className="mt-2 font-semibold text-lg">You are in.</p>
              <p className="text-sm text-white/40 mt-1">See you in your inbox soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                ref={inputRef}
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all text-sm font-[family-name:var(--font-mono)]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-6 py-3.5 rounded-full hover:bg-accent-hover transition-all active:scale-[0.97] disabled:opacity-50 shadow-[0_4px_20px_-4px_rgba(255,107,53,0.3)]"
              >
                {status === "loading" ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">Something went wrong. Try again or email us directly.</p>
          )}
          <p className="mt-4 text-xs text-white/20">No spam. Unsubscribe anytime. We do not share your email.</p>
        </motion.div>
      </div>
    </section>
  );
}
