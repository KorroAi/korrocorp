"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import MarkdownEditor from "./MarkdownEditor";

const API = process.env.NEXT_PUBLIC_RESEARCH_API || "https://korroresearch-api-production.up.railway.app";

const ENGINES = [
  { key: "hallucination", label: "Hallucination Check", desc: "Classifies every claim as verified, hypothesis, or speculative" },
  { key: "fact", label: "Fact Checker", desc: "Verifies statistics, names, institutions, and datasets" },
  { key: "claim", label: "Claim Mapping", desc: "Maps every assertion to experimental evidence" },
  { key: "consistency", label: "Consistency Engine", desc: "Tracks terminology, variables, and citations globally" },
  { key: "source", label: "Source Verification", desc: "Cross-references citations against CrossRef and arXiv" },
  { key: "review", label: "Adversarial Review", desc: "Flags missing sections, weak claims, and venue violations" },
  { key: "reproducibility", label: "Reproducibility", desc: "Validates datasets, code, hardware, seeds, and ethics" },
  { key: "style", label: "Style Engine", desc: "Applies venue-specific formatting (Nature, NeurIPS, MIT, etc.)" },
];

const FORMATS = [
  { key: "paper", label: "Research Paper" },
  { key: "pitch", label: "Pitch Deck" },
  { key: "grant", label: "Grant Proposal" },
  { key: "whitepaper", label: "White Paper" },
  { key: "magazine", label: "Magazine Article" },
  { key: "blog", label: "Technical Blog" },
  { key: "talk", label: "Conference Talk" },
  { key: "thesis", label: "Thesis / Dissertation" },
  { key: "book", label: "Academic Book" },
];

const FORMAT_REVIEWER_INFO: Record<string, { reviewers: string; desc: string }> = {
  "paper": { reviewers: "Domain Expert, Methodologist, Visionary", desc: "3 AI academic reviewers evaluate your paper. Average score determines accept/reject." },
  "thesis": { reviewers: "Domain Expert, Methodologist, Visionary", desc: "3 AI academic reviewers evaluate your thesis. Average score determines pass/revision." },
  "book": { reviewers: "Domain Expert, Methodologist, Visionary", desc: "3 AI reviewers evaluate your book. Average score determines readiness." },
  "pitch": { reviewers: "Venture Investor, Industry Expert, Customer Advocate", desc: "3 AI business reviewers evaluate your pitch. Average score determines investment readiness." },
  "grant": { reviewers: "Funding Officer, Research Director, Impact Assessor", desc: "3 AI grant reviewers evaluate your proposal. Average score determines funding readiness." },
  "whitepaper": { reviewers: "CTO, Solutions Architect, Procurement Lead", desc: "3 AI technical reviewers evaluate your white paper. Average score determines technical credibility." },
  "magazine": { reviewers: "Senior Editor, Fact Checker, General Reader", desc: "3 AI editorial reviewers evaluate your article. Average score determines publication readiness." },
  "blog": { reviewers: "Senior Editor, Fact Checker, General Reader", desc: "3 AI editorial reviewers evaluate your post. Average score determines publication readiness." },
  "talk": { reviewers: "Senior Editor, Fact Checker, General Reader", desc: "3 AI editorial reviewers evaluate your talk. Average score determines conference readiness." },
};

type Section = { title: string; writing_prompt: string; has_guide: boolean };

