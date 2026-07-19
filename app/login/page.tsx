"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_RESEARCH_API || "https://korroresearch-api-production.up.railway.app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body = isRegister ? { email, password, name } : { email, password };
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Auth failed");
      localStorage.setItem("korro_user", JSON.stringify(data.user));
      localStorage.setItem("korro_token", data.token);
      window.location.href = "/dashboard";
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2D3436] flex items-center justify-center">
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 w-full max-w-md shadow-sm">
        <p className="font-mono text-xs tracking-widest text-[#FF6B35] uppercase mb-2 text-center">Korrocorp</p>
        <h1 className="font-display text-2xl font-bold text-center mb-6">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div><label className="font-display font-semibold text-sm mb-1 block">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
              className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20" /></div>
          )}
          <div><label className="font-display font-semibold text-sm mb-1 block">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
            className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20" /></div>
          <div><label className="font-display font-semibold text-sm mb-1 block">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Min. 8 characters"
            className="w-full p-2.5 font-sans text-sm bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20" /></div>
          <button type="submit" disabled={loading} className="w-full py-3 font-display font-semibold text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E85D2C] disabled:opacity-40 transition">
            {loading ? "Loading..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-[#636E72]">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="text-[#FF6B35] font-semibold hover:underline">
            {isRegister ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </main>
  );
}
