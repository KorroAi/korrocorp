"use client";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_RESEARCH_API || "https://korroresearch-api-production.up.railway.app";

const FORMAT_LABELS: Record<string, string> = {
  "paper": "Research Paper", "pitch": "Pitch Deck", "grant": "Grant Proposal",
  "whitepaper": "White Paper", "magazine": "Magazine Article", "book": "Academic Book",
  "blog": "Technical Blog Post", "talk": "Conference Talk", "thesis": "Thesis / Dissertation",
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState<any[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  useEffect(() => {
    const t = localStorage.getItem("korro_token");
    if (!t) { window.location.href = "/login"; return; }
    // Always fetch fresh user data from API
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.json()).then(d => {
        if (d.user) {
          setUser(d.user);
          localStorage.setItem("korro_user", JSON.stringify(d.user));
        } else {
          const u = localStorage.getItem("korro_user");
          if (u) { try { setUser(JSON.parse(u)); } catch {} }
          else window.location.href = "/login";
        }
      }).catch(() => {
        const u = localStorage.getItem("korro_user");
        if (u) { try { setUser(JSON.parse(u)); } catch {} }
        else window.location.href = "/login";
      }).finally(() => setLoading(false));
    // Fetch paper history
    fetch(`${API}/api/papers`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.json()).then(d => { if (d.papers) setPapers(d.papers); }).catch(() => {});
  }, []);

  const handleCheckout = async (plan: string) => {
    const token = localStorage.getItem("korro_token");
    const res = await fetch(`${API}/api/stripe/create-checkout`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, user_id: user?.id, promo_code: "" }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const handlePortal = async () => {
    const res = await fetch(`${API}/api/stripe/portal`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.id }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const handleLogout = () => {
    localStorage.removeItem("korro_user");
    localStorage.removeItem("korro_token");
    window.location.href = "/";
  };

  if (loading) return <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center"><p className="font-mono text-sm text-[#636E72]">Loading...</p></main>;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2D3436]">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/research" className="font-display font-semibold text-sm bg-[#FF6B35] text-white px-5 py-2 rounded-xl hover:bg-[#E85D2C] transition">← Research</a>
            <div>
              <p className="font-mono text-sm tracking-widest text-[#FF6B35] uppercase mb-2">Dashboard</p>
              <h1 className="font-display text-3xl font-bold">{user?.name || user?.email}</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 font-display text-sm border border-[#E8E8E8] rounded-xl hover:bg-[#FAFAFA]">Sign out</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-xs text-[#636E72] uppercase mb-1">Plan</p>
            <p className="font-display text-2xl font-bold capitalize">{user?.plan || "free"}</p>
            {user?.plan !== "free" && <button onClick={handlePortal} className="mt-2 font-sans text-sm text-[#FF6B35] hover:underline">Manage subscription</button>}
          </div>
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm">
            <p className="font-mono text-xs text-[#636E72] uppercase mb-1">Credits</p>
            <p className="font-display text-2xl font-bold">{user?.papers_used || 0}<span className="text-lg text-[#636E72] font-normal"> / {user?.papers_limit || 1}</span></p>
          </div>
        </div>

        {user?.plan === "free" && (
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm text-center">
            <h2 className="font-display text-xl font-bold mb-4">Upgrade your plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="border border-[#FF6B35] ring-2 ring-[#FF6B35]/20 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-1">Pro</h3>
                <p className="font-display text-3xl font-bold mb-3">$9<span className="text-sm text-[#636E72] font-normal">/month</span></p>
                <p className="font-sans text-sm text-[#636E72] mb-4">20 papers/month. 6 formats. 8 engines.</p>
                <button onClick={() => handleCheckout("pro")} className="w-full py-2.5 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C]">Subscribe</button>
              </div>
              <div className="border border-[#E8E8E8] rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-1">Lab</h3>
                <p className="font-display text-3xl font-bold mb-3">$39<span className="text-sm text-[#636E72] font-normal">/month</span></p>
                <p className="font-sans text-sm text-[#636E72] mb-4">Unlimited papers. Batch processing. API access.</p>
                <button onClick={() => handleCheckout("lab")} className="w-full py-2.5 font-display font-semibold text-sm bg-[#2D3436] text-white rounded-xl hover:bg-[#1a1f21]">Subscribe</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="font-display text-xl font-bold mb-4">Paper History</h2>
          {papers.length === 0 ? (
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 text-center shadow-sm">
              <p className="text-[#636E72] text-sm">No papers yet. <a href="/research" className="text-[#FF6B35] font-semibold hover:underline">Generate your first paper</a></p>
            </div>
          ) : (
            <div className="space-y-3">
              {papers.map((p: any) => (
                <div key={p.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-[#FF6B35]/30 transition group">
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm truncate">{p.title || "Untitled"}</p>
                    <p className="text-xs text-[#636E72] mt-0.5">{(FORMAT_LABELS as any)[p.format] || p.format} · {new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button onClick={() => {
                      const t = localStorage.getItem("korro_token");
                      fetch(`${API}/api/papers/${p.id}`, { headers: { Authorization: `Bearer ${t}` } })
                        .then(r => r.json()).then(d => { if (d.paper) setSelectedPaper(d.paper); }).catch(() => {});
                    }} className="text-xs bg-[#FAFAFA] text-[#2D3436] font-medium px-3 py-1.5 rounded-lg hover:bg-[#E8E8E8] transition">
                      View
                    </button>
                    <button onClick={() => {
                      const t = localStorage.getItem("korro_token");
                      fetch(`${API}/api/papers/${p.id}`, { headers: { Authorization: `Bearer ${t}` } })
                        .then(r => r.json()).then(d => {
                          if (d.paper?.content) {
                            const blob = new Blob([d.paper.content], { type: "text/markdown" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url; a.download = `${p.title || "paper"}.md`; a.click();
                          }
                        }).catch(() => {});
                    }} className="text-xs bg-[#FAFAFA] text-[#2D3436] font-medium px-3 py-1.5 rounded-lg hover:bg-[#E8E8E8] transition">
                      Download .md
                    </button>
                    <button onClick={() => {
                      const t = localStorage.getItem("korro_token");
                      fetch(`${API}/api/papers/${p.id}/pdf`, { headers: { Authorization: `Bearer ${t}` } })
                        .then(r => r.blob()).then(blob => {
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url; a.download = `${p.title || "paper"}.pdf`; a.click();
                          URL.revokeObjectURL(url);
                        }).catch(() => {});
                    }} className="text-xs bg-[#FF6B35] text-white font-medium px-3 py-1.5 rounded-lg hover:bg-[#E85D2C] transition">
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedPaper && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedPaper(null)}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-[#E8E8E8]">
                <div>
                  <h3 className="font-display font-bold text-lg">{selectedPaper.title || "Untitled"}</h3>
                  <p className="text-xs text-[#636E72]">{selectedPaper.format} · {new Date(selectedPaper.created_at).toLocaleDateString()} · {(selectedPaper.content || "").length.toLocaleString()} chars</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    const blob = new Blob([selectedPaper.content || ""], { type: "text/markdown" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url; a.download = `${selectedPaper.title || "paper"}.md`; a.click();
                  }} className="text-sm bg-[#2D3436] text-white px-4 py-2 rounded-xl hover:bg-[#1a1f21] transition">Download .md</button>
                  <button onClick={() => setSelectedPaper(null)} className="text-sm text-[#636E72] hover:text-[#2D3436] px-4 py-2">Close</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose prose-sm max-w-none font-sans text-[#2D3436] leading-relaxed whitespace-pre-wrap">{selectedPaper.content}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