export default function ResearchPage() {
  // Mode
  const [mode, setMode] = useState<"generate" | "verify">("generate");

  // Generate state
  const [insight, setInsight] = useState("");
  const [audience, setAudience] = useState("");
  const [format, setFormat] = useState("paper");
  const [language, setLanguage] = useState("en");
  const [genLoading, setGenLoading] = useState(false);
  const [genProgress, setGenProgress] = useState({ stage: "", percent: 0 });
  const [paperContent, setPaperContent] = useState("");
  const [paperPdf, setPaperPdf] = useState("");
  const [genError, setGenError] = useState("");

  // Verify state
  const [content, setContent] = useState("");
  const [selectedEngines, setSelectedEngines] = useState<string[]>(["hallucination", "fact", "claim", "consistency"]);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [verifyError, setVerifyError] = useState("");

  // Citation state
  const [bibContent, setBibContent] = useState("");
  const [citationResult, setCitationResult] = useState<any>(null);
  const [citationLoading, setCitationLoading] = useState(false);

  // Readiness state
  const [venue, setVenue] = useState("");
  const [readinessResult, setReadinessResult] = useState<any>(null);
  const [readinessLoading, setReadinessLoading] = useState(false);

  // Peer review state
  const [reviewResult, setReviewResult] = useState<any>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Improve state (apply fixes)
  const [improvedContent, setImprovedContent] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);
  const [improveError, setImproveError] = useState("");
  const [showImproved, setShowImproved] = useState(false);
  const [improvedResults, setImprovedResults] = useState<any>(null);
  const [improvedVerifying, setImprovedVerifying] = useState(false);

  // User state
  const [user, setUser] = useState<any>(null);
  const [userChecked, setUserChecked] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoMsg, setPromoMsg] = useState("");
  useEffect(() => {
    const t = localStorage.getItem("korro_token");
    if (t) {
      // Always fetch fresh user data from API
      fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
        .then(r => r.json()).then(d => {
          if (d.user) {
            setUser(d.user);
            localStorage.setItem("korro_user", JSON.stringify(d.user));
          }
        }).catch(() => {
          // Fallback to localStorage only if API fails
          const u = localStorage.getItem("korro_user");
          if (u) { try { setUser(JSON.parse(u)); } catch {} }
        });
    }
    setUserChecked(true);
  }, []);

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoMsg("");
    const t = localStorage.getItem("korro_token");
    try {
      const res = await fetch(`${API}/api/promo/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) },
        body: JSON.stringify({ code: promoCode.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setPromoMsg(data.message || "Promo applied!");
        if (data.user) { setUser(data.user); localStorage.setItem("korro_user", JSON.stringify(data.user)); }
      } else {
        setPromoMsg(data.detail || "Invalid promo code");
      }
    } catch { setPromoMsg("Cannot reach API"); }
    setPromoLoading(false);
  };

  const toggleEngine = (key: string) => {
    setSelectedEngines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleGenerate = async () => {
    if (!insight.trim()) return;
    const authToken = localStorage.getItem("korro_token") || "";
    const licenseKey = localStorage.getItem("korroresearch_license") || "";
    if (!authToken && !licenseKey && !paperContent) {
      setGenError("Please sign in to generate papers. <a href='/login' class='underline'>Sign in here</a>");
      return;
    }
    setGenLoading(true);
    setGenError("");
    setPaperContent("");
    setPaperPdf("");
    setGenProgress({ stage: "Starting generation...", percent: 5 });

    try {
      // 1. Start async generation
      const res = await fetch(`${API}/api/write/async`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(authToken ? { Authorization: `Bearer ${localStorage.getItem("korro_token")}` } : { "X-License-Key": licenseKey }) },
        body: JSON.stringify({
          insight, why_now: "Timely topic requiring rigorous investigation.",
          audience: audience || "Researchers and practitioners in the field",
          worldview: "Standard approaches have limitations to address.",
          format, language, sections: [],
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API ${res.status}: ${errText}`);
      }
      const { task_id } = await res.json();

      // 2. Poll for result
      for (let i = 0; i < 120; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const poll = await fetch(`${API}/api/task/${task_id}`);
        if (!poll.ok) throw new Error(`Poll failed: ${poll.status}`);
        const task = await poll.json();

        if (task.status === "done") {
          setPaperContent(task.paper_content || "");
          if (task.pdf_path) setPaperPdf(task.pdf_path);
          if (task.bib_content) setBibContent(task.bib_content);
          setGenProgress({ stage: "Ready.", percent: 100 });
          break;
        }
        if (task.status === "failed") {
          throw new Error(task.error || "Generation failed");
        }
        // Update progress based on elapsed time
        const elapsed = i * 2;
        if (elapsed < 20) setGenProgress({ stage: "Writing paper with AI...", percent: 15 + elapsed });
        else if (elapsed < 40) setGenProgress({ stage: "Refining sections...", percent: 40 + (elapsed - 20) });
        else if (elapsed < 60) setGenProgress({ stage: "Adding references and polishing...", percent: 60 + (elapsed - 40) * 0.5 });
        else setGenProgress({ stage: "Finalizing document...", percent: 80 + Math.min(10, (elapsed - 60) * 0.3) });
      }
    } catch (e: any) {
      const msg = String(e.message || e);
      if (msg.includes("402") || msg.includes("limit reached")) {
        setGenError("limit");
      } else if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        setGenError("network");
      } else {
        setGenError("An unexpected error occurred. Please try again.");
      }
    }
    setGenLoading(false);
    setTimeout(() => setGenProgress({ stage: "", percent: 0 }), 1500);
  };

  const handleVerify = async () => {
    if (!content.trim()) return;
    setVerifyLoading(true);
    setVerifyError("");
    setResults(null);
    try {
      const res = await fetch(`${API}/api/verify/scored`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
        body: JSON.stringify({ content, engines: selectedEngines, format, language }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setResults(await res.json());
    } catch (e: any) {
      setVerifyError(e.message || "Verification failed");
    }
    setVerifyLoading(false);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setContent(await file.text());
  };

  const handleCheckCitations = async () => {
    const text = paperContent || content;
    if (!text.trim()) return;
    setCitationLoading(true);
    setCitationResult(null);
    try {
      const formData = new URLSearchParams();
      formData.set("content", text);
      if (bibContent) formData.set("bib", bibContent);
      const res = await fetch(`${API}/api/citations`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
        body: formData.toString(),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setCitationResult(await res.json());
    } catch (e: any) {
      setCitationResult({ error: e.message });
    }
    setCitationLoading(false);
  };

  const handleCheckReadiness = async () => {
    const text = paperContent || content;
    if (!text.trim()) return;
    setReadinessLoading(true);
    setReadinessResult(null);
    try {
      const res = await fetch(`${API}/api/readiness`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
        body: JSON.stringify({ content: text, venue, bib: bibContent, format, language }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setReadinessResult(await res.json());
    } catch (e: any) {
      setReadinessResult({ error: String(e.message || e) });
    }
    setReadinessLoading(false);
  };

  const handleSimulateReview = async () => {
    const text = paperContent || content;
    if (!text.trim()) return;
    setReviewLoading(true);
    setReviewResult(null);
    try {
      const res = await fetch(`${API}/api/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
        body: JSON.stringify({ content: text, format, language }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setReviewResult(await res.json());
    } catch (e: any) {
      setReviewResult({ error: e.message });
    }
    setReviewLoading(false);
  };

  const handleApplyFixes = async () => {
    const text = paperContent || content;
    if (!text.trim()) return;
    setImproveLoading(true);
    setImproveError("");
    setImprovedContent("");
    const actionPlan = results?.integrity?.action_plan || [];
    try {
      const res = await fetch(`${API}/api/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
        body: JSON.stringify({
          content: text,
          action_plan: actionPlan,
          format,
          language,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Improve failed: ${res.status} — ${err}`);
      }
      const data = await res.json();
      const improved = data.improved_paper || "";
      setImprovedContent(improved);
      setShowImproved(true);

      // Auto-verify improved version for before/after comparison
      if (improved) {
        setImprovedVerifying(true);
        try {
          const vRes = await fetch(`${API}/api/verify/scored`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
            body: JSON.stringify({ content: improved, engines: ["hallucination", "fact", "claim", "consistency"], format, language }),
          });
          if (vRes.ok) {
            setImprovedResults(await vRes.json());
          }
        } catch {}
        setImprovedVerifying(false);
      }
    } catch (e: any) {
      setImproveError(String(e.message || e));
    }
    setImproveLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2D3436]">
      {/* Top user bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#E8E8E8]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5 flex-wrap">
            <a href="/" className="font-display font-bold text-[#2D3436] text-xl">Korrocorp</a>
            <span className="text-[#636E72]/30 text-lg hidden sm:inline">|</span>
            <span className="text-[#636E72] font-medium hidden sm:inline">Korroresearch</span>
          </div>
          <div className="flex items-center gap-3 md:gap-5 flex-wrap">
            {user ? (
              <>
                <span className="text-sm text-[#636E72] hidden md:inline">{user.email}</span>
                <span className={`font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wider ${user.plan === "free" ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "bg-[#00B894]/10 text-[#00B894]"}`}>{user.plan || "free"}</span>
                {user.plan === "free" && (
                  <span className="text-xs text-[#636E72] hidden lg:inline">{user.papers_limit - (user.papers_used || 0)} left</span>
                )}
                {user.plan === "free" && (
                  <Link href="/pricing" className="text-sm font-bold bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all active:scale-95">
                    Upgrade to Pro
                  </Link>
                )}
                <Link href="/dashboard" className="text-sm text-[#2D3436] font-medium hover:underline">Dashboard</Link>
              </>
            ) : (
              <Link href="/login" className="text-sm font-semibold bg-[#FF6B35] text-white px-5 py-2.5 rounded-full hover:bg-[#E85D2C] transition">Sign In</Link>
            )}
          </div>
        </div>
      </div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-6 text-center">
        <p className="font-mono text-sm tracking-widest text-[#FF6B35] uppercase mb-4">Korroresearch</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Your paper,<span className="text-[#FF6B35]"> reviewed </span>before submission.
        </h1>
        <p className="font-sans text-lg text-[#636E72] max-w-xl mx-auto leading-relaxed mb-8">
          Generate or upload your paper. Get it reviewed by 8 AI engines + realistic peer reviewers. Fix issues and export submission-ready.
        </p>

        {/* Dual CTA */}
        {!(paperContent || content) && (
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => { setMode("generate"); setResults(null); }}
              className={`px-8 py-4 font-display font-semibold text-sm rounded-2xl transition-all active:scale-95 shadow-lg ${
                mode === "generate"
                  ? "bg-[#FF6B35] text-white shadow-[#FF6B35]/30"
                  : "bg-white text-[#2D3436] border-2 border-[#E8E8E8] hover:border-[#FF6B35]/30"
              }`}
            >
              Write from idea
            </button>
            <button
              onClick={() => { setMode("verify"); setResults(null); }}
              className={`px-8 py-4 font-display font-semibold text-sm rounded-2xl transition-all active:scale-95 shadow-lg ${
                mode === "verify"
                  ? "bg-[#FF6B35] text-white shadow-[#FF6B35]/30"
                  : "bg-white text-[#2D3436] border-2 border-[#E8E8E8] hover:border-[#FF6B35]/30"
              }`}
            >
              Upload my draft
            </button>
          </div>
        )}
        {(paperContent || content) && (
          <div className="flex gap-2 justify-center flex-wrap">
            <span className="font-mono text-xs text-[#00B894] bg-[#00B894]/10 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00B894] rounded-full" />
              {paperContent ? "Paper generated" : "Draft loaded"} — use Advanced Tools below
            </span>
            <button onClick={() => { setPaperContent(""); setContent(""); setResults(null); setImprovedContent(""); setShowImproved(false); }}
              className="font-sans text-xs text-[#636E72] underline hover:text-[#FF6B35] transition">
              Start over
            </button>
          </div>
        )}
      </section>

      {/* GENERATE MODE */}
      {mode === "generate" && (
        <>
          {/* Input form */}
          <section className="max-w-4xl mx-auto px-6 pb-8">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="mb-4">
                <label className="font-display font-semibold text-sm mb-1 block">What do you want to write about?</label>
                <textarea value={insight} onChange={(e) => setInsight(e.target.value)}
                  placeholder="Describe your topic, discovery, or argument. Be specific. The more detail you give, the better the result. Example: 'Chinese AI companies are training models 10x cheaper than OpenAI while matching GPT-4 on benchmarks. This cost asymmetry threatens to reshape the AI industry within 24 months.'"
                  className="w-full p-4 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition" rows={4} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="font-display font-semibold text-sm mb-1 block">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}
                    className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]">
                    {FORMATS.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-display font-semibold text-sm mb-1 block">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label className="font-display font-semibold text-sm mb-1 block">Who is this for? <span className="text-[#636E72] font-normal">(optional)</span></label>
                  <input value={audience} onChange={(e) => setAudience(e.target.value)}
                    placeholder="Researchers, investors, engineers, general public..."
                    className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]" />
                </div>
              </div>
              {genLoading && genProgress.percent > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#FF6B35] font-semibold">{genProgress.stage}</span>
                    <span className="font-mono text-xs text-[#636E72]">{genProgress.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6B35] rounded-full transition-all duration-700 ease-out" style={{ width: `${genProgress.percent}%` }} />
                  </div>
                </div>
              )}
              <button onClick={handleGenerate} disabled={genLoading || !insight.trim()}
                className="w-full py-3 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C] disabled:opacity-40 disabled:cursor-not-allowed transition">
                {genLoading ? <><span className="spinner" />{genProgress.stage || "Generating..."}</> : "Generate Paper"}
              </button>
            </div>
          </section>

          {/* Generated paper — shown immediately after Generate */}
          {paperContent && (
            <section className="max-w-4xl mx-auto px-6 pb-8">
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold">Your paper</h2>
                  <span className="font-mono text-xs text-[#00B894] bg-[#00B894]/10 px-3 py-1 rounded-full">Draft ready</span>
                </div>
                <MarkdownEditor
                  value={paperContent}
                  onChange={setPaperContent}
                  placeholder="Your paper will appear here..."
                  className="mb-4"
                />
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={async () => {
                      setVerifyLoading(true);
                      setVerifyError("");
                      setResults(null);
                      try {
                        const res = await fetch(`${API}/api/verify/scored`, {
                          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("korro_token")}` },
                          body: JSON.stringify({ content: paperContent, engines: ["hallucination", "fact", "claim", "consistency"], format, language }),
                        });
                        if (!res.ok) throw new Error(`API error: ${res.status}`);
                        setResults(await res.json());
                      } catch (e: any) { setVerifyError(e.message); }
                      setVerifyLoading(false);
                    }}
                    disabled={verifyLoading}
                    className="flex-1 py-3 font-display font-semibold text-sm bg-[#2D3436] text-white rounded-xl hover:bg-[#1a1f21] disabled:opacity-40 transition"
                  >
                    {verifyLoading ? <><span className="spinner spinner-dark" />Running engines...</> : "Verify Paper"}
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([paperContent], { type: "text/markdown" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url; a.download = "paper.md"; a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="py-3 px-4 font-display font-semibold text-sm border-2 border-[#2D3436] text-[#2D3436] rounded-xl hover:bg-[#2D3436] hover:text-white transition"
                  >
                    Download MD
                  </button>
                  {paperPdf && (
                    <a href={`${API}/api/output/${paperPdf.replace(/\\/g, "/").split("/").pop()}`} target="_blank" download
                      className="py-3 px-4 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C] text-center transition">
                      Download PDF
                    </a>
                  )}
                  {bibContent && (
                    <button onClick={() => {
                      const blob = new Blob([bibContent], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url; a.download = "references.bib"; a.click();
                      URL.revokeObjectURL(url);
                    }}
                      className="py-3 px-4 font-display font-semibold text-sm border border-[#636E72] text-[#636E72] rounded-xl hover:bg-[#FAFAFA] transition"
                    >
                      Download .bib
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      const res = await fetch(`${API}/api/export/latex`, {
                        method: "POST", body: new URLSearchParams({ content: paperContent }),
                      });
                      const data = await res.json();
                      const blob = new Blob([data.latex], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url; a.download = "paper.tex"; a.click();
                    }}
                    className="py-2.5 px-4 font-display font-semibold text-sm border border-[#E8E8E8] rounded-xl hover:bg-[#FAFAFA] transition"
                  >
                    Export LaTeX
                  </button>
                  </div>
                </div>
                {(results || verifyError) && (
                  <div className="mt-4">
                    {verifyError && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-mono mb-3">{verifyError}</div>}
                    {results?.integrity && (
                      <div className="border border-[#E8E8E8] rounded-xl p-4 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display font-semibold text-sm">Integrity Score</span>
                          <span className={`font-display text-3xl font-bold ${
                            results.integrity.grade === "A" ? "text-[#00B894]" :
                            results.integrity.grade === "B" ? "text-[#00B894]" :
                            results.integrity.grade === "C" ? "text-[#FF6B35]" :
                            "text-red-500"
                          }`}>
                            {results.integrity.score}/100 <span className="text-lg">{results.integrity.grade}</span>
                          </span>
                        </div>
                        <p className="font-sans text-sm text-[#636E72] mb-2">{results.integrity.grade_description}</p>
                        <p className="font-display font-semibold text-xs text-[#2D3436]">{results.integrity.recommendation}</p>
                        {results.integrity.action_plan?.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-[#E8E8E8]">
                            <p className="font-display text-xs font-semibold mb-1">Action plan:</p>
                            {results.integrity.action_plan.slice(0, 5).map((a: string, i: number) => (
                              <p key={i} className="font-mono text-xs text-[#636E72]">• {a}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {results && (
                      <div className="border border-[#E8E8E8] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-display font-semibold text-sm">Engine Details</span>
                          <span className="font-mono text-[10px] text-[#636E72]">{results.report?.filter((r:any) => r.status !== "ok").length || 0} issues</span>
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {results.report?.map((r: any, i: number) => {
                            let ri = r.result;
                            if (Array.isArray(ri) && ri.length > 0) ri = ri[0];
                            const summary = r.status === "ok" ? "All clear" :
                              typeof ri === "object" && ri !== null
                                ? [ri.dangers?.length ? `${ri.dangers.length} speculative` : '',
                                   ri.warnings?.length ? `${ri.warnings.length} to review` : '',
                                   ri.needs_evidence ? `${ri.needs_evidence} missing evidence` : '',
                                   ri.unverifiable ? `${ri.unverifiable} unverifiable` : '',
                                   ri.total_issues ? `${ri.total_issues} inconsistencies` : '']
                                  .filter(Boolean).join(', ') || "Issues detected"
                                : String(r.result || '').slice(0, 50) || "Issues detected";
                            return (
                            <div key={i} className={`border rounded-lg p-2.5 text-xs ${r.status === "ok" ? "border-[#00B894]/20 bg-[#00B894]/5" : "border-[#FF6B35]/20 bg-[#FF6B35]/5"}`}>
                              <div className="flex items-center justify-between">
                                <span className="font-display font-semibold capitalize">{r.engine}</span>
                                <span className={`font-mono text-[10px] ${r.status === "ok" ? "text-[#00B894]" : "text-[#FF6B35]"}`}>{summary}</span>
                              </div>
                            </div>
                          )})}
                        </div>
                      </div>
                    )}
                    {/* Apply Fixes & Improve */}
                    {results?.integrity?.action_plan?.length > 0 && (
                      <div className="mt-4 border border-[#FF6B35]/20 bg-[#FF6B35]/5 rounded-xl p-4">
                        <p className="font-display text-sm font-semibold mb-2">Not satisfied with the score?</p>
                        <p className="font-sans text-xs text-[#636E72] mb-3">Our AI will apply the action plan above and generate an improved version of your paper.</p>
                        <button
                          onClick={handleApplyFixes}
                          disabled={improveLoading}
                          className="w-full py-3 font-display font-semibold text-sm bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all active:scale-95 disabled:opacity-40"
                        >
                          {improveLoading ? <><span className="spinner" />Applying fixes & improving...</> : "Apply Fixes & Improve"}
                        </button>
                        {improveError && <p className="font-mono text-xs text-red-600 mt-2">{improveError}</p>}
                      </div>
                    )}
                    {/* Before/After Score Comparison */}
                    {improvedContent && showImproved && (
                      <div className="mt-4 border-2 border-[#00B894]/30 rounded-xl overflow-hidden">
                        {improvedVerifying ? (
                          <div className="bg-[#00B894]/5 px-4 py-3 text-center">
                            <span className="font-display text-sm text-[#00B894]">Verifying improved version...</span>
                          </div>
                        ) : results?.integrity && improvedResults?.integrity ? (
                          <div className="bg-[#00B894]/5 px-4 py-3">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-sm font-semibold text-[#00B894]">Score Comparison</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex-1 text-center bg-white rounded-lg p-2">
                                <div className="font-mono text-xs text-[#636E72]">Original</div>
                                <div className={`font-display text-2xl font-bold ${
                                  results.integrity.grade === "A" || results.integrity.grade === "B" ? "text-[#00B894]" : "text-[#FF6B35]"
                                }`}>{results.integrity.score}/100 <span className="text-sm">{results.integrity.grade}</span></div>
                              </div>
                              <div className="text-[#00B894] font-bold text-xl">→</div>
                              <div className="flex-1 text-center bg-[#00B894]/10 rounded-lg p-2">
                                <div className="font-mono text-xs text-[#00B894]">Improved</div>
                                <div className={`font-display text-2xl font-bold ${
                                  improvedResults.integrity.grade === "A" || improvedResults.integrity.grade === "B" ? "text-[#00B894]" : improvedResults.integrity.score > results.integrity.score ? "text-[#00B894]" : "text-[#FF6B35]"
                                }`}>{improvedResults.integrity.score}/100 <span className="text-sm">{improvedResults.integrity.grade}</span></div>
                              </div>
                              <div className={`font-mono text-xs font-bold px-2 py-1 rounded-full ${
                                improvedResults.integrity.score > results.integrity.score ? "bg-[#00B894]/10 text-[#00B894]" :
                                improvedResults.integrity.score === results.integrity.score ? "bg-gray-100 text-[#636E72]" :
                                "bg-[#FF6B35]/10 text-[#FF6B35]"
                              }`}>
                                {improvedResults.integrity.score > results.integrity.score ? `+${improvedResults.integrity.score - results.integrity.score}` :
                                 improvedResults.integrity.score === results.integrity.score ? "=" :
                                 improvedResults.integrity.score - results.integrity.score}
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="bg-[#00B894]/10 px-4 py-3 flex items-center justify-between border-t border-[#00B894]/20">
                          <span className="font-display font-semibold text-sm text-[#00B894]">Improved Version</span>
                          <div className="flex gap-2">
                            <button onClick={() => { setShowImproved(false); setImprovedResults(null); }}
                              className="font-sans text-xs text-[#636E72] underline hover:text-[#2D3436]">Show original</button>
                            <button onClick={() => {
                              if (paperContent) { setPaperContent(improvedContent); setResults(improvedResults); }
                              else { setContent(improvedContent); setResults(improvedResults); }
                              setShowImproved(false);
                              setImprovedResults(null);
                            }}
                              className="font-display text-xs font-semibold bg-[#00B894] text-white px-3 py-1 rounded-lg hover:bg-[#00a37d] transition">Keep this version</button>
                          </div>
                        </div>
                        <div className="p-4 max-h-96 overflow-y-auto">
                          <MarkdownEditor
                            value={improvedContent}
                            onChange={setImprovedContent}
                            placeholder="Improved paper..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </section>
          )}

          {genError === "limit" ? (
          <section className="max-w-4xl mx-auto px-6 pb-8">
            <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#E85D2C]/5 border-2 border-[#FF6B35]/20 rounded-2xl p-8 text-center">
              <p className="font-display text-2xl font-bold text-[#FF6B35] mb-2">Limit reached</p>
              <p className="text-lg text-[#636E72] mb-6">You've used all your free papers. Upgrade to keep generating.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/pricing" className="font-display font-semibold text-sm bg-[#FF6B35] text-white px-8 py-3 rounded-xl hover:bg-[#E85D2C] transition shadow-lg shadow-[#FF6B35]/20">Upgrade to Pro — $9/month</Link>
              </div>
              <p className="mt-4 text-xs text-[#636E72]">Have a promo code? <Link href="/pricing" className="text-[#FF6B35] font-semibold hover:underline">Apply it here</Link></p>
            </div>
          </section>
        ) : genError === "network" ? (
          <section className="max-w-4xl mx-auto px-6 pb-8"><div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">Connection lost. Please check your internet and try again.</div></section>
        ) : genError && (
          <section className="max-w-4xl mx-auto px-6 pb-8"><div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-mono">{genError}</div></section>
        )}
        </>
      )}

      {/* VERIFY MODE */}
      {mode === "verify" && (
        <>
          <section className="max-w-4xl mx-auto px-6 pb-8">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-display font-semibold text-sm">Paste your draft</label>
                  <label className="font-sans text-xs text-[#FF6B35] cursor-pointer hover:underline">
                    <input type="file" accept=".md,.txt" onChange={handleFile} className="hidden" />or upload .md
                  </label>
                </div>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Paste your paper draft, abstract, or section here..."
                  className="mb-3"
                />
                <button
                  onClick={() => setContent(`# Adversarial Examples Are Not Bugs, They Are Features\n\n## Abstract\n\nWe challenge the prevailing view that adversarial examples represent failures of deep neural networks. Through systematic experimentation across three architectures and five datasets, we demonstrate that adversarial vulnerability is a direct consequence of models learning high-frequency features that are predictive but non-robust. We achieve 94.2% standard accuracy on CIFAR-10 while maintaining 68.7% robust accuracy under PGD attacks—a 12% improvement over the previous state-of-the-art.\n\n## Introduction\n\nDeep neural networks achieve remarkable performance on benchmark tasks but remain susceptible to adversarial examples: inputs perturbed in ways imperceptible to humans that cause confident misclassification. Since Szegedy et al. [1] first identified this phenomenon, the dominant interpretation has treated adversarial vulnerability as a defect to be eliminated through adversarial training [2], certified defenses [3], or architectural modifications [4].\n\nWe propose an alternative view: adversarial examples are not bugs. They are features.\n\n## Experiments\n\nTable 1: Robust accuracy under PGD-20 attack across architectures. Our method achieves 68.7% on ResNet-50 compared to 56.3% for standard adversarial training.\n\nAblation study: removing the frequency decomposition module reduces robust accuracy by 15.3 percentage points, confirming its central role in our approach.\n\n## References\n\n[1] Szegedy et al. Intriguing properties of neural networks. ICLR, 2014.\n[2] Madry et al. Towards deep learning models resistant to adversarial attacks. ICLR, 2018.\n[3] Wong and Kolter. Provable defenses against adversarial examples. ICML, 2018.\n[4] Zhang et al. Theoretically principled trade-off between robustness and accuracy. ICML, 2019.`)}
                  className="font-sans text-xs text-[#FF6B35] mt-2 hover:underline cursor-pointer bg-transparent border-0"
                >
                  Try with a sample paper
                </button>
              </div>
              <div className="mb-6">
                <p className="font-display font-semibold text-sm mb-3">Verification engines</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ENGINES.map((engine) => (
                    <button key={engine.key} onClick={() => toggleEngine(engine.key)}
                      className={`text-left p-3 rounded-xl border transition text-sm ${selectedEngines.includes(engine.key) ? "border-[#FF6B35] bg-[#FF6B35]/5" : "border-[#E8E8E8] hover:border-[#E8E8E8]/80"}`}>
                      <span className="font-display font-semibold text-xs">{engine.label}</span>
                      <span className="block text-xs text-[#636E72] mt-0.5">{engine.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleVerify} disabled={verifyLoading || !content.trim()}
                className="w-full py-3 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C] disabled:opacity-40 disabled:cursor-not-allowed transition">
                {verifyLoading ? <><span className="spinner spinner-dark" />Running engines...</> : `Verify with ${selectedEngines.length} engine${selectedEngines.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </section>

          {(results || verifyError) && (
            <section className="max-w-4xl mx-auto px-6 pb-8">
              {verifyError && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-mono mb-4">{verifyError}</div>}
              {results && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 md:p-8 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-bold">Verification Report</h2>
                    <span className={`font-mono text-xs px-3 py-1 rounded-full ${results.issues_found === 0 ? "bg-[#00B894]/10 text-[#00B894]" : "bg-[#FF6B35]/10 text-[#FF6B35]"}`}>
                      {results.issues_found === 0 ? "All clear" : `${results.issues_found} issues`}
                    </span>
                  </div>
                  {/* Integrity Score (from scored endpoint) */}
                  {results.integrity && (
                    <div className="border border-[#E8E8E8] rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-semibold text-sm">Integrity Score</span>
                        <span className={`font-display text-3xl font-bold ${
                          results.integrity.grade === "A" ? "text-[#00B894]" :
                          results.integrity.grade === "B" ? "text-[#00B894]" :
                          results.integrity.grade === "C" ? "text-[#FF6B35]" :
                          "text-red-500"
                        }`}>
                          {results.integrity.score}/100 <span className="text-lg">{results.integrity.grade}</span>
                        </span>
                      </div>
                      <p className="font-sans text-sm text-[#636E72] mb-2">{results.integrity.grade_description}</p>
                      {results.integrity.action_plan?.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#E8E8E8]">
                          <p className="font-display text-xs font-semibold mb-1">Action plan:</p>
                          {results.integrity.action_plan.slice(0, 8).map((a: string, i: number) => (
                            <p key={i} className="font-mono text-xs text-[#636E72]">• {a}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-3">
                    {results.report?.map((r: any, i: number) => (
                      <div key={i} className={`border rounded-xl p-4 ${r.status === "ok" ? "border-[#00B894]/20 bg-[#00B894]/5" : "border-[#FF6B35]/20 bg-[#FF6B35]/5"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${r.status === "ok" ? "bg-[#00B894]" : "bg-[#FF6B35]"}`} />
                          <span className="font-display font-semibold text-sm capitalize">{r.engine}</span>
                          <span className="font-mono text-xs text-[#636E72]">{r.status}</span>
                        </div>
                        <pre className="font-mono text-xs text-[#636E72] whitespace-pre-wrap mt-2 max-h-32 overflow-y-auto">
                          {typeof r.result === "string" ? r.result : JSON.stringify(r.result, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Apply Fixes for verify mode */}
              {results?.integrity?.action_plan?.length > 0 && (
                <div className="border border-[#FF6B35]/20 bg-[#FF6B35]/5 rounded-xl p-4 mb-4">
                  <p className="font-display text-sm font-semibold mb-2">Not satisfied with the score?</p>
                  <p className="font-sans text-xs text-[#636E72] mb-3">Our AI will apply the action plan above and generate an improved version of your paper.</p>
                  <button
                    onClick={handleApplyFixes}
                    disabled={improveLoading}
                    className="w-full py-3 font-display font-semibold text-sm bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all active:scale-95 disabled:opacity-40"
                  >
                    {improveLoading ? <><span className="spinner" />Applying fixes & improving...</> : "Apply Fixes & Improve"}
                  </button>
                  {improveError && <p className="font-mono text-xs text-red-600 mt-2">{improveError}</p>}
                </div>
              )}
              {/* Improved version for verify mode */}
              {improvedContent && showImproved && (
                <div className="border-2 border-[#00B894]/30 rounded-xl overflow-hidden mb-4">
                  {improvedVerifying ? (
                    <div className="bg-[#00B894]/5 px-4 py-3 text-center">
                      <span className="font-display text-sm text-[#00B894]">Verifying improved version...</span>
                    </div>
                  ) : results?.integrity && improvedResults?.integrity ? (
                    <div className="bg-[#00B894]/5 px-4 py-3">
                      <span className="font-display text-sm font-semibold text-[#00B894]">Score Comparison</span>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 text-center bg-white rounded-lg p-2">
                          <div className="font-mono text-xs text-[#636E72]">Original</div>
                          <div className={`font-display text-2xl font-bold ${results.integrity.grade === "A" || results.integrity.grade === "B" ? "text-[#00B894]" : "text-[#FF6B35]"}`}>{results.integrity.score}/100 <span className="text-sm">{results.integrity.grade}</span></div>
                        </div>
                        <div className="text-[#00B894] font-bold text-xl">→</div>
                        <div className="flex-1 text-center bg-[#00B894]/10 rounded-lg p-2">
                          <div className="font-mono text-xs text-[#00B894]">Improved</div>
                          <div className={`font-display text-2xl font-bold ${improvedResults.integrity.score > results.integrity.score ? "text-[#00B894]" : "text-[#FF6B35]"}`}>{improvedResults.integrity.score}/100 <span className="text-sm">{improvedResults.integrity.grade}</span></div>
                        </div>
                        <div className={`font-mono text-xs font-bold px-2 py-1 rounded-full ${improvedResults.integrity.score > results.integrity.score ? "bg-[#00B894]/10 text-[#00B894]" : improvedResults.integrity.score === results.integrity.score ? "bg-gray-100 text-[#636E72]" : "bg-[#FF6B35]/10 text-[#FF6B35]"}`}>
                          {improvedResults.integrity.score > results.integrity.score ? `+${improvedResults.integrity.score - results.integrity.score}` : improvedResults.integrity.score === results.integrity.score ? "=" : improvedResults.integrity.score - results.integrity.score}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="bg-[#00B894]/10 px-4 py-3 flex items-center justify-between border-t border-[#00B894]/20">
                    <span className="font-display font-semibold text-sm text-[#00B894]">Improved Version</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setShowImproved(false); setImprovedResults(null); }}
                        className="font-sans text-xs text-[#636E72] underline hover:text-[#2D3436]">Show original</button>
                      <button onClick={() => { setContent(improvedContent); setResults(improvedResults); setShowImproved(false); setImprovedResults(null); }}
                        className="font-display text-xs font-semibold bg-[#00B894] text-white px-3 py-1 rounded-lg hover:bg-[#00a37d] transition">Keep this version</button>
                    </div>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <MarkdownEditor value={improvedContent} onChange={setImprovedContent} placeholder="Improved paper..." />
                  </div>
                </div>
              )}
            </section>
          )}
        </>
      )}

      {/* ADVANCED TOOLS — always visible */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <h2 className="font-display text-2xl font-bold mb-2 text-center">Advanced Tools</h2>
        <p className="text-center text-sm text-[#636E72] mb-6">
          {paperContent || content
            ? "Your paper is loaded. Run these tools to evaluate and improve it."
            : "Generate a paper or upload your draft to unlock these tools."}
        </p>

        {/* Citation Checker */}
        <div className={`bg-white border rounded-2xl p-6 md:p-8 shadow-sm mb-6 transition ${!(paperContent || content) ? "opacity-60" : "border-[#E8E8E8]"}`}>
          <h3 className="font-display text-lg font-bold mb-3">Citation Checker</h3>
          <p className="font-sans text-sm text-[#636E72] mb-3">Upload a .bib file to validate every citation against your bibliography.</p>
          {(paperContent || content) ? (
            <>
              <div className="flex gap-2 mb-3 flex-wrap">
                <label className="flex-1 min-w-[200px]">
                  <input type="file" accept=".bib" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) setBibContent(await f.text());
                  }} className="hidden" id="bib-upload" />
                  <span className="block w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl cursor-pointer hover:border-[#FF6B35] transition text-center">
                    {bibContent ? `BibTeX loaded (${bibContent.length} chars)` : "Upload .bib file"}
                  </span>
                </label>
                <button onClick={handleCheckCitations} disabled={citationLoading}
                  className="px-4 py-2.5 font-display font-semibold text-sm bg-[#2D3436] text-white rounded-xl hover:bg-[#1a1f21] disabled:opacity-40 transition">
                  {citationLoading ? <><span className="spinner" />Checking...</> : "Check Citations"}
                </button>
              </div>
              {citationResult && !citationResult.error && (
                <div className={`border rounded-xl p-4 ${citationResult.status === "pass" ? "border-[#00B894]/20 bg-[#00B894]/5" : "border-[#FF6B35]/20 bg-[#FF6B35]/5"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-semibold text-sm">Citation Report</span>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${citationResult.status === "pass" ? "bg-[#00B894]/10 text-[#00B894]" : "bg-[#FF6B35]/10 text-[#FF6B35]"}`}>
                      {citationResult.score.completeness}% complete
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mb-2">
                    <div>Found: {citationResult.score.total_citations}</div>
                    <div>LaTeX: {citationResult.score.unique_latex_cites}</div>
                    <div>Numeric: {citationResult.score.unique_numeric_cites}</div>
                    <div>Bib: {citationResult.score.bib_entries} entries</div>
                  </div>
                  {citationResult.missing?.filter((m: any) => {
                    const num = parseInt(m.citation.key);
                    return num >= 1 && num <= 50;
                  }).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#E8E8E8]">
                      <p className="font-display text-xs font-semibold text-[#FF6B35] mb-1">Unmatched citations ({citationResult.missing.filter((m: any) => { const n = parseInt(m.citation.key); return n >= 1 && n <= 50; }).length}):</p>
                      {citationResult.missing.filter((m: any) => { const n = parseInt(m.citation.key); return n >= 1 && n <= 50; }).slice(0, 5).map((m: any, i: number) => (
                        <p key={i} className="font-mono text-xs text-[#636E72]">L{m.citation.line}: {m.citation.key} — {m.reason}</p>
                      ))}
                    </div>
                  )}
                  {citationResult.warnings?.map((w: string, i: number) => (
                    <p key={i} className="font-mono text-xs text-[#FF6B35] mt-1">{w}</p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="border border-dashed border-[#E8E8E8] rounded-xl p-6 text-center">
              <p className="font-sans text-sm text-[#636E72]">Cross-references every citation against CrossRef, arXiv, and your .bib file. Flags unmatched references and suggests corrections.</p>
            </div>
          )}
        </div>

        {/* Submission Readiness */}
        <div className={`bg-white border rounded-2xl p-6 md:p-8 shadow-sm mb-6 transition ${!(paperContent || content) ? "opacity-60" : "border-[#E8E8E8]"}`}>
          <h3 className="font-display text-lg font-bold mb-3">Submission Readiness</h3>
          <p className="font-sans text-sm text-[#636E72] mb-3">
            {format.charAt(0).toUpperCase() + format.slice(1)} readiness: integrity + citations + formatting + venue compliance.
          </p>
          {(paperContent || content) ? (
            <>
              <div className="flex gap-2 mb-3 flex-wrap">
                {(format === "paper" || format === "thesis" || format === "book") ? (
                  <select value={venue} onChange={(e) => setVenue(e.target.value)}
                    className="flex-1 min-w-[200px] p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20">
                    <option value="">Generic (no venue)</option>
                    <option value="neurips">NeurIPS</option>
                    <option value="icml">ICML</option>
                    <option value="cvpr">CVPR</option>
                    <option value="acl">ACL</option>
                    <option value="nature">Nature</option>
                    <option value="science">Science</option>
                  </select>
                ) : (
                  <div className="flex-1 min-w-[200px] p-2.5 font-sans text-sm text-[#636E72] bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl">
                    Venue targeting not applicable for this format
                  </div>
                )}
                <button onClick={handleCheckReadiness} disabled={readinessLoading}
                  className="px-4 py-2.5 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C] disabled:opacity-40 transition">
                  {readinessLoading ? <><span className="spinner" />Assessing...</> : "Check Readiness"}
                </button>
              </div>
              {readinessResult && !readinessResult.error && (
                <div className="border border-[#E8E8E8] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-semibold text-sm">Readiness Score</span>
                    <span className={`font-display text-3xl font-bold ${
                      readinessResult.grade === "A" ? "text-[#00B894]" :
                      readinessResult.grade === "B" ? "text-[#00B894]" :
                      readinessResult.grade === "C" ? "text-[#FF6B35]" : "text-red-500"
                    }`}>{readinessResult.overall}/100 <span className="text-lg">{readinessResult.grade}</span></span>
                  </div>
                  <p className="font-sans text-sm text-[#636E72] mb-2">{readinessResult.grade_description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs font-mono">
                    {Object.entries(readinessResult.breakdown).map(([k, v]) => (
                      <div key={k} className="text-center bg-[#FAFAFA] rounded-lg p-2">
                        <div className="text-[#636E72] capitalize">{k}</div>
                        <div className="font-bold">{v as number}/100</div>
                      </div>
                    ))}
                  </div>
                  {readinessResult.checks?.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#E8E8E8]">
                      <p className="font-display text-xs font-semibold mb-1">Issues found:</p>
                      {readinessResult.checks.map((c: any, i: number) => (
                        <p key={i} className={`font-mono text-xs ${c.severity === "error" ? "text-red-600" : "text-[#FF6B35]"}`}>
                          [{c.area}] {c.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="border border-dashed border-[#E8E8E8] rounded-xl p-6 text-center">
              <p className="font-sans text-sm text-[#636E72]">Combines integrity score + citation completeness + format-specific section checks + venue compliance. Gives you a single readiness score and grade.</p>
            </div>
          )}
        </div>

        {/* Peer Review */}
        <div className={`bg-white border rounded-2xl p-6 md:p-8 shadow-sm mb-6 transition ${!(paperContent || content) ? "opacity-60" : "border-[#E8E8E8]"}`}>
          <h3 className="font-display text-lg font-bold mb-3">Peer Review Simulator</h3>
          <p className="font-sans text-sm text-[#636E72] mb-3">
            {(FORMAT_REVIEWER_INFO as any)[format]?.desc || FORMAT_REVIEWER_INFO["paper"]!.desc}
          </p>
          {(paperContent || content) ? (
            <>
              <button onClick={handleSimulateReview} disabled={reviewLoading}
                className="w-full py-2.5 font-display font-semibold text-sm bg-[#2D3436] text-white rounded-xl hover:bg-[#1a1f21] disabled:opacity-40 transition mb-3">
                {reviewLoading ? <><span className="spinner" />Reviewing...</> : `Simulate Peer Review (${(FORMAT_REVIEWER_INFO as any)[format]?.reviewers || FORMAT_REVIEWER_INFO["paper"]!.reviewers})`}
              </button>
              {reviewResult && !reviewResult.error && (
                <div>
                  <div className="flex items-center justify-between mb-3 p-3 bg-[#FAFAFA] rounded-xl">
                    <span className="font-display font-semibold text-sm">Decision</span>
                    <span className={`font-display text-lg font-bold px-3 py-1 rounded-full ${
                      reviewResult.decision === "Accept" ? "bg-[#00B894]/10 text-[#00B894]" :
                      reviewResult.decision === "Weak Accept" ? "bg-[#00B894]/10 text-[#00B894]" :
                      reviewResult.decision === "Borderline" ? "bg-[#FF6B35]/10 text-[#FF6B35]" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {reviewResult.decision}
                    </span>
                  </div>
                  <div className="text-center mb-3">
                    <span className="font-display text-3xl font-bold">{reviewResult.average_score}/10</span>
                    <span className="font-sans text-sm text-[#636E72] ml-2">average from {reviewResult.reviewers_count} reviewers</span>
                  </div>
                  {reviewResult.reviews?.map((r: any, i: number) => (
                    <div key={i} className="border border-[#E8E8E8] rounded-xl p-4 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-semibold text-sm">{r.reviewer}</span>
                        <div className="flex gap-2">
                          <span className="font-mono text-xs bg-[#FAFAFA] px-2 py-0.5 rounded">{r.overall_score}/10</span>
                          <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                            r.recommendation === "Accept" ? "bg-[#00B894]/10 text-[#00B894]" :
                            r.recommendation === "Weak Accept" ? "bg-[#00B894]/10 text-[#00B894]" :
                            "bg-[#FF6B35]/10 text-[#FF6B35]"
                          }`}>{r.recommendation}</span>
                        </div>
                      </div>
                      <pre className="font-mono text-xs text-[#636E72] whitespace-pre-wrap max-h-48 overflow-y-auto">{r.review_text}</pre>
                    </div>
                  ))}
                </div>
              )}
              {reviewResult?.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-mono">{reviewResult.error}</div>
              )}
            </>
          ) : (
            <div className="border border-dashed border-[#E8E8E8] rounded-xl p-6 text-center">
              <p className="font-sans text-sm text-[#636E72]">3 format-aware AI reviewers evaluate your document with realistic feedback, scores, and an accept/reject decision — just like a real review committee.</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="font-display text-2xl font-bold mb-8 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Describe your idea", desc: "Core insight, format, target audience. 3 fields." },
            { step: "2", title: "AI generates your paper", desc: "Full paper written automatically in your chosen format and style." },
            { step: "3", title: "Verify & export", desc: "8 engines audit every claim. Citations, readiness, peer review. Export PDF/LaTeX." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-[#FF6B35] text-white font-display font-bold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">{item.step}</div>
              <h3 className="font-display font-semibold mb-1">{item.title}</h3>
              <p className="font-sans text-sm text-[#636E72]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="font-display text-2xl font-bold mb-2 text-center">Plans that scale with you</h2>
        <p className="text-center text-[#636E72] mb-8 max-w-lg mx-auto">From your first paper to your research lab. <strong className="text-[#FF6B35]">No hidden fees.</strong></p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "Free", price: "$0", period: "/month", sub: "1 free paper", desc: "1 free paper. 8 engines. 6 formats. Basic verification.", cta: "Get Started", href: "/research", key: "free" },
            { name: "Pro", price: "$9", period: "/month", sub: "20 papers • 20 verifications", desc: "LLM generation. 20 papers/month. 20 verifications. 6 formats. 8 engines.", cta: "Subscribe", href: "/pricing", key: "pro", featured: true },
            { name: "Lab", price: "$39", period: "/month", sub: "Unlimited everything", desc: "Unlimited papers. Unlimited verifications. All formats. All engines.", cta: "Go Lab", href: "/pricing", key: "lab" },
            { name: "Institution", price: "Custom", period: "", sub: "Unlimited • SSO • Support", desc: "Site license. Unlimited everything. SSO. Priority support. Usage analytics. Custom integrations.", cta: "Contact us", href: "mailto:contact.korro@gmail.com", key: "institution" },
          ].map((plan) => {
            const isCurrent = user && (user.plan || "free") === plan.key;
            return (
            <div key={plan.name} className={`bg-white border-2 rounded-2xl p-5 text-center shadow-sm relative transition hover:shadow-md ${plan.featured ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/30 scale-[1.02]" : plan.key === "institution" ? "border-[#2D3436] bg-[#FAFAFA]" : "border-[#E8E8E8]"}`}>
              {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">Most popular</span>}
              {plan.key === "institution" && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D3436] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">One-time</span>}
              {isCurrent && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#00B894] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">Current plan</span>}
              {!isCurrent && !plan.featured && plan.key !== "institution" && <div className="h-5"></div>}
              <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
              <p className="font-display text-3xl font-bold mb-1">{plan.price}{plan.period && <span className="text-base text-[#636E72] font-normal">{plan.period}</span>}</p>
              <p className="text-xs text-[#00B894] font-medium mb-3">{plan.sub}</p>
              <p className="font-sans text-xs text-[#636E72] mb-4 leading-relaxed">{plan.desc}</p>
              {isCurrent ? (
                <span className="block w-full py-2.5 font-display font-semibold text-sm rounded-xl bg-[#00B894]/10 text-[#00B894]">Current plan</span>
              ) : (
                <a href={plan.href} className={`block w-full py-2.5 font-display font-semibold text-sm rounded-xl transition-all active:scale-95 ${plan.featured ? "bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white hover:shadow-lg hover:shadow-[#FF6B35]/30" : plan.key === "institution" ? "bg-[#2D3436] text-white hover:bg-[#1a1f21]" : "bg-[#FAFAFA] text-[#2D3436] hover:bg-[#E8E8E8]"}`}>{plan.cta}</a>
              )}
            </div>
          )})}
        </div>
        <p className="text-center mt-8 text-sm text-[#636E72]">
          Questions? <a href="mailto:contact.korro@gmail.com" className="text-[#FF6B35] font-semibold hover:underline">Contact us</a>.
        </p>
      </section>
      <Footer />
    </main>
  );
}
