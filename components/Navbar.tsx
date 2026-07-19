"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkClass = "text-sm text-body hover:text-ink transition-colors font-medium";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-[#FFFDF7]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink" onClick={() => setOpen(false)}>Korrocorp</Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/#projects" className={linkClass}>Projects</Link>
          <Link href="/research" className={linkClass}>Research</Link>
          <Link href="/korromarket" className={linkClass}>Marketplace</Link>
          <Link href="/#about" className={linkClass}>About</Link>
          <Link href="/#contact" className={linkClass}>Contact</Link>
          <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-ink text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-ink/90 transition-all active:scale-[0.97]">
            GitHub <ArrowIcon />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="sm:hidden p-2 -mr-2 text-ink" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="sm:hidden fixed inset-0 top-16 bg-[#FFFDF7] z-40 flex flex-col p-6 gap-6 pt-8">
          <Link href="/#projects" className="text-xl font-semibold text-ink py-2" onClick={() => setOpen(false)}>Projects</Link>
          <Link href="/research" className="text-xl font-semibold text-ink py-2" onClick={() => setOpen(false)}>Research</Link>
          <Link href="/korromarket" className="text-xl font-semibold text-ink py-2" onClick={() => setOpen(false)}>Marketplace</Link>
          <Link href="/#about" className="text-xl font-semibold text-ink py-2" onClick={() => setOpen(false)}>About</Link>
          <Link href="/#contact" className="text-xl font-semibold text-ink py-2" onClick={() => setOpen(false)}>Contact</Link>
          <div className="mt-4 pt-4 border-t border-border">
            <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3 rounded-full text-sm">
              GitHub <ArrowIcon />
            </a>
          </div>
          <div className="mt-2 flex gap-3">
            <a href="https://x.com/korrocorp" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-border hover:border-accent transition-colors text-body hover:text-accent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://discord.gg/RSBHHjxnYt" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-border hover:border-accent transition-colors text-body hover:text-accent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
