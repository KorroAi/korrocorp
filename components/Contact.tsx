"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-br from-[#FFF5F0] to-[#FDF8F5] border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto text-center">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Don&apos;t be a stranger</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink tracking-[-0.02em] mt-3">We read every email.</h2>
          <p className="mt-4 text-body leading-relaxed">Questions, ideas, collabs, bug reports, or just want to say you like what we do.</p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <a href="mailto:contact.korro@gmail.com" className="inline-flex items-center gap-3 bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-all active:scale-[0.97] shadow-[0_4px_20px_-4px_rgba(255,107,53,0.4)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              contact.korro@gmail.com
            </a>
            <p className="text-xs text-body/40">We reply fast. Like, suspiciously fast.</p>
            <div className="flex items-center gap-5 text-body/40">
              <a href="https://x.com/korrocorp" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://discord.gg/RSBHHjxnYt" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://reddit.com/u/korro_ai" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87a3.09 3.09 0 0 1 .042-.52 1.755 1.755 0 0 1-1.01-1.614c0-.968.786-1.754 1.754-1.754.477 0 .899.182 1.207.491 1.194-.856 2.85-1.418 4.674-1.488l.8-3.747-2.597.547a1.251 1.251 0 0 1-2.385-.807 1.25 1.25 0 0 1 1.136-1.442l3.586-.756c.38-.086.77.102.918.472l.925 4.337c1.883.072 3.563.65 4.742 1.53.295-.287.701-.465 1.156-.465zm-8.758 9.557c0 .69.934 1.253 2.086 1.253s2.086-.563 2.086-1.253c0-.69-.934-1.253-2.086-1.253s-2.086.563-2.086 1.253zm4.576 1.406c.202.368 1.044.568 1.822.498.493-.043.878-.234.878-.434 0-.253-.568-.47-1.256-.47-.692 0-1.302.15-1.444.406zm1.67-1.406c0 .69.934 1.253 2.086 1.253s2.086-.563 2.086-1.253c0-.69-.934-1.253-2.086-1.253s-2.086.563-2.086 1.253z"/></svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
