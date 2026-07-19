"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_RESEARCH_API || "https://korroresearch-api-production.up.railway.app";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingPage() {
  const [licenseKey, setLicenseKey] = useState("");
  const [licStatus, setLicStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [licError, setLicError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const handleCheckout = async (plan: string) => {
    const user = localStorage.getItem("korro_user");
    const userId = user ? JSON.parse(user).id : "";
    // Stripe coupons skip the promo API — applied directly at checkout
    const isStripePromo = promoCode.trim().toUpperCase() === "LAUNCH40";
    if (promoCode.trim() && !isStripePromo) {
      const t = localStorage.getItem("korro_token");
      const pr = await fetch(`${API}/api/promo/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) },
        body: JSON.stringify({ code: promoCode.trim() }),
      });
      if (!pr.ok) {
        const d = await pr.json();
        setPromoMsg(d.detail || "Invalid promo code");
        return;
      }
    }
    const res = await fetch(`${API}/api/stripe/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, user_id: userId, promo_code: promoCode.trim() || "" }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.detail || "Stripe checkout failed");
  };

  const handleSaveKey = async () => {
    if (!licenseKey.trim()) return;
    setLicStatus("saving");
    try {
      const res = await fetch(`${API}/api/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-License-Key": licenseKey.trim(),
        },
        body: JSON.stringify({ insight: "test", format: "paper" }),
      });
      if (res.status === 402) {
        setLicStatus("error");
        setLicError("Invalid or expired license key");
      } else if (res.ok) {
        localStorage.setItem("korro_license", licenseKey.trim());
        setLicStatus("saved");
      } else {
        const d = await res.json();
        setLicStatus("error");
        setLicError(d.detail || "Unknown error");
      }
    } catch {
      setLicStatus("error");
      setLicError("Cannot reach API");
    }
  };

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      desc: "1 free paper. 8 verification engines. 6 formats. No credit card needed.",
      features: ["1 free paper", "8 verification engines", "6 formats", "1 verification"],
      cta: "Get Started",
      ctaHref: "/research",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      desc: "LLM generation. 20 papers/month. 6 formats. 8 engines. Priority support. License key required.",
      features: ["Everything in Free", "LLM-powered content", "20 papers/month", "50 verifications", "6 formats with AI", "Email support"],
      cta: "Subscribe",
      ctaAction: () => handleCheckout("pro"),
      highlighted: true,
    },
    {
      name: "Lab",
      price: "$39",
      period: "/month",
      desc: "Unlimited papers. Batch processing. Admin dashboard. API access.",
      features: ["Everything in Pro", "Unlimited papers & verifications", "All formats & engines", "Early access to features"],
      cta: "Subscribe",
      ctaAction: () => handleCheckout("lab"),
      highlighted: false,
    },
    {
      name: "Institution",
      price: "Custom",
      period: "",
      desc: "Site license. SSO. Priority support. Analytics.",
      features: ["Everything in Lab", "Unlimited seats", "SSO integration", "Priority support", "Usage analytics", "Custom integrations"],
      cta: "Contact us",
      ctaHref: "mailto:contact.korro@gmail.com",
      highlighted: false,
      enterprise: true,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2D3436]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-widest text-[#FF6B35] uppercase mb-3">Pricing</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-[#636E72] max-w-xl mx-auto">All plans include the full verification pipeline.</p>
          <p className="text-sm text-[#636E72] mt-4">Have a promo code? Enter it on the Stripe checkout page. <span className="text-[#FF6B35] font-semibold">LAUNCH40</span> = 40% off for the first 10 users.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white border rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col ${
                tier.highlighted ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/20" : "border-[#E8E8E8]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-semibold px-3 py-1 rounded-full font-mono tracking-wider">
                  POPULAR
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
              <div className="mb-2">
                <span className="font-display text-4xl font-bold">{tier.price}</span>
                <span className="text-[#636E72] text-sm">{tier.period}</span>
              </div>
              <p className="text-sm text-[#636E72] mb-6 leading-relaxed">{tier.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-[#FF6B35] mt-0.5 shrink-0"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              {tier.ctaAction ? (
                <button
                  onClick={tier.ctaAction}
                  className={`w-full py-3 font-display font-semibold text-sm rounded-xl transition active:scale-[0.97] ${
                    tier.highlighted
                      ? "bg-[#FF6B35] text-white hover:bg-[#E85D2C]"
                      : "border-2 border-[#2D3436] text-[#2D3436] hover:bg-[#2D3436] hover:text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              ) : (
                <a
                  href={tier.ctaHref}
                  className="block text-center w-full py-3 font-display font-semibold text-sm border-2 border-[#2D3436] text-[#2D3436] rounded-xl hover:bg-[#2D3436] hover:text-white transition active:scale-[0.97]"
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
