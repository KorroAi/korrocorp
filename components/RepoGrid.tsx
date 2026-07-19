"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178C6]/10 text-[#3178C6]",
  Python: "bg-[#3776AB]/10 text-[#3776AB]",
  Go: "bg-[#00ADD8]/10 text-[#00ADD8]",
  Rust: "bg-[#DEA584]/10 text-[#DEA584]",
  JavaScript: "bg-[#F7DF1E]/10 text-[#C9A600]",
  Jupyter: "bg-[#F37626]/10 text-[#F37626]",
  CSS: "bg-[#663399]/10 text-[#663399]",
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

interface Props {
  repos: GitHubRepo[];
}

export default function RepoGrid({ repos }: Props) {
  if (!repos.length) {
    return (
      <section id="projects" className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-body text-lg">Projects incoming.</p>
            <p className="text-body/50 text-sm mt-1">Probably compiling something right now.</p>
            <a href="https://github.com/KorroAi" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-accent font-medium hover:underline">Watch on GitHub</a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.15em] uppercase text-accent font-semibold">Our projects</span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-ink tracking-[-0.02em] mt-3">Built with obsession.</h2>
          <p className="mt-2 text-body">Polished. Complete. Ready to use.</p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((r, i) => (
            <motion.a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ y: -4 }} className="group flex flex-col p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-[0.98]">
              <div className="flex items-center justify-between mb-3">
                <span className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded-full ${LANG_COLORS[r.language || ""] || "bg-ink/5 text-body"}`}>{r.language || "Code"}</span>
                <span className="flex items-center gap-1 text-xs text-body/50"><ClockIcon /> {timeAgo(r.updated_at)}</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink group-hover:text-accent transition-colors capitalize">{r.name.replace(/-/g, " ")}</h3>
              <p className="text-sm text-body leading-relaxed mt-1.5 line-clamp-2">{r.description || "Another banger. No description needed."}</p>
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-xs text-accent font-medium group-hover:underline">View on GitHub</span>
                <span className="flex items-center gap-1 text-xs text-body/60"><StarIcon />{r.stargazers_count || 0}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
